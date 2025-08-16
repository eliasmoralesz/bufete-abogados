import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, ValidationError } from '@formspree/react';
import './Contact.css';

const Contact = () => {
  const { t } = useTranslation();
  const [state, handleSubmit] = useForm("xldjjjrg");

  if (state.succeeded) {
    return (
      <section id="contact">
        <h2 data-aos="fade-up">{t('contact')}</h2>
        <p data-aos="fade-up" data-aos-delay="100">{t('contact_success')}</p>
      </section>
    );
  }

  return (
    <section id="contact">
      <h2 data-aos="fade-up">{t('contact')}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder={t('name')}
          required
          data-aos="fade-up"
          data-aos-delay="100"
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />

        <input
          type="email"
          name="email"
          placeholder={t('email')}
          required
          data-aos="fade-up"
          data-aos-delay="200"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />

        <input
          type="tel"
          name="phone"
          placeholder={t('phone')}
          required
          data-aos="fade-up"
          data-aos-delay="300"
        />
        <ValidationError prefix="Phone" field="phone" errors={state.errors} />

        <select
          name="objective"
          defaultValue=""
          required
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <option value="" disabled>{t('objective')}</option>

          <option value="consultation">{t('objective_consultation')}</option>
          <option value="inquiry">{t('objective_inquiry')}</option>
          <option value="appointment">{t('objective_appointment')}</option>
        </select>
        <ValidationError prefix="Objective" field="objective" errors={state.errors} />

        <textarea
          name="message"
          placeholder={t('message')}
          required
          data-aos="fade-up"
          data-aos-delay="500"
        ></textarea>
        <ValidationError prefix="Message" field="message" errors={state.errors} />

        <button
          type="submit"
          disabled={state.submitting}
          data-aos="fade-up"
          data-aos-delay="500"
        >
          {t('send')}
        </button>
      </form>
    </section>
  );
};

export default Contact;
