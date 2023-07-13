"use client"

import { cn } from "@/lib/utils"
import { HTMLAttributes, useContext, useRef, useState } from "react"
import { CornerDownLeft, Loader2 } from 'lucide-react'
import TextareaAutosize from "react-textarea-autosize"
import {useMutation} from "@tanstack/react-query"
import {nanoid} from "nanoid"
import { messageContext } from "@/context/messages"
import { useToast } from "./ui/use-toast"


interface Message{
  id : string , 
  isUserInput : boolean, 
  text : string
}


interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {

}

const ChatInput : React.FC<ChatInputProps> = ({className  ,  ...props}) => {
    const [input , setInput] = useState<string>("")
    const {messages , addMessage , updateMessage , setIsMessageUpdating , removeMessage } = useContext(messageContext)
    const {toast} = useToast()
    const textArearef = useRef<HTMLTextAreaElement>(null)
    const {mutate: sendMessage ,  isLoading} = useMutation({
        mutationFn : async (message : Message) => {
           
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
        onSuccess : async (stream) => { 
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
            setTimeout(() => {
              textArearef.current?.focus()
            },30)
        }, 
        onError : ( error , message) => {
          toast({
            variant : "destructive",
            title: "Error",
            description: "Failed to get a response",
          })
          removeMessage(message.id)
        }
    })

     return <div {...props} className= {cn("border-t border-gray-100 bottom-8", className)}>
        <div className="relative mt-4 bottom-0 flex flex-1 overflow-hidden rounded-lg border-none px-2 w-full">
          <TextareaAutosize 
            disabled = {isLoading}
            ref = {textArearef}
            minRows={2} 
            maxRows={5}
            autoFocus
            value = {input}
            onChange = { e => setInput(e.target.value) }
            placeholder="Chat with ai bot"
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

        <div className='absolute inset-y-0 right-0 flex py-1.5 pr-1.5 top-3 right-3'>
          {isLoading ? (
                <Loader2 className='w-5 h-5 animate-spin' />
              ) : (
                <CornerDownLeft className='w-5 h-5' />
          )}
        </div>

        <div
          className='absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600'
          aria-hidden='true'
        />
        </div>
     </div>
}

export default ChatInput