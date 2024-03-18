FROM  --platform=linux/amd64 public.ecr.aws/lambda/python:3.12
RUN pip install pillow "urllib3<2.0" boto3
ADD handler.py .
CMD [ "handler.lambda_handler"]