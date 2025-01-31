# GraphQL Expo App

This is a full-stack GraphQL-based Expo application. It includes a React Native frontend and a backend powered by GraphQL with Docker support.

## Features
- GraphQL API with Apollo Server
- React Native frontend using Expo
- Dockerized environment
- MongoDB database

## Prerequisites
Before running the project, ensure you have the following installed:
- [Docker](https://www.docker.com/) & Docker Compose

## Getting Started

### 1. Clone the Repository
```sh
git clone <repository-url>
cd graphql-expo-app

docker-compose up --build

This command will:

Start MongoDB as a Docker container

Start the Federated GraphQL API server
URL: http://localhost:4000

Start Expo App
URL: http://localhost:8081

## Expo Features
- Create an Account
- Add device for an Account
- View account devices