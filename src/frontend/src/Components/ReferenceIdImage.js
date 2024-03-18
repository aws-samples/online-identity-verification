import {
    Image,
    Button,
    Card,
    View,
    ButtonGroup,
} from '@aws-amplify/ui-react';


export default ({ image, setImage, setTab }) => {
    return (
        <>
            <View as="div" margin="1rem" borderRadius="6px" boxShadow="3px 3px 5px 6px var(--amplify-colors-neutral-60)" >
                <Card variation="elevated" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Image src={image} alt="Screenshot" style={{flexDirection:'row', alignItems:'center'}}/>
                    </div>

                    <div>
                        <ButtonGroup justifyContent="center" marginTop="1rem">
                            <Button variation="primary" colorTheme="overlay"
                                onClick={() => {
                                    setImage(null)
                                }}
                            >
                                Try Again
                            </Button>
                            <Button
                                variation="primary"
                                onClick={() => {
                                    setTab('2')
                                }}
                            >
                                Next Step
                            </Button>
                        </ButtonGroup>
                    </div>
                </Card>
            </View>
        </>
    );
};
