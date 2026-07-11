let premiumData = JSON.parse(
localStorage.getItem("minato_premium")
)
||
{
 active:false,
 level:"Free"
};





function openPremium(){

let panel =
document.getElementById(
"premiumPanel"
);


panel.style.display="block";


}







function unlockPremium(){



let code =
prompt(
"Entre le code Premium :"
);



if(!code)
return;



// Code administrateur temporaire
// À remplacer par API admin plus tard


if(code==="MINATO-PREMIUM"){



premiumData.active=true;

premiumData.level="Legend";


localStorage.setItem(

"minato_premium",

JSON.stringify(premiumData)

);



enablePremiumMode();



alert(
"💎 Premium activé !"
);



}

else{


alert(
"❌ Code incorrect"
);


}



}









function enablePremiumMode(){



document.body.classList.add(
"premium-mode"
);



createPremiumBadge();



}





function createPremiumBadge(){



let profile =
document.querySelector(
".profile-mini"
);



if(!profile)
return;




let badge =
document.createElement(
"span"
);



badge.className=
"premium-badge";


badge.innerHTML=
"💎 LEGEND";



profile.appendChild(
badge
);



}









// EFFET HOLOGRAMME


function hologramMode(){



document.body.classList.toggle(
"hologram"
);



}







// EFFET GLITCH


function glitchMode(){



document.body.classList.toggle(
"glitch"
);


}








// EFFET RGB


function rgbMode(){



document.body.classList.toggle(
"rgb-effect"
);



}









// THEME PREMIUM


const premiumThemes=[

"galaxy-pro",

"cyber-neon",

"hologram",

"quantum"

];






function applyPremiumTheme(theme){



if(!premiumData.active){


alert(
"💎 Fonction Premium uniquement"
);


return;

}



document.body.className =
"theme-"+theme;



}









// STATISTIQUES PREMIUM


function updatePremiumStats(){


let stats =
JSON.parse(
localStorage.getItem(
"minato_stats"
)
)
||
{
messages:0,
words:0,
images:0
};



return stats;



}







// CHARGEMENT


window.addEventListener(
"load",

()=>{


if(
premiumData.active
){


enablePremiumMode();


}



});
