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
      services: "Our Services",
      civilLaw: "Civil Law",
      criminalLaw: "Criminal Law",
      laborLaw: "Labor Law",
      blog: "Blog",
      blogText: "Articles and news about the legal field.",
      contact: "Contact",
      send: "Send",
      copyright: "© 2023 Law Firm. All rights reserved.",
      name: "Name",
      email: "Email",
      message: "Message",
      home: "Home", // Agregado
    },
  },
  es: {
    translation: {
      welcome: "Bienvenido a nuestro Bufete de Abogados",
      expert: "Expertos en derecho civil, penal y laboral. Estamos aquí para ayudarte.",
      about: "Sobre Mí",
      aboutText: "Soy un abogado con más de 10 años de experiencia en derecho civil y penal. Mi enfoque principal es brindar soluciones legales efectivas y personalizadas para cada cliente.",
      aboutText2: "Creo en la transparencia, la honestidad y el compromiso con mis clientes. Tu caso es mi prioridad.",
      services: "Nuestros Servicios",
      civilLaw: "Derecho Civil",
      criminalLaw: "Derecho Penal",
      laborLaw: "Derecho Laboral",
      blog: "Blog",
      blogText: "Artículos y noticias sobre el ámbito legal.",
      contact: "Contacto",
      send: "Enviar",
      copyright: "© 2023 Bufete de Abogados. Todos los derechos reservados.",
      name: "Nombre",
      email: "Correo",
      message: "Mensaje",
      home: "Inicio", // Agregado
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