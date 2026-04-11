import { Outlet } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollButtons from './components/ui/ScrollButtons'
import ChatBot from './components/ui/ChatBot'

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors overflow-x-hidden">
        <Navbar />
        <main className="flex-1 pt-[65px]">
          <Outlet />
        </main>
        <Footer />
        <ScrollButtons />
        <ChatBot />
      </div>
    </ThemeProvider>
  )
}
