import topics from '../data/topics';
import destinations from '../data/destinations';

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

  const destPages = destinations.map((d) => `  <url>
    <loc>${BASE_URL}/destination/${d.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>${d.tier === 'gold' ? '0.9' : '0.8'}</priority>
  </url>`).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/travel</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${BASE_URL}/pro</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
${topicPages}
${destPages}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
  return { props: {} };
}
