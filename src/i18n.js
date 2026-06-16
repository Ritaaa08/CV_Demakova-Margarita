/* ============================================================
   i18n — FR / EN dictionary + applier
   Usage in HTML:
     <span data-i18n="nav.home"></span>          → textContent
     <p data-i18n-html="about.text"></p>         → innerHTML (allows <em>, <br>)
     <input data-i18n-attr="placeholder:form.ph.name">
   ============================================================ */

export const dict = {
  fr: {
    nav: { home: 'Accueil', cv: 'CV', projects: 'Projets', contact: 'Contact', game: 'Jeu' },

    hero: {
      kicker: 'Portfolio · Ingénierie des médias',
      hello: 'bonjour,<br>je suis',
      role: 'Étudiante en ingénierie des médias à la HEIG-VD. Je crée des expériences web entre design et développement.',
      ctaProjects: 'Voir mes projets',
      ctaContact: 'Me contacter',
      badge: 'Disponible pour un stage',
      scroll: 'défiler',
    },

    marquee: 'design · développement web · ux/ui · création · wordpress · ia générative · branding',

    about: {
      kicker: 'À propos',
      text: 'Attirée par les croisements entre <em>design, technologie et communication</em>, je conçois des expériences web claires, vivantes et centrées sur l\'humain.',
      stat1num: '04', stat1lbl: 'langues parlées',
      stat2num: '02', stat2lbl: 'stages professionnels',
      stat3num: '2028', stat3lbl: 'diplôme visé · HEIG-VD',
    },

    planet: {
      kicker: 'Compétences',
      title: 'ma galaxie de compétences',
      lead: 'Mes outils gravitent autour d\'un même monde : créer, du design au code. La planète tourne au fil du défilement.',
    },
    skills: { s1: 'HTML & CSS', s2: 'JavaScript', s3: 'WordPress & PHP', s4: 'Java', s5: 'Figma', s6: 'Suite Adobe', s7: 'SQL', s8: 'IA générative' },

    proj: {
      kicker: 'Projets',
      title: 'travaux sélectionnés',
      viewall: 'Tous les projets',
      lead: 'Une sélection de projets où design, code et curiosité se rencontrent. D\'autres arrivent bientôt.',
      others: 'À venir',
      gallery: 'Aperçus',
    },
    game: {
      kicker: 'Jeu · projet EPFL',
      title: 'myserdon',
      lead: "Un jeu d'aventure textuel, joué dans une console : tape des commandes pour explorer, parler et échanger. Un mini-jeu codé en Java, porté pour le web. (Jeu en anglais.)",
      note: "Tape 'help' pour la liste des commandes. Ex. : talk · move north · take Math_Book · give Travel_Pass · map",
      play: 'Jouer maintenant',
      tag: 'EPFL · Java',
      desc: "Jeu d'aventure textuel (RPG) jouable en ligne — explore, parle, échange et échappe-toi de Myserdon.",
    },
    thenox: {
      tag: 'HEIG-VD · 2025',
      desc: 'Marque horlogère cosmique : identité visuelle, site WordPress et contenus enrichis par l\'IA générative.',
      live: 'Voir le site',
      report: 'Rapport (PDF)',
    },
    soon: {
      badge: 'Bientôt',
      epflTitle: 'epfl — crypto & stégano',
      epflDesc: 'Cryptographie et stéganographie en Java. (Le mini-jeu RPG est jouable dans l\'onglet Jeu.)',
      hessoTitle: 'hes-so — design & simulation',
      hessoDesc: 'Maquettes de sites web (Figma) et mini-jeu de simulation (NetLogo).',
    },

    cv: {
      title: 'cv',
      lead: 'Mon parcours, mes compétences et mes certifications — en un coup d\'œil.',
      download: 'Télécharger le PDF',
      formation: 'Formation',
      experience: 'Expérience',
      skills: 'Compétences',
      languages: 'Langues',
      interests: 'Intérêts',
      certs: 'Certifications',
      tools: 'Outils & technologies',
      native: 'langue maternelle',
      fluent: 'C1 · courant',
      pro: 'B2 · opérationnel',
      inter: 'A2 · intermédiaire',
      nRu: 'Russe', nFr: 'Français', nEn: 'Anglais', nIt: 'Italien',
    },

    edu: {
      e1d: '2025 — présent', e1t: 'Bachelor en Ingénierie des médias', e1o: 'HEIG-VD, Yverdon-les-Bains',
      e2d: '08.2025', e2t: 'Stage — Institut d\'ingénierie des médias (MEI)', e2o: 'HEIG-VD', e2x: 'IA générative (textes & images), développement web, documentation de tests utilisateurs.',
      e3d: '2024 — 2025', e3t: 'Année préparatoire Future Ingénieure (APFI)', e3o: 'HES-SO',
      e4d: '2023 — 2024', e4t: 'Bachelor — Systèmes de communication', e4o: 'EPFL, Lausanne',
      e5d: '2020 — 2023', e5t: 'Maturité fédérale suisse · option physique', e5o: 'EPSU, Genève', e5x: 'Travail de maturité : les trous noirs.',
      e6d: '2017 — 2020', e6t: 'Formation artistique & design', e6o: 'Cours particuliers',
      e7d: '2008 — 2017', e7t: 'Gymnastique rythmique · haut niveau', e7o: 'Candidate maître des sports (2017)',
    },
    exp: {
      x1d: '02 — 06.2025', x1t: 'Stagiaire graphiste', x1o: 'Espace Graphic Sàrl', x1x: 'Relation client, prise de commande et production de A à Z ; création de sites web, d\'articles et de supports graphiques.',
      x2d: '06.2026 — présent', x2t: 'Bénévolat — Création de site web', x2o: 'FC Épalinges', x2x: 'Conception et réalisation du site du club sous WordPress.',
    },
    interest: { i1: 'Astrophysique', i2: 'Photographie', i3: 'Peinture', i4: 'Calligraphie', i5: 'Alpinisme', i6: 'Gymnastique rythmique' },
    certMeta: 'Database Structures and Management with MySQL',
    certMetaSub: 'Meta · Coursera · 2024',
    certBI: 'C# for .NET Developers',
    certBISub: 'Board Infinity · Coursera · 2024',

    contact: {
      title: 'contact',
      lead: 'Un projet, une opportunité de stage, ou juste envie d\'échanger ? Écris-moi.',
      email: 'Email', phone: 'Téléphone', location: 'Localisation', linkedin: 'LinkedIn',
      locValue: 'Lausanne, Suisse',
      formTitle: 'Envoyer un message',
      send: 'Envoyer le message',
      note: 'Ce bouton ouvre votre application de messagerie.',
    },
    form: { name: 'Nom', email: 'Email', message: 'Message', phName: 'Votre nom', phEmail: 'vous@exemple.com', phMsg: 'Bonjour Margarita, …' },

    footer: {
      cta: 'travaillons<br>ensemble',
      tagline: 'Conçu avec soin à Lausanne.',
      rights: '© 2026 Margarita Demakova',
    },
  },

  en: {
    nav: { home: 'Home', cv: 'Resume', projects: 'Projects', contact: 'Contact', game: 'Game' },

    hero: {
      kicker: 'Portfolio · Media Engineering',
      hello: 'hi,<br>i\'m',
      role: 'Media engineering student at HEIG-VD. I craft web experiences at the intersection of design and development.',
      ctaProjects: 'View my work',
      ctaContact: 'Get in touch',
      badge: 'Open to internships',
      scroll: 'scroll',
    },

    marquee: 'design · web development · ux/ui · creative · wordpress · generative ai · branding',

    about: {
      kicker: 'About',
      text: 'Drawn to the crossroads of <em>design, technology and communication</em>, I build web experiences that are clear, alive and human-centred.',
      stat1num: '04', stat1lbl: 'languages spoken',
      stat2num: '02', stat2lbl: 'professional internships',
      stat3num: '2028', stat3lbl: 'degree target · HEIG-VD',
    },

    planet: {
      kicker: 'Skills',
      title: 'my skills universe',
      lead: 'My tools orbit one same world: making things, from design to code. The planet spins as you scroll.',
    },
    skills: { s1: 'HTML & CSS', s2: 'JavaScript', s3: 'WordPress & PHP', s4: 'Java', s5: 'Figma', s6: 'Adobe Suite', s7: 'SQL', s8: 'Generative AI' },

    proj: {
      kicker: 'Projects',
      title: 'selected work',
      viewall: 'All projects',
      lead: 'A selection of projects where design, code and curiosity meet. More coming soon.',
      others: 'Coming up',
      gallery: 'Previews',
    },
    game: {
      kicker: 'Game · EPFL project',
      title: 'myserdon',
      lead: 'A text adventure played in a console: type commands to explore, talk and trade. A Java mini-game, ported to the web.',
      note: "Type 'help' for the command list. e.g. talk · move north · take Math_Book · give Travel_Pass · map",
      play: 'Play now',
      tag: 'EPFL · Java',
      desc: 'A text-adventure RPG you can play online — explore, talk, trade and escape Myserdon.',
    },
    thenox: {
      tag: 'HEIG-VD · 2025',
      desc: 'A cosmic watch brand: visual identity, WordPress site and content enriched with generative AI.',
      live: 'Visit site',
      report: 'Report (PDF)',
    },
    soon: {
      badge: 'Coming soon',
      epflTitle: 'epfl — crypto & stego',
      epflDesc: 'Cryptography and steganography in Java. (The RPG mini-game is playable in the Game tab.)',
      hessoTitle: 'hes-so — design & simulation',
      hessoDesc: 'Website mockups (Figma) and a simulation mini-game (NetLogo).',
    },

    cv: {
      title: 'resume',
      lead: 'My background, skills and certifications — at a glance.',
      download: 'Download PDF',
      formation: 'Education',
      experience: 'Experience',
      skills: 'Skills',
      languages: 'Languages',
      interests: 'Interests',
      certs: 'Certifications',
      tools: 'Tools & technologies',
      native: 'native language',
      fluent: 'C1 · fluent',
      pro: 'B2 · working',
      inter: 'A2 · intermediate',
      nRu: 'Russian', nFr: 'French', nEn: 'English', nIt: 'Italian',
    },

    edu: {
      e1d: '2025 — present', e1t: 'BSc in Media Engineering', e1o: 'HEIG-VD, Yverdon-les-Bains',
      e2d: '08.2025', e2t: 'Internship — Media Engineering Institute (MEI)', e2o: 'HEIG-VD', e2x: 'Generative AI (text & images), web development, user-test documentation.',
      e3d: '2024 — 2025', e3t: 'Future Engineer Preparatory Year (APFI)', e3o: 'HES-SO',
      e4d: '2023 — 2024', e4t: 'BSc — Communication Systems', e4o: 'EPFL, Lausanne',
      e5d: '2020 — 2023', e5t: 'Swiss Federal Maturity · physics option', e5o: 'EPSU, Geneva', e5x: 'Maturity thesis: black holes.',
      e6d: '2017 — 2020', e6t: 'Art & design training', e6o: 'Private tuition',
      e7d: '2008 — 2017', e7t: 'Rhythmic gymnastics · elite level', e7o: 'Master of Sport candidate (2017)',
    },
    exp: {
      x1d: '02 — 06.2025', x1t: 'Graphic design intern', x1o: 'Espace Graphic Sàrl', x1x: 'Client relations, order intake and end-to-end production; building websites, articles and graphic materials.',
      x2d: '06.2026 — present', x2t: 'Volunteer — Website creation', x2o: 'FC Épalinges', x2x: 'Designing and building the club\'s website on WordPress.',
    },
    interest: { i1: 'Astrophysics', i2: 'Photography', i3: 'Painting', i4: 'Calligraphy', i5: 'Mountaineering', i6: 'Rhythmic gymnastics' },
    certMeta: 'Database Structures and Management with MySQL',
    certMetaSub: 'Meta · Coursera · 2024',
    certBI: 'C# for .NET Developers',
    certBISub: 'Board Infinity · Coursera · 2024',

    contact: {
      title: 'contact',
      lead: 'A project, an internship opportunity, or just a chat? Drop me a line.',
      email: 'Email', phone: 'Phone', location: 'Location', linkedin: 'LinkedIn',
      locValue: 'Lausanne, Switzerland',
      formTitle: 'Send a message',
      send: 'Send message',
      note: 'This button opens your email app.',
    },
    form: { name: 'Name', email: 'Email', message: 'Message', phName: 'Your name', phEmail: 'you@example.com', phMsg: 'Hi Margarita, …' },

    footer: {
      cta: 'let\'s work<br>together',
      tagline: 'Crafted with care in Lausanne.',
      rights: '© 2026 Margarita Demakova',
    },
  },
};

