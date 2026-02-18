"use client"
import React from 'react'
import { BookOpen, MessageSquare } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

function MyBookNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams();
  const roomId = searchParams.get("room");
  const roomParam = roomId ? `?room=${roomId}` : '';

  const items = [
    {
      label: "My Books",
      href: `/my-books/post${roomParam}`,
      icon: BookOpen,
      match: "/my-books/post",
    },
    {
      label: "Requests",
      href: `/my-books/rental-request${roomParam}`,
      icon: MessageSquare,
      match: "/my-books/rental-request",
    },
  ];

  return (
    <div className="flex flex-col gap-1 p-1 min-w-[160px]">
      {items.map((item) => {
        const isActive = pathname === item.match;
        return (
          <button
            key={item.href}
            onClick={() => router.push(item.href)}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors w-full text-left
              ${isActive
                ? "bg-white/10 text-white font-medium"
                : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export default MyBookNavigation
