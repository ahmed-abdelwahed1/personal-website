(function () {
  // Redirect back to /admin after logging in (common Netlify CMS pattern).
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on('init', function (user) {
      if (!user) {
        window.netlifyIdentity.on('login', function () {
          document.location.href = '/admin/';
        });
      }
    });

    // If we landed here with an identity token hash (invite/recovery), open the widget.
    // This helps when users click the email link and expect a password screen.
    var hash = window.location.hash || '';
    var hasToken =
      hash.indexOf('recovery_token=') !== -1 ||
      hash.indexOf('invite_token=') !== -1 ||
      hash.indexOf('confirmation_token=') !== -1;

    if (hasToken) {
      try {
        window.netlifyIdentity.init();
        window.netlifyIdentity.open();
      } catch (e) {
        // noop
      }
    }
  }
})();

