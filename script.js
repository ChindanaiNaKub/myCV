document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer for info boxes and skill progress bars
  const infoBoxes = document.querySelectorAll('.info-box');
  const observerOptions = { threshold: 0.3 };

  const intersectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');

        // Animate skill progress bars within the box, if any
        const progressBars = entry.target.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
          const percent = bar.getAttribute('data-percent'); // Ensure data-percent exists
          if (percent) {
            setTimeout(() => {
              bar.style.width = `${percent}%`;
            }, 300); // Delay for a smooth effect
          }
        });

        // Stop observing once the box has been animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe each info box and add a click event to toggle extra content
  infoBoxes.forEach(box => {
    intersectionObserver.observe(box);
    box.addEventListener('click', () => box.classList.toggle('expanded'));
  });

  // Custom tooltips for social links on hover and focus
  const socialLinks = document.querySelectorAll('.social-links a');

  socialLinks.forEach(link => {
    const tooltipText = link.getAttribute('data-tooltip');
    if (!tooltipText) return; // Skip if no tooltip text is provided

    // Create and style the tooltip element
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.innerText = tooltipText;
    tooltip.style.opacity = '0';
    tooltip.style.transition = 'opacity 0.3s ease'; // Smooth fade-in/out

    // Append the tooltip to the link element
    link.appendChild(tooltip);

    // Function to show/hide tooltip
    const showTooltip = () => { tooltip.style.opacity = '1'; };
    const hideTooltip = () => { tooltip.style.opacity = '0'; };

    // Show tooltip on mouse enter and focus (for accessibility)
    link.addEventListener('mouseenter', showTooltip);
    link.addEventListener('focus', showTooltip);

    // Hide tooltip on mouse leave and blur
    link.addEventListener('mouseleave', hideTooltip);
    link.addEventListener('blur', hideTooltip);
  });
});
