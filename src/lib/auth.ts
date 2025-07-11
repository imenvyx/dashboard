import {create} from 'zustand'

type User = {
  email: string
  companies: string[]
  reports: string[]
}

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  login: (email: string, password: string) => {
    if (email === "technology@kameleonlabs.ai" && password === "#4nrsHSre1#@uPC$3ZR8") {
      const user: User = { 
        email, 
        companies: ['company-1'], 
        reports: ['sales', 'inventory'] 
      }
      localStorage.setItem('user', JSON.stringify(user))
      set({ user })
      return true
    }
    return false
  },
  logout: () => {
    localStorage.removeItem('user')
    set({ user: null })
  }
}));