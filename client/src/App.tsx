import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChatBubble } from "@/components/ui/chat-bubble"
import { SendHorizontal } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { sendChat, ChatMessage } from "@/lib/api"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! How can I help you today?",
      role: "assistant"
    }
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Clear input immediately
    setInput("")
    setIsLoading(true)

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user"
    }
    setMessages(prev => [...prev, userMessage])

    // Convert messages to ChatMessage format and send to API
    try {
      const chatHistory: ChatMessage[] = [...messages, userMessage].map(msg => ({
        sender: msg.role === "user" ? "user" : "Bot",
        message: msg.content
      }))

      const response = await sendChat(chatHistory)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.model_output,
        role: "assistant"
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error("Failed to get chat response:", error)
      // Optionally add error handling UI here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="w-full min-h-screen p-4">
      <div className="mx-auto w-[900px] min-h-[500px] max-h-[900px] h-[90vh] flex flex-col overflow-hidden mt-8">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
        <Card className="flex-1 flex flex-col overflow-hidden border">
          <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              {messages.map((message) => (
                <ChatBubble
                  key={message.id}
                  variant={message.role === "user" ? "sent" : "received"}
                >
                  {message.content}
                </ChatBubble>
              ))}
              {isLoading && (
                <ChatBubble variant="received">
                  <div className="flex gap-1 items-center">
                    <span className="w-1 h-1 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1 h-1 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1 h-1 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </ChatBubble>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!input.trim()}>
                <SendHorizontal className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default App