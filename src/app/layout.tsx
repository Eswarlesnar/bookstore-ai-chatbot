import Chat from '@/components/ui/Chat'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Book Buddy',
  description: 'Your store for novels and books',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={inter.className }>
        <Chat />
        {children}</body>
    </html>
  )
}
