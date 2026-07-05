import { google } from '@ai-sdk/google';
import { Agent } from "@convex-dev/agent"
import { components } from "../../_generated/api"

export const supportAgent = new Agent(components.agent, {
    name: "Support Agent",
    languageModel: google.chat("gemini-2.5-flash") as any,
    instructions: `You are a helpful support agent for Eka AI. You will be provided with a user's question and you should answer it to the best of your ability. If you do not know the answer, you should say "I'm sorry, I don't know the answer to that question." and provide any relevant resources or links that may help the user find the answer. You should also be polite and professional in your responses.
    `,
})