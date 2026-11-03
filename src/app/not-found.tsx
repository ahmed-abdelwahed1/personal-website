import Link from "next/link";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div
      className="blog-listing"
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "40px 20px",
      }}
    >
      <header className="blog-listing-header" style={{ marginBottom: "2rem" }}>
        <h1
          className="blog-listing-title"
          style={{ fontSize: "clamp(3.5rem, 9vw, 6.5rem)", fontWeight: 700, margin: 0, opacity: 0.9 }}
        >
          404
        </h1>
        <h2 style={{ fontSize: "var(--fs-section-title)", margin: "1rem 0 0.5rem" }}>
          Page Not Found
        </h2>
        <p className="blog-listing-subtitle" style={{ maxWidth: "480px", margin: "0 auto" }}>
          The page you are looking for doesn&apos;t exist, was removed, or had its address changed.
        </p>
      </header>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href="/"
          className="btn btn-primary"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
        >
          <FaHome /> Back to Home
        </Link>
        <Link
          href="/blog/"
          className="btn btn-outline"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
        >
          <FaArrowLeft /> Browse Blog
        </Link>
      </div>
    </div>
  );
}
