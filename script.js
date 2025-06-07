function isMobile() {
  return window.innerWidth <= 1024; // or 768 for stricter mobile
}

document.addEventListener("DOMContentLoaded", function () {
  if (!isMobile()) {
    // Desktop/laptop only: enable GSAP, transition overlay, container-scroll, finisher-header, etc.

    // ...your GSAP animation and overlay code here...
    // Only declare once!
    let isTransitioning = false;

    // Chevron click handler
    const chevron = document.getElementById("chevron-container-timeless");
    if (chevron) {
      chevron.addEventListener("click", function (e) {
        e.preventDefault();
        if (isTransitioning) return;

        // Remove any existing animation class first
        const h2 = document.querySelector(".left h2");
        h2.classList.remove("focus-in-expand");

        // Force a reflow
        void h2.offsetWidth;

        // Add the class after a short delay to ensure transition has started
        setTimeout(() => {
          h2.classList.add("focus-in-expand");
        }, 500); // Add class 1 second after click

        transitionToProfile();
      });

      chevron.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (!isTransitioning) {
            transitionToProfile();
          }
        }
      });
    }

    function transitionToProfile() {
      isTransitioning = true;

      // Create master timeline
      const tl = gsap.timeline();

      // Phase 1: Fade out hero section
      tl.to("#intro", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      })

        // Phase 2: Show black overlay
        .to(
          "#transitionOverlay",
          {
            opacity: 1,
            duration: 0.5,
            ease: "power2.inOut",
          },
          "-=0.3"
        )

        // Phase 3: Prepare profile section
        .set("#profile", {
          opacity: 1,
          pointerEvents: "auto",
        })

        // Phase 4: Animate left panel stretching from top to bottom
        .to("#profile .left", {
          width: "50%",
          duration: 0.8,
          ease: "power3.out",
        })

        // Phase 5: Fade out black overlay
        .to(
          "#transitionOverlay",
          {
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut",
          },
          "-=0.6"
        )

        // Remove or comment out the h2 animation
        /* .to(
      "#profile .left h2",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.4"
    ) */

        .to(
          "#profile .polygon",
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 2,
            ease: "elastic.out(1, 0.8)",
          },
          "-=0.4"
        )

        .to(
          "#profile .right",
          {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        )

        // Phase 7: Animate right side content
        .to(
          "#profile .right h3",
          {
            opacity: 1,
            x: 0,
            duration: 2.6,
            ease: "power2.out",
          },
          "-=1.2"
        )

        .to(
          "#profile .right h4",
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=1"
        )

        .to(
          "#profile .right .text",
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.4,
            ease: "power2.out",
          },
          "-=0.3"
        )

        .to(
          "#profile .right .container",
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.4,
            ease: "power2.out",
          },
          "-=1"
        )

        .to(
          "#profile .navbar-small",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )

        // Add the SVG animation as the final element
        .to(".decorative-svg", {
          opacity: 0.8,
          duration: 1.8,
          ease: "power2.inOut",
          force3D: true,
          clearProps: "transform",
        });

      // Complete transition
      tl.call(() => {
        isTransitioning = false;
        document.body.style.overflow = "hidden";
        document.querySelector("#profile .right").style.overflowY = "auto";
      });

      const intro = document.getElementById("intro");
      const finisherCanvas = document.getElementById("finisher-canvas");

      // Hide or remove the canvas after the transition
      if (finisherCanvas) {
        finisherCanvas.style.display = "none";
        // Or, to remove it completely:
        finisherCanvas.parentNode.removeChild(finisherCanvas);
      }

      // Optionally hide the intro section as well
      // if (intro) {
      //   intro.style.display = "none";
      // }
    }

    // Chevron click handler for animation
    chevron = document.getElementById("down-chevron-timeless");
    if (chevron) {
      chevron.addEventListener("click", function (e) {
        e.preventDefault();
        // Run GSAP transition to .profile
        // ...
      });
    }
  } else {
    // Mobile/tablet: simple anchor scroll
    const chevron = document.getElementById("down-chevron-timeless");
    if (chevron) {
      chevron.parentElement.setAttribute("href", "#profile");
      chevron.onclick = null;
    }
    // Optionally, hide overlay/canvas if present
    const overlay = document.getElementById("transitionOverlay");
    if (overlay) overlay.style.display = "none";
    const finisherCanvas = document.getElementById("finisher-canvas");
    if (finisherCanvas) finisherCanvas.style.display = "none";
    // Remove .container-scroll scroll/overflow logic if any
    document.body.classList.remove("container-scroll");

    // --- ADD THIS: Show profile section and its content ---
    const profile = document.getElementById("profile");
    if (profile) {
      profile.style.opacity = "1";
      profile.style.pointerEvents = "auto";
    }
    const profileLeft = document.querySelector("#profile .left");
    if (profileLeft) {
      profileLeft.style.width = "50%";
    }
    const profileRight = document.querySelector("#profile .right");
    if (profileRight) {
      profileRight.style.opacity = "1";
    }
    const polygon = document.querySelector("#profile .polygon");
    if (polygon) {
      polygon.style.opacity = "1";
      polygon.style.transform = "scale(1) rotate(0deg)";
    }
    const navbarSmall = document.querySelector("#profile .navbar-small");
    if (navbarSmall) {
      navbarSmall.style.opacity = "1";
      navbarSmall.style.transform = "none";
    }
    const h2 = document.querySelector("#profile .left h2");
    if (h2) {
      h2.style.opacity = "1";
    }
  }
});

