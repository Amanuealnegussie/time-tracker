import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./Users.sass";
import { getRequest } from "../../../util/axiosHandler";
import dayjs from "dayjs";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    getRequest("/api/users").then((res) => {
      setUsers(res);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);
  const columns = [
    {
      name: "NAME",
      cell: (row) => <div className="row">{row.name}</div>,
      grow: 2,
    },
    {
      name: "Email",
      cell: (row) => <div className="row">{row.email}</div>,
      grow: 2,
    },
    {
      name: "CREATED AT",
      cell: (row) => (
        <div className="row">{dayjs(row.createdAt).format("MM/DD/YYYY")}</div>
      ),
      grow: 2,
    },
  ];

  return (
    <div className="tasks_container">
      <DataTable columns={columns} data={users} responsive={true} pagination />
    </div>
  );
};

export default Users;
