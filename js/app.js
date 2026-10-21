/**
 * ====================================================================
 * SmileCare Dental Studio - Core JavaScript Application
 * ====================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all core subsystems
  initClinicDetails();
  initNavigation();
  initTreatmentFilters();
  initAmbienceGallery();
  initAppointmentBooking();
  initQuickActions();
  initDemoCustomizer();
});

/**
 * 1. Synchronize Clinic Configuration Across DOM
 */
function initClinicDetails() {
  const config = window.CLINIC_CONFIG || {};
  if (!config.name) return;

  // Update Clinic Name
  document.querySelectorAll(".clinic-name-text").forEach(el => {
    el.textContent = config.name;
  });

  // Update Phone Numbers
  if (config.contact && config.contact.phone) {
    document.querySelectorAll(".clinic-phone-text").forEach(el => {
      el.textContent = config.contact.phone;
    });
    document.querySelectorAll(".clinic-phone-link").forEach(el => {
      el.href = `tel:${config.contact.phoneRaw || config.contact.phone}`;
    });
  }

  // Update WhatsApp
  if (config.contact && config.contact.whatsapp) {
    document.querySelectorAll(".clinic-whatsapp-link").forEach(el => {
      const cleanNumber = config.contact.whatsappRaw || config.contact.whatsapp.replace(/\D/g, "");
      el.href = `https://wa.me/${cleanNumber}?text=${encodeURIComponent("Hello " + config.name + ", I would like to inquire about a dental appointment.")}`;
    });
  }

  // Update Email
  if (config.contact && config.contact.email) {
    document.querySelectorAll(".clinic-email-text").forEach(el => {
      el.textContent = config.contact.email;
    });
    document.querySelectorAll(".clinic-email-link").forEach(el => {
      el.href = `mailto:${config.contact.email}`;
    });
  }

  // Update Address
  if (config.contact && config.contact.address) {
    const addr = config.contact.address;
    document.querySelectorAll(".clinic-address-text").forEach(el => {
      el.textContent = `${addr.line1}, ${addr.area || ""}, ${addr.city}, ${addr.state} - ${addr.pincode}`;
    });
  }

  // Update Working Hours
  if (config.contact && config.contact.hours) {
    document.querySelectorAll(".clinic-hours-weekdays").forEach(el => {
      el.textContent = config.contact.hours.weekdays;
    });
    document.querySelectorAll(".clinic-hours-sunday").forEach(el => {
      el.textContent = config.contact.hours.sunday;
    });
  }
}

/**
 * 2. Navigation & Mobile Drawer Behavior
 */
function initNavigation() {
  const header = document.querySelector(".site-header");
  const menuToggle = document.getElementById("mobileMenuToggle");
  const mobileNav = document.getElementById("mobileNav");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  // Sticky Header elevation on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });

  // Mobile menu toggle
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.contains("active");
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    // Close mobile nav when clicking outside panel
    mobileNav.addEventListener("click", (e) => {
      if (e.target === mobileNav) {
        closeMobileNav();
      }
    });

    // Close mobile nav when clicking any link
    mobileNavLinks.forEach(link => {
      link.addEventListener("click", () => {
        closeMobileNav();
      });
    });
  }

  function openMobileNav() {
    mobileNav.classList.add("active");
    menuToggle.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMobileNav() {
    mobileNav.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  // Active link highlighting on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, { passive: true });
}

/**
 * 3. Treatment Filter Tabs & Quick Booking Hook
 */
function initTreatmentFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const treatmentCards = document.querySelectorAll(".treatment-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");

      treatmentCards.forEach(card => {
        const cardCat = card.getAttribute("data-category");
        if (category === "all" || cardCat.includes(category)) {
          card.style.display = "flex";
          card.style.animation = "fadeInUp 0.35s ease forwards";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Connect Treatment "Book Consultation" buttons to auto-select treatment
  const treatmentBookBtns = document.querySelectorAll(".book-treatment-btn");
  const treatmentSelect = document.getElementById("preferredTreatment");
  const bookingSection = document.getElementById("booking");

  treatmentBookBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const treatmentName = btn.getAttribute("data-treatment");
      if (treatmentSelect && treatmentName) {
        treatmentSelect.value = treatmentName;
      }
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth" });
        // Subtle focus pulse
        setTimeout(() => {
          if (treatmentSelect) {
            treatmentSelect.focus();
            treatmentSelect.style.borderColor = "var(--primary)";
          }
        }, 600);
      }
    });
  });
}

/**
 * 4. Ambience Image Lightbox Modal
 */
function initAmbienceGallery() {
  const cards = document.querySelectorAll(".ambience-card");
  const lightbox = document.getElementById("ambienceLightbox");
  const lightboxImg = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");

  if (!lightbox) return;

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      const title = card.querySelector("h4");
      const desc = card.querySelector("p");

      if (img && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      }
      if (lightboxCaption) {
        lightboxCaption.textContent = title ? `${title.textContent} - ${desc ? desc.textContent : ""}` : "";
      }
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
}

