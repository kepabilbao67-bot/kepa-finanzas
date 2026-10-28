import{copyFileSync,mkdirSync}from'node:fs';import path from'node:path';
const files=["img/banner-boveda-seguridad.svg","img/boveda-custodiada.svg","img/boveda-oro-plata.svg","img/lingote-oro-icono.svg","img/lingotes-oro-plata.svg","img/linkedin-banner.svg","img/og-image.jpg","index.html","legal.html","mejoras.css","preguntas.js","script.js","styles.css"];
for(const file of files){const target=path.join('vercel-public',file);mkdirSync(path.dirname(target),{recursive:true});copyFileSync(file,target);}
console.log('Preparados '+files.length+' archivos web de la versión publicada.');
