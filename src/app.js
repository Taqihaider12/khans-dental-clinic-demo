// ==========================================================================
// 1. DATA STORES (DOCTORS DATA & SERVICES DETAILS)
// ==========================================================================
const DOCTORS_DATABASE = {
  "dr-mumtaz": {
    name: "Dr. Mumtaz A. Khan",
    title: "Founder & Lead Dental Surgeon",
    avatar: "/src/assets/doctors/dr_mumtaz.png",
    bio: "Dr. Mumtaz A. Khan is the visionary founder of Khan's Dental Clinic. With over 40 years of clinical experience, he has pioneered modern oral surgery and dental implantology in Karachi. A graduate of the prestigious de'Montmorency College of Dentistry, he has successfully treated thousands of patients, specializing in complicated extractions and full-mouth rehabilitations.",
    tags: ["Oral Surgery", "Dental Implants", "Prosthetic Design", "Bone Grafting"]
  },
  "dr-urooj": {
    name: "Dr. Urooj Mumtaz Khan",
    title: "Specialist Pediatric & Aesthetic Dentist",
    avatar: "/src/assets/doctors/dr_urooj.png",
    bio: "Dr. Urooj Mumtaz is a leading consultant Pediatric Dentist and Smile Makeover Specialist. She holds BDS and FCPS qualifications and has trained extensively in pediatric psychology and interceptive orthodontics. Known for her gentle, empathetic style, she utilizes custom nitrous oxide conscious sedation to deliver comfortable, anxiety-free dentistry to young children.",
    tags: ["Pediatric Care", "Conscious Sedation", "Veneers & Smile Design", "Invisalign"]
  },
  "prof-yawar": {
    name: "Prof. Dr. Yawar Ali Abidi",
    title: "Prosthodontics & Implant Specialist",
    avatar: "/src/assets/doctors/prof_yawar.png",
    bio: "Prof. Dr. Yawar Ali Abidi is a highly respected Academician and Head of the Prosthodontics Department. With 20+ years of specialty practice, he is an expert in crowns, bridges, removable dentures, and CAD/CAM ceramic restorations. He specializes in designing biocompatible teeth that restore natural speech, function, and high-end facial aesthetics.",
    tags: ["Full Mouth Rehab", "CAD/CAM Crowns", "Bridges & Partials", "Implant Prosthesis"]
  },
  "prof-fazal": {
    name: "Prof. Dr. Fazal Ur Rehman Qazi",
    title: "Periodontics Specialist",
    avatar: "/src/assets/doctors/prof_fazal.png",
    bio: "Prof. Dr. Fazal Ur Rehman Qazi is a senior consultant Periodontist. He specializes in gum health, treating advanced gingivitis and periodontitis. With credentials in laser therapies and gum surgeries, he focuses on salvaging loose teeth, correcting receding gums, and performing cosmetic gingivectomy (gum contouring).",
    tags: ["Laser Gum Treatment", "Gum Contouring", "Flap Surgery", "Bone Regeneration"]
  },
  "dr-bilal": {
    name: "Dr. Bilal Mumtaz Khan",
    title: "General & Endodontics Specialist",
    avatar: "/src/assets/doctors/dr_bilal.png",
    bio: "Dr. Bilal Mumtaz is an energetic general practitioner and specialist in Endodontics. He is renowned for carrying out painless, single-session root canal treatments under operating microscopes. He is also highly skilled in composite fillings, dental scaling, preventative dental care, and tooth whitenings.",
    tags: ["Rotary Root Canals", "Laser Teeth Whitening", "Aesthetic Composites", "Scaling & Polishing"]
  }
};

