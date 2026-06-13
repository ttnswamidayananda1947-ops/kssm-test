export default async function handler(req, res) {
    // Vercel Environment Variable-இல் இருந்து பாதுகாப்பாக Key-ஐ எடுக்கிறது
    const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }]
            })
        });

        const data = await response.json();
        const aiText = data.candidates.content.parts.text;
        
        return res.status(200).json({ text: aiText });
    } catch (error) {
        return res.status(500).json({ error: 'Gemini API உடன் இணைப்பதில் தோல்வி!' });
    }
}
