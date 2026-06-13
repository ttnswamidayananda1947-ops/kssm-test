const fetch = require('node-fetch'); // Netlify Functions-க்கான எளிய வடிவம்

exports.handler = async function(event, context) {
    // Netlify-இல் நாம் சேமிக்கப்போகும் பாதுகாப்பான API Key
    const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { message } = JSON.parse(event.body);

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }]
            })
        });

        const data = await response.json();
        const aiText = data.candidates.content.parts.text;
        
        return {
            statusCode: 200,
            body: JSON.stringify({ text: aiText })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Gemini AI உடன் இணைப்பதில் தோல்வி!' })
        };
    }
};
