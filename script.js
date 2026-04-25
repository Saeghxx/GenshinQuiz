document.addEventListener("DOMContentLoaded", () => {

      document.getElementById('playButton').addEventListener('click', function () {
        const audio = document.getElementById('playAudio');
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });
    window.addEventListener('scroll', () => {
        const video = document.getElementById('video');
        if (video) {
            video.style.transform = 'translateY(' + window.scrollY * 0.5 + 'px)';
        }
    });

});
