import { Outlet, Link } from "react-router-dom";
import './style.css';
import AppContainer from "../../components/AppContainer";
import Container from "../../components/Container";
import NavLinks from "../../components/NavLinks";
import cbiLogo from '../../assets/images/CBI Logos-01.svg';

const Layout = () => {
    return (
        <AppContainer base>
            <Container className="header">
                <div className='logo-wrapper'>
                    <img src={cbiLogo} width={200} height={64} />
                </div>
            </Container>
            <NavLinks/>
            <Outlet />
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