"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";

let images = [
  { id: 1, src: "/images/1.jpeg" },
  { id: 2, src: "/images/2.jpeg" },
  { id: 3, src: "/images/3.jpeg" },
  { id: 4, src: "/images/4.jpeg" },
  { id: 5, src: "/images/5.jpeg" },
  { id: 6, src: "/images/6.jpeg" },
  { id: 7, src: "/images/7.jpeg" },
  { id: 8, src: "/images/8.jpeg" },
  { id: 9, src: "/images/9.jpeg" },
  { id: 10, src: "/images/10.jpeg" },
  { id: 11, src: "/images/11.jpeg" },
  { id: 12, src: "/images/12.jpeg" },
  { id: 13, src: "/images/13.jpeg" },
];

export default function Home() {
  let [activeIndex, setActiveIndex] = useState(0);
  let [activeSlot, setActiveSlot] = useState(activeIndex);

  let activeIndexes: number[] = [];
  if (activeSlot === 0) {
    activeIndexes = [activeIndex, activeIndex + 1, activeIndex + 2];
  } else if (activeSlot === 1) {
    activeIndexes = [activeIndex - 1, activeIndex, activeIndex + 1];
  } else if (activeSlot === 2) {
    activeIndexes = [activeIndex - 2, activeIndex - 1, activeIndex];
  }

  let offset = activeIndex - activeSlot;

  return (
    <div>
      <div className="flex items-center gap-2">
        <button
          className="size-10 flex text-gray-500 hover:text-white items-center justify-center"
          onClick={() => {
            if (activeIndex > 0) {
              setActiveIndex(activeIndex - 1);
              if (activeSlot > 0) {
                setActiveSlot(activeSlot - 1);
              }
            }
          }}
        >
          <ChevronLeftIcon className="size-6" />
        </button>
        <div className="h-80 aspect-[2.3] overflow-hidden">
          <div
            className="flex transition-[translate] h-full duration-500"
            style={{ translate: `-${activeIndex * 100}%` }}
          >
            {images.map((image) => (
              <div key={image.id} className="relative w-full shrink-0">
                <Image src={image.src} fill className="object-cover" alt="" />
              </div>
            ))}
          </div>
        </div>

        <button
          className="size-10 flex text-gray-500 hover:text-white items-center justify-center"
          onClick={() => {
            if (activeIndex < images.length - 1) {
              setActiveIndex(activeIndex + 1);
              if (activeSlot < 2) {
                setActiveSlot(activeSlot + 1);
              }
            }
          }}
        >
          <ChevronRightIcon className="size-6" />
        </button>
      </div>

      <div className="flex justify-center">
        <div
          className="mt-8 flex transition-[translate] duration-300 delay-75"
          style={{
            width: DOT_SIZE,
            height: DOT_SIZE,
            gap: DOT_GAP,
            translate: `${-(DOT_SIZE + DOT_GAP) * (offset + 1)}px`,
          }}
        >
          {images.map((image, index) => (
            <Dot
              key={image.id}
              index={index}
              activeIndex={activeIndex}
              activeIndexes={activeIndexes}
            />
          ))}
        </div>
      </div>

      {/* <div className="mt-8">
        <p>offset: {offset}</p>
        <p>length: {images.length}</p>
        <p>activeIndex: {activeIndex}</p>
        <p>activeSlot: {activeSlot}</p>
      </div> */}
    </div>
  );
}

const DOT_SIZE = 8;
const DOT_GAP = 8;

function Dot({
  index,
  activeIndex,
  activeIndexes,
}: {
  index: number;
  activeIndex: number;
  activeIndexes: number[];
}) {
  let scale = 0;

  if (activeIndexes.includes(index)) {
    scale = 1;
  } else if (activeIndexes[0] - index === 1 || index - activeIndexes[2] === 1) {
    scale = 0.66;
  } else if (activeIndexes[0] - index === 2 || index - activeIndexes[2] === 2) {
    scale = 0.33;
  } else {
    scale = 0;
  }

  return (
    <div
      className={`shrink-0 rounded-full transition-[scale] duration-300 delay-75 ${index === activeIndex ? "bg-sky-500" : "bg-gray-700"}`}
      style={{
        scale,
        width: DOT_SIZE,
        height: DOT_SIZE,
      }}
    />
  );
}
