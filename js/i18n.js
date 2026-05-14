const translations = {
    de: {
        // Nav
        'nav.home':    'Home',
        'nav.about':   'About',
        'nav.contact': 'Kontakt',

        // Mobile menu
        'mobile.about':   'About',
        'mobile.contact': 'Kontakt',

        // Brand axis
        'brand.security_eyebrow': 'Art of',
        'brand.security_title':   'Exploitation',
        'brand.security_tagline': 'Schwachstellenforschung, CTF-Write-ups und offensive Sicherheit aus dem Untergrund.',
        'brand.music_eyebrow': 'Pulse of',
        'brand.music_title':   'Music',
        'brand.music_tagline': 'Beats, Sound-Design und strukturierte Produktionen aus dem Untergrund.',

        // Shared CTAs
        'shared.explore':       'Erkunden →',
        'shared.back':          '← Zurück',
        'shared.viewall':       'Alle anzeigen →',
        'shared.listen':        'Anhören →',
        'shared.read':          'Lesen →',
        'shared.view':          'Ansehen →',
        'shared.view_profile':  'Profil ansehen →',
        'shared.get_in_touch':  'Kontakt aufnehmen →',

        // Security page
        'sec.section_platforms': 'Plattformen',
        'sec.section_writeups':  'Write-ups',
        'sec.section_projects':  'Projekte',
        'stats.machines': 'Maschinen',
        'stats.points':   'Punkte',
        'stats.rooms':    'Räume',

        // Music page
        'music.section_platforms': 'Plattformen',
        'music.section_booking':   'Buchung',
        'music.section_releases':  'Releases',
        'stats.tracks':     'Tracks',
        'stats.followers':  'Follower',
        'stats.releases':   'Releases',
        'stats.listeners':  'Zuhörer',

        // Booking cards
        'booking.lessons_type':  'Unterricht',
        'booking.lessons_title': 'Schlagzeugunterricht',
        'booking.lessons_desc':  'Einzelunterricht für alle Niveaus. Technik, Groove, Unabhängigkeit und stilistische Vielseitigkeit. Online oder persönlich.',
        'booking.session_type':  'Live',
        'booking.session_title': 'Session-Schlagzeuger',
        'booking.session_desc':  'Verfügbar für Live-Shows, Studioaufnahmen und Session-Arbeit. Elektronisches und akustisches Hybrid-Setup. Touring willkommen.',
        'booking.collab_type':   'Remote',
        'booking.collab_title':  'Kollaboration',
        'booking.collab_desc':   'Offen für Co-Produktionen, Remixes und kreative Projekte in allen Genres. Brief schicken, dann sehen wir weiter.',

        // About page
        'about.eyebrow':           'Zacharias Priller',
        'about.title':             'About',
        'about.tagline':           'Security-Forscher. Musikproduzent. Schlagzeuger.',
        'about.section_biography': 'Biografie',
        'about.bio_p1': 'Informatikstudent im sechsten Semester mit Schwerpunkt offensive Sicherheit und Low-Level-Systeme. Ich verbringe die meiste Zeit damit, Dinge zu zerlegen – Binaries zu reverse-engineeren, Exploits zu schreiben und auf HackTheBox und TryHackMe Flags zu jagen. Die andere Hälfte meiner Zeit stecke ich ins Bauen: Musik.',
        'about.bio_p2': 'Die beiden Seiten sind weniger getrennt, als sie wirken. Security verlangt dieselbe obsessive Mustererkennung wie Music Production. Beides belohnt Geduld, laterales Denken und die Bereitschaft, bei einem Problem zu sitzen, bis es sich ergibt. da3mon ist der Ort, an dem beide Welten an die Oberfläche kommen.',
        'about.section_stack':     'Stack',
        'about.skills_security':   'Security',
        'about.skills_music':      'Musik',
        'about.section_education': 'Ausbildung',
        'about.degree':     'B.Eng. Informatik',
        'about.edu_status': '6. Semester – laufend',

        // Contact page
        'contact.eyebrow':           'da3mon',
        'contact.title':             'Kontakt',
        'contact.section_platforms': 'Plattformen',
        'contact.security_group':    'Security',
        'contact.music_group':       'Musik',
        'contact.chess_group':       'Schach',
        'contact.section_message':   'Nachricht',
        'contact.form_name_label':        'Name',
        'contact.form_name_placeholder':  'Dein Name',
        'contact.form_email_label':       'E-Mail',
        'contact.form_message_label':     'Nachricht',
        'contact.form_message_placeholder': 'Deine Nachricht…',
        'contact.form_submit':            'Senden',

        // List pages
        'filter.all': 'Alle',

        'writeups.eyebrow':            'Art of',
        'writeups.title':              'Write-ups',
        'writeups.back':               '← Exploitation',
        'writeups.search_placeholder': 'Write-ups suchen…',
        'writeups.empty':              'Keine Write-ups gefunden.',

        'projects.eyebrow':            'Open Source',
        'projects.title':              'Projekte',
        'projects.back':               '← Exploitation',
        'projects.search_placeholder': 'Projekte suchen…',
        'projects.empty':              'Keine Projekte gefunden.',

        'releases.eyebrow':            'Pulse of',
        'releases.title':              'Releases',
        'releases.back':               '← Music',
        'releases.search_placeholder': 'Releases suchen…',
        'releases.empty':              'Keine Releases gefunden.',

        // Footer
        'footer.copyright': '© 2026 Zacharias Priller',
        'footer.security':  'Security',
        'footer.music':     'Musik',
        'footer.about':     'About',
        'footer.contact':   'Kontakt',
        'footer.impressum': 'Impressum',
        'footer.privacy':   'Datenschutz',

        // Impressum
        'impressum.eyebrow':      '§ 5 TMG',
        'impressum.title':        'Impressum',
        'impressum.h_responsible': 'Verantwortliche Person',
        'impressum.h_content':    'Verantwortlich für den Inhalt',
        'impressum.p_content':    'Gemäß § 55 Abs. 2 MStV: Zacharias Priller',
        'impressum.h_disclaimer': 'Haftungsausschluss',
        'impressum.p_disclaimer': 'Die Inhalte dieser Website wurden mit Sorgfalt zusammengestellt. Eine Garantie für Richtigkeit, Vollständigkeit oder Aktualität wird nicht übernommen. Als Privatperson greift die Haftung für verlinkte externe Inhalte erst dann, wenn eine konkrete Rechtsverletzung bekannt ist. Solche Links werden umgehend entfernt, sobald eine Verletzung festgestellt wird.',
        'impressum.h_dispute':  'EU-Streitschlichtung',
        'impressum.p_dispute1': 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:',
        'impressum.p_dispute2': 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',

        // Privacy
        'privacy.eyebrow': 'DSGVO',
        'privacy.title':   'Datenschutzerklärung',
        'privacy.h_controller':     'Verantwortlicher',
        'privacy.h_data_collected': 'Erhobene Daten beim Besuch der Website',
        'privacy.p_data_collected1': 'Beim Aufruf dieser Website übermittelt Ihr Browser automatisch Daten an den Hosting-Server. Dazu gehören IP-Adresse, Browsertyp und -version, Betriebssystem, verweisende URL sowie Datum und Uhrzeit der Anfrage. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am technisch einwandfreien Betrieb) und wird nicht über die Dauer Ihres Besuchs hinaus gespeichert, sofern der Hosting-Anbieter kein Server-Log führt.',
        'privacy.p_data_collected2': 'Informationen zur serverseitigen Log-Aufbewahrung entnehmen Sie bitte der Datenschutzerklärung Ihres Hosting-Anbieters.',
        'privacy.h_google_fonts': 'Google Fonts',
        'privacy.p_google_fonts1': 'Diese Website verwendet Google Fonts zur Darstellung von Schriftarten. Beim Laden einer Seite ruft Ihr Browser Schriftdateien direkt von Googles Servern unter fonts.googleapis.com und fonts.gstatic.com ab. Dabei wird Ihre IP-Adresse an Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA übermittelt.',
        'privacy.p_google_fonts2': 'Die Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO – unser berechtigtes Interesse an einer konsistenten, plattformübergreifenden Typografie. Google kann diese Daten in die USA übertragen und verarbeiten. Google LLC ist unter dem EU-US-Datenschutzrahmen zertifiziert.',
        'privacy.p_google_fonts3': 'Datenschutzerklärung von Google:',
        'privacy.h_contact_email': 'Kontakt per E-Mail',
        'privacy.p_contact_email': 'Wenn Sie uns per E-Mail unter <a href="mailto:contact@zachpriller.com">contact@zachpriller.com</a> kontaktieren, werden Ihre Angaben (Name, E-Mail-Adresse und Nachrichteninhalt) ausschließlich zur Bearbeitung Ihrer Anfrage und für Rückfragen gespeichert. Eine Weitergabe an Dritte erfolgt nicht. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern die Anfrage auf einen Vertragsabschluss abzielt, andernfalls Art. 6 Abs. 1 lit. f DSGVO. Die Daten werden gelöscht, sobald sie nicht mehr benötigt werden.',
        'privacy.h_no_cookies': 'Keine Cookies, keine Analyse',
        'privacy.p_no_cookies': 'Diese Website setzt keine Cookies und verwendet keine Web-Analyse-Tools (wie Google Analytics). Es findet keinerlei Tracking statt, das über die oben beschriebenen Daten hinausgeht.',
        'privacy.h_rights':   'Ihre Rechte nach der DSGVO',
        'privacy.p_rights':   'Sie haben folgende Rechte in Bezug auf Ihre personenbezogenen Daten:',
        'privacy.rights_li1': 'Auskunftsrecht (Art. 15 DSGVO)',
        'privacy.rights_li2': 'Recht auf Berichtigung (Art. 16 DSGVO)',
        'privacy.rights_li3': 'Recht auf Löschung (Art. 17 DSGVO)',
        'privacy.rights_li4': 'Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)',
        'privacy.rights_li5': 'Recht auf Datenübertragbarkeit (Art. 20 DSGVO)',
        'privacy.rights_li6': 'Widerspruchsrecht (Art. 21 DSGVO)',
        'privacy.p_rights_contact': 'Zur Ausübung dieser Rechte wenden Sie sich an:',
        'privacy.h_complaint':   'Beschwerderecht',
        'privacy.p_complaint':   'Sie haben das Recht, eine Beschwerde bei der zuständigen Aufsichtsbehörde einzureichen. Die für Bayern zuständige Behörde ist:',
        'privacy.h_last_updated': 'Letzte Aktualisierung',
        'privacy.p_last_updated': 'Mai 2026',
    },

    en: {
        // Nav
        'nav.home':    'Home',
        'nav.about':   'About',
        'nav.contact': 'Contact',

        // Mobile menu
        'mobile.about':   'About',
        'mobile.contact': 'Contact',

        // Brand axis
        'brand.security_eyebrow': 'Art of',
        'brand.security_title':   'Exploitation',
        'brand.security_tagline': 'Vulnerability research, CTF write-ups, and offensive security from the underground.',
        'brand.music_eyebrow': 'Pulse of',
        'brand.music_title':   'Music',
        'brand.music_tagline': 'Beats, sound design, and textured production from the underground.',

        // Shared CTAs
        'shared.explore':       'Explore →',
        'shared.back':          '← Back',
        'shared.viewall':       'View all →',
        'shared.listen':        'Listen →',
        'shared.read':          'Read →',
        'shared.view':          'View →',
        'shared.view_profile':  'View Profile →',
        'shared.get_in_touch':  'Get in touch →',

        // Security page
        'sec.section_platforms': 'Platforms',
        'sec.section_writeups':  'Write-ups',
        'sec.section_projects':  'Projects',
        'stats.machines': 'Machines',
        'stats.points':   'Points',
        'stats.rooms':    'Rooms',

        // Music page
        'music.section_platforms': 'Platforms',
        'music.section_booking':   'Booking',
        'music.section_releases':  'Releases',
        'stats.tracks':     'Tracks',
        'stats.followers':  'Followers',
        'stats.releases':   'Releases',
        'stats.listeners':  'Listeners',

        // Booking cards
        'booking.lessons_type':  'Teaching',
        'booking.lessons_title': 'Drum Lessons',
        'booking.lessons_desc':  'One-on-one drum lessons for all levels. Covers technique, groove, independence, and stylistic versatility. Online or in-person.',
        'booking.session_type':  'Live',
        'booking.session_title': 'Session Drummer',
        'booking.session_desc':  'Available for live shows, studio recordings, and session work. Electronic and acoustic hybrid setup. Touring welcome.',
        'booking.collab_type':   'Remote',
        'booking.collab_title':  'Collaboration',
        'booking.collab_desc':   "Open to co-productions, remixes, and creative projects across any genre. Send a brief and we'll take it from there.",

        // About page
        'about.eyebrow':           'Zacharias Priller',
        'about.title':             'About',
        'about.tagline':           'Security researcher. Music producer. Drummer.',
        'about.section_biography': 'Biography',
        'about.bio_p1': 'Computer science student in my sixth semester, focused on offensive security and low-level systems. I spend most of my time breaking things — reverse engineering binaries, writing exploits, and chasing flags on HackTheBox and TryHackMe. The other half of my time is spent building things: music.',
        'about.bio_p2': 'The two sides are less separate than they look. Security demands the same obsessive pattern recognition as music production. Both reward patience, lateral thinking, and the willingness to sit with a problem until it gives. da3mon is where both worlds surface.',
        'about.section_stack':     'Stack',
        'about.skills_security':   'Security',
        'about.skills_music':      'Music',
        'about.section_education': 'Education',
        'about.degree':     'B.Eng. Computer Science',
        'about.edu_status': '6th Semester — ongoing',

        // Contact page
        'contact.eyebrow':           'da3mon',
        'contact.title':             'Contact',
        'contact.section_platforms': 'Platforms',
        'contact.security_group':    'Security',
        'contact.music_group':       'Music',
        'contact.chess_group':       'Chess',
        'contact.section_message':   'Message',
        'contact.form_name_label':        'Name',
        'contact.form_name_placeholder':  'Your name',
        'contact.form_email_label':       'Email',
        'contact.form_message_label':     'Message',
        'contact.form_message_placeholder': 'Your message…',
        'contact.form_submit':            'Send',

        // List pages
        'filter.all': 'All',

        'writeups.eyebrow':            'Art of',
        'writeups.title':              'Write-ups',
        'writeups.back':               '← Exploitation',
        'writeups.search_placeholder': 'Search write-ups…',
        'writeups.empty':              'No write-ups match your search.',

        'projects.eyebrow':            'Open Source',
        'projects.title':              'Projects',
        'projects.back':               '← Exploitation',
        'projects.search_placeholder': 'Search projects…',
        'projects.empty':              'No projects match your search.',

        'releases.eyebrow':            'Pulse of',
        'releases.title':              'Releases',
        'releases.back':               '← Music',
        'releases.search_placeholder': 'Search releases…',
        'releases.empty':              'No releases match your search.',

        // Footer
        'footer.copyright': '© 2026 Zacharias Priller',
        'footer.security':  'Security',
        'footer.music':     'Music',
        'footer.about':     'About',
        'footer.contact':   'Contact',
        'footer.impressum': 'Impressum',
        'footer.privacy':   'Privacy',

        // Impressum
        'impressum.eyebrow':       '§ 5 TMG',
        'impressum.title':         'Legal Notice',
        'impressum.h_responsible': 'Responsible Party',
        'impressum.h_content':     'Responsible for Content',
        'impressum.p_content':     'Pursuant to § 55 Abs. 2 MStV: Zacharias Priller',
        'impressum.h_disclaimer':  'Disclaimer',
        'impressum.p_disclaimer':  'The content of this website has been compiled with care. However, no guarantee is given for the accuracy, completeness, or timeliness of the information provided. As a private individual, liability for linked external content applies only once knowledge of a specific infringement has been established. Such links will be removed immediately upon becoming aware of any violations.',
        'impressum.h_dispute':  'EU Dispute Resolution',
        'impressum.p_dispute1': 'The European Commission provides a platform for online dispute resolution (ODR):',
        'impressum.p_dispute2': 'We are not obligated to participate in dispute resolution proceedings before a consumer arbitration board and do not do so voluntarily.',

        // Privacy
        'privacy.eyebrow': 'GDPR · DSGVO',
        'privacy.title':   'Privacy Policy',
        'privacy.h_controller':     'Controller',
        'privacy.h_data_collected': 'Data Collected When Visiting This Site',
        'privacy.p_data_collected1': 'When you access this website, your browser automatically transmits data to the server hosting this site. This includes your IP address, browser type and version, operating system, referring URL, and the date and time of the request. This data is processed on the basis of Art. 6(1)(f) GDPR (legitimate interest in operating a technically functional website) and is not stored beyond the duration of your visit unless a server log is retained by the hosting provider.',
        'privacy.p_data_collected2': "Please refer to your hosting provider's privacy policy for details on server-side log retention.",
        'privacy.h_google_fonts': 'Google Fonts',
        'privacy.p_google_fonts1': "This site uses Google Fonts to display typefaces. When a page loads, your browser requests font files directly from Google's servers at fonts.googleapis.com and fonts.gstatic.com. This causes your IP address to be transmitted to Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.",
        'privacy.p_google_fonts2': 'The legal basis for this processing is Art. 6(1)(f) GDPR — our legitimate interest in consistent, cross-platform typography. Google may transfer and process this data in the United States. Google LLC is certified under the EU–US Data Privacy Framework.',
        'privacy.p_google_fonts3': "Google's privacy policy:",
        'privacy.h_contact_email': 'Contact by Email',
        'privacy.p_contact_email': 'If you contact us via email at <a href="mailto:contact@zachpriller.com">contact@zachpriller.com</a>, the data you provide (name, email address, and message content) will be stored solely for the purpose of processing your request and for follow-up questions. This data is not shared with third parties. The legal basis is Art. 6(1)(b) GDPR where the inquiry relates to a potential agreement, or Art. 6(1)(f) GDPR (legitimate interest in responding to inquiries) otherwise. Data is deleted once it is no longer required.',
        'privacy.h_no_cookies': 'No Cookies, No Analytics',
        'privacy.p_no_cookies': 'This website does not set cookies and does not use web analytics tools (such as Google Analytics). No tracking of any kind takes place beyond what is described above.',
        'privacy.h_rights':   'Your Rights Under GDPR',
        'privacy.p_rights':   'You have the following rights with respect to your personal data:',
        'privacy.rights_li1': 'Right of access (Art. 15 GDPR)',
        'privacy.rights_li2': 'Right to rectification (Art. 16 GDPR)',
        'privacy.rights_li3': 'Right to erasure (Art. 17 GDPR)',
        'privacy.rights_li4': 'Right to restriction of processing (Art. 18 GDPR)',
        'privacy.rights_li5': 'Right to data portability (Art. 20 GDPR)',
        'privacy.rights_li6': 'Right to object (Art. 21 GDPR)',
        'privacy.p_rights_contact': 'To exercise any of these rights, contact:',
        'privacy.h_complaint':   'Right to Lodge a Complaint',
        'privacy.p_complaint':   'You have the right to lodge a complaint with the competent supervisory authority. The authority responsible for Bavaria is:',
        'privacy.h_last_updated': 'Last Updated',
        'privacy.p_last_updated': 'May 2026',
    },
};

export function applyLanguage(lang) {
    const map = translations[lang];
    if (!map) return;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.dataset.i18n;
        if (map[key] !== undefined) el.textContent = map[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
        const key = el.dataset.i18nHtml;
        if (map[key] !== undefined) el.innerHTML = map[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        const key = el.dataset.i18nPlaceholder;
        if (map[key] !== undefined) el.placeholder = map[key];
    });

    document.documentElement.lang = lang;
    localStorage.setItem('da3mon-lang', lang);
}

export function initI18n() {
    const lang = localStorage.getItem('da3mon-lang') || 'de';
    applyLanguage(lang);
    return lang;
}
