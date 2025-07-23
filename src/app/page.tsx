"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { getOrCreateSessionId } from "@/lib/session"
import { Bot, Pill, Send, Stethoscope, User } from "lucide-react"

interface Message {
  id: string
  content: string
  role: "user" | "bot"
  timestamp: Date
  buttons?: Array<{
    id: string
    text: string
    action: string,
    disabled: boolean
  }>
}

export default function HealthcareChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Selamat datang! Saya adalah asisten kesehatan digital Anda. Bagaimana saya bisa membantu Anda hari ini?",
      role: "bot",
      timestamp: new Date(),
      buttons: [
        {
          id: "konsultasi",
          text: "Konsultasi Dokter",
          action: "konsultasi_dokter",
          disabled:true
        },
        {
          id: "apotek",
          text: "Apotek Online",
          action: "apotek_online",
          disabled:false
        },
      ],
    },
  ])
  const [input, setInput] = useState("")
  const [currentAction, setCurrentAction] = useState<string>("general_query")
  const [sessionId, setSessionId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const sid = getOrCreateSessionId()
    setSessionId(sid)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const callAPI = async (message: string, actionOverride?: string) => {
    const contextTimeoutMinutes = 10
    const lastInteraction = localStorage.getItem("lastInteractionTime")
    const now = new Date()

    if (lastInteraction) {
      const diff = (now.getTime() - new Date(lastInteraction).getTime()) / 60000
      if (diff > contextTimeoutMinutes) {
        setCurrentAction("general_query")
      }
    }

    localStorage.setItem("lastInteractionTime", now.toISOString())
    try {
      const finalAction = actionOverride || currentAction || "general_query"
      // Replace this URL with your actual API endpoint/webhook
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: sessionId,
          message,
          action: finalAction,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()
      return data.message || "Maaf, saya tidak dapat memproses permintaan Anda saat ini."
    } catch (error) {
      console.error("Error calling API:", error)
      return "Maaf, terjadi kesalahan. Silakan coba lagi nanti."
    }
  }

  const handleButtonClick = async (buttonText: string, action: string) => {
    // Add user message for button click
    const userMessage: Message = {
      id: Date.now().toString(),
      content: buttonText,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Call API with button action
    const botResponse = await callAPI(buttonText, action)

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: botResponse,
      role: "bot",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, botMessage])
    setCurrentAction(action)
    setIsLoading(false)
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Call API with text message
    const botResponse = await callAPI(userMessage.content)

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: botResponse,
      role: "bot",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, botMessage])
    setIsLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 sm:px-6 py-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
            <Stethoscope className="w-4 h-4 text-white" />
          </div>
          Asisten Kesehatan
        </h1>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-hidden px-2 sm:px-4 py-4 sm:py-6">
        <Card className="h-full flex flex-col bg-white/90 backdrop-blur-sm shadow-lg">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-2 sm:gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.role === "user" ? "bg-blue-600 text-white" : "bg-emerald-100 text-emerald-600"
                    }`}
                >
                  {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[280px] sm:max-w-xs lg:max-w-md xl:max-w-lg ${message.role === "user" ? "text-right" : "text-left"
                    }`}
                >
                  <div
                    className={`inline-block px-3 sm:px-4 py-2 sm:py-3 rounded-2xl ${message.role === "user"
                      ? "bg-blue-600 text-white rounded-br-md"
                      : "bg-gray-100 text-gray-800 rounded-bl-md"
                      }`}
                  >
                    {message.role === "bot" ? (
                      <div
                        className="text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: message.content }}
                      />
                    ) : (
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {message.buttons && message.role === "bot" && (
                    <div className="mt-3 space-y-2">
                      {message.buttons.map((button) => (
                        <Button
                          key={button.id}
                          onClick={() => handleButtonClick(button.text, button.action)}
                          disabled={button.disabled || isLoading}
                          className={`w-full sm:w-auto text-sm px-4 py-2 rounded-lg transition-all duration-200 ${button.action === "konsultasi_dokter"
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                        >
                          {button.action === "konsultasi_dokter" ? (
                            <Stethoscope className="w-4 h-4 mr-2" />
                          ) : (
                            <Pill className="w-4 h-4 mr-2" />
                          )}
                          {button.text}
                        </Button>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mt-1 px-2">
                    {message.timestamp.toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-bl-md px-3 sm:px-4 py-2 sm:py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t bg-white/80 p-3 sm:p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ketik pesan Anda..."
                disabled={isLoading}
                className="flex-1 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 text-sm sm:text-base"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 sm:px-4 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Kirim</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
