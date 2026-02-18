"use client"
import React, { useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { BookOpen, MessageSquare, ChevronDown } from "lucide-react";

function NavbarSec() {
  const path = usePathname();
  const searchParams = useSearchParams();
  const roomId = searchParams.get("room");
  const roomParam = roomId ? `&room=${roomId}` : '';
  const roomParamFirst = roomId ? `?room=${roomId}` : '';
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isMyBooksActive = path.startsWith("/my-books");

  const links = [
    { name: "Browse Books", href: `/home?page=1${roomParam}` },
    { name: "My Books", href: `/my-books/post${roomParamFirst}`, hasDropdown: true },
    { name: "My Rentals", href: `/rentedbooks${roomParamFirst}` },
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
      label: "Requests",
      href: `/my-books/rental-request${roomParamFirst}`,
      icon: MessageSquare,
      description: "View rental requests",
      match: "/my-books/rental-request",
    },
  ];

  const isActive = (link: typeof links[0]) => {
    if (link.hasDropdown) return isMyBooksActive;
    return path.replace(`[1-9]\\d*`, "1") === link.href ||
      path.replace("rental-request", "") === link.href.replace("post", "");
  };

  const openDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => setDropdownOpen(false), 200);
  };

  return (
    <nav className="flex items-center justify-center">
      <div className="flex items-center gap-1">
        {links.map((link, index) => {
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
                  className={`
                    inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200
                    ${active
                      ? "text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                    }
                  `}
                >
                  {link.name}
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </Link>

                {/* Underline indicator */}
                {active && (
                  <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-white rounded-full" />
                )}

                {/* Dropdown */}
                <div
                  style={{
                    opacity: dropdownOpen ? 1 : 0,
                    transform: dropdownOpen ? "translateY(0)" : "translateY(-4px)",
                    pointerEvents: dropdownOpen ? "auto" : "none",
                    transition: "opacity 200ms, transform 200ms",
                    position: "absolute",
                    left: "50%",
                    top: "100%",
                    paddingTop: "12px",
                    zIndex: 50,
                  }}
                  className="-translate-x-1/2"
                >
                  <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-1.5 min-w-[220px]"
                    style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.8)" }}
                  >
                    {myBooksSubLinks.map((sub) => {
                      const subActive = path === sub.match;
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setDropdownOpen(false)}
                          className={`
                            flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150
                            ${subActive
                              ? "bg-white/10 text-white"
                              : "text-zinc-400 hover:bg-white/5 hover:text-white"
                            }
                          `}
                        >
                          <div className={`
                            w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                            ${subActive
                              ? "bg-white text-black"
                              : "bg-zinc-800 text-zinc-400"
                            }
                          `}>
                            <sub.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{sub.label}</p>
                            <p className="text-[11px] text-zinc-500">{sub.description}</p>
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
              className={`
                relative inline-flex items-center px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200
                ${active
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-300"
                }
              `}
            >
              {link.name}
              {active && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-white rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default NavbarSec;
