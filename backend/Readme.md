# CleanAirMap Backend

## About
The CleanAirMap backend is a GraphQL schema and data storage for the client app. The schema is implemented using GraphQL Nexus, and the primary data model is managed by Prisma Migrate

## Getting started
To try out the backend, you can get an example running using Docker Compose

1. Clone the repository
2. From the respository root:
   1. `npm install` to get the dependencies
   2. `npm run build` to build the project
   3. Configure the service using the .env file. You can use env.sample as a guide
   4. `docker-compose up` to build the server image and spin up the service


## Making changes

While working on the GraphQL implementation, it is recommended to have the development server running. It will detect changes and reload, generating the required Typescript types on-the-fly.

To run the development server

1. Have a PostGres listening on the DATABASE_PORT defined in .env
    - You can use the docker-compose app from "Getting Started"
      - you will be able to connect to the same PostGres and use PGAdmin as needed)
      - if you choose the option, set an environment variable PLAYGROUND_PORT in your shell, to avoid colliding with the cleanair-be container's mapped port
    - Or, run your own PostGres however you choose

2. `npm run dev`