function get(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

export function applyLang(lang) {
  const data = dict[lang] || dict.fr;
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const v = get(data, el.getAttribute('data-i18n'));
    if (v != null) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const v = get(data, el.getAttribute('data-i18n-html'));
    if (v != null) el.innerHTML = v;
  });
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.getAttribute('data-i18n-attr').split(';').forEach((pair) => {
      const [attr, key] = pair.split(':');
      const v = get(data, key && key.trim());
      if (v != null) el.setAttribute(attr.trim(), v);
    });
  });

  document.querySelectorAll('[data-lang-btn]').forEach((b) => {
    b.classList.toggle('active', b.getAttribute('data-lang-btn') === lang);
    b.setAttribute('aria-pressed', b.getAttribute('data-lang-btn') === lang);
  });
}

export function getLang() {
  return localStorage.getItem('lang') || (navigator.language || 'fr').slice(0, 2) === 'en' ? 'en' : 'fr';
}

export function initI18n() {
  let lang = localStorage.getItem('lang');
  if (lang !== 'fr' && lang !== 'en') lang = (navigator.language || 'fr').toLowerCase().startsWith('en') ? 'en' : 'fr';
  applyLang(lang);

  document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const l = btn.getAttribute('data-lang-btn');
      localStorage.setItem('lang', l);
      applyLang(l);
    });
  });
}
