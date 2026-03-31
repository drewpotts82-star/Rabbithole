import Head from 'next/head';
import Link from 'next/link';
import destinations from '../../data/destinations';

export async function getStaticPaths() {
  const paths = destinations.map((d) => ({ params: { slug: d.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const destination = destinations.find((d) => d.slug === params.slug);
  const related = destinations.filter((d) => d.region === destination.region && d.slug !== destination.slug).slice(0, 6);
  return { props: { destination, related } };
}

const fakeViews = ['892M views','741M views','624M views','580M views','498M views','441M views','389M views','312M views','267M views','198M views'];
const rankStyle = [
  { color: '#EF9F27', size: '42px', bg: 'rgba(239,159,39,0.1)' },
  { color: '#B4B2A9', size: '36px', bg: 'rgba(180,178,169,0.1)' },
  { color: '#D85A30', size: '32px', bg: 'rgba(216,90,48,0.1)' },
  { color: '#555553', size: '22px', bg: 'transparent' },
  { color: '#555553', size: '22px', bg: 'transparent' },
  { color: '#555553', size: '22px', bg: 'transparent' },
  { color: '#555553', size: '22px', bg: 'transparent' },
  { color: '#555553', size: '22px', bg: 'transparent' },
  { color: '#555553', size: '22px', bg: 'transparent' },
  { color: '#555553', size: '22px', bg: 'transparent' },
];

export default function DestinationPage({ destination: d, related }) {
  return (
    <div style={{ background: '#111110', minHeight: '100vh', color: '#f0efe9', fontFamily: 'DM Sans, sans-serif' }}>
      <Head>
        <title>{`Best ${d.name} Travel Videos — RabbitHole`}</title>
        <meta name="description" content={`The top 10 most viewed ${d.name} travel videos on YouTube. Plan your trip to ${d.name}, ${d.country} — book hotels, tours and experiences.`} />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', background: '#1e1e1c', borderBottom: '1px solid #333331', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '26px', letterSpacing: '2px', color: '#D85A30', textDecoration: 'none' }}>
          RABBIT<span style={{ color: '#1D9E75' }}>HOLE</span>
        </Link>
        <Link href="/travel" style={{ fontSize: '13px', color: '#777672', textDecoration: 'none' }}>← All destinations</Link>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '32px 24px', background: d.bg, borderBottom: '1px solid #333331' }}>
        <div style={{ fontSize: '72px' }}>{d.emoji}</div>
        <div>
          <div style={{ fontSize: '11px', color: '#777672', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px' }}>✈ {d.country}</div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '44px', letterSpacing: '2px', color: '#f0efe9', lineHeight: 1 }}>{d.name}</h1>
          <div style={{ fontSize: '15px', color: '#777672', marginTop: '4px', marginBottom: '10px' }}>{d.desc}</div>
          <div style={{ fontSize: '20px', fontWeight: '500', color: '#1D9E75' }}>{d.views} total views</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', padding: '16px 24px', background: '#1e1e1c', borderBottom: '1px solid #333331' }}>
        <a href={d.bookingLink} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px', background: '#003580', borderRadius: '10px', textDecoration: 'none', gap: '4px' }}>
          <span style={{ fontSize: '18px' }}>🏨</span>
          <span style={{ fontSize: '12px', fontWeight: '500', color: '#fff' }}>Book Hotels</span>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>via Booking.com</span>
        </a>
        <a href={d.tourLink} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px', background: '#FF6B35', borderRadius: '10px', textDecoration: 'none', gap: '4px' }}>
          <span style={{ fontSize: '18px' }}>🎟</span>
          <span style={{ fontSize: '12px', fontWeight: '500', color: '#fff' }}>Book Tours</span>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>via GetYourGuide</span>
        </a>
        <a href={d.gearLink} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px', background: '#232F3E', borderRadius: '10px', textDecoration: 'none', gap: '4px' }}>
          <span style={{ fontSize: '18px' }}>🎒</span>
          <span style={{ fontSize: '12px', fontWeight: '500', color: '#fff' }}>Travel Gear</span>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>via Amazon</span>
        </a>
      </div>

      <div style={{ padding: '24px', maxWidth: '820px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', letterSpacing: '1px', color: '#777672', marginBottom: '20px' }}>Top 10 most viewed {d.name} videos — worldwide</h2>
        {d.videos.map((video, i) => (
          <div key={i} style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: rankStyle[i].size, color: rankStyle[i].color, background: rankStyle[i].bg, minWidth: '64px', textAlign: 'center', padding: '4px 8px', borderRadius: '6px', lineHeight: 1 }}>#{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: i < 3 ? '15px' : '13px', fontWeight: '500', color: '#f0efe9', marginBottom: '4px' }}>{video}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '13px', color: '#1D9E75', fontWeight: '500' }}>{fakeViews[i]}</span>
                  <div style={{ flex: 1, height: '4px', background: '#333331', borderRadius: '2px', maxWidth: '200px' }}>
                    <div style={{ width: `${100 - i * 9}%`, height: '4px', background: i < 3 ? rankStyle[i].color : '#1D9E75', borderRadius: '2px' }} />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ borderRadius: '10px', overflow: 'hidden', background: '#1e1e1c', border: `1px solid ${i < 3 ? rankStyle[i].color + '40' : '#333331'}` }}>
              <div style={{ background: d.bg, height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>{d.emoji}</div>
              <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '500', color: '#f0efe9' }}>{video}</div>
                  <div style={{ fontSize: '11px', color: '#777672', marginTop: '2px' }}>YouTube · {d.name} travel</div>
                </div>
                <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(video + ' ' + d.name)}`} target="_blank" rel="noopener noreferrer" style={{ background: '#D85A30', color: '#fff', padding: '6px 14px', borderRadius: '16px', fontSize: '11px', textDecoration: 'none', whiteSpace: 'nowrap', fontWeight: '500' }}>Watch →</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ margin: '0 24px 24px', maxWidth: '772px', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ background: d.bg, border: '1px solid #333331', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>{d.emoji}</div>
          <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#f0efe9', marginBottom: '6px' }}>Ready to visit {d.name}?</h3>
          <p style={{ fontSize: '13px', color: '#777672', marginBottom: '20px' }}>Book your hotels, tours and gear right now.</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={d.bookingLink} target="_blank" rel="noopener noreferrer" style={{ background: '#003580', color: '#fff', padding: '10px 20px', borderRadius: '20px', fontSize: '13px', fontWeight: '500', textDecoration: 'none' }}>🏨 Find hotels</a>
            <a href={d.tourLink} target="_blank" rel="noopener noreferrer" style={{ background: '#FF6B35', color: '#fff', padding: '10px 20px', borderRadius: '20px', fontSize: '13px', fontWeight: '500', textDecoration: 'none' }}>🎟 Book tours</a>
            <a href={d.gearLink} target="_blank" rel="noopener noreferrer" style={{ background: '#232F3E', color: '#fff', padding: '10px 20px', borderRadius: '20px', fontSize: '13px', fontWeight: '500', textDecoration: 'none' }}>🎒 Shop gear</a>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div style={{ padding: '0 24px 24px', maxWidth: '820px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', letterSpacing: '1px', color: '#f0efe9', marginBottom: '14px' }}>More {d.region} destinations</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '8px' }}>
            {related.map((r) => (
              <Link key={r.slug} href={`/destination/${r.slug}`} style={{ background: '#1e1e1c', border: '1px solid #333331', borderRadius: '10px', padding: '12px', textDecoration: 'none', display: 'block' }}>
                <div style={{ fontSize: '20px', marginBottom: '5px' }}>{r.emoji}</div>
                <div style={{ fontSize: '12px', fontWeight: '500', color: '#f0efe9', lineHeight: 1.3 }}>{r.name}</div>
                <div style={{ fontSize: '10px', color: '#777672', marginTop: '2px' }}>{r.country}</div>
                <div style={{ fontSize: '10px', color: '#1D9E75', marginTop: '3px' }}>{r.views}</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center', padding: '16px 24px 32px' }}>
        <Link href="/travel" style={{ display: 'inline-block', padding: '10px 24px', border: '1px solid #333331', borderRadius: '24px', color: '#777672', fontSize: '13px', textDecoration: 'none' }}>← Back to all destinations</Link>
      </div>

      <footer style={{ borderTop: '1px solid #333331', padding: '24px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px', letterSpacing: '2px', color: '#D85A30', marginBottom: '6px' }}>RABBIT<span style={{ color: '#1D9E75' }}>HOLE</span></div>
        <p style={{ fontSize: '11px', color: '#777672' }}>100 destinations · most viewed travel videos worldwide</p>
      </footer>
    </div>
  );
}
