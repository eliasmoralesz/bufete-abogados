// Contenido de las páginas-guía de trámites migratorios (CETC, Residencia,
// Naturalización, Refugio). El texto en español de cada una es el que el
// Lic. Daguer Hernández redactó él mismo (documentos "Categoría Especial
// Temporal Complementaria en Costa Rica" y "TEMAS MIG PAGINA") — se
// preserva su redacción tal cual, solo dividida en bloques (encabezados,
// párrafos, listas) para el layout. La única normalización aplicada es
// tipográfica, no de contenido: minúsculas donde había mayúsculas sueltas
// a media frase (ej. "Antecedente Penal Apostillado" → "antecedente penal
// apostillado" dentro de una lista), dejando intactas las mayúsculas que sí
// parecen énfasis deliberado (como en la CETC).
//
// El inglés de las cuatro es traducción autorizada — cuidada para preservar
// cada dato legal exacto (montos, plazos, nombres de categorías, número de
// decreto/reglamento) — no reemplaza una revisión de Daguer.
//
// No vive en blogArticles.js porque ese archivo es específicamente para
// adaptaciones de la columna "Papeles en Regla" de Confidencial — este
// contenido es original del sitio, no de esa columna.

export const GUIDE_PATHS = {
  cetc: {
    es: '/categoria-especial-temporal-complementaria-costa-rica',
    en: '/en/complementary-special-temporary-category-costa-rica',
  },
  residency: {
    es: '/residencia-costa-rica',
    en: '/en/residency-costa-rica',
  },
  naturalization: {
    es: '/naturalizacion-costa-rica',
    en: '/en/naturalization-costa-rica',
  },
  refuge: {
    es: '/refugio-costa-rica',
    en: '/en/refugee-status-costa-rica',
  },
};

