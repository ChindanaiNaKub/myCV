document.addEventListener("DOMContentLoaded", function () {
    // Intersection Observer for info boxes and skill progress bars
    const boxes = document.querySelectorAll('.info-box');
    const observerOptions = { threshold: 0.3 };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
  
          // Animate skill progress bars within the box, if any
          const progressBars = entry.target.querySelectorAll('.skill-progress');
          progressBars.forEach((bar) => {
            const percent = bar.getAttribute('data-percent');
            bar.style.width = percent + '%';
          });
  
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    boxes.forEach((box) => observer.observe(box));
  
    // --- Interaction 1: Toggle extra content on info box click ---
    boxes.forEach((box) => {
      box.addEventListener('click', () => {
        box.classList.toggle('expanded');
      });
    });
  
    // --- Interaction 2: Custom tooltips for social links on hover ---
    const socialLinks = document.querySelectorAll('.social-links a');
  
    socialLinks.forEach(link => {
      // Create a tooltip element
      const tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      tooltip.innerText = link.getAttribute('data-tooltip');
      link.appendChild(tooltip);
  
      // Show tooltip on mouse enter
      link.addEventListener('mouseenter', () => {
        tooltip.style.opacity = 1;
      });
  
      // Hide tooltip on mouse leave
      link.addEventListener('mouseleave', () => {
        tooltip.style.opacity = 0;
      });
    });
  });
  