const CHATBOT_FAQ = {
  anxiety: {
    question: "How do you handle dental anxiety?",
    answer: "We provide specialized Conscious Sedation (commonly known as Nitrous Oxide or laughing gas) to eliminate dental anxiety safely. It induces a relaxed, floating sensation, allowing nervous children and adults to receive procedures completely stress-free."
  },
  children: {
    question: "Do you treat young children?",
    answer: "Yes! We have custom child-friendly operatories specifically decorated for pediatric patients. Led by Dr. Urooj Mumtaz Khan, our team uses cartoons, movies, toys, and gentle communication techniques to make visits fun."
  },
  xray: {
    question: "What digital equipment do you use?",
    answer: "Our practice is equipped with premium digital 3D OPG panoramic imaging for ultra-low radiation scans. We also partner with leading international labs for CAD/CAM same-day veneer and crown design."
  },
  hours: {
    question: "What are the clinic operating hours?",
    answer: "Our timings are: Monday to Thursday & Saturday: 9:30 AM – 8:00 PM. Friday: 9:30 AM – 1:00 PM & 3:00 PM – 8:00 PM (closed for Friday prayers from 1 to 3 PM). We are closed on Sundays."
  },
  location: {
    question: "Where is the clinic located?",
    answer: "We are located at 18, Hilltop Arcade, Gizri Boulevard, Phase 4 DHA, Karachi, Pakistan. Parking is secure and available directly outside the clinic."
  }
};

// ==========================================================================
// 2. NAVIGATION & MOBILE DRAWER
// ==========================================================================
// Navigation and mobile drawers will be initialized next.

// ==========================================================================
// 3. NAVIGATION & MOBILE DRAWER
// ==========================================================================
const initNavigation = () => {
  const hamburger = document.getElementById("hamburger-menu");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      
      const spans = hamburger.querySelectorAll("span");
      if (hamburger.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5deg, 5deg)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(6deg, -6deg)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        
        const spans = hamburger.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      });
    });
  }
};

// ==========================================================================
// 4. SMILE & TREATMENT FINDER FILTER
// ==========================================================================
const initTreatmentFinder = () => {
  const tabBtns = document.querySelectorAll(".finder-tab-btn");
  const cards = document.querySelectorAll(".treatment-card");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      tabBtns.forEach(b => b.setAttribute("aria-selected", "false"));
      
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      const category = btn.getAttribute("data-category");

      cards.forEach(card => {
        card.style.transition = "opacity 0.2s ease, transform 0.2s ease";
        if (category === "all" || card.getAttribute("data-category") === category) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(10px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 200);
        }
      });
    });
  });
};

