/* ============================================================
   MAPALA RIMBA NUSANTARA — Registration Form JavaScript
   ============================================================ */

// ─── STEP STATE ──────────────────────────────────────────────
let currentStep = 1;
const totalSteps = 4;

// ─── STEP NAVIGATION ─────────────────────────────────────────
function nextStep(step) {
  if (!validateStep(step)) return;

  const current = document.getElementById('step' + step);
  const next = document.getElementById('step' + (step + 1));

  if (!next) return;

  // If going to step 4, build review
  if (step + 1 === 4) buildReview();

  // Transition
  current.style.opacity = '0';
  current.style.transform = 'translateX(-20px)';
  current.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

  setTimeout(function () {
    current.classList.remove('active');
    current.style.opacity = '';
    current.style.transform = '';
    current.style.transition = '';

    next.classList.add('active');
    next.style.opacity = '0';
    next.style.transform = 'translateX(20px)';

    setTimeout(function () {
      next.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      next.style.opacity = '1';
      next.style.transform = 'translateX(0)';
    }, 20);

    currentStep = step + 1;
    updateProgress();
    scrollToForm();
  }, 200);
}

function prevStep(step) {
  const current = document.getElementById('step' + step);
  const prev = document.getElementById('step' + (step - 1));

  if (!prev) return;

  current.style.opacity = '0';
  current.style.transform = 'translateX(20px)';
  current.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

  setTimeout(function () {
    current.classList.remove('active');
    current.style.opacity = '';
    current.style.transform = '';
    current.style.transition = '';

    prev.classList.add('active');
    prev.style.opacity = '0';
    prev.style.transform = 'translateX(-20px)';

    setTimeout(function () {
      prev.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      prev.style.opacity = '1';
      prev.style.transform = 'translateX(0)';
    }, 20);

    currentStep = step - 1;
    updateProgress();
    scrollToForm();
  }, 200);
}

function updateProgress() {
  const steps = document.querySelectorAll('.progress-step');
  const lines = document.querySelectorAll('.progress-line');

  steps.forEach(function (step, i) {
    const stepNum = i + 1;
    step.classList.remove('active', 'done');

    if (stepNum < currentStep) {
      step.classList.add('done');
      step.querySelector('.step-num').textContent = '✓';
    } else if (stepNum === currentStep) {
      step.classList.add('active');
      step.querySelector('.step-num').textContent = stepNum;
    } else {
      step.querySelector('.step-num').textContent = stepNum;
    }
  });

  lines.forEach(function (line, i) {
    if (i < currentStep - 1) {
      line.style.background = 'var(--amber)';
    } else {
      line.style.background = 'var(--border)';
    }
  });
}

function scrollToForm() {
  const form = document.querySelector('.form-section');
  if (form) {
    const navbar = document.getElementById('navbar');
    const offset = navbar ? navbar.offsetHeight + 24 : 80;
    const top = form.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }
}

// ─── VALIDATION ──────────────────────────────────────────────
function validateStep(step) {
  let valid = true;

  // Clear all errors for this step
  const stepEl = document.getElementById('step' + step);
  if (!stepEl) return true;
  stepEl.querySelectorAll('.form-error').forEach(function (e) { e.textContent = ''; });

  if (step === 1) {
    valid = checkField('namaLengkap', 'Nama lengkap wajib diisi') && valid;
    valid = checkField('tempatLahir', 'Tempat lahir wajib diisi') && valid;
    valid = checkField('tanggalLahir', 'Tanggal lahir wajib diisi') && valid;
    valid = checkRadio('jenisKelamin', 'Pilih jenis kelamin') && valid;
    valid = checkPhone('noHP', 'Nomor HP tidak valid (contoh: 08xxxxxxxxxx)') && valid;
    valid = checkEmail('email', 'Format email tidak valid') && valid;
    valid = checkField('alamat', 'Alamat wajib diisi') && valid;
    valid = checkField('kontakDarurat', 'Kontak darurat wajib diisi') && valid;
  }

  if (step === 2) {
    valid = checkField('npm', 'NPM/NIM wajib diisi') && valid;
    valid = checkSelect('angkatan', 'Pilih angkatan') && valid;
    valid = checkSelect('fakultas', 'Pilih fakultas') && valid;
    valid = checkField('prodi', 'Program studi wajib diisi') && valid;
  }

  if (step === 3) {
    valid = checkCheckboxGroup('divisi', 'Pilih minimal satu divisi') && valid;
    valid = checkField('motivasi', 'Ceritakan motivasimu bergabung') && valid;
    valid = checkCheckboxSingle('persetujuan', 'Anda harus menyetujui pernyataan ini') && valid;
  }

  return valid;
}

