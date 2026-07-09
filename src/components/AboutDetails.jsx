import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; // Usaremos Link para la navegación
import { FaArrowLeft, FaGavel, FaBalanceScale, FaHandshake } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet-async';
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '../seoConfig';

import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './AboutDetails.css';

// Contenido tomado del CV real del abogado (2024). Se deja en español porque
// traducir cargos y títulos administrativos costarricenses corre el riesgo de
// tergiversar credenciales reales.
// Los 3 cargos más recientes/relevantes llevan detalle completo; los 3 más
// antiguos se muestran en una sola línea para no saturar la página.
const workExperience = [
  {
    role: 'Subdirector General',
    org: 'Dirección General de Migración y Extranjería',
    period: 'Mayo 2018 – Mayo 2022',
    bullets: [
      'Política, gestión, ayuda y control migratorio en Costa Rica.',
      'Colaboración con el control migratorio de ingreso y egreso del territorio nacional.',
      'Formulación de planes, programas y proyectos presupuestarios para el ejercicio de sus atribuciones.',
      'Definición y ejecución de proyectos de integración financiados por el Fondo Especial de Migración y el Fondo Social Migratorio.',
      'Promoción de la integración de las personas migrantes en la sociedad costarricense.',
    ],
  },
  {
    role: 'Abogado Senior',
    org: 'Processus - CR',
    period: 'Febrero 2013 – Actualidad',
    bullets: [
      'Atención de asuntos civiles, comerciales, administrativos y contencioso-administrativos.',
      'Explicación de leyes complejas y documentos legales a los clientes.',
      'Representación jurídica integral de los clientes en juicio.',
      'Ejecución de asuntos notariales: certificaciones, traspasos, matrimonios y sucesorios.',
    ],
  },
  {
    role: 'Asesor del Concejo Municipal',
    org: 'Concejo Municipal de San José',
    period: 'Mayo 2016 – Abril 2018 / Enero 2024 – Abril 2024',
    bullets: [
      'Asesoría a los regidores sobre los temas presentados para votación en el Concejo Municipal.',
      'Redacción de mociones y análisis de reglamentos municipales.',
      'Asesoría sobre temas legales vinculados al presupuesto municipal.',
      'Elaboración de denuncias ante las instancias correspondientes por violación de derechos.',
    ],
  },
];

const earlierExperience = [
  { role: 'Regidor Municipal', org: 'Concejo Municipal de San José', period: 'Mayo 2010 – Abril 2016' },
  { role: 'Asistente Legal', org: 'Oficina del Lic. Marco Castillo Rojas', period: 'Enero 2007 – Abril 2010' },
  { role: 'Asesor Legal Externo', org: 'FUPROVI', period: 'Enero 2007 – Diciembre 2009' },
];

const education = [
  { degree: 'Maestría en Derecho Internacional de los Derechos Humanos', institution: 'University for Peace (UPEACE – Mandato de la ONU)', year: '2022 (en progreso)' },
  { degree: 'Especialidad en Notariado', institution: 'Universidad Escuela Libre de Derecho', year: '2017' },
  { degree: 'Licenciatura en Derecho', institution: 'Universidad Escuela Libre de Derecho', year: '2013' },
  { degree: 'Pregrado en Economía', institution: 'Universidad de Costa Rica', year: '2004' },
];

const certifications = [
  { name: 'Gestión coordinada de las migraciones en las fronteras (Ed. 4)', institution: 'Banco Interamericano de Desarrollo', year: '2020' },
  { name: 'Política de Gobernanza de las Migraciones en América Latina y el Caribe', institution: 'Banco Interamericano de Desarrollo', year: '2020' },
];

const achievements = [
  'Gestión y coordinación con agencias de Naciones Unidas (OIM, ACNUR y UNICEF) para el cumplimiento de los Objetivos de Desarrollo Sostenible, el Pacto Mundial para las Migraciones y el Pacto Mundial sobre los Refugiados.',
  'Enfoque social y humano del derecho, orientado a poblaciones vulnerables.',
  'Gestión legal, política y de control migratorio en Costa Rica.',
  'Colaboración en la redacción de proyectos de ley e investigaciones jurídicas.',
];

