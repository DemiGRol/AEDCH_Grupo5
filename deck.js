/* deck.js  Navegacion y escalado del lienzo 1280x720.
   No reimplementar esto dentro de las diapositivas. */
(() => {
  const W = 1280, H = 720;
  const deck = document.querySelector('.deck');
  const slides = [...deck.querySelectorAll('.slide')];
  const reveals = slides.map((slide) => [...slide.querySelectorAll('[data-step]')]);
  const lastSteps = reveals.map((items) => Math.max(0, ...items.map((el) => Number(el.dataset.step))));
  const counter = Object.assign(document.createElement('div'), { className: 'counter' });
  counter.setAttribute('aria-live', 'polite');
  document.body.appendChild(counter);

  let i = 0;
  let step = 0;

  // Las apariciones reservan su lugar y solo avanzan con los controles del deck.
  reveals.forEach((items) => items.forEach((el) => el.classList.toggle('is-pending', Number(el.dataset.step) > 0)));

  const renderStep = () => {
    reveals[i].forEach((el) => el.classList.toggle('is-pending', Number(el.dataset.step) > step));
    const progress = lastSteps[i] ? ` · ${step + 1}/${lastSteps[i] + 1}` : '';
    counter.textContent = `${i + 1} / ${slides.length}${progress}`;
    counter.setAttribute('aria-label', `Diapositiva ${i + 1} de ${slides.length}${lastSteps[i] ? `, paso ${step + 1} de ${lastSteps[i] + 1}` : ''}`);
  };

  const fit = () => {
    const s = Math.min(innerWidth / W, innerHeight / H);
    const x = (innerWidth - W * s) / 2;
    const y = (innerHeight - H * s) / 2;
    deck.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
  };

  const show = (n, atEnd = false) => {
    i = Math.max(0, Math.min(slides.length - 1, n));
    step = atEnd ? lastSteps[i] : 0;
    slides.forEach((el, k) => el.classList.toggle('active', k === i));
    renderStep();
    history.replaceState(null, '', '#' + (i + 1));
    slides[i].dispatchEvent(new CustomEvent('slide:show', { bubbles: true }));
  };

  const advance = () => {
    if (step < lastSteps[i]) { step++; renderStep(); }
    else if (i < slides.length - 1) show(i + 1);
  };

  const retreat = () => {
    if (step > 0) { step--; renderStep(); }
    else if (i > 0) show(i - 1, true);
  };

  addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(e.key)) { e.preventDefault(); advance(); }
    else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) { e.preventDefault(); retreat(); }
    else if (e.key === 'Home') { e.preventDefault(); show(0); }
    else if (e.key === 'End') { e.preventDefault(); show(slides.length - 1, true); }
    else if (e.key.toLowerCase() === 'f') {
      document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
    }
  });

  deck.addEventListener('click', (e) => {
    if (e.target.closest('a, button, canvas')) return;
    e.clientX < innerWidth / 3 ? retreat() : advance();
  });

  addEventListener('resize', fit);
  fit();
  show((parseInt(location.hash.slice(1), 10) || 1) - 1);
})();
