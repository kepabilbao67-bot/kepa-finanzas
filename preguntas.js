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

/* ============================================================
   PREGUNTAS NUEVAS — AÑADIDAS AUTOMÁTICAMENTE
   Estas complementan las que ya tenías con más detalle.
   ============================================================ */

PREGUNTAS.push(
  {
    palabras: ['calculadora', 'cuanto gano', 'simulador', 'cuanto tendria', 'rentabilidad'],
    respuesta: 'Tenemos una calculadora en la web donde puedes simular cuánto tendrías ahorrando X€ al mes durante X años. Como referencia: el oro ha subido +144% en los últimos 5 años. Con 100€/mes × 5 años podrías tener más de 14.000€ (invirtiendo solo 6.000€). Baja a la sección "Calculadora" o pregúntame más.'
  },
  {
    palabras: ['inflacion', 'banco', 'pierdo dinero', 'cuenta ahorro', 'mi dinero pierde valor'],
    respuesta: 'Exacto. La inflación en España ha sido +25% en 5 años. Si tienes 10.000€ en el banco, hoy compran lo que antes costaba 7.500€. Has perdido 2.500€ sin hacer nada. El oro en ese mismo periodo ha subido +144%. Por eso cada vez más gente ahorra en metal físico en vez de dejar el dinero "quieto".'
  },
  {
    palabras: ['bitcoin', 'cripto', 'crypto', 'ethereum', 'criptomoneda'],
    respuesta: 'El oro y las criptomonedas son complementarios. El oro lleva 5.000 años protegiendo patrimonio con subidas estables (+144% en 5 años). Bitcoin puede caer un 80% en semanas. Mi consejo: el oro como base segura, la cripto como apuesta extra. ¿Por qué no tener ambos?'
  },
  {
    palabras: ['impuestos españa', 'irpf', 'hacienda españa', 'modelo 720', 'fiscal españa'],
    respuesta: 'En España: ✅ El oro de inversión NO tiene IVA (exento por ley UE). ✅ Solo pagas impuestos cuando VENDES con beneficio (19-27% sobre la ganancia). ✅ Si no vendes, no pagas nada. ⚠️ Si tu oro fuera de España supera 50.000€, debes informar en el Modelo 720. Para tu caso concreto, consulta con un asesor fiscal.'
  },
  {
    palabras: ['5000 años', 'historia', 'siempre ha subido', 'bancos centrales'],
    respuesta: 'El oro lleva más de 5.000 años como reserva de valor. Ha sobrevivido guerras, imperios caídos, crisis bancarias. Nunca ha quebrado, nunca ha sido rescatado. Y los bancos centrales del mundo llevan 3 años comprando +1.000 toneladas al año. Si los que imprimen el dinero compran oro... algo saben. 🏛️'
  },
  {
    palabras: ['switch', 'ratio', 'oro plata ratio', 'cambiar', 'intercambiar metales'],
    respuesta: 'El Switch te permite convertir tu oro en plata (o viceversa) según el ratio oro/plata del mercado. Si el ratio supera 80, la plata está "barata" → conviene tener más plata. Si baja de 80, el oro está más favorable. El Switch Pilot lo hace AUTOMÁTICAMENTE (disponible desde plan L-12), generando +42% de beneficio extra.'
  },
  {
    palabras: ['kepa', 'quien eres', 'sobre ti', 'asesor'],
    respuesta: 'Soy Kepa Bilbao, de Bilbao. Colaborador oficial de AUVESTA Edelmetalle AG. Te ayudo a proteger tu patrimonio ahorrando en metales preciosos físicos. No soy un vendedor — soy un asesor que primero invirtió su propio dinero y ahora ayuda a otros. Si quieres hablar conmigo directamente: WhatsApp 611 918 310.'
  },
  {
    palabras: ['envio', 'enviar a casa', 'recibir lingote', 'entrega domicilio'],
    respuesta: 'Sí, puedes pedir que te envíen tu metal a casa: desde 1g de oro o 50g de plata. Envío asegurado con tracking online. Solo entras en tu depósito, eliges cantidad y formato del lingote, y lo recibes en unos días. Aunque yo recomiendo dejarlo en la bóveda (está más seguro), siempre tienes la OPCIÓN.'
  },
  {
    palabras: ['vender', 'liquidez', 'recuperar dinero', 'retirar', 'sacar mi dinero'],
    respuesta: 'Puedes vender en cualquier momento: entras online, seleccionas la cantidad, se vende a precio de mercado y el dinero va a tu cuenta bancaria. Sin plazos, sin penalizaciones, sin pedir permiso. Además hay garantía de recompra al 100% para todo el metal custodiado. Más fácil que un plazo fijo.'
  },
  {
    palabras: ['auvesta', 'empresa', 'quien esta detras', 'seria', 'fiable', 'de fiar'],
    respuesta: 'AUVESTA Edelmetalle AG es una sociedad anónima alemana fundada en 2009. +200.000 inversores en 134 países. +500 millones € de facturación. Certificada por Trusted Shops. Auditada cada trimestre por inspectores independientes. Múltiples premios como mejor dealer de lingotes de Europa. 17+ años sin problemas. 🏛️'
  }
);
