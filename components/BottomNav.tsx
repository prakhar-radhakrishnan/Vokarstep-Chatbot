import { FaPhone, FaDesktop, FaRegCommentDots } from "react-icons/fa";

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <div className="bottom-ribbon">
      <button
        className={activeTab === "call" ? "active" : ""}
        onClick={() => setActiveTab("call")}
      >
        <FaPhone size={20} />
        Call
      </button>

      <button
        className={activeTab === "screen" ? "active" : ""}
        onClick={() => setActiveTab("screen")}
      >
        <FaDesktop size={20} />
        Screen Share
      </button>

      <button
        className={activeTab === "chat" ? "active" : ""}
        onClick={() => setActiveTab("chat")}
      >
        <FaRegCommentDots size={20} />
        Chat
      </button>
    </div>
  );
}
