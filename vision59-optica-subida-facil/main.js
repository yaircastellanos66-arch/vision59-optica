/**
 * VISIÓN 59 ÓPTICA - JAVASCRIPT PRINCIPAL
 * Funcionalidades interactivas, navegación, vista previa de WhatsApp y formularios
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Manejo de Navbar Sticky y Efecto de Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Menú Móvil (Responsive Toggle)
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navLinks.classList.toggle('active');
      navToggle.innerHTML = isExpanded 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars"></i>';
    });

    // Cerrar menú al hacer clic en cualquier enlace
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (navToggle) {
          navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
      });
    });
  }

  // 3. Widget de WhatsApp Flotante (Modo Vista Previa según lo solicitado)
  const whatsappBtn = document.getElementById('whatsappBtn');
  const whatsappModal = document.getElementById('whatsappModal');
  const closeWhatsappModal = document.getElementById('closeWhatsappModal');
  const closeWhatsappBtnSecondary = document.getElementById('closeWhatsappBtnSecondary');

  if (whatsappBtn && whatsappModal) {
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      whatsappModal.classList.add('active');
    });

    if (closeWhatsappModal) {
      closeWhatsappModal.addEventListener('click', () => {
        whatsappModal.classList.remove('active');
      });
    }

    if (closeWhatsappBtnSecondary) {
      closeWhatsappBtnSecondary.addEventListener('click', () => {
        whatsappModal.classList.remove('active');
      });
    }

    // Cerrar al hacer clic fuera del contenido del modal
    whatsappModal.addEventListener('click', (e) => {
      if (e.target === whatsappModal) {
        whatsappModal.classList.remove('active');
      }
    });
  }

  // 4. Formulario de Contacto / Agendar Cita
  const appointmentForm = document.getElementById('appointmentForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = appointmentForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Registrando solicitud...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        appointmentForm.reset();
        
        if (formSuccessAlert) {
          formSuccessAlert.style.display = 'block';
          formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => {
            formSuccessAlert.style.display = 'none';
          }, 8000);
        } else {
          alert('¡Gracias por contactar a Visión 59 Óptica! Hemos recibido tu solicitud y nuestro equipo se comunicará contigo a la brevedad.');
        }
      }, 1200);
    });
  }

  // 5. Scroll Suave para Anclas
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const navOffset = navbar ? navbar.offsetHeight + 10 : 70;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
