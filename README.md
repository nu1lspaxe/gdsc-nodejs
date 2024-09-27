# gdsc-nodejs

This repository is for tutorial purpose.

Run the command to install dependencies.
```bash
npm install
```

#### API Protocol
- rest
  Create `.env` file and put your mongodb connection link to `MONGODB_URL`.
- websocket
  A client connect to server through `wscat`. (in terminal)
  ```bash
  # npm install wscat
  wscat -c ws://localhost:3000
  ```
- graphql

#### Authentication
- jwt-mongodb