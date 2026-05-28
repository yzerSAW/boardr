import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const statusColors: Record<string, string> = {
  pending: "bg-gold/15 text-foreground border border-gold/30",
  replied: "bg-success/15 text-success border border-success/30",
  viewed: "bg-muted text-muted-foreground border border-border",
  closed: "bg-destructive/15 text-destructive border border-destructive/30",
};

// ✅ MOCK DATA WITH MESSAGES INSIDE
const initialInquiries = [
  {
    id: "1",
    listingTitle: "Studio Room near Campus",
    landlordName: "John Doe",
    status: "pending",
    unread: 2,
    timestamp: "2:30 PM",
    lastMessage: "Is it still available?",
    messages: [
      { id: 1, from: "student", text: "Hi! Is the room still available?", time: "2:30 PM" },
      { id: 2, from: "landlord", text: "Yes, it is!", time: "2:45 PM" },
    ],
  },
  {
    id: "2",
    listingTitle: "Boarding House",
    landlordName: "Jane Smith",
    status: "replied",
    unread: 0,
    timestamp: "1:10 PM",
    lastMessage: "Thanks!",
    messages: [
      { id: 1, from: "student", text: "Is WiFi included?", time: "1:00 PM" },
      { id: 2, from: "landlord", text: "Yes, free WiFi included.", time: "1:05 PM" },
    ],
  },
];

const Inquiry = () => {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [selected, setSelected] = useState(initialInquiries[0]?.id || "");
  const [message, setMessage] = useState("");

  const selectedInquiry = inquiries.find((i) => i.id === selected);

  // ✅ SEND MESSAGE (DYNAMIC PER CONVO)
  const handleSend = () => {
    if (!message.trim()) return;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id !== selected) return inq;

        const newMsg = {
          id: inq.messages.length + 1,
          from: "student",
          text: message,
          time,
        };

        return {
          ...inq,
          messages: [...inq.messages, newMsg],
          lastMessage: message,
          timestamp: time,
        };
      })
    );

    setMessage("");

    // ✅ OPTIONAL AUTO-REPLY
    setTimeout(() => {
      setInquiries((prev) =>
        prev.map((inq) => {
          if (inq.id !== selected) return inq;

          const reply = {
            id: inq.messages.length + 2,
            from: "landlord",
            text: "Got your message 👍",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };

          return {
            ...inq,
            messages: [...inq.messages, reply],
            lastMessage: reply.text,
            timestamp: reply.time,
          };
        })
      );
    }, 1000);
  };

  return (
    <div className="pt-20 h-screen flex flex-col">
      <div className="container mx-auto px-6 flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center gap-4 py-4">
          <Link to="/customer-dashboard" className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">Messages</h1>
            <p className="text-xs text-muted-foreground font-body">
              {inquiries.length} conversations
            </p>
          </div>
        </div>

        <div className="flex-1 flex gap-0 overflow-hidden rounded-xl border border-border/60 bg-card mb-6 shadow-card">
          
          {/* Sidebar */}
          <div className="w-80 border-r border-border overflow-y-auto hidden md:flex flex-col bg-muted/20">
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-9 h-9 text-sm border-0 bg-muted/60 font-body" />
              </div>
            </div>

            {inquiries.map((inq) => (
              <button
                key={inq.id}
                onClick={() => setSelected(inq.id)}
                className={`w-full text-left p-4 border-b border-border/50 hover:bg-muted/50 transition-colors ${
                  selected === inq.id ? "bg-muted border-l-2 border-l-primary" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display font-semibold text-sm text-card-foreground truncate">
                    {inq.listingTitle}
                  </span>
                  {inq.unread > 0 && (
                    <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full text-[10px] flex items-center justify-center font-display font-bold">
                      {inq.unread}
                    </span>
                  )}
                </div>

                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {inq.lastMessage}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <Badge className={`${statusColors[inq.status]} text-[10px]`}>
                    {inq.status}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">
                    {inq.timestamp}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Chat */}
          <div className="flex-1 flex flex-col">
            {selectedInquiry ? (
              <>
                <div className="p-4 border-b border-border bg-background/50">
                  <h3 className="font-display font-bold">
                    {selectedInquiry.listingTitle}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      with {selectedInquiry.landlordName}
                    </span>
                    <Badge className={`${statusColors[selectedInquiry.status]} text-[10px]`}>
                      {selectedInquiry.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {selectedInquiry.messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.from === "student" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                          msg.from === "student"
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-muted text-foreground rounded-bl-md"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                        <span className="text-[10px] mt-1.5 block opacity-70">
                          {msg.time}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 border-t border-border bg-background/50">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="h-11"
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <Button
                      onClick={handleSend}
                      className="h-11 w-11"
                      size="icon"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <p>Select a conversation</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;