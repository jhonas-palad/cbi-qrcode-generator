import AppContainer from "../components/AppContainer";
import Container from "../components/Container";
import cbiLogo from '../assets/images/CBI Logos-01.svg';
import URLQRGenerator from './URLQRGenerator'

const Layout = () => {
    return (
        <AppContainer full base>
            <Container className="header">
                <div className='logo-wrapper'>
                    <img src={cbiLogo} width={200} height={64} />
                </div>
            </Container>
            {/* <NavLinks/> */}
            <URLQRGenerator />
            <Container className="footer">
                <p className='bottom-cbi-text'>
                    Center for Business and Innovation <br/>
                    INSPIRE, INNOVATE, IMMERSE
                </p>
            </Container>
        </AppContainer>
        
    )
}

export default Layout;
