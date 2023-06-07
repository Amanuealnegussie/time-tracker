import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./Tasks.sass";
import Button from "../../../components/button/Button";
import SliderModal from "../../../components/sliderModal/SliderModal";
import TasksEdit from "./TasksEdit";
import NewTasks from "./NewTasks";
import { deleteRequest, getRequest } from "../../../util/axiosHandler";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const [newTasksOpen, setNewTasksOpen] = useState(false);
  const [TasksEditOpen, setTasksEditOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const getTasks = () => {
    getRequest("/time-entries").then((res) => {
      setTasks(res[0]);
    });
  };

  const deleteTask = (id) => {
    deleteRequest(`time-entries/${id}`).then((res) => {
      if (res) {
        getTasks();
      }
    });
  };

  const to12Time = (timeString) => {
    const timeString12hr = new Date(
      "1970-01-01T" + timeString + "Z"
    ).toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });
    return timeString12hr;
  };
  dayjs.extend(customParseFormat);

  useEffect(() => {
    getTasks();
  }, []);
  const columns = [
    {
      name: "NAME",
      cell: (row) => <div className="row">{row.task}</div>,
      grow: 2,
    },
    {
      name: "START TIME",
      cell: (row) => <div className="row">{to12Time(row.startTime)}</div>,
      grow: 1,
    },
    {
      name: "END TIME",
      cell: (row) => <div className="row">{to12Time(row.endTime)}</div>,
      grow: 1,
    },
    {
      name: "ACTIONS",
      selector: (row) => row.actions,
      cell: (row) => (
        <>
          <Button
            title={"Edit"}
            small
            onClick={() => {
              setCurrentId(row.id);
              setTasksEditOpen(true);
            }}
          />
          <Button
            title={"Delete"}
            small
            onClick={() => {
              deleteTask(row.id);
            }}
          />
        </>
      ),
      grow: 1,
    },
  ];

  return (
    <div className="tasks_container">
      <header>
        <Button title={"New Task"} onClick={() => setNewTasksOpen(true)} />
      </header>
      <DataTable columns={columns} data={tasks} responsive={true} pagination />
      <SliderModal clickState={TasksEditOpen} setClickState={setTasksEditOpen}>
        <TasksEdit
          setTasksEditOpen={setTasksEditOpen}
          getTasks={getTasks}
          currentId={currentId}
        />
      </SliderModal>
      <SliderModal clickState={newTasksOpen} setClickState={setNewTasksOpen}>
        <NewTasks setNewTasksOpen={setNewTasksOpen} getTasks={getTasks} />
      </SliderModal>
    </div>
  );
};

export default Tasks;
