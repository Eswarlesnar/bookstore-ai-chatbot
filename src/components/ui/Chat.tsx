"use client"

import { FC } from "react"
import { Accordion, AccordionItem, AccordionTrigger } from "./accordion"
import ChatHeader from "../ChatHeader"
import { AccordionContent } from "@radix-ui/react-accordion"
import ChatInput from "../ChatInput"
import ChatMessages from "../ChatMessages"

const Chat : FC = () => {
    return <Accordion type ="single" collapsible className="relative z-40 bg-white shadow w-full">
        <AccordionItem value = "item-1">
            <div className="fixed right-4 bottom-8 bg-white w-64  lg:w-80 lg:right-8  md:w-80 md:right-8  rounded-xl sm:w-80 sm:right-4">
                <div className="w-full h-full flex flex-col overflow-hidden border border-gray-200 flex-shrink-0">
                  <AccordionTrigger className="right-8 border-b border-zinc-300 px-8">
                     <ChatHeader />
                  </AccordionTrigger>
                  <AccordionContent className="grid">
                    <ChatMessages />
                    <ChatInput className="bg-white self-end"/>
                  </AccordionContent>
                </div>
            </div>
        </AccordionItem>       
    </Accordion>
}

export default Chat