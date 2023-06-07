import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import "./Home.sass";
import Button from "../../components/button/Button";
import { isAuth } from "../../util/isAuth";
import { useNavigate } from "react-router-dom";
import Tasks from "./tasks/Tasks";
import Users from "./users/Users";
import Settings from "./settings/Settings";

const Home = () => {
  const [tab, setTab] = useState(1);
  const [user] = useState(() => {
    let value = window.localStorage.getItem("user")
      ? JSON.parse(window.localStorage.getItem("user"))
      : {};

    return value;
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth()) {
      navigate("/");
    }
  }, [navigate]);
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div className="home_container">
      <div class="sidebar">
        <Sidebar tab={tab} setTab={setTab} />
      </div>
      <div class="content">
        <div class="header">
          <div class="title">
            <span class="name">{user && user.name}</span>
            <span class="email">{user && user.email}</span>
          </div>
          <Button title={"Logout"} onClick={logout} />
        </div>
        <main>
          {tab === 1 ? <Tasks /> : tab === 2 ? <Users /> : <Settings />}
        </main>
      </div>
    </div>
  );
};

export default Home;
