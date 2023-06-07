# Time Tracking App - README

Welcome to the Time Tracking App! This README provides instructions on how to run the app.

![ac](https://github.com/Amanuealnegussie/time-tracker/assets/135860412/32517499-da93-4097-a5ff-b512f7f98fb0)


## Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)

# Prerequisites

Before running the app, please ensure that you have the following software installed on your machine:

- Node.js
- npm
- MySQL

# Installation

To install the project dependencies, follow these steps:

1.  Clone the project repository to your local machine.
2.  Open a terminal and navigate to the project's root directory.
3.  Run the following command to install the dependencies:

        npm run install-all

# Running the App

Before running the project, make sure to set up the necessary environment variables by creating a `.env` file in the project's root directory. Open the `.env` file and add the following lines ( It can be any word for the JWT_SECRET):

    JWT_SECRET = xxx

    DATABASE_HOST = xxx

    DATABASE_USER = xxx

    DATABASE_PASSWORD = xxx

    DATABASE_NAME = xxx

To start both the server and the client app, use the following command:

    npm run dev

To start only the backend server, use the following command:

    npm run server
