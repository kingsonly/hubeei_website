"use client"
import ReactCardFlip from "react-card-flip";
export default function FlipCard({ children ,isFlipped}) {
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      {children}
    </ReactCardFlip>
  );
}
