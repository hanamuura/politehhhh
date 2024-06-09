import './App.css';
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { routes } from "./routes";
import { StartPage } from "./pages/StartPage";
import styled from "styled-components";
import { TestPage } from "./pages/TestPage"
import textLogo from "./recources/images/MOZY.svg"
import logo from "./recources/images/logo 1.svg"
import searchLogo from "./recources/images/Free_Search_PNG__SVG_Icon-removebg-preview 1.svg"
import favouriteLogo from "./recources/images/Снимок_экрана_2023-11-12_203345-removebg-preview 1.svg"
import CustomButton from "./components/UI/CustomButton";
import AdminPage from './pages/AdminPage';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import LogoIcon from './components/LogoIcon';
import { UserProvider, UserContext } from './components/contexts/UserContext';
import { useContext, useEffect } from 'react';
import Login from './modals/Login';
import { useToggle } from './hooks/useToggle';
import { FaUser } from "react-icons/fa6";
import Cookies from 'js-cookie';
import { Bucket } from './pages/Bucket';
import { FaArrowUp } from 'react-icons/fa';
import logoFooter from './images/logoFooter.svg'

function App() {

  const location = useLocation()
  const { currentUser, login, logout } = useContext(UserContext)
  const { isOpen, toggle } = useToggle()
  useEffect(() => {
    const user = Cookies.get('user')
    if (user) {
      login(JSON.parse(user))
    }
  }, [])

  return (
    <div className='flex flex-col'>
      {location.pathname !== routes.admin && (
        <Header>
          <LogoContainer>
            <Link to={routes.main}>
              <LogoIcon />
            </Link>
          </LogoContainer>
          <Links>
            {currentUser?.is_super ? <NavLink to={routes.admin}>Админка</NavLink> : null}
          </Links>
          <AuthContainer>
            <Container>
              <Link to={routes.bucket}>
                <FavouriteLogo src={favouriteLogo} />
              </Link>
            </Container>
            {currentUser ? <Link to={routes.user}><FaUser className='w-[25px] h-[25px]' /></Link> : <CustomButton onClick={toggle}>Войти</CustomButton>}
          </AuthContainer>
        </Header>
      )}
      <Routes>
        <Route path={routes.main} element={<StartPage />} />
        <Route path={routes.admin} element={<AdminPage />} />
        <Route path={routes.product} element={<ProductPage />} />
        <Route path={routes.user} element={<ProfilePage />} />
        <Route path={routes.bucket} element={<Bucket />} />
      </Routes>
      {isOpen && <Login isOpen={isOpen} onClose={toggle} />}
      {location.pathname !== routes.admin && (
        <footer className="flex w-[98%] h-[500px] relative bg-[#B5B2D0] rounded-[20px] mt-32 ml-5 mr-5 mb-5 self-center">
          <div className="absolute top-[-15%] left-[75%] h-[200px] w-[200px] rounded-[50%] border-white border-[20px] bg-[#7E83AE] flex items-center justify-center">
            <FaArrowUp className="h-[80px] text-white w-[60px]" />
          </div>
          <div className="flex mt-[90px] ml-[90px]">
            <div className="flex flex-col w-[300px] text-white gap-8">
              <img src={logoFooter} className='w-[150px] h-[50px]' />
              <p>В нашем зоомагазине вы найдете все необходимые товары для различных видов животных.</p>
              <p>+375 (33) 200-42-90</p>
              <p>mozzy_petshop@gmail.com</p>
            </div>
          </div>
        </footer>)}
    </div>

  );
}

const A = styled.a`
  text-decoration: none;
  color: black;
  position: relative;
  cursor: pointer;

  &::after{
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background-color: rgba(126, 131, 174, 1);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    color: rgba(126, 131, 174, 1);
  }

  &:hover::after,
  &.active::after {
    transform: scaleX(1);
  }

  &:visited::after ,
  &.active:visited::after {
    transform: scaleX(1);
  }
`

const Container = styled.div`
  display: flex;
  position: relative;
`

const Circle = styled.div`
  position: absolute;
  left: calc(100% - 4.3em);
  top: 2px;
  width: 12px;
  height: 12px;
  background: rgba(126, 131, 174, 1);
  border-radius: 50%;
  color: white;
  text-align: center;
  font-size: 9px;
`

const FavouriteLogo = styled.img`
  margin: 0 32px 0 21px;
  cursor: pointer;
  position: relative;
`

const SearchLogo = styled.img`
  cursor: pointer;
`

const AuthContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const LogoContainer = styled.div`
  display: flex;
`

const TextLogo = styled.img``

const Logo = styled.img`
  margin: 6px;
`

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 90px;
  background: #FCFFFD;
  align-items: center;
  justify-content: space-around;
`

const Links = styled.div`
  display: flex;
  width: 261px;
  justify-content: space-between;
  gap: 20px;
  
`
const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  position: relative;
  
  &::after{
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background-color: transparent;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    color: rgba(126, 131, 174, 1);
    
    &::after {
      background-color: rgba(126, 131, 174, 1);
      transform: scaleX(1);
    }
  }
  
  &.active {
    color: rgba(126, 131, 174, 1);
    
    &::after {
      background-color: rgba(126, 131, 174, 1);
      transform: scaleX(1);
    }
  }
`

export default App;
