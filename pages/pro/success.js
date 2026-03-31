import Head from 'next/head';
import Link from 'next/link';

export default function ProSuccess() {
  return (
    <div style={{ background: '#111110', minHeight: '100vh', color: '#f0efe9', fontFamily: 'DM Sans, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Head>
        <title>Welcome to RabbitHole Pro!</title>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ textAlign: 'center', padding: '24px', maxWidth: '480px' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🐇</div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '48px', letterSpacing: '3px', color: '#1D9E75', marginBottom: '12px' }}>
          WELCOME TO PRO!
        </h1>
        <p style={{ fontSize: '15px', color: '#777672', lineHeight: 1.6, marginBottom: '32px' }}>
          You now have unlimited games, leaderboard access, and the ability to challenge friends across all 100 topics.
        </p>
        <Link href="/" style={{ display: 'inline-block', background: '#D85A30', color: '#fff', padding: '13px 32px', borderRadius: '24px', fontSize: '15px', fontWeight: '500', textDecoration: 'none' }}>
          Start exploring →
        </Link>
      </div>
    </div>
  );
}
