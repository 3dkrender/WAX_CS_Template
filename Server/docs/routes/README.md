# Routes and Middlewares

## Routes

In order to facilitate the organization of different tasks within the application, routes have been separated using multiple middlewares. This allows accessing the routes in the following way:

**File `server.js`**

```javascript
app.use("/api", rtGetWAXApi);
app.use("/db", rtGetMongoApi);
```

**File `routes/rtGetWAXApi.js`**

```javascript
rtGetWAXApi.get("/getinfo", getInfo);
rtGetWAXApi.get("/getusertokens/:user", getUserTokens);
```

**File `routes/rtGetMongoApi.js`**

```javascript
rtGetMongoApi.get("/getdbinfo", getDbInfo);
rtGetMongoApi.get("/getusers", dbGetUsers);
```

Routes can be grouped by functionality, for example, all routes related to the database can be grouped in one middleware, and all routes related to the blockchain can be grouped in another middleware.

> Routing can be done using the `get`, `post`, `put`, and `delete` methods. For more information, refer to the [Express documentation](https://expressjs.com/guide/routing.html).

Routing loads the controllers responsible for handling the tasks. For example, the `/getinfo` route loads the `getInfo` controller located in the `controllers/waxapi/getInfo.js` file.