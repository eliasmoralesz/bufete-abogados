import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './DiagnosticQuiz.css';

// "Diagnóstico" — sección nueva del rediseño editorial (wireframe E). Es solo
// enrutamiento de UX (3 preguntas → WhatsApp / agendar / correo, todos canales
// reales ya usados en el resto del sitio) — no genera ningún resultado legal
// personalizado ni requisitos por rama, para no inventar asesoría legal específica.
const TOTAL_STEPS = 3;

const DiagnosticQuiz = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});

  const selectAnswer = (questionKey, value) => {
    setAnswers((prev) => ({ ...prev, [questionKey]: value }));
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    }
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));
  const restart = () => {
    setAnswers({});
    setStep(1);
  };

  const whatsappHref = 'https://wa.me/50689655582?text=Hola%20Daguer,%20quiero%20agendar%20una%20consulta';

  const q1Options = ['opt1', 'opt2', 'opt3', 'opt4'];
  const q2Options = ['opt1', 'opt2', 'opt3', 'opt4'];

  return (
    <section id="diagnostico" className="quiz-section">
      <div className="quiz-header" data-aos="fade-up">
        <span className="quiz-eyebrow">{t('sectionEyebrow_diagnostic')}</span>
        <h2>{t('quiz_title')}</h2>
        <p>{t('quiz_intro')}</p>
        <p className="quiz-credential">{t('quiz_credential_line')}</p>
      </div>

      <div className="quiz-card" data-aos="fade-up" data-aos-delay="100">
        <div className="quiz-card-top">
          <div className="quiz-progress">
            <span className="quiz-progress-label">{t('quiz_step_of', { step })}</span>
            <div className="quiz-progress-bars">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <span key={i} className={`quiz-progress-bar ${i < step ? 'filled' : ''}`} />
              ))}
            </div>
          </div>
          <span className="quiz-time">{t('quiz_time_estimate')}</span>
        </div>

        <div className="quiz-card-body">
          {step === 1 && (
            <>
              <h3>{t('quiz_q1_title')}</h3>
              <div className="quiz-options">
                {q1Options.map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    className={`quiz-option ${answers.q1 === opt ? 'selected' : ''}`}
                    onClick={() => selectAnswer('q1', opt)}
                  >
                    <span>{t(`quiz_q1_${opt}`)}</span>
                    <span className="quiz-option-arrow" aria-hidden="true">→</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3>{t('quiz_q2_title')}</h3>
              <div className="quiz-options">
                {q2Options.map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    className={`quiz-option ${answers.q2 === opt ? 'selected' : ''}`}
                    onClick={() => selectAnswer('q2', opt)}
                  >
                    <span>{t(`quiz_q2_${opt}`)}</span>
                    <span className="quiz-option-arrow" aria-hidden="true">→</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3>{t('quiz_q3_title')}</h3>
              <div className="quiz-final-actions">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quiz-final-btn"
                  onClick={() => setAnswers((prev) => ({ ...prev, q3: 'whatsapp' }))}
                >
                  {t('quiz_q3_whatsapp')}
                </a>
                <a
                  href="#appointment"
                  className="quiz-final-btn quiz-final-btn-primary"
                  onClick={() => setAnswers((prev) => ({ ...prev, q3: 'appointment' }))}
                >
                  {t('quiz_q3_appointment')}
                </a>
                <a
                  href="mailto:consulta@daguerhernandez.com"
                  className="quiz-final-btn"
                  onClick={() => setAnswers((prev) => ({ ...prev, q3: 'email' }))}
                >
                  {t('quiz_q3_email')}
                </a>
              </div>
              <button type="button" className="quiz-restart" onClick={restart}>
                {t('quiz_restart')}
              </button>
            </>
          )}
        </div>

        <div className="quiz-card-bottom">
          <span className="quiz-direct-label">{t('quiz_direct_label')}</span>
          <div className="quiz-direct-actions">
            {step > 1 && (
              <button type="button" className="quiz-back-btn" onClick={goBack}>
                {t('quiz_back')}
              </button>
            )}
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="quiz-direct-btn">
              WhatsApp
            </a>
            <a href="#appointment" className="quiz-direct-btn quiz-direct-btn-primary">
              {t('quiz_q3_appointment')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiagnosticQuiz;
