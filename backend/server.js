const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;



// MIDDLEWARE

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));





// FRONTEND

app.use(
express.static(
path.join(__dirname,"../frontend")
)
);







// IMPORT API


const chat =
require("./api/chat");


const vision =
require("./api/vision");


const image =
require("./api/image");


const memory =
require("./api/memory");


const user =
require("./api/user");


const admin =
require("./api/admin");








// ROUTES API



app.get(
"/api/chat",
chat.onStart
);



app.post(
"/api/vision",
vision.onStart
);



app.get(
"/api/image",
image.onStart
);



app.get(
"/api/memory",
memory.onStart
);



app.get(
"/api/user",
user.onStart
);



app.get(
"/api/admin/settings",
admin.settings
);





// PAGE PRINCIPALE


app.get("*",(req,res)=>{


res.sendFile(

path.join(
__dirname,
"../frontend/index.html"
)

);


});






// START SERVER



app.listen(PORT,()=>{


console.log(
`
⚡ Minato Namikaze AI lancé

Port:
${PORT}

Owner:
Chris st

API:
Active

`
);


});
