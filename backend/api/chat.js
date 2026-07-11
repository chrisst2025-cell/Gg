const axios = require("axios");
const fs = require("fs");
const path = require("path");



const conversationFile =
path.join(
__dirname,
"../database/conversations.json"
);



if(!fs.existsSync(conversationFile)){

fs.writeFileSync(
conversationFile,
"{}"
);

}




const meta = {

name:"Minato Namikaze",

version:"1.0.0",

description:
"Minato AI Chat API",

method:"GET",

path:"/api/chat"

};




const OWNER =
"Chris st";

const AI_NAME =
"Minato Namikaze";







function loadConversation(){


return JSON.parse(

fs.readFileSync(
conversationFile,
"utf8"
)

);


}




function saveConversation(data){


fs.writeFileSync(

conversationFile,

JSON.stringify(
data,
null,
2
)

);


}









function highlight(text){


const words=[

"important",

"attention",

"solution",

"erreur",

"conseil",

"danger",

"réponse"

];



words.forEach(word=>{


const regex =
new RegExp(
word,
"gi"
);



text =
text.replace(

regex,

`**${word.toUpperCase()}**`

);



});


return text;


}









async function onStart(req,res){



try{


const prompt =
req.query.prompt;


const uid =
req.query.uid;



if(!prompt || !uid){


return res.status(400).json({

error:
"Utilise ?prompt=message&uid=id"

});


}






let conversations =
loadConversation();



if(!conversations[uid]){


conversations[uid]=[];


}






const date =
new Date();





conversations[uid].push({

role:"user",

content:prompt,

date:date

});









const systemPrompt = `


Tu es ${AI_NAME}.

Ton propriétaire est ${OWNER}.


Règles :

- Réponds toujours avec des réponses longues.
- Explique étape par étape.
- Donne des exemples.
- Mets les mots importants en évidence.
- Sois intelligent, professionnel et créatif.


`;









// API IA EXTERNE

const response =

await axios.get(

"https://yin-api.vercel.app/ai/chatgptfree",

{

params:{

prompt:
systemPrompt
+
"\nUtilisateur : "
+
prompt,


model:
"chatgpt4"


}

}

);







let answer =

response.data.answer ||

"Aucune réponse reçue.";






answer =
highlight(answer);






conversations[uid].push({

role:"assistant",

content:answer,

date:new Date()

});






saveConversation(
conversations
);








res.json({


ai:AI_NAME,


owner:OWNER,


date:new Date(),


memory:true,


response:answer



});






}

catch(error){



res.status(500).json({

error:
"Erreur Minato API",

message:
error.message


});


}



}







module.exports={

meta,

onStart

};
