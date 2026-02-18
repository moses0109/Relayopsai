import React, { useEffect } from 'react';

/* ------------------------------------------------------------------ */
/*  CHAT WIDGET — Kevva.tech AI Chat Integration                      */
/* ------------------------------------------------------------------ */

const ChatWidget: React.FC = () => {
  useEffect(() => {
    // Load the Kevva.tech chat widget script
    const script = document.createElement('script');
    script.src = 'https://www.kevva.tech/widget/chat.js';
    script.setAttribute('data-agent-id', '2da10ec7-3966-4214-bbfb-84b85a29caf8');
    script.setAttribute('data-color', '#2563eb');
    script.setAttribute('data-position', 'right');
    script.async = true;

    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // Widget is rendered by the external script
};

export default ChatWidget;
