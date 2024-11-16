import React from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Center dot */}
      <circle cx="24" cy="24" r="4" fill="black" />
      
      {/* Inner ring - 6 dots */}
      <circle cx="24" cy="16" r="3" fill="black" />
      <circle cx="31" cy="20" r="3" fill="black" />
      <circle cx="32" cy="28" r="3" fill="black" />
      <circle cx="24" cy="32" r="3" fill="black" />
      <circle cx="16" cy="28" r="3" fill="black" />
      <circle cx="17" cy="20" r="3" fill="black" />
      
      {/* Outer ring - 8 dots */}
      <circle cx="24" cy="10" r="2" fill="black" />
      <circle cx="34" cy="14" r="2" fill="black" />
      <circle cx="38" cy="24" r="2" fill="black" />
      <circle cx="34" cy="34" r="2" fill="black" />
      <circle cx="24" cy="38" r="2" fill="black" />
      <circle cx="14" cy="34" r="2" fill="black" />
      <circle cx="10" cy="24" r="2" fill="black" />
      <circle cx="14" cy="14" r="2" fill="black" />
    </svg>
  );
}