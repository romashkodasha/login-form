import React, { useEffect, useRef } from 'react';
import imageSrc from 'assets/cat.png';

const VELOCITY = 4;

const FlyingAlien: React.FC = () => {
  const alienRef = useRef<HTMLImageElement>(null);
  const position = useRef({ x: 100, y: 100 });
  const velocity = useRef({ vx: VELOCITY, vy: VELOCITY });
  const size = { width: 100, height: 100 };
  const [isLoaded, setIsLoaded] = React.useState(true);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      let { x, y } = position.current;

      if (x + size.width > screenWidth) {
        x = screenWidth - size.width;
      }
      if (y + size.height > screenHeight) {
        y = screenHeight - size.height;
      }

      position.current = { x, y };

      if (alienRef.current) {
        alienRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleAnimation = () => {
      if (!alienRef.current) return;

      const alien = alienRef.current;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      let { x, y } = position.current;
      let { vx, vy } = velocity.current;

      if (x + size.width >= screenWidth || x <= 0) {
        vx = -vx;
      }
      if (y + size.height >= screenHeight || y <= 0) {
        vy = -vy;
      }

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

  if (!isLoaded) return null;

  return (
    <img
      ref={alienRef}
      src={imageSrc}
      alt="alien"
      onError={() => setIsLoaded(false)}
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
