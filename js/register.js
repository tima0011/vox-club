/* js/register.js - Registration form: validation, spam protection (honeypot, debounce), track preselection + Google Apps Script submission */
(function () {
  'use strict';

  // ── CONFIG ─────────────────────────────────────────────────────────────────
  var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzvFARD4toIcDjyOTcTLm1VXYPYvxa6sBoXzUlXrpA0-M0WIqZZuIZxmrwKPGUGw6g7/exec';
  var REQUEST_TIMEOUT_MS = 15000;
  var isSubmitting = false;

  // ── TRACK & BADGE SELECTION HELPERS ────────────────────────────────────────
  function updateTrackRadioClasses() {
    var radios = document.querySelectorAll('input[name="reg_track"]');
    radios.forEach(function (r) {
      var card = r.closest('.track-opt-card');
      if (card) {
        card.classList.toggle('is-active', r.checked);
      }
    });
  }

  function updateGradeRadioClasses() {
    var radios = document.querySelectorAll('input[name="reg_grade"]');
    radios.forEach(function (r) {
      var opt = r.closest('.grade-pill-opt');
      if (opt) {
        opt.classList.toggle('is-active', r.checked);
      }
    });
  }

  function updateEnglishRadioClasses() {
    var radios = document.querySelectorAll('input[name="reg_english"]');
    radios.forEach(function (r) {
      var opt = r.closest('.english-badge-opt');
      if (opt) {
        opt.classList.toggle('is-active', r.checked);
      }
    });
  }

  function setRegistrationTrack(trackKey) {
    if (!trackKey) return;
    var targetRadio = document.querySelector('input[name="reg_track"][value="' + trackKey + '"]');
    if (targetRadio) {
      targetRadio.checked = true;
      updateTrackRadioClasses();
    }
  }
  window.setRegistrationTrack = setRegistrationTrack;

  function checkHashForTrack() {
    var hash = window.location.hash || '';
    var match = hash.match(/track=([a-z0-9_-]+)/i);
    if (match && match[1]) {
      setRegistrationTrack(match[1]);
    }
  }

  // ── VALIDATION & STATUS HELPERS ────────────────────────────────────────────
  function markError(el) {
    if (!el) return;
    el.style.borderColor = 'var(--color-danger)';
    el.style.boxShadow = '0 0 0 3px rgba(248,113,113,0.18)';
    el.addEventListener('input', function () {
      el.style.borderColor = '';
      el.style.boxShadow = '';
    }, { once: true });
  }

  function setLoading(btn, isLoading) {
    if (!btn) return;
    btn.disabled = isLoading;
    if (isLoading) {
      btn.setAttribute('aria-busy', 'true');
      btn.classList.add('is-loading');
    } else {
      btn.removeAttribute('aria-busy');
      btn.classList.remove('is-loading');
    }
    btn.style.opacity = isLoading ? '0.75' : '1';

    var spinner = btn.querySelector('.reg-submit-spinner');
    var label = btn.querySelector('.reg-submit-label') || btn.querySelector('span:not(.reg-submit-spinner)');
    var arrow = btn.querySelector('.reg-submit-arrow') || btn.querySelector('.btn-icon');

    if (spinner) {
      spinner.style.display = isLoading ? 'inline-flex' : 'none';
    }
    if (label) {
      label.textContent = isLoading ? 'Отправляем заявку...' : 'Отправить заявку';
    }
    if (arrow) {
      arrow.style.display = isLoading ? 'none' : 'inline-block';
    }
  }

  function clearError(form) {
    if (!form) return;
    var errEl = form.querySelector('.form-send-error');
    if (errEl) errEl.remove();
  }

  function showError(form, btn, message) {
    clearError(form);
    var errEl = document.createElement('div');
    errEl.className = 'form-send-error';
    errEl.style.cssText = 'color:var(--color-danger);background:rgba(248,113,113,0.1);border:1px solid rgba(248,113,113,0.25);border-radius:var(--radius-md);padding:var(--space-3) var(--space-4);font-size:var(--text-sm);font-weight:500;margin-top:var(--space-3);line-height:1.5;';
    errEl.textContent = message || 'Не удалось отправить заявку. Попробуйте снова или напишите в Telegram';
    if (btn && btn.parentNode) {
      btn.parentNode.insertAdjacentElement('afterend', errEl);
    } else if (form) {
      form.appendChild(errEl);
    }
  }

  function showSuccess(form, success, btn) {
    setLoading(btn, false);
    clearError(form);

    // Reset fields and radio visuals
    form.reset();
    updateTrackRadioClasses();
    updateGradeRadioClasses();
    updateEnglishRadioClasses();

    // Hide form and reveal success banner
    form.style.display = 'none';
    if (success) {
      success.removeAttribute('hidden');
      if (typeof success.scrollIntoView === 'function') {
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }

  // ── INITIALIZATION & SUBMIT ────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('reg-form');
    var success = document.getElementById('form-success');
    var btn = document.getElementById('reg-submit-btn');

    // Sync styles on radio change
    document.addEventListener('change', function (e) {
      if (e.target.name === 'reg_track') {
        updateTrackRadioClasses();
      }
      if (e.target.name === 'reg_grade') {
        updateGradeRadioClasses();
      }
      if (e.target.name === 'reg_english') {
        updateEnglishRadioClasses();
      }
    });

    // Check track from clicks across views
    document.addEventListener('click', function (e) {
      var trackTrigger = e.target.closest('[data-track]');
      if (trackTrigger) {
        var tr = trackTrigger.getAttribute('data-track');
        if (tr) setRegistrationTrack(tr);
      }

      // Retry/send another submission button
      var retryBtn = e.target.closest('#form-reset-btn');
      if (retryBtn && form && success) {
        isSubmitting = false;
        form.style.display = 'flex';
        success.setAttribute('hidden', '');
        clearError(form);
        if (btn) setLoading(btn, false);
      }
    });

    // Clear error on input
    if (form) {
      form.addEventListener('input', function () {
        clearError(form);
      });
    }

    // Hash tracking
    checkHashForTrack();
    window.addEventListener('hashchange', checkHashForTrack);
    updateTrackRadioClasses();
    updateGradeRadioClasses();
    updateEnglishRadioClasses();

    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Debounce & Anti-double-click guard
      if (isSubmitting) {
        return;
      }

      // ── Honeypot bot-trap check ──
      var honeypot = document.getElementById('reg-website') || form.querySelector('input[name="website"]');
      if (honeypot && honeypot.value.trim().length > 0) {
        // Silently discard bot submission without querying Google Apps Script
        showSuccess(form, success, btn);
        isSubmitting = false;
        return;
      }

      var nameEl = document.getElementById('reg-name');
      var contactEl = document.getElementById('reg-contact');
      var questionEl = document.getElementById('reg-question');
      var trackRadio = form.querySelector('input[name="reg_track"]:checked');
      var gradeRadio = form.querySelector('input[name="reg_grade"]:checked');
      var englishRadio = form.querySelector('input[name="reg_english"]:checked');

      // ── Input Sanitization & Validation ──
      var isValid = true;
      var cleanName = nameEl ? nameEl.value.trim() : '';
      var cleanContact = contactEl ? contactEl.value.trim() : '';
      var cleanQuestion = questionEl ? questionEl.value.trim() : '';

      // Validate name: non-empty, between 2 and 100 characters
      if (!cleanName || cleanName.length < 2 || cleanName.length > 100) {
        if (nameEl) markError(nameEl);
        isValid = false;
      }

      // Validate contact: non-empty, between 3 and 100 characters
      if (!cleanContact || cleanContact.length < 3 || cleanContact.length > 100) {
        if (contactEl) markError(contactEl);
        isValid = false;
      } else if (cleanContact.indexOf('@') !== -1 && cleanContact.indexOf('.') !== -1 && !cleanContact.startsWith('@')) {
        // If entered as an email, validate email structure
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailPattern.test(cleanContact)) {
          if (contactEl) markError(contactEl);
          isValid = false;
        }
      }

      if (!isValid) {
        isSubmitting = false;
        return;
      }

      // Limit question length to 1000 characters to prevent payload flooding
      if (cleanQuestion.length > 1000) {
        cleanQuestion = cleanQuestion.slice(0, 1000);
      }

      var trackMap = {
        debates: 'Дебаты',
        mun: 'MUN',
        both: 'Оба'
      };

      var payload = {
        name: cleanName,
        grade: gradeRadio ? gradeRadio.value : '9',
        contact: cleanContact,
        track: trackRadio ? (trackMap[trackRadio.value] || 'Оба') : 'Оба',
        englishLevel: englishRadio ? englishRadio.value : 'B1',
        question: cleanQuestion,
        timestamp: new Date().toISOString()
      };

      // Lock UI & indicate loading state immediately
      isSubmitting = true;
      setLoading(btn, true);
      clearError(form);

      // Network request with AbortController timeout & error resilience
      var controller = null;
      var timeoutId = null;

      if (typeof AbortController !== 'undefined') {
        controller = new AbortController();
        timeoutId = setTimeout(function () {
          try {
            controller.abort();
          } catch (_) {}
        }, REQUEST_TIMEOUT_MS);
      }

      var fetchOptions = {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      };

      if (controller) {
        fetchOptions.signal = controller.signal;
      }

      fetch(SCRIPT_URL, fetchOptions)
        .then(function () {
          if (timeoutId) clearTimeout(timeoutId);
          isSubmitting = false;
          showSuccess(form, success, btn);
        })
        .catch(function () {
          if (timeoutId) clearTimeout(timeoutId);
          isSubmitting = false;
          setLoading(btn, false);
          showError(form, btn, 'Не удалось отправить заявку. Попробуйте снова или напишите в Telegram');
        });
    });
  });
})();
