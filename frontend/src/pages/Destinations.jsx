import React from 'react'
import FloatingChatbot from '../components/FloatingChatbot'
import DestinationList from './DestinationList'
import { useTheme } from '../components/ThemeContext'

function Destinations() {
  const { theme } = useTheme()

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Explore Destinations
        </h1>
        <DestinationList />
      </div>
      <FloatingChatbot />
    </div>
  )
}

export default Destinations