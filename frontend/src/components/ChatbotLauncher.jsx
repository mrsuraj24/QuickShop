import React, { useState } from "react";
import Chatbot from "./Chatbot";

function ChatbotLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#007bffff",
          color: "#fff",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          fontSize: "35px",
          boxShadow: "0 0 20px #6316d6ff"
        }}
        onClick={() => setOpen(!open)}
      >
        💬
      </div>
      {open && <Chatbot />}
    </>
  );
}
export default ChatbotLauncher;