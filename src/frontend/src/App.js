import './App.css';
import React from "react";
import { Amplify } from 'aws-amplify';
import { ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import FaceLiveness from './Components/FaceLiveness';
import ReferenceImage from './Components/ReferenceImage';
import ImageUploader from './Components/ImageUploader';
import ReferenceIdImage from './Components/ReferenceIdImage';
import CompareFace from './Components/CompareFace';
import { useEffect } from "react";
import {
  View,
  Flex,
  Tabs,
  Badge,
  Alert,
  Loader,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsexports from './aws-exports';

Amplify.configure(awsexports);
const endpoint = process.env.REACT_APP_ENV_API_URL ? process.env.REACT_APP_ENV_API_URL : ''
function App() {

  const [faceLivenessAnalysis, setFaceLivenessAnalysis] = React.useState(null)
  const [sessionid, setSessionid] = React.useState()
  const [loading, setLoading] = React.useState(true);
  const [idImage, setIdImage] = React.useState(null);
  const [tab, setTab] = React.useState('1');

  useEffect(() => {
    /*
    * API call to create the Face Liveness Session
    */
    const fetchCreateLiveness = async () => {
      const response = await fetch(endpoint + 'createfacelivenesssession');
      const data = await response.json();
      setSessionid(data.sessionId)
      setLoading(false);

    };
    fetchCreateLiveness();

  }, [])

  const getfaceLivenessAnalysis = (faceLivenessAnalysis) => {
    if (faceLivenessAnalysis !== null) {
      setFaceLivenessAnalysis(faceLivenessAnalysis)
    }
  }

  const tryagain = () => {
    setFaceLivenessAnalysis(null)
  }


  return (
    <ThemeProvider>
      <Flex
        direction="row"
        justifyContent="center"
        alignItems="center"
        alignContent="flex-start"
        wrap="nowrap"
        gap="1rem"
      >
        <View
          as="div"
          maxHeight="600px"
          height="600px"
          width="740px"
          maxWidth="740px"
        >
          <Badge>SessionID: {sessionid}</Badge>
          {loading ? (
            <Loader />
          ) : (
            <Tabs
              defaultValue={'1'}
              value={tab}
              onValueChange={(tab) => setTab(tab)}
              items={[
                {
                  label: 'Upload identity verification doc', value: '1', content: (
                    <>
                      {
                        idImage ? (
                          <ReferenceIdImage image={idImage} setImage={setIdImage}  setTab={setTab} />
                        ) :
                          (<ImageUploader  setImage={setIdImage} sessionid={sessionid}  />)
                      }
                    </>
                  )
                },

                {
                  label: 'FaceLiveness', value: '2', content: (<>{faceLivenessAnalysis && faceLivenessAnalysis.Confidence ? (
                    <ReferenceImage faceLivenessAnalysis={faceLivenessAnalysis} tryagain={tryagain} setTab={setTab}></ReferenceImage>
                  ) :
                    (<FaceLiveness faceLivenessAnalysis={getfaceLivenessAnalysis} sessionid={sessionid} loading={loading} />)}</>)
                },
                {
                  label: 'Check Similarity', value: '3', content: (<>
                    {
                      idImage && faceLivenessAnalysis && faceLivenessAnalysis.Confidence ?
                        (<CompareFace idImage={idImage} faceLivenessAnalysis={faceLivenessAnalysis} sessionid={sessionid} />) :
                        (<Alert variation="error">"You must upload image in former two step"</Alert>)
                    }</>
                  )
                }

              ]}
            />)}


        </View>
      </Flex>
    </ThemeProvider>


  );
}

export default App;
