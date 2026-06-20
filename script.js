/* =========================================================
   KepaFinanzas - script principal
   Las preguntas y respuestas del asistente están en preguntas.js
   ========================================================= */

/* --- CONFIGURACIÓN ---
   Cambia este número por el de WhatsApp real (formato internacional, solo dígitos).
   Ejemplo España: 34611918310                                                    */
const WHATSAPP_NUMERO = '34611918310';
const WHATSAPP_MENSAJE = 'Hola KepaFinanzas, me gustaría recibir información sobre la inversión en oro y plata.';

function abrirWhatsApp(texto) {
  const msg = encodeURIComponent(texto || WHATSAPP_MENSAJE);
  return 'https://wa.me/' + WHATSAPP_NUMERO + '?text=' + msg;
}

/* --- Año del footer --- */
document.getElementById('year').textContent = new Date().getFullYear();

/* --- Header con sombra al hacer scroll --- */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

/* --- Menú móvil --- */
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  navToggle.classList.toggle('active');
});
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

/* --- Enlaces de WhatsApp --- */
['whatsappFloat', 'ctaWhatsapp', 'contactWhatsapp'].forEach((id) => {
  const el = document.getElementById(id);
  if (el) {
    el.setAttribute('href', abrirWhatsApp());
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  }
});

/* --- Scroll reveal --- */
const revealTargets = document.querySelectorAll(
  '.card, .plan, .way, .custody__media, .custody__content, .section__head, .contact__info, .contact__form'
);
revealTargets.forEach((el) => el.classList.add('reveal'));
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.12 });
revealTargets.forEach((el) => obs.observe(el));

/* --- Validación del formulario de contacto --- */
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();
  const mensaje = form.mensaje.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nombre || !email || !mensaje) {
    feedback.textContent = 'Por favor completa todos los campos.';
    feedback.className = 'form__feedback error';
    return;
  }
  if (!emailRegex.test(email)) {
    feedback.textContent = 'Ingresa un correo electrónico válido.';
    feedback.className = 'form__feedback error';
    return;
  }
  feedback.innerHTML = '¡Gracias ' + nombre + '! Hemos recibido tu mensaje. ' +
    'Si quieres respuesta inmediata, <a href="' + abrirWhatsApp('Hola, soy ' + nombre + '. ' + mensaje) +
    '" target="_blank" rel="noopener">escríbenos por WhatsApp</a>.';
  feedback.className = 'form__feedback success';
  form.reset();
});

/* =========================================================
   ASISTENTE (usa las preguntas de preguntas.js)
   ========================================================= */
const chatToggle = document.getElementById('chatToggle');
const chat = document.getElementById('chat');
const chatClose = document.getElementById('chatClose');
const chatBody = document.getElementById('chatBody');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatSuggestions = document.getElementById('chatSuggestions');

/* Si preguntas.js no se cargó, usamos una lista vacía para no romper la web */
const LISTA_PREGUNTAS = (typeof PREGUNTAS !== 'undefined') ? PREGUNTAS : [];

const SUGERENCIAS = [
  '¿Por qué invertir en oro?',
  '¿Cómo funciona la custodia?',
  'Ver los planes',
  'Quiero ser partner',
  'Hablar por WhatsApp'
];

function normaliza(txt) {
  return txt.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita acentos
    .replace(/[¿?¡!.,;:]/g, ' ');
}

function buscarRespuesta(texto) {
  const t = ' ' + normaliza(texto) + ' ';
  let mejor = null, mejorPuntos = 0;
  LISTA_PREGUNTAS.forEach((item) => {
    let puntos = 0;
    (item.palabras || []).forEach((clave) => {
      const c = normaliza(clave);
      if (t.includes(' ' + c + ' ') || t.includes(c)) {
        puntos += c.split(' ').length; // frases más largas valen más
      }
    });
    if (puntos > mejorPuntos) { mejorPuntos = puntos; mejor = item; }
  });
  if (mejor) return mejor.respuesta;
  return 'Buena pregunta. 🤔 Puedo ayudarte con temas de oro, plata, inversión, custodia, los planes de compra o cómo ser partner. ' +
    'Para una respuesta más detallada sobre tu caso, lo mejor es hablar con nuestro equipo por WhatsApp: ' +
    '<a href="' + abrirWhatsApp() + '" target="_blank" rel="noopener">abrir WhatsApp</a>.';
}

function añadirMensaje(texto, tipo) {
  const div = document.createElement('div');
  div.className = 'msg msg--' + tipo;
  div.innerHTML = texto;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function respuestaBot(textoUsuario) {
  const pensando = document.createElement('div');
  pensando.className = 'msg msg--bot';
  pensando.textContent = 'Escribiendo…';
  chatBody.appendChild(pensando);
  chatBody.scrollTop = chatBody.scrollHeight;

  setTimeout(() => {
    pensando.remove();
    if (/whatsapp/i.test(normaliza(textoUsuario))) {
      añadirMensaje('Te dejo el acceso directo: <a href="' + abrirWhatsApp() +
        '" target="_blank" rel="noopener">abrir WhatsApp</a> 💬', 'bot');
    } else {
      añadirMensaje(buscarRespuesta(textoUsuario), 'bot');
    }
  }, 500);
}

function pintarSugerencias() {
  chatSuggestions.innerHTML = '';
  SUGERENCIAS.forEach((s) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip';
    chip.textContent = s;
    chip.addEventListener('click', () => {
      añadirMensaje(s, 'user');
      respuestaBot(s);
    });
    chatSuggestions.appendChild(chip);
  });
}

let chatIniciado = false;
function abrirChat() {
  chat.classList.add('open');
  chat.setAttribute('aria-hidden', 'false');
  chatToggle.classList.add('hidden');
  if (!chatIniciado) {
    chatIniciado = true;
    añadirMensaje('¡Hola! 👋 Soy el asistente de KepaFinanzas. Pregúntame lo que quieras sobre <strong>oro</strong>, <strong>plata</strong>, los <strong>planes</strong> o cómo ser <strong>partner</strong>.', 'bot');
    pintarSugerencias();
  }
  setTimeout(() => chatInput.focus(), 200);
}
function cerrarChat() {
  chat.classList.remove('open');
  chat.setAttribute('aria-hidden', 'true');
  chatToggle.classList.remove('hidden');
}

chatToggle.addEventListener('click', abrirChat);
chatClose.addEventListener('click', cerrarChat);
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = chatInput.value.trim();
  if (!texto) return;
  añadirMensaje(texto, 'user');
  chatInput.value = '';
  respuestaBot(texto);
});
