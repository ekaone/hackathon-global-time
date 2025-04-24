import React from "react";

const Footer: React.FC = () => (
  <footer
    style={{
      width: "100%",
      padding: "1rem 0",
      color: "#f5f5dc",
      textAlign: "center",
      position: "relative",
      bottom: 0,
      zIndex: 10,
      marginTop: "2rem",
    }}
  >
    <a
      href="https://github.com/ekaone/hackathon-global-time"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: "#f5f5dc",
        textDecoration: "none",
        fontWeight: 500,
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: "1rem",
      }}
    >
      View on GitHub
    </a>
  </footer>
);

export default Footer;
