/* ==========================================================================
   Contact form (_includes/contact-form.html)
   Shows a message next to each field that needs attention, and submits to
   Formspree without leaving the page. Without this script the browser's own
   validation applies and Formspree shows its confirmation page.
   ========================================================================== */

'use strict';

// Only a Formspree form endpoint is accepted (the include renders the form only for a valid ID)
const FORMSPREE_ENDPOINT = /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]{6,16}$/;

const FIELD_MESSAGES = {
  name: { valueMissing: "Enter your name." },
  email: {
    valueMissing: "Enter your email address.",
    typeMismatch: "Enter an email address in the format name@example.com."
  },
  message: { valueMissing: "Enter a message." }
};

const STATUS_SENDING = "Sending your message.";
const STATUS_SENT = "Thank you. Your message has been sent.";
const STATUS_FAILED = "Your message could not be sent.";
const STATUS_RETRY = "Please try again later, or use one of the profiles below.";

// The validation message for a field, or "" when it is valid. A value of only spaces counts as missing.
function fieldError(field) {
  const messages = FIELD_MESSAGES[field.name] || {};
  if (field.value.trim() === "") {
    return messages.valueMissing || field.validationMessage;
  }
  if (field.validity.typeMismatch) {
    return messages.typeMismatch || field.validationMessage;
  }
  return field.validity.valid ? "" : field.validationMessage;
}

// Show or clear the message below a field; the field refers to it with aria-describedby
function showFieldError(field, text) {
  const error = document.getElementById(field.id + "-error");
  error.textContent = text;
  error.hidden = !text;
  if (text) {
    field.setAttribute("aria-invalid", "true");
  } else {
    field.removeAttribute("aria-invalid");
  }
}

function initContactForm(form) {
  const fields = Array.from(form.elements).filter((element) => FIELD_MESSAGES[element.name]);
  const button = form.querySelector(".contact-form__submit");
  const status = document.getElementById("contact-form-status");
  let sending = false;

  function setStatus(text, state) {
    status.textContent = text;
    status.className = "contact-form__status" + (state ? " contact-form__status--" + state : "");
  }

  // Messages from this script replace the browser's validation bubbles
  form.noValidate = true;

  // Once a field has been flagged, update its message as it is corrected
  fields.forEach(function (field) {
    field.addEventListener("input", function () {
      if (field.getAttribute("aria-invalid") === "true") {
        showFieldError(field, fieldError(field));
      }
    });
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (sending) {
      return;
    }

    let firstInvalid = null;
    fields.forEach(function (field) {
      const text = fieldError(field);
      showFieldError(field, text);
      if (text && !firstInvalid) {
        firstInvalid = field;
      }
    });
    if (firstInvalid) {
      setStatus("", null);
      firstInvalid.focus();
      return;
    }

    // aria-disabled rather than disabled, so the button keeps keyboard focus while sending
    sending = true;
    button.setAttribute("aria-disabled", "true");
    setStatus(STATUS_SENDING, null);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      if (response.ok) {
        form.reset();
        setStatus(STATUS_SENT, "success");
      } else {
        const data = await response.json().catch(() => ({}));
        const details = Array.isArray(data.errors)
          ? data.errors.map((error) => error.message).filter(Boolean).join(" ")
          : "";
        setStatus([STATUS_FAILED, details, STATUS_RETRY].filter(Boolean).join(" "), "error");
      }
    } catch (error) {
      setStatus(STATUS_FAILED + " " + STATUS_RETRY, "error");
    } finally {
      sending = false;
      button.removeAttribute("aria-disabled");
    }
  });
}

const contactForm = document.getElementById("contact-form");
if (contactForm) {
  if (FORMSPREE_ENDPOINT.test(contactForm.getAttribute("action") || "")) {
    initContactForm(contactForm);
  } else {
    // Never submit to anything other than a Formspree endpoint
    contactForm.addEventListener("submit", (event) => event.preventDefault());
  }
}
