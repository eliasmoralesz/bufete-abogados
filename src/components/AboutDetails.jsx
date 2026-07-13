import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; // Usaremos Link para la navegación
import { FaArrowLeft, FaGavel, FaBalanceScale, FaHandshake } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet-async';
import { SITE_URL, SITE_NAME, ogImageForLang } from '../seoConfig';

import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './AboutDetails.css';

// El cargo (role), la institución (org) se dejan siempre en español porque son
// nombres oficiales de instituciones/puestos públicos costarricenses — traducirlos
// correría el riesgo de tergiversar credenciales reales. Las fechas (period/periodEn)
// y las funciones (bullets, vía i18n.js) sí se traducen — son solo calendario/prosa,
// sin ese riesgo.
// Los 3 cargos más recientes/relevantes llevan detalle completo; los 3 más
// antiguos se muestran en una sola línea para no saturar la página.
const workExperience = [
  {
    role: 'Subdirector General',
    org: 'Dirección General de Migración y Extranjería',
    period: 'Mayo 2018 – Mayo 2022',
    periodEn: 'May 2018 – May 2022',
    bulletKeys: ['workExp1_bullet1', 'workExp1_bullet2', 'workExp1_bullet3', 'workExp1_bullet4', 'workExp1_bullet5'],
  },
  {
    role: 'Abogado Senior',
    org: 'Processus - CR',
    period: 'Febrero 2013 – Actualidad',
    periodEn: 'February 2013 – Present',
    bulletKeys: ['workExp2_bullet1', 'workExp2_bullet2', 'workExp2_bullet3', 'workExp2_bullet4'],
  },
  {
    role: 'Asesor del Concejo Municipal',
    org: 'Concejo Municipal de San José',
    period: 'Mayo 2016 – Abril 2018 / Enero 2024 – Abril 2024',
    periodEn: 'May 2016 – April 2018 / January 2024 – April 2024',
    bulletKeys: ['workExp3_bullet1', 'workExp3_bullet2', 'workExp3_bullet3', 'workExp3_bullet4'],
  },
];

const earlierExperience = [
  { role: 'Regidor Municipal', org: 'Concejo Municipal de San José', period: 'Mayo 2010 – Abril 2016', periodEn: 'May 2010 – April 2016' },
  { role: 'Asistente Legal', org: 'Oficina del Lic. Marco Castillo Rojas', period: 'Enero 2007 – Abril 2010', periodEn: 'January 2007 – April 2010' },
  { role: 'Asesor Legal Externo', org: 'FUPROVI', period: 'Enero 2007 – Diciembre 2009', periodEn: 'January 2007 – December 2009' },
];

// Título e institución se dejan en español (nombres oficiales de instituciones
// académicas costarricenses/internacionales), igual que en workExperience.
const education = [
  { degree: 'Maestría en Derecho Internacional de los Derechos Humanos', institution: 'University for Peace (UPEACE – Mandato de la ONU)', year: '2022 (en progreso)', yearEn: '2022 (in progress)' },
  { degree: 'Especialidad en Notariado', institution: 'Universidad Escuela Libre de Derecho', year: '2017' },
  { degree: 'Licenciatura en Derecho', institution: 'Universidad Escuela Libre de Derecho', year: '2013' },
  { degree: 'Pregrado en Economía', institution: 'Universidad de Costa Rica', year: '2004' },
];

const certifications = [
  { name: 'Gestión coordinada de las migraciones en las fronteras (Ed. 4)', institution: 'Banco Interamericano de Desarrollo', year: '2020' },
  { name: 'Política de Gobernanza de las Migraciones en América Latina y el Caribe', institution: 'Banco Interamericano de Desarrollo', year: '2020' },
];

const achievementKeys = ['achievement1', 'achievement2', 'achievement3', 'achievement4'];
const skillKeys = ['skill1', 'skill2', 'skill3', 'skill4', 'skill5', 'skill6'];

