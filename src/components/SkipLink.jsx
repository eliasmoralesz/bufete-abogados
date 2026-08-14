import React from 'react';
import { useTranslation } from 'react-i18next';
import './SkipLink.css';

// Permite a usuarios de teclado saltar TopBar + Header (nav repetida en cada página)
// e ir directo a #main-content. Invisible hasta recibir foco (patrón estándar WCAG 2.4.1),
// por lo que no afecta el diseño para el resto de usuarios.
const SkipLink = () => {
  const { t } = useTranslation();

  return (
    <a href="#main-content" className="skip-link">
      {t('skipToContent')}
    </a>
  );
};

export default SkipLink;
