import { useState, useEffect, useRef, forwardRef } from "react";
import { MessageCircle, Minus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Smart AI-like responses based on user queries
const getSmartResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  // Product queries
  if (message.includes("cotton") && message.includes("ilkal")) {
    return "Yes 😊 We offer Pure Cotton and Cotton Silk Ilkal sarees. You can find them under Sarees → Based on Fabric. Would you like me to help you explore our cotton collection?";
  }
  if (message.includes("silk") && (message.includes("ilkal") || message.includes("saree"))) {
    return "We have beautiful Silk Ilkal sarees! Choose from Pure Silk, Cotton Silk, or Art Silk options. Visit Sarees → Based on Fabric to browse our silk collection.";
  }
  if (message.includes("wedding") || message.includes("bridal")) {
    return "Our Wedding Sarees collection features exquisite Ilkal sarees perfect for your special day! Browse Occasions → Wedding Sarees for stunning bridal options with rich zari work.";
  }
  if (message.includes("festive") || message.includes("festival") || message.includes("puja")) {
    return "For festivals, we recommend our Festive Wear collection! These sarees feature vibrant colors and traditional designs. Check Occasions → Festive Wear Sarees.";
  }
  
  // Delivery queries
  if (message.includes("delivery") || message.includes("shipping") || message.includes("deliver")) {
    return "We usually deliver within 3–7 working days across India. Free shipping is available on orders above ₹2999. Track your order anytime from My Orders section!";
  }
  if (message.includes("track") && message.includes("order")) {
    return "You can track your order by going to My Account → Your Orders. Click on 'Track Order' for real-time updates. Need help with a specific order?";
  }
  
  // Return/Exchange queries
  if (message.includes("return") || message.includes("exchange") || message.includes("refund")) {
    return "We offer a 7-day easy return policy for all products. Visit Returns & Exchange in the footer for complete details. The product should be unused with original tags.";
  }
  
  // Price/Payment queries
  if (message.includes("price") || message.includes("cost") || message.includes("expensive")) {
    return "Our Ilkal sarees range from ₹1,499 to ₹5,999+ depending on fabric and work. Use filters on the Products page to find sarees within your budget. We also offer COD!";
  }
  if (message.includes("cod") || message.includes("cash on delivery") || message.includes("payment")) {
    return "Yes! We accept Cash on Delivery, UPI, Credit/Debit Cards, and Net Banking. COD is available for orders up to ₹10,000.";
  }
  
  // Size queries
  if (message.includes("size") || message.includes("length") || message.includes("measurement")) {
    return "All our sarees are 5.5 meters in length with 0.8 meters blouse piece (unstitched). Standard width is 1.1 meters. View the Size Guide on any product page for more details.";
  }
  
  // GI Certified
  if (message.includes("gi") || message.includes("certified") || message.includes("authentic")) {
    return "Yes! Many of our Ilkal sarees are GI (Geographical Indication) Certified, ensuring authentic handloom craftsmanship from Karnataka. Look for the 'GI Certified' badge on products.";
  }
  
  // Contact queries
  if (message.includes("contact") || message.includes("call") || message.includes("phone") || message.includes("email")) {
    return "You can reach us at:\n📞 +91 98765 43210\n📧 hello@parampare.com\n💬 WhatsApp: Click the green icon below\n\nWe're available 9 AM - 9 PM IST!";
  }
  
  // Greetings
  if (message.includes("hello") || message.includes("hi") || message.includes("hey") || message.includes("namaste")) {
    return "Namaste! 🙏 How can I help you today? I can assist with:\n• Finding the perfect saree\n• Order tracking & delivery\n• Returns & exchanges\n• Any other questions!";
  }
  if (message.includes("thank") || message.includes("thanks")) {
    return "You're welcome! 🙏 Is there anything else I can help you with? Happy to assist anytime!";
  }
  
  // Default smart response
  return "Thank you for your query! I can help you with:\n\n• Finding sarees by fabric, occasion, or style\n• Delivery & tracking information\n• Returns and exchanges\n• Payment options\n\nPlease ask a specific question, or contact us at +91 98765 43210 for personalized assistance.";
};

const Chatbot = forwardRef<HTMLDivElement>((_, ref) => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load user name and chat history from localStorage
  useEffect(() => {
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
      ? `Namaste, ${name} 🙏 Welcome to Parampare. How can we help you today?`
      : "Namaste 🙏 Welcome to Parampare. How can we help you today?";

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
    const userQuery = inputValue.trim();
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay for more natural feel
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        text: getSmartResponse(userQuery),
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div ref={ref}>
      {/* Minimized Chat Bubble - positioned to not overlap with BackToTop */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-maroon hover:bg-maroon-dark text-white shadow-elevated flex items-center justify-center transition-all duration-300 hover:scale-105 group"
          title="Need help?"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute -top-10 right-0 bg-foreground text-background text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Need help?
          </span>
        </button>
      )}

      {/* Expanded Chat Window - positioned above WhatsApp and BackToTop */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-[360px] max-w-[calc(100vw-48px)] bg-card rounded-2xl shadow-elevated border border-border overflow-hidden animate-fade-in-up">
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
                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line",
                    message.isBot
                      ? "bg-card border border-border text-foreground rounded-bl-sm"
                      : "bg-maroon text-white rounded-br-sm"
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-card border border-border text-foreground rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm">
                  <span className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}
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
    </div>
  );
});

Chatbot.displayName = "Chatbot";

export default Chatbot;
