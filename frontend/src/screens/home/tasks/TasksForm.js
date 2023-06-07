import React from "react";
import Input from "../../../components/input/Input";

const TasksForm = ({ task, handleChange, user }) => {
  return (
    <div className="task_form_container">
      <div class="card">
        <div class="task">
          <Input
            label="Task Name"
            value={task.task}
            onChange={(e) => handleChange("task", e.target.value)}
          />
        </div>
        <div class="times">
          <div class="time">
            <div class="title">Start Time</div>
            <input
              type="time"
              value={task.startTime}
              onChange={(e) => handleChange("startTime", e.target.value)}
            />
          </div>
          <div class="time">
            <div class="title">Start Time</div>
            <input
              type="time"
              value={task.endTime}
              onChange={(e) => handleChange("endTime", e.target.value)}
            />
          </div>
        </div>
      </div>
      {user && (
        <div class="user_card">
          <div class="title">Created By</div>
          <div class="task">
            <Input label="Name" value={user.name} disabled />
            <Input label="Email" value={user.email} disabled />
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksForm;
