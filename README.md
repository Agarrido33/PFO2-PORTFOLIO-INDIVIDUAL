# 🚀 Portfolio Landing Page - Andrés Garrido

## 📋 Descripción

Este es un portfolio/landing page moderno y dinámico desarrollado como parte del proyecto de Frontend. Transforma el CV tradicional en una experiencia web interactiva con animaciones, música de fondo y elementos optimizados para conversiones.

## ✨ Características Principales

### 🎨 Diseño Moderno
- **Diseño responsivo** que se adapta a todos los dispositivos
- **Animaciones CSS** suaves y profesionales
- **Efectos visuales** como parallax y hover effects
- **Gradientes y sombras** modernas
- **Tipografía** optimizada con Google Fonts (Inter)

### 🎵 Audio y Multimedia
- **Música de fondo** opcional con controles de volumen
- **Controles de audio** flotantes en la esquina superior derecha

### 🎯 Optimización para Conversiones
- **Llamadas a la acción (CTAs)** estratégicamente ubicadas
- **Formulario de contacto** funcional con validación
- **Navegación suave** entre secciones
- **Indicadores de progreso** de scroll
- **Efectos de cursor** personalizados

### ⚡ Interactividad Avanzada
- **Scroll animations** con Intersection Observer
- **Contadores animados** para estadísticas
- **Barras de progreso** animadas para habilidades
- **Efectos de hover** en todos los elementos interactivos
- **Navegación móvil** con hamburger menu animado

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS y Grid/Flexbox
- **JavaScript ES6+** - Interactividad y animaciones
- **Font Awesome** - Iconografía
- **Google Fonts** - Tipografía (Inter)

## 📁 Estructura del Proyecto

```
CV_Andres Garrido/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos principales
├── js/
│   └── main.js         # JavaScript principal
├── images/
│   └── foto-perfil.jpg # Foto de perfil
├── audio/
│   └── background-music.mp3  # Música de fondo
└── README.md           # Este archivo
```

## 🎨 Personalización

### Colores
Los colores principales están definidos como variables CSS en `:root`:
```css
:root {
    --primary-color: #012e58;    /* Azul oscuro principal */
    --secondary-color: #3498db;  /* Azul claro */
    --accent-color: #1f6fb2;     /* Azul medio */
    /* ... más variables */
}
```

### Contenido
- **Información personal**: Edita el HTML directamente
- **Experiencia laboral**: Modifica la sección `.timeline`
- **Habilidades**: Actualiza la sección `.skills-grid`
- **Contacto**: Cambia la información en `.contact-info`

### Animaciones
Las animaciones se pueden personalizar en el archivo CSS:
- **Duración**: Modifica `--transition` en las variables CSS
- **Efectos**: Ajusta las animaciones en `@keyframes`
- **Timing**: Cambia los delays en las clases de animación

## 📱 Responsive Design

El diseño es completamente responsivo con breakpoints para:
- **Desktop**: > 768px
- **Tablet**: 768px - 480px  
- **Mobile**: < 480px

## 🎯 Optimizaciones de Conversión

### CTAs (Call to Action)
- **"Trabajemos Juntos"** - CTA principal en hero
- **"Conoce Más"** - CTA secundario
- **"Contactar"** - CTA en overlay de imagen
- **"Enviar Mensaje"** - CTA en formulario

### Elementos de Confianza
- **Estadísticas animadas** (años de experiencia, proyectos)
- **Timeline profesional** con logros destacados
- **Habilidades visuales** con barras de progreso
- **Información de contacto** completa y accesible

## 🔧 Funcionalidades JavaScript

### AudioManager
- Control de reproducción y volumen
- Manejo de errores de audio
- Efectos visuales en controles

### NavigationManager
- Navegación suave entre secciones
- Menú móvil responsivo
- Highlighting de sección activa

### AnimationManager
- Animaciones basadas en scroll
- Contadores animados
- Barras de progreso
- Efectos parallax

### FormManager
- Validación de formulario
- Estados de carga
- Notificaciones de éxito

### ScrollEffectsManager
- Barra de progreso de scroll
- Efectos de navbar
- Animaciones de revelado

### CursorEffectsManager
- Cursor personalizado
- Efectos de hover
- Efectos ripple en botones

### PerformanceOptimizer
- Lazy loading de imágenes
- Throttling de eventos de scroll
- Preload de recursos críticos

## 🎵 Música de Fondo

### Formatos Soportados
- **MP3** (recomendado)
- **OGG** (alternativa)


## 📞 Soporte

Para dudas o problemas:
- **Email**: garrido.andres.a@gmail.com
- **LinkedIn**: [Tu perfil de LinkedIn]

## 📄 Licencia

Este proyecto es de uso educativo y personal. Puedes usarlo como base para tu propio portfolio.

---

**Desarrollado con ❤️ por Andrés Garrido**

*Líder de Sistemas y Proyectos TI*
