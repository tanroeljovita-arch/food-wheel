"use client";

import { useEffect, useRef, useState } from "react";
import type { RestaurantItem } from "@/types/restaurant";

type FoodWheelProps = {
  items: RestaurantItem[];
  onSpinStart?: () => void;
  onWinnerSelected: (winner: RestaurantItem) => void;
  onSpinningChange?: (isSpinning: boolean) => void;
  spinRequestToken?: number;
};

const segmentColors = ["#f59e0b", "#84cc16", "#38bdf8", "#fb7185", "#a78bfa", "#2dd4bf"];
const SPIN_DURATION_MS = 4200;

function polarToCartesian(center: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;

  return {
    x: center + radius * Math.cos(angleInRadians),
    y: center + radius * Math.sin(angleInRadians),
  };
}

function describeSegment(startAngle: number, endAngle: number) {
  const center = 150;
  const radius = 145;
  const start = polarToCartesian(center, radius, endAngle);
  const end = polarToCartesian(center, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    `M ${center} ${center}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

function shortenLabel(name: string, itemCount: number) {
  const maxLength = itemCount > 16 ? 10 : itemCount > 10 ? 13 : 18;

  return name.length > maxLength ? `${name.slice(0, maxLength - 1).trim()}...` : name;
}

export function FoodWheel({
  items,
  onSpinStart,
  onWinnerSelected,
  onSpinningChange,
  spinRequestToken = 0,
}: FoodWheelProps) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [revealedWinner, setRevealedWinner] = useState<RestaurantItem | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSpinRequestRef = useRef(spinRequestToken);

  useEffect(() => {
    onSpinningChange?.(isSpinning);
  }, [isSpinning, onSpinningChange]);

  useEffect(() => {
    if (spinRequestToken === lastSpinRequestRef.current) {
      return;
    }

    lastSpinRequestRef.current = spinRequestToken;
    spin();
  }, [spinRequestToken]);

  function spin() {
    if (items.length === 0 || isSpinning) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const winnerIndex = Math.floor(Math.random() * items.length);
    const segmentSize = 360 / items.length;
    const segmentCenterAngle = winnerIndex * segmentSize + segmentSize / 2;
    const currentNormalizedRotation = ((rotation % 360) + 360) % 360;
    const targetNormalizedRotation = (360 - segmentCenterAngle) % 360;
    const additionalDegrees =
      1800 +
      ((targetNormalizedRotation - currentNormalizedRotation + 360) % 360);
    const nextRotation = rotation + additionalDegrees;

    setIsSpinning(true);
    onSpinStart?.();
    setRevealedWinner(null);
    setRotation(nextRotation);

    timeoutRef.current = setTimeout(() => {
      onWinnerSelected(items[winnerIndex]);
      setRevealedWinner(items[winnerIndex]);
      setIsSpinning(false);
    }, SPIN_DURATION_MS);
  }

  return (
    <section className="app-card h-fit overflow-hidden border-orange-100/85 bg-white/90">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">Decision time</p>
          <h2 className="section-heading mt-1">Spin the wheel</h2>
          <p className="mt-1 text-sm leading-6 text-stone-500">
            Let the wheel pick from your current options.
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800 ring-1 ring-amber-100">
          {items.length === 0 ? "No options" : items.length === 1 ? "1 option" : `${items.length} options`}
        </span>
      </div>

      <div className="mt-5 grid min-w-0 place-items-center gap-4">
        <div className="relative grid aspect-square w-full max-w-[min(20rem,calc(100vw-3rem))] place-items-center rounded-full border border-orange-100 bg-amber-50/70 p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.72)]">
          <div className="absolute -top-1 z-10 h-0 w-0 border-x-[14px] border-t-[28px] border-x-transparent border-t-amber-500 drop-shadow" />
          <svg
            aria-label="Food wheel"
            className="h-full w-full rounded-full border-8 border-white bg-stone-100 shadow-[0_20px_48px_rgba(120,53,15,0.16)] transition-transform duration-[4200ms] ease-[cubic-bezier(0.12,0.88,0.18,1)]"
            viewBox="0 0 300 300"
            role="img"
            style={{
              transform: `rotate(${rotation}deg)`,
            }}
          >
            {items.length === 0 ? (
              <circle cx="150" cy="150" fill="#e7e5e4" r="145" />
            ) : (
              items.map((item, index) => {
                const segmentSize = 360 / items.length;
                const startAngle = index * segmentSize;
                const endAngle = startAngle + segmentSize;
                const labelAngle = startAngle + segmentSize / 2;
                const labelRadius = items.length > 14 ? 96 : 106;
                const labelPoint = polarToCartesian(150, labelRadius, labelAngle);
                const labelRotation = labelAngle > 180 ? labelAngle + 90 : labelAngle - 90;
                const fontSize = items.length > 16 ? 8 : items.length > 10 ? 9 : 11;

                return (
                  <g key={item.id}>
                    <path
                      d={describeSegment(startAngle, endAngle)}
                      fill={segmentColors[index % segmentColors.length]}
                      stroke="rgba(255,255,255,0.76)"
                      strokeWidth="1"
                    />
                    <text
                      dominantBaseline="middle"
                      fill="#1c1917"
                      fontSize={fontSize}
                      fontWeight="700"
                      textAnchor="middle"
                      transform={`translate(${labelPoint.x} ${labelPoint.y}) rotate(${labelRotation})`}
                    >
                      {shortenLabel(item.name, items.length)}
                    </text>
                  </g>
                );
              })
            )}
          </svg>
          <div className="absolute grid h-20 w-20 place-items-center rounded-full border border-amber-100 bg-white px-3 text-center text-xs font-semibold text-stone-900 shadow-[0_14px_32px_rgba(120,53,15,0.16)] sm:h-24 sm:w-24 sm:text-sm">
            {items.length > 0 ? "Spin" : "Add options"}
          </div>
        </div>

        <button
          className="btn-accent w-full"
          disabled={items.length === 0 || isSpinning}
          onClick={spin}
          type="button"
        >
          {isSpinning ? "Spinning..." : "Spin"}
        </button>
        {revealedWinner ? (
          <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm font-semibold text-stone-900">
            Winner: {revealedWinner.name}
          </p>
        ) : null}
      </div>
    </section>
  );
}
