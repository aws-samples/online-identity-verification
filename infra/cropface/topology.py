import aws_cdk as core
import builtins
import os
from infra.interfaces import IRflStack
from constructs import Construct
from aws_cdk import aws_s3 as s3
from aws_cdk.aws_s3_notifications import LambdaDestination

from aws_cdk import (
    CfnOutput,
    aws_iam as iam,
    aws_lambda as lambda_,
    aws_ecr_assets as ecr_assets,
)
from os import path



class CropFace(Construct):

    def __init__(self, scope: Construct, id: builtins.str, rfl_stack:IRflStack) -> None:
        super().__init__(scope, id)

        # create S3 bucket for identification-card-image
        self.bucket =  s3.Bucket(self, "identificationCardBucket",
            block_public_access=s3.BlockPublicAccess(
                block_public_acls=True,
                ignore_public_acls=True,
                block_public_policy=True,
                restrict_public_buckets=True
            ),
            cors=[
                s3.CorsRule(
                    allowed_headers=["*"],
                    allowed_methods=[s3.HttpMethods.PUT, s3.HttpMethods.POST],
                    allowed_origins=["*"]
                )
            ],
            encryption=s3.BucketEncryption.S3_MANAGED,
            removal_policy=core.RemovalPolicy.DESTROY, 
            auto_delete_objects=True  
        )
        
        self.bucket.add_lifecycle_rule(
            enabled=True,
            expiration=core.Duration.days(7)
        )

        # create S3 bucket for face-cropped-image
        self.faceCroppedBucket =  s3.Bucket(self, "faceCroppedImageBucket",
            block_public_access=s3.BlockPublicAccess(
                block_public_acls=True,
                ignore_public_acls=True,
                block_public_policy=True,
                restrict_public_buckets=True
            ),
            encryption=s3.BucketEncryption.S3_MANAGED,
            removal_policy=core.RemovalPolicy.DESTROY, 
            auto_delete_objects=True  
        )
        
        self.faceCroppedBucket.add_lifecycle_rule(
            enabled=True,
            expiration=core.Duration.days(7)
        )


        lambda_role = iam.Role(
            self, "LambdaExecutionRole",
            assumed_by=iam.ServicePrincipal("lambda.amazonaws.com"),
            description="Lambda execution role with permissions to access ECR."
        )

         # Grant the Lambda execution role access permissions to ECR.
        lambda_role.add_to_policy(iam.PolicyStatement(
            effect=iam.Effect.ALLOW,
            actions=[
                "ecr:BatchGetImage",
                "ecr:GetDownloadUrlForLayer",
                "ecr:DescribeImages",
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            resources=[self.faceCroppedBucket.bucket_arn]  
        ))

        docker_image_asset = ecr_assets.DockerImageAsset(self, "CropFaceImage",
            directory=path.join(path.dirname(__file__), "../../src/backend/crop-face")
        )

        # Create a Lambda function using a Docker image.
        self.function = lambda_.DockerImageFunction(self, "CropFaceFunction",
            code=lambda_.DockerImageCode.from_ecr(
                repository=docker_image_asset.repository,
                tag=docker_image_asset.asset_hash
            ),
            role=lambda_role,
            environment={'CROPED_BUCKET': self.faceCroppedBucket.bucket_name}
        )

        self.function.role.add_managed_policy(
            policy=iam.ManagedPolicy.from_aws_managed_policy_name('AmazonRekognitionFullAccess'))

        self.function.role.add_managed_policy(
            policy=iam.ManagedPolicy.from_aws_managed_policy_name('AmazonS3FullAccess'))
        
        # Configure the Lambda function for S3 bucket notifications.
        self.bucket.add_event_notification(s3.EventType.OBJECT_CREATED, LambdaDestination(self.function))


       # Register the identity verification bucket as a CloudFormation output.
        CfnOutput(self, id="RFL-identity-card-bucket-name",
                  value=self.bucket.bucket_name, export_name="identity-card-bucket-name" + rfl_stack.stack_name)
