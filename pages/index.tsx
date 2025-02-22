"use client";

import { useState } from "react";
import { Container } from "@mui/material";
import BottomNav from "../components/BottomNav";
import Microphone from "../components/Microphone";
import ScreenShare from "../components/ScreenShare";
import Chat from "../components/Chat";

export default function Home() {
  const [activeTab, setActiveTab] = useState("call");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    if (tab === "chat") {
      setIsChatOpen(true);
      setActiveTab("chat");
    } else {
      setIsChatOpen(false);
      setActiveTab(tab);
    }
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
    setActiveTab("screen"); // When closing chat, switch to Screen Share
  };

  return (
    <Container className="main-container">
      {/* Dynamic Center Content */}
      <div className={`center-content ${isChatOpen ? "with-chat" : ""}`}>
        {activeTab === "call" && <Microphone />}
        {(activeTab === "screen" || isChatOpen) && <ScreenShare />}
        {isChatOpen && <Chat onClose={handleChatClose} />}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={handleTabChange} />
    </Container>
  );
}
