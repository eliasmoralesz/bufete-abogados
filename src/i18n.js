import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Traducciones
const resources = {
  en: {
    translation: {
      hero_title: "Immigration Attorney in Costa Rica",
      hero_subtitle: "Over 10 years of experience. Former Deputy Director of Migration and Notarial Law Specialist.",
      hero_tagline: "Secure process, clear guidance, real results.",
      hero_aboutTitle: "A NEW BREED OF LEGAL SUPPORT",
      hero_aboutSubtitle: "Aiming to provide high quality legal consultancy, support and results for your legal issues.",
      hero_aboutDescription: "Using his expertise and experience, {{name}} documents and builds cases to obtain the results clients aim to achieve in their specific legal situation. Known for doing what he says, he aims to bring favorable results as soon as possible.",
      about: "About Me",
      aboutText: "I am a lawyer with over 10 years of experience in civil and criminal law. My main focus is to provide effective and personalized legal solutions for each client.",
      aboutText2: "I believe in transparency, honesty, and commitment to my clients. Your case is my priority.",
      moreAbout: "More About Daguer Hernandez",
      aboutDetailsTitle: "More About Me",
      aboutDetailsText: "With over a decade of experience in civil, criminal, and immigration law, I have served as the Deputy Director of Migration and specialized in Notarial Law. My mission is to deliver clear, effective, and personalized legal solutions to every client, ensuring their needs are met with the highest standards of professionalism.",
      introduction: "Introduction", // Nueva clave
      experience: "Experience", // Nueva clave
      experienceText: "Throughout my career, I have handled a wide range of legal cases, from civil disputes to complex immigration matters. As the former Deputy Director of Migration, I gained deep insights into regulatory frameworks and developed strategies to ensure favorable outcomes for my clients.", // Nueva clave
      experienceHighlight1: "Over 10 years of legal practice in civil, criminal, and immigration law.", // Nueva clave
      experienceHighlight2: "Served as Deputy Director of Migration from 2020 to 2022.", // Nueva clave
      experienceHighlight3: "Specialized in Notarial Law, ensuring precise and secure legal documentation.", // Nueva clave
      commitment: "My Commitment", // Nueva clave
      commitmentText: "I am dedicated to providing transparent, honest, and client-focused legal services. Every case is treated with the utmost priority, ensuring that my clients feel supported and informed throughout the entire process.", // Nueva clave
      services: "Services",
      civilLaw: "Civil Law",
      civilLaw_desc: "Legal advice and representation in civil disputes and contracts.",
      criminalLaw: "Criminal Law",
      criminalLaw_desc: "Defense in criminal cases with effective strategies.",
      laborLaw: "Labor Law",
      laborLaw_desc: "Support in employment disputes and labor rights.",
      blog: "Blog",
      blogText: "Articles and news about the legal field.",
      cta_heading: "Your case deserves personalized attention",
      cta_text: "With over 10 years of experience in civil, criminal, and labor law, let's schedule a meeting and talk.",
      cta_button: "Book your appointment now",
      contact: "Contact Me",
      send: "Send now",
      copyright: "© 2025 Daguer Hernandez. All rights reserved.",
      social_media: "Social Media",
      call_me: "Call Me",
      write_me: "Write Me",
      whatsapp_contact: "Contact me on WhatsApp",
      schedule: "Monday to Friday: 8:00 to 18:00",
      name: "Name",
      email: "Email",
      message: "Message",
      home: "Home",
      contact_success: "Thank you! Your message has been sent.",
      phone: "Phone",
      objective: "Message Objective",
      objective_consultation: "Consultation",
      objective_inquiry: "Inquiry",
      objective_appointment: "Appointment",
      appointment_title: "Schedule a Consultation", // <-- AÑADIR
      appointment_subtitle: "Choose a date and time that works for you. Payment will be processed securely via PayPal.", // <-- AÑADIR
      backToAbout: "Back to About",

    },
  },
  es: {
    translation: {
      hero_title: "Abogado Migratorio en Costa Rica",
      hero_subtitle: "Más de 10 años de experiencia. Exsubdirector de Migración y especialista en Derecho Notarial.",
      hero_tagline: "Trámite seguro, asesoría clara, resultados reales.",
      hero_aboutTitle: "UNA NUEVA FORMA DE ASESORÍA LEGAL",
      hero_aboutSubtitle: "Comprometidos con brindar consultoría jurídica de alta calidad, respaldo y resultados efectivos para sus necesidades legales.",
      hero_aboutDescription: "Gracias a su experiencia, {{name}} documenta y construye los casos para alcanzar los resultados que cada cliente espera en su situación particular. Reconocido por cumplir lo que promete, se enfoca en lograr soluciones favorables en el menor tiempo posible.",
      about: "Sobre Mí",
      aboutText: "Soy un abogado con más de 10 años de experiencia en derecho civil y penal. Mi enfoque principal es brindar soluciones legales efectivas y personalizadas para cada cliente.",
      aboutText2: "Creo en la transparencia, la honestidad y el compromiso con mis clientes. Tu caso es mi prioridad.",
      moreAbout: "Más Sobre Daguer Hernandez",
      aboutDetailsTitle: "Más Sobre Mí",
      aboutDetailsText: "Con más de una década de experiencia en derecho civil, penal y migratorio, he sido Subdirector de Migración y me especializo en Derecho Notarial. Mi misión es ofrecer soluciones legales claras, efectivas y personalizadas para cada cliente, asegurando que sus necesidades se cumplan con los más altos estándares de profesionalismo.",
      introduction: "Introducción", // Nueva clave
      experience: "Experiencia", // Nueva clave
      experienceText: "A lo largo de mi carrera, he manejado una amplia gama de casos legales, desde disputas civiles hasta asuntos migratorios complejos. Como exsubdirector de Migración, obtuve un profundo conocimiento de los marcos regulatorios y desarrollé estrategias para garantizar resultados favorables para mis clientes.", // Nueva clave
      experienceHighlight1: "Más de 10 años de práctica legal en derecho civil, penal y migratorio.", // Nueva clave
      experienceHighlight2: "Subdirector de Migración de 2020 a 2022.", // Nueva clave
      experienceHighlight3: "Especializado en Derecho Notarial, asegurando documentación legal precisa y segura.", // Nueva clave
      commitment: "Mi Compromiso", // Nueva clave
      commitmentText: "Estoy dedicado a proporcionar servicios legales transparentes, honestos y centrados en el cliente. Cada caso es tratado con la máxima prioridad, asegurando que mis clientes se sientan apoyados e informados durante todo el proceso.", // Nueva clave
      services: "Servicios",
      civilLaw: "Derecho Civil",
      civilLaw_desc: "Asesoría y representación en disputas civiles y contratos.",
      criminalLaw: "Derecho Penal",
      criminalLaw_desc: "Defensa en casos penales con estrategias efectivas.",
      laborLaw: "Derecho Laboral",
      laborLaw_desc: "Apoyo en disputas laborales y derechos del trabajador.",
      blog: "Blog",
      blogText: "Artículos y noticias sobre el ámbito legal.",
      cta_heading: "Tu caso merece atención personalizada",
      cta_text: "Cuento con más de 10 años de experiencia en derecho civil, penal y laboral. Agenda una cita y conversemos.",
      cta_button: "Agenda tu cita ahora",
      contact: "Contáctame",
      send: "Enviar ahora",
      copyright: "© 2025 Daguer Hernandez. Todos los derechos reservados.",
      social_media: "Redes Sociales",
      call_me: "Llámame",
      write_me: "Escríbeme",
      whatsapp_contact: "Contáctame por WhatsApp",
      schedule: "Lunes a Viernes: 8:00 a 18:00",
      name: "Nombre",
      email: "Correo",
      message: "Mensaje",
      home: "Inicio",
      contact_success: "¡Gracias! Tu mensaje ha sido enviado.",
      phone: "Teléfono",
      objective: "Objetivo del Mensaje",
      objective_consultation: "Consulta",
      objective_inquiry: "Pregunta",
      objective_appointment: "Cita",
      appointment_title: "Agende su Consulta", // <-- AÑADIR
      appointment_subtitle: "Elija la fecha y hora que mejor le convenga. El pago se procesará de forma segura a través de PayPal.", // <-- AÑADIR
      backToAbout: "Volver a Inicio",
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