function checkField(id, msg) {
  const el = document.getElementById(id);
  const errEl = document.getElementById('err-' + id);
  if (!el || !errEl) return true;

  if (!el.value.trim()) {
    errEl.textContent = msg;
    el.focus();
    el.style.borderColor = '#ff6b6b';
    el.addEventListener('input', function () {
      errEl.textContent = '';
      el.style.borderColor = '';
    }, { once: true });
    return false;
  }
  return true;
}

function checkSelect(id, msg) {
  const el = document.getElementById(id);
  const errEl = document.getElementById('err-' + id);
  if (!el || !errEl) return true;

  if (!el.value) {
    errEl.textContent = msg;
    el.style.borderColor = '#ff6b6b';
    el.addEventListener('change', function () {
      errEl.textContent = '';
      el.style.borderColor = '';
    }, { once: true });
    return false;
  }
  return true;
}

function checkRadio(name, msg) {
  const errEl = document.getElementById('err-' + name);
  const radios = document.querySelectorAll('input[name="' + name + '"]');
  const checked = Array.from(radios).some(function (r) { return r.checked; });

  if (!checked) {
    if (errEl) errEl.textContent = msg;
    return false;
  }
  return true;
}

function checkPhone(id, msg) {
  const el = document.getElementById(id);
  const errEl = document.getElementById('err-' + id);
  if (!el || !errEl) return true;

  const phone = el.value.trim().replace(/\s/g, '');
  const valid = /^(\+62|62|0)8[0-9]{8,12}$/.test(phone);

  if (!phone) {
    errEl.textContent = 'Nomor HP wajib diisi';
    el.style.borderColor = '#ff6b6b';
    return false;
  }

  if (!valid) {
    errEl.textContent = msg;
    el.style.borderColor = '#ff6b6b';
    el.addEventListener('input', function () {
      errEl.textContent = '';
      el.style.borderColor = '';
    }, { once: true });
    return false;
  }
  return true;
}

function checkEmail(id, msg) {
  const el = document.getElementById(id);
  const errEl = document.getElementById('err-' + id);
  if (!el || !errEl) return true;

  const emailVal = el.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);

  if (!emailVal) {
    errEl.textContent = 'Email wajib diisi';
    el.style.borderColor = '#ff6b6b';
    return false;
  }

  if (!valid) {
    errEl.textContent = msg;
    el.style.borderColor = '#ff6b6b';
    el.addEventListener('input', function () {
      errEl.textContent = '';
      el.style.borderColor = '';
    }, { once: true });
    return false;
  }
  return true;
}

function checkCheckboxGroup(name, msg) {
  const errEl = document.getElementById('err-' + name);
  const checked = document.querySelectorAll('input[name="' + name + '"]:checked');

  if (checked.length === 0) {
    if (errEl) errEl.textContent = msg;
    return false;
  }
  return true;
}

function checkCheckboxSingle(id, msg) {
  const el = document.getElementById(id);
  const errEl = document.getElementById('err-' + id);
  if (!el || !errEl) return true;

  if (!el.checked) {
    errEl.textContent = msg;
    return false;
  }
  return true;
}