// ==========================================================================
// 5. APPOINTMENT BOOKING ENGINE STATE & WIZARD FLOW
// ==========================================================================
const initBookingEngine = () => {
  const state = {
    step: 1,
    service: null,
    doctor: null,
    date: null,
    time: null,
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    patientNotes: ""
  };

  const bookingSection = document.getElementById("booking-section");
  const stepIndicators = document.querySelectorAll(".step-indicator");
  const panels = document.querySelectorAll(".booking-panel");
  const backBtn = document.getElementById("booking-back-btn");
  const nextBtn = document.getElementById("booking-next-btn");
  const summaryText = document.getElementById("booking-summary-text");
  
  const triggerBookingBtns = document.querySelectorAll(".trigger-booking");
  triggerBookingBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth" });
        const card = bookingSection.querySelector(".booking-card");
        if (card) {
          card.style.transform = "scale(1.01)";
          card.style.borderColor = "var(--color-accent)";
          setTimeout(() => {
            card.style.transform = "none";
            card.style.borderColor = "var(--color-slate-medium)";
          }, 800);
        }
      }
    });
  });

  const serviceCards = document.querySelectorAll("#panel-1 .option-card");
  serviceCards.forEach(card => {
    card.addEventListener("click", () => {
      serviceCards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      state.service = card.getAttribute("data-value");
      updateWizardUI();
    });
  });

  const doctorCards = document.querySelectorAll("#panel-2 .option-card");
  doctorCards.forEach(card => {
    card.addEventListener("click", () => {
      doctorCards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      state.doctor = card.getAttribute("data-value");
      updateWizardUI();
    });
  });

  const dateInput = document.getElementById("booking-date");
  const timeGrid = document.getElementById("time-slots-grid");

  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;

    dateInput.addEventListener("input", (e) => {
      const selectedDateString = e.target.value;
      const selectedDate = new Date(selectedDateString);
      const dayOfWeek = selectedDate.getDay();

      const dateError = document.getElementById("date-error");
      dateError.textContent = "";
      dateInput.classList.remove("invalid");

      if (dayOfWeek === 0) {
        dateError.textContent = "The clinic is closed on Sundays. Please select a day from Monday to Saturday.";
        dateInput.classList.add("invalid");
        state.date = null;
        state.time = null;
        renderTimeSlots([]);
        updateWizardUI();
        return;
      }

      state.date = selectedDateString;
      state.time = null;
      generateTimeSlots(selectedDate);
      updateWizardUI();
    });
  }

  const generateTimeSlots = (selectedDate) => {
    const day = selectedDate.getDay();
    const slots = [];
    const isFriday = (day === 5);

    let currentHour = 9;
    let currentMin = 30;

    const today = new Date();
    const isToday = selectedDate.toDateString() === today.toDateString();
    const currentHourNow = today.getHours();
    const currentMinNow = today.getMinutes();

    const formatTime = (h, m) => {
      const suffix = h >= 12 ? "PM" : "AM";
      const displayHour = h > 12 ? h - 12 : h;
      const displayMin = String(m).padStart(2, '0');
      return `${displayHour}:${displayMin} ${suffix}`;
    };

    while (currentHour < 20) {
      let skipFridayBreak = false;
      if (isFriday) {
        const timeDecimal = currentHour + currentMin / 60;
        if (timeDecimal >= 13 && timeDecimal < 15) {
          skipFridayBreak = true;
        }
      }

      const slotText = formatTime(currentHour, currentMin);
      
      let disabled = false;
      if (isToday) {
        if (currentHour < currentHourNow || (currentHour === currentHourNow && currentMin <= currentMinNow)) {
          disabled = true;
        }
      }

      if (!skipFridayBreak) {
        slots.push({
          time: slotText,
          disabled: disabled
        });
      }

      currentMin += 30;
      if (currentMin >= 60) {
        currentHour += 1;
        currentMin = 0;
      }
    }

    renderTimeSlots(slots);
  };

  const renderTimeSlots = (slots) => {
    if (!timeGrid) return;
    timeGrid.innerHTML = "";

    if (slots.length === 0) {
      timeGrid.innerHTML = `<div class="time-slot disabled" style="grid-column: span 2;">No slots available</div>`;
      return;
    }

    slots.forEach(slot => {
      const div = document.createElement("div");
      div.className = `time-slot ${slot.disabled ? 'disabled' : ''}`;
      div.textContent = slot.time;
      
      if (!slot.disabled) {
        div.addEventListener("click", () => {
          const allSlots = timeGrid.querySelectorAll(".time-slot");
          allSlots.forEach(s => s.classList.remove("selected"));
          div.classList.add("selected");
          state.time = slot.time;
          
          document.getElementById("time-error").textContent = "";
          updateWizardUI();
        });
      }
      timeGrid.appendChild(div);
    });
  };

  const patientForm = document.getElementById("booking-patient-form");
  const nameInput = document.getElementById("patient-name");
  const emailInput = document.getElementById("patient-email");
  const phoneInput = document.getElementById("patient-phone");
  const privacyCheck = document.getElementById("privacy-check");

  const validateForm = () => {
    let isValid = true;
    
    document.querySelectorAll(".invalid-feedback").forEach(el => el.textContent = "");
    document.querySelectorAll(".form-control").forEach(el => el.classList.remove("invalid"));

    if (!nameInput.value || nameInput.value.trim().length < 3) {
      document.getElementById("name-error").textContent = "Please enter your full name (minimum 3 characters).";
      nameInput.classList.add("invalid");
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value || !emailRegex.test(emailInput.value)) {
      document.getElementById("email-error").textContent = "Please enter a valid email address.";
      emailInput.classList.add("invalid");
      isValid = false;
    }

    const cleanedPhone = phoneInput.value.replace(/\s+/g, '');
    const pkPhoneRegex = /^((\+92-?)|(92)|0)?(3\d{2}-?\d{7}|21-?\d{8})$/;

    if (!phoneInput.value || !pkPhoneRegex.test(cleanedPhone)) {
      document.getElementById("phone-error").textContent = "Please enter a valid Pakistani number (e.g. 0300-1234567 or 021-35866523).";
      phoneInput.classList.add("invalid");
      isValid = false;
    }

    if (!privacyCheck.checked) {
      document.getElementById("privacy-error").textContent = "You must consent to receive SMS/Email reminders to schedule.";
      isValid = false;
    }

    return isValid;
  };

  [nameInput, emailInput, phoneInput].forEach(inp => {
    if (inp) {
      inp.addEventListener("input", () => {
        inp.classList.remove("invalid");
        const errId = `${inp.id.split("-")[1]}-error`;
        const errEl = document.getElementById(errId);
        if (errEl) errEl.textContent = "";
      });
    }
  });

  if (privacyCheck) {
    privacyCheck.addEventListener("change", () => {
      document.getElementById("privacy-error").textContent = "";
    });
  }

  const updateWizardUI = () => {
    stepIndicators.forEach((ind, index) => {
      const stepIdx = index + 1;
      ind.classList.remove("active", "completed");
      if (stepIdx === state.step) {
        ind.classList.add("active");
      } else if (stepIdx < state.step) {
        ind.classList.add("completed");
      }
    });

    panels.forEach((panel, index) => {
      const panelIdx = index + 1;
      if (panelIdx === state.step) {
        panel.classList.add("active");
      } else {
        panel.classList.remove("active");
      }
    });

    if (state.step > 1) {
      backBtn.style.display = "inline-flex";
    } else {
      backBtn.style.display = "none";
    }

    const chatbotToggle = document.getElementById("chatbot-toggle");
    if (chatbotToggle) {
      if (state.step > 1) {
        chatbotToggle.style.opacity = "0";
        chatbotToggle.style.pointerEvents = "none";
      } else {
        chatbotToggle.style.opacity = "1";
        chatbotToggle.style.pointerEvents = "auto";
      }
    }

    if (state.step === 4) {
      nextBtn.textContent = "Confirm Booking";
    } else {
      nextBtn.textContent = "Next Step";
    }

    let desc = "Select a treatment specialty to begin.";
    if (state.service) {
      desc = `Selected: <strong>${state.service}</strong>`;
    }
    if (state.doctor) {
      desc += ` • Specialist: <strong>${state.doctor}</strong>`;
    }
    if (state.date) {
      const formattedDate = new Date(state.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      desc += `<br>Date: <strong>${formattedDate}</strong>`;
    }
    if (state.time) {
      desc += ` at <strong>${state.time}</strong>`;
    }
    summaryText.innerHTML = desc;
  };

  nextBtn.addEventListener("click", () => {
    if (state.step === 1) {
      if (!state.service) {
        summaryText.innerHTML = `<span style="color:#EF4444; font-weight:700;">Please select a service card to continue.</span>`;
        return;
      }
      state.step = 2;
      updateWizardUI();
    }
    else if (state.step === 2) {
      if (!state.doctor) {
        summaryText.innerHTML = `<span style="color:#EF4444; font-weight:700;">Please choose a doctor card (or Any Doctor) to continue.</span>`;
        return;
      }
      state.step = 3;
      updateWizardUI();
    }
    else if (state.step === 3) {
      let valid = true;
      if (!state.date) {
        document.getElementById("date-error").textContent = "Please pick a valid consultation date.";
        dateInput.classList.add("invalid");
        valid = false;
      }
      if (!state.time) {
        document.getElementById("time-error").textContent = "Please select an available appointment slot.";
        valid = false;
      }
      if (!valid) return;
      state.step = 4;
      updateWizardUI();
    }
    else if (state.step === 4) {
      if (!validateForm()) return;

      state.patientName = nameInput.value;
      state.patientEmail = emailInput.value;
      state.patientPhone = phoneInput.value;
      state.patientNotes = document.getElementById("patient-notes").value;

      processBookingSubmission();
    }
  });

  backBtn.addEventListener("click", () => {
    if (state.step > 1) {
      state.step -= 1;
      updateWizardUI();
    }
  });

  const processBookingSubmission = () => {
    const refNum = Math.floor(10000 + Math.random() * 90000);
    const refId = `KDC-${refNum}`;

    document.getElementById("conf-ref-id").textContent = refId;
    document.getElementById("conf-patient-name").textContent = state.patientName;
    document.getElementById("conf-service").textContent = state.service;
    document.getElementById("conf-doctor").textContent = state.doctor;

    const formattedDate = new Date(state.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    document.getElementById("conf-datetime").textContent = `${formattedDate} • ${state.time}`;

    const confModal = document.getElementById("confirm-modal");
    if (confModal) {
      confModal.style.display = "flex";
    }

    resetBookingWizard();
  };

  const resetBookingWizard = () => {
    state.step = 1;
    state.service = null;
    state.doctor = null;
    state.date = null;
    state.time = null;
    state.patientName = "";
    state.patientEmail = "";
    state.patientPhone = "";
    state.patientNotes = "";

    serviceCards.forEach(c => c.classList.remove("selected"));
    doctorCards.forEach(c => c.classList.remove("selected"));
    if (dateInput) dateInput.value = "";
    if (timeGrid) timeGrid.innerHTML = `<div class="time-slot disabled">Please select a date first</div>`;
    if (patientForm) patientForm.reset();

    updateWizardUI();
  };

  const confirmCloseBtn = document.getElementById("confirm-close-btn");
  const confModal = document.getElementById("confirm-modal");
  if (confirmCloseBtn && confModal) {
    confirmCloseBtn.addEventListener("click", () => {
      confModal.style.display = "none";
    });
    
    confModal.addEventListener("click", (e) => {
      if (e.target === confModal) {
        confModal.style.display = "none";
      }
    });
  }

  updateWizardUI();
};

// ==========================================================================
// 6. SPECIALIST BIOS POPUP DIALOG HANDLERS
// ==========================================================================
const initSpecialistBios = () => {
  const modal = document.getElementById("bio-modal");
  const closeBtn = document.getElementById("bio-close-btn");
  const openBtns = document.querySelectorAll(".open-bio");

  if (!modal || !closeBtn) return;

  const openModal = (doctorId) => {
    const docData = DOCTORS_DATABASE[doctorId];
    if (!docData) return;

    document.getElementById("bio-avatar-img").src = docData.avatar;
    document.getElementById("bio-avatar-img").alt = docData.name;
    document.getElementById("bio-doctor-name").textContent = docData.name;
    document.getElementById("bio-doctor-title").textContent = docData.title;
    document.getElementById("bio-doctor-text").textContent = docData.bio;

    const tagsContainer = document.getElementById("bio-doctor-tags");
    if (tagsContainer) {
      tagsContainer.innerHTML = "";
      docData.tags.forEach(tag => {
        const span = document.createElement("span");
        span.className = "bio-tag";
        span.textContent = tag;
        tagsContainer.appendChild(span);
      });
    }

    modal.style.display = "flex";
  };

  openBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      openModal(targetId);
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
};

// ==========================================================================
// 7. TESTIMONIALS SLIDER CAROUSEL LOGIC
// ==========================================================================
const initTestimonialsSlider = () => {
  const track = document.getElementById("testimonials-track");
  const dots = document.querySelectorAll(".slider-dot");
  const prevBtn = document.getElementById("slider-prev-btn");
  const nextBtn = document.getElementById("slider-next-btn");

  if (!track || dots.length === 0) return;

  let currentSlide = 0;
  const slideCount = dots.length;
  let autoplayTimer;

  const updateSlider = (index) => {
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });

    resetAutoplay();
  };

  const nextSlide = () => {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= slideCount) {
      nextIndex = 0;
    }
    updateSlider(nextIndex);
  };

  const prevSlide = () => {
    let prevIndex = currentSlide - 1;
    if (prevIndex < 0) {
      prevIndex = slideCount - 1;
    }
    updateSlider(prevIndex);
  };

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const targetIdx = parseInt(dot.getAttribute("data-slide"));
      updateSlider(targetIdx);
    });
  });

  if (prevBtn) prevBtn.addEventListener("click", prevSlide);
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);

  const startAutoplay = () => {
    autoplayTimer = setInterval(nextSlide, 5000);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayTimer);
    startAutoplay();
  };

  startAutoplay();
};

