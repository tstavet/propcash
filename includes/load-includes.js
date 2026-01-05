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
  
  // Helper function to execute scripts within loaded HTML
  function executeScripts(container) {
    const scripts = container.querySelectorAll('script');
    scripts.forEach(oldScript => {
      const newScript = document.createElement('script');
      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else {
        newScript.textContent = oldScript.textContent;
      }
      document.body.appendChild(newScript);
    });
  }

  // Load header
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    fetch('/includes/header.html')
      .then(response => response.text())
      .then(html => {
        // Create temp container to parse the HTML
        const temp = document.createElement('div');
        temp.innerHTML = html;
        
        // Insert the HTML (without scripts first)
        headerPlaceholder.outerHTML = html;
        
        // Now execute the scripts
        executeScripts(temp);
      })
      .catch(err => console.error('Error loading header:', err));
  }

  // Load footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    fetch('/includes/footer.html')
      .then(response => response.text())
      .then(html => {
        // Create temp container to parse the HTML
        const temp = document.createElement('div');
        temp.innerHTML = html;
        
        // Insert the HTML
        footerPlaceholder.outerHTML = html;
        
        // Execute scripts
        executeScripts(temp);
      })
      .catch(err => console.error('Error loading footer:', err));
  }
})();
