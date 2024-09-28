# jwt-mongodb

Default, the mongodb is use local database.
```bash
mongod      # start mongodb server
mongosh     # interact with database 
```

Install dependencies and run the server.
```bash
npm install
node server.js
```

To modify the connection link, which is in `server.js`
```javascript
db.mongoose.connect(`mongodb://<address>:<port>/<dbname>`);
```