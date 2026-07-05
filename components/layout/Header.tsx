"use client";
import MenuBar from "../menubar";

export default function Header() {
  return (
    <div className="w-full bg-white/5 backdrop-blur-md">
      <header className="w-full header">
        <MenuBar />
      </header>
    </div>
  );
}