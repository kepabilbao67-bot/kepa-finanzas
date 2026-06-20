/* =========================================================
   KepaFinanzas - script principal
   ========================================================= */

/* --- CONFIGURACIÓN ---
   Cambia este número por el de WhatsApp real (formato internacional, solo dígitos).
   Ejemplo España: 34600111222  |  México: 521555...  |  Argentina: 549...        */
const WHATSAPP_NUMERO = '34600000000';
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
   ASISTENTE IA (basado en conocimiento sobre metales)
   ========================================================= */
const chatToggle = document.getElementById('chatToggle');
const chat = document.getElementById('chat');
const chatClose = document.getElementById('chatClose');
const chatBody = document.getElementById('chatBody');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatSuggestions = document.getElementById('chatSuggestions');

/* Base de conocimiento: cada entrada tiene palabras clave y una respuesta */
const BASE_CONOCIMIENTO = [
  {
    claves: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'hey', 'saludos'],
    respuesta: '¡Hola! 👋 Soy el asistente de KepaFinanzas. Puedo resolver tus dudas sobre invertir en oro y plata, la custodia, los planes de compra o cómo ser partner. ¿Qué te gustaría saber?'
  },
  {
    claves: ['oro', 'que es el oro', 'porque oro', 'por que oro'],
    respuesta: 'El oro es un metal precioso considerado refugio de valor: protege tu dinero frente a la inflación y las crisis. En KepaFinanzas compras oro físico de alta pureza (9999) y lo custodiamos por ti de forma segura. 🪙'
  },
  {
    claves: ['plata', 'que es la plata'],
    respuesta: 'La plata es un metal precioso más accesible que el oro y con gran potencial. También tiene uso industrial, lo que añade demanda. Vendemos plata pura (999) y la guardamos en bóveda segura. ⚪'
  },
  {
    claves: ['diferencia', 'oro o plata', 'oro vs plata', 'cual es mejor', 'que conviene'],
    respuesta: 'El oro suele ser más estable y un refugio clásico; la plata es más económica y puede tener mayor recorrido pero con más variación. Muchos clientes combinan ambos. ¿Quieres que te ayudemos a elegir? Escríbenos por WhatsApp y te asesoramos sin compromiso.'
  },
  {
    claves: ['custodia', 'guardar', 'seguro', 'seguridad', 'boveda', 'bóveda', 'donde se guarda'],
    respuesta: 'Tu metal se guarda en una bóveda blindada con vigilancia 24/7, cámaras y control de acceso. Compras tranquilo: el oro y la plata son físicos y quedan a tu nombre con trazabilidad. 🔒'
  },
  {
    claves: ['plan', 'planes', 'comprar', 'compra', 'cuanto', 'precio', 'cuesta', 'invertir cuanto', 'minimo'],
    respuesta: 'Tenemos 6 planes de compra para distintos objetivos y presupuestos. Los detalles y precios se confirman de forma personalizada. Cuéntanos cuánto quieres invertir y te recomendamos el plan ideal por WhatsApp. 📈'
  },
  {
    claves: ['invertir', 'inversion', 'inversión', 'como invierto', 'empezar'],
    respuesta: 'Invertir es muy sencillo: 1) eliges un plan de compra, 2) adquieres tu oro o plata, 3) nosotros lo custodiamos. Tu patrimonio queda protegido en metal físico real. ¿Quieres empezar? Pulsa "Ver planes" o escríbenos por WhatsApp.'
  },
  {
    claves: ['partner', 'afiliado', 'comision', 'comisión', 'comisiones', 'ganar', 'referir', 'recomendar', 'trabajar con vosotros', 'trabajar con ustedes'],
    respuesta: 'Como partner recomiendas KepaFinanzas y cobras tus comisiones en oro 🪙. Puedes empezar sin inversión obligatoria y te damos apoyo y material. Es una forma de generar ingresos respaldados en metal precioso. ¿Te interesa? Escríbenos por WhatsApp y te explicamos.'
  },
  {
    claves: ['comisiones en oro', 'pagan en oro', 'cobrar en oro'],
    respuesta: 'Sí: las comisiones de partner se pagan en oro, no solo en dinero. Así tu trabajo se convierte directamente en patrimonio. 💛'
  },
  {
    claves: ['seguro de verdad', 'es fiable', 'confianza', 'estafa', 'real', 'legitimo', 'legítimo'],
    respuesta: 'Trabajamos con metal físico real y custodia con trazabilidad. Te acompañamos en todo el proceso y puedes preguntar lo que necesites. Para darte total confianza, lo mejor es que hablemos directamente por WhatsApp.'
  },
  {
    claves: ['retirar', 'vender', 'recuperar', 'liquidez', 'sacar mi oro'],
    respuesta: 'El oro y la plata tienen liquidez global: se reconocen y valoran en todo el mundo. Cuando quieras disponer de tu metal, te explicamos las opciones. Consúltanos por WhatsApp para tu caso concreto.'
  },
  {
    claves: ['contacto', 'telefono', 'teléfono', 'whatsapp', 'hablar', 'asesor', 'llamar', 'correo', 'email'],
    respuesta: 'Puedes escribirnos por WhatsApp ahora mismo y te atendemos personalmente. 👉 Pulsa el botón verde de WhatsApp o usa el formulario de contacto de la página.'
  },
  {
    claves: ['minimo', 'mínimo', 'cuanto necesito', 'con cuanto empiezo', 'cantidad minima', 'poco dinero', 'empezar con poco'],
    respuesta: 'Puedes empezar con distintos importes según el plan que elijas. Tenemos opciones para presupuestos pequeños y grandes. Dinos cuánto tienes pensado invertir y te decimos el plan que mejor encaja. 💬'
  },
  {
    claves: ['pureza', 'quilates', 'kilataje', 'calidad', '9999', '999', 'autentico', 'auténtico'],
    respuesta: 'Trabajamos con oro de pureza 9999 (24 quilates) y plata 999, los estándares más altos del mercado. Es metal auténtico y certificado. ✅'
  },
  {
    claves: ['impuestos', 'impuesto', 'iva', 'hacienda', 'fiscal', 'tributa', 'declarar'],
    respuesta: 'La fiscalidad depende de tu país y de tu situación personal. El oro de inversión suele tener un tratamiento fiscal especial. Para tu caso concreto, te recomendamos hablar con nuestro equipo por WhatsApp y, si hace falta, con un asesor fiscal.'
  },
  {
    claves: ['entrega', 'recibir', 'me lo dan', 'envio', 'envío', 'casa', 'fisico en mano', 'físico en mano', 'llevar'],
    respuesta: 'Puedes mantener tu metal en nuestra custodia segura o coordinar su disposición cuando lo necesites. Las opciones de entrega se gestionan de forma personalizada. Consúltanos por WhatsApp. 📦'
  },
  {
    claves: ['seguro', 'asegurado', 'robo', 'incendio', 'que pasa si'],
    respuesta: 'El metal en custodia se guarda en bóveda blindada con vigilancia 24/7 y medidas de seguridad. Si quieres detalles sobre coberturas y garantías de tu caso, te lo explicamos por WhatsApp.'
  },
  {
    claves: ['precio del oro', 'cotizacion', 'cotización', 'cuanto vale el oro', 'valor del oro', 'sube', 'baja'],
    respuesta: 'El precio del oro y la plata varía cada día según el mercado internacional. Te informamos del precio actualizado en el momento de tu compra. Escríbenos por WhatsApp para conocer la cotización del día. 📈'
  },
  {
    claves: ['como ser partner', 'pasos partner', 'empezar partner', 'unirme', 'darme de alta', 'registrarme'],
    respuesta: 'Hacerte partner es fácil: 1) nos escribes y te damos de alta, 2) recibes tu material y apoyo, 3) recomiendas KepaFinanzas y 4) cobras tus comisiones en oro. Sin inversión obligatoria para empezar. ¿Te apuntas? Escríbenos por WhatsApp. 🤝'
  },
  {
    claves: ['cuanto gano', 'cuanto se gana', 'ganancia partner', 'porcentaje', 'cuanto pagan'],
    respuesta: 'Las comisiones de partner dependen de las operaciones que generes y se pagan en oro. Te explicamos las condiciones concretas de forma personalizada por WhatsApp. 💛'
  },
  {
    claves: ['pago', 'pagar', 'transferencia', 'tarjeta', 'metodos de pago', 'métodos de pago', 'como pago'],
    respuesta: 'Te indicamos las formas de pago disponibles al elegir tu plan. Para darte los detalles según tu país, lo mejor es que hablemos por WhatsApp. 💳'
  },
  {
    claves: ['por que kepafinanzas', 'porque vosotros', 'por que ustedes', 'que os diferencia', 'ventajas'],
    respuesta: 'En KepaFinanzas combinamos metal físico real, custodia segura, acompañamiento cercano sin tecnicismos y la posibilidad de ganar comisiones en oro como partner. Estamos para ayudarte en cada paso. 🪙'
  },
  {
    claves: ['ubicacion', 'ubicación', 'donde estais', 'donde están', 'oficina', 'pais', 'país', 'ciudad'],
    respuesta: 'Atendemos de forma online y por WhatsApp para que puedas invertir desde donde estés. Si necesitas saber detalles concretos, escríbenos y te informamos.'
  },
  {
    claves: ['gracias', 'muchas gracias', 'perfecto', 'genial', 'ok', 'vale', 'adios', 'adiós', 'hasta luego'],
    respuesta: '¡Un placer! 😊 Si tienes más dudas sobre oro, plata o cómo invertir, aquí estoy. Y recuerda que puedes hablar con una persona por WhatsApp cuando quieras.'
  }
];

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
  BASE_CONOCIMIENTO.forEach((item) => {
    let puntos = 0;
    item.claves.forEach((clave) => {
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
  // pequeño retardo para simular que "piensa"
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
