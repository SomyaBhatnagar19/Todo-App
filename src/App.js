import React, { useEffect, useState } from "react";
//Style
import "./sass/index.scss";
//Firestore
import { getFirestore } from "firebase/firestore";
import { collection, onSnapshot } from "firebase/firestore";
import store from "./firebase/firebaseConfig";
//Components
import Add from "./Components/Add";
import List from "./Components/List";
import Config from "./Components/Config";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Msg from "./Components/Msg";
//Img
import HeaderDarkMobile from "./assests/bg-mobile-dark.jpg";
import HeaderDarkDesktop from "./assests/bg-desktop-dark.jpg";
import HeaderLightMobile from "./assests/bg-mobile-light.jpg";
import HeaderLightDesktop from "./assests/bg-desktop-light.jpg";
//Icon
import { BiLoaderAlt } from "react-icons/bi";

const App = () => {
  const [Tasks, setTasks] = useState([]);
  const [TasksAll, setTasksAll] = useState([]);
  const [Theme, setTheme] = useState("dark");
  const [Id, setId] = useState(null);
  const [CurrentFilter, setCurrentFilter] = useState("all");
  const [Rest, setReset] = useState(false);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    onSnapshot(collection(store, "tasks"), (snapshot) => {
      let temp = [];
      snapshot.docs.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      setLoading(false);
      setTasks(temp);
      setTasksAll(temp);
      const completed = temp.filter((task)=> task.completed);
      let arrCompleted = [];
      completed.forEach((item)=>{
        arrCompleted.push(item);
      })
      setCompleted(arrCompleted);
      console.log(temp);
    });
  }, []);

  const setCompleted = (newId) => setId(newId);
  return (
    <div className="content">
      <Header />
      <Add />
      <Msg />
      <List />
      <Config />
      <Footer />
    </div>
  );
};

export default App;
