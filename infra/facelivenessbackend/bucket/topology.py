from infra.facelivenessbackend.functions.definitions import FaceLivenessStartLivenessSession,FaceLivenessSessionResult,UploadSignUrl,GetComparefaceResult
from infra.interfaces import IRflStack
import aws_cdk as core
from constructs import Construct
from aws_cdk import aws_s3 as s3

class FaceLivenessBucketSet(Construct):
    def __init__(self, scope: Construct, id:str, rfl_stack:IRflStack, **kwargs) -> None:
        super().__init__(scope, id)
        
        # create S3 bucket for FaceImage-reference-image
        self.face_image_bucket =  s3.Bucket(self, "FaceImageBucket",
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
        
        self.face_image_bucket.add_lifecycle_rule(
            enabled=True,
            expiration=core.Duration.days(7)
        )
