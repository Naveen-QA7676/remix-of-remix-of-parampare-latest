import { useState, useEffect, useRef } from "react";
import { MessageCircle, Minus, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [userName, setUserName] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load user name and chat history from localStorage
  useEffect(() => {
    const userDataStr = localStorage.getItem("parampare_user");
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        setUserName(userData.fullName || null);
      } catch {
        setUserName(null);
      }
    }

    // Load chat history
    const chatHistoryStr = sessionStorage.getItem("parampare_chat_history");
    if (chatHistoryStr) {
      try {
        const history = JSON.parse(chatHistoryStr);
        setMessages(history.map((msg: ChatMessage) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })));
      } catch {
        initializeChat();
      }
    } else {
      initializeChat();
    }
  }, []);

  // Save chat history to sessionStorage
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem("parampare_chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const initializeChat = () => {
    const userDataStr = localStorage.getItem("parampare_user");
    let name = null;
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        name = userData.fullName;
      } catch {
        name = null;
      }
    }

    const greeting = name
      ? `Namaste, ${name} 🙏 Welcome to Parampare! How can I assist you today?`
      : "Namaste! 🙏 Welcome to Parampare! How can I assist you today?";

    setMessages([
      {
        id: "greeting",
        text: greeting,
        isBot: true,
        timestamp: new Date(),
      },
    ]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: inputValue.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Thank you for reaching out! Our team will assist you shortly.",
        "I can help you find the perfect Ilkal saree. What occasion are you shopping for?",
        "We have a wide range of handwoven sarees. Would you like to explore our bestsellers?",
        "Our customer support team is available from 9 AM to 9 PM. How may I help you?",
        "Looking for something specific? I can guide you through our collections.",
      ];

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Minimized Chat Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-maroon hover:bg-maroon-dark text-white shadow-elevated flex items-center justify-center transition-all duration-300 hover:scale-105 group"
          title="Need help?"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute -top-10 right-0 bg-foreground text-background text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Need help?
          </span>
        </button>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-card rounded-2xl shadow-elevated border border-border overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-maroon text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Parampare Support</h3>
                <p className="text-xs text-white/70">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              title="Minimize"
            >
              <Minus className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="h-[320px] overflow-y-auto p-4 space-y-4 bg-muted/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.isBot ? "justify-start" : "justify-end"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                    message.isBot
                      ? "bg-card border border-border text-foreground rounded-bl-sm"
                      : "bg-maroon text-white rounded-br-sm"
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-border bg-card">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 h-10 bg-muted/50 border-0 focus-visible:ring-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                size="icon"
                className="h-10 w-10 bg-maroon hover:bg-maroon-dark text-white rounded-full"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
