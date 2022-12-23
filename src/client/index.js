const express = require('express');
const app = express();
const PORT = 3000;
const axios = require("axios");
const bodyParser = require("body-parser");
require('body-parser-xml')(bodyParser);
axios.defaults.baseURL = "http://localhost:1234/";
const xmlToJson = require('./util/xmlToJson');

app.use(bodyParser.json());
app.use(bodyParser.xml());
app.use(bodyParser.urlencoded({ extended: true }));

app.delete("/delete", async (request, response) => {
    try {
        const data = xmlToJson(request);
        const res = await axios({
            method: "delete",
            url: "/delete",
            data: data
        });
        response.json(res.data);
    } catch (err) {
        response.json({ message: err });
    }
})

app.put("/update", async (request, response) => {
    try {
        const data = xmlToJson(request);
        const res = await axios({
            method: "put",
            url: "/update",
            data: data
        });
        response.json(res.data);
    } catch (err) {
        response.json({ message: err });
    }
})

app.post("/create", async (request, response) => {
    try {
        const data = xmlToJson(request);
        const res = await axios({
            method: "post",
            url: "/create",
            data: data
        });
        response.json(res.data);
    } catch (err) {
        response.json({ message: err });
    }
})

app.get("/home", async (request, response) => {
    try {
        const res = await axios({
            method: "get",
            url: "/home",
        });
        response.json(res.data);
    } catch (err) {
        response.json({ message: err });
    }
})


app.listen(PORT, () => {
    console.log(`Proxy server listening at port number:${PORT}`);
});