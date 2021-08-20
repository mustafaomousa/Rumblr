import { Section, Container, Heading } from 'react-bulma-components';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';

import "./index.css"

const WelcomePage = () => {

    return (
        <div className="WelcomePage columns">
            <Section className="column">
                <Container>
                    <Heading>
                        Log in
                    </Heading>
                    <LoginFormPage />    
                </Container>
            </Section>
            <Section className="column">
                <Container>
                    <Heading>
                        Sign up
                    </Heading>
                    <SignupFormPage />    
                </Container>
            </Section>
        </div>
    )
};

export default WelcomePage;