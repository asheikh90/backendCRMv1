import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useThemeStore = create(
  persist(
    (set, get) => ({
      isDark: true,
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
      
      // Theme colors
      colors: {
        dark: {
          bg: '#0A0A0A',
          card: '#1A1A1A',
          border: '#333333',
          text: '#E0E0E0',
          muted: '#888888',
          accent: '#00D4FF',
          success: '#00FF88',
          warning: '#FFB800',
          danger: '#FF4444'
        },
        light: {
          bg: '#FFFFFF',
          card: '#F8F9FA',
          border: '#E5E7EB',
          text: '#1F2937',
          muted: '#6B7280',
          accent: '#3B82F6',
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444'
        }
      },
      
      getCurrentColors: () => {
        const { isDark, colors } = get()
        return isDark ? colors.dark : colors.light
      }
    }),
    {
      name: 'theme-storage'
    }
  )
)
