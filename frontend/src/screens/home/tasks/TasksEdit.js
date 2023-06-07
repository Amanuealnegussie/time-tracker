import React, { useEffect, useState } from "react";
import Button from "../../../components/button/Button";
import "./Tasks.sass";
import TasksForm from "./TasksForm";
import { getRequest, putRequest } from "../../../util/axiosHandler";

const TasksEdit = ({ setTasksEditOpen, getTasks, currentId }) => {
  const [task, setTask] = useState({
    task: "",
    startTime: "",
    endTime: "",
  });
  const [user, setUser] = useState({});
  const handleChange = (name, value) => {
    setTask({
      ...task,
      [name]: value,
    });
  };
  const getUser = (id) => {
    getRequest(`/api/users/${id}`).then((res) => {
      setUser(res);
    });
  };

  const updateTask = () => {
    putRequest(`time-entries/${currentId}`, {
      ...task,
    }).then((res) => {
      if (res) {
        getTasks();
        setTasksEditOpen(false);
      }
    });
  };

  const getTask = () => {
    getRequest(`time-entries/${currentId}`).then((res) => {
      setTask(res[0]);
      getUser(res[0].userId);
    });
  };
  useEffect(getTask, [currentId]);

  return (
    <div className="task_form_container">
      <header>
        <div class="title">Edit Task</div>
        <Button title={"Save"} onClick={updateTask} />
      </header>
      <TasksForm handleChange={handleChange} task={task} user={user} />
    </div>
  );
};

export default TasksEdit;
