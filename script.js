// script.js
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('myAudio');
    const image = document.getElementById('musicToggleImage');
    let isPlaying = false; 

    if (audio && image) {
        image.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                audio.currentTime = 0; 
                isPlaying = false;
            } else {
                audio.play()
                    .then(() => {
                        isPlaying = true;
                    })
                    .catch(error => {
                        // Потрібно, оскільки браузери блокують автоматичне відтворення
                        alert("Auto-play blocked. Click anywhere to enable music.");
                    });
            }
        });
    }
});