const express = require('express');
const routes = express.Router();

routes.get('/', ()=>{
    return res.send("ok")
})

module.exports = routes