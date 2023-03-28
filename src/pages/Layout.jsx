import { Outlet, useLocation, useNavigate  } from "react-router-dom";
import { useEffect } from "react";
import AppContainer from "../components/AppContainer";
import Container from "../components/Container";
import NavLinks from "../components/NavLinks";
import cbiLogo from '../assets/images/CBI Logos-01.svg';


const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => { 
        location.pathname === '/' && navigate('url');
    }, [location.pathname]);
    return (
        <AppContainer full base>
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