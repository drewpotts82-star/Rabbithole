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

export default function TopicPage({ topic, related, videos }) {
  return (
    <div style={{background:'#111110',minHeight:'100vh',color:'#f0efe9',fontFamily:'DM Sans, sans-serif'}}>
      <Head>
        <title>{`Top 10 ${topic.name} Videos — RabbitHole`}</title>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 24px',background:'#1e1e1c',borderBottom:'1px solid #333331',position:'sticky',top:0,zIndex:50}}>
        <Link href="/" style={{fontFamily:'Bebas Neue, sans-serif',fontSize:'26px',letterSpacing:'2px',color:'#D85A30',textDecoration:'none'}}>
          RABBIT<span style={{color:'#1D9E75'}}>HOLE</span>
        </Link>
        <Link href="/" style={{fontSize:'13px',color:'#777672',textDecoration:'none'}}>← All topics</Link>
      </nav>

      <div style={{display:'flex',alignItems:'center',gap:'20px',padding:'32px 24px',background:topic.bg,borderBottom:'1px solid #333331'}}>
        <div style={{fontSize:'56px'}}>{topic.emoji}</div>
        <div>
          <div style={{fontSize:'11px',color:'#777672',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'4px'}}>{topic.category}</div>
          <h1 style={{fontFamily:'Bebas Neue, sans-serif',fontSize:'48px',letterSpacing:'2px',color:'#f0efe9',lineHeight:1}}>{topic.name}</h1>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginTop:'8px'}}>
            <span style={{fontSize:'13px',color:'#1D9E75'}}>{topic.views} total views</span>
            <span style={{fontSize:'10px',padding:'2px 8px',borderRadius:'4px',border:`1px solid ${tierColors[topic.tier]}`,color:tierColors[topic.tier]}}>{topic.tier}</span>
          </div>
        </div>
      </div>

      <div style={{display:'flex',alignItems:'center',gap:'12px',padding:'14px 24px',background:'#1e1e1c',borderBottom:'1px solid #333331'}}>
        <div style={{fontSize:'24px'}}>{topic.emoji}</div>
        <div style={{flex:1}}>
          <strong style={{display:'block',fontSize:'13px',color:'#f0efe9',marginBottom:'2px'}}>Gear from these videos</strong>
          <span style={{fontSize:'11px',color:'#777672'}}>{topic.affText}</span>
        </div>
        <a href={topic.affLink} target="_blank" rel="noopener noreferrer" style={{background:'#1D9E75',color:'#fff',padding:'8px 18px',borderRadius:'20px',fontSize:'12px',fontWeight:'500',textDecoration:'none'}}>Shop now →</a>
      </div>

      <div style={{padding:'24px',maxWidth:'800px',margin:'0 auto'}}>
        <h2 style={{fontFamily:'Bebas Neue, sans-serif',fontSize:'22px',letterSpacing:'1px',color:'#f0efe9',marginBottom:'16px'}}>Top 10 videos of all time</h2>

        {videos.length > 0 ? videos.slice(0,10).map((video, i) => (
          <div key={i} style={{marginBottom:'16px',borderRadius:'10px',overflow:'hidden',background:'#1e1e1c',border:'1px solid #333331'}}>
            <div style={{position:'relative',paddingBottom:'56.25%',height:0}}>
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',border:'none'}}
                allowFullScreen
              />
            </div>
            <div style={{padding:'10px 14px',display:'flex',alignItems:'center',gap:'10px'}}>
              <div style={{fontFamily:'Bebas Neue, sans-serif',fontSize:'20px',color:'#444441',minWidth:'28px'}}>{i+1}</div>
              <div style={{fontSize:'13px',color:'#f0efe9',fontWeight:'500'}}>{video.title}</div>
            </div>
          </div>
        )) : (
          <p style={{color:'#777672'}}>Videos coming soon!</p>
        )}
      </div>

      <div style={{margin:'0 24px 24px',maxWidth:'752px',marginLeft:'auto',marginRight:'auto'}}>
        <div style={{background:'#1e1e1c',border:'1px solid #333331',borderRadius:'12px',padding:'20px 24px',textAlign:'center'}}>
          <h3 style={{fontFamily:'Bebas Neue, sans-serif',fontSize:'24px',color:'#f0efe9',marginBottom:'6px'}}>Love {topic.name}?</h3>
          <p style={{fontSize:'13px',color:'#777672',marginBottom:'14px'}}>Shop the exact gear featured in these videos.</p>
          <a href={topic.affLink} target="_blank" rel="noopener noreferrer" style={{display:'inline-block',background:'#D85A30',color:'#fff',padding:'10px 24px',borderRadius:'24px',fontSize:'13px',fontWeight:'500',textDecoration:'none'}}>Browse {topic.affText} →</a>
        </div>
      </div>

      {related.length > 0 && (
        <div style={{padding:'0 24px 24px',maxWidth:'800px',margin:'0 auto'}}>
          <h2 style={{fontFamily:'Bebas Neue, sans-serif',fontSize:'22px',letterSpacing:'1px',color:'#f0efe9',marginBottom:'14px'}}>More {topic.category} rabbit holes</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(130px, 1fr))',gap:'8px'}}>
            {related.map((r) => (
              <Link key={r.slug} href={`/topic/${r.slug}`} style={{background:'#1e1e1c',border:'1px solid #333331',borderRadius:'10px',padding:'12px',textDecoration:'none',display:'block'}}>
                <div style={{fontSize:'20px',marginBottom:'5px'}}>{r.emoji}</div>
                <div style={{fontSize:'12px',fontWeight:'500',color:'#f0efe9',lineHeight:1.3}}>{r.name}</div>
                <div style={{fontSize:'10px',color:'#1D9E75',marginTop:'3px'}}>{r.views}</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div style={{textAlign:'center',padding:'16px 24px 32px'}}>
        <Link href="/" style={{display:'inline-block',padding:'10px 24px',border:'1px solid #333331',borderRadius:'24px',color:'#777672',fontSize:'13px',textDecoration:'none'}}>← Back to all 100 topics</Link>
      </div>

      <footer style={{borderTop:'1px solid #333331',padding:'24px',textAlign:'center'}}>
        <div style={{fontFamily:'Bebas Neue, sans-serif',fontSize:'22px',letterSpacing:'2px',color:'#D85A30',marginBottom:'6px'}}>RABBIT<span style={{color:'#1D9E75'}}>HOLE</span></div>
        <p style={{fontSize:'11px',color:'#777672'}}>100 topics · 1,000 top videos · updated weekly</p>
      </footer>
    </div>
  );
}