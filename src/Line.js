import React from 'react';
import { useState, useEffect } from 'react';

export default function Line({
  positionA = { x: 0, y: 0 },
  positionB = { x: 0, y: 0 },
}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const p1x = Math.min(positionA.x, positionB.x);
    const p1y = Math.min(positionA.y, positionB.y);
    const p2x = Math.max(positionA.x, positionB.x);
    const p2y = Math.max(positionA.y, positionB.y);
    const width = Math.max(p2x - p1x, 0.5);
    const height = Math.max(p2y - p1y, 0.5);
    const reverse =
      (positionA.x < positionB.x && positionA.y > positionB.y) ||
      (positionA.x > positionB.x && positionA.y < positionB.y);
    setData({
      p1x,
      p1y,
      width,
      height,
      reverse,
    });
  }, [positionA, positionB]);

  if (!data) {
    return <></>;
  }
  return (
    <div
      className={`line ${data.reverse ? 'reverse' : ''}`}
      style={{
        position: 'absolute',
        transform: `translate(${data.p1x - 5}px , ${data.p1y - 5}px)`,
        left: 0,
        top: 0,
        width: data.width,
        height: data.height,
      }}
    />
  );
}
