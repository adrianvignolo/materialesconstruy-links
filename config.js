/**
 * ============================================================================
 * MATERIALES CONSTRUY - ARCHIVO DE CONFIGURACIÓN
 * ============================================================================
 * 
 * En este archivo puedes:
 * 1. Configurar tus IDs de Google Analytics (GA4) y Google Tag Manager (GTM).
 * 2. Agregar, editar, ordenar o desactivar enlaces de la lista (estilo Linktree).
 * 3. Modificar las redes sociales y datos de contacto (WhatsApp, teléfono, etc.).
 * 4. Actualizar la información del perfil y ubicación en el mapa.
 */

const construyConfig = {

  // ==========================================================================
  // 1. MÉTRICAS Y ANALÍTICA (GOOGLE ANALYTICS / GOOGLE TAG MANAGER)
  // ==========================================================================
  analytics: {
    /**
     * ID de Medición de Google Analytics 4 (GA4)
     * Ejemplo: 'G-XXXXXXXXXX'
     * Si no se usa, déjalo vacío: ''
     */
    googleAnalyticsId: '',

    /**
     * ID de Contenedor de Google Tag Manager (GTM)
     * Ejemplo: 'GTM-XXXXXXX'
     * Si no se usa, déjalo vacío: ''
     */
    googleTagManagerId: '',

    /**
     * Registrar automáticamente clics en cada enlace en Google Analytics
     */
    trackLinkClicks: true,
  },

  // ==========================================================================
  // 2. PERFIL DE LA MARCA
  // ==========================================================================
  profile: {
    name: 'Materiales ConstruY',
    handle: '@materialesconstruy',
    handleUrl: 'https://www.instagram.com/materialesconstruy/',
    avatar: 'assets/logo-avatar.png',
    wordmark: 'assets/logo.png',
    bio: 'Fabricantes de pintura de caucho lavable y esmalte semi-industrial para interiores y exteriores. Ventas al mayor y al detal.',
    rif: 'J-504842850',
    schedule: {
      days: 'Lunes a Viernes',
      hours: '8:00 AM - 5:00 PM',
      timezone: 'America/Caracas',
      openHour: 8,
      closeHour: 17,
    },
    location: {
      title: 'Sede & Despacho: Macaracuay, Caracas',
      address: 'Macaracuay, Petare, Municipio Sucre, Caracas, Venezuela',
      shortAddress: 'Macaracuay, Caracas',
      googleMapsEmbedUrl: 'https://www.google.com/maps?q=Macaracuay,+Caracas,+Venezuela&output=embed&z=15',
      googleMapsUrl: 'https://maps.google.com/?q=Macaracuay,+Caracas,+Venezuela',
      wazeUrl: 'https://waze.com/ul?q=Macaracuay,+Caracas,+Venezuela',
    },
    contact: {
      phone: '+58 424 280 3167',
      phoneClean: '+584242803167',
      phoneAlt: '0424 280 3167',
      email: 'materialesconstruy@gmail.com',
      whatsappMessage: 'Hola ConstruY, quiero cotizar mi proyecto.',
    }
  },

  // ==========================================================================
  // 3. BARRA DE REDES SOCIALES Y ACCESOS RÁPIDOS
  // ==========================================================================
  socials: [
    {
      id: 'instagram',
      name: 'Instagram',
      url: 'https://www.instagram.com/materialesconstruy/',
      icon: 'instagram',
      enabled: true,
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      url: 'https://wa.me/584242803167?text=Hola%20ConstruY%2C%20quiero%20cotizar%20mi%20proyecto.',
      icon: 'whatsapp',
      enabled: true,
    },
    {
      id: 'phone',
      name: 'Teléfono',
      url: 'tel:+584242803167',
      icon: 'phone',
      enabled: true,
    },
    {
      id: 'email',
      name: 'Correo Electrónico',
      url: 'mailto:materialesconstruy@gmail.com',
      icon: 'email',
      enabled: true,
    },
    {
      id: 'map',
      name: 'Ubicación',
      url: '#mapa-seccion',
      icon: 'map',
      enabled: true,
    },
    {
      id: 'website',
      name: 'Sitio Web Oficial',
      url: 'https://materialesconstruy.com',
      icon: 'website',
      enabled: true,
    },
  ],

  // ==========================================================================
  // 4. LISTA DE ENLACES PRINCIPALES (ESTILO LINKTREE)
  // Puedes agregar tantos enlaces como desees duplicando un bloque.
  // Propiedades:
  // - title: Título en negrita del enlace
  // - subtitle: Texto descriptivo secundario
  // - url: Dirección web a la que redirige
  // - badge: Etiqueta pequeña (ej: "Visitar Tienda", "23 Colores")
  // - badgeType: 'featured' (azul oscuro), 'whatsapp' (verde), o 'default' (naranja/terracota)
  // - cardType: 'featured' (resaltado con degradado), 'whatsapp' (estilo WhatsApp) o 'default' (tarjeta blanca)
  // - icon: 'store' | 'package' | 'palette' | 'whatsapp' | 'partner' | 'file' | 'history' | 'link'
  // - showColorDots: true para mostrar las muestras de colores ConstruY
  // - enabled: true para mostrar el enlace, false para ocultarlo temporalmente
  // - target: '_blank' (abre en nueva pestaña) o '_self'
  // ==========================================================================
  links: [
    {
      title: 'Tienda Online Oficial',
      subtitle: 'Explora y compra pinturas, esmaltes y presentaciones con delivery',
      url: 'https://materialesconstruy.com',
      badge: 'Visitar Tienda',
      badgeType: 'featured',
      cardType: 'featured',
      icon: 'store',
      enabled: true,
      target: '_blank',
    },
    {
      title: 'Catálogo & Presentaciones',
      subtitle: 'Galón (3.785 L), Cuñete (18.9 L) y tambores para obras',
      url: 'https://materialesconstruy.com/construy#catalogo',
      badge: 'Formatos',
      badgeType: 'default',
      cardType: 'default',
      icon: 'package',
      enabled: true,
      target: '_blank',
    },
    {
      title: 'Carta de Color Oficial',
      subtitle: '23 tonos formulados para acabado mate y satinado con código',
      url: 'https://materialesconstruy.com/construy#carta',
      badge: '23 Colores',
      badgeType: 'default',
      cardType: 'default',
      icon: 'palette',
      showColorDots: true,
      enabled: true,
      target: '_blank',
    },
    {
      title: 'Cotizar por WhatsApp',
      subtitle: 'Asesoría personalizada de ingeniería y presupuestos al instante',
      url: 'https://wa.me/584242803167?text=Hola%20ConstruY%2C%20quiero%20cotizar%20mi%20proyecto.',
      badge: 'Chat Directo',
      badgeType: 'whatsapp',
      cardType: 'whatsapp',
      icon: 'whatsapp',
      enabled: true,
      target: '_blank',
    },
    {
      title: 'Programa de Lealtad ConstruY',
      subtitle: 'Acumula y compra con estrellas en cada pedido',
      url: 'https://materialesconstruy.com/#lealtad',
      badge: 'Estrellas ★',
      badgeType: 'featured',
      cardType: 'default',
      icon: 'star',
      enabled: true,
      target: '_blank',
    },
    {
      title: 'Ficha Técnica & Rendimiento',
      subtitle: 'Propiedades mecánicas, cubrimiento m² y tiempos de secado',
      url: 'https://materialesconstruy.com/construy/ficha-tecnica',
      badge: 'Especificaciones',
      badgeType: 'default',
      cardType: 'default',
      icon: 'file',
      enabled: true,
      target: '_blank',
    },
    {
      title: 'Deja tu opinión',
      subtitle: 'Califícanos en Google y comparte tu experiencia con nosotros',
      url: 'https://maps.google.com/?q=Materiales+ConstruY+Caracas',
      badge: 'Google Review ★',
      badgeType: 'default',
      cardType: 'default',
      icon: 'review',
      enabled: true,
      target: '_blank',
    },
  ]
};

// Exportar en entorno global para uso en el navegador
if (typeof window !== 'undefined') {
  window.construyConfig = construyConfig;
}
