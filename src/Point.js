import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useMoving } from './hooks/MovingHook';

export default function Point({
  initialX = 0,
  initialY = 0,
  color = 'black',
  label = '',
  pointerX,
  pointerY,
  onChange,
}) {
  const elRef = useRef(null);
  const { moving } = useMoving(elRef.current);
  const [position, setPosition] = useState({
    x: initialX,
    y: initialY,
  });

  useEffect(() => {
    if (!moving) return;

    setPosition({
      x: pointerX - 5,
      y: pointerY - 5,
    });
  }, [pointerX, pointerY, moving]);

  useEffect(() => {
    onChange && onChange(position);
  }, [position]);
  return (
    <div
      ref={elRef}
      style={{
        position: 'absolute',
        backgroundColor: color,
        opacity: moving ? 0.5 : 1,
        borderRadius: '50%',
        transform: `translate(${position.x - 5}px , ${position.y - 5}px)`,
        left: -5,
        top: -5,
        width: 10,
        height: 10,
        cursor: 'pointer',
      }}
    >
      <span
        style={{
          position: 'relative',
          userSelect: 'none',
          left: 10,
          top: -15,
        }}
      >
        {label}
      </span>
    </div>
  );
}
