import Head from 'next/head';
import Link from 'next/link';
import { POSTS } from '../../data/blogPosts';

export async function getStaticPaths() {
  return {
    paths: Object.keys(POSTS).map(slug => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = POSTS[params.slug];
  if (!post) return { notFound: true };
  return { props: { post: { ...post, slug: params.slug } } };
}

export default function BlogPost({ post }) {
  return (
    <div style={{ background:'#111110', minHeight:'100vh', color:'#f0efe9', fontFamily:'DM Sans, sans-serif' }}>
      <Head>
        <title>{post.title} — RabbitHole Blog</title>
        <meta name="description" content={post.content[0]?.text || post.title} />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </Head>
      <nav style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 24px', background:'#1e1e1c', borderBottom:'1px solid #333331', flexWrap:'wrap', gap:'8px' }}>
        <Link href="/" style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'24px', letterSpacing:'2px', color:'#D85A30', textDecoration:'none' }}>RABBIT<span style={{ color:'#1D9E75' }}>HOLE</span></Link>
        <Link href="/blog" style={{ fontSize:'13px', color:'#777672', textDecoration:'none' }}>← All posts</Link>
      </nav>
      <div style={{ maxWidth:'720px', margin:'0 auto', padding:'48px 24px' }}>
        <div style={{ marginBottom:'40px' }}>
          <div style={{ fontSize:'56px', marginBottom:'16px' }}>{post.emoji}</div>
          <div style={{ display:'flex', gap:'12px', marginBottom:'16px' }}>
            <span style={{ fontSize:'12px', color:'#777672' }}>{post.date}</span>
            <span style={{ color:'#333' }}>·</span>
            <span style={{ fontSize:'12px', color:'#777672' }}>{post.readTime}</span>
          </div>
          <h1 style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'42px', letterSpacing:'2px', lineHeight:1.1, color:'#f0efe9', margin:0 }}>{post.title}</h1>
        </div>
        <div style={{ lineHeight:1.8 }}>
          {post.content.map((block, i) => {
            if (block.type === 'intro') return (
              <p key={i} style={{ fontSize:'18px', color:'#c0bfb9', lineHeight:1.7, marginBottom:'32px', borderLeft:'3px solid #1D9E75', paddingLeft:'20px' }}>{block.text}</p>
            );
            if (block.type === 'h2') return (
              <h2 key={i} style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'28px', letterSpacing:'2px', color:'#EF9F27', margin:'40px 0 16px' }}>{block.text}</h2>
            );
            if (block.type === 'p') return (
              <p key={i} style={{ fontSize:'16px', color:'#a0a09a', lineHeight:1.8, marginBottom:'20px' }}>{block.text}</p>
            );
            if (block.type === 'link') return (
              <div key={i} style={{ margin:'32px 0', padding:'20px 24px', background:'#1a1a18', border:'1px solid #1D9E75', borderRadius:'12px' }}>
                <Link href={block.href} style={{ color:'#1D9E75', textDecoration:'none', fontSize:'16px', fontWeight:'500' }}>{block.text}</Link>
              </div>
            );
            return null;
          })}
        </div>
        <div style={{ marginTop:'48px', padding:'24px', background:'#1a1a18', border:'1px solid #333331', borderRadius:'12px', textAlign:'center' }}>
          <div style={{ fontSize:'14px', color:'#777672', marginBottom:'12px' }}>Enjoyed this? Share it 👇</div>
          <div style={{ display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap' }}>
            <a href={'https://www.facebook.com/sharer/sharer.php?u=https://rabbitholevideo.com/blog/' + post.slug} target="_blank" rel="noopener noreferrer" style={{ background:'#1877F2', color:'#fff', padding:'8px 20px', borderRadius:'20px', textDecoration:'none', fontSize:'13px', fontWeight:'500' }}>📘 Facebook</a>
            <a href={'https://wa.me/?text=Check this out: https://rabbitholevideo.com/blog/' + post.slug} target="_blank" rel="noopener noreferrer" style={{ background:'#25D366', color:'#fff', padding:'8px 20px', borderRadius:'20px', textDecoration:'none', fontSize:'13px', fontWeight:'500' }}>💬 WhatsApp</a>
            <a href={'https://twitter.com/intent/tweet?url=https://rabbitholevideo.com/blog/' + post.slug} target="_blank" rel="noopener noreferrer" style={{ background:'#000', color:'#fff', padding:'8px 20px', borderRadius:'20px', textDecoration:'none', fontSize:'13px', fontWeight:'500' }}>🐦 Twitter/X</a>
          </div>
        </div>
        <div style={{ marginTop:'32px', textAlign:'center' }}>
          <Link href="/blog" style={{ color:'#777672', textDecoration:'none', fontSize:'13px' }}>← Back to all posts</Link>
        </div>
      </div>
      <footer style={{ borderTop:'1px solid #333331', padding:'24px', textAlign:'center', marginTop:'40px' }}>
        <Link href="/" style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'22px', letterSpacing:'2px', color:'#D85A30', textDecoration:'none' }}>RABBIT<span style={{ color:'#1D9E75' }}>HOLE</span></Link>
        <p style={{ fontSize:'11px', color:'#777672', marginTop:'8px' }}>The world's most viewed videos · 100 topics · updated daily</p>
      </footer>
    </div>
  );
}
