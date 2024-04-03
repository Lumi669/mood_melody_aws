import React from "react";
import Link from "next/link";
import Image from "next/image";

// import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <Link href="/" className="header-logo">
        <Image
          src="/path-to-logo.png"
          alt="App Logo"
          width={500}
          height={300}
          layout="responsive"
        />
      </Link>
      <nav className="header-nav">
        <ul>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>

          {/* Additional links or buttons can be added here */}
        </ul>
      </nav>
      <div className="header-cta">
        <Link href="/mood-selection" className="cta-button">
          Create Your Playlist
        </Link>
      </div>
    </header>
  );
};

export default Header;