// ==========================================================================
// 8. FAQ ACCORDION TRANSITIONS LOGIC
// ==========================================================================
const initFaqAccordion = () => {
  const faqHeaders = document.querySelectorAll(".faq-header");

  faqHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const body = header.nextElementSibling;
      const isActive = item.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          otherItem.querySelector(".faq-body").style.maxHeight = null;
          otherItem.querySelector(".faq-header").setAttribute("aria-expanded", "false");
        }
      });

      if (isActive) {
        item.classList.remove("active");
        body.style.maxHeight = null;
        header.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("active");
        body.style.maxHeight = body.scrollHeight + "px";
        header.setAttribute("aria-expanded", "true");
      }
    });
  });
};

// ==========================================================================
// 9. FAQ CHATBOT WIDGET LOGIC
// ==========================================================================
const initChatbot = () => {
  const toggleBtn = document.getElementById("chatbot-toggle");
  const closeBtn = document.getElementById("chatbot-close");
  const panel = document.getElementById("chatbot-panel");
  const messagesContainer = document.getElementById("chatbot-messages");
  const textInput = document.getElementById("chatbot-text-input");
  const sendBtn = document.getElementById("chatbot-send-btn");
  const openIcon = document.getElementById("chat-icon-open");
  const closeIcon = document.getElementById("chat-icon-close");

  if (!toggleBtn || !panel || !messagesContainer) return;

  const toggleChat = () => {
    const isVisible = panel.style.display === "flex";
    if (isVisible) {
      panel.style.display = "none";
      openIcon.style.display = "block";
      closeIcon.style.display = "none";
      toggleBtn.style.opacity = "1";
      toggleBtn.style.pointerEvents = "auto";
    } else {
      panel.style.display = "flex";
      openIcon.style.display = "none";
      closeIcon.style.display = "block";
      toggleBtn.style.opacity = "0";
      toggleBtn.style.pointerEvents = "none";
      scrollChatToBottom();
      if (textInput) textInput.focus();
    }
  };

  toggleBtn.addEventListener("click", toggleChat);
  if (closeBtn) closeBtn.addEventListener("click", toggleChat);

  const scrollChatToBottom = () => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  const appendMessage = (sender, text) => {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = text;
    messagesContainer.appendChild(bubble);
    scrollChatToBottom();
  };

  const showTypingIndicator = () => {
    const indicator = document.createElement("div");
    indicator.className = "typing-indicator bot";
    indicator.id = "chatbot-typing-indicator";
    indicator.innerHTML = `
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    `;
    messagesContainer.appendChild(indicator);
    scrollChatToBottom();
  };

  const removeTypingIndicator = () => {
    const indicator = document.getElementById("chatbot-typing-indicator");
    if (indicator) indicator.remove();
  };

  const appendFAQChips = () => {
    const oldChips = document.getElementById("chatbot-chips");
    if (oldChips) oldChips.remove();

    const chipsContainer = document.createElement("div");
    chipsContainer.className = "chatbot-chips-container";
    chipsContainer.id = "chatbot-chips";
    
    Object.keys(CHATBOT_FAQ).forEach(key => {
      const btn = document.createElement("button");
      btn.className = "chat-chip";
      btn.textContent = CHATBOT_FAQ[key].question;
      btn.addEventListener("click", () => {
        handleUserMessage(CHATBOT_FAQ[key].question, key);
      });
      chipsContainer.appendChild(btn);
    });

    messagesContainer.appendChild(chipsContainer);
    scrollChatToBottom();
  };

  const handleUserMessage = (userText, faqKey = null) => {
    if (!userText.trim()) return;

    appendMessage("user", userText);
    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      
      let botResponse = "";
      if (faqKey && CHATBOT_FAQ[faqKey]) {
        botResponse = CHATBOT_FAQ[faqKey].answer;
      } else {
        botResponse = analyzeInputKeywords(userText);
      }

      appendMessage("bot", botResponse);
      appendFAQChips();
    }, 1000);
  };

  const analyzeInputKeywords = (text) => {
    const lowerText = text.toLowerCase();

    if (lowerText.includes("anxi") || lowerText.includes("fear") || lowerText.includes("scare") || lowerText.includes("pain") || lowerText.includes("sedat") || lowerText.includes("nerv")) {
      return CHATBOT_FAQ.anxiety.answer;
    }
    if (lowerText.includes("kid") || lowerText.includes("child") || lowerText.includes("baby") || lowerText.includes("son") || lowerText.includes("daught") || lowerText.includes("pediatr")) {
      return CHATBOT_FAQ.children.answer;
    }
    if (lowerText.includes("opg") || lowerText.includes("3d") || lowerText.includes("xray") || lowerText.includes("x-ray") || lowerText.includes("cad") || lowerText.includes("cam") || lowerText.includes("digit") || lowerText.includes("tech") || lowerText.includes("equip")) {
      return CHATBOT_FAQ.xray.answer;
    }
    if (lowerText.includes("hour") || lowerText.includes("time") || lowerText.includes("open") || lowerText.includes("close") || lowerText.includes("timings") || lowerText.includes("friday") || lowerText.includes("saturday") || lowerText.includes("sunday")) {
      return CHATBOT_FAQ.hours.answer;
    }
    if (lowerText.includes("locat") || lowerText.includes("address") || lowerText.includes("where") || lowerText.includes("map") || lowerText.includes("gizri") || lowerText.includes("dha")) {
      return CHATBOT_FAQ.location.answer;
    }
    if (lowerText.includes("book") || lowerText.includes("appoint") || lowerText.includes("schedul") || lowerText.includes("visit") || lowerText.includes("consult")) {
      return "To book an appointment instantly, scroll up to our **Schedule Your Consultation** wizard or click the 'Book Appointment' button in the navigation bar! You can also call us directly at (021) 35866523.";
    }
    if (lowerText.includes("phone") || lowerText.includes("call") || lowerText.includes("number") || lowerText.includes("contact") || lowerText.includes("email") || lowerText.includes("gmail")) {
      return "You can reach us by phone at **(021) 35866523**, **(021) 35822449**, or **(021) 35373123**. You can also email us at **khansdentalclinic@gmail.com**.";
    }
    if (lowerText.includes("hello") || lowerText.includes("hi") || lowerText.includes("hey") || lowerText.includes("aoa") || lowerText.includes("salam")) {
      return "Hello! Warm greetings from Khan's Dental Clinic. How can we serve you today?";
    }
    if (lowerText.includes("whatsapp") || lowerText.includes("chat") || lowerText.includes("text") || lowerText.includes("mobile")) {
      return "You can chat directly with our Karachi reception team on WhatsApp by clicking the **Chat on WhatsApp** button in our greeting above, or click here: <a href='https://wa.me/922135866523' target='_blank' rel='noopener noreferrer' style='color:var(--color-accent-dark); font-weight:700;'>Start WhatsApp Chat</a>.";
    }

    return "I'm happy to help! For appointment bookings, please use our schedule wizard or call us. If you have other questions, feel free to ask about our clinic hours, location, conscious sedation anxiety care, pediatric dental setups, or OPG equipment.";
  };

  if (sendBtn && textInput) {
    sendBtn.addEventListener("click", () => {
      const text = textInput.value;
      handleUserMessage(text);
      textInput.value = "";
    });

    textInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const text = textInput.value;
        handleUserMessage(text);
        textInput.value = "";
      }
    });
  }

  const initialChips = document.querySelectorAll("#chatbot-chips .chat-chip");
  initialChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const faqKey = chip.getAttribute("data-faq");
      if (CHATBOT_FAQ[faqKey]) {
        handleUserMessage(CHATBOT_FAQ[faqKey].question, faqKey);
      }
    });
  });
};

// ==========================================================================
// 10. OTHER INTERACTIVE BINDINGS & FORM HANDLERS
// ==========================================================================
const initOtherHandlers = () => {
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector("input[type='email']");
      if (emailInput && emailInput.value) {
        alert(`Thank you for subscribing! We will send updates to ${emailInput.value}.`);
        newsletterForm.reset();
      }
    });
  }
};

// ==========================================================================
// INITIALIZE APPLICATION MODULES ON LOAD
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initTreatmentFinder();
  initBookingEngine();
  initSpecialistBios();
  initTestimonialsSlider();
  initFaqAccordion();
  initChatbot();
  initOtherHandlers();
});
