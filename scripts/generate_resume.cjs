const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts, PDFName, PDFString } = require('pdf-lib');

async function generateResume() {
  const doc = await PDFDocument.create();

  // Page dimensions: US Letter (612 x 792 pt)
  const pageWidth = 612;
  const pageHeight = 792;
  const leftMargin = 48;
  const rightMargin = 48;
  const contentWidth = pageWidth - leftMargin - rightMargin;

  // Standard Fonts
  const helvetica = await doc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const helveticaOblique = await doc.embedFont(StandardFonts.HelveticaOblique);

  // Exact color palette matching the screenshot:
  // Primary blue: vibrant deep blue (#1B4D9B / #1E40AF)
  const primaryBlue = rgb(0.11, 0.32, 0.65);
  const linkBlue = rgb(0.15, 0.40, 0.75);
  const darkText = rgb(0.12, 0.15, 0.18);
  const mutedText = rgb(0.35, 0.40, 0.46);
  const ruleColor = rgb(0.11, 0.32, 0.65);

  function addLink(page, x, y, width, height, url) {
    const linkAnnot = doc.context.obj({
      Type: 'Annot',
      Subtype: 'Link',
      Rect: [x, y, x + width, y + height],
      Border: [0, 0, 0],
      A: {
        Type: 'Action',
        S: 'URI',
        URI: PDFString.of(url),
      },
    });
    const linkRef = doc.context.register(linkAnnot);
    let annots = page.node.get(PDFName.of('Annots'));
    if (!annots) {
      annots = doc.context.obj([]);
      page.node.set(PDFName.of('Annots'), annots);
    }
    annots.push(linkRef);
  }

  function wrapText(text, font, size, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? currentLine + ' ' + word : word;
      const testWidth = font.widthOfTextAtSize(testLine, size);
      if (testWidth > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
    return lines;
  }

  function drawSectionHeader(page, title, y) {
    page.drawText(title, {
      x: leftMargin,
      y: y,
      font: helveticaBold,
      size: 11,
      color: primaryBlue,
    });
    const lineY = y - 4;
    page.drawLine({
      start: { x: leftMargin, y: lineY },
      end: { x: pageWidth - rightMargin, y: lineY },
      thickness: 0.85,
      color: ruleColor,
    });
    return lineY - 12;
  }

  function drawBullet(page, text, y, font = helvetica, size = 9.2, indent = 13) {
    const bulletX = leftMargin + 6;
    const textX = leftMargin + indent + 5;
    const maxWidth = contentWidth - indent - 5;

    // Small right-pointing triangle `▸`
    page.drawSvgPath('M 0 0 L 3.8 2.8 L 0 5.6 Z', {
      x: bulletX,
      y: y + 1.5,
      color: darkText,
    });

    const lines = wrapText(text, font, size, maxWidth);
    let currentY = y;
    for (let i = 0; i < lines.length; i++) {
      page.drawText(lines[i], {
        x: textX,
        y: currentY,
        font: font,
        size: size,
        color: darkText,
      });
      if (i < lines.length - 1) {
        currentY -= 12.5;
      }
    }
    return currentY - 13;
  }

  // =========================================================================
  // PAGE 1
  // =========================================================================
  const page1 = doc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - 48;

  // Header - Name
  const nameText = 'PRADIPSINH JADEJA';
  const nameSize = 24;
  const nameWidth = helveticaBold.widthOfTextAtSize(nameText, nameSize);
  page1.drawText(nameText, {
    x: (pageWidth - nameWidth) / 2,
    y: y,
    font: helveticaBold,
    size: nameSize,
    color: primaryBlue,
  });
  y -= 18;

  // Header - Title
  const subText = 'Python & Django Developer';
  const subSize = 13;
  const subWidth = helvetica.widthOfTextAtSize(subText, subSize);
  page1.drawText(subText, {
    x: (pageWidth - subWidth) / 2,
    y: y,
    font: helvetica,
    size: subSize,
    color: darkText,
  });
  y -= 15;

  // Header - Contact Information Line with Links
  const cEmail = 'pradipsinh0906@gmail.com';
  const cPhone = '+91 97121 82021';
  const cCity = 'Ahmedabad, India';
  const cLinkedIn = 'LinkedIn';
  const cPortfolio = 'Portfolio';
  const dot = '  •  ';
  const contactSize = 9;

  const wEmail = helvetica.widthOfTextAtSize(cEmail, contactSize);
  const wDot = helvetica.widthOfTextAtSize(dot, contactSize);
  const wParamPhone = helvetica.widthOfTextAtSize(cPhone, contactSize);
  const wCity = helvetica.widthOfTextAtSize(cCity, contactSize);
  const wLinkedIn = helvetica.widthOfTextAtSize(cLinkedIn, contactSize);
  const wPortfolio = helvetica.widthOfTextAtSize(cPortfolio, contactSize);

  const totalContactW = wEmail + wDot + wParamPhone + wDot + wCity + wDot + wLinkedIn + wDot + wPortfolio;
  let cx = (pageWidth - totalContactW) / 2;

  // Email
  page1.drawText(cEmail, { x: cx, y: y, font: helvetica, size: contactSize, color: mutedText });
  addLink(page1, cx, y - 2, wEmail, contactSize + 4, 'mailto:pradipsinh0906@gmail.com');
  cx += wEmail;

  page1.drawText(dot, { x: cx, y: y, font: helvetica, size: contactSize, color: mutedText });
  cx += wDot;

  // Phone
  page1.drawText(cPhone, { x: cx, y: y, font: helvetica, size: contactSize, color: mutedText });
  addLink(page1, cx, y - 2, wParamPhone, contactSize + 4, 'tel:+919712182021');
  cx += wParamPhone;

  page1.drawText(dot, { x: cx, y: y, font: helvetica, size: contactSize, color: mutedText });
  cx += wDot;

  // City
  page1.drawText(cCity, { x: cx, y: y, font: helvetica, size: contactSize, color: mutedText });
  cx += wCity;

  page1.drawText(dot, { x: cx, y: y, font: helvetica, size: contactSize, color: mutedText });
  cx += wDot;

  // LinkedIn
  page1.drawText(cLinkedIn, { x: cx, y: y, font: helvetica, size: contactSize, color: linkBlue });
  page1.drawLine({ start: { x: cx, y: y - 1 }, end: { x: cx + wLinkedIn, y: y - 1 }, thickness: 0.6, color: linkBlue });
  addLink(page1, cx, y - 2, wLinkedIn, contactSize + 4, 'https://www.linkedin.com/in/pradipsinh-jadeja/');
  cx += wLinkedIn;

  page1.drawText(dot, { x: cx, y: y, font: helvetica, size: contactSize, color: mutedText });
  cx += wDot;

  // Portfolio
  page1.drawText(cPortfolio, { x: cx, y: y, font: helvetica, size: contactSize, color: linkBlue });
  page1.drawLine({ start: { x: cx, y: y - 1 }, end: { x: cx + wPortfolio, y: y - 1 }, thickness: 0.6, color: linkBlue });
  addLink(page1, cx, y - 2, wPortfolio, contactSize + 4, 'https://github.com/pradipsinh0906-prog');

  y -= 22;

  // -------------------------------------------------------------
  // 1. PROFESSIONAL SUMMARY
  // -------------------------------------------------------------
  y = drawSectionHeader(page1, 'PROFESSIONAL SUMMARY', y);
  const summaryText =
    'Python & Django Developer with hands-on experience designing and building full-stack web applications, REST APIs, and secure authentication systems. Proficient in Django, MySQL, PostgreSQL, and Git, with a strong foundation in backend architecture, database optimization, and third-party integrations. Proven ability to deliver production-ready applications through internship work and personal projects. Passionate about writing clean, scalable code and eager to contribute to high-impact backend engineering teams.';
  const summaryLines = wrapText(summaryText, helvetica, 9.3, contentWidth);
  for (const line of summaryLines) {
    page1.drawText(line, {
      x: leftMargin,
      y: y,
      font: helvetica,
      size: 9.3,
      color: darkText,
    });
    y -= 12.5;
  }
  y -= 7;

  // -------------------------------------------------------------
  // 2. TECHNICAL SKILLS
  // -------------------------------------------------------------
  y = drawSectionHeader(page1, 'TECHNICAL SKILLS', y);
  const skillsList = [
    {
      label: 'Backend: ',
      text: 'Python, Django, Django REST Framework, Authentication (JWT / Session), Role-Based Access Control',
    },
    {
      label: 'Frontend: ',
      text: 'HTML5, CSS3, Bootstrap, JavaScript',
    },
    {
      label: 'Databases: ',
      text: 'MySQL, PostgreSQL, SQLite — query optimization & schema design',
    },
    {
      label: 'APIs & Integrations: ',
      text: 'REST API design, third-party API consumption, JSON data handling',
    },
    {
      label: 'Platform / CMS: ',
      text: 'Magento 2 (custom modules, cart/checkout/admin customizations)',
    },
    {
      label: 'DevOps & Deployment: ',
      text: 'Render, PythonAnywhere, Git, GitHub, Bitbucket',
    },
    {
      label: 'Other: ',
      text: 'PHP, C, C++, Jira (defect tracking), Scrum methodology',
    },
  ];

  for (const skill of skillsList) {
    const labelWidth = helveticaBold.widthOfTextAtSize(skill.label, 9.2);
    page1.drawText(skill.label, {
      x: leftMargin,
      y: y,
      font: helveticaBold,
      size: 9.2,
      color: primaryBlue,
    });

    const valLines = wrapText(skill.text, helvetica, 9.2, contentWidth - labelWidth);
    page1.drawText(valLines[0], {
      x: leftMargin + labelWidth,
      y: y,
      font: helvetica,
      size: 9.2,
      color: darkText,
    });
    y -= 12.5;

    for (let i = 1; i < valLines.length; i++) {
      page1.drawText(valLines[i], {
        x: leftMargin + labelWidth,
        y: y,
        font: helvetica,
        size: 9.2,
        color: darkText,
      });
      y -= 12.5;
    }
  }
  y -= 6;

  // -------------------------------------------------------------
  // 3. PROFESSIONAL EXPERIENCE
  // -------------------------------------------------------------
  y = drawSectionHeader(page1, 'PROFESSIONAL EXPERIENCE', y);

  // Experience 1
  page1.drawText('Python & Django Developer Intern', {
    x: leftMargin,
    y: y,
    font: helveticaBold,
    size: 10,
    color: darkText,
  });
  const exp1TitleW = helveticaBold.widthOfTextAtSize('Python & Django Developer Intern', 10);
  page1.drawText(' | ', {
    x: leftMargin + exp1TitleW,
    y: y,
    font: helvetica,
    size: 10,
    color: mutedText,
  });
  const barW = helvetica.widthOfTextAtSize(' | ', 10);
  page1.drawText('Infinite Soft Tech', {
    x: leftMargin + exp1TitleW + barW,
    y: y,
    font: helveticaBold,
    size: 10,
    color: primaryBlue,
  });

  const exp1Date = 'Dec 2025 – April 2026';
  const exp1DateW = helvetica.widthOfTextAtSize(exp1Date, 9.2);
  page1.drawText(exp1Date, {
    x: pageWidth - rightMargin - exp1DateW,
    y: y,
    font: helvetica,
    size: 9.2,
    color: darkText,
  });
  y -= 13.5;

  const exp1Bullets = [
    'Built full-stack web applications using Python, Django, HTML, CSS, Bootstrap, and JavaScript.',
    'Developed robust backend logic including user authentication systems (Login, Signup, Role-Based Access Control).',
    'Designed and implemented REST APIs for seamless communication between frontend and backend services.',
    'Modeled relational databases and managed data using SQLite and MySQL.',
    'Deployed Django applications to cloud platforms — Render and PythonAnywhere.',
    'Maintained version-controlled codebases on GitHub with proper documentation and branching strategies.',
    'Debugged and optimized backend performance, improving response times and application efficiency.',
  ];

  for (const bullet of exp1Bullets) {
    y = drawBullet(page1, bullet, y, helvetica, 9.1);
  }
  y -= 5;

  // Experience 2
  page1.drawText('Software Engineer', {
    x: leftMargin,
    y: y,
    font: helveticaBold,
    size: 10,
    color: darkText,
  });
  const exp2TitleW = helveticaBold.widthOfTextAtSize('Software Engineer', 10);
  page1.drawText(' | ', {
    x: leftMargin + exp2TitleW,
    y: y,
    font: helvetica,
    size: 10,
    color: mutedText,
  });
  const bar2W = helvetica.widthOfTextAtSize(' | ', 10);
  page1.drawText('Kitchen365', {
    x: leftMargin + exp2TitleW + bar2W,
    y: y,
    font: helveticaBold,
    size: 10,
    color: primaryBlue,
  });

  const exp2Date = 'Feb 2024 – Dec 2025';
  const exp2DateW = helvetica.widthOfTextAtSize(exp2Date, 9.2);
  page1.drawText(exp2Date, {
    x: pageWidth - rightMargin - exp2DateW,
    y: y,
    font: helvetica,
    size: 9.2,
    color: darkText,
  });
  y -= 13.5;

  const exp2Bullets = [
    'Led development of custom Magento 2 modules and feature enhancements for e-commerce clients.',
    'Executed complex customizations across cart, checkout, product, customer, and admin modules to improve UX.',
    'Built and managed API integrations with third-party services for seamless data workflows.',
    'Optimized MySQL queries and managed database architecture to support high-performance e-commerce sites.',
    'Conducted bug fixing, performance tuning, and critical production support.',
  ];

  for (const bullet of exp2Bullets) {
    y = drawBullet(page1, bullet, y, helvetica, 9.1);
  }
  y -= 6;

  // -------------------------------------------------------------
  // 4. PROJECTS (Starts on Page 1)
  // -------------------------------------------------------------
  y = drawSectionHeader(page1, 'PROJECTS', y);

  // Project 1: Blog Application
  page1.drawText('Blog Application', {
    x: leftMargin,
    y: y,
    font: helveticaBold,
    size: 10,
    color: darkText,
  });
  const proj1TitleW = helveticaBold.widthOfTextAtSize('Blog Application', 10);
  const ghLabel1 = 'GitHub';
  const ghArrow1 = ' ->';
  const ghLabel1W = helvetica.widthOfTextAtSize(ghLabel1, 9);
  const ghArrow1W = helvetica.widthOfTextAtSize(ghArrow1, 9);
  const ghX1 = leftMargin + proj1TitleW + 8;

  page1.drawText(ghLabel1, { x: ghX1, y: y, font: helvetica, size: 9, color: linkBlue });
  page1.drawLine({ start: { x: ghX1, y: y - 1 }, end: { x: ghX1 + ghLabel1W, y: y - 1 }, thickness: 0.6, color: linkBlue });
  page1.drawText(ghArrow1, { x: ghX1 + ghLabel1W, y: y, font: helvetica, size: 9, color: linkBlue });
  addLink(page1, ghX1, y - 2, ghLabel1W + ghArrow1W, 11, 'https://github.com/pradipsinh0906-prog');

  const proj1Date = 'Feb 2026';
  const proj1DateW = helvetica.widthOfTextAtSize(proj1Date, 9.2);
  page1.drawText(proj1Date, {
    x: pageWidth - rightMargin - proj1DateW,
    y: y,
    font: helvetica,
    size: 9.2,
    color: darkText,
  });
  y -= 13.5;

  const proj1Bullets = [
    'Built a full-featured blog platform with Django including complete CRUD operations on posts.',
    'Implemented secure user authentication — Login, Signup, and Logout workflows.',
    'Developed a comment system enabling user interaction on published posts.',
    'Designed a responsive, mobile-friendly UI using HTML, CSS, and Bootstrap.',
  ];

  for (const bullet of proj1Bullets) {
    y = drawBullet(page1, bullet, y, helvetica, 9.1);
  }

  // =========================================================================
  // PAGE 2
  // =========================================================================
  const page2 = doc.addPage([pageWidth, pageHeight]);
  let y2 = pageHeight - 52;

  // Project 2: Weather Application
  page2.drawText('Weather Application', {
    x: leftMargin,
    y: y2,
    font: helveticaBold,
    size: 10,
    color: darkText,
  });
  const proj2TitleW = helveticaBold.widthOfTextAtSize('Weather Application', 10);
  const ghLabel2 = 'GitHub';
  const ghArrow2 = ' ->';
  const ghLabel2W = helvetica.widthOfTextAtSize(ghLabel2, 9);
  const ghArrow2W = helvetica.widthOfTextAtSize(ghArrow2, 9);
  const ghX2 = leftMargin + proj2TitleW + 8;

  page2.drawText(ghLabel2, { x: ghX2, y: y2, font: helvetica, size: 9, color: linkBlue });
  page2.drawLine({ start: { x: ghX2, y: y2 - 1 }, end: { x: ghX2 + ghLabel2W, y: y2 - 1 }, thickness: 0.6, color: linkBlue });
  page2.drawText(ghArrow2, { x: ghX2 + ghLabel2W, y: y2, font: helvetica, size: 9, color: linkBlue });
  addLink(page2, ghX2, y2 - 2, ghLabel2W + ghArrow2W, 11, 'https://github.com/pradipsinh0906-prog');

  const proj2Date = 'Mar 2026 – Present';
  const proj2DateW = helvetica.widthOfTextAtSize(proj2Date, 9.2);
  page2.drawText(proj2Date, {
    x: pageWidth - rightMargin - proj2DateW,
    y: y2,
    font: helvetica,
    size: 9.2,
    color: darkText,
  });
  y2 -= 13.5;

  const proj2Bullets = [
    'Created a real-time weather app that fetches live data from external weather APIs.',
    'Implemented city-based search displaying temperature, humidity, feels-like, and min/max conditions.',
    'Designed a responsive UI using HTML, CSS, and Bootstrap for cross-device compatibility.',
  ];

  for (const bullet of proj2Bullets) {
    y2 = drawBullet(page2, bullet, y2, helvetica, 9.1);
  }
  y2 -= 7;

  // Project 3: ReelsDownloader
  page2.drawText('ReelsDownloader', {
    x: leftMargin,
    y: y2,
    font: helveticaBold,
    size: 10,
    color: darkText,
  });
  const proj3TitleW = helveticaBold.widthOfTextAtSize('ReelsDownloader', 10);
  const ghLabel3 = 'GitHub';
  const ghArrow3 = ' ->';
  const ghLabel3W = helvetica.widthOfTextAtSize(ghLabel3, 9);
  const ghArrow3W = helvetica.widthOfTextAtSize(ghArrow3, 9);
  const ghX3 = leftMargin + proj3TitleW + 8;

  page2.drawText(ghLabel3, { x: ghX3, y: y2, font: helvetica, size: 9, color: linkBlue });
  page2.drawLine({ start: { x: ghX3, y: y2 - 1 }, end: { x: ghX3 + ghLabel3W, y: y2 - 1 }, thickness: 0.6, color: linkBlue });
  page2.drawText(ghArrow3, { x: ghX3 + ghLabel3W, y: y2, font: helvetica, size: 9, color: linkBlue });
  addLink(page2, ghX3, y2 - 2, ghLabel3W + ghArrow3W, 11, 'https://github.com/pradipsinh0906-prog');

  const proj3Date = 'Jan 2026 – Mar 2026';
  const proj3DateW = helvetica.widthOfTextAtSize(proj3Date, 9.2);
  page2.drawText(proj3Date, {
    x: pageWidth - rightMargin - proj3DateW,
    y: y2,
    font: helvetica,
    size: 9.2,
    color: darkText,
  });
  y2 -= 13.5;

  const proj3Bullets = [
    'Developed a Django-based application to download social media videos via URL input.',
    'Integrated third-party libraries/APIs to extract and process video content efficiently.',
    'Implemented robust error handling for invalid or restricted links.',
    'Optimized backend for faster response times and smooth download performance.',
  ];

  for (const bullet of proj3Bullets) {
    y2 = drawBullet(page2, bullet, y2, helvetica, 9.1);
  }
  y2 -= 14;

  // -------------------------------------------------------------
  // 5. EDUCATION
  // -------------------------------------------------------------
  y2 = drawSectionHeader(page2, 'EDUCATION', y2);

  // Education 1: MCA
  page2.drawText('Master of Computer Applications (MCA)', {
    x: leftMargin,
    y: y2,
    font: helveticaBold,
    size: 10,
    color: darkText,
  });
  const edu1Date = '2024 – 2026';
  const edu1DateW = helvetica.widthOfTextAtSize(edu1Date, 9.2);
  page2.drawText(edu1Date, {
    x: pageWidth - rightMargin - edu1DateW,
    y: y2,
    font: helvetica,
    size: 9.2,
    color: darkText,
  });
  y2 -= 13;

  page2.drawText('Rudra Goswami College of Computer Application, Ahmedabad', {
    x: leftMargin,
    y: y2,
    font: helvetica,
    size: 9.2,
    color: mutedText,
  });
  y2 -= 17;

  // Education 2: BCA
  page2.drawText('Bachelor of Computer Applications (BCA)', {
    x: leftMargin,
    y: y2,
    font: helveticaBold,
    size: 10,
    color: darkText,
  });
  const edu2Date = '2021 – 2024';
  const edu2DateW = helvetica.widthOfTextAtSize(edu2Date, 9.2);
  page2.drawText(edu2Date, {
    x: pageWidth - rightMargin - edu2DateW,
    y: y2,
    font: helvetica,
    size: 9.2,
    color: darkText,
  });
  y2 -= 13;

  page2.drawText('Rudra Goswami College of Computer Application, Ahmedabad', {
    x: leftMargin,
    y: y2,
    font: helvetica,
    size: 9.2,
    color: mutedText,
  });
  y2 -= 20;

  // -------------------------------------------------------------
  // 6. CERTIFICATIONS
  // -------------------------------------------------------------
  y2 = drawSectionHeader(page2, 'CERTIFICATIONS', y2);

  const certBullets = [
    'C++ Language Certification (2023)',
    'C Language Certification (2022)',
  ];

  for (const cert of certBullets) {
    y2 = drawBullet(page2, cert, y2, helvetica, 9.2);
  }

  console.log('Page 1 final y:', y, 'Page 2 final y:', y2);

  // Save to public/resume/Pradipsinh_Jadeja_Resume.pdf
  const pdfBytes = await doc.save();
  const targetDir = path.join(process.cwd(), 'public', 'resume');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const targetFile = path.join(targetDir, 'Pradipsinh_Jadeja_Resume.pdf');
  fs.writeFileSync(targetFile, pdfBytes);
  console.log('Successfully generated:', targetFile, 'Size:', pdfBytes.length, 'bytes');
}

generateResume().catch((err) => {
  console.error('Error generating resume:', err);
  process.exit(1);
});
