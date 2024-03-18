import boto3
from botocore.exceptions import ClientError
import json
from logging import Logger
import os

logger = Logger(name='PresignURLLambdaFunction')


def lambda_handler(event, context):
    # initialize s3 client
    s3_client = boto3.client('s3')
    bucket_name = os.getenv('UPLOAD_BUCKET')
    logger.info("******bucket_name********")
    logger.info(bucket_name)
    logger.info("******bucket_name********")
    key = event.get('queryStringParameters', {}).get('key')
    logger.info("******key********")
    logger.info(key)
    logger.info("******key********")

    object_key = 'upload/'+ key + ".jpg" # generate random key for upload object
    expiration = 600  # define TTL for presign URL
    logger.info("******object_key********")
    logger.info(object_key)
    logger.info("******object_key********")

    try:
        # generate presigned url
        response = s3_client.generate_presigned_url('put_object',
                                                    Params={'Bucket': bucket_name,
                                                            'Key': object_key,
                                                            'ContentType': 'image/jpeg'
                                                            },
                                                    ExpiresIn=expiration)
        logger.info("******response********")
        logger.info(response)
        logger.info("******response********")
                                                    
    except ClientError as e:
        # When error occur, return 500 status
        logger.info(e)
        return {
            'statusCode': 500,
            'body': json.dumps('Error generating presigned URL')
        }

    # return result
    return {
        'statusCode': 200,
        'body': json.dumps({'body': response}),
        'headers': {
            "Access-Control-Allow-Origin": "*"
        }
    }

if __name__ == "__main__":
    lambda_handler()