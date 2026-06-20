// ===== Año actual en el footer =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Header con sombra al hacer scroll =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== Menú móvil =====
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Cerrar el menú al hacer clic en un enlace
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// ===== Animación de aparición (scroll reveal) =====
const revealTargets = document.querySelectorAll(
  '.card, .project, .about__content, .about__media, .section__head, .contact__info, .contact__form, .custody__media, .custody__content, .custody__gallery figure'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealTargets.forEach((el) => observer.observe(el));

// ===== Contador animado de estadísticas =====
const counters = document.querySelectorAll('.stat strong');
let countersStarted = false;

function animateCounters() {
  counters.forEach((counter) => {
    const target = +counter.dataset.count;
    const duration = 1600;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else counter.textContent = target;
    }
    requestAnimationFrame(update);
  });
}

const heroStats = document.querySelector('.hero__stats');
if (heroStats) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;
          animateCounters();
        }
      });
    },
    { threshold: 0.4 }
  );
  statsObserver.observe(heroStats);
}

// ===== Validación del formulario de contacto =====
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();
  const mensaje = form.mensaje.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nombre || !email || !mensaje) {
    feedback.textContent = 'Por favor completa todos los campos obligatorios.';
    feedback.className = 'form__feedback error';
    return;
  }
  if (!emailRegex.test(email)) {
    feedback.textContent = 'Ingresa un correo electrónico válido.';
    feedback.className = 'form__feedback error';
    return;
  }

  feedback.textContent = '¡Gracias ' + nombre + '! Tu mensaje fue enviado. Te contactaremos pronto.';
  feedback.className = 'form__feedback success';
  form.reset();
});
