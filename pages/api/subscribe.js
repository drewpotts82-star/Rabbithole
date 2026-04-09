const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZWEwNmIwYjI2NTVmODRhMzU1NDQyMmFmYThhZmNhMmZkMjA3Yzk4NjRhMGM4Y2ZkNjM1OGJjNTRiZDgxNDc1Yzc1MzYxZTJiNmQ0YjZmNWIiLCJpYXQiOjE3NzU3MTU1NDYuNDY3ODUsIm5iZiI6MTc3NTcxNTU0Ni40Njc4NTMsImV4cCI6NDkzMTM4OTE0Ni40NjI0Nywic3ViIjoiMjI3NTMyOSIsInNjb3BlcyI6W119.P4Aaszqz7JT-fIwHoB5vbye4E6ysq83Qgo0uWfKDE_X_UfDeIPTtMi13JPbRQzUmtZyC3KCkRVzUIco0hqBA0v20lu7AzjLWS1lgWhcbU4JZqfxORBiJHuVmrDcP_jO4QssrypnzD8nW0DEM3pXgm9ssslC84KcoXvTUb4oFuG-aO7tjtdjDITEjruWH6E28y8kOTKYN0vFSppQSZ46ZHjn1Eu88NkmqUN4I3w0QSifI-s56Y0Q1EveC2Xl4_OJkjL9T_IZqpfGPwpGd9r6Q1zle4kiSsWwKJ-EPakDe6uWWMxn5rVL0KDJweJCeaSmumhXYK47RF9HLcySwoULtHhUa3JNykXv_iw_qJDJk1qvdhtBcy4VaEZG38pCc3BjV0ul1NBanehMmNBZSKuzMYC33sSx0Lt9nYpHxe8KTq0yTCvW091hyCtSqWW_DnxZ3CJK4-CMErYEw9xFsH8gnlwSeOM7ISvswVLFRpUQK71pfI-c12cSuh8zAwyVBFzkUHMMdJVo6aqHNxC-ts_RP12TrvycUjV7IACH7L4iHdlKYErtOwybbyB9ySeeFTevdXD-s_d4LUihdS3jJpDUiiG-sHjd2zUxTKkz1h4N8wLxo0AVxmJ-JZnFEN1QfEhfkN1rmy7Sb1pbix1WwG-2Q_G8wlS-zx9hjlLMjG3rVc28';
const MAILERLITE_GROUP_ID = '184251456487950186';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, topic } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  try {
    // Add subscriber to MailerLite
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        groups: [MAILERLITE_GROUP_ID],
        fields: {
          topic: topic || 'general',
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('MailerLite error:', data);
      return res.status(500).json({ error: 'Failed to subscribe' });
    }

    return res.status(200).json({ success: true, message: 'Subscribed successfully!' });

  } catch (error) {
    console.error('Subscribe error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
