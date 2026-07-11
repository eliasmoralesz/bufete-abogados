import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './MigrationIntent.css';

const items = [
  { key: 'residency', terms: ['temporary', 'permanent', 'family'], tone: 'gold' },
  { key: 'naturalization', terms: ['citizenship', 'requirements', 'evidence'], tone: 'blue' },
  { key: 'refuge', terms: ['protection', 'regularization', 'humanitarian'], tone: 'green' },
  { key: 'dimex', terms: ['renewal', 'category', 'appointments'], tone: 'slate' },
  { key: 'permits', terms: ['work', 'special', 'status'], tone: 'copper' },
  { key: 'return', terms: ['review', 'stability', 'planning'], tone: 'violet' },
];

const MigrationIntent = () => {
  const { t } = useTranslation();
  const [activeKey, setActiveKey] = useState(items[0].key);
  const activeItem = items.find((item) => item.key === activeKey) || items[0];

  const selectMobileItem = (key) => {
    setActiveKey(key);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document
          .getElementById(`migration-mobile-trigger-${key}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  };

  const renderPanelContent = (item) => (
    <>
      <span className="migration-intent-panel-kicker">
        {t(`migrationIntent_${item.key}_kicker`)}
      </span>
      <h3>{t(`migrationIntent_${item.key}_title`)}</h3>
      <p>{t(`migrationIntent_${item.key}_text`)}</p>

      <div className="migration-intent-terms" aria-label={t('migrationIntent_termsLabel')}>
        {item.terms.map((term) => (
          <span key={term}>{t(`migrationIntent_${item.key}_${term}`)}</span>
        ))}
      </div>

      <a
        href="#appointment"
        className="migration-intent-cta"
      >
        {t('migrationIntent_cta')}
      </a>
    </>
  );

  return (
    <section id="migration-guidance" className="migration-intent-section">
      <div className="migration-intent-shell">
        <div className="migration-intent-header" data-aos="fade-up">
          <span className="migration-intent-eyebrow">{t('migrationIntent_eyebrow')}</span>
          <h2>{t('migrationIntent_title')}</h2>
          <p>{t('migrationIntent_intro')}</p>
        </div>

        <div className="migration-intent-tabs" data-aos="fade-up" data-aos-delay="100">
          <div
            className="migration-intent-tablist"
            role="tablist"
            aria-label={t('migrationIntent_listLabel')}
          >
            {items.map((item) => (
              <button
                type="button"
                role="tab"
                id={`migration-desktop-tab-${item.key}`}
                className={`migration-intent-tab ${activeKey === item.key ? 'active' : ''}`}
                key={item.key}
                aria-selected={activeKey === item.key}
                aria-controls={`migration-desktop-panel-${item.key}`}
                onClick={() => setActiveKey(item.key)}
              >
                {t(`migrationIntent_${item.key}_tab`)}
              </button>
            ))}
          </div>

          <article
            className="migration-intent-panel"
            id={`migration-desktop-panel-${activeItem.key}`}
            role="tabpanel"
            aria-labelledby={`migration-desktop-tab-${activeItem.key}`}
            data-tone={activeItem.tone}
          >
            {renderPanelContent(activeItem)}
          </article>
        </div>

        <div className="migration-intent-mobile" data-aos="fade-up" data-aos-delay="100">
          {items.map((item) => {
            const isOpen = activeKey === item.key;

            return (
              <div className="migration-intent-accordion-item" key={item.key}>
                <button
                  type="button"
                  id={`migration-mobile-trigger-${item.key}`}
                  className={`migration-intent-accordion-button ${isOpen ? 'active' : ''}`}
                  aria-expanded={isOpen}
                  aria-controls={`migration-mobile-panel-${item.key}`}
                  onClick={() => selectMobileItem(item.key)}
                >
                  <span>{t(`migrationIntent_${item.key}_tab`)}</span>
                  <span className="migration-intent-accordion-icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <article
                    className="migration-intent-panel migration-intent-mobile-panel"
                    id={`migration-mobile-panel-${item.key}`}
                    aria-labelledby={`migration-mobile-trigger-${item.key}`}
                    data-tone={item.tone}
                  >
                    {renderPanelContent(item)}
                  </article>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MigrationIntent;
