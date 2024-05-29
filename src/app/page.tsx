"use client";

import Image from "next/image";
import { useState } from "react";

let images = [
  { id: 1, className: "bg-green-500" },
  { id: 2, className: "bg-blue-500" },
  { id: 3, className: "bg-red-500" },
  { id: 4, className: "bg-orange-500" },
  { id: 5, className: "bg-purple-500" },
  { id: 6, className: "bg-green-500" },
  { id: 7, className: "bg-blue-500" },
  { id: 8, className: "bg-red-500" },
];

export default function Home() {
  let [activeIndex, setActiveIndex] = useState(0);
  let [activeSlot, setActiveSlot] = useState(activeIndex);

  return (
    <div>
      <div className="flex items-center">
        <button
          className="size-10"
          onClick={() => {
            setActiveIndex(activeIndex - 1);
            if (activeSlot > 0) {
              setActiveSlot(activeSlot - 1);
            }
          }}
        >
          &lt;
        </button>
        <div className="size-40 ring-2 ring-red-500 overflow-hidden">
          <div
            className="flex h-40 relative transition-[translate]"
            style={{ translate: `-${activeIndex * 100}%` }}
          >
            {images.map((image) => (
              <div
                key={image.id}
                className={`h-full aspect-square ${image.className}`}
              />
            ))}
          </div>
        </div>

        <button
          className="size-10"
          onClick={() => {
            setActiveIndex(activeIndex + 1);
            if (activeSlot < 2) {
              setActiveSlot(activeSlot + 1);
            }
          }}
        >
          &gt;
        </button>
      </div>

      <div className="mt-8 flex justify-center gap-1">
        {images.map((image, index) => (
          <Dot
            key={image.id}
            image={image}
            index={index}
            activeIndex={activeIndex}
            activeSlot={activeSlot}
          />
        ))}
      </div>

      <div className="mt-8">
        <p>length: {images.length}</p>
        <p>activeIndex: {activeIndex}</p>
        <p>activeSlot: {activeSlot}</p>
      </div>
    </div>
  );
}

function Dot({ image, index, activeIndex, activeSlot }) {
  let scale = 0.25;

  if (activeSlot === 0) {
    if (index - activeIndex > -1 && index - activeIndex < 3) {
      scale = 1;
    } else if (activeIndex - index === 1) {
      scale = 0.75;
    } else if (index - activeIndex === 3) {
      scale = 0.75;
    }
  } else if (activeSlot === 1) {
    if (Math.abs(index - activeIndex) < 2) {
      scale = 1;
    } else if (Math.abs(activeIndex - index) === 2) {
      scale = 0.75;
    }
  } else if (activeSlot === 2) {
    if (activeIndex - index < 3 && activeIndex - index > -1) {
      scale = 1;
    } else if (index - activeIndex === 1) {
      scale = 0.75;
    } else if (activeIndex - index === 3) {
      scale = 0.75;
    }
  }

  return (
    <div
      className={`size-5 rounded-full transition-[scale] ${index === activeIndex ? "bg-blue-500" : "bg-gray-500"}`}
      style={{
        scale,
      }}
    />
  );
}
