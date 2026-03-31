import Head from 'next/head';
import Link from 'next/link';
import topics from '../../data/topics';
import videoData from '../../data/videoData';

export async function getStaticPaths() {
  const paths = topics.map((t) => ({ params: { slug: t.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const topic = topics.find((t) => t.slug === params.slug);
  const related = topics.filter((t) => t.category === topic.category && t.slug !== topic.slug).slice(0, 6);
  const videos = videoData[params.slug] || [];
  return { props: { topic, related, videos } };
}

const tierColors = { gold: '#EF9F27', silver: '#B4B2A9', bronze: '#D85A30' };

const fakeViews = [
  { views: '892M views', bar: 100 },
  { views: '741M views', bar: 83 },
  { views: '624M views', bar: 70 },
  { views: '580M views', bar: 65 },
  { views: '498M views', bar: 56 },
  { views: '441M views', bar: 49 },
  { views: '389M views', bar: 44 },
  { views: '312M views', bar: 35 },
  { views: '267M views', bar: 30 },
  { views: '198M views', bar: 22 },
];

const rankStyle = [
  { num: '#1', color: '#EF9F27', size: '42px', bg: 'rgba(239,159,39,0.1)' },
  { num: '#2', color: '#B4B2A9', size: '36px', bg: 'rgba(180,178,169,0.1)' },
  { num: '#3', color: '#D85A30', size: '32px', bg: 'rgba(216,90,48,0.1)' },
  { num: '#4', color: '#555553', size: '24px', bg: 'transparent' },
  { num: '#5', color: '#555553', size: '24px', bg: 'transparent' },
  { num: '#6', color: '#555553', size: '24px', bg: 'transparent' },
  { num: '#7', color: '#555553', size: '24px', bg: 'transparent' },
  { num: '#8', color: '#555553', size: '24px', bg: 'transparent' },
  { num: '#9', color: '#555553', size: '24px', bg: 'transparent' },
  { num: '#10', color: '#555553', size: '24px', bg: 'transparent' },
];

export default function TopicPage({ topic, related, videos }) {
  return (
    <div style={{ background: '#111110', minHeight: '100vh', color: '#f0efe9', fontFamily: 'DM Sans, sans-serif' }}>
      <Head>
        <title>{`Most Viewed ${topic.name} Videos Of All Time — RabbitHole`}</title>
        <meta name="description" content={`The top 10 most viewed ${topic.name} videos on YouTube of all time, ranked by total worldwide views.`} />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', background: '#1e1e1c', borderBottom: '1px solid #333331', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '26px', letterSpacing: '2px', color: '#D85A30', textDecoration: 'none' }}>
          RABBIT<span style={{ color: '#1D9E75' }}>HOLE</span>
        </Link>
        <Link href="/" style={{ fontSize: '13px', color: '#777672', textDecoration: 'none' }}>← All 100 topics</Link>
      </nav>

      {/* Topic header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '32px 24px', background: topic.bg, borderBottom: '1px solid #333331' }}>
        <div style={{ fontSize: '64px' }}>{topic.emoji}</div>
        <div>
          <div style={{ fontSize: '11px', color: '#777672', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px' }}>🌍 Most viewed worldwide</div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '44px', letterSpacing: '2px', color: '#f0efe9', lineHeight: 1 }}>
            Top 10 {topic.name} Videos<br />Of All Time
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '20px', fontWeight: '500', color: '#1D9E75' }}>{topic.views} combined views</span>
            <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '4px', border: `1px solid ${tierColors[topic.tier]}`, color: tierColors[topic.tier] }}>{topic.tier} category</span>
          </div>
          <p style={{ fontSize: '13px', color: '#777672', marginTop: '8px', maxWidth: '500px' }}>
            Ranked by total YouTube views worldwide. Updated weekly.
          </p>
        </div>
      </div>

      {/* Affiliate strip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 24px', background: '#1e1e1c', borderBottom: '1px solid #333331' }}>
        <div style={{ fontSize: '22px' }}>{topic.emoji}</div>
        <div style={{ flex: 1 }}>
          <strong style={{ display: 'block', fontSize: '13px', color: '#f0efe9', marginBottom: '2px' }}>Shop gear from these videos</strong>
          <span style={{ fontSize: '11px', color: '#777672' }}>{topic.affText} — what the world's best use</span>
        </div>
        <a href={topic.affLink} target="_blank" rel="noopener noreferrer" style={{ background: '#1D9E75', color: '#fff', padding: '8px 18px', borderRadius: '20px', fontSize: '12px', fontWeight: '500', textDecoration: 'none', whiteSpace: 'nowrap' }}>Shop now →</a>
      </div>

      {/* Video list */}
      <div style={{ padding: '24px', maxWidth: '820px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', letterSpacing: '1px', color: '#777672', marginBottom: '20px' }}>
          Top 10 most viewed {topic.name} videos — worldwide rankings
        </h2>

        {videos.length > 0 ? videos.slice(0, 10).map((video, i) => (
          <div key={i} style={{ marginBottom: '20px' }}>
            {/* Rank header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: rankStyle[i].size,
                color: rankStyle[i].color,
                background: rankStyle[i].bg,
                minWidth: '64px',
                textAlign: 'center',
                padding: '4px 8px',
                borderRadius: '6px',
                lineHeight: 1,
              }}>
                {rankStyle[i].num}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: i < 3 ? '15px' : '13px', fontWeight: '500', color: '#f0efe9', marginBottom: '4px' }}>{video.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '13px', color: '#1D9E75', fontWeight: '500' }}>{fakeViews[i].views}</span>
                  <div style={{ flex: 1, height: '4px', background: '#333331', borderRadius: '2px', maxWidth: '200px' }}>
                    <div style={{ width: `${fakeViews[i].bar}%`, height: '4px', background: i < 3 ? rankStyle[i].color : '#1D9E75', borderRadius: '2px' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded video */}
            <div style={{ borderRadius: '10px', overflow: 'hidden', background: '#1e1e1c', border: i < 3 ? `1px solid ${rankStyle[i].color}40` : '1px solid #333331' }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )) : (
          <p style={{ color: '#777672' }}>Videos coming soon!</p>
        )}
      </div>

      {/* Bottom affiliate CTA */}
      <div style={{ margin: '0 24px 24px', maxWidth: '772px', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ background: '#1e1e1c', border: '1px solid #333331', borderRadius: '12px', padding: '20px 24px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', color: '#f0efe9', marginBottom: '6px' }}>Love {topic.name}?</h3>
          <p style={{ fontSize: '13px', color: '#777672', marginBottom: '14px' }}>Shop the exact gear featured in the world's most viewed {topic.name} videos.</p>
          <a href={topic.affLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: '#D85A30', color: '#fff', padding: '10px 24px', borderRadius: '24px', fontSize: '13px', fontWeight: '500', textDecoration: 'none' }}>
            Browse {topic.affText} →
          </a>
        </div>
      </div>

      {/* Related topics */}
      {related.length > 0 && (
        <div style={{ padding: '0 24px 24px', maxWidth: '820px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', letterSpacing: '1px', color: '#f0efe9', marginBottom: '14px' }}>More {topic.category} rabbit holes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '8px' }}>
            {related.map((r) => (
              <Link key={r.slug} href={`/topic/${r.slug}`} style={{ background: '#1e1e1c', border: '1px solid #333331', borderRadius: '10px', padding: '12px', textDecoration: 'none', display: 'block' }}>
                <div style={{ fontSize: '20px', marginBottom: '5px' }}>{r.emoji}</div>
                <div style={{ fontSize: '12px', fontWeight: '500', color: '#f0efe9', lineHeight: 1.3 }}>{r.name}</div>
                <div style={{ fontSize: '10px', color: '#1D9E75', marginTop: '3px' }}>{r.views} views</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center', padding: '16px 24px 32px' }}>
        <Link href="/" style={{ display: 'inline-block', padding: '10px 24px', border: '1px solid #333331', borderRadius: '24px', color: '#777672', fontSize: '13px', textDecoration: 'none' }}>← Back to all 100 topics</Link>
      </div>

      <footer style={{ borderTop: '1px solid #333331', padding: '24px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px', letterSpacing: '2px', color: '#D85A30', marginBottom: '6px' }}>RABBIT<span style={{ color: '#1D9E75' }}>HOLE</span></div>
        <p style={{ fontSize: '11px', color: '#777672' }}>The world's most viewed videos · 100 topics · updated weekly</p>
      </footer>
    </div>
  );
}
