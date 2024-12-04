/* eslint-disable */
"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, Mail, DiscIcon as Discord, Gamepad2, Youtube, Twitch, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Moon, Sun } from 'lucide-react'
import yaml from 'js-yaml'

const iconMap = {
  Github,
  Linkedin,
  Mail,
  DiscIcon: Discord,
  Gamepad2,
  Youtube,
  Twitch
}

export default function LandingPage() {
  const [isDark, setIsDark] = useState(true)
  const [config, setConfig] = useState<Config | null>(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/config/site.yaml')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch config')
        }
        return response.text()
      })
      .then(text => {
        const parsedConfig = yaml.load(text) as any
        setConfig(parsedConfig)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading config:', err)
        setError('Failed to load configuration')
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (!config) return null

  return (
    <div className="min-h-screen bg-cover bg-center transition-all duration-500 ease-in-out p-4" style={{backgroundImage: `url(${config.background})`}}>
      <Card className="max-w-md mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl transition-all duration-500 ease-in-out">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 transition-all duration-300 ease-in-out"
          onClick={() => setIsDark(!isDark)}
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 rounded-full border-4 border-purple-500 p-1">
            <img
              src={config.avatar}
              alt="Profile"
              className="w-full h-full rounded-full object-cover transition-all duration-300 ease-in-out"
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-all duration-300 ease-in-out">{config.name}</h1>
          <p className="text-gray-600 dark:text-gray-300 text-center transition-all duration-300 ease-in-out">
            {config.bio}
          </p>

          <div className="w-full space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Work Stuff</h2>
              <div className="space-y-2">
                {config.workLinks.map((link, index) => {
                  //const Icon = iconMap[link.icon]
                  const Icon = iconMap[link.icon as keyof typeof iconMap]
                  return (
                    <Button 
                      key={index}
                      variant="outline" 
                      className={`w-full justify-start gap-2 transition-all duration-300 ease-in-out`} 
                      style={{ 
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)', 
                        borderColor: config.buttonColor, 
                        color: isDark ? 'white' : 'black' 
                      }}
                      onClick={() => window.open(link.url, '_blank')}
                    >
                      <Icon className="w-5 h-5" />
                      {link.name}
                    </Button>
                  )
                })}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Fun Stuff</h2>
              <div className="space-y-2">
                {config.funLinks.map((link, index) => {
                  //const Icon = iconMap[link.icon]
                  const Icon = iconMap[link.icon as keyof typeof iconMap]
                  return (
                    <Button 
                      key={index}
                      variant="outline" 
                      className={`w-full justify-start gap-2 transition-all duration-300 ease-in-out`} 
                      style={{ 
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)', 
                        borderColor: config.buttonColor, 
                        color: isDark ? 'white' : 'black' 
                      }}
                      onClick={() => window.open(link.url, '_blank')}
                    >
                      <Icon className="w-5 h-5" />
                      {link.name}
                    </Button>
                  )
                })}
              </div>
            </section>
          </div>
        </div>
      </Card>
    </div>
  )
}

