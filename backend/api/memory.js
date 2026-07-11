const fs=require("fs");


const file="./database/memory.json";



if(!fs.existsSync(file)){

fs.writeFileSync(file,"{}");

}





function load(){

return JSON.parse(
fs.readFileSync(file)
);

}



function save(data){

fs.writeFileSync(

file,

JSON.stringify(
data,
null,
2
)

);

}





async function onStart(req,res){


const uid=req.query.uid;


const text=req.query.text;


let memory=load();



if(!memory[uid]){

memory[uid]=[];

}




if(text){


memory[uid].push({

content:text,

date:new Date()

});


save(memory);


}




res.json({

uid:uid,

memory:
memory[uid]

});



}




module.exports={

onStart

};
