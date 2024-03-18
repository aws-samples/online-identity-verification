import React from "react";
import {
    ToggleButtonGroup,
    ToggleButton,
} from '@aws-amplify/ui-react';
import {  useState } from "react";

import '@aws-amplify/ui-react/styles.css';
import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness';
import {dictionary} from './dictionary';
console.log("dictionary.ja")
console.log(dictionary.ja)
console.log("dictionary.en")
console.log(dictionary.en)

function FaceLiveness({ faceLivenessAnalysis, sessionid }) {
    const [language, setLanguage] = useState('en');

    const endpoint = process.env.REACT_APP_ENV_API_URL ? process.env.REACT_APP_ENV_API_URL : ''
    const region = process.env.REACT_APP_REGION ? process.env.REACT_APP_REGION : "us-east-1"

    /*
    * Get the Face Liveness Session Result
    */
    const handleAnalysisComplete = async () => {
        const response = await fetch(endpoint + 'getfacelivenesssessionresults',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sessionid: sessionid })
            }

        );
        const data = await response.json();
        faceLivenessAnalysis(data.body)
    };

    return (
        <>
            <ToggleButtonGroup
                value={language}
                isExclusive
                onChange={(value) => setLanguage(value)}
            >
                <ToggleButton value="en">English</ToggleButton>
                <ToggleButton value="ja">日本語</ToggleButton>
                <ToggleButton value="es">español</ToggleButton>
            </ToggleButtonGroup>
            <FaceLivenessDetector
                sessionId={sessionid}
                region={region}
                displayText={dictionary[language]}
                onAnalysisComplete={handleAnalysisComplete}
                onError={(error) => {
                    console.error(error);
                }}
            />
        </>
    );
}

export default FaceLiveness;
