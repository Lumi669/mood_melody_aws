import React from "react";
import NavLink from "./NavLink"; // Ensure the import path is correct

const Nav: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex justify-start items-center space-x-6 p-4">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/allmusic">All Music</NavLink>
        <NavLink href="/mixtape">MixtapeY</NavLink>
        <NavLink href="/live">Live</NavLink>
        <NavLink href="/users">Users</NavLink>
        <NavLink href="/sentimentanalysis">Sentiment analysis</NavLink>
      </div>
    </nav>
  );
};

export default Nav;
