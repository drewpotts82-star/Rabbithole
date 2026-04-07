import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import topics from '../data/topics';

function formatViews(v) {
  const n = parseFloat(v);
  if (v.includes('B')) return n * 1000000000;
  if (v.includes('M')) return n * 1000000;
  return n;
}

export default function Game() {
  const [pairs, setPairs] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [chosen, setChosen] = useState(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const shuffled = [...topics].sort(() => 0.5 - Math.random());
    const p = [];
    for (let i = 0; i < shuffled.length - 1; i += 2) {
      p.push([shuffled[i], shuffled[i + 1]]);
    }
    setPairs(p);
  }, []);

  if (!pairs.length) return null;
  if (gameOver || current >= pairs.length) {
    return (
      <div style={{ background: '#111110', minHeight: '100vh', color: '#f0efe9', fontFamily: 'DM Sans, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: '60px', marginBottom: '16px' }}>🐇</div>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '52px', color: '#EF9F27', letterSpacing: '2px' }}>GAME OVER</div>
        <div style={{ fontSize: '20px', margin: '16px 0' }}>You scored <strong style={{ color: '#1D9E75' }}>{score}</strong> out of {current}</div>
        <div style={{ fontSize: '15px', color: '#777672', marginBottom: '32px' }}>Best streak: 🔥 {bestStreak}</div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => { window.location.reload(); }} style={{ background: '#1D9E75', color: '#fff', border: 'none', borderRadius: '20px', padding: '12px 24px', fontSize: '15px', fontWeight: '500', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>Play Again</button>
          <Link href="/" style={{ background: 'transparent', color: '#f0efe9', border: '1px solid #333331', borderRadius: '20px', padding: '12px 24px', fontSize: '15px', textDecoration: 'none' }}>Explore Topics</Link>
        </div>
      </div>
    );
  }

  const [a, b] = pairs[current];
  const aViews = formatViews(a.views);
  const bViews = formatViews(b.views);
  const correct = aViews > bViews ? 'a' : 'b';

  const handleChoice = (choice) => {
    if (answered) return;
    setChosen(choice);
    setAnswered(true);
    const isCorrect = choice === correct;
    if (isCorrect) {
      setScore(s => s + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    setAnswered(false);
    setChosen(null);
    if (current + 1 >= pairs.length) setGameOver(true);
    else setCurrent(c => c + 1);
  };

  const getCardStyle = (side) => {
    const isChosen = chosen === side;
    const isCorrectSide = side === correct;
    let bg = '#1a1a18';
    let border = '1px solid #333331';
    if (answered) {
      if (isCorrectSide) { bg = 'rgba(29,158,117,0.15)'; border = '2px solid #1D9E75'; }
      else if (isChosen) { bg = 'rgba(216,90,48,0.15)'; border = '2px solid #D85A30'; }
    } else if (isChosen) {
      bg = 'rgba(29,158,117,0.1)';
      border = '2px solid #1D9E75';
    }
    return { background: bg, border, borderRadius: '16px', padding: '32px 24px', cursor: answered ? 'default' : 'pointer', transition: 'all 0.3s', textAlign: 'center', flex: 1, minWidth: '140px' };
  };

  return (
    <div style={{ background: '#111110', minHeight: '100vh', color: '#f0efe9', fontFamily: 'DM Sans, sans-serif' }}>
      <Head>
        <title>Which Has More Views? — RabbitHole Game</title>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </Head>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', background: '#1e1e1c', borderBottom: '1px solid #333331' }}>
        <Link href="/" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', letterSpacing: '2px', color: '#D85A30', textDecoration: 'none' }}>RABBIT<span style={{ color: '#1D9E75' }}>HOLE</span></Link>
        <div style={{ display: 'flex', gap: '16px', fontSize: '13px' }}>
          <span>Score: <strong style={{ color: '#1D9E75' }}>{score}</strong></span>
          <span>🔥 {streak}</span>
          <span style={{ color: '#777672' }}>{current + 1}/{pairs.length}</span>
        </div>
      </nav>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '32px', letterSpacing: '2px', color: '#f0efe9' }}>WHICH HAS MORE VIEWS?</div>
          <div style={{ fontSize: '13px', color: '#777672', marginTop: '4px' }}>Pick the topic with more combined YouTube views</div>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {[['a', a], ['b', b]].map(([side, topic]) => (
            <div key={side} style={getCardStyle(side)} onClick={() => handleChoice(side)}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>{topic.emoji}</div>
              <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>{topic.name}</div>
              {answered && (
                <div style={{ fontSize: '22px', fontWeight: '700', color: side === correct ? '#1D9E75' : '#777672', marginTop: '8px' }}>
                  {topic.views}
                </div>
              )}
              {answered && side === correct && <div style={{ fontSize: '12px', color: '#1D9E75', marginTop: '4px' }}>✓ More views!</div>}
              {answered && side !== correct && chosen === side && <div style={{ fontSize: '12px', color: '#D85A30', marginTop: '4px' }}>✗ Wrong!</div>}
            </div>
          ))}
        </div>

        {!answered && (
          <div style={{ textAlign: 'center', color: '#777672', fontSize: '13px' }}>👆 Tap a topic to guess</div>
        )}

        {answered && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: chosen === correct ? '#1D9E75' : '#D85A30' }}>
              {chosen === correct ? `✓ Correct! +1 🔥 Streak: ${streak}` : '✗ Wrong!'}
            </div>
            <button onClick={handleNext} style={{ background: '#1D9E75', color: '#fff', border: 'none', borderRadius: '20px', padding: '12px 32px', fontSize: '15px', fontWeight: '500', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
              {current + 1 >= pairs.length ? 'See Results' : 'Next →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
