import React, { useEffect, useState } from "react";
//Style
import "./sass/index.scss";
//Firestore
import { getFirestore } from "firebase/firestore";
import { collection, onSnapshot, doc } from "firebase/firestore";
import store from "./firebase/firebaseConfig";
//Components
import Add from "./Components/Add";
import List from "./Components/List";
import Config from "./Components/Config";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Msg from "./Components/Msg";
//Img
import HeaderDarkDesktop from "./assests/bg-desktop-dark.jpg";
import HeaderDarkMobile from "./assests/bg-mobile-dark.jpg";
import HeaderLightDesktop from "./assests/bg-desktop-light.jpg";
import HeaderLightMobile from "./assests/bg-mobile-light.jpg";
//Icon
import { BiLoaderAlt } from "react-icons/bi";

const App = () => {
  const [Tasks, setTasks] = useState([]);
  const [TasksAll, setTasksAll] = useState([]);
  const [Theme, setTheme] = useState("dark");
  const [Id, setId] = useState(null);
  const [CurrentFilter, setCurrentFilter] = useState("all");
  const [Reset, setReset] = useState(false);
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
      const completed = temp.filter((task) => task.completed);
      let arrCompleted = [];
      completed.forEach((item) => {
        arrCompleted.push(item);
      });
      setCompleted(arrCompleted);
      console.log(temp);
    });
  }, []);

  const setCompleted = (newId) => setId(newId);

  const changeTheme = (newTheme) => setTheme(newTheme);

  const getAllTasks = () => (setTasks(TasksAll), setCurrentFilter("all"));

  const getActiveTasks = (activeTasks) => (
    setTasks(activeTasks), setCurrentFilter("active")
  );

  const getCompletedTasks = (completedTasks) => (
    setTasks(completedTasks), setCurrentFilter("completed")
  );

  const reset = (isReset) => setReset(isReset);

  return (
    <main>
      <img
        src={HeaderDarkDesktop}
        className="img-dark-desktop"
        alt="desktop header dark"
      />
      <img
        src={HeaderDarkMobile}
        className="img-dark-mobile"
        alt="mobile header dark"
      />
      <img
        src={HeaderLightDesktop}
        className="img-light-desktop"
        alt="desktop header light"
      />
      <img
        src={HeaderLightMobile}
        className="img-light-mobile"
        alt="mobile hader light"
      />
      <div className={`content ${Theme}`}>
        <Header changeTheme={changeTheme} />
        <Add countTask={Tasks.length} setReset={reset} reset={Reset} />
        {Loading ? (
          <div className="loading">
            <h2>Loading...</h2>
            <BiLoaderAlt className="icon-loading" />
          </div>
        ) : null}
        <Msg tasks={Tasks} filter={CurrentFilter} loading={Loading} />
        <List list={Tasks} />
        <Config
          numTasks={Tasks.length}
          completed={Id}
          staticTasks={TasksAll}
          getAll={getAllTasks}
          getActive={getActiveTasks}
          getCompleted={getCompletedTasks}
          reset={Reset}
        />
        <Footer />
      </div>
    </main>
  );
};

export default App;
