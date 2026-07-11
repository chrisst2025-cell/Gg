const API_URL = "/api/chat";


let uid = localStorage.getItem("minato_uid");


if(!uid){

uid =
"user_" +
Date.now();


localStorage.setItem(
"minato_uid",
uid
);

}



const chatBox =
document.getElementById("chatBox");


const input =
document.getElementById("prompt");



const imageInput =
document.getElementById("imageInput");







// ENVOYER MESSAGE


async function sendMessage(){


let text =
input.value.trim();



if(!text) return;



addMessage(
text,
"user"
);


input.value="";



showTyping();



try{


const response =
await fetch(

`${API_URL}?prompt=${encodeURIComponent(text)}&uid=${uid}`

);



const data =
await response.json();



hideTyping();



typeWriter(
data.response ||
data.answer ||
"Pas de réponse",
"ai"
);



saveHistory();



}

catch(error){


hideTyping();


addMessage(

"Erreur de connexion avec Minato AI",

"ai"

);


}



}








// AJOUT MESSAGE


function addMessage(text,type){


let div =
document.createElement("div");



div.className =
"message " + type;



div.innerHTML = `


<div class="avatar">

${type==="ai"?"🤖":"👤"}

</div>


<div class="bubble">

${text}

</div>


`;



chatBox.appendChild(div);



chatBox.scrollTop =
chatBox.scrollHeight;



}








// MACHINE A ECRIRE


function typeWriter(text,type){



let div =
document.createElement("div");



div.className =
"message "+type;



div.innerHTML=`


<div class="avatar">
🤖
</div>


<div class="bubble">

</div>

`;



chatBox.appendChild(div);



let bubble =
div.querySelector(".bubble");



let index=0;



let timer =
setInterval(()=>{


bubble.innerHTML +=
text[index];



index++;



chatBox.scrollTop =
chatBox.scrollHeight;



if(index>=text.length){

clearInterval(timer);

}



},20);



}









// INDICATEUR GEMINI ECRIT


function showTyping(){


let typing =
document.createElement("div");


typing.id="typing";


typing.className="message ai";


typing.innerHTML=`

<div class="avatar">
🤖
</div>


<div class="bubble">

Minato écrit
<span>
.
</span>
<span>
.
</span>
<span>
.
</span>

</div>

`;


chatBox.appendChild(typing);


}



function hideTyping(){


let typing =
document.getElementById("typing");


if(typing)
typing.remove();



}








// HISTORIQUE


function saveHistory(){


localStorage.setItem(

"minato_history",

chatBox.innerHTML

);


}



function loadHistory(){


let history =
localStorage.getItem(
"minato_history"
);



if(history){

chatBox.innerHTML =
history;

}



}




function newChat(){


chatBox.innerHTML="";


localStorage.removeItem(
"minato_history"
);


}








// IMAGE


function uploadImage(){


imageInput.click();


}



imageInput.addEventListener(
"change",

function(){


let file =
this.files[0];



if(!file)
return;



let reader =
new FileReader();



reader.onload=function(e){


document.getElementById(
"imagePreview"
).innerHTML=`

<img 
src="${e.target.result}"
width="120"
>

`;



};



reader.readAsDataURL(file);



});










// DRAG & DROP IMAGE



document.addEventListener(
"dragover",

e=>{

e.preventDefault();

}

);



document.addEventListener(
"drop",

e=>{


e.preventDefault();



let file =
e.dataTransfer.files[0];



if(file && file.type.startsWith("image")){


imageInput.files =
e.dataTransfer.files;


}

});









// RACCOURCIS CLAVIER



document.addEventListener(
"keydown",

e=>{


// CTRL + ENTER envoyer


if(
e.ctrlKey &&
e.key==="Enter"
){

sendMessage();

}



// CTRL + K nouvelle discussion


if(
e.ctrlKey &&
e.key==="k"
){

newChat();

}



});







// CHARGEMENT


window.onload=function(){

loadHistory();


};
