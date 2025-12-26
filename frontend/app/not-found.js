import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "16px",
      }}
    >
      <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>404</h1>

      <p style={{ fontSize: "18px", color: "#666" }}>
        Sorry, the page you are looking for does not exist.
      </p>

      <Link
        href="/"
        style={{
          marginTop: "12px",
          padding: "10px 18px",
          borderRadius: "6px",
          backgroundColor: "#000",
          color: "#fff",
          textDecoration: "none",
        }}
      >
        Go back home
      </Link>
    </div>
  );
}
