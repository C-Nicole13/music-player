// Load songs

const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const songs = ['ambient', 'melancholy', 'unbreakable'];
let songIndex = 0; // Starts on 'ambient' to match index.html initial src

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

loadSong(songs[songIndex]);

// Play and pause controls

function playSong() {
  musicContainer.classList.add('play');
  
  // Safely update play icon without breaking if class structures differ
  const icon = playBtn.querySelector('i');
  if (icon) {
    icon.classList.remove('fa-play');
    icon.classList.add('fa-pause');
  }

  // Catch browser autoplay or source restriction promises
  audio.play().catch(err => console.log('Playback error:', err));
}

function pauseSong() {
  musicContainer.classList.remove('play');
  
  const icon = playBtn.querySelector('i');
  if (icon) {
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-play');
  }

  audio.pause();
}

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  isPlaying ? pauseSong() : playSong();
});

// Next and previous controls

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Progress bar update

function updateProgress(e) {
  const { duration, currentTime } = e.target || e.srcElement;
  if (duration) {
    const percent = (currentTime / duration) * 100;
    progress.style.width = `${percent}%`;
  }
}

audio.addEventListener('timeupdate', updateProgress);

// Seek tracks

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  if (audio.duration) {
    audio.currentTime = (clickX / width) * audio.duration;
  }
}

progressContainer.addEventListener('click', setProgress);

// Auto play next song

audio.addEventListener('ended', nextSong);