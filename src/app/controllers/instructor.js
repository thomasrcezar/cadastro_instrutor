const { age, date} = require('../../lib/utils');
const Instructor = require('../models/Instructor')

module.exports ={
    index(req,res){
        const { filter } = req.query
        if(filter){
            Instructor.findBy(filter, (instructors)=>{
                return res.render("instructors/index",{instructors, filter}) 
            })
        }else{
            
            Instructor.all((instructors)=>{
                return res.render("instructors/index",{instructors})
                
            })
        }

    },
    create(req,res){
        return res.render('instructors/create')
    },
    post(req,res){
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if(req.body[key] ==""){
                return res.send('Please, fill all fields')
            }
        };

       Instructor.create(req.body,(instructor)=>{
        return res.redirect(`/instructors/${instructor.id}`)

       })
    
    },
    show(req,res){
        Instructor.find(req.params.id, (instructor)=>{
            if(!Instructor) return res.send("Instructor not found")
            
            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(",")
            instructor.created_at = date(instructor.created_at).format
            
            return res.render("instructors/show", {instructor})

        })
    },
    edit(req,res){
        Instructor.find(req.params.id, (instructor)=>{
            if(!instructor) return res.send("Instructor not found")
            
            instructor.birth = date(instructor.birth).iso
            instructor.services = instructor.services.split(",")
            instructor.created_at = date(instructor.created_at).format
            
            return res.render("instructors/edit", {instructor})

        })
    },
    put(req,res){
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if(req.body[key] ==""){
                return res.send('Please, fill all fields')
            }
        }
        Instructor.update(req.body, ()=> res.redirect(`instructors/${req.body.id}`))
    },
    delete(req, res){
        Instructor.delete(req.body.id, ()=> res.redirect('/instructors'))
    }
}

