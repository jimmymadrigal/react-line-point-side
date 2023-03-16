import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './style.css';
import Point from './Point';
import Line from './Line';
import { useMoving } from './hooks/MovingHook';

export default function App() {
  const elRef = useRef(null);
  const { moving } = useMoving(elRef.current);

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const [aPosition, setAPosition] = useState({
    x: 0,
    y: 0,
  });
  const [bPosition, setBPosition] = useState({
    x: 0,
    y: 0,
  });
  const [cPosition, setCPosition] = useState({
    x: 0,
    y: 0,
  });
  const [clockwise, setClockwise] = useState(true);

  const onPointerMove = (e) => {
    if (!moving) return;

    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  useEffect(() => {
    const ax = aPosition.x;
    const ay = aPosition.y;
    const bx = bPosition.x;
    const by = bPosition.y;
    const cx = cPosition.x;
    const cy = cPosition.y;
    const cw = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax) > 0;
    setClockwise(cw);
  }, [aPosition, bPosition, cPosition]);

  return (
    <div
      ref={elRef}
      onMouseDown={onPointerMove}
      onPointerMove={onPointerMove}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Point
        pointerX={position.x}
        pointerY={position.y}
        label="A"
        initialX={100}
        initialY={50}
        onChange={(p) => setAPosition(p)}
      />
      <Point
        pointerX={position.x}
        pointerY={position.y}
        label="B"
        initialX={200}
        initialY={50}
        onChange={(p) => setBPosition(p)}
      />
      <Point
        pointerX={position.x}
        pointerY={position.y}
        label="C"
        initialX={150}
        initialY={70}
        onChange={(p) => setCPosition(p)}
        color={clockwise ? 'green' : 'red'}
      />
      <Line positionA={aPosition} positionB={bPosition} />
    </div>
  );
}
