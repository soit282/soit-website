import { useState, useEffect, useRef } from 'react';

const Magnet = ({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.5s ease-in-out',
  wrapperClassName = '',
  innerClassName = '',
  parentHovered = false,
  ...props
}) => {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const magnetRef = useRef(null);

  // Use refs to access latest values in mousemove handler without re-creating listener
  const disabledRef = useRef(disabled);
  const parentHoveredRef = useRef(parentHovered);
  const magnetStrengthRef = useRef(magnetStrength);

  // Update refs when props change
  useEffect(() => {
    disabledRef.current = disabled;
    parentHoveredRef.current = parentHovered;
    magnetStrengthRef.current = magnetStrength;
  }, [disabled, parentHovered, magnetStrength]);

  // Reset position when disabled or parent not hovered
  useEffect(() => {
    if (disabled || !parentHovered) {
      setPosition({ x: 0, y: 0 });
      setIsActive(false);
    }
  }, [disabled, parentHovered]);

  // Single mousemove listener that never re-creates
  useEffect(() => {
    const handleMouseMove = e => {
      // Access latest values from refs
      if (disabledRef.current || !parentHoveredRef.current || !magnetRef.current) {
        return;
      }

      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      setIsActive(true);
      const offsetX = (e.clientX - centerX) / magnetStrengthRef.current;
      const offsetY = (e.clientY - centerY) / magnetStrengthRef.current;
      setPosition({ x: offsetX, y: offsetY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty deps - listener created once and never re-created

  const transitionStyle = isActive ? activeTransition : inactiveTransition;

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      style={{ position: 'relative', display: 'inline-block' }}
      {...props}
    >
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: transitionStyle,
          willChange: 'transform'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Magnet;
