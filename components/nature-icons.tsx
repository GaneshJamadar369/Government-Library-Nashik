"use client"

import Image from "next/image"

interface NatureIconProps {
  type: "book" | "tree" | "newspaper" | "community" | "knowledge" | "environment" | "trophy" | "graduation" | "target" | "star"
  size?: number
  className?: string
}

export function NatureIcon({ type, size = 32, className = "" }: NatureIconProps) {
  const icons: Record<string, string> = {
    book: "/icons/book.png",
    tree: "/icons/tree.png",
    newspaper: "/icons/newspaper.png",
    community: "/icons/community.png",
    knowledge: "/icons/knowledge.png",
    environment: "/icons/environment.png",
    trophy: "/icons/trophy.png",
    graduation: "/icons/graduation.png",
    target: "/icons/target.png",
    star: "/icons/star.png",
  }

  return (
    <Image
      src={icons[type]}
      alt={type}
      width={size}
      height={size}
      className={`object-contain ${className}`}
    />
  )
}

// SVG Icons as components for better performance
export function BookIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M8 7h8M8 11h6" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    </svg>
  )
}

export function TreeIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M12 2L4 12h3v4h2v6h6v-6h2v-4h3L12 2z" 
        fill="currentColor"
      />
    </svg>
  )
}

export function NewspaperIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M4 4h16v16H4z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M8 8h8M8 12h8M8 16h4" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    </svg>
  )
}

export function CommunityIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
      <path 
        d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <circle cx="5" cy="9" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="19" cy="9" r="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

export function TrophyIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M6 9H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3M18 9h3a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-3M6 4h12v6a6 6 0 0 1-12 0V4zM12 16v4M8 20h8" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function KnowledgeIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LeafDecorIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7 8 17 8 17 8Z"/>
    </svg>
  )
}
