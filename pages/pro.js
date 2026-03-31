import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function ProPage() {
  const [loading, setLoading] = useState(false);
  const [yearly, setYearly] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch('/api/checkout', { method: 'POST' });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else setLoading(false);
  };

  return (
    <div style={{ background: '#111110', minHeight: '100vh', color: '#f0efe9', fontFamily: 'DM Sans, sans-serif' }}>
      <Head>
        <title>RabbitHole Pro — Unlimited Games & Leaderboards</title>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', background: '#1e1e1c', borderBottom: '1px solid #333331', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '26px', letterSpacing: '2px', color: '#D85A30', textDecoration: 'none' }}>
          RABBIT<span style={{ color: '#1D9E75' }}>HOLE</span>
        </Link>
        <Link href="/" style={{ fontSize: '13px', color: '#777672', textDecoration: 'none' }}>← Back to topics</Link>
      </nav>

      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '52px', letterSpacing: '3px', lineHeight: 1, marginBottom: '12px' }}>
            GO DEEPER.<br /><span style={{ color: '#D85A30' }}>UNLOCK PRO.</span>
          </h1>
          <p style={{ fontSize: '15px', color: '#777672', lineHeight: 1.6 }}>
            Play unlimited ranking games, challenge friends, and track your scores across all 100 topics.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '28px' }}>
          <span style={{ fontSize: '14px', color: yearly ? '#777672' : '#f0efe9' }}>Monthly</span>
          <div
            onClick={() => setYearly(!yearly)}
            style={{ width: '44px', height: '24px', background: '#1D9E75', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}
          >
            <div style={{ width: '18px', height: '18px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '3px', left: yearly ? '23px' : '3px', transition: 'left 0.2s' }} />
          </div>
          <span style={{ fontSize: '14px', color: yearly ? '#f0efe9' : '#777672' }}>
            Yearly <span style={{ background: '#1D9E75', color: '#fff', fontSize: '11px', padding: '2px 8px', borderRadius: '10px' }}>Save 35%</span>
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          <div style={{ background: '#1e1e1c', border: '1px solid #333331', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '12px', color: '#777672', marginBottom: '6px' }}>Free</div>
            <div style={{ fontSize: '32px', fontWeight: '500' }}>$0</div>
            <div style={{ fontSize: '12px', color: '#777672', marginBottom: '16px' }}>forever</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['All 100 rankings', '3 games per day'].map(f => (
                <div key={f} style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px', color: '#f0efe9' }}>
                  <span style={{ color: '#1D9E75' }}>✓</span>{f}
                </div>
              ))}
              {['Unlimited games', 'Leaderboard', 'Challenge a friend', 'Weekly digest'].map(f => (
                <div key={f} style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px', color: '#444441' }}>
                  <span>–</span>{f}
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#1e1e1c', border: '2px solid #D85A30', borderRadius: '12px', padding: '20px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#D85A30', color: '#fff', fontSize: '11px', padding: '3px 12px', borderRadius: '10px', whiteSpace: 'nowrap' }}>Most popular</div>
            <div style={{ fontSize: '12px', color: '#777672', marginBottom: '6px' }}>Pro</div>
            <div style={{ fontSize: '32px', fontWeight: '500' }}>{yearly ? '$3.25' : '$4.99'}<span style={{ fontSize: '14px', fontWeight: '400', color: '#777672' }}>/mo</span></div>
            <div style={{ fontSize: '12px', color: '#777672', marginBottom: '16px' }}>{yearly ? 'billed $39/year' : 'billed monthly'}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['All 100 rankings', 'Unlimited games', 'Leaderboard', 'Challenge a friend', 'Weekly digest', 'Early access topics'].map(f => (
                <div key={f} style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px', color: '#f0efe9' }}>
                  <span style={{ color: '#1D9E75' }}>✓</span>{f}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          style={{ width: '100%', padding: '14px', background: loading ? '#444441' : '#D85A30', color: '#fff', border: 'none', borderRadius: '24px', fontSize: '16px', fontWeight: '500', cursor: loading ? 'default' : 'pointer', fontFamily: 'DM Sans, sans-serif', marginBottom: '12px' }}
        >
          {loading ? 'Loading...' : 'Start 7-day free trial →'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#777672' }}>
          No credit card required · Cancel anytime
        </p>

        <div style={{ marginTop: '40px', borderTop: '1px solid #333331', paddingTop: '32px' }}>
          {[
            { q: 'Can I cancel anytime?', a: 'Yes — cancel any time from your account settings. You keep Pro until the end of your billing period.' },
            { q: 'Is there really a free trial?', a: 'Yes, 7 days free. No credit card required to start.' },
            { q: 'How often are new topics added?', a: 'Monthly. Pro members get access 2 weeks early and can vote on new topics.' },
          ].map(({ q, a }) => (
            <div key={q} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #333331' }}>
              <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>{q}</div>
              <div style={{ fontSize: '13px', color: '#777672', lineHeight: 1.6 }}>{a}</div>
            </div>
          ))}
        </div>

      </div>

      <footer style={{ borderTop: '1px solid #333331', padding: '24px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px', letterSpacing: '2px', color: '#D85A30', marginBottom: '6px' }}>RABBIT<span style={{ color: '#1D9E75' }}>HOLE</span></div>
        <p style={{ fontSize: '11px', color: '#777672' }}>100 topics · 1,000 top videos · updated weekly</p>
      </footer>
    </div>
  );
}
