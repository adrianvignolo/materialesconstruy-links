/**
 * Materiales ConstruY - Enlaces Linktree
 * Renderizado dinámico desde config.js, integración de Google Analytics/GTM y utilidades.
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.construyConfig || {};

  // 1. Iniciar analítica (Google Analytics / Google Tag Manager)
  initAnalytics(config.analytics);

  // 2. Renderizar contenido dinámico desde config
  renderProfile(config.profile);
  renderSocials(config.socials);
  renderLinks(config.links, config.analytics);

  // 3. Inicializar utilidades interactivas
  initBusinessStatus(config.profile?.schedule);
  initShareActions();
  initQrModal();
  initMapActions(config.profile?.location);
  initCopyActions();
});

/**
 * ============================================================================
 * GOOGLE ANALYTICS & GOOGLE TAG MANAGER
 * ============================================================================
 */
function initAnalytics(analyticsConfig) {
  if (!analyticsConfig) return;

  const { googleAnalyticsId, googleTagManagerId } = analyticsConfig;

  // Google Analytics 4 (GA4)
  if (googleAnalyticsId && typeof googleAnalyticsId === 'string' && googleAnalyticsId.trim() !== '') {
    const cleanGaId = googleAnalyticsId.trim();
    
    // Script de gtag.js
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${cleanGaId}`;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', cleanGaId, {
      page_title: document.title,
      page_location: window.location.href
    });

    console.info(`[Analytics] Google Analytics inicializado: ${cleanGaId}`);
  }

  // Google Tag Manager (GTM)
  if (googleTagManagerId && typeof googleTagManagerId === 'string' && googleTagManagerId.trim() !== '') {
    const cleanGtmId = googleTagManagerId.trim();

    // Script principal de GTM
    (function(w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      const f = d.getElementsByTagName(s)[0];
      const j = d.createElement(s);
      const dl = l !== 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', cleanGtmId);

    // Fallback de GTM noscript en el body
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${cleanGtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.insertBefore(noscript, document.body.firstChild);

    console.info(`[Analytics] Google Tag Manager inicializado: ${cleanGtmId}`);
  }
}

/**
 * Registra evento de clic en enlace en Google Analytics
 */
function trackClick(label, url) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'click', {
      event_category: 'enlace_linktree',
      event_label: label,
      destination: url
    });
  }
}

/**
 * ============================================================================
 * RENDERIZADO DEL PERFIL Y DATOS DE CONTACTO
 * ============================================================================
 */
function renderProfile(profile) {
  if (!profile) return;

  if (profile.name) {
    const nameEl = document.getElementById('profile-name');
    if (nameEl) nameEl.textContent = profile.name;
  }

  if (profile.handle) {
    const handleEl = document.getElementById('profile-handle');
    if (handleEl) {
      handleEl.textContent = profile.handle;
      if (profile.handleUrl) handleEl.parentElement.href = profile.handleUrl;
    }
  }

  if (profile.bio) {
    const bioEl = document.getElementById('profile-bio');
    if (bioEl) bioEl.textContent = profile.bio;
  }

  if (profile.avatar) {
    const avatarEl = document.getElementById('profile-avatar');
    if (avatarEl) avatarEl.src = profile.avatar;
  }

  if (profile.wordmark) {
    const wordmarkEl = document.getElementById('profile-wordmark');
    if (wordmarkEl) wordmarkEl.src = profile.wordmark;
  }

  // Datos en pie de página y metadatos
  if (profile.rif) {
    const rifEl = document.getElementById('footer-rif');
    if (rifEl) rifEl.textContent = `RIF ${profile.rif}`;
  }

  // Teléfonos y correo en tarjeta de contacto
  if (profile.contact) {
    const phoneEl = document.getElementById('contact-phone');
    if (phoneEl) {
      phoneEl.innerHTML = `<a href="tel:${profile.contact.phoneClean || profile.contact.phone}">${profile.contact.phone}</a>` +
        (profile.contact.phoneAlt ? ` / <a href="tel:${profile.contact.phoneAlt.replace(/\s+/g, '')}">${profile.contact.phoneAlt}</a>` : '');
    }

    const emailEl = document.getElementById('contact-email');
    if (emailEl) {
      emailEl.innerHTML = `<a href="mailto:${profile.contact.email}">${profile.contact.email}</a>`;
    }
  }

  // Mapa
  if (profile.location) {
    const mapIframe = document.getElementById('map-iframe');
    if (mapIframe && profile.location.googleMapsEmbedUrl) {
      mapIframe.src = profile.location.googleMapsEmbedUrl;
    }

    const btnMaps = document.getElementById('btn-route-maps');
    if (btnMaps && profile.location.googleMapsUrl) {
      btnMaps.href = profile.location.googleMapsUrl;
    }

    const btnWaze = document.getElementById('btn-route-waze');
    if (btnWaze && profile.location.wazeUrl) {
      btnWaze.href = profile.location.wazeUrl;
    }

    const locTitle = document.getElementById('location-title');
    if (locTitle && profile.location.title) {
      locTitle.textContent = profile.location.title;
    }
  }
}

/**
 * ============================================================================
 * RENDERIZADO DE REDES SOCIALES
 * ============================================================================
 */
function renderSocials(socials) {
  const container = document.getElementById('social-bar-container');
  if (!container || !Array.isArray(socials) || socials.length === 0) return;

  container.innerHTML = '';

  socials.filter(s => s.enabled !== false).forEach(item => {
    const a = document.createElement('a');
    a.href = item.url;
    a.className = `social-icon-btn btn-${item.id}`;
    a.title = item.name;
    a.setAttribute('aria-label', item.name);
    if (item.url.startsWith('http')) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }

    a.innerHTML = getIconSvg(item.icon);

    a.addEventListener('click', () => {
      trackClick(`Social: ${item.name}`, item.url);
    });

    container.appendChild(a);
  });
}

/**
 * ============================================================================
 * RENDERIZADO DE ENLACES PRINCIPALES (LINKTREE)
 * ============================================================================
 */
function renderLinks(links, analyticsConfig) {
  const container = document.getElementById('links-container');
  if (!container || !Array.isArray(links)) return;

  container.innerHTML = '';

  links.filter(l => l.enabled !== false).forEach(link => {
    const card = document.createElement('a');
    card.href = link.url;
    card.className = `link-card ${link.cardType === 'featured' ? 'featured-card' : ''} ${link.cardType === 'whatsapp' ? 'whatsapp-card' : ''}`;
    card.target = link.target || '_blank';
    if (link.target !== '_self') {
      card.rel = 'noopener noreferrer';
    }

    // Badge styling class
    let badgeClass = 'badge-tag';
    if (link.badgeType === 'featured') badgeClass += ' tag-featured';
    if (link.badgeType === 'whatsapp') badgeClass += ' tag-whatsapp';

    // Generar muestras de color si está habilitado
    let swatchHtml = '';
    if (link.showColorDots) {
      swatchHtml = `
        <div class="swatch-preview-dots" aria-hidden="true">
          <span class="swatch-dot" style="background:#002952;" title="Azul Profundo"></span>
          <span class="swatch-dot" style="background:#b02e00;" title="Terracota"></span>
          <span class="swatch-dot" style="background:#f1c40f;" title="Amarillo Trigo"></span>
          <span class="swatch-dot" style="background:#27ae60;" title="Verde Manzana"></span>
          <span class="swatch-dot" style="background:#7f8c8d;" title="Gris Perla"></span>
          <span class="swatch-dot" style="background:#ecf0f1;" title="Blanco Nieve"></span>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="link-icon-box">
        ${getIconSvg(link.icon)}
      </div>
      <div class="link-text-content">
        <div class="link-header-row">
          <h2 class="link-title">${escapeHtml(link.title)}</h2>
          ${link.badge ? `<span class="${badgeClass}">${escapeHtml(link.badge)}</span>` : ''}
        </div>
        <p class="link-subtitle">${escapeHtml(link.subtitle || '')}</p>
        ${swatchHtml}
      </div>
      <div class="link-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    `;

    // Medición de clics
    card.addEventListener('click', () => {
      if (analyticsConfig?.trackLinkClicks !== false) {
        trackClick(`Enlace: ${link.title}`, link.url);
      }
    });

    container.appendChild(card);
  });
}

