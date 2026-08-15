import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaArrowLeft } from 'react-icons/fa';
import { SITE_URL, SITE_NAME } from '../seoConfig';

import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../pages/Blog.css';
import './CETC.css';

// Página dedicada a la Categoría Especial Temporal Complementaria (CETC).
// El contenido viene de un documento que el propio Lic. Daguer Hernández
// redactó para el sitio (no es una adaptación de la columna "Papeles en
// Regla" de Confidencial, por eso vive fuera de blogArticles.js — ese
// archivo es específicamente para esa columna). Daguer pidió explícitamente
// que no se cambiara ninguna palabra de su texto: el `body` de abajo es
// el documento completo, solo dividido en bloques (encabezados, párrafos,
// listas) para el layout — cero contenido nuevo, cero reescritura.
//
// Título/descripción/URL del <head> usan sus propias sugerencias de SEO
// (la sección "Para posicionamiento en Google" al final de su documento),
// distintas del título visible en la página (que es el título completo
// que él escribió al inicio del documento) — esa separación título
// visible / título SEO fue explícita en su documento, no una decisión
// nuestra.
const SEO_TITLE = 'Categoría Especial Temporal Complementaria en Costa Rica: requisitos 2026';
const SEO_DESCRIPTION = 'Conozca quiénes pueden solicitar la Categoría Especial Temporal Complementaria en Costa Rica, sus requisitos, documentos, beneficios y plazo.';
const PAGE_TITLE = 'Categoría Especial Temporal Complementaria en Costa Rica: requisitos y plazo para solicitarla';
const PAGE_PATH = '/categoria-especial-temporal-complementaria-costa-rica';

