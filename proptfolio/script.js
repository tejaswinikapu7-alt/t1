/**
 * TEJASWINI KAPU - BLACK & RED STUDENT DATA ANALYTICS PORTFOLIO SCRIPT
 * Features & Animations:
 * 1. Background Interactive Red Particle Constellation Canvas
 * 2. Magnetic Button Physics
 * 3. Matrix/Cyberpunk Text Scramble Decoder
 * 4. Card Mouse-Tracking Border Spotlight
 * 5. Scroll Stagger Blur-In Reveal
 * + 5 Developer Features (CLI Terminal, GitHub Heatmap, TCS NQT Stats, In-Browser Resume Modal, Project Tabs)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // ANIMATION 1: INTERACTIVE RED PARTICLE CONSTELLATION CANVAS
  // ==========================================
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 30), 45);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2 + 1;
        this.baseColor = Math.random() > 0.3 ? 'rgba(255, 30, 66,' : 'rgba(255, 255, 255,';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.baseColor} 0.7)`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ff1e42';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let mousePos = { x: -1000, y: -1000 };
    window.addEventListener('mousemove', (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    });

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles close to each other
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 30, 66, ${0.25 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect particles to mouse
        const mdx = particles[i].x - mousePos.x;
        const mdy = particles[i].y - mousePos.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mousePos.x, mousePos.y);
          ctx.strokeStyle = `rgba(255, 30, 66, ${0.45 * (1 - mdist / 140)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ==========================================
  // ANIMATION 2: MAGNETIC BUTTON PULL PHYSICS
  // ==========================================
  const magneticButtons = document.querySelectorAll('.btn, .open-preview-btn, .project-action-btn, .term-chip');
  magneticButtons.forEach((btn) => {
    btn.classList.add('magnetic-target');

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px) scale(1.03)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px) scale(1)';
    });
  });

  // ==========================================
  // ANIMATION 3: CARD MOUSE-TRACKING SPOTLIGHT
  // ==========================================
  const glassCards = document.querySelectorAll('.glass-panel');
  glassCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // ==========================================
  // ANIMATION 5: SCROLL STAGGER BLUR-IN REVEAL
  // ==========================================
  const revealElements = document.querySelectorAll('.edu-card, .service-card, .project-card, .stats-card, .terminal-window, .section-header, .about-bio-card, .skills-card, .contact-info-card, .contact-form-card');
  revealElements.forEach((el) => el.classList.add('reveal-on-scroll'));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach((el) => revealObserver.observe(el));

  // ==========================================
  // AMBIENT MOUSE SPOTLIGHT FOLLOWER (GPU ACCELERATED, 0-LAG)
  // ==========================================
  const spotlight = document.getElementById('ambientSpotlight');
  if (spotlight) {
    let mouseX = -1000, mouseY = -1000;
    let rafId = null;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          spotlight.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
          rafId = null;
        });
      }
    }, { passive: true });
  }

  // ==========================================
  // HEADER SCROLL & ACTIVE SECTION NAVIGATION
  // ==========================================
  const siteHeader = document.getElementById('siteHeader');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    if (scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile Menu Toggle & Click-to-Close with Dimming Backdrop
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navBackdrop = document.getElementById('navBackdrop');

  function openMobileMenu() {
    if (navMenu) navMenu.classList.add('active');
    if (mobileToggle) mobileToggle.classList.add('active');
    if (navBackdrop) navBackdrop.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closeMobileMenu() {
    if (navMenu) navMenu.classList.remove('active');
    if (mobileToggle) mobileToggle.classList.remove('active');
    if (navBackdrop) navBackdrop.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navMenu.classList.contains('active')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeMobileMenu);
    }

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && e.target !== mobileToggle) {
        closeMobileMenu();
      }
    });
  }

  // Safe Smooth Scroll Navigation for all internal anchors (Prevents Edge file:// origin navigation error)
  const internalAnchors = document.querySelectorAll('a[href^="#"]');
  internalAnchors.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const hash = anchor.getAttribute('href');
      if (hash && hash.startsWith('#')) {
        e.preventDefault();
        closeMobileMenu();

        if (hash === '#' || hash === '#hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const targetEl = document.querySelector(hash);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });

  // Rotating Hero Typing Effect
  const typingTarget = document.getElementById('typingText');
  const phrases = [
    'Computer Science Student',
    'Aspiring Data Analyst',
    'Power BI & Tableau Specialist',
    'Python & SQL Developer'
  ];
  let phraseIndex = 0;
  let letterIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      typingTarget.textContent = currentPhrase.substring(0, letterIndex - 1);
      letterIndex--;
      typingSpeed = 45;
    } else {
      typingTarget.textContent = currentPhrase.substring(0, letterIndex + 1);
      letterIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && letterIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1800;
    } else if (isDeleting && letterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 350;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  if (typingTarget) {
    typeEffect();
  }

  // 3D Card Tilt Physics
  const tiltCards = document.querySelectorAll('.tilt-card, #avatar3DCard');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // Metrics Strip Counter
  const statsCounterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.counter');
        counters.forEach((counter) => {
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const duration = 1600;
          const stepTime = Math.abs(Math.floor(duration / target));

          const timer = setInterval(() => {
            count += 1;
            counter.textContent = count;
            if (count >= target) {
              counter.textContent = target;
              clearInterval(timer);
            }
          }, stepTime || 25);
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  const metricsStrip = document.getElementById('metricsStrip');
  if (metricsStrip) statsCounterObserver.observe(metricsStrip);

  // Dedicated Skills Card Animation & Progress Bar Fill Observer
  const skillsCard = document.querySelector('.skills-card');
  if (skillsCard) {
    const skillsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillItems = entry.target.querySelectorAll('.skill-item');
          skillItems.forEach((item, index) => {
            const fill = item.querySelector('.skill-bar-fill');
            const percentEl = item.querySelector('.skill-percent');
            const targetVal = parseInt(percentEl?.getAttribute('data-target') || '0', 10);

            setTimeout(() => {
              if (fill) fill.classList.add('animated');

              // Animate skill percentage count-up
              if (percentEl && targetVal > 0) {
                let current = 0;
                const duration = 1200;
                const stepTime = Math.max(12, Math.floor(duration / targetVal));
                const countTimer = setInterval(() => {
                  current += 1;
                  percentEl.textContent = `${current}%`;
                  if (current >= targetVal) {
                    percentEl.textContent = `${targetVal}%`;
                    clearInterval(countTimer);
                  }
                }, stepTime);
              }
            }, index * 120);
          });

          // Animate Tech Stack Pills with Stagger
          const techPills = entry.target.querySelectorAll('.tech-pill');
          techPills.forEach((pill, idx) => {
            setTimeout(() => {
              pill.classList.add('pill-animated');
            }, 500 + idx * 80);
          });

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    skillsObserver.observe(skillsCard);
  }

  // Project Filtering System
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category') || '';
        const categories = category.split(/\s+/);
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Red Laser Confetti Explosion
  function createRedLaserExplosion() {
    for (let i = 0; i < 35; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.width = `${Math.random() * 8 + 4}px`;
      particle.style.height = `${Math.random() * 8 + 4}px`;
      particle.style.backgroundColor = ['#ff1e42', '#ff003c', '#ff4b2b', '#ffffff', '#ff758c'][Math.floor(Math.random() * 5)];
      particle.style.borderRadius = '50%';
      particle.style.boxShadow = '0 0 10px #ff1e42';
      particle.style.zIndex = '9999';
      particle.style.pointerEvents = 'none';
      document.body.appendChild(particle);

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 280 + 120;
      const x = Math.cos(angle) * velocity;
      const y = Math.sin(angle) * velocity;

      particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${x}px, ${y}px) scale(0)`, opacity: 0 }
      ], {
        duration: 1000 + Math.random() * 500,
        easing: 'cubic-bezier(0.1, 1, 0.1, 1)'
      }).onfinish = () => particle.remove();
    }
  }

  // GitHub Heatmap Grid Population
  const heatmapGrid = document.getElementById('githubHeatmapGrid');
  if (heatmapGrid) {
    for (let i = 0; i < 130; i++) {
      const box = document.createElement('div');
      const randomWeight = Math.random();
      let lvl = 'lvl-1';
      if (randomWeight < 0.15) lvl = 'lvl-0';
      else if (randomWeight < 0.45) lvl = 'lvl-2';
      else if (randomWeight < 0.8) lvl = 'lvl-3';
      else lvl = 'lvl-4';

      box.className = `heat-box ${lvl}`;
      box.title = `Commit Activity: ${lvl === 'lvl-4' ? '12+ commits' : lvl === 'lvl-3' ? '7-11 commits' : 'Active commit'}`;
      heatmapGrid.appendChild(box);
    }
  }

  // Interactive Developer CLI Terminal
  const terminalForm = document.getElementById('terminalForm');
  const terminalInput = document.getElementById('terminalInput');
  const terminalBody = document.getElementById('terminalBody');
  const termChips = document.querySelectorAll('.term-chip');

  const commandResponses = {
    help: 'Available commands:\n- <strong class="text-red">skills</strong>: List mastered languages, analytics & BI tools\n- <strong class="text-red">projects</strong>: Overview of top analytics dashboards\n- <strong class="text-red">internship</strong>: Infosys Springboard Data Analytics experience\n- <strong class="text-red">education</strong>: College degree, coursework & CGPA\n- <strong class="text-red">certifications</strong>: NPTEL, TCS iON, Infosys & Cisco\n- <strong class="text-red">contact</strong>: Get Tejaswini\'s direct email & LinkedIn\n- <strong class="text-red">resume</strong>: Open interactive ATS resume preview\n- <strong class="text-red">clear</strong>: Clear terminal screen',
    skills: '⚡ Technical Arsenal:\n- Languages: Python, SQL, Java\n- Tools & BI: Power BI, Tableau, Microsoft Excel, VS Code, Power Query, DAX\n- Databases: MySQL\n- Specializations: Business Intelligence, Data Modeling, Visual Telemetry',
    projects: '📊 Featured Analytics Dashboards:\n1. Customer Segmentation & Behavior Analysis (Python, SQL, Power BI)\n2. Netflix Content & Global Streaming Trends (Tableau)\n3. Superstore Sales & Profitability Telemetry (Tableau)',
    internship: '🏢 Practical Industry Experience:\n- Infosys Springboard Virtual Internship 7.0 (Data Analytics & Business Intelligence)\n- Supply Chain Visibility System with Optimization Analytics, DAX KPIs & Power BI dashboards.',
    education: '🎓 Academic Credentials:\n- B.Tech in Computer Science & Engineering (2023 - 2027)\n- Vignan\'s Nirula Institute Of Technology And Science For Women | CGPA: 8.47 / 10.0\n- Narayana Junior College (Intermediate MPC): 96.0%\n- Oxford High School (Class X AP Board)',
    awards: '🏆 Accolades & Certifications:\n- 🌟 TCS iON NQT (IT): 75.55% Advanced Reasoning, 60.34% Python\n- 📜 NPTEL: The Joy of Computing using Python & Programming in Java\n- 📊 Infosys Springboard: Power BI Foundation & Power BI for Business Professionals\n- 🌐 Cisco Academy: Python Essentials\n- 💼 Deloitte: Data Analytics Job Simulation',
    certifications: '🏆 Accolades & Certifications:\n- 🌟 TCS iON NQT (IT): 75.55% Advanced Reasoning, 60.34% Python\n- 📜 NPTEL: The Joy of Computing using Python & Programming in Java\n- 📊 Infosys Springboard: Power BI Foundation & Power BI for Business Professionals\n- 🌐 Cisco Academy: Python Essentials\n- 💼 Deloitte: Data Analytics Job Simulation',
    contact: '📬 Let\'s Connect:\n- Email: tejaswinikapu7@gmail.com\n- LinkedIn: linkedin.com/in/kapu-tejaswini-48b4a0299',
    resume: '📄 Opening interactive in-browser resume viewer...',
    whoami: 'visitor@recruiter-console: You are viewing Tejaswini Kapu\'s Data Analytics Portfolio.',
    sudo: 'Permission denied: Tejaswini is the superuser!',
    date: `Current System Timestamp: ${new Date().toLocaleString()}`
  };

  function executeCommand(cmd) {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    const userLine = document.createElement('div');
    userLine.className = 'term-line command-line';
    userLine.innerHTML = `<span class="text-dim">tejaswini@dev:~$</span> ${cmd}`;
    terminalBody.appendChild(userLine);

    if (cleanCmd === 'clear') {
      terminalBody.innerHTML = '';
      return;
    }

    if (cleanCmd === 'resume') {
      openResumeModal();
    }

    const responseLine = document.createElement('div');
    responseLine.className = 'term-line output-line';
    
    if (commandResponses[cleanCmd]) {
      responseLine.innerHTML = commandResponses[cleanCmd].replace(/\n/g, '<br />');
    } else {
      responseLine.innerHTML = `<span class="text-red">Command not found: "${cmd}".</span> Type <strong class="text-red">help</strong> to see list of valid commands.`;
    }

    terminalBody.appendChild(responseLine);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  if (terminalForm && terminalInput) {
    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = terminalInput.value;
      terminalInput.value = '';
      executeCommand(val);
    });
  }

  termChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      executeCommand(cmd);
    });
  });

  // In-Browser Resume Modal
  const resumeModalBackdrop = document.getElementById('resumeModalBackdrop');
  const resumeModalCloseBtn = document.getElementById('resumeModalCloseBtn');
  const viewResumeNavBtn = document.getElementById('viewResumeNavBtn');
  const downloadResumeHeroBtn = document.getElementById('downloadResumeHeroBtn');
  const downloadCvBtn = document.getElementById('downloadCvBtn');
  const mobileResumeNavBtn = document.getElementById('mobileResumeNavBtn');
  const resumeDownloadDirectBtn = document.getElementById('resumeDownloadDirectBtn');

  function openResumeModal() {
    if (resumeModalBackdrop) resumeModalBackdrop.classList.add('active');
  }

  function closeResumeModal() {
    if (resumeModalBackdrop) resumeModalBackdrop.classList.remove('active');
  }

  if (viewResumeNavBtn) viewResumeNavBtn.addEventListener('click', openResumeModal);
  if (mobileResumeNavBtn) {
    mobileResumeNavBtn.addEventListener('click', () => {
      closeMobileMenu();
      openResumeModal();
    });
  }
  if (downloadResumeHeroBtn) downloadResumeHeroBtn.addEventListener('click', openResumeModal);
  if (downloadCvBtn) downloadCvBtn.addEventListener('click', openResumeModal);
  if (resumeModalCloseBtn) resumeModalCloseBtn.addEventListener('click', closeResumeModal);

  if (resumeModalBackdrop) {
    resumeModalBackdrop.addEventListener('click', (e) => {
      if (e.target === resumeModalBackdrop) closeResumeModal();
    });
  }

  if (resumeDownloadDirectBtn) {
    resumeDownloadDirectBtn.addEventListener('click', () => {
      showToast('PDF Download Initiated', 'Tejaswini Kapu’s Resume (PDF) is downloading.');
      createRedLaserExplosion();
    });
  }

  // Enhanced Case Study Project Modal
  const projectModalBackdrop = document.getElementById('projectModalBackdrop');
  const projectModalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTags = document.getElementById('modalTags');
  const modalArchText = document.getElementById('modalArchText');
  const modalFeaturesList = document.getElementById('modalFeaturesList');
  const openPreviewBtns = document.querySelectorAll('.open-preview-btn');
  const modalTabBtns = document.querySelectorAll('.modal-tab-btn');
  const modalTabArch = document.getElementById('modalTabArch');
  const modalTabFeatures = document.getElementById('modalTabFeatures');

  openPreviewBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const title = btn.getAttribute('data-title');
      const desc = btn.getAttribute('data-desc');
      const img = btn.getAttribute('data-img');
      const tags = btn.getAttribute('data-tags') ? btn.getAttribute('data-tags').split(',') : [];
      const arch = btn.getAttribute('data-arch') || 'Engineered with clean modular architecture and responsive CSS.';
      const features = btn.getAttribute('data-features') ? btn.getAttribute('data-features').split(',') : [];

      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalImg.src = img;
      modalArchText.textContent = arch;

      modalTags.innerHTML = '';
      tags.forEach((tag) => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'tag';
        tagSpan.textContent = tag.trim();
        modalTags.appendChild(tagSpan);
      });

      modalFeaturesList.innerHTML = '';
      features.forEach((feat) => {
        const li = document.createElement('li');
        li.textContent = feat.trim();
        modalFeaturesList.appendChild(li);
      });

      modalTabBtns.forEach((b) => b.classList.remove('active'));
      if (modalTabBtns[0]) modalTabBtns[0].classList.add('active');
      if (modalTabArch) modalTabArch.classList.remove('hidden');
      if (modalTabFeatures) modalTabFeatures.classList.add('hidden');

      projectModalBackdrop.classList.add('active');
    });
  });

  modalTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      modalTabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab');

      if (tab === 'arch') {
        if (modalTabArch) modalTabArch.classList.remove('hidden');
        if (modalTabFeatures) modalTabFeatures.classList.add('hidden');
      } else {
        if (modalTabArch) modalTabArch.classList.add('hidden');
        if (modalTabFeatures) modalTabFeatures.classList.remove('hidden');
      }
    });
  });

  if (projectModalCloseBtn) {
    projectModalCloseBtn.addEventListener('click', () => projectModalBackdrop.classList.remove('active'));
  }
  const modalCtaBtn = document.getElementById('modalCtaBtn');
  if (modalCtaBtn) {
    modalCtaBtn.addEventListener('click', () => {
      projectModalBackdrop.classList.remove('active');
    });
  }
  if (projectModalBackdrop) {
    projectModalBackdrop.addEventListener('click', (e) => {
      if (e.target === projectModalBackdrop) projectModalBackdrop.classList.remove('active');
    });
  }

  // Global ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeResumeModal();
      if (projectModalBackdrop) projectModalBackdrop.classList.remove('active');
    }
  });

  // Toast Notification
  const toast = document.getElementById('toastNotification');
  const toastTitle = document.getElementById('toastTitle');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer;

  function showToast(title, message) {
    if (!toast) return;
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    toast.classList.add('active');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('active');
    }, 4500);
  }

  // Contact Form Submission (Web3Forms Real Email Delivery with mailto fallback)
  const contactForm = document.getElementById('portfolioContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('userName').value.trim();
      const emailInput = document.getElementById('userEmail').value.trim();
      const messageInput = document.getElementById('userMessage').value.trim();
      const projectType = document.getElementById('projectType')?.value || 'General Inquiry';
      const accessKeyInput = document.getElementById('web3FormsKey');

      if (!nameInput || !emailInput || !messageInput) {
        showToast('Required Fields', 'Please fill in all details so I can get back to you.');
        return;
      }

      const submitBtn = document.getElementById('submitFormBtn');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending Message...</span>';
      submitBtn.disabled = true;

      const hasValidKey = accessKeyInput && accessKeyInput.value && accessKeyInput.value !== 'YOUR_ACCESS_KEY_HERE';

      if (hasValidKey) {
        try {
          const formData = new FormData(contactForm);
          const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
          });
          const result = await response.json();

          if (result.success) {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            contactForm.reset();
            showToast('Message Sent Directly! 🔥', `Thank you ${nameInput}! Your message was sent to Tejaswini's inbox. Expect a reply within 2-4 hours.`);
            createRedLaserExplosion();
          } else {
            throw new Error(result.message || 'Submission failed');
          }
        } catch (err) {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          // Fallback to direct Gmail Web Compose
          const subject = encodeURIComponent(`[Portfolio Inquiry] ${projectType} from ${nameInput}`);
          const body = encodeURIComponent(`Hello Tejaswini,\n\nName: ${nameInput}\nEmail: ${emailInput}\nPurpose: ${projectType}\n\nMessage:\n${messageInput}\n\n---\nSent from Portfolio Contact Form`);
          const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=tejaswinikapu7@gmail.com&su=${subject}&body=${body}`;
          window.open(gmailUrl, '_blank');
          showToast('Opening Gmail...', 'Direct Gmail compose window opened. Click Send to deliver your message!');
        }
      } else {
        // Instant direct Gmail web compose: opens pre-filled compose window directly to Tejaswini's Gmail!
        const subject = encodeURIComponent(`[Portfolio Inquiry] ${projectType} from ${nameInput}`);
        const body = encodeURIComponent(`Hello Tejaswini,\n\nName: ${nameInput}\nEmail: ${emailInput}\nPurpose: ${projectType}\n\nMessage:\n${messageInput}\n\n---\nSent from Portfolio Contact Form`);
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=tejaswinikapu7@gmail.com&su=${subject}&body=${body}`;

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          contactForm.reset();
          showToast('Opening Gmail... ✉️', `Thank you ${nameInput}! Opening your Gmail compose window to send directly to tejaswinikapu7@gmail.com...`);
          createRedLaserExplosion();
          window.open(gmailUrl, '_blank');
        }, 800);
      }
    });
  }
});
