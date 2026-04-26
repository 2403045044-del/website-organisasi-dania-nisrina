/* ============================================================
   MAPALA RIMBA NUSANTARA — Gallery JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ─── PHOTO FILTER ────────────────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const photoItems = document.querySelectorAll('.photo-item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Update active button
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      photoItems.forEach(function (item) {
        const category = item.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.92)';
          item.style.display = 'block';

          setTimeout(function () {
            item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 30);
        } else {
          item.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.88)';

          setTimeout(function () {
            item.style.display = 'none';
          }, 280);
        }
      });
    });
  });

  // ─── LIGHTBOX ────────────────────────────────────────────
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentIndex = 0;
  let visibleItems = [];

  function getVisibleItems() {
    return Array.from(photoItems).filter(function (item) {
      return item.style.display !== 'none';
    });
  }

  function openLightbox(index) {
    visibleItems = getVisibleItems();
    currentIndex = index;
    showLightboxItem(currentIndex);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showLightboxItem(index) {
    const item = visibleItems[index];
    if (!item) return;

    const placeholder = item.querySelector('.photo-placeholder');
    const caption = item.querySelector('.photo-caption');
    const img = item.querySelector('img');

    // Build content
    lightboxContent.innerHTML = '';

    if (img && img.complete && img.naturalWidth > 0) {
      // Real image loaded
      const lbImg = document.createElement('img');
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbImg.style.cssText = 'max-width:80vw;max-height:72vh;object-fit:contain;border-radius:8px;display:block;';
      lightboxContent.appendChild(lbImg);
    } else {
      // Use SVG art placeholder
      const bgStyle = placeholder ? placeholder.style.background : 'linear-gradient(135deg,#1a3a2a,#2d6a4f)';
      const artSvg = item.querySelector('.photo-art');

      const div = document.createElement('div');
      div.className = 'lb-visual';
      div.style.cssText = 'width:70vw;max-width:900px;height:55vh;border-radius:12px;display:flex;align-items:center;justify-content:center;background:' + bgStyle + ';overflow:hidden;';

      if (artSvg) {
        const clonedSvg = artSvg.cloneNode(true);
        clonedSvg.style.cssText = 'width:60%;height:60%;';
        div.appendChild(clonedSvg);
      }

      lightboxContent.appendChild(div);
    }

    // Caption
    if (caption) {
      const h4 = caption.querySelector('h4');
      const span = caption.querySelector('span');
      lightboxCaption.innerHTML = (h4 ? '<strong>' + h4.textContent + '</strong>' : '') +
        (span ? ' &nbsp;·&nbsp; ' + span.textContent : '');
    }

    // Prev/next visibility
    lightboxPrev.style.display = index > 0 ? 'flex' : 'none';
    lightboxNext.style.display = index < visibleItems.length - 1 ? 'flex' : 'none';
  }

  // Attach click to each photo
  photoItems.forEach(function (item, i) {
    item.addEventListener('click', function () {
      visibleItems = getVisibleItems();
      const idx = visibleItems.indexOf(item);
      openLightbox(idx >= 0 ? idx : 0);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', function () {
      if (currentIndex > 0) {
        currentIndex--;
        showLightboxItem(currentIndex);
      }
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', function () {
      if (currentIndex < visibleItems.length - 1) {
        currentIndex++;
        showLightboxItem(currentIndex);
      }
    });
  }

  // Close on backdrop click
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (!lightbox || !lightbox.classList.contains('open')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      currentIndex--;
      showLightboxItem(currentIndex);
    }
    if (e.key === 'ArrowRight' && currentIndex < visibleItems.length - 1) {
      currentIndex++;
      showLightboxItem(currentIndex);
    }
  });

  // ─── VIDEO LAZY LOAD ─────────────────────────────────────
  const videoElements = document.querySelectorAll('.gallery-video');

  const videoObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const video = entry.target;
        const sources = video.querySelectorAll('source');
        sources.forEach(function (source) {
          if (source.dataset.src) {
            source.src = source.dataset.src;
          }
        });
        video.load();
        videoObserver.unobserve(video);
      }
    });
  }, { threshold: 0.1 });

  videoElements.forEach(function (video) {
    videoObserver.observe(video);
  });

  // ─── VIDEO PLACEHOLDER HIDE ON PLAY ──────────────────────
  videoElements.forEach(function (video) {
    video.addEventListener('play', function () {
      const overlay = video.parentElement.querySelector('.video-placeholder-overlay');
      if (overlay) {
        overlay.style.transition = 'opacity 0.3s ease';
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
      }
    });

    video.addEventListener('pause', function () {
      const overlay = video.parentElement.querySelector('.video-placeholder-overlay');
      if (overlay && video.currentTime === 0) {
        overlay.style.opacity = '1';
      }
    });
  });

});
