/* ==========================================================================
   Various functions that we want to use within the template
   ========================================================================== */

/*jslint es6 */
'use strict';

// Constants for CDNs
const PLOTLY_URL = "https://cdn.jsdelivr.net/npm/plotly.js@3.6.0/dist/plotly.min.js";
const MERMAID_URL = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

// Determine the computed theme, which can be "dark" or "light". Dark is the default for
// every visitor, independent of the OS preference; only a saved "light" choice changes it.
function determineComputedTheme() {
  let themeSetting = null;
  try {
    themeSetting = localStorage.getItem("theme");
  } catch (e) {
    // Storage can be unavailable (e.g. blocked site data); fall back to the default
  }
  return themeSetting === "light" ? "light" : "dark";
}

// Set the theme on page load or when explicitly called. The initial theme is already applied
// by the inline script in _includes/head.html; this keeps the toggle label and browser UI in sync.
// The toggle is labeled with the action it performs (its icon shows the theme it switches to).
function setTheme(theme) {
  const use_theme = theme || determineComputedTheme();
  const is_dark = use_theme === "dark";
  const toggle_label = is_dark ? "Switch to light theme" : "Switch to dark theme";

  $("html").attr("data-theme", is_dark ? "dark" : "light");
  $("#theme-toggle").attr({ "aria-label": toggle_label, "title": toggle_label });
  $('meta[name="theme-color"]').attr("content", is_dark ? "#111827" : "#f8fafc");
}

// Toggle the theme manually and remember the choice across pages and reloads
function toggleTheme() {
  const new_theme = $("html").attr("data-theme") === "light" ? "dark" : "light";
  try {
    localStorage.setItem("theme", new_theme);
  } catch (e) {
    // The theme still changes for this page if the choice cannot be stored
  }
  setTheme(new_theme);
  redrawPlotly();
}

// Defer the loading of Mermaid to only if there is a field on the page to be rendered
let mermaidElements = document.querySelectorAll("pre>code.language-mermaid");
if (mermaidElements.length > 0) {
  document.addEventListener("readystatechange", function() {
    // Append the Mermaid module to the DOM
    const moduleScript = document.createElement('script');
    moduleScript.type = 'module';
    moduleScript.textContent = `
      import mermaid from '${MERMAID_URL}';
      mermaid.initialize({startOnLoad:true, theme:'default'});
      await mermaid.run({querySelector:'code.language-mermaid'});
    `;
    document.body.appendChild(moduleScript);
  });
}

/* ==========================================================================
   Plotly integration script so that Markdown codeblocks will be rendered
   ========================================================================== */

// Read the Plotly data from the code block, hide it, and render the chart as new node. This allows for the
// JSON data to be retrieve when the theme is switched. The listener should only be added if the data is
// actually present on the page.
//
// NOTE that plotlyDarkLayout and plotlyLightLayout will be exposed in the minimized file
let plotlyElements = document.querySelectorAll("pre>code.language-plotly");
if (plotlyElements.length > 0) {
  document.addEventListener("readystatechange", function() {
    // Return if not ready
    if (document.readyState !== "complete") {
      return;
    }

    // Prepare to load Plotly from the CDN
    const script = document.createElement('script');
    script.src = PLOTLY_URL;
    script.async = true;

    // Once loaded, update the page elements to work with it
    script.onload = function() {
      plotlyElements.forEach(function(elem) {
        // Parse the Plotly JSON data and hide it
        let jsonData = JSON.parse(elem.textContent);
        elem.parentElement.classList.add("hidden");

        // Add the Plotly node
        let chartElement = document.createElement("div");
        elem.parentElement.after(chartElement);

        // Set the theme for the plot and render it
        const theme = (determineComputedTheme() === "dark") ? plotlyDarkLayout : plotlyLightLayout;
        if (jsonData.layout) {
          jsonData.layout.template = (jsonData.layout.template) ? { ...theme, ...jsonData.layout.template } : theme;
        } else {
          jsonData.layout = { template: theme };
        }
        Plotly.react(chartElement, jsonData.data, jsonData.layout);
      });
    }

    // Add the script to the document
    document.head.appendChild(script);
  });
}

function redrawPlotly() {
  plotlyElements.forEach(function(elem) {
    // Parse the Plotly JSON data
    let jsonData = JSON.parse(elem.textContent);

    // Get the Plotly node
    let chartElement = $(elem).parent().next().get(0);

    // Set the theme for the plot and render it
    const theme = (determineComputedTheme() === "dark") ? plotlyDarkLayout : plotlyLightLayout;
    if (jsonData.layout) {
      jsonData.layout.template = (jsonData.layout.template) ? { ...theme, ...jsonData.layout.template } : theme;
    } else {
      jsonData.layout = { template: theme };
    }
    Plotly.react(chartElement, jsonData.data, jsonData.layout);
  });
}

/* ==========================================================================
   Actions that should occur when the page has been fully loaded
   ========================================================================== */

$(document).ready(function () {
  // SCSS SETTINGS - These should be the same as the settings in the relevant files
  const scssLarge = 925;          // pixels, from /_sass/_themes.scss
  const scssMastheadHeight = 70;  // pixels, from the current theme (e.g., /_sass/theme/_default.scss)

  // Sync the theme toggle with the theme applied in <head>, and handle clicks on it
  setTheme();
  $("#theme-toggle").on("click", toggleTheme);

  // The footer stays in the document flow (see _sass/layout/_site.scss), so the
  // template's sticky-footer body margin is no longer needed.

  // Follow menu drop down
  $(".author__urls-wrapper button").on("click", function () {
    const $button = $(this);
    $(".author__urls").fadeToggle("fast", function () {
      $button.attr("aria-expanded", $(this).is(":visible") ? "true" : "false");
    });
    $button.toggleClass("open");
  });

  // Restore the follow menu if toggled on a window resize
  jQuery(window).on('resize', function () {
    if ($('.author__urls.social-icons').css('display') == 'none' && $(window).width() >= scssLarge) {
      $(".author__urls").css('display', 'block')
    }
  });

});
