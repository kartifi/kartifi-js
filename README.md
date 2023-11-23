Kartifi is an open source headless e-commerce platform built with Typescript, Express and React. It is a full-stack e-commerce solution.

## Getting Started
Clone the repository. Go to core directory. Rename the .env.sample file to .env.development and fill the file with your credentials. 
```bash
$ cd packages/core
$ mv .env.sample .env.development
```
After filling .env.development run the following command in root
```bash
$ docker-compose up
```
This will start the server, admin, and frontend. Go to http://localhost:5173/products to see the store and http://localhost:5174/products to access the admin panel.

