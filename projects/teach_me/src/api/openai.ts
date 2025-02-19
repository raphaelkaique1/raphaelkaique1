import OpenAI from "openai";

type Message = {
    role: 'user' | 'system'
    content: string
}

const openai = new OpenAI({
    // apiKey: process.env.API_KEY,
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

/*
import OpenAI from "openai";

type Message = {
    role: 'user' | 'system'
    content: string
}

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com/v1',
    apiKey: 'sk-3e3cb8dc14c045d9b45382df70275f57',
    defaultHeaders: {
        'Authorization': `Bearer sk-3e3cb8dc14c045d9b45382df70275f57`,
    },
    dangerouslyAllowBrowser: true
})

export async function sendMessage(messages: Message[]) {
    const completion = await openai.chat.completions.create({
        model: 'deepseek-chat',
        messages: messages.map(message => ({role: message.role, content: message.content}))
    })

    return {
        role: completion.choices[0].message.role,
        content: completion.choices[0].message.content || ''
    }

}
*/