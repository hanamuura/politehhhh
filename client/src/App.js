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
import { CustomButton } from "./components/UI/CustomButton";
import AdminPage from './pages/AdminPage';

function App() {

  const location = useLocation()

  return (
    <div>
      {location.pathname !== routes.admin && (
        <Header>
          <LogoContainer>
            <Logo src={logo} />
            <TextLogo src={textLogo} />
          </LogoContainer>
          <Links>
            <NavLink to={routes.startPage}>Каталог</NavLink>
            <A>Доставка</A>
            <A>Контакты</A>
          </Links>
          <AuthContainer>
            <Container>
              <SearchLogo src={searchLogo} />
              <FavouriteLogo src={favouriteLogo} />
              <Circle>0</Circle>
            </Container>
            <CustomButton>Войти</CustomButton>
          </AuthContainer>
        </Header>
      )}
      <Routes>
        <Route path={routes.main} element={<StartPage />} />
        <Route path={routes.test} element={<TestPage />} />
        <Route path={routes.admin} element={<AdminPage />} />
      </Routes>
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
    background-color: #689F9A;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    color: #689F9A;
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
  background: #5C8D87;
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
  
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
  position: relative;
  
  &::after{
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background-color: #689F9A;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    color: #689F9A;
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

export default App;
