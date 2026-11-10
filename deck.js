/* deck.js  Navegacion y escalado del lienzo 1280x720.
   No reimplementar esto dentro de las diapositivas. */
(() => {
  const W = 1280, H = 720;
  const deck = document.querySelector('.deck');
  const slides = [...deck.querySelectorAll('.slide')];
  const counter = Object.assign(document.createElement('div'), { className: 'counter' });
  document.body.appendChild(counter);

  let i = 0;

  const fit = () => {
    const s = Math.min(innerWidth / W, innerHeight / H);
    const x = (innerWidth - W * s) / 2;
    const y = (innerHeight - H * s) / 2;
    deck.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
  };

  const show = (n) => {
    i = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach((el, k) => el.classList.toggle('active', k === i));
    counter.textContent = `${i + 1} / ${slides.length}`;
    history.replaceState(null, '', '#' + (i + 1));
    slides[i].dispatchEvent(new CustomEvent('slide:show', { bubbles: true }));
  };

  addEventListener('keydown', (e) => {
    if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(e.key)) { e.preventDefault(); show(i + 1); }
    else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) { e.preventDefault(); show(i - 1); }
    else if (e.key === 'Home') show(0);
    else if (e.key === 'End') show(slides.length - 1);
    else if (e.key.toLowerCase() === 'f') {
      document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
    }
  });

  deck.addEventListener('click', (e) => {
    if (e.target.closest('a, button, canvas')) return;
    show(e.clientX < innerWidth / 3 ? i - 1 : i + 1);
  });

  addEventListener('resize', fit);
  fit();
  show((parseInt(location.hash.slice(1), 10) || 1) - 1);
})();