// ─── BUILD REVIEW PAGE ───────────────────────────────────────
function buildReview() {
  const reviewBox = document.getElementById('reviewBox');
  if (!reviewBox) return;

  function val(id) {
    const el = document.getElementById(id);
    return el ? (el.value.trim() || '–') : '–';
  }

  function radioVal(name) {
    const el = document.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : '–';
  }

  function checkboxVals(name) {
    const els = document.querySelectorAll('input[name="' + name + '"]:checked');
    if (els.length === 0) return '–';
    return Array.from(els).map(function (e) { return e.value; }).join(', ');
  }

  reviewBox.innerHTML = `
    <div class="review-section">
      <h4>Data Pribadi</h4>
      <div class="review-row"><span class="r-label">Nama Lengkap</span><span class="r-value">${val('namaLengkap')}</span></div>
      <div class="review-row"><span class="r-label">Nama Panggilan</span><span class="r-value">${val('namaPanel')}</span></div>
      <div class="review-row"><span class="r-label">Tempat, Tgl Lahir</span><span class="r-value">${val('tempatLahir')}, ${val('tanggalLahir')}</span></div>
      <div class="review-row"><span class="r-label">Jenis Kelamin</span><span class="r-value">${radioVal('jenisKelamin')}</span></div>
      <div class="review-row"><span class="r-label">Golongan Darah</span><span class="r-value">${val('golDarah')}</span></div>
      <div class="review-row"><span class="r-label">No. WhatsApp</span><span class="r-value">${val('noHP')}</span></div>
      <div class="review-row"><span class="r-label">Email</span><span class="r-value">${val('email')}</span></div>
      <div class="review-row"><span class="r-label">Alamat</span><span class="r-value">${val('alamat')}</span></div>
      <div class="review-row"><span class="r-label">Kontak Darurat</span><span class="r-value">${val('kontakDarurat')}</span></div>
    </div>
    <div class="review-section">
      <h4>Data Akademik</h4>
      <div class="review-row"><span class="r-label">NPM / NIM</span><span class="r-value">${val('npm')}</span></div>
      <div class="review-row"><span class="r-label">Angkatan</span><span class="r-value">${val('angkatan')}</span></div>
      <div class="review-row"><span class="r-label">Fakultas</span><span class="r-value">${val('fakultas')}</span></div>
      <div class="review-row"><span class="r-label">Program Studi</span><span class="r-value">${val('prodi')}</span></div>
      <div class="review-row"><span class="r-label">Pengalaman Org.</span><span class="r-value">${val('pengalamanOrg')}</span></div>
      <div class="review-row"><span class="r-label">Pengalaman Alam</span><span class="r-value">${val('pengalamanAlam')}</span></div>
    </div>
    <div class="review-section">
      <h4>Minat & Motivasi</h4>
      <div class="review-row"><span class="r-label">Divisi Diminati</span><span class="r-value">${checkboxVals('divisi')}</span></div>
      <div class="review-row"><span class="r-label">Skill</span><span class="r-value">${checkboxVals('skill')}</span></div>
      <div class="review-row"><span class="r-label">Motivasi</span><span class="r-value">${val('motivasi')}</span></div>
      <div class="review-row"><span class="r-label">Info MAPALA dari</span><span class="r-value">${val('infoMapala')}</span></div>
    </div>
  `;
}

// ─── FORM SUBMIT ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registrationForm');
  const successState = document.getElementById('successState');
  const successName = document.getElementById('successName');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Disable button, show loading
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="btn-text">⏳ Mengirim...</span>';
    }

    // Simulate async submission
    setTimeout(function () {
      const nama = document.getElementById('namaLengkap');
      const namaValue = nama ? nama.value.trim() : 'Pendaftar';

      // Hide form, show success
      form.style.opacity = '0';
      form.style.transform = 'scale(0.96)';
      form.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

      setTimeout(function () {
        form.style.display = 'none';

        if (successName) successName.textContent = namaValue;
        if (successState) {
          successState.style.display = 'block';
          successState.style.opacity = '0';
          successState.style.transform = 'translateY(16px)';

          setTimeout(function () {
            successState.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            successState.style.opacity = '1';
            successState.style.transform = 'translateY(0)';
          }, 30);
        }

        // Scroll to success
        scrollToForm();
      }, 400);
    }, 1500);
  });

  // Real-time validation feedback on blur
  document.querySelectorAll('.reg-form input, .reg-form select, .reg-form textarea').forEach(function (el) {
    el.addEventListener('blur', function () {
      if (el.value && el.style.borderColor === 'rgb(255, 107, 107)') {
        el.style.borderColor = 'var(--forest-lt)';
      }
    });
  });
});
