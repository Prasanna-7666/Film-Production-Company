// Theme Toggle functionality
document.addEventListener('DOMContentLoaded', function () {
  const themeToggles = document.querySelectorAll('#themeToggle, .themeToggle');
  const body = document.body;

  function updateIcons(isDark) {
    themeToggles.forEach(toggle => {
      const icon = toggle.querySelector('i');
      if (icon) {
        if (isDark) {
          icon.classList.remove('bi-moon');
          icon.classList.add('bi-sun');
        } else {
          icon.classList.remove('bi-sun');
          icon.classList.add('bi-moon');
        }
      }
    });
  }

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.remove('dark-mode');
    updateIcons(false);
  } else {
    body.classList.add('dark-mode');
    updateIcons(true);
  }

  // Toggle theme
  themeToggles.forEach(themeToggle => {
    themeToggle.addEventListener('click', function (e) {
      e.preventDefault();
      body.classList.toggle('dark-mode');

      const isDark = body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateIcons(isDark);
    });
  });

  // Back to Top button logic
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Form Validation (Simple)
  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // Portfolio Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Handle Button Active State
        filterBtns.forEach(b => {
          b.classList.remove('btn-main');
          b.classList.add('btn-outline-main');
        });
        btn.classList.remove('btn-outline-main');
        btn.classList.add('btn-main');

        // Handle Item Filtering
        const filterValue = btn.getAttribute('data-filter');
        portfolioItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
});
