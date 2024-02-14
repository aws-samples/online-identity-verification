import boto3
import io
import os
from PIL import Image
from logging import Logger
logger = Logger(name='CropFaceLambdaFunction')

s3_client = boto3.client('s3')
rekognition_client = boto3.client('rekognition')

def lambda_handler(event, context):
    # Retrieve bucket name and file name from S3 event
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']

    
    # Get the uploaded image
    logger.info("Getting uploaded image")
    response = s3_client.get_object(Bucket=bucket, Key=key)
    image_bytes = response['Body'].read()
    logger.info("Getting uploaded image")

    # Detect faces with Rekognition
    logger.info("Detecting faces with Rekognition")
    face_response = rekognition_client.detect_faces(
        Image={'Bytes': image_bytes},
        Attributes=['DEFAULT']
    )
    
    if face_response['FaceDetails']:
        # Use the information of the first detected face
        logger.info("Detecting faces with Rekognition")
        faceDetail = face_response['FaceDetails'][0]
        box = faceDetail['BoundingBox']
        image = Image.open(io.BytesIO(image_bytes))
        imgWidth, imgHeight = image.size
        left = imgWidth * box['Left']
        top = imgHeight * box['Top']
        width = imgWidth * box['Width']
        height = imgHeight * box['Height']
        logger.info("Detecting faces with Rekognition")
        # Crop the face part
        face_image = image.crop((left, top, left + width, top + height))
        
        # Convert the cropped face image to a byte array
        buffer = io.BytesIO()
        face_image.save(buffer, 'JPEG')
        buffer.seek(0)

        # Upload the cropped face image to S3
        logger.info("Uploading cropped face image to S3")
        face_key = 'faces/' + key.split('/')[-1]
        s3_client.put_object(Bucket=os.getenv('CROPED_BUCKET'), Key=face_key, Body=buffer, ContentType='image/jpeg')
        logger.info("Uploading cropped face image to S3")
        return {
            'statusCode': 200,
            'body': 'Face detected and cropped successfully!'
        }
    else:
        return {
            'statusCode': 400,
            'body': 'No faces detected.'
        }
