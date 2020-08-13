const express = require('express');
const routes = express.Router();
const instructors = require('./instructor')

routes.get('/', (req, res)=>{
    return res.redirect("/instructors"); 
})

routes.get('/instructors', instructors.index)

routes.get('/instructors/create', (req, res)=>{
    return res.render('instructors/create')
})
routes.get('/instructors/:id', instructors.show);
routes.post('/instructors',instructors.post);

routes.get('/instructors/:id/edit', instructors.edit);
routes.put('/instructors', instructors.put);
routes.delete('/instructors', instructors.delete)


routes.get('/members', (req,res)=>{
    return res.send("members"); 
})
module.exports = routes