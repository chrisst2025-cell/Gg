let minatoStats = JSON.parse(
localStorage.getItem("minato_stats")
)
||
{
messages:0,
words:0,
images:0,
time:0,
xp:0,
level:"Débutant"
};





function openDashboard(){


let panel =
document.getElementById(
"dashboardPanel"
);


panel.style.display="block";


updateDashboard();


}







// AJOUT MESSAGE STATISTIQUE


function addMessageStats(text){



minatoStats.messages++;



minatoStats.words +=
text.split(" ").length;



minatoStats.xp +=5;



calculateLevel();



saveStats();


}








// IMAGE ANALYSEE


function addImageStats(){


minatoStats.images++;


minatoStats.xp +=10;


calculateLevel();


saveStats();


}








// NIVEAUX


function calculateLevel(){



if(minatoStats.xp >=5000){


minatoStats.level =
"👑 Légende IA";


}



else if(minatoStats.xp >=2000){


minatoStats.level =
"🥇 Expert IA";


}



else if(minatoStats.xp >=500){


minatoStats.level =
"🥈 Explorateur IA";


}



else{


minatoStats.level =
"🥉 Débutant";


}



}







// SAUVEGARDE


function saveStats(){



localStorage.setItem(

"minato_stats",

JSON.stringify(minatoStats)

);


}







// AFFICHAGE


function updateDashboard(){



let messages =
document.getElementById(
"messagesCount"
);



let images =
document.getElementById(
"imagesCount"
);



let words =
document.getElementById(
"wordsCount"
);




if(messages){

messages.innerHTML =
minatoStats.messages;

}



if(images){

images.innerHTML =
minatoStats.images;

}



if(words){

words.innerHTML =
minatoStats.words;

}



}







// TEMPS UTILISATION


setInterval(()=>{


minatoStats.time++;


saveStats();


},60000);









// BADGES


function getBadges(){



let badges=[];



if(minatoStats.messages>=100){


badges.push(
"💬 Bavard IA"
);


}



if(minatoStats.messages>=1000){


badges.push(
"🔥 Utilisateur Pro"
);


}



if(minatoStats.images>=100){


badges.push(
"🖼️ Vision Master"
);


}



if(minatoStats.words>=100000){


badges.push(
"🧠 Architecte IA"
);


}



return badges;



}








window.addEventListener(
"load",

()=>{


updateDashboard();


});