const AboutDetails = ({ lang = 'es' }) => {
  const { t, i18n } = useTranslation();
  const prefix = lang === 'en' ? '/en' : '';

  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
  }, [lang, i18n]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);
  }, []);

  const path = lang === 'en' ? '/en/about-details' : '/about-details';
  const canonicalUrl = `${SITE_URL}${path}`;
  const ogImage = ogImageForLang(lang);

  return (
    <>
      <Helmet>
        <title>{t('aboutMeta_title')}</title>
        <meta name="description" content={t('aboutMeta_description')} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="es" href={`${SITE_URL}/about-details`} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en/about-details`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/about-details`} />

        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={t('aboutMeta_title')} />
        <meta property="og:description" content={t('aboutMeta_description')} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('aboutMeta_title')} />
        <meta name="twitter:description" content={t('aboutMeta_description')} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <TopBar />
      <Header />

      <section className="about-details-section">
        <div className="about-details-container" data-aos="fade-up">
          <h1 className="about-details-title">{t('aboutDetailsTitle')}</h1>

          <div className="details-layout-grid">

            {/* --- COLUMNA DE CONTENIDO PRINCIPAL --- */}
            <div className="main-content-column">
              <div className="profile-section" data-aos="fade-up">
                <h3>{t('profile')}</h3>
                <p>{t('aboutDetails_profile_p1')}</p>
                <p>{t('aboutDetails_profile_p2')}</p>
              </div>

              <div className="profile-section" data-aos="fade-up">
                <h3>{t('experience')}</h3>
                {workExperience.map((job) => (
                  <div className="cv-entry" key={job.role + job.period}>
                    <div className="cv-row">
                      <span className="cv-label">{t('cv_position')}</span>
                      <span className="cv-value">{job.role}</span>
                    </div>
                    <div className="cv-row">
                      <span className="cv-label">{t('cv_period')}</span>
                      <span className="cv-value">{lang === 'en' ? job.periodEn : job.period}</span>
                    </div>
                    <div className="cv-row">
                      <span className="cv-label">{t('cv_institution')}</span>
                      <span className="cv-value">{job.org}</span>
                    </div>
                    <div className="cv-row">
                      <span className="cv-label">{t('cv_duties')}</span>
                      <span className="cv-value">
                        <ul>
                          {job.bulletKeys.map((key) => (
                            <li key={key}>{t(key)}</li>
                          ))}
                        </ul>
                      </span>
                    </div>
                  </div>
                ))}

                {earlierExperience.map((job) => (
                  <div className="cv-entry" key={job.role + job.period}>
                    <div className="cv-row">
                      <span className="cv-label">{t('cv_position')}</span>
                      <span className="cv-value">{job.role}</span>
                    </div>
                    <div className="cv-row">
                      <span className="cv-label">{t('cv_period')}</span>
                      <span className="cv-value">{lang === 'en' ? job.periodEn : job.period}</span>
                    </div>
                    <div className="cv-row">
                      <span className="cv-label">{t('cv_institution')}</span>
                      <span className="cv-value">{job.org}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="profile-section" data-aos="fade-up">
                <h3>{t('education')}</h3>
                {education.map((item) => (
                  <div className="cv-entry" key={item.degree}>
                    <div className="cv-row">
                      <span className="cv-label">{t('cv_degree')}</span>
                      <span className="cv-value">{item.degree}</span>
                    </div>
                    <div className="cv-row">
                      <span className="cv-label">{t('cv_institution')}</span>
                      <span className="cv-value">{item.institution}</span>
                    </div>
                    <div className="cv-row">
                      <span className="cv-label">{t('cv_year')}</span>
                      <span className="cv-value">{lang === 'en' && item.yearEn ? item.yearEn : item.year}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="profile-section" data-aos="fade-up">
                <h3>{t('certifications')}</h3>
                {certifications.map((item) => (
                  <div className="cv-entry" key={item.name}>
                    <div className="cv-row">
                      <span className="cv-label">{t('cv_certification')}</span>
                      <span className="cv-value">{item.name}</span>
                    </div>
                    <div className="cv-row">
                      <span className="cv-label">{t('cv_institution')}</span>
                      <span className="cv-value">{item.institution}</span>
                    </div>
                    <div className="cv-row">
                      <span className="cv-label">{t('cv_year')}</span>
                      <span className="cv-value">{item.year}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="profile-section" data-aos="fade-up">
                <h3>{t('achievements')}</h3>
                <ul className="simple-list">
                  {achievementKeys.map((key) => (
                    <li key={key}>{t(key)}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* --- COLUMNA DE BARRA LATERAL (SIDEBAR) --- */}
            <aside className="sidebar-column" data-aos="fade-left">
              <div className="sidebar-widget">
                <h4 className="widget-title">{t('barMembership')}</h4>
                <p>
                  {t('barMembership_org')}<br />
                  Carné № 23730
                </p>
              </div>

              <div className="sidebar-widget">
                <h4 className="widget-title">{t('skills')}</h4>
                <ul className="simple-list">
                  {skillKeys.map((key) => (
                    <li key={key}>{t(key)}</li>
                  ))}
                </ul>
              </div>

              <div className="sidebar-widget">
                <h4 className="widget-title">{t('practiceAreasTitle')}</h4>
                <ul className="widget-list">
                  <li><Link to={`${prefix}/#services`}><FaGavel /> {t('notarialLaw')}</Link></li>
                  <li><Link to={`${prefix}/#services`}><FaBalanceScale /> {t('registralLaw')}</Link></li>
                  <li><Link to={`${prefix}/#services`}><FaHandshake /> {t('migrationLaw')}</Link></li>
                </ul>
              </div>

              <div className="sidebar-widget">
                 <h4 className="widget-title">{t('contactInfoTitle')}</h4>
                 <p>
                   <strong>{t('email')}:</strong> consulta@daguerhernandez.com<br/>
                   <strong>{t('phone')}:</strong> +506 8965-5582
                 </p>
                 <Link to={`${prefix}/#contact`} className="widget-contact-button">{t('cta_button')}</Link>
              </div>
            </aside>

          </div>

          <div className="about-details-footer">
            <Link to={`${prefix}/#about`} className="back-button">
              <FaArrowLeft style={{ marginRight: '8px' }} />
              {t('backToAbout')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutDetails;
