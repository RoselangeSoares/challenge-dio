const pianoKeys = document.querySelectorAll('.piano-keys .key');
const volumeSlider = document.querySelector('.volume-slider input');
const keysCheck = document.querySelector('.keys-check input');

let mapedKeys = [];
let audio = new Audio(`tunes/a.mp3`);

const playTume = (key) => {
    audio.src = `tunes/${key}.mp3`;
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add('active');
    setTimeout(() => {
        clickedKey.classList.remove('active');
    }, 150);
};

pianoKeys.forEach((key) => {
    console.log(key.dataset.key);
    key.addEventListener('click', () => playTume(key.dataset.key));
    mapedKeys.push(key.dataset.key);
});

document.addEventListener('keydown', (e) => {
    if (mapedKeys.includes(e.key)) {
        playTume(e.key);
    }
});

const handleVolume = (e) => {
    audio.volume = e.target.value;
}
const showHideKeys = () => {
    pianoKeys.forEach((key) => key.classList.toggle('hide'));
}

volumeSlider.addEventListener('input', handleVolume);
keysCheck.addEventListener('click', showHideKeys);