const skills = [
  'Desarrollo jurídico',
  'Responsabilidad civil',
  'Gestión de poblaciones vulnerables',
  'Gestión y control de riesgos',
  'Administración pública',
  'Inglés B2',
];

const AboutDetails = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Más sobre Daguer Hernández | Experiencia y Compromiso</title>
        <meta name="description" content="Conozca la trayectoria de Daguer Hernández, ex-Subdirector de Migración y especialista en Derecho Notarial con más de 12 años de experiencia." />
        <link rel="canonical" href={`${SITE_URL}/about-details`} />

        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content="Más sobre Daguer Hernández | Experiencia y Compromiso" />
        <meta property="og:description" content="Conozca la trayectoria de Daguer Hernández, ex-Subdirector de Migración y especialista en Derecho Notarial con más de 12 años de experiencia." />
        <meta property="og:url" content={`${SITE_URL}/about-details`} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Más sobre Daguer Hernández" />
        <meta name="twitter:description" content="Conozca la trayectoria de Daguer Hernández, ex-Subdirector de Migración y especialista en Derecho Notarial." />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
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
                <p>
                  Soy un profesional con más de 12 años de experiencia en la administración pública, habiendo
                  ejercido cargos de liderazgo en instituciones públicas y de elección popular, manteniendo un
                  vínculo permanente con organizaciones de la sociedad civil para atender las necesidades de la
                  población migrante y refugiada de Costa Rica.
                </p>
                <p>
                  Cuento con la capacidad de desempeñarme en todas las ramas del Derecho, presentando y
                  contribuyendo con soluciones pacíficas, eficaces y justas a los conflictos de la sociedad
                  costarricense, con una visión clara de la realidad nacional e internacional y una misión humanista.
                </p>
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
                      <span className="cv-value">{job.period}</span>
                    </div>
                    <div className="cv-row">
                      <span className="cv-label">{t('cv_institution')}</span>
                      <span className="cv-value">{job.org}</span>
                    </div>
                    <div className="cv-row">
                      <span className="cv-label">{t('cv_duties')}</span>
                      <span className="cv-value">
                        <ul>
                          {job.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
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
                      <span className="cv-value">{job.period}</span>
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
                      <span className="cv-value">{item.year}</span>
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
                  {achievements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* --- COLUMNA DE BARRA LATERAL (SIDEBAR) --- */}
            <aside className="sidebar-column" data-aos="fade-left">
              <div className="sidebar-widget">
                <h4 className="widget-title">{t('barMembership')}</h4>
                <p>
                  Colegio de Abogados de Costa Rica<br />
                  Carné № 23730
                </p>
              </div>

              <div className="sidebar-widget">
                <h4 className="widget-title">{t('skills')}</h4>
                <ul className="simple-list">
                  {skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>

              <div className="sidebar-widget">
                <h4 className="widget-title">{t('practiceAreasTitle')}</h4>
                <ul className="widget-list">
                  <li><Link to="/#services"><FaGavel /> {t('notarialLaw')}</Link></li>
                  <li><Link to="/#services"><FaBalanceScale /> {t('registralLaw')}</Link></li>
                  <li><Link to="/#services"><FaHandshake /> {t('migrationLaw')}</Link></li>
                </ul>
              </div>

              <div className="sidebar-widget">
                 <h4 className="widget-title">{t('contactInfoTitle')}</h4>
                 <p>
                   <strong>Email:</strong> consulta@daguerhernandez.com<br/>
                   <strong>Teléfono:</strong> +506 8703-3868
                 </p>
                 <Link to="/#contact" className="widget-contact-button">{t('cta_button')}</Link>
              </div>
            </aside>

          </div>

          <div className="about-details-footer">
            <Link to="/#about" className="back-button">
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
