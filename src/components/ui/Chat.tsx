import { FC } from "react"
import { Accordion, AccordionItem, AccordionTrigger } from "./accordion"
import ChatHeader from "../ChatHeader"

const Chat : FC = () => {
    return <Accordion type ="single" collapsible className="relative z-40 bg-white shadow w-full ">
        <AccordionItem value = "item-1">
            <div className="fixed right-8 bottom-8 bg-white w-80  lg:rounded-xl ">
                <div className="w-full h-full flex flex-col overflow-hidden border border-gray-200 flex-shrink-0">
                  <AccordionTrigger className="right-8 border-b border-zinc-300 px-8">
                     <ChatHeader />
                  </AccordionTrigger>
                </div>
            </div>
        </AccordionItem>       
    </Accordion>
}

export default Chat