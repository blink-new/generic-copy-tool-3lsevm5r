import { useState, useEffect } from 'react'

export interface User {
  id: string
  username: string
  email: string
  displayName: string
  bio: string
  favoriteGame: string
  rank: string
  purchases: number
  joinDate: string
  profilePic?: string // URL or base64
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = (username: string) => {
    // Mock login - in real app, this would call an API
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      return true
    }
    // fallback
    const mockUser: User = {
      id: '1',
      username,
      email: `${username}@example.com`,
      displayName: username,
      bio: 'Long-time Minecraft player',
      favoriteGame: 'Survival',
      rank: 'Member',
      purchases: 0,
      joinDate: new Date().toISOString(),
      profilePic: ''
    }
    setUser(mockUser)
    localStorage.setItem('currentUser', JSON.stringify(mockUser))
    return true
  }

  const register = (userData: {
    username: string
    email: string
    password: string
    displayName: string
    bio: string
    favoriteGame: string
    rank: string
    profilePic?: string
  }) => {
    // Mock registration - in real app, this would call an API
    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      purchases: 0,
      joinDate: new Date().toISOString()
    }
    setUser(newUser)
    localStorage.setItem('currentUser', JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
  }

  return {
    user,
    isLoading,
    login,
    register,
    logout
  }
}
