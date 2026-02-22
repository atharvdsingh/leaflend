"use client";
import React, { useState, useRef } from "react";
import { Button } from "../ui/button";
import {
  ArrowLeft,
  Book,
  BookOpen,
  ChevronDown,
  Menu,
  MessageSquare,
  ShoppingCart,
  X,
} from "lucide-react";
import Link from "next/link";
import CreateBook from "../CreateBook";
import { useAppSelector } from "@/lib/hooks";
import { Badge } from "../ui/badge";
import { usePathname, useSearchParams } from "next/navigation";
import SetTheme from "../SetTheme";

function Navbar() {
  const bookno: number = useAppSelector((state) => state.cart.NoOfBooks);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const path = usePathname();
  const searchParams = useSearchParams();
  const roomId = searchParams.get("room");
  const roomParam = roomId ? `&room=${roomId}` : "";
  const roomParamFirst = roomId ? `?room=${roomId}` : "";

  const navLinks = [
    { name: "Browse", href: `/home?page=1${roomParam}` },
    {
      name: "My Books",
      href: `/my-books/post${roomParamFirst}`,
      hasDropdown: true,
    },
    { name: "Rentals", href: `/rentedbooks${roomParamFirst}` },
    { name: "Cart", href: `/cart${roomParamFirst}` },
  ];

  const myBooksSubLinks = [
    {
      label: "My Books",
      href: `/my-books/post${roomParamFirst}`,
      icon: BookOpen,
      description: "Manage your listed books",
      match: "/my-books/post",
    },
    {
      label: "Rental Requests",
      href: `/my-books/rental-request${roomParamFirst}`,
      icon: MessageSquare,
      description: "View incoming requests",
      match: "/my-books/rental-request",
    },
  ];

  const isActive = (link: (typeof navLinks)[0]) => {
    if (link.hasDropdown) return path.startsWith("/my-books");
    if (link.href.startsWith("/home")) return path.startsWith("/home");
    if (link.href.startsWith("/rentedbooks"))
      return path.startsWith("/rentedbooks");
    if (link.href.startsWith("/cart")) return path.startsWith("/cart");
    return false;
  };

  const openDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };
  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => setDropdownOpen(false), 200);
  };

  return (
    <>
      <nav className="flex items-center justify-between h-12">
        {/* Left: Logo */}
        <div className="flex flex-1 items-center justify-start gap-3">
          <Link
            href="/"
            className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Book className="w-5 h-5" />
            <span className="font-bold text-lg text-foreground">BookChetna</span>
          </Link>
        </div>

        {/* Center: Desktop Navigation Tabs */}
        <div className="hidden md:flex items-center justify-center gap-1">
          {navLinks.map((link, index) => {
            const active = isActive(link);

            if (link.hasDropdown) {
              return (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                >
                  <Link
                    href={link.href}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${active
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                  >
                    {link.name}
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </Link>

                  {/* Desktop dropdown */}
                  <div
                    style={{
                      opacity: dropdownOpen ? 1 : 0,
                      transform: dropdownOpen
                        ? "translateY(0)"
                        : "translateY(-4px)",
                      pointerEvents: dropdownOpen ? "auto" : "none",
                      transition: "opacity 150ms ease, transform 150ms ease",
                      position: "absolute",
                      left: "50%",
                      top: "100%",
                      paddingTop: "8px",
                      zIndex: 50,
                    }}
                    className="-translate-x-1/2"
                  >
                    <div
                      className="bg-card border border-border rounded-xl p-1.5 min-w-[220px]"
                      style={{
                        boxShadow: "0 16px 48px rgba(0,0,0,0.7)",
                      }}
                    >
                      {myBooksSubLinks.map((sub) => {
                        const subActive = path === sub.match;
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setDropdownOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 ${subActive
                              ? "bg-primary/10 text-foreground"
                              : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                              }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${subActive
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                                }`}
                            >
                              <sub.icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{sub.label}</p>
                              <p className="text-[11px] text-muted-foreground">
                                {sub.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                  </div>
                </div>
              );
            }

            return (
              <Link
                key={index}
                href={link.href}
                className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${active
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="hidden md:block">
            <CreateBook />
          </div>


          <Link href={`/cart${roomParamFirst}`} className="relative p-2">
            <ShoppingCart className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            {bookno > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-0.5 -right-0.5 px-1 py-0 text-[10px] min-w-[16px] h-4 flex items-center justify-center"
              >
                {bookno}
              </Badge>
            )}
          </Link>
          <SetTheme />


          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="pt-3 pb-2 space-y-1 border-t border-border mt-3">
          {navLinks.map((link, index) => {
            const active = isActive(link);

            if (link.hasDropdown) {
              return (
                <div key={index}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      }`}
                  >
                    {link.name}
                  </Link>
                  {/* Always show sub-links under My Books on mobile */}
                  <div className="ml-4 mt-1 space-y-1 border-l border-border pl-3">
                    {myBooksSubLinks.map((sub) => {
                      const subActive = path === sub.match;
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${subActive
                            ? "text-foreground bg-muted/50"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                          <sub.icon className="w-4 h-4" />
                          {sub.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={index}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}


          {/* Mobile Post a Book */}
          <div className="px-3 pt-2">
            <CreateBook />
          </div>

        </div>
      </div>
    </>
  );
}

export default Navbar;
