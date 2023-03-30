import { useMemo } from 'react';

export default function LoadingSpinner({ color, size }) {
  const dimension = useMemo(() => {
    if (size === 'SMALL') return 20;
    if (size === 'MEDIUM') return 40;
    if (size === 'LARGE') return 60;
    return 40;
  }, [size]);

  const stroke = useMemo(() => {
    if (color === 'WHITE') return '#fff';
    if (color === 'BLACK') return '#000';
    return '#1d4ed8';
  }, [color]);

  console.log(stroke);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimension}
      height={dimension}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke={stroke}
        stroke-width="12"
        r="35"
        stroke-dasharray="164.93361431346415 56.97787143782138"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        ></animateTransform>
      </circle>
    </svg>
  );
}
