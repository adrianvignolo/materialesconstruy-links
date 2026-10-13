# Materiales ConstruY · Página de Enlaces (Linktree Style)

Página de enlaces oficial móvil y de alta conversión inspirada en el diseño y branding de [materialesconstruy.com](https://materialesconstruy.com).

## 🌐 Visualización en Vivo (Para ti y el Cliente)

- **Enlace público en vivo (GitHub Pages):** [https://adrianvignolo.github.io/materialesconstruy-links/](https://adrianvignolo.github.io/materialesconstruy-links/)
- **Repositorio en GitHub:** [https://github.com/adrianvignolo/materialesconstruy-links](https://github.com/adrianvignolo/materialesconstruy-links)

## 🚀 Acceso en Servidor Local (Wamp64)

- **Servidor Apache Wamp64**: [http://localhost:8080/materialesconstruy-links/](http://localhost:8080/materialesconstruy-links/)
- O abriendo directamente `index.html` en cualquier navegador web.

---

## ⚙️ Archivo de Configuración (`config.js`)

Todos los enlaces, redes sociales, datos de contacto y códigos de analítica se configuran directamente en el archivo [`config.js`](config.js) en la raíz del proyecto.

### 1. Google Analytics (GA4) y Google Tag Manager (GTM)
Para activar Google Analytics o Google Tag Manager, abre [`config.js`](config.js) y asigna tu ID en la sección `analytics`:

```javascript
analytics: {
  // Coloca tu ID de medición de Google Analytics 4 (ejemplo: 'G-XXXXXXXXXX')
  googleAnalyticsId: 'G-XXXXXXXXXX',

  // Coloca tu ID de contenedor de Google Tag Manager (ejemplo: 'GTM-XXXXXXX')
  googleTagManagerId: 'GTM-XXXXXXX',

  // Medir clics en los enlaces automáticamente
  trackLinkClicks: true,
}
```

*Cuando ingresas tu ID, la página inyecta automáticamente los scripts oficiales de `gtag.js` y `gtm.js` sin que tengas que tocar el HTML.*

### 2. Agregar o Modificar Enlaces
En la sección `links` de [`config.js`](config.js) puedes agregar tantos enlaces como desees:

```javascript
links: [
  {
    title: 'Nuevo Catálogo 2026',
    subtitle: 'Descarga las últimas novedades y acabados',
    url: 'https://materialesconstruy.com/nuevo-catalogo',
    badge: 'Nuevo',
    badgeType: 'default', // 'featured' | 'whatsapp' | 'default'
    cardType: 'default',  // 'featured' | 'whatsapp' | 'default'
    icon: 'package',      // 'store' | 'package' | 'palette' | 'whatsapp' | 'partner' | 'file' | 'history' | 'link'
    enabled: true,        // true para mostrar, false para ocultar
    target: '_blank',     // '_blank' o '_self'
  },
  // ... más enlaces
]
```

### 3. Modificar Redes Sociales y Datos de Contacto
En la sección `socials` y `profile` puedes actualizar:
- Enlaces de Instagram, WhatsApp, Correo, Teléfono y Ubicación.
- Teléfono directo y correo electrónico.
- Coordenadas o enlaces a Google Maps y Waze.

---

## 🎨 Identidad Visual y Estilo

- **Colores Oficiales**:
  - Azul Institucional Primario: `#002952`
  - Acento Terracota: `#b02e00` / `#cc3500`
  - Fondo: `#f8fafb` con trama geométrica industrial sutil (`bg-grid-pattern`)
  - Acentos de alerta y estados: `#10b981` (abierto) / `#f59e0b` (cerrado)
- **Tipografías**:
  - `Coolvetica` y `Nitaka` (cargadas localmente vía `@font-face` desde `/fonts/`)
  - `Plus Jakarta Sans` e `Inter` como fuentes base
  - Tipografía monoespaciada para metadatos y fichas técnicas
- **Elementos de Marca**:
  - Avatar circular con insignia de verificación oficial
  - Wordmark institucional de Materiales ConstruY
  - Cinta de color rodante oficial (`assets/cinta-colores.webp`)
  - Muestrario de bolitas de color de la carta de tonos ConstruY

---

## 🔗 Enlaces Incluidos por Defecto

1. **🛍️ Tienda Online Oficial**: Enlace a [https://materialesconstruy.com](https://materialesconstruy.com)
2. **🎨 Catálogo & Presentaciones**: Enlace a Galones, Cuñetes y Tambores en `/construy#catalogo`
3. **🌈 Carta de Color Oficial (23 Tonos)**: Enlace a la carta de color interactiva en `/construy#carta`
4. **💬 Cotizar por WhatsApp**: Acceso directo al chat de atención (+58 424 280 3167)
5. **🤝 Partner ConstruY · Ventas al Mayor**: Alianzas B2B para ferreterías y distribuidores en `/construy#partner`
6. **📋 Ficha Técnica & Rendimiento**: Especificaciones de cobertura y secado en `/construy/ficha-tecnica`
7. **🏢 Nuestra Historia**: Trayectoria de la empresa en `/construy/historia`
8. **📍 Ubicación en el Mapa**:
   - Tarjeta interactiva con Google Maps embebido centrado en Macaracuay, Caracas
   - Botón directo para abrir en **Google Maps**
   - Botón directo para abrir en **Waze**
   - Botón para copiar dirección al portapapeles
9. **📱 Redes Sociales & Contacto**:
   - Instagram: [@materialesconstruy](https://www.instagram.com/materialesconstruy/)
   - WhatsApp Directo
   - Teléfono: `+58 424 280 3167`
   - Email: `materialesconstruy@gmail.com`
   - Web oficial

---

## ✨ Funcionalidades Interactivas

- **Botón Compartir**: Utiliza la Web Share API nativa en dispositivos móviles o copia el enlace al portapapeles con toast flotante.
- **Generador de Código QR**: Modal emergente que genera un código QR nítido para escanear en ferreterías o eventos, con opción de descarga en PNG.
- **Verificación de Horario en Vivo**: Determina en tiempo real si el centro de despacho está abierto (Lun - Vie 8:00 AM - 5:00 PM, hora de Caracas).
- **Notificaciones Toast**: Mensajes táctiles al copiar enlaces, teléfonos o direcciones.
