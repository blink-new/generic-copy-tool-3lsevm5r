import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'

interface LoginDialogProps {
  open: boolean
  onClose: () => void
  onSwitchToRegister: () => void
  onLogin: (username: string) => void
}

export function LoginDialog({ open, onClose, onSwitchToRegister, onLogin }: LoginDialogProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(username)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-slate-800 border-2 border-red-500 text-white">
        <div className="flex justify-between items-center">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-red-500">Login</DialogTitle>
          </DialogHeader>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-white hover:bg-red-500/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm text-gray-300">
              Enter your IGN (Minecraft username)
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
              placeholder="MinecraftUsername"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm text-gray-300">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold text-lg py-3"
          >
            Login
          </Button>
          
          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium"
            >
              Need an account? Register
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}