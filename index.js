// *---------------music details------------
let songname = document.getElementById("songname")
let artistname = document.getElementById("artistname")

// *---------------progress ---------------

let playerprogressEl = document.getElementById("player_progress")
let progressEl = document.getElementById("progress")

// *-----------musictime --------------------

let currenttimeEl  = document.getElementById("current_time")
let duratationEl = document.getElementById("duratation")

// *---------muscic controls-----------
let back = document.getElementById("back")
let pause = document.getElementById("play")
let fwd = document.getElementById("fowd")


// * ------------- song list ---------------
const songs = [

    {
        path : "/[iSongs.info] 01 - Ola Olaala Ala.mp3",
        name : "Ola Olaala Ala",
        artist : "Ranina Reddy"
    },

    {
        path : "/[iSongs.info] 02 - Chilipiga.mp3",
        name : "Chilipiga",
        artist: "Kartick"

    },
    {
        path : "/[iSongs.info] 03 - Nenu Nuvvantu.mp3",
        name :"Nenu Nuvvantu",
        artist:"Naresh Iyer"
    },
    
    {
        path : "/[iSongs.info] 04 - Hello Rammante.mp3",
        name :"Hello Rammante",
        artist:"Vijay Prakash"
    },
    {
        path : "/[iSongs.info] 06 - Rooba Rooba.mp3",
        name :"Rooba Rooba",
        artist:"Chinnayi"
    }
];
 
// * ---------------- play music -------------- 
const music = new Audio();
let musicindex = 0;
let isplaying = false;


function toggleplay(){
    if(isplaying){
        pausemusic();
    }else{
        playmusic();
    }
}
function playmusic(){

    isplaying = true;
    pause.classList.replace("fa-play","fa-pause")
    music.play();
    
    
}

function pausemusic(){
    isplaying = false
    pause.classList.replace("fa-pause","fa-play")
    music.pause();
}


// * --------------------load songs-----------------------

function loadmusic(songs){
    music.src = songs.path
    songname.textContent = `Song Name : ${songs.name}`
    artistname.textContent = `Artist : ${songs.artist}`
    
}

// *---------------change songs----------------
function changemusic(direction){
    musicindex = musicindex + direction + (songs.length % songs.length)
    loadmusic(songs[musicindex])
    music.play()
}

// * ----------------load music calling--------------------
loadmusic(songs[musicindex])

// * --------- set progress -------------

function setprogressbar(e){
    const width = playerprogressEl.clientWidth
    const xValue = e.offsetX
    music.currentTime = (xValue/width) * music.duration
}

// * --------update progress------------

function updateprogressbar(){
    const {duratation, currentTime} = music
    progressEl.style.width = music.currentTime * 100 / music.duration + "%"
    const formattime = (timeRanges) => String(Math.floor(timeRanges)).padStart(2, "0")
    duratationEl.textContent =`${formattime(duratation/60)}:${formattime(duratation % 60)}`
    currenttimeEl.textContent = `${formattime(currentTime/60)}:${formattime(currentTime % 60)}`
}


// * ----------------------button Events----------------
const btnevents = ()=>{
    pause.addEventListener("click",toggleplay);
    fwd.addEventListener("click",()=>{
        changemusic(1)
        music.play()
        pause.classList.replace("fa-play","fa-pause")
    })
    back.addEventListener("click",()=>{
        changemusic(-1)
        music.play()
        pause.classList.replace("fa-play","fa-pause")
    })
}
// * -----------progress bar --------------

playerprogressEl.addEventListener("click", setprogressbar)
music.addEventListener("ended",() => changemusic(1))
music.addEventListener("timeupdate", updateprogressbar)

// *------------bts events ---------
document.addEventListener("DOMContentLoaded",btnevents)

// * ----------------load music calling--------------------
loadmusic(songs[musicindex])
