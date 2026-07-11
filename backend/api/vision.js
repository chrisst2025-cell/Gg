const axios = require("axios");


const meta = {

name:"Minato Vision",

version:"1.0.0",

path:"/api/vision"

};



async function onStart(req,res){


try{


const image =
req.body.image;


const prompt =
req.body.prompt ||
"Décris cette image";



if(!image){

return res.status(400).json({

error:"Image manquante"

});

}




// À connecter avec Gemini Vision API

const response =
await axios.post(

"TON_API_VISION_ICI",

{

image:image,

prompt:prompt

}

);



res.json({

ai:"Minato Namikaze",

vision:true,

response:
response.data

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
