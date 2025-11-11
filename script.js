const btn = document.querySelector('#playButton');
const audio = document.querySelector("#playAudio");
audio.play(); 

let isMuted = false;

btn.addEventListener('click', () => {
    isMuted = !isMuted;
    audio.muted = isMuted;
    console.log(isMuted ? "Muted" : "Unmuted");
});
