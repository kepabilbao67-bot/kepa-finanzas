/* ============================================================
   PREGUNTAS Y RESPUESTAS DEL ASISTENTE — KepaFinanzas
   ------------------------------------------------------------
   👋 ESTE ARCHIVO ES PARA TI. Aquí puedes cambiar o añadir
   respuestas tú mismo, MUY FÁCIL, aunque no sepas programar.

   Cada pregunta tiene 2 partes:
     palabras:  palabras que el cliente podría escribir (separadas por comas)
     respuesta: lo que contestará el asistente

   ------------------------------------------------------------
   👉 PARA CAMBIAR UNA RESPUESTA:
      Borra el texto que hay entre las comillas de "respuesta:"
      y escribe el tuyo. Nada más.

   👉 PARA AÑADIR UNA PREGUNTA NUEVA:
      Copia este bloque (con la coma del final) y rellénalo:

        {
          palabras: ['ejemplo1', 'ejemplo2'],
          respuesta: 'Escribe aquí tu respuesta.'
        },

   ------------------------------------------------------------
   ⚠️ 3 REGLAS PARA QUE NO SE ROMPA:
      1) El texto SIEMPRE va entre comillas '...'
      2) No borres las comas , ni las llaves { }
      3) NO uses apóstrofos (') dentro del texto.
         En vez de "qué és" escribe "que es" (sin tilde rara),
         o usa el acento normal: á é í ó ú (esos sí valen).
   ============================================================ */

