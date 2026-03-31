import topics from '../data/topics';

const BASE_URL = 'https://www.rabbitholevideo.com';

export default function Sitemap() {
  return null;
}

export async function getServerSideProps({ res }) {
  const topicPages = topics.map((t) => `  <url>
    <loc>${BASE_URL}/topic/${t.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>${t.tier === 'gold' ? '0.9' : '0.8'}</priority>
  </url>`).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/pro</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
${topicPages}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
  return { props: {} };
}
