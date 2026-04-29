'use client';

import { 
  Package, 
  ShoppingCart, 
  Users, 
  UserCog,
  LogOut,
  Menu,
  X
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const menuItems = [
  { icon: Package, label: "Products", href: "#" },
  { icon: ShoppingCart, label: "Orders", href: "#" },
  { icon: Users, label: "Customers", href: "#" },
  { icon: UserCog, label: "Account", href: "#" }
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg shadow-md"
        style={{ backgroundColor: "#1e3a8a" }}
      >
        {isOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen transition-all duration-300 z-40 ${
          isOpen ? "w-64" : "w-0"
        } lg:w-64 overflow-hidden shadow-lg flex flex-col`}
        style={{ backgroundColor: "#ffffff" }}
      >
        {/* Logo Section - uses public/logo.png if present */}
        <div className="p-6 border-b" style={{ borderColor: "#e5e7eb" }}>
          <a href="#" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Magnify" width={160} height={48} priority />
          </a>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
                style={{
                  color: "#4b5563",
                  backgroundColor: "transparent"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                  e.currentTarget.style.color = "#1f2937";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#4b5563";
                }}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t" style={{ borderColor: "#e5e7eb" }}>
          <button 
            className="flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200"
            style={{ backgroundColor: "transparent", color: "#1f2937" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#3b82f6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#1f2937";
            }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
