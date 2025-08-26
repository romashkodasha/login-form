import React, { useEffect, useRef } from 'react';
import imageSrc from 'assets/cat.png';

const FlyingAlien: React.FC = () => {
  const alienRef = useRef<HTMLImageElement>(null);
  const position = useRef({ x: 100, y: 100 });
  const velocity = useRef({
    vx: 2 + Math.random() * 3,
    vy: 2 + Math.random() * 3,
  });
  const size = { width: 100, height: 100 };

  useEffect(() => {
    const handleAnimation = () => {
      if (!alienRef.current) return;

      const alien = alienRef.current;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      let { x, y } = position.current;
      let { vx, vy } = velocity.current;

      if (x + size.width >= screenWidth || x <= 0) vx = -vx;
      if (y + size.height >= screenHeight || y <= 0) vy = -vy;

      x += vx;
      y += vy;

      position.current = { x, y };
      velocity.current = { vx, vy };

      alien.style.transform = `translate(${x}px, ${y}px)`;

      requestAnimationFrame(handleAnimation);
    };

    const animationId = requestAnimationFrame(handleAnimation);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <img
      ref={alienRef}
      src={imageSrc}
      alt="alien"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: size.height,
        pointerEvents: 'none',
        transform: `translate(${position.current.x}px, ${position.current.y}px)`,
      }}
    />
  );
};

export default FlyingAlien;
