const axios = require("axios");


const meta={

name:"Minato Image Generator",

version:"1.0.0",

path:"/api/image"

};




async function onStart(req,res){


try{


const prompt =
req.query.prompt;



if(!prompt){

return res.json({

error:
"Ajoute un prompt"

});

}




// API génération image

const result =
await axios.get(

"TON_API_IMAGE_ICI",

{

params:{
prompt:prompt
}

}

);



res.json({

creator:"Chris st",

ai:"Minato Namikaze",

image:
result.data

});



}

catch(e){


res.status(500).json({

error:e.message

});


}



}



module.exports={
meta,
onStart
};
