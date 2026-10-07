(() => {
  const root = document.getElementById('portraitRegard');
  if (!root) return;
  const head = root.querySelector('.portrait-regard__head');
  const img = root.querySelector('.portrait-regard__img');
  const eyeL = root.querySelector('.portrait-regard__eye--left > div');
  const eyeR = root.querySelector('.portrait-regard__eye--right > div');

  const TILT = 0.6;   // inclinaison de la tête
  const EYES = 2;     // décalage des yeux (réglage validé)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tiltK = reduce ? 0 : TILT;
  const idleOn = !reduce;

  const applyEyes = () => {
    const u = 'url("' + img.src + '")';
    eyeL.style.backgroundImage = u;
    eyeR.style.backgroundImage = u;
  };
  applyEyes();

  const pointer = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.4 };
  const idle = { x: 0, y: 0 };
  let lastMove = -1e9, nextIdle = 0, running = false;
  const onMove = e => { pointer.x = e.clientX; pointer.y = e.clientY; lastMove = performance.now(); };
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerdown', onMove, { passive: true });

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  let tx = 0, ty = 0, ex = 0, ey = 0, last = performance.now();

  function frame(t) {
    if (!running) return;
    const dt = Math.min(0.05, (t - last) / 1000); last = t;
    const s = root.getBoundingClientRect();
    const hw = head.offsetWidth, hh = head.offsetHeight;
    const cx = s.left + s.width / 2, cy = s.top + hh * 0.4;

    let ax = pointer.x, ay = pointer.y;
    if (idleOn && t - lastMove > 4000) {
      if (t > nextIdle) {
        idle.x = cx + (Math.random() * 2 - 1) * window.innerWidth * 0.45;
        idle.y = cy + (Math.random() * 2 - 1) * window.innerHeight * 0.3;
        nextIdle = t + 1200 + Math.random() * 2200;
      }
      ax = idle.x; ay = idle.y;
    }

    const nx = clamp((ax - cx) / (window.innerWidth * 0.5), -1, 1);
    const ny = clamp((ay - cy) / (window.innerHeight * 0.5), -1, 1);
    tx += (nx - tx) * (1 - Math.exp(-6 * dt));
    ty += (ny - ty) * (1 - Math.exp(-6 * dt));
    ex += (nx - ex) * (1 - Math.exp(-14 * dt));
    ey += (ny - ey) * (1 - Math.exp(-14 * dt));

    head.style.transform =
      `translate3d(${(tx * 8 * tiltK).toFixed(2)}px, ${(ty * 4 * tiltK).toFixed(2)}px, 0) ` +
      `rotateY(${(tx * 9 * tiltK).toFixed(2)}deg) rotateX(${(-ty * 6 * tiltK).toFixed(2)}deg) rotateZ(${(tx * 1.2 * tiltK).toFixed(2)}deg)`;

    const px = hw * 0.0042 * EYES, py = hw * 0.0024 * EYES;
    const tr = `translate(${(ex * px).toFixed(2)}px, ${(ey * py).toFixed(2)}px)`;
    eyeL.style.transform = tr; eyeR.style.transform = tr;

    requestAnimationFrame(frame);
  }

  // N'anime que lorsque le portrait est visible à l'écran
  const start = () => { if (!running) { running = true; last = performance.now(); requestAnimationFrame(frame); } };
  const stop = () => { running = false; };
  new IntersectionObserver(entries => entries[0].isIntersecting ? start() : stop()).observe(root);
})();
