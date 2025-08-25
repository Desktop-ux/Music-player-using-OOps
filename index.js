// let songs = [
//     "songs/Kalank.mp3",
//     "songs/Bheegi Si Bhaagi Si.mp3",
//     "songs/Diet Mountain Dew.mp3",
//     "songs/I Love You (Bodyguard).mp3",
//     "songs/Levitatiog.mp3",
//     "songs/Mast Magan.mp3",
//     "songs/Night Changes.mp3",
//     "songs/Sau Tarah Ke.mp3",
//     "songs/Sweater Weather.mp3",
//     "songs/Teri Meri Kahaani.mp3"
// ]


// let covers = [
//     "Cover pages/Kalank.jpg",
//     "Cover pages/Bheegi Si Bhaagi Si.jpg",
//     "Cover pages/Diet Mountain Dew.jpg",
//     "Cover pages/I Love You (Bodyguard).jpg",
//     "Cover pages/Levitating.jpg",
//     "Cover pages/Mast Magan.jpg",
//     "Cover pages/Night Changes.jpg",
//     "Cover pages/Sau Tarah Ke.jpg",
//     "Cover pages/Sweater Weather.jpg",
//     "Cover pages/Teri Meri Kahaani.jpg"
// ]

    
const gradients = [
    
  "linear-gradient(to bottom, #a25a2d, #402819)",  // Copper (Original)
  "linear-gradient(to bottom, #3f5e42, #1e2e20)",  // Forest Green
  "linear-gradient(to bottom, #3a4f6b, #1a2633)",  // Dusty Navy
  "linear-gradient(to bottom, #5c3b5a, #2e1b2c)",  // Smoky Plum
  "linear-gradient(to bottom, #6a2f3c, #2e131b)",  // Wine Maroon

  "linear-gradient(to bottom, #6a6137, #2c2812)",  // Deep Olive
  "linear-gradient(to bottom, #4d5a77, #1f2435)",  // Slate Blue
  "linear-gradient(to bottom, #6b4c6d, #2d1d2f)",  // Ash Violet
  "linear-gradient(to bottom, #3c6b61, #1a322d)",  // Teal Green
  "linear-gradient(to bottom, #a1422b, #401b15)",  // Rust Red

  "linear-gradient(to bottom, #8b4c58, #331d22)",  // Dusty Rose
  "linear-gradient(to bottom, #394065, #181c2b)",  // Indigo Night
  "linear-gradient(to bottom, #b08844, #40371a)",  // Faded Gold
  "linear-gradient(to bottom, #4a4e52, #1e2023)",  // Cold Charcoal
  "linear-gradient(to bottom, #5c4c36, #2a1f16)"   // Urban Bronze
];





let nextbtn = document.querySelector(".prev")
let prevbtn = document.querySelector(".next")
const playBtn = document.querySelector("#play");
const pauseBtn = document.querySelector("#pause");
const playContainer = document.querySelector(".play");

let isPlaying = false;

function playpauseicon(isPlaying) {

    if (!isPlaying) {
        playBtn.style.display = "none";
        pauseBtn.style.display = "block";
        isPlaying = true;
    } else {
        playBtn.style.display = "block";
        pauseBtn.style.display = "none";
        isPlaying = false;
    }
}





class Song {
    constructor(title, artist, filepath, duration, coverpage) {
        this.title = title;
        this.artist = artist;
        this.filepath = filepath;
        this.duration = duration;
        this.coverpage = coverpage;
    }

    getInfo() {
        console.log(`${this.title} by ${this.artist}`);
    }
}

let songs = [
    new Song("Kalank", "Arijit Singh", "songs/Kalank.mp3", "5:11", "Cover pages/Kalank.jpg"),
    new Song("Bheegi Si Bhaagi Si", "Mohit Chauhan & Antara Mitra", "songs/Bheegi Si Bhaagi Si.mp3", "4:38", "Cover pages/Bheegi Si Bhaagi Si.jpg"),
    new Song("Diet Mountain Dew", "Lana Del Rey", "songs/Diet Mountain Dew.mp3", "3:42", "Cover pages/Diet Mountain Dew.jpg"),
    new Song("I Love You", "Ash King", "songs/I Love You (Bodyguard).mp3", "4:16", "Cover pages/I Love You (Bodyguard).jpg"),
    new Song("Levitating", "Dua Lipa", "songs/Levitatiog.mp3", "3:23", "Cover pages/Levitating.jpg"),
    new Song("Mast Magan", "Arijit Singh & Chinmayi Sripada", "songs/Mast Magan.mp3", "4:40", "Cover pages/Mast Magan.jpg"),
    new Song("Sau Tarah Ke", "Jonita Gandhi & Amit Mishra", "songs/Sau Tarah Ke.mp3", "3:59", "Cover pages/Sau Tarah Ke.jpg"),
    new Song("Sweater Weather", "The Neighbourhood", "songs/Sweater Weather.mp3", "4:00", "Cover pages/Sweater Weather.jpg"),
    new Song("Night Changes", "One Direction", "songs/Night Changes.mp3", "3:46", "Cover pages/Night Changes.jpg"),
    new Song("Teri Meri Kahani", "Himesh Reshammiya & Shreya Ghoshal", "songs/Teri Meri Kahaani.mp3", "5:31", "Cover pages/Teri Meri Kahaani.jpg")
];


