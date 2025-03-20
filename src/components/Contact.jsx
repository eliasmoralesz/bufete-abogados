import React from 'react';
import { useTranslation } from 'react-i18next';
import './Contact.css';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section id="contact">
      <h2>{t('contact')}</h2>
      <form>
        <input type="text" placeholder={t('name')} />
        <input type="email" placeholder={t('email')} />
        <textarea placeholder={t('message')}></textarea>
        <button type="submit">{t('send')}</button>
      </form>
    </section>
  );
};

export default Contact;