const PREGUNTAS = [

  /* ---------- SALUDO ---------- */
  {
    palabras: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'hey', 'saludos'],
    respuesta: '¡Hola! 👋 Soy el asistente de KepaFinanzas. Puedo ayudarte con dudas sobre invertir en oro y plata, la custodia, los planes de compra o cómo ser partner. ¿Qué te gustaría saber?'
  },

  /* ---------- SOBRE EL ORO Y LA PLATA ---------- */
  {
    palabras: ['oro', 'porque oro', 'por que oro'],
    respuesta: 'El oro es un metal precioso considerado refugio de valor: protege tu dinero frente a la inflación y las crisis. En KepaFinanzas compras oro físico de alta pureza (9999) y lo custodiamos por ti de forma segura. 🪙'
  },
  {
    palabras: ['plata'],
    respuesta: 'La plata es un metal precioso más accesible que el oro y con gran potencial. Vendemos plata pura (999) y la guardamos en bóveda segura. ⚪'
  },
  {
    palabras: ['diferencia', 'oro o plata', 'cual es mejor', 'que conviene'],
    respuesta: 'El oro suele ser más estable; la plata es más económica y puede tener más recorrido, aunque con más variación. Muchos clientes combinan ambos. ¿Quieres que te asesoremos? Escríbenos por WhatsApp.'
  },
  {
    palabras: ['pureza', 'quilates', 'calidad', '9999', '999', 'autentico'],
    respuesta: 'Trabajamos con oro de pureza 9999 (24 quilates) y plata 999, los estándares más altos del mercado. Es metal auténtico y certificado. ✅'
  },

  /* ---------- CUSTODIA Y SEGURIDAD ---------- */
  {
    palabras: ['custodia', 'guardar', 'seguro', 'seguridad', 'boveda', 'donde se guarda'],
    respuesta: 'Tu metal se guarda en una bóveda blindada con vigilancia 24/7, cámaras y control de acceso. El oro y la plata son físicos y quedan a tu nombre con trazabilidad. 🔒'
  },

  /* ---------- INVERTIR ---------- */
  {
    palabras: ['invertir', 'inversion', 'como invierto', 'empezar'],
    respuesta: 'Invertir es muy sencillo: 1) eliges un plan de compra, 2) adquieres tu oro o plata, 3) nosotros lo custodiamos. Tu patrimonio queda protegido en metal físico real. Pulsa "Ver planes" o escríbenos por WhatsApp.'
  },
  {
    palabras: ['planes', 'plan', 'comprar', 'precio', 'cuesta'],
    respuesta: 'Tenemos 6 planes de compra para distintos objetivos y presupuestos. Cuéntanos cuánto quieres invertir y te recomendamos el plan ideal por WhatsApp. 📈'
  },

  /* ---------- PARTNER / COMISIONES EN ORO ---------- */
  {
    palabras: ['partner', 'afiliado', 'comision', 'comisiones', 'ganar', 'referir', 'recomendar'],
    respuesta: 'Como partner recomiendas KepaFinanzas y cobras tus comisiones en oro 🪙. Puedes empezar sin inversión obligatoria y te damos apoyo y material. ¿Te interesa? Escríbenos por WhatsApp.'
  },
  {
    palabras: ['como ser partner', 'pasos partner', 'unirme', 'darme de alta', 'registrarme'],
    respuesta: 'Hacerte partner es fácil: 1) nos escribes y te damos de alta, 2) recibes tu material y apoyo, 3) recomiendas KepaFinanzas y 4) cobras tus comisiones en oro. ¿Te apuntas? Escríbenos por WhatsApp. 🤝'
  },

  /* ============================================================
     👇 Respuestas que puedes personalizar cuando quieras.
        (Por ahora dan una respuesta correcta y derivan a WhatsApp.)
     ============================================================ */

  {
    palabras: ['minimo', 'cuanto necesito', 'con cuanto empiezo', 'cantidad minima'],
    respuesta: 'Puedes empezar a invertir desde el plan S-3, con una prima de 300 €. Según tu presupuesto te recomendamos el plan ideal. Escríbenos por WhatsApp y te orientamos. 💰'
  },
  {
    palabras: ['impuestos', 'iva', 'fiscal', 'hacienda', 'tributa'],
    respuesta: 'La fiscalidad depende de tu país y de tu situación personal. El oro de inversión suele tener un tratamiento fiscal favorable. Para tu caso concreto, consúltanos por WhatsApp y, si hace falta, con un asesor fiscal.'
  },
  {
    palabras: ['pago', 'pagar', 'transferencia', 'tarjeta', 'metodos de pago', 'como pago'],
    respuesta: 'Te indicamos las formas de pago disponibles al elegir tu plan. Para darte los detalles según tu país, escríbenos por WhatsApp. 💳'
  },
  {
    palabras: ['entrega', 'recibir', 'me lo dan', 'envio', 'llevar el oro'],
    respuesta: 'Tu metal puede quedar en nuestra custodia segura o coordinar su disposición cuando lo necesites. Te explicamos las opciones por WhatsApp. 📦'
  },
  {
    palabras: ['ubicacion', 'donde estais', 'oficina', 'ciudad', 'direccion'],
    respuesta: 'Atendemos de forma online y por WhatsApp para que puedas invertir desde donde estés, con total comodidad.'
  },
  {
    palabras: ['horario', 'cuando', 'a que hora', 'atencion'],
    respuesta: 'Puedes escribirnos por WhatsApp cuando quieras y te responderemos lo antes posible. 🕒'
  },
  {
    palabras: ['cuanto gano', 'ganancia partner', 'porcentaje', 'cuanto pagan'],
    respuesta: 'Las comisiones de partner se pagan en oro y dependen de las operaciones que generes. Te explicamos las condiciones concretas de forma personalizada por WhatsApp. 💛'
  },

  /* ---------- DESPEDIDA (déjala como está) ---------- */
  {
    palabras: ['gracias', 'perfecto', 'genial', 'ok', 'vale', 'adios', 'hasta luego'],
    respuesta: '¡Un placer! 😊 Si tienes más dudas sobre oro, plata o cómo invertir, aquí estoy. Y recuerda que puedes hablar con una persona por WhatsApp cuando quieras.'
  }

];
