const defaultErrorDisplayText = require("./defaultErrorDisplayText.js");
export const defaultLivenessDisplayText = {
  cameraMinSpecificationsHeadingText:
    'Camera does not meet minimum specifications',
  cameraMinSpecificationsMessageText:
    'Camera must support at least 320*240 resolution and 15 frames per second.',
  cameraNotFoundHeadingText: 'Camera is not accessible.',
  cameraNotFoundMessageText:
    'Check that a camera is connected and there is not another application using the camera. You may have to go into settings to grant camera permissions and close out all instances of your browser and retry.',
  a11yVideoLabelText: 'Webcam for liveness check',
  cancelLivenessCheckText: 'Cancel Liveness check',
  goodFitCaptionText: 'Good fit',
  goodFitAltText:
    "Ilustration of a person's face, perfectly fitting inside of an oval.",
  hintCenterFaceText: 'Center your face',
  hintCenterFaceInstructionText:
    'Instruction: Before starting the check, make sure your camera is at the center top of your screen and center your face to the camera. When the check starts an oval will show up in the center. You will be prompted to move forward into the oval and then prompted to hold still. After holding still for a few seconds, you should hear check complete.',
  hintFaceOffCenterText:
    'Face is not in the oval, center your face to the camera.',
  hintMoveFaceFrontOfCameraText: 'Move face in front of camera',
  hintTooManyFacesText: 'Ensure only one face is in front of camera',
  hintFaceDetectedText: 'Face detected',
  hintCanNotIdentifyText: 'Move face in front of camera',
  hintTooCloseText: 'Move back',
  hintTooFarText: 'Move closer',
  hintConnectingText: 'Connecting...',
  hintVerifyingText: 'Verifying...',
  hintCheckCompleteText: 'Check complete',
  hintIlluminationTooBrightText: 'Move to dimmer area',
  hintIlluminationTooDarkText: 'Move to brighter area',
  hintIlluminationNormalText: 'Lighting conditions normal',
  hintHoldFaceForFreshnessText: 'Hold still',
  hintMatchIndicatorText: '50% completed. Keep moving closer.',
  photosensitivityWarningBodyText:
    'This check flashes different colors. Use caution if you are photosensitive.',
  photosensitivityWarningHeadingText: 'Photosensitivity warning',
  photosensitivityWarningInfoText:
    'Some people may experience epileptic seizures when exposed to colored lights. Use caution if you, or anyone in your family, have an epileptic condition.',
  photosensitivityWarningLabelText: 'More information about photosensitivity',
  photosensitivyWarningBodyText:
    'This check flashes different colors. Use caution if you are photosensitive.',
  photosensitivyWarningHeadingText: 'Photosensitivity warning',
  photosensitivyWarningInfoText:
    'Some people may experience epileptic seizures when exposed to colored lights. Use caution if you, or anyone in your family, have an epileptic condition.',
  photosensitivyWarningLabelText: 'More information about photosensitivity',
  retryCameraPermissionsText: 'Retry',
  recordingIndicatorText: 'Rec',
  startScreenBeginCheckText: 'Start video check',
  tooFarCaptionText: 'Too far',
  tooFarAltText:
    "Illustration of a person's face inside of an oval; there is a gap between the perimeter of the face and the boundaries of the oval.",
  waitingCameraPermissionText: 'Waiting for you to allow camera permission.',
  ...defaultErrorDisplayText,
};