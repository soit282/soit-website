import { useState, useEffect, useRef } from 'react';
import './Section4.css';

export default function Section4() {
  const [mouseY, setMouseY] = useState(50);
  const sectionRef = useRef(null);
  const lastMouseY = useRef(0);

  const updatePosition = () => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const y = ((lastMouseY.current - rect.top) / rect.height) * 100;
      setMouseY(y);
    }
  };

  const handleMouseMove = (e) => {
    lastMouseY.current = e.clientY;
    const rect = e.currentTarget.getBoundingClientRect();
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouseY(y);
  };

  useEffect(() => {
    const handleScroll = () => {
      updatePosition();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="section4"
      style={{
        backgroundImage: `url('/1_Homepage/1_Homepage/2_Feature works/TraMADE_18_Packaging.jpg')`
      }}
      onMouseMove={handleMouseMove}
    >
      <div 
        className="section4-content text-8"
        style={{
          position: 'absolute',
          top: `${mouseY}%`,
          transform: 'translateY(-50%)',
          left: 0,
          right: 0,
          padding: '0 1.25%'
        }}
      >
        <div className="text-left">
          <p>TràMADE</p>
        </div>
        <div className="text-center">
          <p>Tea mastery born in the heights of Mảng Đen</p>
        </div>
        <div className="text-right">
          <p>Branding</p>
        </div>
      </div>
    </div>
  );
}