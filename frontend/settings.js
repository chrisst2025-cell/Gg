const themeSelect =
document.getElementById("themeSelect");


const background =
document.getElementById("background");



let settings =
JSON.parse(
localStorage.getItem("minato_settings")
)
||
{

theme:"galaxy",

animation:true,

music:false,

background:""

};








// CHANGER THEME


function changeTheme(theme){


document.body.className="";


document.body.classList.add(
"theme-"+theme.toLowerCase()
);



settings.theme =
theme;



saveSettings();



}






themeSelect.addEventListener(
"change",

()=>{


changeTheme(
themeSelect.value
);


}

);








// SAUVEGARDE


function saveSettings(){


localStorage.setItem(

"minato_settings",

JSON.stringify(settings)

);


}








// CHARGER PARAMETRES


function loadSettings(){



changeTheme(
settings.theme
);



if(settings.background){


background.style.backgroundImage =
`url(${settings.background})`;


}




}





loadSettings();









// ADMIN BACKGROUND


async function loadAdminBackground(){



try{


const res =
await fetch(
"/api/admin/settings"
);



const data =
await res.json();




if(
data.background &&
data.background.url
){


background.style.backgroundImage =
`
url(${data.background.url})
`;



}




if(
data.music &&
data.music.enabled
){


createMusic(
data.music.url,
data.music.volume
);



}



}

catch(e){


console.log(
"Admin settings unavailable"
);


}


}









// CREATION MUSIQUE


function createMusic(url,volume){



let audio =
document.createElement("audio");


audio.id="minatoMusic";


audio.src=url;


audio.loop=true;


audio.volume =
volume /100;



document.body.appendChild(audio);



document
.getElementById("soundBtn")
.onclick=function(){



if(audio.paused){


audio.play();


this.innerHTML="🔊";


}

else{


audio.pause();


this.innerHTML="🔇";


}



};



}







// BACKGROUND PERSONNALISE


function setCustomBackground(url){



settings.background=url;


background.style.backgroundImage=
`
url(${url})
`;



saveSettings();


}







// CREATION THEME UTILISATEUR


function createCustomTheme(data){



document.documentElement.style
.setProperty(
"--main-color",
data.primary
);



document.documentElement.style
.setProperty(
"--bubble-color",
data.bubble
);



document.documentElement.style
.setProperty(
"--opacity",
data.opacity
);



saveSettings();



}







// APPEL ADMIN


loadAdminBackground();