// Add some interactive enhancements
document.querySelectorAll(".nav-link-small").forEach((link) => {
  link.addEventListener("mouseenter", function () {
    gsap.to(this, { scale: 1.05, duration: 0.3, ease: "power2.out" });
  });

  link.addEventListener("mouseleave", function () {
    gsap.to(this, { scale: 1, duration: 0.3, ease: "power2.out" });
  });
});
// Add polygon hover effect
const polygon = document.querySelector(".polygon");
if (polygon) {
  polygon.addEventListener("mouseenter", function () {
    gsap.to(this, {
      scale: 1.1,
      rotation: 5,
      duration: 0.4,
      ease: "power2.out",
    });
  });

  polygon.addEventListener("mouseleave", function () {
    gsap.to(this, {
      scale: 1,
      rotation: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  });
}

// Smooth scroll for right panel
document
  .querySelector("#profile .right")
  .addEventListener("scroll", function () {
    const scrolled = this.scrollTop;
    const rate = scrolled * -0.3;

    gsap.to(".polygon", {
      y: rate,
      duration: 0.5,
      ease: "power1.out",
    });
  });

function disableScroll() {
  document.body.style.overflow = "hidden";
}

function enableScroll() {
  document.body.style.overflow = "auto";
}

window.addEventListener("DOMContentLoaded", function () {
  // Profile SVG (if you want to keep animation for profile, leave as is)
  const svgContainer = document.querySelector(".left");
  const svgElement = document.createElement("img");
  svgElement.src = "./images/path8gray.webp";
  svgElement.classList.add("decorative-svg");
  svgElement.alt = "Decorative background pattern";
  svgContainer.appendChild(svgElement);

  disableScroll();
});

document
  .querySelector('a[href="#skillset"]')
  .addEventListener("click", function (e) {
    e.preventDefault();

    // Smooth scroll to skillset section
    document.querySelector("#skillset").scrollIntoView({
      behavior: "smooth",
    });
  });

document
  .querySelector('a[href="#projects"]')
  .addEventListener("click", function (e) {
    e.preventDefault();

    // Smooth scroll to projects section
    document.querySelector("#projects").scrollIntoView({
      behavior: "smooth",
    });
  });

document
  .querySelector('a[href="#contact"]')
  .addEventListener("click", function (e) {
    e.preventDefault();

    // Smooth scroll to contact section
    document.querySelector("#contact").scrollIntoView({
      behavior: "smooth",
    });
  });

window.addEventListener("load", function () {
  // Initially disable scrolling
  document.querySelector(".container-scroll").style.overflowY = "hidden";

  // Handle chevron click
  document
    .querySelector("#chevron-container-timeless")
    .addEventListener("click", function (e) {
      e.preventDefault();

      // Enable scrolling after transition
      setTimeout(() => {
        document.querySelector(".container-scroll").style.overflowY = "hidden";
      }, 2000); // Delay matches your transition time

      // Smooth scroll to profile section
      document.querySelector("#profile").scrollIntoView({
        behavior: "smooth",
      });
    });

  // Prevent default scroll behavior in intro section
  document.querySelector("#intro").addEventListener(
    "wheel",
    function (e) {
      e.preventDefault();
    },
    { passive: false }
  );
});

const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const emailConfirmation = document.getElementById("email-confirmation");
const message = document.getElementById("message");

const form = document.getElementById("form");
const errorElement = document.getElementById("error");

const errorMessages = {
  fname: [
    "Κάθε λέξη πρέπει να έχει τουλάχιστον 2 χαρακτήρες.",
    "Δεν επιτρέπονται αριθμοί ή ειδικοί χαρακτήρες.",
  ],
  lname: [
    "Το επίθετο πρέπει να έχει 2-20 χαρακτήρες.",
    "Δεν επιτρέπονται αριθμοί ή ειδικοί χαρακτήρες.",
  ],
  email: [
    "Παρακαλώ εισάγετε ένα έγκυρο email (π.χ. name@example.com).",
    "Το email πρέπει να περιέχει το σύμβολο @ και ένα έγκυρο domain name.",
  ],
  "email-confirmation": [
    "Βεβαιωθείτε ότι το email επιβεβαίωσης είναι ίδιο με το αρχικό email.",
    "Το email επιβεβαίωσης πρέπει να είναι έγκυρο.",
  ],
  phone: [
    "Το τηλέφωνο πρέπει να περιέχει μόνο αριθμούς.",
    "Το τηλέφωνο πρέπει να έχει από 10 έως 20 ψηφία.",
  ],
  comments: [
    "Το μήνυμα πρέπει να έχει τουλάχιστον 10 χαρακτήρες.",
    "Παρακαλώ γράψτε ένα πιο αναλυτικό μήνυμα άνω των τριών λέξεων.",
  ],
};

// Validation functions
function validateFname(value) {
  return /^([A-Za-zΑ-Ωα-ωΆ-Ώά-ώ.'\-]{2,})(\s+[A-Za-zΑ-Ωα-ωΆ-Ώά-ώ.'\-]{2,})*$/.test(
    value.trim()
  );
}
function validateLname(value) {
  return /^[A-Za-zΑ-Ωα-ωΆ-Ώά-ώ.'\-]{2,20}$/.test(value.trim());
}
function validateEmail(value) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim());
}
function validateEmailConfirmation(value) {
  const email = document.getElementById("email").value;
  return value.trim() === email.trim() && validateEmail(value);
}
function validatePhone(value) {
  if (!value.trim()) return true; // Optional field
  return /^[0-9]{10,20}$/.test(value.trim());
}
function validateComments(value) {
  return value.trim().length >= 10;
}
function validateTextareaWords(textarea) {
  const value = textarea.value.trim();
  // Count words (split by whitespace, filter out empty)
  const words = value.split(/\s+/).filter(Boolean);
  const errorSpan = textarea.parentElement.querySelector(
    ".input-error-message"
  );
  if (words.length < 3) {
    textarea.classList.add("invalid");
    if (errorSpan)
      errorSpan.textContent =
        "Το μήνυμα πρέπει να περιέχει τουλάχιστον 3 λέξεις.";
    return false;
  } else {
    textarea.classList.remove("invalid");
    if (errorSpan) errorSpan.textContent = "";
    return true;
  }
}

// Check if field is required for submission
function isFieldRequired(fieldName) {
  const requiredFields = [
    "fname",
    "lname",
    "email",
    "email-confirmation",
    "comments",
  ];
  return requiredFields.includes(fieldName);
}

// Main handler for blur/change
function handleChange(event) {
  const el = event.target;
  let valid = true;
  let errorMsg = "";

  // Check if field is required
  const isRequired = isFieldRequired(el.name);

  if (!el.value.trim() && isRequired) {
    errorMsg = "Το πεδίο είναι υποχρεωτικό.";
    valid = false;
  } else if (el.value.trim()) {
    // Only validate if there's a value
    switch (el.name) {
      case "fname":
        valid = validateFname(el.value);
        if (!valid) errorMsg = errorMessages.fname.join(" ");
        break;
      case "lname":
        valid = validateLname(el.value);
        if (!valid) errorMsg = errorMessages.lname.join(" ");
        break;
      case "email":
        valid = validateEmail(el.value);
        if (!valid) errorMsg = errorMessages.email.join(" ");
        // Also validate email-confirmation if present
        const emailConf = document.getElementById("email-confirmation");
        if (emailConf && emailConf.value) handleChange({ target: emailConf });
        break;
      case "email-confirmation":
        valid = validateEmailConfirmation(el.value);
        if (!valid) errorMsg = errorMessages["email-confirmation"].join(" ");
        break;
      case "comments":
        valid = validateComments(el.value);
        if (!valid) errorMsg = errorMessages.comments.join(" ");
        break;
      case "phone":
        valid = validatePhone(el.value);
        if (!valid) errorMsg = errorMessages.phone.join(" ");
        break;
    }
  }

  el.classList.remove("valid", "invalid");
  if (el.value) {
    el.classList.add(valid ? "valid" : "invalid");
  }

  const errorSpan = el.nextElementSibling;
  const errorIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" 
       width="1.4em" height="1.4em" viewBox="0 0 24 24" 
       style="vertical-align: middle; margin-right: 0.1em; padding-bottom: 0.2em; display: inline-block;">
    <circle cx="12" cy="12" r="10" fill="none" stroke="#c23a3e" stroke-width="3"/>
    <line x1="12" y1="7" x2="12" y2="13" stroke="#c23a3e" stroke-width="3" stroke-linecap="round"/>
    <circle cx="12" cy="17" r="1.5" fill="#c23a3e"/>
  </svg>
`;

  if (errorSpan && errorSpan.classList.contains("input-error-message")) {
    errorSpan.innerHTML = errorMsg ? errorIcon + errorMsg : "";
    errorSpan.style.opacity = errorMsg ? "1" : "0";
  }
}

// Attach blur event listeners for all relevant fields
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  if (form) {
    form.querySelectorAll("input, textarea").forEach((el) => {
      // On blur, validate and show error if needed
      el.addEventListener("blur", handleChange);
      // On input, hide error message while typing
      el.addEventListener("input", function () {
        const errorSpan = el.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains("input-error-message")) {
          errorSpan.textContent = "";
          errorSpan.style.opacity = "0";
          el.classList.remove("invalid");
        }
      });
    });

    // Validate all on submit
    form.addEventListener("submit", function (e) {
      console.log("Form submit triggered"); // Debug log

      let valid = true;
      let invalidFields = [];

      // First, validate all fields that will be submitted
      form
        .querySelectorAll("input:not([data-no-submit]), textarea")
        .forEach((el) => {
          if (isFieldRequired(el.name)) {
            // Check required fields
            if (!el.value.trim()) {
              valid = false;
              invalidFields.push(el.name + " (empty)");
              el.classList.add("invalid");
            } else {
              // Validate the content
              handleChange({ target: el });
              if (el.classList.contains("invalid")) {
                valid = false;
                invalidFields.push(el.name + " (invalid)");
              }
            }
          } else if (el.value.trim()) {
            // Optional fields - only validate if they have content
            handleChange({ target: el });
            if (el.classList.contains("invalid")) {
              valid = false;
              invalidFields.push(el.name + " (invalid)");
            }
          }
        });

      // Validate textarea for at least 3 words
      const textarea = document.getElementById("comments");
      if (textarea && !validateTextareaWords(textarea)) {
        valid = false;
        invalidFields.push("comments (word count)");
      }

      console.log(
        "Form validation result:",
        valid,
        "Invalid fields:",
        invalidFields
      ); // Debug log

      if (!valid) {
        e.preventDefault();
        console.log("Form submission prevented due to validation errors");
        return false;
      }

      // Remove email-confirmation field from form data before submission
      const emailConfirmation = document.querySelector(
        '[data-no-submit="true"]'
      );
      if (emailConfirmation) {
        emailConfirmation.removeAttribute("name");
        console.log("Removed email-confirmation field from submission");
      }

      console.log("Form is valid, allowing submission");
      // Form is valid, allow natural submission
    });
  }
});

const textarea = document.getElementById("comments");
if (textarea) {
  textarea.addEventListener("input", function () {
    validateTextareaWords(this);
  });
}

// window.addEventListener("pageshow", function (event) {
//   if (event.persisted) {
//     console.log("Page was restored from bfcache");
//   } else {
//     console.log("Page was loaded normally");
//   }
// });
