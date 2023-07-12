"use client"

import { Message } from "@/lib/validators/message";
import { nanoid } from "nanoid";
import { ReactNode, createContext, useState , Dispatch , SetStateAction } from "react";


interface MessageContextType{
   messages  : Message[], 
   isMessageUpdating : boolean, 
   addMessage : (message : Message) => void
   removeMessage : (id : string ) => void
   updateMessage :(id:string , updateFn : (prevText : string) => string) => void
   setIsMessageUpdating : Dispatch<SetStateAction<boolean>>
}

export const messageContext = createContext<MessageContextType>({
  messages : [] , 
  isMessageUpdating : false, 
  addMessage : () => {} , 
  removeMessage : () => {},
  updateMessage : () => {},
  setIsMessageUpdating : () => {}
})


export const MessageContextProvider = ({children} : {children : ReactNode}) => {
    const [isMessageUpdating , setIsMessageUpdating] =  useState<boolean>(false)
    const [messages , setMessages] = useState<Message[]>([
        {
            id : nanoid() ,
            isUserInput : false,
            text : "Hello, What are you looking for"
        }
    ])

    const addMessage = (message : Message) => {
        setMessages(prev => [...prev , message])
    }

    const  removeMessage = (id: string) => {
        setMessages(prev => prev.filter(message => message.id !== id))
    }

    const updateMessage = (id :string , updateFn : (prevText : string) => string) =>{
        setMessages( (prev) => {
            return prev.map(message => {
                if(message.id === id) {
                    return {...message , text : updateFn(message.text)}
                }else{
                    return message
                }
            })
        })
    }
    return <messageContext.Provider value = { {isMessageUpdating , messages , addMessage , removeMessage  ,updateMessage , setIsMessageUpdating}}>
        {children}
    </messageContext.Provider>
}