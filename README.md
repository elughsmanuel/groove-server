# GROOVE STREAMING

## Overview

This project powers a cutting-edge music streaming app, simplifying music organization, user verification, and playlist management. Designed to cater to a diverse audience, including music enthusiasts, artists, curators, advertisers, and administrator.

## Features

- **Music Discovery:** Explore and find your favorite tunes with ease.
- **Playlist Creation:** Curate personalized playlists to match your mood and style.
- **Streaming Experience:** Record and manage financial transactions seamlessly.
- **User Authentication** Secure access for both users and administrators.

## API Documentation

For detailed API documentation, you can refer to the [Swagger/OpenAPI Documentation.](http://localhost:8000/api/v1/docs)

## Built With

Express.js - Web Framework  
Typescript - Programming language  
PostgreSQL/Prisma - Database /ORM 

## Prerequisites

Node.js version 16.x.x or higher

## Installation

1. Clone the repository and navigate to the project directory

2. Run the following command to clone:

```bash
  git clone https://github.com/elughsmanuel/gloq-server.git

```

3. Create a `.env` file in the root directory and set the environment variables, see `.env_example` file for an example.

## Database Configuration

This application uses MongoDB as its database. To configure the database, add the following environment variables to a .env file in the root directory of the project:

```bash
NODE_ENV=node_environment
HOST=server_host
PORT=server_port
DATABASE_URL="postgresql://postgres:password@localhost:5432/groove?schema=public"
```

Replace node_environment, server_host, server_port, database_url with your values.

## Install app dependencies

```bash
npm install
```

It will install all modules listed as dependencies in package.json.

## Running the app

```bash
npm run dev
```

## Start up server

When you see...

[1] [DATABASE] - Database connection has been established successfully.  
[1] - - - - - - - - - -  
[1] 🌟 🛠️  [SERVER] - Server is listening on http://${host}:${port}  

...server is up and running.