/**
 * 5. Appointment Booking Form Validation & Interactive Demo Confirmation
 */
function initAppointmentBooking() {
  const form = document.getElementById("appointmentForm");
  const dateInput = document.getElementById("appointmentDate");
  const modal = document.getElementById("bookingModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalWhatsAppBtn = document.getElementById("modalWhatsAppBtn");
  const modalCopyBtn = document.getElementById("modalCopyBtn");

  // Prevent selecting past dates
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
    // Pre-fill tomorrow as a convenient default
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split("T")[0];
  }

  if (!form) return;

  // Real-time input error clearing
  form.querySelectorAll("input, select, textarea").forEach(input => {
    input.addEventListener("input", () => {
      clearFieldError(input);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    // 1. Patient Name Validation
    const nameInput = document.getElementById("patientName");
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      showFieldError(nameInput, "Please enter your full name (minimum 2 characters)");
      isValid = false;
    } else {
      clearFieldError(nameInput);
    }

    // 2. Mobile Number Validation (Indian Mobile Format: 10 digits starting with 6, 7, 8, or 9)
    const phoneInput = document.getElementById("patientPhone");
    const phoneVal = phoneInput.value.trim().replace(/\D/g, "");
    // Check if 10 digits or 12 digits (with 91 prefix)
    const isValidIndianNumber = (phoneVal.length === 10 && /^[6-9]\d{9}$/.test(phoneVal)) ||
                                (phoneVal.length === 12 && phoneVal.startsWith("91") && /^[6-9]/.test(phoneVal.slice(2)));

    if (!isValidIndianNumber) {
      showFieldError(phoneInput, "Please enter a valid 10-digit Indian mobile number (e.g., 98765 43210)");
      isValid = false;
    } else {
      clearFieldError(phoneInput);
    }

    // 3. Email Validation (Optional, but validate format if entered)
    const emailInput = document.getElementById("patientEmail");
    if (emailInput.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        showFieldError(emailInput, "Please enter a valid email address");
        isValid = false;
      } else {
        clearFieldError(emailInput);
      }
    } else {
      clearFieldError(emailInput);
    }

    // 4. Treatment Selection Validation
    const treatmentInput = document.getElementById("preferredTreatment");
    if (!treatmentInput.value) {
      showFieldError(treatmentInput, "Please select your preferred dental treatment");
      isValid = false;
    } else {
      clearFieldError(treatmentInput);
    }

    // 5. Date Validation
    if (!dateInput.value) {
      showFieldError(dateInput, "Please pick an appointment date");
      isValid = false;
    } else {
      clearFieldError(dateInput);
    }

    // 6. Selected Time Slot
    const selectedSlot = form.querySelector('input[name="preferredTime"]:checked');
    const timeSlotLabel = selectedSlot ? selectedSlot.value : "Morning (09:00 AM – 01:00 PM)";

    if (!isValid) {
      // Smooth scroll to the first error
      const firstError = form.querySelector(".form-control.error");
      if (firstError) {
        firstError.focus();
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Build Form Submission Object
    const appointmentData = {
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      email: emailInput.value.trim() || "Not provided",
      treatment: treatmentInput.options[treatmentInput.selectedIndex].text,
      date: formatDateIndian(dateInput.value),
      timeSlot: timeSlotLabel,
      notes: document.getElementById("patientNotes").value.trim() || "None",
      referenceId: "SMILE-" + Math.floor(100000 + Math.random() * 900000)
    };

    // Populate Modal Summary Ticket
    document.getElementById("ticketRefId").textContent = appointmentData.referenceId;
    document.getElementById("ticketPatient").textContent = appointmentData.name;
    document.getElementById("ticketPhone").textContent = appointmentData.phone;
    document.getElementById("ticketTreatment").textContent = appointmentData.treatment;
    document.getElementById("ticketDate").textContent = appointmentData.date;
    document.getElementById("ticketTime").textContent = appointmentData.timeSlot;

    // Prepare WhatsApp Message Link
    const clinicConfig = window.CLINIC_CONFIG || {};
    const whatsappNum = clinicConfig.contact?.whatsappRaw || "919876543210";
    const waText = `*New Dental Appointment Request - ${clinicConfig.name || "SmileCare"}*

*Booking Ref:* ${appointmentData.referenceId}
*Patient Name:* ${appointmentData.name}
*Mobile:* ${appointmentData.phone}
*Treatment:* ${appointmentData.treatment}
*Preferred Date:* ${appointmentData.date}
*Preferred Time:* ${appointmentData.timeSlot}
*Notes:* ${appointmentData.notes}

Please confirm my appointment slot. Thank you!`;

    if (modalWhatsAppBtn) {
      modalWhatsAppBtn.href = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(waText)}`;
    }

    // Copy to clipboard handler
    if (modalCopyBtn) {
      modalCopyBtn.onclick = () => {
        navigator.clipboard.writeText(waText).then(() => {
          modalCopyBtn.textContent = "✓ Copied to Clipboard!";
          setTimeout(() => {
            modalCopyBtn.innerHTML = `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg> Copy Booking Details`;
          }, 2500);
        });
      };
    }

    // Show confirmation modal
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    // Reset Form
    form.reset();
    if (dateInput) {
      dateInput.value = tomorrow.toISOString().split("T")[0];
    }
  });

  // Modal Close
  function closeModal() {
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
}

function showFieldError(input, message) {
  input.classList.add("error");
  const errorEl = input.closest(".form-group")?.querySelector(".error-message");
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add("visible");
  }
}

function clearFieldError(input) {
  input.classList.remove("error");
  const errorEl = input.closest(".form-group")?.querySelector(".error-message");
  if (errorEl) {
    errorEl.textContent = "";
    errorEl.classList.remove("visible");
  }
}

function formatDateIndian(isoDateString) {
  if (!isoDateString) return "";
  const parts = isoDateString.split("-");
  if (parts.length === 3) {
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    return d.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }
  return isoDateString;
}

/**
 * 6. Quick Action Floating Buttons (Scroll to Top)
 */
function initQuickActions() {
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      scrollTopBtn?.classList.add("visible");
    } else {
      scrollTopBtn?.classList.remove("visible");
    }
  }, { passive: true });

  scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/**
 * 7. Live Demo Customizer Drawer
 * Enables the freelancer to personalize the clinic name, phone, city & theme color
 * right in front of the prospective clinic client!
 */
function initDemoCustomizer() {
  const toggleBtn = document.getElementById("customizerToggle");
  const drawer = document.getElementById("customizerDrawer");
  const closeBtn = document.getElementById("customizerClose");
  const applyBtn = document.getElementById("customizerApply");

  if (!toggleBtn || !drawer) return;

  // Restore saved demo preferences if any
  try {
    const saved = localStorage.getItem("smilecare_demo_config");
    if (saved) {
      const data = JSON.parse(saved);
      if (data.name) window.CLINIC_CONFIG.name = data.name;
      if (data.phone) {
        window.CLINIC_CONFIG.contact.phone = data.phone;
        window.CLINIC_CONFIG.contact.phoneRaw = data.phone.replace(/\D/g, "");
      }
      if (data.area && window.CLINIC_CONFIG.contact?.address) {
        window.CLINIC_CONFIG.contact.address.area = data.area;
      }
      initClinicDetails();
    }
  } catch (e) {
    console.warn("Storage error:", e);
  }

  toggleBtn.addEventListener("click", () => {
    drawer.classList.toggle("active");
  });

  closeBtn?.addEventListener("click", () => {
    drawer.classList.remove("active");
  });

  // Pre-fill fields with current config
  const customNameInput = document.getElementById("customClinicName");
  const customPhoneInput = document.getElementById("customClinicPhone");
  const customAreaSelect = document.getElementById("customClinicArea");

  if (customNameInput) customNameInput.value = window.CLINIC_CONFIG.name;
  if (customPhoneInput) customPhoneInput.value = window.CLINIC_CONFIG.contact.phone;
  if (customAreaSelect && window.CLINIC_CONFIG.contact?.address?.area) {
    customAreaSelect.value = window.CLINIC_CONFIG.contact.address.area;
  }

  applyBtn?.addEventListener("click", () => {
    const newName = customNameInput?.value.trim() || "SmileCare Dental Studio";
    const newPhone = customPhoneInput?.value.trim() || "+91 98765 43210";
    const newArea = customAreaSelect?.value || "Nungambakkam";

    window.CLINIC_CONFIG.name = newName;
    window.CLINIC_CONFIG.contact.phone = newPhone;
    window.CLINIC_CONFIG.contact.phoneRaw = newPhone.replace(/\D/g, "");
    window.CLINIC_CONFIG.contact.whatsapp = newPhone;
    window.CLINIC_CONFIG.contact.whatsappRaw = newPhone.replace(/\D/g, "");
    if (window.CLINIC_CONFIG.contact.address) {
      window.CLINIC_CONFIG.contact.address.area = newArea;
    }

    try {
      localStorage.setItem("smilecare_demo_config", JSON.stringify({
        name: newName,
        phone: newPhone,
        area: newArea
      }));
    } catch (e) {}

    initClinicDetails();
    drawer.classList.remove("active");

    // Show quick toast notification
    showNotification(`Clinic updated to "${newName}"!`);
  });
}

function showNotification(msg) {
  let toast = document.getElementById("demoToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "demoToast";
    toast.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: #0f172a;
      color: #ffffff;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.25);
      z-index: 9999;
      font-size: 0.88rem;
      font-weight: 600;
      border-left: 4px solid var(--primary);
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateY(-10px);
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.style.opacity = "1";
  toast.style.transform = "translateY(0)";

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
  }, 3500);
}
