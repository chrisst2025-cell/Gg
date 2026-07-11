const fs=require("fs");


const file="./database/users.json";



if(!fs.existsSync(file)){

fs.writeFileSync(file,"{}");

}




async function onStart(req,res){


const uid=req.query.uid;



let users =
JSON.parse(
fs.readFileSync(file)
);



if(!users[uid]){


users[uid]={


name:"Utilisateur",

premium:false,


stats:{

messages:0,

images:0,

words:0

},


created:new Date()


};


fs.writeFileSync(

file,

JSON.stringify(users,null,2)

);


}




res.json(users[uid]);



}



module.exports={

onStart

};
