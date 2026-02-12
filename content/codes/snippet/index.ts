export const reactTailwindcssHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

const betterNumberComponent = `"use client";

import { useEffect, useId } from "react";
import { MotionValue } from "motion";
import { motion, useSpring, useTransform } from "motion/react";
import useMeasure from "react-use-measure";

interface BetterNumberProps {
  value: number;
  padStart?: boolean;
}

export function BetterNumber({ value, padStart = false }: BetterNumberProps) {
  const valueDigits = \`$\{padStart && value < 10 ? "0" + value : value}\`.split(
    "",
  );
  const valuePlaces = valueDigits.map((_, i) =>
    Math.pow(10, valueDigits.length - i - 1),
  );
  return (
    <div>
      {valueDigits.map((digit, index) => (
        <Digit
          key={\`place-$\{valuePlaces[index]}\`}
          place={valuePlaces[index]}
          value={value}
        />
      ))}
    </div>
  );
}

export function Digit({ place, value }: { place: number; value: number }) {
  const [measureRef, { height }] = useMeasure();
  const valueRoundedToPlace = Math.floor(value / place);
  const animatedValue = useSpring(valueRoundedToPlace, {
    bounce: 0,
  });

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <span
      ref={measureRef}
      className="relative inline-block w-[1ch] overflow-x-visible overflow-y-clip leading-none tabular-nums text-3xl"
    >
      <span className="invisible">0</span>
      {[...Array(10).keys()].map((i) => (
        <Number
          key={i}
          motionValue={animatedValue}
          number={i}
          height={height}
        />
      ))}
    </span>
  );
}

interface NumberProps {
  motionValue: MotionValue;
  number: number;
  height: number;
}

export function Number({ motionValue, number, height }: NumberProps) {
  const uid = useId();
  const y = useTransform(motionValue, (latest) => {
    if (!height) {
      return 0;
    }

    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let translateY = offset * height;

    if (offset > 5) {
      translateY -= 10 * height;
    }

    return translateY;
  });

  if (!height) {
    return <span className="invisible absolute">{number}</span>;
  }

  return (
    <motion.span
      style={{ y }}
      layoutId={\`$\{uid}-$\{number}\`}
      className="absolute inset-0 flex items-center justify-center"
    >
      {number}
    </motion.span>
  );
}
`;
const betterNumberAppJs = `import { useState } from 'react';
import { BetterNumber } from './components/better-number';
import './App.css';

function App() {
  const [count, setCount] = useState(8);

  const handlePlus = () => {
    setCount(count + 1);
  };

  const handleMinus = () => {
    setCount(count - 1);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-gray-800 p-12 rounded-2xl w-full h-full flex flex-row justify-center items-center text-white">
        <button
          onClick={handlePlus}
          className="px-3 py-1 cursor-pointer bg-gray-800 hover:bg-gray-700 rounded transition-all"
        >
          +
        </button>
        <div className="flex space-x-3 overflow-hidden rounded px-2 leading-none ">
          <BetterNumber value={count} padStart />
        </div>
        <button
          onClick={handleMinus}
          className="px-3 py-1 cursor-pointer bg-gray-800 hover:bg-gray-700 rounded transition-all"
        >
          -
        </button>
      </div>
    </div>
  )
}

export default App;
`;

const betterNumberAppCss = `#root {
  
`;

export const betterNumber = {
  "/App.js": betterNumberAppJs,
  "/App.css": betterNumberAppCss,
  "/components/better-number.tsx": betterNumberComponent,
  "/public/index.html": reactTailwindcssHtml,
};
