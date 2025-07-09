import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ShoppingCart, Menu, X, Twitter, Youtube, Bot } from 'lucide-react'
import { useState } from 'react'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: 'url(https://store.nitromc.fun/images/background.png)' }}
      ></div>
      <div className="relative z-10">
        <header className="py-4 px-6 md:px-12">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src="https://store.nitromc.fun/images/logo.png" alt="NitroMC Logo" className="h-12" />
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="hover:text-gray-300 transition-colors">Store</a>
                <a href="#" className="hover:text-gray-300 transition-colors">Leaderboards</a>
                <a href="#" className="hover:text-gray-300 transition-colors">Vote</a>
                <a href="#" className="hover:text-gray-300 transition-colors">Forum</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <ShoppingCart />
              </Button>
              <Button className="hidden md:flex bg-blue-600 hover:bg-blue-700">
                Login with Discord
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </header>

        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 py-4">
            <nav className="flex flex-col items-center space-y-4">
              <a href="#" className="hover:text-gray-300 transition-colors">Store</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Leaderboards</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Vote</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Forum</a>
              <Button className="bg-blue-600 hover:bg-blue-700">Login with Discord</Button>
            </nav>
          </div>
        )}

        <main className="container mx-auto px-6 md:px-12 py-20">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <h1 className="text-5xl font-bold mb-4">NITROMC</h1>
              <p className="text-lg text-gray-400 mb-6">Click to copy the IP</p>
              <Button 
                className="bg-gray-700 hover:bg-gray-600 w-full py-4 text-lg mb-6"
                onClick={() => navigator.clipboard.writeText('play.nitromc.fun')}
              >
                play.nitromc.fun
              </Button>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-gray-400 hover:text-white"><Twitter /></a>
                <a href="#" className="text-gray-400 hover:text-white"><Youtube /></a>
                <a href="#" className="text-gray-400 hover:text-white"><Bot /></a>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

export default App
