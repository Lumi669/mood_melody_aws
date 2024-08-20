import React from "react";
import Link from "next/link";

const Nav: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-lg font-semibold">
          Home
        </Link>
        <Link href="/allmusic" className="text-lg font-semibold">
          All Music
        </Link>
        <Link href="/mixtape" className="text-lg font-semibold">
          MixtapeY
        </Link>
        <Link href="/live" className="text-lg font-semibold">
          Live
        </Link>
        <Link href="/users" className="text-lg font-semibold">
          Users
        </Link>
        <Link href="/sentimentanalysis" className="text-lg font-semibold">
          Sentiment analysis
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
