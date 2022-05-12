## Goal Setting App

> Follows the Traversy Media MERN tutorial. This is a quick reference repo for all the most modern MERN development, Docker and CI/CD practices

#### Run the App

1. Create a .env file and add the following configurations to the file

```bash
PORT=4000
MONGO_URI=<your_uri>
```

**Run Using Docker (recommended)**

```bash
# Docker build
Make build-dev-image
# Docker run
Make run-dev-image
# Ensure container is running (given it runs in detatched mode)
docker ps -a | grep node-app
```

**Run Using NPM**

```bash
npm install
npm run server
```
