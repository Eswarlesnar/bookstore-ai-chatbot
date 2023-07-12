"use client"

import { MessageContextProvider } from "@/context/messages"
import {QueryClient , QueryClientProvider} from "@tanstack/react-query"
import { ReactNode } from "react"

interface ProviderProps {
    children : ReactNode
}

const Providers : React.FC<ProviderProps> = ({children}) => {
    const client = new QueryClient()
    return <QueryClientProvider client = {client}>
             <MessageContextProvider>
                {children}
             </MessageContextProvider>
        </QueryClientProvider>
}
export default Providers