const fs = require('fs');
const data = require('./data.json');

// create 
exports.post = (req,res)=>{

    const keys = Object.keys(req.body)

    for (let key of keys) {
        if(req.body[key] ==""){
            return res.send('Please, fill all fields')
        }
    }
    let { avatar_url, birth, name, services, gender} = req.body

    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number(data.instructors.length + 1);


    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        created_at,
        services,
    })


    fs.writeFile("data.json", JSON.stringify(data,null,2), (err)=>{
        if (err) return res.send("Write file error"); 
    
        return res.redirect("/instructors")
    })

   
}

// show

exports.show = (req,res)=>{
    const { id } = req.params

    const foundInstructor = data.instructors.find((instructor)=>{
        return instructor.id == id
    }); 

    if(!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foundInstructor,
        age:"",  
        services: foundInstructor.services.trim().split(","),
        created_at:""
    }

    return res.render("instructors/show", {instructor})

}