const body = [
  { type: 'p', text: 'La Dirección General de Migración y Extranjería creó la Categoría Especial Temporal Complementaria (CETC) mediante la Resolución N.° DG-0064-05-2026. Esta categoría ofrece una alternativa de regularización migratoria a determinadas personas de Nicaragua, Venezuela, Cuba y Colombia que solicitaron refugio en Costa Rica y cuyo procedimiento continúa pendiente o fue rechazado.' },
  { type: 'p', text: 'Las solicitudes podrán presentarse únicamente entre el 1.º de septiembre de 2026 y el 1.º de septiembre de 2027, mediante cita previa.' },

  { type: 'h2', text: '¿Quiénes pueden solicitar esta categoría?' },
  { type: 'p', text: 'La persona interesada debe cumplir, entre otras, las siguientes condiciones:' },
  { type: 'ul', items: [
    'Ser nacional de Nicaragua, Venezuela, Cuba o Colombia.',
    'Haber presentado una solicitud de reconocimiento de la condición de persona refugiada entre el 1.º de junio de 2014 y el 7 de mayo de 2026.',
    'Haber permanecido en Costa Rica desde la presentación de la solicitud de refugio hasta el momento de solicitar esta categoría.',
    'Tener una solicitud de refugio pendiente de resolución, rechazada o denegada.',
    'No contar con otra categoría migratoria aprobada ni mantener otro procedimiento de regularización migratoria.',
    'No reunir las condiciones para obtener alguna de las categorías ordinarias previstas en la legislación migratoria costarricense.',
  ] },
  { type: 'p', text: 'No es suficiente haber obtenido una cita para solicitar refugio: la persona debe haber presentado formalmente su solicitud dentro del periodo señalado.' },

  { type: 'h2', text: '¿Qué beneficios ofrece?' },
  { type: 'p', text: 'La aprobación de la Categoría Especial Temporal Complementaria permite:' },
  { type: 'ul', items: [
    'Obtener un Documento de Identidad Migratorio para Extranjeros (DIMEX).',
    'Permanecer regularmente en Costa Rica.',
    'Trabajar en cualquier actividad remunerada, tanto por cuenta propia como bajo una relación laboral.',
    'Salir de Costa Rica y volver a ingresar sin solicitar un permiso especial, siempre que se cumplan las condiciones migratorias ordinarias.',
    'Renovar la categoría por periodos sucesivos de dos años, sujeto al cumplimiento de los requisitos correspondientes.',
  ] },
  { type: 'p', text: 'La categoría se concede inicialmente por dos años y puede renovarse por periodos iguales.' },

  { type: 'h2', text: 'La solicitud es individual' },
  { type: 'p', text: 'Este beneficio no se extiende automáticamente a los familiares de la persona solicitante. Cada integrante de la familia debe:' },
  { type: 'ul', items: [
    'Cumplir individualmente los requisitos.',
    'Obtener su propia cita.',
    'Presentar una solicitud separada.',
    'Realizar los pagos que le correspondan.',
  ] },
  { type: 'p', text: 'Además, las personas que puedan regularizarse mediante un vínculo con una persona costarricense —por ejemplo, por tener hijos costarricenses— deberán analizar la categoría migratoria ordinaria aplicable, pues podrían no ser elegibles para la CETC.' },

  { type: 'h2', text: 'Documentos necesarios' },
  { type: 'p', text: 'La solicitud deberá presentarse completa. Entre los principales requisitos se encuentran los siguientes:' },

  { type: 'h3', text: '1. Formulario de filiación y desistimiento' },
  { type: 'p', text: 'Debe utilizarse el formulario específico establecido por Migración para esta categoría.' },
  { type: 'warning', text: 'NO SE PRESENTA NINGUN DESESTIMIENTO DE REFUGIO' },

  { type: 'h3', text: '2. Declaración jurada de nacimiento' },
  { type: 'p', text: 'Declaración jurada en el formulario autorizado, cuando resulte aplicable.' },
  { type: 'p', text: 'También puede aportarse alguna de estas opciones:' },
  { type: 'ul', items: [
    'Certificación emitida en el país de origen, debidamente apostillada o legalizada y autenticada.',
    'Certificación emitida por el consulado correspondiente en Costa Rica.',
  ] },

  { type: 'h3', text: '3. Certificación de antecedentes penales' },
  { type: 'p', text: 'Debe presentarse una certificación del país de origen o de los países donde la persona haya residido durante los últimos tres años.' },
  { type: 'p', text: 'Cuando el documento provenga del extranjero, deberá cumplir las formalidades de apostilla o legalización correspondientes. Si se aporta una certificación de un país distinto al de origen, también podría ser necesario demostrar que la persona residió legalmente en ese territorio.' },

  { type: 'h3', text: '4. Documento de identidad' },
  { type: 'p', text: 'Se puede aportar:' },
  { type: 'ul', items: [
    'Pasaporte.',
    'Cédula o documento de identidad del país de origen.',
    'Certificación consular que incluya fotografía.',
  ] },
  { type: 'p', text: 'El documento puede estar vencido, siempre que sea legible, se encuentre en buen estado y permita comprobar adecuadamente la identidad de su titular.' },

  { type: 'h3', text: '5. Comprobante de toma de huellas' },
  { type: 'p', text: 'Este requisito se pedirá para la documentación.' },
  { type: 'p', text: 'Sin embargo las personas mayores de 12 años deben ir gestionando el comprobante de toma de huellas emitido por el Ministerio de Seguridad Pública de Costa Rica, porque las citas están muy retrasadas.' },

  { type: 'h3', text: '6. Prueba de permanencia y arraigo en Costa Rica' },
  { type: 'p', text: 'La persona debe demostrar que ha permanecido en el país desde la presentación de su solicitud de refugio. Para ello puede aportar, por ejemplo:' },
  { type: 'ul', items: [
    'Constancias de inscripción en centros educativos.',
    'Documentos que acrediten la matrícula de sus hijos en centros educativos costarricenses, acompañados de la certificación de nacimiento que demuestre el vínculo.',
    'Comprobantes de atención médica en establecimientos de la Caja Costarricense de Seguro Social.',
    'Documentos emitidos por instituciones públicas costarricenses.',
    'Otras pruebas que Migración considere idóneas para acreditar la permanencia en el país.',
  ] },
  { type: 'p', text: 'Si alguno de estos documentos ya se encuentra incorporado en el expediente de refugio, deberá indicarse al presentar la solicitud.' },

  { type: 'h2', text: '¿Qué sucede si faltan documentos?' },
  { type: 'warning', text: 'Si está incompleta, SE RECHAZA.' },
  { type: 'p', text: 'Por esta razón, no es recomendable acudir a la cita sin haber revisado previamente la vigencia, apostilla, legalización y contenido de cada documento.' },

  { type: 'h2', text: '¿Cómo se solicita la cita?' },
  { type: 'p', text: 'Las solicitudes se recibirán solamente mediante cita previa POR MEDIO del centro de llamadas 1311.' },
  { type: 'p', text: 'Cada persona, incluyendo las personas menores de edad, requiere una cita individual.' },
  { type: 'p', text: 'Las citas y solicitudes corresponden al periodo comprendido entre el 1.º de septiembre de 2026 y el 1.º de septiembre de 2027. Se recomienda consultar periódicamente los canales oficiales de Migración para confirmar la fecha de habilitación de las citas y el lugar de presentación.' },

  { type: 'h2', text: '¿Qué ocurre después de la aprobación?' },
  { type: 'p', text: 'Una vez notificada la resolución favorable, la persona dispone de 90 días para completar el proceso de documentación. Si no lo hace dentro de ese plazo, la categoría puede cancelarse automáticamente.' },
  { type: 'p', text: 'Para obtener el DIMEX deberá presentar, entre otros documentos:' },
  { type: 'ul', items: [
    'La resolución que aprueba la Categoría Especial Temporal Complementaria.',
    'Comprobante vigente de aseguramiento ante la Caja Costarricense de Seguro Social.',
    'Comprobante de pago del costo del documento migratorio. La información oficial publicada actualmente señala un monto de US$138, pagadero en la cuenta indicada por Migración y a nombre de la persona beneficiaria.',
  ] },
  { type: 'p', text: 'Los montos, cuentas bancarias y requisitos de pago deben confirmarse nuevamente antes de efectuar cualquier depósito.' },

  { type: 'h2', text: '¿Cuándo puede denegarse o cancelarse?' },
  { type: 'p', text: 'La categoría no se otorgará, o posteriormente podrá cancelarse, cuando la persona:' },
  { type: 'ul', items: [
    'Haya cumplido una condena por un delito doloso durante los últimos diez años, en Costa Rica o en el extranjero, según las condiciones establecidas en la resolución.',
    'Sea considerada una amenaza para la seguridad o el orden público.',
    'Presente información o documentación falsa.',
    'Deje de cumplir las condiciones que justificaron el otorgamiento de la categoría.',
  ] },
  { type: 'p', text: 'Asimismo, al solicitar la renovación, Migración verificará los movimientos migratorios. Los ingresos o salidas realizados por puestos no habilitados pueden impedir la renovación, salvo que la persona aporte pruebas que justifiquen debidamente la situación y estas sean aceptadas por la autoridad migratoria.' },

  { type: 'h2', text: 'Una decisión que debe analizarse individualmente' },
  { type: 'p', text: 'La Categoría Especial Temporal Complementaria representa una oportunidad importante de regularización, pero no necesariamente es la opción más conveniente para todas las personas.' },
  { type: 'p', text: 'Quienes tengan una solicitud de refugio pendiente deben considerar que el formulario contempla el desistimiento de ese procedimiento. También debe analizarse si existe la posibilidad de solicitar residencia por vínculo con una persona costarricense, por matrimonio, por razones laborales o mediante alguna otra categoría ordinaria.' },
  { type: 'p', text: 'Antes de presentar la solicitud, resulta conveniente revisar el expediente de refugio, los movimientos migratorios, los antecedentes personales y la documentación disponible. Una valoración jurídica individual puede prevenir el rechazo de la solicitud o la renuncia innecesaria a otra alternativa migratoria.' },

  { type: 'h2', text: 'Asesoría para solicitar la Categoría Especial Temporal Complementaria' },
  { type: 'p', text: 'En nuestra oficina podemos analizar si usted cumple los requisitos, revisar su expediente y ayudarle a preparar correctamente la documentación necesaria para presentar su solicitud, o inclusive llevarle el trámite completo ante la DGME, solicite una cita al teléfono 8965-5582.' },
  { type: 'p', text: 'Debido a que las solicitudes se recibirán durante un periodo limitado y deben presentarse completas, recomendamos iniciar con anticipación la obtención de certificaciones, antecedentes penales, apostillas y pruebas de permanencia en Costa Rica.' },
];

