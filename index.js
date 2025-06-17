const express = require("express");
const connectdb = require("./config/db.js");
const server = express();
connectdb();
const PORT = 5000;
server.use(express.json());

server.get("/",(req, res) => {
    res.send("Hello World!");
})
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});