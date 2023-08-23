import React from "react";
//Style
import './sass/index.scss';
//Components
import Add from "./Components/Add";
import List from "./Components/List";
import Config from "./Components/Config";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Msg from "./Components/Msg";
//Img
import HeaderDarkMobile from './assests/bg-mobile-dark.jpg';
import HeaderDarkDesktop from './assests/bg-desktop-dark.jpg';
import HeaderLightMobile from './assests/bg-mobile-light.jpg';
import HeaderLightDesktop from './assests/bg-desktop-light.jpg';
//Icon
import {BiLoaderAlt} from "react-icons/bi";

const App = () => {
  return (
    <div className="content">
      <Header/>
      <Add/>
      <Msg/>
      <List/>
      <Config/>
      <Footer/>
    </div>
  );
}

export default App;
