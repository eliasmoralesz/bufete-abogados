import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, ValidationError } from '@formspree/react';
import './Contact.css';

const Contact = () => {
  const { t } = useTranslation();
  const [state, handleSubmit] = useForm("xldjjjrg"); // Reemplaza con tu ID de Formspree

  if (state.succeeded) {
    return (
      <section id="contact">
        <h2>{t('contact')}</h2>
        <p>{t('contact_success')}</p>
      </section>
    );
  }

  return (
    <section id="contact">
      <h2>{t('contact')}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder={t('name')}
          required
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
        <input
          type="email"
          name="email"
          placeholder={t('email')}
          required
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <input
          type="tel"
          name="phone" // Nombre para Formspree
          placeholder={t('phone')} // Nueva clave de traducción
          required
        />
        <ValidationError prefix="Phone" field="phone" errors={state.errors} />
        <select
          name="objective" // Nombre para Formspree
          required
        >
          <option value="" disabled selected>{t('objective')}</option> {/* Placeholder */}
          <option value="consultation">{t('objective_consultation')}</option>
          <option value="inquiry">{t('objective_inquiry')}</option>
          <option value="appointment">{t('objective_appointment')}</option>
        </select>
        <ValidationError prefix="Objective" field="objective" errors={state.errors} />
        <textarea
          name="message"
          placeholder={t('message')}
          required
        ></textarea>
        <ValidationError prefix="Message" field="message" errors={state.errors} />
        <button type="submit" disabled={state.submitting}>
          {t('send')}
        </button>
      </form>
    </section>
  );
};

export default Contact;