class MusicPlayer {
    constructor(songList) {
        this.songList = songList;
        this.currentIndex = 0;
        this.audio = new Audio();
        this.isshuffling = false
       
    }

  

    loadSong(index) {
        this.currentIndex = index;
        this.audio.src = this.songList[index].filepath;
        this.audio.load();
        this.updateUI();
    }

    play() {
        this.audio.play();
        playpauseicon(false)
    }

    pause() {
        this.audio.pause();
        playpauseicon(true)
    }

    togglePlayPause() {
        if (this.audio.paused) {
            this.play();
        } else {
            this.pause();
        }
    }

    next() {
        // const nextIndex = (this.currentIndex + 1) % this.songList.length;
        // this.loadSong(nextIndex);
        this.isPlaying = false
        playpauseicon(false)

        if(this.isshuffling){
            let randomindex
            do{
                randomindex = Math.floor(Math.random()*this.songList.length)
            }
            while(randomindex === this.currentIndex)
                this.loadSong(randomindex)
        }
        else{
            let nextIndex = (this.currentIndex + 1)%this.songList.length
            this.loadSong(this.next)
        }
        this.play()
        
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.songList.length) % this.songList.length;
        this.loadSong(prevIndex);
        this.isPlaying - false
        playpauseicon(false)

        
    }

    updateUI() {
        const song = this.songList[this.currentIndex];
        document.querySelector(".song_name").textContent = song.title;
        document.getElementById("artist").textContent = song.artist;
        document.getElementById("cover_page").src = song.coverpage;


        let card = document.querySelector(".card")
        if(card){
            let randomgradient = gradients[Math.floor(Math.random()*gradients.length)]
            card.style.background = randomgradient
        }
    }
}

// Create player and load first song
const player = new MusicPlayer(songs);
player.loadSong(0);

this.isRepeating = false;


player.audio.onended = () => {
  if (player.isRepeating) {
    player.audio.currentTime = 0;
    player.play(); // replay the current song
  } else {
    player.next(); // move to next song
  }
};



// DOM References




playContainer.addEventListener("click", function () {
    player.togglePlayPause();
    playContainer.style.padding = "1rem 0"
});




prevbtn.addEventListener("click", function () {
    player.next()
    progress.style.width = "0%"
    pointer.style.left = "0%"
    playpauseicon(true)
})



nextbtn.addEventListener("click", function () {
    player.prev()
    progress.style.width = "0%"
    pointer.style.left = "0%"
    playpauseicon(true)
})



let playhead = document.querySelector(".playhead")
let pointer = document.querySelector(".circle")
let progress = document.querySelector(".progress")

player.audio.addEventListener("timeupdate", function(){
    let percentage = (player.audio.currentTime / player.audio.duration) * 100
    pointer.style.left = `${percentage}%`
    // progress.style.width = `${percentage}%`;
})
player.audio.addEventListener("timeupdate", function(){
    let percentage = (player.audio.currentTime / player.audio.duration) * 100
    
    progress.style.width = `${percentage}%`;
})

playhead.addEventListener("click", (e) => {
    const width = playhead.clientWidth;
    const clickX = e.offsetX;
    const duration = player.audio.duration;

    player.audio.currentTime = (clickX / width) * duration;
});

let volume = document.querySelector(".volume")
let slider = document.querySelector("#volume-slider")


volume.addEventListener("click", function(e){
    slider.style.display = (slider.style.display === 'block') ? 'none' : 'block';
     e.stopPropagation(); 
})

slider.addEventListener("input", () => {
  player.audio.volume = slider.value;
});

//  document.addEventListener('click', (e) => {
//     if (!slider.contains(e.target)) {
//       slider.style.display = 'none';
//     }
//   });

document.addEventListener("click", (event) => {
  // Check if the click is inside the volume container
  if (!slider.contains(event.target)) {
    slider.style.display = "none";
  }
});


let repeat = document.querySelector(".repeat")

repeat.addEventListener("click", function(){
      player.isRepeating = !player.isRepeating;

  // Optional: give visual feedback
  if (player.isRepeating) {
    repeat.style.color = "green"; // repeat ON
  } else {
    repeat.style.color = ""; // repeat OFF
  }
})


let shuffle = document.querySelector(".shuffle")

shuffle.addEventListener("click", function(){
    player.isshuffling = !player.isshuffling

    if (player.isshuffling) {
        shuffle.style.color = "green" // shuffle ON
    } else {
        shuffle.style.color = ""; // shuffle OFF
    }
})



