import React from "react";

import Link from "next/link";

const Nav: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50">
      <Link href="/">Home</Link>
      <Link href="/allmusic">All Music</Link>
      <Link href="/mixtape">Mixtape</Link>
      <Link href="/live">Live</Link>
    </nav>
  );
};

export default Nav;
