"use client";

import { useState } from "react";
import { Button, TextField, IconButton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";

export default function Chat({ onClose }) {
  const [messages, setMessages] = useState<{
    text?: string;
    sender: "bot" | "user";
    fileUrl?: string;
    fileName?: string;
  }>([{ text: "Hi! How can I help you?", sender: "bot" }]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: "user" },
      ]);
      setInput("");

      // Simulate bot response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "That's great to hear! I'm here to assist you.",
            sender: "bot",
          },
        ]);
      }, 1000);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      const fileUrl = URL.createObjectURL(file);

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", fileUrl, fileName: file.name },
      ]);
    }
  };

  return (
    <div className="chat-container">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="user-icon">P</div>
        <span className="username">Prakhar</span>
        <button className="close-chat" onClick={onClose}>
          ✖
        </button>
      </div>

      {/* Chat Messages */}
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.sender === "bot" ? (
              <span className="bot-icon">🤖</span>
            ) : (
              <span className="user-icon">P</span>
            )}
            {msg.text && <p>{msg.text}</p>}
            {msg.fileUrl && (
              <a
                href={msg.fileUrl}
                download={msg.fileName}
                className="file-message"
              >
                📎 {msg.fileName}
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="input-area">
        <TextField
          variant="outlined"
          placeholder="Start chatting"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-box"
        />
        <input
          type="file"
          id="file-upload"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
        <IconButton component="label" htmlFor="file-upload">
          <AttachFileIcon />
        </IconButton>
        <Button className="send-button" onClick={sendMessage}>
          <SendIcon />
        </Button>
      </div>
    </div>
  );
}