/**
 * ============================================================================
 * CATÁLOGO DE ICONOS SVG
 * ============================================================================
 */
function getIconSvg(name) {
  const icons = {
    store: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
      </svg>
    `,
    package: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
    `,
    palette: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
      </svg>
    `,
    whatsapp: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    `,
    partner: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    `,
    file: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
      </svg>
    `,
    history: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    `,
    instagram: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    `,
    phone: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    `,
    email: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    `,
    map: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    `,
    website: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    `,
    link: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
      </svg>
    `
  };

  return icons[name] || icons.link;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * ============================================================================
 * HORARIO DE ATENCIÓN EN VIVO (HORA OFICIAL DE VENEZUELA - UTC-4)
 * ============================================================================
 */
function initBusinessStatus(scheduleConfig) {
  const statusPill = document.getElementById('status-pill');
  const statusText = document.getElementById('status-text');
  if (!statusPill || !statusText) return;

  const timezone = scheduleConfig?.timezone || 'America/Caracas';
  const openHour = scheduleConfig?.openHour ?? 8;
  const closeHour = scheduleConfig?.closeHour ?? 17;

  try {
    const now = new Date();
    // Obtener día de la semana y hora exacta en zona horaria de Venezuela (America/Caracas)
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    });
    const parts = formatter.formatToParts(now);
    
    let hour = 0;
    let minute = 0;
    let weekday = '';
    parts.forEach(p => {
      if (p.type === 'hour') hour = parseInt(p.value, 10);
      if (p.type === 'minute') minute = parseInt(p.value, 10);
      if (p.type === 'weekday') weekday = p.value.toLowerCase();
    });

    const dayMap = { 'mon': 1, 'tue': 2, 'wed': 3, 'thu': 4, 'fri': 5, 'sat': 6, 'sun': 0 };
    const dayNum = dayMap[weekday] ?? 1;

    const currentMinutes = hour * 60 + minute;
    const openMinutes = openHour * 60;
    const closeMinutes = closeHour * 60;

    const isWeekday = dayNum >= 1 && dayNum <= 5;
    const isOpen = isWeekday && currentMinutes >= openMinutes && currentMinutes < closeMinutes;

    const openTimeStr = openHour > 12 ? (openHour - 12) + ':00 PM' : openHour + ':00 AM';
    const closeTimeStr = closeHour > 12 ? (closeHour - 12) + ':00 PM' : closeHour + ':00 AM';

    const dot = statusPill.querySelector('.status-dot-pulse');

    if (isOpen) {
      statusText.textContent = `Abierto Ahora · Cierra ${closeTimeStr}`;
      statusPill.classList.remove('status-closed');
      if (dot) dot.style.backgroundColor = '#10b981';
    } else {
      statusPill.classList.add('status-closed');
      if (dot) dot.style.backgroundColor = '#f59e0b';

      if (isWeekday) {
        if (currentMinutes < openMinutes) {
          statusText.textContent = `Cerrado · Abre hoy a las ${openTimeStr}`;
        } else if (dayNum === 5) {
          statusText.textContent = `Cerrado · Abre el Lunes a las ${openTimeStr}`;
        } else {
          statusText.textContent = `Cerrado · Abre mañana a las ${openTimeStr}`;
        }
      } else {
        statusText.textContent = `Cerrado · Abre el Lunes a las ${openTimeStr}`;
      }
    }
  } catch (e) {
    statusText.textContent = 'Abierto · Lun a Vie 8:00 AM - 5:00 PM';
  }
}

/**
 * ============================================================================
 * ACCIONES DE COMPARTIR Y QR
 * ============================================================================
 */
function initShareActions() {
  const btnShare = document.getElementById('btn-share');
  if (!btnShare) return;

  btnShare.addEventListener('click', async (e) => {
    e.preventDefault();
    const shareData = {
      title: 'Materiales ConstruY | Enlaces Oficiales',
      text: 'Tienda online, catálogo de pinturas, carta de colores y ubicación de Materiales ConstruY en Caracas.',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        trackClick('Acción: Compartir Nativo', window.location.href);
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard(window.location.href, '¡Enlace copiado al portapapeles!');
        }
      }
    } else {
      copyToClipboard(window.location.href, '¡Enlace copiado al portapapeles!');
    }
  });
}

function initQrModal() {
  const btnOpenQr = document.getElementById('btn-open-qr');
  const modalQr = document.getElementById('modal-qr');
  const btnCloseQr = document.getElementById('btn-close-qr');
  const qrContainer = document.getElementById('qr-code-canvas');
  const btnDownloadQr = document.getElementById('btn-download-qr');

  if (!btnOpenQr || !modalQr) return;

  let qrGenerated = false;

  const openQr = () => {
    modalQr.classList.add('active');
    modalQr.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (!qrGenerated && typeof QRCode !== 'undefined' && qrContainer) {
      qrContainer.innerHTML = '';
      const currentUrl = window.location.href.split('#')[0];
      new QRCode(qrContainer, {
        text: currentUrl,
        width: 200,
        height: 200,
        colorDark: '#002952',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });
      qrGenerated = true;
    }
  };

  const closeQr = () => {
    modalQr.classList.remove('active');
    modalQr.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  btnOpenQr.addEventListener('click', (e) => {
    e.preventDefault();
    openQr();
    trackClick('Acción: Abrir QR', '#qr');
  });

  if (btnCloseQr) {
    btnCloseQr.addEventListener('click', closeQr);
  }

  modalQr.addEventListener('click', (e) => {
    if (e.target === modalQr) closeQr();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalQr.classList.contains('active')) {
      closeQr();
    }
  });

  if (btnDownloadQr) {
    btnDownloadQr.addEventListener('click', () => {
      const img = qrContainer.querySelector('img') || qrContainer.querySelector('canvas');
      if (img) {
        const link = document.createElement('a');
        link.download = 'qr-materialesconstruy-links.png';
        link.href = img.tagName.toLowerCase() === 'img' ? img.src : img.toDataURL('image/png');
        link.click();
        showToast('Código QR descargado');
        trackClick('Acción: Descargar QR', '#qr-download');
      }
    });
  }
}

function initMapActions(locationConfig) {
  const btnCopyAddress = document.getElementById('btn-copy-address');
  if (btnCopyAddress) {
    btnCopyAddress.addEventListener('click', (e) => {
      e.preventDefault();
      const address = locationConfig?.address || 'Macaracuay, Petare, Municipio Sucre, Caracas, Venezuela';
      copyToClipboard(address, '¡Dirección copiada!');
      trackClick('Acción: Copiar Dirección', '#mapa');
    });
  }
}

function initCopyActions() {
  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = el.getAttribute('data-copy');
      const msg = el.getAttribute('data-copy-msg') || 'Copiado al portapapeles';
      copyToClipboard(textToCopy, msg);
    });
  });
}

function copyToClipboard(text, successMessage) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMessage);
    }).catch(() => {
      fallbackCopy(text, successMessage);
    });
  } else {
    fallbackCopy(text, successMessage);
  }
}

function fallbackCopy(text, successMessage) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(successMessage);
  } catch (err) {
    console.error('No se pudo copiar:', err);
  }
  document.body.removeChild(textArea);
}

let toastTimeout;
function showToast(message) {
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    toast.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
      <span id="toast-text">${message}</span>
    `;
    document.body.appendChild(toast);
  } else {
    document.getElementById('toast-text').textContent = message;
  }

  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}
