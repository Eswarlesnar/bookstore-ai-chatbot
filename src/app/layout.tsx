import Chat from '@/components/ui/Chat'
import './globals.css'
import { Inter } from 'next/font/google'
import Providers from '@/components/Providers'
import { MessageContextProvider } from '@/context/messages'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Book buddy',
  description: 'Book store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <Providers>
        <body className={inter.className}>
          <Chat />
          {children}
        </body>
      </Providers>
    </html>
  )
}
