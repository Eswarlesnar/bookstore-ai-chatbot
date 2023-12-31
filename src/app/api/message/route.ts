import { chatbotPrompt } from "@/helpers/constants/chatbot-prompt"
import { ChatGPTMessage, OpenAIStream  ,OpenAIStreamPayload} from "@/lib/openai-stream"
import { MessageArraySchema } from "@/lib/validators/message"



export async function POST(req : Request) {
    
    const {messages} = await req.json()
    const parsedMessages = MessageArraySchema.parse(messages)
    const outboundMessages : ChatGPTMessage[] = parsedMessages.map((message : any) => ({
       role : message.isUserInput ? "user" : "system",
       content : message.text
    }))
    outboundMessages.unshift({
        role : "system" , 
        content : chatbotPrompt
    })


    const payload: OpenAIStreamPayload = {    //chatgptapiconfig
        model: 'gpt-3.5-turbo',
        messages: outboundMessages,
        temperature: 0.4,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 150,
        stream: true,
        n: 1,
    }

    const stream =await OpenAIStream(payload)

    return new Response(stream)   //returnas a readable stream
    
}