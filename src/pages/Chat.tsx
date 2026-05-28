import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  confirmed: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const initialChats = [
  {
    id: "1",
    listingTitle: "Studio Room near Campus",
    landlordName: "John Doe",
    status: "pending",
    unread: 1,
    timestamp: "Just now",
    lastMessage: "Down payment initiated",
    messages: [
      {
        id: 1,
        from: "student",
        text: "I have sent a down payment of ₱1,000 to reserve this room.",
        time: "Just now",
      },
      {
        id: 2,
        from: "landlord",
        text: "We are verifying your payment. Please wait for confirmation.",
        time: "Just now",
      },
    ],
  },
];

const Chat = () => {
  const [chats, setChats] = useState(initialChats);
  const [selected, setSelected] = useState(initialChats[0]?.id || "");
  const [message, setMessage] = useState("");

  const selectedChat = chats.find((c) => c.id === selected);

  const handleSend = () => {
    if (!message.trim()) return;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Add student message
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id !== selected) return chat;

        const newMsg = {
          id: chat.messages.length + 1,
          from: "student",
          text: message,
          time,
        };

        return {
          ...chat,
          messages: [...chat.messages, newMsg],
          lastMessage: message,
          timestamp: time,
          status: "processing",
        };
      })
    );

    setMessage("");

    // Simulated landlord response
    setTimeout(() => {
      const approved = Math.random() > 0.3;

      setChats((prev) =>
        prev.map((chat) => {
          if (chat.id !== selected) return chat;

          const reply = {
            id: chat.messages.length + 2,
            from: "landlord",
            text: approved
              ? "Payment confirmed. Your reservation is secured. You may now proceed to move-in instructions."
              : "We couldn’t verify your payment. Please resend proof or contact support.",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };

          return {
            ...chat,
            messages: [...chat.messages, reply],
            lastMessage: reply.text,
            timestamp: reply.time,
            status: approved ? "confirmed" : "rejected",
          };
        })
      );
    }, 1200);
  };

  return (
    <div className="pt-20 h-screen flex flex-col">
      <div className="container mx-auto px-6 flex-1 flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center gap-3 py-4">
          <Link to="/listings">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </Link>

          <div>
            <h1 className="text-xl font-bold">Secure Payment Chat</h1>
            <p className="text-xs text-muted-foreground">
              Confirm your down payment with the landlord
            </p>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden border rounded-xl bg-card">

          {/* SIDEBAR */}
          <div className="w-80 border-r hidden md:flex flex-col">
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-3 h-3 text-muted-foreground" />
                <Input className="pl-8 h-9 text-sm" placeholder="Search chats..." />
              </div>
            </div>

            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelected(chat.id)}
                className={`p-4 text-left border-b hover:bg-muted/40 ${
                  selected === chat.id ? "bg-muted" : ""
                }`}
              >
                <div className="flex justify-between">
                  <p className="font-semibold text-sm">{chat.listingTitle}</p>
                  <Badge className={statusColors[chat.status]}>
                    {chat.status}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {chat.lastMessage}
                </p>
              </button>
            ))}
          </div>

          {/* CHAT WINDOW */}
          <div className="flex-1 flex flex-col">

            {selectedChat && (
              <>
                {/* HEADER */}
                <div className="p-4 border-b bg-muted/30">
                  <h2 className="font-semibold">
                    {selectedChat.listingTitle}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Landlord: {selectedChat.landlordName}
                  </p>
                </div>

                {/* MESSAGES */}
                <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                  {selectedChat.messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        msg.from === "student"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`px-4 py-3 rounded-2xl max-w-[75%] text-sm ${
                          msg.from === "student"
                            ? "bg-blue-600 text-white"
                            : "bg-muted"
                        }`}
                      >
                        {msg.text}
                        <div className="text-[10px] opacity-70 mt-1">
                          {msg.time}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* INPUT */}
                <div className="p-3 border-t flex gap-2">
                  <Input
                    placeholder="Send payment proof or message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  />
                  <Button onClick={handleSend}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;