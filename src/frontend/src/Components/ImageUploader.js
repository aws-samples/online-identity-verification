import {
    Image,
    Button,
    Alert,
    Card,
    View,
    SelectField,
    ButtonGroup
} from '@aws-amplify/ui-react';
import { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};


export default ({ setImage, sessionid }) => {
    const endpoint = process.env.REACT_APP_ENV_API_URL ? process.env.REACT_APP_ENV_API_URL : ''
    const webcamRef = useRef(null);
    const [presignedURL, setPresignedURL] = useState(null);
    const [deviceId, setDeviceId] = useState(videoConstraints);
    const [devices, setDevices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleDevices = useCallback(
        mediaDevices =>
            setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
        [setDevices]
    );

    useEffect(
        () => {
            navigator.mediaDevices.enumerateDevices().then(handleDevices);
        },
        [handleDevices]
    );
    const cameraSelector = () => {
        const option = devices.map((device) => <option key={device.deviceId} value={device.deviceId}>{device.label}</option>)

        return (
            <SelectField
                label="Select your camera device"
                value={deviceId.deviceId}
                onClick={() => {
                    navigator.mediaDevices.enumerateDevices().then(handleDevices);
                }}
                onChange={(e) => {
                    setDeviceId({ ...videoConstraints, deviceId: e.target.value })
                }}
            >
                {option}
            </SelectField>

        )
    }

    const getPresignedUrl = async () => {
        const response = await fetch(endpoint + 'uploadsignedurl?' + new URLSearchParams({ key: sessionid }));
        const data = await response.json();
        console.log("------ uploadsignedurl response ------");
        const url = data.body
        console.log({ url })
        setPresignedURL(url)
    }
    useEffect(() => {
        getPresignedUrl()

    }, [sessionid])




    /*
   * Upload Image to S3
   */
    const handleUploadImagetoS3 = async (imageSrc, presignedURL) => {
        const res = await fetch(imageSrc)
        const blob = await res.blob()

        const response = await fetch(presignedURL, {
            method: 'PUT',
            body: blob,
            headers: {
                'Content-Type': 'image/jpeg',
            }
        })

        if (!response.ok) {
            alert("Error happen")
            console.error("Erorr")
            console.error(response)
            return {
                body: null
            };
        }
    };

    const capture = useCallback(async (presignedURL) => {
        setIsLoading(true)
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            handleUploadImagetoS3(imageSrc, presignedURL)
                .then(() => setImage(imageSrc))
                .finally(() => setIsLoading(false));
        }
    }, [webcamRef]);

    return (
        <>
            <header>
                <Alert variation="info">Click "Capture" button to Take photo of your identity verification document with face photo. </Alert>
            </header>

            <View  as="div" margin="1rem" borderRadius="6px" boxShadow="3px 3px 5px 6px var(--amplify-colors-neutral-60)" >
                <Card variation="elevated" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Webcam
                            audio={false}
                            width={540}
                            height={360}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={deviceId}
                            
                        />
                    </div>
                    <div>{cameraSelector()}</div>
                    <View as="div" marginTop="1rem">
                        <ButtonGroup justifyContent="center">

                            <Button variation="primary" isLoading={isLoading} onClick={capture.bind(this, presignedURL)} >Capture</Button>
                        </ButtonGroup>
                    </View>
                </Card>
            </View>
        </>
    );
};
