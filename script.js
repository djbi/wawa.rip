const laser = document.getElementById('laser');
let laserPosition = 0;

function moveLaser() {
  laserPosition += 5;
  if (laserPosition > window.innerWidth) laserPosition = -50;
  laser.style.left = laserPosition + 'px';
  laser.style.top = Math.random() * window.innerHeight + 'px';

  const trail = document.createElement('div');
  trail.className = 'laser-trail';
  trail.style.left = (laserPosition - 2.5) + 'px';
  trail.style.top = laser.style.top;
  document.body.appendChild(trail);

  setTimeout(() => trail.remove(), 800);
}

setInterval(moveLaser, 50);
