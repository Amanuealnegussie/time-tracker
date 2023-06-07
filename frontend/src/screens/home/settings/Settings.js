import React, { useEffect, useState } from "react";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import "./Settings.sass";
import {
  deleteRequest,
  getRequest,
  putRequest,
} from "../../../util/axiosHandler";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const handleChange = (name, value) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const getUser = () => {
    getRequest("/api/users/profile").then((res) => setUser({ ...res }));
  };

  const deleteUser = () => {
    deleteRequest("/api/users/profile").then((res) => {
      if (res) {
        localStorage.removeItem("user");
        navigate("/");
      }
    });
  };

  const editUser = () => {
    putRequest(`/api/users/profile`, {
      ...user,
    }).then((res) => {
      if (res) {
        localStorage.setItem("user", JSON.stringify(res));
      }
    });
  };

  useEffect(getUser, []);

  return (
    <div className="settings_container">
      <div class="card">
        <div class="title">General</div>
        <div class="inputs">
          <div class="row">
            <Input
              label="Name"
              value={user.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              disabled
              value={user.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div class="buttons">
            <Button onClick={editUser} title={"Save"} />
            <Button onClick={deleteUser} title={"Delete"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
