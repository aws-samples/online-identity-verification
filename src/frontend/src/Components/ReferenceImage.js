import React from "react";
import '@aws-amplify/ui-react/styles.css';

import {
    Alert,
    Image,
    useTheme,
    Button,
    ButtonGroup
} from '@aws-amplify/ui-react';

function ReferenceImage({ faceLivenessAnalysis, tryagain, setTab }) {
    const { tokens } = useTheme();
    return (
        <>
            <Alert
                variation="info"
                isDismissible={false}
                hasIcon={false}
                marginTop={tokens.space.large}
            >
                Session ID: {faceLivenessAnalysis.SessionId}
            </Alert>
            <Alert
                variation="info"
                isDismissible={false}
                hasIcon={false}
            >
                Status: {faceLivenessAnalysis.Status}
            </Alert>
            <Alert
                variation="info"
                isDismissible={false}
                hasIcon={false}
            >
                Confidence Score: {faceLivenessAnalysis.Confidence.toFixed(2)}%
            </Alert>
            <ButtonGroup justifyContent="center" marginTop="1rem">

                <Button variation="primary"
                    colorTheme="overlay"
                    type="submit"
                    marginTop={tokens.space.large}
                    marginBottom={tokens.space.large}
                    onClick={tryagain}>
                    Try Again
                </Button>
                <Button
                    variation="primary"
                    marginTop={tokens.space.large}
                    marginBottom={tokens.space.large}
                    onClick={() => {
                        setTab('3')
                    }}
                >Next Step</Button>
            </ButtonGroup>

            <Image
                src={"data:image/jpeg;base64," + faceLivenessAnalysis.ReferenceImage.Bytes}
                width="100%"
                height="100%"
                objectFit="cover"
                objectPosition="50% 50%"
            />
        </>
    );
}

export default ReferenceImage;
