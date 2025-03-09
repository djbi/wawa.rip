// Dynamic browser title animation
const titles = ['meow meow', 'meow', '<3'];
let titleIndex = 0;

function updateTitle() {
    document.title = titles[titleIndex];
    titleIndex = (titleIndex + 1) % titles.length;
}

setInterval(updateTitle, 1000);
updateTitle();

console.log('title.js: Title animation started');
