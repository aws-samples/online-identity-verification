import { useState } from "react";
import { Badge, Button, Card, Alert, View, ButtonGroup } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function CompareFaceResult({ idImage, faceLivenessAnalysis, sessionid }) {

    const endpoint = process.env.REACT_APP_ENV_API_URL ? process.env.REACT_APP_ENV_API_URL : '';
    const [similarityScore, setSimilarityScore] = useState();
    const [croppedImageUrl, setCroppedImageUrl] = useState();
    const [checking, setChecking] = useState(false);


    const checkSimilarity = async () => {
        setChecking(true)
        const response = await fetch(`${endpoint}getcomparefaceresult?${new URLSearchParams({ key: sessionid })}`, {
            method: 'GET',
        });
        const data = await response.json();

        setSimilarityScore(data.similarityScore);
        setCroppedImageUrl(data.croppedImage)

    };

    const resultComponet = (similarityScore) => {
        if (similarityScore == null) return <></>

        return (<View as="div" margin="1rem" borderRadius="6px" boxShadow="3px 3px 5px 6px var(--amplify-colors-neutral-60)">
            <Card variation="elevated" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Alert variation="success">
                    <div>
                        Similarity Score: {similarityScore}%
                    </div>
                </Alert>
                <div>
                    <div>
                        <Badge marginBottom="1rem" marginTop="1rem">ID doc face crop image</Badge>
                    </div>
                    <img src={croppedImageUrl} />

                </div>
            </Card >
        </View>)
    }
    const checkComponet = () => {
        return (
            <>
                <div>
                    <Alert variation="info">Check "ID Image" and image "FaceLiveness Image", and click "Check" button to check Similarity. </Alert>
                    <View as="div" margin="1rem" borderRadius="6px" boxShadow="3px 3px 5px 6px var(--amplify-colors-neutral-60)">
                        <Card variation="elevated">
                            <div> <Badge marginBottom="1rem">ID Image</Badge> </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> <img src={idImage} alt="Face 1" /></div>
                        </Card>
                    </View>
                    <View as="div" margin="1rem" borderRadius="6px" boxShadow="3px 3px 5px 6px var(--amplify-colors-neutral-60)">
                        <Card variation="elevated">
                            <div>
                                <Badge marginBottom="1rem">FaceLiveness Image</Badge> </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <img src={"data:image/jpeg;base64," + faceLivenessAnalysis?.ReferenceImage?.Bytes} alt="Face 2" />
                            </div>
                        </Card>
                    </View>
                    <View as="div" margin="1rem">
                        <ButtonGroup justifyContent="center">

                            <Button
                                variation="primary"
                                isLoading={checking}
                                onClick={checkSimilarity}
                            >
                                Check
                            </Button>
                        </ButtonGroup >
                    </View>
                    {resultComponet(similarityScore, croppedImageUrl)}
                </div>
            </>
        )
    };

    return (
        <>
            {!similarityScore ? (<>{checkComponet()}</>) : (<>{resultComponet(similarityScore)}</>)}
        </>
    )
}

export default CompareFaceResult;
