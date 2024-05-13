import React, { useState, useRef } from "react";

const CodeDisplay = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef(null);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds

    // Send code to iframe
    iframeRef.current.contentWindow.postMessage({ type: 'COPY_CODE', code }, '*');
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={copyCodeToClipboard}
        style={{
          position: "absolute",
          top: 5,
          right: 5,
          padding: "5px 10px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre style={{ background: "#f4f4f4", padding: 20, paddingTop: 50 }}>
        <code>{code}</code>
      </pre>

      <iframe
        ref={iframeRef}
        title="AcadamicFolio"
        frameBorder="0"
        height="450px"
        src="https://onecompiler.com/embed/"
        width="100%"
      ></iframe>
    </div>
  );
};

export default CodeDisplay; 