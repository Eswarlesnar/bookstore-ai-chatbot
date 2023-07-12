"use client"

import { cn } from "@/lib/utils"
import { HTMLAttributes, useContext, useState } from "react"
import TextareaAutosize from "react-textarea-autosize"
import {useMutation} from "@tanstack/react-query"
import {nanoid} from "nanoid"
import { messageContext } from "@/context/messages"
// import  { MessageSchema } from "@/lib/validators/message"

interface Message{
  id : string , 
  isUserInput : boolean, 
  text : string
}


interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {

}

const ChatInput : React.FC<ChatInputProps> = ({className  ,  ...props}) => {
    const [input , setInput] = useState<string>("")
    const {messages , addMessage , updateMessage , setIsMessageUpdating} = useContext(messageContext)
    const {mutate: sendMessage ,  isLoading} = useMutation({
        mutationFn : async (message : Message) => {
            console.log("hello")
            const response =  await fetch("/api/message" , {
                method : "POST" ,
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({messages : [message]})
            })
            return response.body
        },
        onMutate : (message) => {
          addMessage(message)
        },
        onSuccess : async (stream) => { console.log("success")
            if(!stream){
              throw new Error("No stream found")
            }
            setIsMessageUpdating(true)
            const id = nanoid() 
            const responseMessage = {
              id , 
              isUserInput : false, 
              text : ""
            }

            addMessage(responseMessage)

            const reader = stream.getReader() 
            const decoder = new TextDecoder()
            let done = false 
            
            while(!done){
              const {value , done: doneReading} =await reader.read()
              done = doneReading
              const chunkValue = decoder.decode(value)
              updateMessage(id , (prev) =>prev + chunkValue)
            }

            setIsMessageUpdating(false)
            setInput("")
        } 
    })

     return <div {...props} className= {cn("border-t border-gray-300 bottom-8", className)}>
        <div className="mt-4 absolute bottom-0 flex flex-1 overflow-hidden rounded-lg border-none px-2 w-full">
          <TextareaAutosize 
            minRows={2} 
            maxRows={5}
            autoFocus
            value = {input}
            onChange = { e => setInput(e.target.value) }
            placeholder="inkenduku late edoti adugu"
            className="peer disabled:opacity-50 resize-none block  w-full h-full border-0 bg-zinc-200 w-11/12
             text-gray-900 focus:ring-0 leading-tight outline-none rounded-xl pt-2.5 mx-auto px-2 my-2 bottom-0"
            onKeyDown={ (e) => { 
                if(e.key === "Enter" && !e.shiftKey){
                  e.preventDefault()
                  const message  = {
                    id: nanoid(),
                    isUserInput : true , 
                    text : input
                  }
                  sendMessage(message)
                }   
            }}
          />
        </div>
     </div>
}

export default ChatInput