#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const indexHtmlPath = path.join(buildDir, 'index.html');
const cnamePath = path.join(__dirname, '..', 'CNAME');
const buildCnamePath = path.join(buildDir, 'CNAME');
const nojekyllPath = path.join(buildDir, '.nojekyll');

// Read the built index.html to extract asset paths
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

// Extract script and link tags
const scriptMatch = indexHtml.match(/<script[^>]*src="([^"]+)"[^>]*>/);
const linkMatch = indexHtml.match(/<link[^>]*href="([^"]+)"[^>]*>/);

if (!scriptMatch || !linkMatch) {
  console.error('Could not find script or link tags in index.html');
  process.exit(1);
}

const scriptSrc = scriptMatch[1];
const linkHref = linkMatch[1];

// Create 404.html with SPA routing support
const html404 = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI Franchise Lead Generation Platform</title>
    <script type="module" crossorigin src="${scriptSrc}"></script>
    <link rel="stylesheet" crossorigin href="${linkHref}">
    <script>
      // Single Page Apps for GitHub Pages
      // https://github.com/rafgraph/spa-github-pages
      var segmentCount = 0;

      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + segmentCount).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(segmentCount).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

// Write 404.html to build directory
fs.writeFileSync(path.join(buildDir, '404.html'), html404);

// Copy CNAME to build directory
if (fs.existsSync(cnamePath)) {
  fs.copyFileSync(cnamePath, buildCnamePath);
  console.log('✓ Copied CNAME to build directory');
}

// Create .nojekyll file to prevent Jekyll processing
fs.writeFileSync(nojekyllPath, '');
console.log('✓ Created .nojekyll file');

console.log('✓ Created 404.html with correct asset paths');
