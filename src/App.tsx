import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Home, Trophy, Coins, Crown, LogOut, ShoppingCart, ArrowLeft } from 'lucide-react'
import { LoginDialog } from '@/components/auth/LoginDialog'
import { RegisterDialog } from '@/components/auth/RegisterDialog'
import { CartModal } from '@/components/CartModal'
import { useAuth } from '@/hooks/useAuth'
import { toast } from '@/hooks/use-toast'

// Simulate a real customer list (in a real app, this would come from a backend)
const realCustomers = [
  // Example: { name: 'Steve', profilePic: '', amount: 4, purchases: 1 }
]

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showRegisterDialog, setShowRegisterDialog] = useState(false)
  const [showCartModal, setShowCartModal] = useState(false)
  const [cartItems, setCartItems] = useState<Array<{id: string; name: string; price: number}>>([])
  const { user, isLoading, login, register, logout } = useAuth()

  // Only show users who have made at least 1 purchase
  let leaderboard = realCustomers.filter(c => c.purchases > 0)

  // If the logged-in user has made a purchase, show them in the leaderboard
  if (user && user.purchases > 0) {
    leaderboard = [
      {
        name: user.displayName,
        profilePic: user.profilePic,
        amount: user.purchases * 4, // $4 per purchase for demo
        purchases: user.purchases
      },
      ...leaderboard.filter(c => c.name !== user.displayName)
    ]
  }

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'ranks', label: 'Ranks', icon: Trophy },
    { id: 'coins', label: 'Coins', icon: Coins }
  ]

  const addToCart = (item: {id: string; name: string; price: number}) => {
    setCartItems(prev => [...prev, item])
    toast({ title: 'Added to cart', description: `${item.name} added to your cart.` })
  }

  const handleLogin = (username: string) => {
    const success = login(username)
    if (success) {
      setShowLoginDialog(false)
      toast({
        title: "Login Successful",
        description: `Welcome back, ${username}!`,
      })
    }
  }

  const handleRegister = (userData: {
    username: string
    email: string
    password: string
    displayName: string
    bio: string
    favoriteGame: string
    rank: string
    profilePic?: string
  }) => {
    const success = register(userData)
    if (success) {
      setShowRegisterDialog(false)
      toast({
        title: "Account Created",
        description: `Welcome to CrimsonMC, ${userData.displayName}!`,
      })
    }
  }

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    })
  }

  // Remove item from cart
  const removeFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index))
  }

  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)

  // Calculate total (no tax for now)
  const total = subtotal

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      <div className="text-white text-xl">Loading...</div>
    </div>
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      {/* Banner */}
      <div className="w-full relative">
        <img src="/banner.png" alt="CrimsonMC Banner" className="w-full h-48 object-cover object-center border-b-4 border-red-500" />
        <div className="absolute top-0 left-0 right-0 flex items-start justify-between px-6 pt-2">
          <Button 
            variant="outline"
            className="flex items-center gap-2 text-white bg-black/50 border border-white/20 hover:bg-black/70 mt-0"
            onClick={() => setActiveSection('home')}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Button>
          <Button 
            variant="outline"
            className="flex items-center gap-2 text-red-500 bg-black/50 border border-red-500 hover:bg-black/70 mt-0"
            onClick={() => setShowCartModal(true)}
          >
            <ShoppingCart className="w-5 h-5" />
            Cart ({cartItems.length})
          </Button>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-72 sidebar-crimson sidebar-wrapper">
          <div>
            <div className="p-6 border-b border-red-500/20">
              <div className="flex items-center justify-center mb-4">
                {user ? (
                  user.profilePic ? (
                    <img src={user.profilePic} alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-4xl border-2 border-cyan-400">
                      {user.displayName[0]}
                    </div>
                  )
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-4xl border-2 border-cyan-400">
                    ?
                  </div>
                )}
              </div>
              <div className="text-center">
                <div className="text-cyan-400 font-semibold">{user ? user.displayName : 'Guest'}</div>
                <div className="text-sm text-gray-400">{user ? user.rank : 'Guest'}</div>
              </div>
              {user ? (
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full text-red-400 border-red-500 hover:bg-red-500/20 mt-4"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <Button 
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold mt-4"
                  onClick={() => setShowLoginDialog(true)}
                >
                  Login / Register
                </Button>
              )}
            </div>
            <nav className="p-4 flex-1">
              <ul className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                          activeSection === item.id 
                            ? 'bg-red-500/20 text-red-400 border border-red-500/40' 
                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
            {/* Top Customers Leaderboard in Sidebar */}
            <div className="p-4 pt-0">
              <Card className="bg-black/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-5 h-5 text-yellow-400" />
                    <span className="font-bold text-cyan-400">Top Customers</span>
                  </div>
                  {leaderboard.length === 0 ? (
                    <div className="text-gray-400 text-sm text-center py-4">No purchases yet</div>
                  ) : (
                    <ol className="space-y-2">
                      {leaderboard.map((customer) => (
                        <li key={customer.name} className="flex items-center gap-2">
                          {customer.profilePic ? (
                            <img src={customer.profilePic} alt="Profile" className="w-8 h-8 rounded-full object-cover border-2 border-cyan-400" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-cyan-700 flex items-center justify-center text-white font-bold text-lg border-2 border-cyan-400">
                              {customer.name[0]}
                            </div>
                          )}
                          <span className={`text-white ${customer.name === user?.displayName ? 'font-bold text-cyan-400' : ''}`}>
                            {customer.name}
                          </span>
                          <span className="ml-auto text-yellow-400 font-semibold">${customer.amount?.toFixed(2) ?? '0.00'}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                </CardContent>
              </Card>
            </div>
            <div className="flex-1" />
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0 main-content-gap">
          <header className="bg-black/20 backdrop-blur-sm p-6 border-b border-red-500/20">
            {/* Removed CrimsonMC Store title */}
            <div className="flex items-center justify-end">
              {user && (
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-white font-semibold">{user.displayName}</div>
                    <div className="text-sm text-gray-400">{user.username}</div>
                  </div>
                  {user.profilePic ? (
                    <img src={user.profilePic} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-cyan-400" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-cyan-700 flex items-center justify-center text-white font-bold text-xl border-2 border-cyan-400">
                      {user.displayName[0]}
                    </div>
                  )}
                </div>
              )}
            </div>
          </header>
          <main className="flex-1 p-6 overflow-y-auto">
            {activeSection === 'home' && (
              <div className="space-y-6">
                {user && user.purchases > 0 && (
                  <div className="bg-green-700 text-white text-center rounded-lg py-2 font-bold text-lg shadow mb-4">
                    Welcome back! You get <span className="text-yellow-300">5% off</span> your next purchase!
                  </div>
                )}
                <Card className="bg-black/20 backdrop-blur-sm border-red-500/20">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-cyan-400 mb-4">Welcome</h2>
                    <p className="text-gray-300 leading-relaxed text-xs">
                      If you've completed a purchase but haven't received your items, please open a 
                      support ticket on our Discord server for assistance. For any billing concerns or 
                      payment-related questions, you can also create a ticket, and our team will 
                      respond within 48 hours.
                    </p>
                    <img src="/image.png" alt="Payment Methods" className="mt-2 max-w-full h-auto mx-auto" />
                  </CardContent>
                </Card>
                <Card className="bg-black/20 backdrop-blur-sm border-red-500/20">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-cyan-400 mb-4">Refund Policy</h2>
                    <div className="space-y-4 text-gray-300 text-xs">
                      <p>
                        All purchases are final and non-refundable. Initiating a chargeback or disputing a 
                        payment through PayPal will lead to a permanent and irreversible ban from all our 
                        servers and associated Minecraft stores.
                      </p>
                      <p>
                        Please allow up to 20 minutes for your purchase to be processed in-game. If you 
                        do not receive your items within this timeframe, submit a support ticket on our 
                        Discord server with proof of purchase, and we will look into the issue.
                      </p>
                      <p className="text-sm text-blue-400 mt-4">
                        CrimsonMC is not affiliated with or endorsed by Minecraft, Mojang or Microsoft.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            {activeSection === 'ranks' && (
              <div className="space-y-6">
                <Card className="bg-black/20 backdrop-blur-sm border-red-500/20">
                  <CardContent className="p-6">
                    <h2 className="text-3xl font-bold text-cyan-400 mb-4">Ranks</h2>
                    <p className="text-gray-300 text-lg mb-6">Unlock exclusive perks and privileges</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {['VIP', 'VIP+', 'MVP', 'MVP+', 'Elite', 'Champion'].map((rank, idx) => {
                        const price = (idx + 1) * 5.99
                        return (
                          <Card key={rank} className="bg-gradient-to-br from-gray-800 to-gray-900 border-yellow-500/30">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Crown className="w-5 h-5 text-yellow-400" />
                                <h3 className="font-bold text-white">{rank}</h3>
                              </div>
                              <p className="text-sm text-gray-400 mb-4">
                                Access to exclusive commands and features
                              </p>
                              <Button
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                                onClick={() => addToCart({ id: rank, name: rank, price })}
                                disabled={!user}
                              >
                                Add to Cart
                              </Button>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            {activeSection === 'coins' && (
              <div className="space-y-6">
                <Card className="bg-black/20 backdrop-blur-sm border-red-500/20">
                  <CardContent className="p-6">
                    <h2 className="text-3xl font-bold text-cyan-400 mb-4">Coins</h2>
                    <p className="text-gray-300 text-lg mb-6">Buy coins for in-game purchases</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[100, 500, 1000, 2500, 5000, 10000].map((amount) => {
                        const price = amount / 100
                        return (
                          <Card key={amount} className="bg-gradient-to-br from-yellow-800 to-yellow-900 border-yellow-500/30">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Coins className="w-5 h-5 text-yellow-400" />
                                <h3 className="font-bold text-white">{amount} Coins</h3>
                              </div>
                              <p className="text-sm text-gray-400 mb-4">
                                Use for in-game items and upgrades
                              </p>
                              <Button
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                                onClick={() => addToCart({ id: amount.toString(), name: `${amount} Coins`, price })}
                                disabled={!user}
                              >
                                Add to Cart
                              </Button>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
          <footer className="bg-black/20 backdrop-blur-sm p-6 border-t border-red-500/20">
            {/* Footer now empty as requested (no Ranks/Crates/Coins) */}
          </footer>
        </div>
      </div>
      {/* Dialogs */}
      <LoginDialog 
        open={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onSwitchToRegister={() => {
          setShowLoginDialog(false)
          setShowRegisterDialog(true)
        }}
        onLogin={handleLogin}
      />
      <RegisterDialog 
        open={showRegisterDialog}
        onClose={() => setShowRegisterDialog(false)}
        onSwitchToLogin={() => {
          setShowRegisterDialog(false)
          setShowLoginDialog(true)
        }}
        onRegister={handleRegister}
      />
      <CartModal 
        open={showCartModal} 
        onClose={() => setShowCartModal(false)} 
        cartItems={cartItems} 
        subtotal={subtotal} 
        total={total} 
        removeFromCart={removeFromCart} 
      />
    </div>
  )
}

export default App