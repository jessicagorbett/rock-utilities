/*
 * Ignore Editor Styles
 * Adds a marker class to Rock's editors (HTML Content, Content Component, Summernote)
 * and everything inside them, so scoped theme CSS can skip them:
 *
 *   .theme-wrapper .btn:not(.ignore-theme) { ... }
 *
 * Runs on load, then watches for editors added later (modals, UpdatePanel postbacks).
 *
 * Settings: change IGNORE_CLASS to match your theme's CSS, and add selectors to
 * EDITOR_SELECTORS for other editor chrome.
 *
 * Load it at the end of <body> in the master page, e.g.
 *   <script defer src="<%= ResolveRockUrl("~~/Scripts/ignore-editor-styles.js", true) %>"></script>
 */
(function () {
    'use strict';

    var IGNORE_CLASS = 'ignore-theme';

    var EDITOR_SELECTORS = [
        '[id$="HtmlContentEdit"]',      // HTML Content block editor
        '[id*="ContentComponentEdit"]', // Content Component edit panels and modals
        '.note-editor',                 // Summernote editor
        '.note-toolbar',                // Summernote toolbar
        '.note-popover'                 // Summernote popovers, rendered outside the editor
    ].join(', ');

    function markSubtree(root) {
        root.classList.add(IGNORE_CLASS);
        var descendants = root.getElementsByTagName('*');
        for (var i = 0; i < descendants.length; i++) {
            descendants[i].classList.add(IGNORE_CLASS);
        }
    }

    function scan(root) {
        if (root.matches && root.matches(EDITOR_SELECTORS)) {
            markSubtree(root);
            return;
        }
        if (root.closest && root.closest('.' + IGNORE_CLASS)) {
            // Added inside an editor that is already marked.
            markSubtree(root);
            return;
        }
        var editors = root.querySelectorAll(EDITOR_SELECTORS);
        for (var i = 0; i < editors.length; i++) {
            markSubtree(editors[i]);
        }
    }

    function start() {
        scan(document.body);

        var observer = new MutationObserver(function (mutations) {
            for (var m = 0; m < mutations.length; m++) {
                var added = mutations[m].addedNodes;
                for (var n = 0; n < added.length; n++) {
                    if (added[n].nodeType === Node.ELEMENT_NODE) {
                        scan(added[n]);
                    }
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();
