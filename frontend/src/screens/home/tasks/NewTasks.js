import React, { useState } from "react";
import Button from "../../../components/button/Button";
import "./Tasks.sass";
import TasksForm from "./TasksForm";
import { postRequest } from "../../../util/axiosHandler";

const NewTasks = ({ setNewTasksOpen, getTasks }) => {
  const [task, setTask] = useState({
    task: "",
    startTime: "",
    endTime: "",
  });
  const handleChange = (name, value) => {
    setTask({
      ...task,
      [name]: value,
    });
  };

  const createNewTask = () => {
    postRequest("/time-entries", {
      ...task,
    }).then((res) => {
      if (res) {
        getTasks();
        setNewTasksOpen(false);
      }
    });
  };
  return (
    <div className="task_form_container">
      <header>
        <div class="title">New Task</div>
        <Button title={"Add"} onClick={createNewTask} />
      </header>
      <TasksForm task={task} handleChange={handleChange} />
    </div>
  );
};

export default NewTasks;
