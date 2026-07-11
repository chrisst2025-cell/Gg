const fs=require("fs");


const file="./config/admin.json";



function settings(req,res){


if(!fs.existsSync(file)){


return res.json({

background:{},

music:{}


});


}



const data =
JSON.parse(
fs.readFileSync(file)
);



res.json(data);


}





module.exports={

settings

};
