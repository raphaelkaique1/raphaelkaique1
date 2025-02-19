import OpenAI from "openai/index.mjs";

type Message = {
    role: 'user' | 'system'
    content: string
}

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_API_KEY,
    dangerouslyAllowBrowser: true
});

export async function sendMessage(messages: Message[]) {
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messages.map(message => ({role: message.role, content: message.content}))
    })

    return {
        role: completion.choices[0].message.role,
        content: completion.choices[0].message.content || ''
    }

}