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
        <div className="contact-shell contact-shell-success">
          <div className="contact-copy" data-aos="fade-up">
            <span className="contact-eyebrow">{t('contact_kicker')}</span>
            <h2>{t('contact_heading')}</h2>
            <p>{t('contact_success')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact">
      <div className="contact-shell">
        <div className="contact-copy" data-aos="fade-up">
          <span className="contact-eyebrow">{t('contact_kicker')}</span>
          <h2>{t('contact_heading')}</h2>
          <p>{t('contact_intro')}</p>

          <div className="contact-highlights">
            <div className="contact-highlight">
              <span>{t('contact_response_label')}</span>
              <p>{t('contact_response_text')}</p>
            </div>
            <div className="contact-highlight">
              <span>{t('contact_focus_label')}</span>
              <p>{t('contact_focus_text')}</p>
            </div>
          </div>
        </div>

        <form className="contact-form-card" onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="120">
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
            name="phone"
            placeholder={t('phone')}
            required
          />
          <ValidationError prefix="Phone" field="phone" errors={state.errors} />

          <select
            name="objective"
            defaultValue=""
            required
          >
            <option value="" disabled>{t('objective')}</option>
            <option value="immigration">{t('objective_immigration')}</option>
            <option value="residency-naturalization">{t('objective_residency')}</option>
            <option value="notarial">{t('objective_notarial')}</option>
            <option value="registry">{t('objective_registry')}</option>
            <option value="civil">{t('objective_civil')}</option>
            <option value="criminal-labor">{t('objective_criminal_labor')}</option>
            <option value="not-sure">{t('objective_not_sure')}</option>
          </select>
          <ValidationError prefix="Objective" field="objective" errors={state.errors} />

          <textarea
            name="message"
            placeholder={t('message')}
            required
          ></textarea>
          <ValidationError prefix="Message" field="message" errors={state.errors} />

          <button
            type="submit"
            disabled={state.submitting}
          >
            {t('send')}
          </button>
          <p className="contact-form-note">{t('contact_form_note')}</p>
        </form>
      </div>
    </section>
  );
};

export default Contact;
