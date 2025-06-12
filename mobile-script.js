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

document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("js-navbar-toggle");
  const navMenu = document.getElementById("js-menu");
  const myLogo = document.getElementById("myLogo");
  if (navToggle && navMenu && myLogo) {
    function toggleMenu() {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
      myLogo.classList.toggle("active");
    }
    navToggle.addEventListener("click", toggleMenu);
    navToggle.addEventListener("keypress", function (e) {
      if (e.key === "Enter" || e.key === " ") toggleMenu();
    });
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
        myLogo.classList.remove("active");
      });
    });
    document.addEventListener("mousedown", function (e) {
      if (
        navMenu.classList.contains("active") &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target) &&
        !myLogo.contains(e.target)
      ) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
        myLogo.classList.remove("active");
      }
    });
  }

  // Touch handling for section navigation and content scrolling
  const sections = ["intro", "profile", "skillset", "projects", "contact"];
  let currentSectionIndex = 0;
  let touchStartY = 0;
  let touchEndY = 0;

  // Handle intro section separately
  const introSection = document.getElementById("intro");
  if (introSection) {
    introSection.addEventListener(
      "touchstart",
      function (e) {
        touchStartY = e.touches[0].clientY;
      },
      { passive: true }
    );

    introSection.addEventListener(
      "touchend",
      function (e) {
        touchEndY = e.changedTouches[0].clientY;
        const swipeDistance = touchStartY - touchEndY;
        const minSwipeDistance = 50;

        // Only allow downward navigation from intro
        if (swipeDistance > minSwipeDistance) {
          document
            .getElementById("profile")
            .scrollIntoView({ behavior: "smooth" });
        }
      },
      { passive: true }
    );
  }

  // Add touch handlers to all .left sections
  // Handle other .left sections
  document.querySelectorAll(".left").forEach((leftSection) => {
    // Skip if this is part of the intro section
    if (leftSection.closest("#intro")) return;

    leftSection.addEventListener("touchstart", handleLeftTouchStart, {
      passive: true,
    });
    leftSection.addEventListener("touchend", handleLeftTouchEnd, {
      passive: true,
    });
  });

  // Remove any existing overflow:hidden from .right sections
  document.querySelectorAll(".right").forEach((rightSection) => {
    rightSection.style.overflowY = "auto";
    rightSection.style.webkitOverflowScrolling = "touch";
  });

  function handleLeftTouchStart(e) {
    touchStartY = e.touches[0].clientY;
  }

  function handleLeftTouchEnd(e) {
    touchEndY = e.changedTouches[0].clientY;
    const swipeDistance = touchStartY - touchEndY;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) < minSwipeDistance) return;

    // Prevent default only for .left section swipes
    e.preventDefault();

    if (swipeDistance > 0) {
      // Swipe up - go to next section
      currentSectionIndex = Math.min(
        currentSectionIndex + 1,
        sections.length - 1
      );
    } else {
      // Swipe down - go to previous section
      currentSectionIndex = Math.max(currentSectionIndex - 1, 0);
    }

    // Smooth scroll to the section
    document.getElementById(sections[currentSectionIndex]).scrollIntoView({
      behavior: "smooth",
    });
  }

  // Update current section index on regular scroll
  document.addEventListener(
    "scroll",
    function () {
      const scrollPosition = window.scrollY;
      sections.forEach((section, index) => {
        const element = document.getElementById(section);
        if (element.offsetTop <= scrollPosition + window.innerHeight / 2) {
          currentSectionIndex = index;
        }
      });
    },
    { passive: true }
  );
});