const DISCLAIMER = 'La información contenida en esta publicación es de carácter general y no sustituye el análisis jurídico de cada caso particular.';

const CETC = () => {
  useEffect(() => {
    document.documentElement.lang = 'es';
    window.scrollTo(0, 0);
  }, []);

  const canonicalUrl = `${SITE_URL}${PAGE_PATH}`;

  return (
    <>
      <Helmet>
        <title>{`${SEO_TITLE} | ${SITE_NAME}`}</title>
        <meta name="description" content={SEO_DESCRIPTION} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={SEO_TITLE} />
        <meta property="og:description" content={SEO_DESCRIPTION} />
        <meta property="og:url" content={canonicalUrl} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={SEO_TITLE} />
        <meta name="twitter:description" content={SEO_DESCRIPTION} />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: PAGE_TITLE,
            description: SEO_DESCRIPTION,
            inLanguage: 'es',
            mainEntityOfPage: canonicalUrl,
            author: {
              '@type': 'Person',
              name: 'Daguer Hernández',
              url: `${SITE_URL}/about-details`,
            },
            publisher: {
              '@type': 'Organization',
              name: SITE_NAME,
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/DH-favicon.png`,
              },
            },
          })}
        </script>
      </Helmet>

      <TopBar />
      <Header forceScrolled />

      <main id="main-content" tabIndex={-1} className="blog-article-section">
        <div className="blog-article-container" data-aos="fade-up">
          <Link to="/blog" className="blog-back-link">
            <FaArrowLeft aria-hidden="true" /> Volver a artículos
          </Link>

          <h1 className="blog-article-title">{PAGE_TITLE}</h1>
          <p className="blog-article-dek">{SEO_DESCRIPTION}</p>

          <div className="blog-article-body cetc-body">
            {body.map((block, index) => {
              if (block.type === 'h2') return <h2 key={index}>{block.text}</h2>;
              if (block.type === 'h3') return <h3 key={index}>{block.text}</h3>;
              if (block.type === 'warning') return <p key={index} className="cetc-warning">{block.text}</p>;
              if (block.type === 'ul') {
                return (
                  <ul key={index}>
                    {block.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={index}>{block.text}</p>;
            })}
          </div>

          <p className="blog-article-source cetc-disclaimer">{DISCLAIMER}</p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CETC;
