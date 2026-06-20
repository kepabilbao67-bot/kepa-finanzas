# KepaFinanzas — Inversión y custodia de metales preciosos

Sitio web de **KepaFinanzas** para la compra y custodia de **oro y plata**. Incluye dos vías de participación (inversor y partner con comisiones en oro), 6 planes de compra, botón de **WhatsApp** y un **asistente** que responde dudas sobre metales preciosos.

## Características

- Diseño elegante en tonos **dorado y plateado**
- Botón flotante de **WhatsApp** para contacto directo
- **Asistente** (chat) que responde preguntas sobre oro, plata, inversión, custodia, planes y el programa de partners
- Sección de **6 planes de compra**
- Dos vías: **Inversor** y **Partner** (comisiones en oro)
- Sección de **custodia segura** ilustrada
- Totalmente **responsivo** (móvil, tablet y escritorio)

## Configuración importante

En `script.js`, arriba del todo, cambia el número de WhatsApp por el real:

```js
const WHATSAPP_NUMERO = '34600000000'; // <-- pon aquí tu número (solo dígitos, con prefijo de país)
```

## Estructura

```
index.html          Sitio principal
styles.css          Estilos (tema oro/plata, responsivo)
script.js           Interactividad + asistente + WhatsApp
img/
 ├─ lingote-oro-icono.svg        Icono del título
 ├─ lingotes-oro-plata.svg       Lingotes (portada)
 ├─ boveda-custodiada.svg        Bóveda vigilada (custodia)
 ├─ boveda-oro-plata.svg         Caja fuerte con lingotes
 └─ banner-boveda-seguridad.svg  Banner de seguridad
```

## Uso

Abre `index.html` en cualquier navegador. No requiere dependencias ni compilación.

## Pendiente / por completar

- Reemplazar el número de WhatsApp por el real
- Añadir los detalles y precios reales de los 6 planes de compra
- Datos de contacto reales (correo, etc.)
