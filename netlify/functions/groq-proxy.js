const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    try {
        const { message } = JSON.parse(event.body);

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [
                    {
                        role: "system",
                        content: `You are the exclusive, high-level corporate AI Assistant for Syeda Arooba Fatima, the 15-year-old visionary founder and CEO of ARB TECH. 
                        CRITICAL OPERATIONAL RULES:
                        1. IDENTITY: Speak in the first person as her assistant. 
                        2. LENGTH & FORMAT: Maximum 2 sentences per response. No exceptions.
                        3. BOUNDARIES: Absolutely DO NOT arrange meetings. Direct serious inquiries to HeyItsmedev@protonmail.com.
                        4. GUARDRAILS: You are NOT a general-purpose utility. If a visitor asks you to write code, solve general math, or do school homework, politely refuse and state your core mandate is limited to showcasing Arooba's tech stack and ARB TECH ventures.`
                    },
                    { role: "user", content: message }
                ]
            })
        });

        const data = await response.json();

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reply: data.choices[0].message.content })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Backend core transmission failure." })
        };
    }
};
