import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

/* Setting configuration to pass openai api */
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

/* Validate key */
if (!configuration.apiKey)
    throw new Error('API KEY is not defined!')

/* Passing to apenai api instance the previus configuration */
const openai = new OpenAIApi(configuration)

/* Method POST */
export async function POST(request) {
    /* data from client */
    const body = await request.json();

    /* validate data from client */
    if (!body.prompt || body.prompt.length === 0) {
        return NextResponse.error(new Error("Prompt is required"), {
            status: 400
        })
    }

    /* Request to OpenAI model */
    try {
        const response = await openai.createCompletion({
            prompt: `Dame un chiste para cualquier persona acerca ${body.prompt}, por favor.`,
            model: 'text-davinci-003',
            temperature: 0.7,
            max_tokens: 60
        })
        return NextResponse.json({
            status: 200,
            data: response.data.choices[0].text
        })
    } catch (error) {
        return NextResponse.error(error, {
            status: 500
        })
    }

}