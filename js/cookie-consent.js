// ============================
// Cookie Consent Banner (Complianz-style)
// ============================

document.addEventListener('DOMContentLoaded', () => {
  const COOKIE_NAME = 'tern_cookie_consent';
  const COOKIE_EXPIRY = 365;

  // Check if already consented
  if (getCookie(COOKIE_NAME)) return;

  // Create and inject banner
  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.id = 'cookieBanner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.innerHTML = `
    <div class="cookie-banner__inner">
      <div class="cookie-banner__header">
        <img src="images/cookie-logo.png" alt="TERN" class="cookie-banner__logo">
        <h3>Manage Cookie Consent</h3>
      </div>
      <p class="cookie-banner__text">To provide the best experiences, we use technologies like cookies to store and/or access device information. Consenting to these technologies will allow us to process data such as browsing behaviour or unique IDs on this site. Not consenting or withdrawing consent, may adversely affect certain features and functions.</p>

      <div class="cookie-banner__categories" id="cookieCategories" style="display: none;">
        <div class="cookie-category">
          <div class="cookie-category__header">
            <label class="cookie-toggle">
              <input type="checkbox" checked disabled>
              <span class="cookie-toggle__slider disabled"></span>
            </label>
            <strong>Functional</strong>
            <span class="cookie-category__badge">Always active</span>
          </div>
          <p>The technical storage or access is strictly necessary for the legitimate purpose of enabling the use of a specific service explicitly requested by the subscriber or user, or for the sole purpose of carrying out the transmission of a communication over an electronic communications network.</p>
        </div>
        <div class="cookie-category">
          <div class="cookie-category__header">
            <label class="cookie-toggle">
              <input type="checkbox" id="cookiePreferences">
              <span class="cookie-toggle__slider"></span>
            </label>
            <strong>Preferences</strong>
          </div>
          <p>The technical storage or access is necessary for the legitimate purpose of storing preferences that are not requested by the subscriber or user.</p>
        </div>
        <div class="cookie-category">
          <div class="cookie-category__header">
            <label class="cookie-toggle">
              <input type="checkbox" id="cookieStatistics">
              <span class="cookie-toggle__slider"></span>
            </label>
            <strong>Statistics</strong>
          </div>
          <p>The technical storage or access that is used exclusively for statistical purposes. The technical storage or access that is used exclusively for anonymous statistical purposes. Without a subpoena, voluntary compliance on the part of your Internet Service Provider, or additional records from a third party, information stored or retrieved for this purpose alone cannot usually be used to identify you.</p>
        </div>
        <div class="cookie-category">
          <div class="cookie-category__header">
            <label class="cookie-toggle">
              <input type="checkbox" id="cookieMarketing">
              <span class="cookie-toggle__slider"></span>
            </label>
            <strong>Marketing</strong>
          </div>
          <p>The technical storage or access is required to create user profiles to send advertising, or to track the user on a website or across several websites for similar marketing purposes.</p>
        </div>
      </div>

      <div class="cookie-banner__actions">
        <button class="btn btn--accent" id="cookieAccept">Accept</button>
        <button class="btn cookie-btn--deny" id="cookieDeny">Deny</button>
        <button class="btn cookie-btn--prefs" id="cookieManage">Manage options</button>
      </div>
      <div class="cookie-banner__actions cookie-banner__actions--prefs" id="cookieSaveRow" style="display: none;">
        <button class="btn btn--accent" id="cookieSave">Save preferences</button>
        <button class="btn cookie-btn--deny" id="cookieBack">Back</button>
      </div>
      <div class="cookie-banner__links">
        <a href="privacy.html">Privacy Notice</a>
      </div>
    </div>
  `;

  document.body.appendChild(banner);

  // Show with animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      banner.classList.add('visible');
    });
  });

  // Event handlers
  document.getElementById('cookieAccept').addEventListener('click', () => {
    setCookie(COOKIE_NAME, 'all', COOKIE_EXPIRY);
    closeBanner();
  });

  document.getElementById('cookieDeny').addEventListener('click', () => {
    setCookie(COOKIE_NAME, 'functional', COOKIE_EXPIRY);
    closeBanner();
  });

  document.getElementById('cookieManage').addEventListener('click', () => {
    document.getElementById('cookieCategories').style.display = 'block';
    document.getElementById('cookieSaveRow').style.display = 'flex';
    document.querySelector('.cookie-banner__actions:not(.cookie-banner__actions--prefs)').style.display = 'none';
  });

  document.getElementById('cookieBack').addEventListener('click', () => {
    document.getElementById('cookieCategories').style.display = 'none';
    document.getElementById('cookieSaveRow').style.display = 'none';
    document.querySelector('.cookie-banner__actions:not(.cookie-banner__actions--prefs)').style.display = 'flex';
  });

  document.getElementById('cookieSave').addEventListener('click', () => {
    const prefs = document.getElementById('cookiePreferences').checked;
    const stats = document.getElementById('cookieStatistics').checked;
    const marketing = document.getElementById('cookieMarketing').checked;
    const value = ['functional'];
    if (prefs) value.push('preferences');
    if (stats) value.push('statistics');
    if (marketing) value.push('marketing');
    setCookie(COOKIE_NAME, value.join(','), COOKIE_EXPIRY);
    closeBanner();
  });

  function closeBanner() {
    banner.classList.remove('visible');
    setTimeout(() => banner.remove(), 400);
  }

  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/;SameSite=Lax`;
  }

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }
});
