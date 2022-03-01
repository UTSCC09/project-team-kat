### Backend

**Note**: You need to have the `.env` file in order to run the backend. 

To start the backend server (after installing Docker) and adding `.env` under `backend` directory:
```bash
cd backend # change directory to backend
docker build -t paymates . # build dockerfile and tag it "paymates"
docker container run --env-file .env --name pawmates-container -p <port>:8080 paymates # run container and expose the <port> port externally
```