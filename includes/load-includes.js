/**
 * Propcash Include Loader
 * Loads header.html and footer.html into any page
 * 
 * Usage: Add these elements to your HTML:
 *   <div id="header-placeholder"></div>
 *   <div id="footer-placeholder"></div>
 * 
 * Then include this script at the bottom of your page:
 *   <script src="/includes/load-includes.js"></script>
 */

(function() {
  // Load header
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    fetch('/includes/header.html')
      .then(response => response.text())
      .then(html => {
        headerPlaceholder.outerHTML = html;
      })
      .catch(err => console.error('Error loading header:', err));
  }

  // Load footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    fetch('/includes/footer.html')
      .then(response => response.text())
      .then(html => {
        footerPlaceholder.outerHTML = html;
      })
      .catch(err => console.error('Error loading footer:', err));
  }
})();