export const guideContent = {
  cetc: {
    es: {
      seoTitle: 'Categoría Especial Temporal Complementaria en Costa Rica: requisitos 2026',
      seoDescription: 'Conozca quiénes pueden solicitar la Categoría Especial Temporal Complementaria en Costa Rica, sus requisitos, documentos, beneficios y plazo.',
      pageTitle: 'Categoría Especial Temporal Complementaria en Costa Rica: requisitos y plazo para solicitarla',
      backLabel: 'Volver al inicio',
      ctaTitle: '¿Quiere que revisemos su caso?',
      ctaText: 'Agende una consulta para saber si califica para la Categoría Especial Temporal Complementaria y qué documentos necesita.',
      ctaButton: 'Agendar consulta',
      disclaimer: 'La información contenida en esta publicación es de carácter general y no sustituye el análisis jurídico de cada caso particular.',
      body: [
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
      ],
    },
    en: {
      seoTitle: 'Complementary Special Temporary Category in Costa Rica: 2026 Requirements',
      seoDescription: 'Find out who can apply for the Complementary Special Temporary Category in Costa Rica, its requirements, documents, benefits, and deadline.',
      pageTitle: 'Complementary Special Temporary Category in Costa Rica: Requirements and Deadline to Apply',
      backLabel: 'Back to home',
      ctaTitle: 'Want us to review your case?',
      ctaText: 'Schedule a consultation to find out if you qualify for the Complementary Special Temporary Category and what documents you need.',
      ctaButton: 'Schedule a consultation',
      disclaimer: 'The information contained in this publication is general in nature and does not replace individual legal analysis of each specific case.',
      body: [
        { type: 'p', text: 'The General Directorate of Migration and Immigration created the Complementary Special Temporary Category (CETC) through Resolution No. DG-0064-05-2026. This category offers an immigration regularization alternative for certain nationals of Nicaragua, Venezuela, Cuba, and Colombia who applied for refugee status in Costa Rica and whose proceedings remain pending or were denied.' },
        { type: 'p', text: 'Applications may be filed only between September 1, 2026 and September 1, 2027, by prior appointment.' },

        { type: 'h2', text: 'Who can apply for this category?' },
        { type: 'p', text: 'The interested person must meet, among others, the following conditions:' },
        { type: 'ul', items: [
          'Be a national of Nicaragua, Venezuela, Cuba, or Colombia.',
          'Have filed an application for recognition of refugee status between June 1, 2014 and May 7, 2026.',
          'Have remained in Costa Rica from the filing of the refugee application until the time of applying for this category.',
          'Have a refugee application that is pending resolution, rejected, or denied.',
          'Not hold another approved immigration category or have another regularization procedure underway.',
          'Not meet the conditions to obtain any of the ordinary categories provided for under Costa Rican immigration law.',
        ] },
        { type: 'p', text: 'Having obtained an appointment to apply for refugee status is not enough: the person must have formally filed the application within the stated period.' },

        { type: 'h2', text: 'What benefits does it offer?' },
        { type: 'p', text: 'Approval of the Complementary Special Temporary Category allows the person to:' },
        { type: 'ul', items: [
          'Obtain a DIMEX (Immigration Identity Document for Foreigners).',
          'Remain regularly in Costa Rica.',
          'Work in any paid activity, whether self-employed or under an employment relationship.',
          'Leave Costa Rica and re-enter without applying for a special permit, provided the ordinary immigration conditions are met.',
          'Renew the category for successive two-year periods, subject to meeting the corresponding requirements.',
        ] },
        { type: 'p', text: 'The category is granted initially for two years and can be renewed for equal periods.' },

        { type: 'h2', text: 'The application is individual' },
        { type: 'p', text: "This benefit does not automatically extend to the applicant's family members. Each family member must:" },
        { type: 'ul', items: [
          'Individually meet the requirements.',
          'Obtain their own appointment.',
          'File a separate application.',
          'Make the payments that apply to them.',
        ] },
        { type: 'p', text: "In addition, people who may be able to regularize their status through a connection with a Costa Rican national — for example, by having Costa Rican children — should review the applicable ordinary immigration category, as they may not be eligible for the CETC." },

        { type: 'h2', text: 'Required documents' },
        { type: 'p', text: 'The application must be filed complete. The main requirements include the following:' },

        { type: 'h3', text: '1. Affiliation and withdrawal form' },
        { type: 'p', text: 'The specific form established by Immigration for this category must be used.' },
        { type: 'warning', text: 'NO REFUGEE STATUS WITHDRAWAL IS FILED' },

        { type: 'h3', text: '2. Sworn birth statement' },
        { type: 'p', text: 'A sworn statement using the authorized form, when applicable.' },
        { type: 'p', text: 'Any of these options may also be submitted:' },
        { type: 'ul', items: [
          'A certification issued in the country of origin, duly apostilled or legalized and authenticated.',
          'A certification issued by the corresponding consulate in Costa Rica.',
        ] },

        { type: 'h3', text: '3. Criminal record certification' },
        { type: 'p', text: 'A certification from the country of origin or from the countries where the person has resided during the last three years must be submitted.' },
        { type: 'p', text: 'When the document comes from abroad, it must meet the applicable apostille or legalization formalities. If a certification from a country other than the country of origin is submitted, it may also be necessary to show that the person resided legally in that territory.' },

        { type: 'h3', text: '4. Identity document' },
        { type: 'p', text: 'The following may be submitted:' },
        { type: 'ul', items: [
          'Passport.',
          'National ID card or identity document from the country of origin.',
          'Consular certification that includes a photograph.',
        ] },
        { type: 'p', text: 'The document may be expired, provided it is legible, in good condition, and adequately proves the identity of its holder.' },

        { type: 'h3', text: '5. Proof of fingerprinting' },
        { type: 'p', text: 'This requirement will be requested for the file.' },
        { type: 'p', text: "However, people over 12 years old should go ahead and arrange the fingerprinting certificate issued by Costa Rica's Ministry of Public Security, because appointments for it are running very far behind." },

        { type: 'h3', text: '6. Proof of stay and ties to Costa Rica' },
        { type: 'p', text: 'The person must show that they have remained in the country since filing their refugee application. For this, they may submit, for example:' },
        { type: 'ul', items: [
          'Proof of enrollment at educational institutions.',
          "Documents proving their children's enrollment at Costa Rican schools, together with the birth certification showing the relationship.",
          'Proof of medical care received at Costa Rican Social Security Fund (Caja Costarricense de Seguro Social) facilities.',
          'Documents issued by Costa Rican public institutions.',
          "Other evidence Immigration considers suitable to prove the person's stay in the country.",
        ] },
        { type: 'p', text: 'If any of these documents is already included in the refugee file, this should be indicated when filing the application.' },

        { type: 'h2', text: 'What happens if documents are missing?' },
        { type: 'warning', text: 'If the application is incomplete, IT WILL BE REJECTED.' },
        { type: 'p', text: 'For this reason, it is not advisable to go to the appointment without having first checked the validity, apostille, legalization, and content of each document.' },

        { type: 'h2', text: 'How is the appointment requested?' },
        { type: 'p', text: 'Applications will be received only by prior appointment through the 1311 call center.' },
        { type: 'p', text: 'Each person, including minors, requires an individual appointment.' },
        { type: 'p', text: "Appointments and applications correspond to the period between September 1, 2026 and September 1, 2027. It is recommended to periodically check Immigration's official channels to confirm the date appointments open and the filing location." },

        { type: 'h2', text: 'What happens after approval?' },
        { type: 'p', text: 'Once the favorable resolution is notified, the person has 90 days to complete the documentation process. If they do not do so within that period, the category may be cancelled automatically.' },
        { type: 'p', text: 'To obtain the DIMEX, the following documents must be submitted, among others:' },
        { type: 'ul', items: [
          'The resolution approving the Complementary Special Temporary Category.',
          'Current proof of enrollment with the Costa Rican Social Security Fund (Caja Costarricense de Seguro Social).',
          'Proof of payment of the cost of the immigration document. The officially published information currently indicates an amount of US$138, payable to the account indicated by Immigration and in the name of the beneficiary.',
        ] },
        { type: 'p', text: 'Amounts, bank accounts, and payment requirements must be confirmed again before making any deposit.' },

        { type: 'h2', text: 'When can it be denied or cancelled?' },
        { type: 'p', text: 'The category will not be granted, or may later be cancelled, when the person:' },
        { type: 'ul', items: [
          'Has served a sentence for an intentional (willful) crime during the last ten years, in Costa Rica or abroad, under the conditions established in the resolution.',
          'Is considered a threat to security or public order.',
          'Submits false information or documentation.',
          'Stops meeting the conditions that justified granting the category.',
        ] },
        { type: 'p', text: 'Likewise, when requesting renewal, Immigration will verify immigration movements. Entries or exits made through unauthorized checkpoints may prevent renewal, unless the person provides evidence that duly justifies the situation and this evidence is accepted by the immigration authority.' },

        { type: 'h2', text: 'A decision that must be reviewed individually' },
        { type: 'p', text: 'The Complementary Special Temporary Category represents an important regularization opportunity, but it is not necessarily the most convenient option for everyone.' },
        { type: 'p', text: 'Anyone with a pending refugee application should consider that the form includes withdrawing that proceeding. It should also be reviewed whether there is a possibility of applying for residency through a connection with a Costa Rican national, through marriage, for employment reasons, or through some other ordinary category.' },
        { type: 'p', text: 'Before filing the application, it is advisable to review the refugee file, immigration movements, personal background, and available documentation. An individual legal assessment can prevent the application from being rejected or an unnecessary waiver of another immigration alternative.' },

        { type: 'h2', text: 'Advice on applying for the Complementary Special Temporary Category' },
        { type: 'p', text: 'At our office we can review whether you meet the requirements, review your file, and help you properly prepare the documentation needed to file your application — or even handle the entire process before the DGME for you. Request an appointment at 8965-5582.' },
        { type: 'p', text: 'Because applications will be received during a limited period and must be filed complete, we recommend starting early to obtain certifications, criminal records, apostilles, and proof of stay in Costa Rica.' },
      ],
    },
  },

  residency: {
    es: {
      seoTitle: 'Residencia en Costa Rica: requisitos y categorías 2026',
      seoDescription: 'Requisitos y categorías de residencia en Costa Rica: por vínculo con hijo costarricense, tres años de residencia temporal, matrimonio, rentista y pensionado.',
      pageTitle: 'Residencia en Costa Rica: requisitos y categorías',
      backLabel: 'Volver al inicio',
      ctaTitle: '¿Quiere que revisemos su caso?',
      ctaText: 'Agende una consulta para saber qué categoría de residencia le corresponde y qué documentos necesita.',
      ctaButton: 'Agendar consulta',
      disclaimer: 'La información contenida en esta publicación es de carácter general y no sustituye el análisis jurídico de cada caso particular.',
      body: [
        { type: 'h2', text: 'Requisitos comunes a todos los trámites ordinarios' },
        { type: 'ul', items: [
          'Pasaporte vigente.',
          'Estar en tiempo de turismo (permanencia legal).',
          'Antecedente penal apostillado vigente conforme lo que indica el documento desde su fecha de emisión.',
          'Certificado de nacimiento apostillado.',
          'Pago de 200 dólares.',
          'Pago de 50 dólares.',
        ] },

        { type: 'h3', text: 'Residencia permanente por vínculo con hijo costarricense' },
        { type: 'p', text: 'Se reconoce cuando una persona tiene un vínculo con hijo costarricense, en el caso de que sea menor de edad tiene la posibilidad de ser exonerado de la permanencia legal.' },

        { type: 'h3', text: 'Residencia permanente por tres años de residencia temporal' },
        { type: 'p', text: 'Se reconoce cuándo se han cumplido tres años exactos desde la emisión del DIMEX de residencia temporal.' },

        { type: 'h3', text: 'Residencia temporal por matrimonio' },
        { type: 'p', text: 'Es cuando una persona está casada por vínculo matrimonial con costarricense, también se reconoce en unión de hecho. Debe de aportarse el certificado de matrimonio apostillado o el certificado de matrimonio expedido por el registro civil.' },

        { type: 'h3', text: 'Residencia temporal por rentista' },
        { type: 'p', text: 'La persona que recibe al menos 2500 dólares mensuales por el plazo de dos años por concepto de renta. Se entiende por esta renta el dinero que se obtiene de rendimientos mensuales sin que medie trabajo, sino por ahorros u otros dividendos.' },

        { type: 'h3', text: 'Residencia temporal por pensionado' },
        { type: 'p', text: 'La persona que recibe al menos 1000 dólares mensuales por pensión de jubilación. Debe de comprobarse por medio de un documento emitido por la autoridad del país o agencia de seguridad social que emite la pensión.' },
      ],
    },
    en: {
      seoTitle: 'Residency in Costa Rica: Requirements and Categories 2026',
      seoDescription: "Requirements and categories for residency in Costa Rica: through a Costa Rican child, three years of temporary residency, marriage, rentier income, and pension.",
      pageTitle: 'Residency in Costa Rica: Requirements and Categories',
      backLabel: 'Back to home',
      ctaTitle: 'Want us to review your case?',
      ctaText: 'Schedule a consultation to find out which residency category applies to you and what documents you need.',
      ctaButton: 'Schedule a consultation',
      disclaimer: 'The information contained in this publication is general in nature and does not replace individual legal analysis of each specific case.',
      body: [
        { type: 'h2', text: 'Requirements common to all ordinary procedures' },
        { type: 'ul', items: [
          'Valid passport.',
          'Being within the authorized tourist stay period (legal stay).',
          'A valid apostilled criminal record certificate, valid for the period stated on the document itself, counted from its issue date.',
          'Apostilled birth certificate.',
          'Payment of $200.',
          'Payment of $50.',
        ] },

        { type: 'h3', text: 'Permanent residency through a Costa Rican child' },
        { type: 'p', text: 'This is recognized when a person has a Costa Rican child; if the child is a minor, the applicant may also be exempted from the legal-stay requirement.' },

        { type: 'h3', text: 'Permanent residency through three years of temporary residency' },
        { type: 'p', text: 'This is recognized once exactly three years have passed since the temporary-residency DIMEX was issued.' },

        { type: 'h3', text: 'Temporary residency through marriage' },
        { type: 'p', text: 'This applies when a person is married to a Costa Rican national; it is also recognized for de facto unions (unión de hecho). An apostilled marriage certificate, or a marriage certificate issued by the Civil Registry, must be provided.' },

        { type: 'h3', text: 'Temporary residency as a rentier (rentista)' },
        { type: 'p', text: 'For a person who receives at least $2,500 per month for a two-year period from rental-type income. This income is understood as money obtained from monthly returns not involving work, but rather from savings or other dividends.' },

        { type: 'h3', text: 'Temporary residency as a pensioner (pensionado)' },
        { type: 'p', text: "For a person who receives at least $1,000 per month in retirement pension income. This must be proven through a document issued by the country's authority or the social security agency that pays the pension." },
      ],
    },
  },

  naturalization: {
    es: {
      seoTitle: 'Naturalización en Costa Rica: requisitos y categorías 2026',
      seoDescription: 'Requisitos para la naturalización en Costa Rica: por residencia de 5 años, por residencia de 20 años y por matrimonio con costarricense.',
      pageTitle: 'Naturalización en Costa Rica: requisitos y categorías',
      backLabel: 'Volver al inicio',
      ctaTitle: '¿Quiere que revisemos su caso?',
      ctaText: 'Agende una consulta para saber qué ruta de naturalización le corresponde y qué documentos necesita.',
      ctaButton: 'Agendar consulta',
      disclaimer: 'La información contenida en esta publicación es de carácter general y no sustituye el análisis jurídico de cada caso particular.',
      body: [
        { type: 'h2', text: 'Requisitos comunes a todos los trámites ordinarios' },
        { type: 'ul', items: [
          'Antecedente penal apostillado con no menos de tres meses de emisión.',
          'Certificado de nacimiento apostillado con no menos de tres meses de emisión.',
          'Una fotografía.',
        ] },

        { type: 'h3', text: 'Naturalización por residencia de 5 años' },
        { type: 'p', text: 'Requisito es tener 5 años con documento migratorio vigente desde que se emitió la resolución migratoria.' },
        { type: 'p', text: 'Debe de hacer pruebas de español e historia y valores de Costa Rica.' },

        { type: 'h3', text: 'Naturalización por residencia de 20 años' },
        { type: 'p', text: 'Requisito es tener 20 años de vivir dentro de Costa Rica, demostrables por todos los medios oficiales que puedan mostrarse.' },
        { type: 'p', text: 'Debe de hacer pruebas de español e historia y valores de Costa Rica.' },

        { type: 'h3', text: 'Naturalización por matrimonio' },
        { type: 'p', text: 'Estar casado por el plazo de dos años y vivir por el mismo tiempo en Costa Rica.' },
        { type: 'p', text: 'No requiere hacer pruebas de español e historia y valores de Costa Rica.' },
      ],
    },
    en: {
      seoTitle: 'Naturalization in Costa Rica: Requirements and Categories 2026',
      seoDescription: 'Requirements for naturalization in Costa Rica: through 5 years of residency, through 20 years of residency, and through marriage to a Costa Rican national.',
      pageTitle: 'Naturalization in Costa Rica: Requirements and Categories',
      backLabel: 'Back to home',
      ctaTitle: 'Want us to review your case?',
      ctaText: 'Schedule a consultation to find out which naturalization route applies to you and what documents you need.',
      ctaButton: 'Schedule a consultation',
      disclaimer: 'The information contained in this publication is general in nature and does not replace individual legal analysis of each specific case.',
      body: [
        { type: 'h2', text: 'Requirements common to all ordinary procedures' },
        { type: 'ul', items: [
          'Apostilled criminal record certificate, issued no more than three months ago.',
          'Apostilled birth certificate, issued no more than three months ago.',
          'One photograph.',
        ] },

        { type: 'h3', text: 'Naturalization through 5 years of residency' },
        { type: 'p', text: 'The requirement is 5 years with a valid immigration document, counted from the date the immigration resolution was issued.' },
        { type: 'p', text: "Spanish-language and Costa Rican history-and-values exams are required." },

        { type: 'h3', text: 'Naturalization through 20 years of residency' },
        { type: 'p', text: 'The requirement is 20 years living in Costa Rica, provable through any official means available.' },
        { type: 'p', text: "Spanish-language and Costa Rican history-and-values exams are required." },

        { type: 'h3', text: 'Naturalization through marriage' },
        { type: 'p', text: 'Being married for a two-year period and living in Costa Rica for that same period.' },
        { type: 'p', text: 'Spanish-language and Costa Rican history-and-values exams are not required.' },
      ],
    },
  },

  refuge: {
    es: {
      seoTitle: 'Refugio en Costa Rica: definición legal y cómo solicitarlo',
      seoDescription: 'Qué es la condición de refugio en Costa Rica según el Reglamento de Refugio (Decreto Ejecutivo N.º 36831-G) y cómo solicitar la cita.',
      pageTitle: 'Refugio en Costa Rica: qué es y cómo solicitarlo',
      backLabel: 'Volver al inicio',
      ctaTitle: '¿Quiere que revisemos su caso?',
      ctaText: 'Agende una consulta para revisar su situación y los pasos a seguir.',
      ctaButton: 'Agendar consulta',
      disclaimer: 'La información contenida en esta publicación es de carácter general y no sustituye el análisis jurídico de cada caso particular.',
      body: [
        { type: 'p', text: 'Conforme al artículo 4 del Reglamento de Refugio, Decreto Ejecutivo Nº 36831-G, es una Categoría de Protección Internacional que se define como:' },
        { type: 'quote', text: '"Toda persona extranjera a quien la Comisión de Visa Restringidas y Refugio le reconoce tal condición, debido a fundados temores de ser perseguida por motivos de raza, religión, nacionalidad, género, pertenencia a un determinado grupo social, u opiniones políticas, que se encuentre fuera del país de su nacionalidad o de residencia y no pueda o, a causa de dichos temores, no quiera acogerse a la protección de tal país. Al carecer de nacionalidad y por hallarse fuera del país donde antes tenía su residencia habitual, no pueda o por causa de dichos temores, no quiera regresar a él".' },

        { type: 'h2', text: '¿Cómo se solicita la cita?' },
        { type: 'p', text: 'La cita de solicitud se hace por medio del 1311.' },
      ],
    },
    en: {
      seoTitle: 'Refugee Status in Costa Rica: Legal Definition and How to Apply',
      seoDescription: 'What refugee status means in Costa Rica under the Refugee Regulations (Executive Decree No. 36831-G) and how to request an appointment.',
      pageTitle: 'Refugee Status in Costa Rica: What It Is and How to Apply',
      backLabel: 'Back to home',
      ctaTitle: 'Want us to review your case?',
      ctaText: 'Schedule a consultation to review your situation and the steps to take.',
      ctaButton: 'Schedule a consultation',
      disclaimer: 'The information contained in this publication is general in nature and does not replace individual legal analysis of each specific case.',
      body: [
        { type: 'p', text: 'Under article 4 of the Refugee Regulations, Executive Decree No. 36831-G, it is an International Protection Category defined as (unofficial translation):' },
        { type: 'quote', text: '"Any foreign national recognized as such by the Restricted Visa and Refugee Commission, owing to well-founded fear of being persecuted for reasons of race, religion, nationality, gender, membership of a particular social group, or political opinion, who is outside the country of their nationality or residence and is unable, or owing to such fear, unwilling to avail themselves of the protection of that country. Being stateless and outside the country where they formerly had their habitual residence, they are unable, or owing to such fear, unwilling to return to it."' },

        { type: 'h2', text: 'How is the appointment requested?' },
        { type: 'p', text: 'The appointment to apply is requested through 1311.' },
      ],
    },
  },
};
