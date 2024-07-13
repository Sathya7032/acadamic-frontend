const fs = require('fs');

// Define all your routes in an array
const routes = [
  '/',
  '/contact',
  '/tutorials',
  '/blogs',
  '/languages',
  '/signin',
  '/signup',
  '/shorts',
  '/reset/password',
  '/reset/password/confirm/:uid/:token',
  '/dashboard',
  '/your_blogs',
  '/todo',
  '/postBlog',
  '/tests',
  '/profile',
  '/change-password',
  '/tutorials/:url/',
  '/tutorials/posts/:url/',
  '/blogs/:url/',
  '/topics/:url/',
  '/languages/:url/codes',
  '/languages/codes/:url/',
  '/testtopics/:id/',
  '/test/:id/'
];

// Generate sitemap XML content
const generateSitemap = () => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  routes.forEach((route) => {
    sitemap += `
      <url>
        <loc>https://acadamicfolio.info${route}</loc>
      </url>`;
  });

  sitemap += `
  </urlset>`;

  return sitemap;
};

// Write sitemap to file
const writeSitemapToFile = () => {
  const sitemap = generateSitemap();
  fs.writeFileSync('./public/sitemap.xml', sitemap);
  console.log('Sitemap created successfully.');
};

// Call function to generate sitemap
writeSitemapToFile();
