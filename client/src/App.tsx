import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChatBubble } from "@/components/ui/chat-bubble"
import { SendHorizontal } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user"
    }
    setMessages(prev => [...prev, userMessage])

    // Add mock response (replace this with actual API call later)
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: "This is a mock response. Replace this with actual API integration.",
      role: "assistant"
    }
    setTimeout(() => {
      setMessages(prev => [...prev, assistantMessage])
    }, 1000)

    setInput("")
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
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
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