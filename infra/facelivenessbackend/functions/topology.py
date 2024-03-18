from infra.facelivenessbackend.functions.definitions import FaceLivenessStartLivenessSession,FaceLivenessSessionResult,UploadSignUrl,GetComparefaceResult
from infra.interfaces import IRflStack
import aws_cdk as core
from constructs import Construct
from infra.cropface.topology import CropFace
from infra.facelivenessbackend.bucket.topology import FaceLivenessBucketSet

class FaceLivenessFunctionSet(Construct):
  def __init__(self, scope: Construct, id:str, rfl_stack:IRflStack, cropface: CropFace, faceLivenessBucket: FaceLivenessBucketSet ) -> None:
    super().__init__(scope, id)

    '''
    Define the functions...
    '''
    default_environment_var = {
      'REGION': core.Stack.of(self).region,
      'rfl_stack_NAME': rfl_stack.rfl_stack_name,
      'UPLOAD_BUCKET': cropface.bucket.bucket_name,
      'CROPED_BUCKET': cropface.faceCroppedBucket.bucket_name,
      'FACELIVENESS_BUCKET': faceLivenessBucket.face_image_bucket.bucket_name
    }

    
    self.start_liveness_session = FaceLivenessStartLivenessSession(self,'StartFaceLivenessSession',
      rfl_stack=rfl_stack,  env=default_environment_var)

    self.liveness_session_result = FaceLivenessSessionResult(self,'FaceLivenessSessionResult',
      rfl_stack=rfl_stack, env=default_environment_var)

    self.upload_signed_url = UploadSignUrl(self,'UploadSignUrl',
      rfl_stack=rfl_stack, env=default_environment_var)
    
    self.get_compareface_result = GetComparefaceResult(self,'getComparefaceResult',
          rfl_stack=rfl_stack, env=default_environment_var)
    
