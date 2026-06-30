function Footer() {
  return (
    <footer
      style={{
        marginTop: "40px",
        padding: "20px",
        textAlign: "center",
        color: "#64748b",
        borderTop: "1px solid #e2e8f0",
        background: "#ffffff",
        fontSize: "15px",
      }}
    >
      © {new Date().getFullYear()} AI Blockchain Assistant • Developed by <strong>S Viswanath</strong> • Version 1.0
    </footer>
  );
}

export default Footer;