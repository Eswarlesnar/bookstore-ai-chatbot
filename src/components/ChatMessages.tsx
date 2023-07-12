"use client"

import { messageContext } from "@/context/messages"
import { cn } from "@/lib/utils"
import { FC, HTMLAttributes, useContext } from "react"

interface ChatMessageProps extends HTMLAttributes<HTMLDivElement>{

}

const ChatMessages:FC<ChatMessageProps> = () => {
    const {messages} = useContext(messageContext)
    const inverseMessages = [...messages].reverse()
    
    return <div className={cn("flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scrolbar-thumb-rounded", 
    "scrollbar-track-blue-lighter scrolling-touch")}
    >
        <div className="flex-1 flew-grow">
            {
                inverseMessages.map((message) => {
                    return <div key ={message.id} className={cn("flex items-end" , {
                        "justify-end" : message.isUserInput
                    })}>
                        <div className={cn("flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden", {
                            'bg-blue-600 text-white' :message.isUserInput,
                            'bg-gray-200 text-gray-900' : !message.isUserInput
                        })}>
                            <p>{message.text}</p>
                        </div>
                    </div>
                })
            }

        </div>

    </div>
}

export default ChatMessages

