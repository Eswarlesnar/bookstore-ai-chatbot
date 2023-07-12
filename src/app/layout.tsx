import Chat from '@/components/ui/Chat'
import './globals.css'
import { Inter } from 'next/font/google'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/toaster'

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
          <Toaster />
        </body>
      </Providers>
    </html>
  )
}
