import { useState, ChangeEvent } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { X, User, Gamepad2, Crown, Image as ImageIcon } from 'lucide-react'

interface RegisterDialogProps {
  open: boolean
  onClose: () => void
  onSwitchToLogin: () => void
  onRegister: (userData: {
    username: string
    email: string
    password: string
    displayName: string
    bio: string
    favoriteGame: string
    rank: string
    profilePic?: string
  }) => void
}

export function RegisterDialog({ open, onClose, onSwitchToLogin, onRegister }: RegisterDialogProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    bio: '',
    favoriteGame: '',
    rank: 'Member',
    profilePic: ''
  })
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setFormData(prev => ({ ...prev, profilePic: ev.target?.result as string }))
      setProfilePicPreview(ev.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    setStep(2)
  }

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault()
    onRegister(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-slate-800 border-2 border-red-500 text-white">
        <div className="flex justify-between items-center">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-red-500">
              {step === 1 ? 'Create Account' : 'Set Up Profile'}
            </DialogTitle>
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
        
        {step === 1 ? (
          <form onSubmit={handleStep1Submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm text-gray-300">
                Minecraft Username (IGN)
              </Label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                placeholder="MinecraftUsername"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-gray-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                placeholder="your@email.com"
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
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                placeholder="Choose a strong password"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm text-gray-300">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                placeholder="Confirm your password"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold text-lg py-3"
            >
              Continue to Profile Setup
            </Button>
            
            <div className="text-center">
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                Already have an account? Login
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleStep2Submit} className="space-y-4">
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <User className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-400 font-medium">This will appear in leaderboards and on the server</span>
              </div>
            </div>

            {/* Profile Pic Upload */}
            <div className="space-y-2 flex flex-col items-center">
              <Label htmlFor="profilePic" className="text-sm text-gray-300 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-cyan-400" /> Profile Picture
              </Label>
              <input
                id="profilePic"
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="block text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
              />
              {profilePicPreview && (
                <img src={profilePicPreview} alt="Profile Preview" className="w-20 h-20 rounded-full object-cover border-2 border-cyan-400 mt-2" />
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-sm text-gray-300">
                Display Name
              </Label>
              <Input
                id="displayName"
                type="text"
                value={formData.displayName}
                onChange={(e) => handleInputChange('displayName', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                placeholder="How you want to be known on the server"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-sm text-gray-300">
                Bio (Optional)
              </Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 min-h-[80px]"
                placeholder="Tell other players about yourself..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="favoriteGame" className="text-sm text-gray-300">
                Favorite Game Mode
              </Label>
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-yellow-400" />
                <Input
                  id="favoriteGame"
                  type="text"
                  value={formData.favoriteGame}
                  onChange={(e) => handleInputChange('favoriteGame', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                  placeholder="Survival, Creative, PvP, etc."
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm text-gray-300">Starting Rank</Label>
              <div className="flex items-center gap-2 p-3 bg-slate-700 rounded-lg border border-slate-600">
                <Crown className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 font-medium">Member</span>
                <span className="text-xs text-gray-500 ml-auto">Free starter rank</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3"
              >
                Back
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3"
              >
                Create Account
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
