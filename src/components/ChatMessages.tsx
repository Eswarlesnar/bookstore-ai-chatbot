"use client"

import { messageContext } from "@/context/messages"
import { cn } from "@/lib/utils"
import { FC, HTMLAttributes, useContext } from "react"
import MarkDown from "./MarkDown"

interface ChatMessageProps extends HTMLAttributes<HTMLDivElement>{

}

const ChatMessages:FC<ChatMessageProps> = ({className}) => {
    const {messages} = useContext(messageContext)
    // const inverseMessages = [...messages].reverse()

    return <div className={cn("flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scrolbar-thumb-rounded", 
    "scrollbar-track-blue-lighter scrolling-touch h-64 pt-2" , )}
    >
        <div className="flex-1 flex flew-grow  flex-col gap-3">
            {
                messages.map((message) => {
                    return <div key ={message.id} className={cn("flex items-end" , {
                        "justify-end" : message.isUserInput
                    })}>
                        <div className={cn("flex flex-col space-y-2 text-sm max-w-xs mx-3 overflow-x-hidden rounded-xl p-2", {
                            'bg-blue-600 text-white' :message.isUserInput,
                            'bg-gray-200 text-gray-900' : !message.isUserInput
                        })}>
                           <MarkDown text = {message.text}/>
                        </div>
                    </div>
                })
            }
        </div>
    </div>
}

export default ChatMessages

