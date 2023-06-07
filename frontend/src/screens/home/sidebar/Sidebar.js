import React from "react";
import "./Sidebar.sass";
import logo from "../../../assets/logo_white.png";

const Sidebar = ({ tab, setTab }) => {
  return (
    <div className="sidebar_container">
      <header>
        <img src={logo} alt="logo" class="img" />
      </header>
      <main>
        <div
          class={tab === 1 ? "tab_selected" : "tab"}
          onClick={() => {
            setTab(1);
          }}
        >
          Tasks
        </div>
        <div
          class={tab === 2 ? "tab_selected" : "tab"}
          onClick={() => {
            setTab(2);
          }}
        >
          Users
        </div>
        <div
          class={tab === 3 ? "tab_selected" : "tab"}
          onClick={() => {
            setTab(3);
          }}
        >
          Settings
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
