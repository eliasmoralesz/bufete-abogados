import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Traducciones
const resources = {
  en: {
    translation: {
      welcome: "Welcome to our Law Firm",
      expert: "Experts in civil, criminal, and labor law. We are here to help you.",
      about: "About Me",
      aboutText: "I am a lawyer with over 10 years of experience in civil and criminal law. My main focus is to provide effective and personalized legal solutions for each client.",
      aboutText2: "I believe in transparency, honesty, and commitment to my clients. Your case is my priority.",
      services: "Services",
      civilLaw: "Civil Law",
      civilLaw_desc: "Legal advice and representation in civil disputes and contracts.",
      criminalLaw: "Criminal Law",
      criminalLaw_desc: "Defense in criminal cases with effective strategies.",
      laborLaw: "Labor Law",
      laborLaw_desc: "Support in employment disputes and labor rights.",
      blog: "Blog",
      blogText: "Articles and news about the legal field.",
      contact: "Contact Me",
      send: "Send now",
      copyright: "© 2025 Daguer Hernandez. All rights reserved.",
      social_media: "Social Media", // Nuevo
      call_me: "Call Me", // Nuevo
      write_me: "Write Me", // Nuevo
      whatsapp_contact: "Contact me on WhatsApp",
      schedule: "Monday to Friday: 8:00 to 18:00", // Nuevo, formato militar
      name: "Name",
      email: "Email",
      message: "Message",
      home: "Home",
      contact_success: "Thank you! Your message has been sent.",
      phone: "Phone", // Nuevo
      objective: "Message Objective", // Nuevo (placeholder del select)
      objective_consultation: "Consultation", // Nueva opción
      objective_inquiry: "Inquiry", // Nueva opción
      objective_appointment: "Appointment" // Nueva opción
    },
  },
  es: {
    translation: {
      welcome: "Bienvenido a nuestro Bufete de Abogados",
      expert: "Expertos en derecho civil, penal y laboral. Estamos aquí para ayudarte.",
      about: "Sobre Mí",
      aboutText: "Soy un abogado con más de 10 años de experiencia en derecho civil y penal. Mi enfoque principal es brindar soluciones legales efectivas y personalizadas para cada cliente.",
      aboutText2: "Creo en la transparencia, la honestidad y el compromiso con mis clientes. Tu caso es mi prioridad.",
      services: "Servicios",
      civilLaw: "Derecho Civil",
      civilLaw_desc: "Asesoría y representación en disputas civiles y contratos.",
      criminalLaw: "Derecho Penal",
      criminalLaw_desc: "Defensa en casos penales con estrategias efectivas.",
      laborLaw: "Derecho Laboral",
      laborLaw_desc: "Apoyo en disputas laborales y derechos del trabajador.",
      blog: "Blog",
      blogText: "Artículos y noticias sobre el ámbito legal.",
      contact: "Contáctame",
      send: "Enviar ahora",
      copyright: "© 2025 Daguer Hernandez. Todos los derechos reservados.",
      social_media: "Redes Sociales", // Nuevo
      call_me: "Llámame", // Nuevo
      write_me: "Escríbeme", // Nuevo
      whatsapp_contact: "Contáctame por WhatsApp",
      schedule: "Lunes a Viernes: 8:00 a 18:00", // Nuevo, formato militar
      name: "Nombre",
      email: "Correo",
      message: "Mensaje",
      home: "Inicio",
      contact_success: "¡Gracias! Tu mensaje ha sido enviado.",
      phone: "Teléfono", // Nuevo
      objective: "Objetivo del Mensaje", // Nuevo (placeholder del select)
      objective_consultation: "Consulta", // Nueva opción
      objective_inquiry: "Pregunta", // Nueva opción
      objective_appointment: "Cita" // Nueva opción
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es', // Idioma por defecto
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;