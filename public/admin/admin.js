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

  // Improve the writing experience inside Decap CMS
  if (window.CMS) {
    // Better preview typography (tables, code, images)
    try {
      window.CMS.registerPreviewStyle('/admin/preview.css');
    } catch (e) {
      // noop
    }

    // Editor components (toolbar blocks)
    try {
      // Image (uses media library picker)
      window.CMS.registerEditorComponent({
        id: 'image',
        label: 'Image',
        fields: [
          { name: 'image', label: 'Image', widget: 'image' },
          { name: 'alt', label: 'Alt text', widget: 'string', required: false },
          { name: 'caption', label: 'Caption', widget: 'string', required: false },
        ],
        pattern: /^!\[(.*?)\]\((.*?)\)(?:\n\*(.*?)\*)?$/m,
        fromBlock: function (match) {
          return {
            alt: match[1],
            image: match[2],
            caption: match[3],
          };
        },
        toBlock: function (obj) {
          var alt = obj.alt || '';
          var img = obj.image || '';
          var caption = obj.caption ? '\n*' + obj.caption + '*\n' : '\n';
          return '![' + alt + '](' + img + ')' + caption;
        },
        toPreview: function (obj) {
          var alt = obj.alt || '';
          var img = obj.image || '';
          var cap = obj.caption ? '<figcaption>' + obj.caption + '</figcaption>' : '';
          return '<figure><img src="' + img + '" alt="' + alt + '" />' + cap + '</figure>';
        },
      });

      // Code block
      window.CMS.registerEditorComponent({
        id: 'code-block',
        label: 'Code',
        fields: [
          { name: 'language', label: 'Language', widget: 'string', required: false, default: 'text' },
          { name: 'code', label: 'Code', widget: 'text' },
        ],
        pattern: /^```(\w+)?\n([\s\S]*?)```$/m,
        fromBlock: function (match) {
          return {
            language: match[1] || 'text',
            code: match[2],
          };
        },
        toBlock: function (obj) {
          var lang = obj.language || 'text';
          return '```' + lang + '\n' + (obj.code || '') + '\n```\n';
        },
        toPreview: function (obj) {
          var code = (obj.code || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          return '<pre><code>' + code + '</code></pre>';
        },
      });

      // Table (inserts a Markdown table template)
      window.CMS.registerEditorComponent({
        id: 'table',
        label: 'Table',
        fields: [
          { name: 'columns', label: 'Columns (comma separated)', widget: 'string', default: 'Col A, Col B, Col C' },
          { name: 'rows', label: 'Rows', widget: 'number', default: 2, value_type: 'int', min: 1, max: 20 },
        ],
        pattern: /^\|(.+)\|\n\|([ -:|]+)\|\n([\s\S]+)$/m,
        fromBlock: function () {
          return { columns: 'Col A, Col B, Col C', rows: 2 };
        },
        toBlock: function (obj) {
          var cols = (obj.columns || '')
            .split(',')
            .map(function (s) { return s.trim(); })
            .filter(Boolean);
          if (!cols.length) cols = ['Col A', 'Col B'];

          var header = '| ' + cols.join(' | ') + ' |';
          var sep = '| ' + cols.map(function () { return '---'; }).join(' | ') + ' |';
          var rows = [];
          var count = parseInt(obj.rows, 10);
          if (!count || count < 1) count = 1;
          for (var i = 0; i < count; i++) {
            rows.push('| ' + cols.map(function () { return ' '; }).join(' | ') + ' |');
          }
          return header + '\n' + sep + '\n' + rows.join('\n') + '\n';
        },
        toPreview: function (obj) {
          // Let the built-in markdown preview handle it
          return '<div>Table inserted.</div>';
        },
      });
    } catch (e) {
      // noop
    }
  }
})();

