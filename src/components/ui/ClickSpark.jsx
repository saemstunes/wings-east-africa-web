import { useRef, useEffect, useCallback, useState } from "react";

const ClickSpark = ({
  sparkColor = "#fff",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1.0,
  children
}) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const startTimeRef = useRef(null);

  // Desktop detection
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Canvas resizing
  useEffect(() => {
    if (!isDesktop || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    if (!parent) return;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(resizeCanvas);
    });
    
    ro.observe(parent);
    resizeCanvas();
    
    return () => ro.disconnect();
  }, [isDesktop]);

  // Animation easing
  const easeFunc = useCallback((t) => {
    switch (easing) {
      case "linear": return t;
      case "ease-in": return t * t;
      case "ease-in-out": return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      default: return t * (2 - t); // ease-out
    }
  }, [easing]);

  // Drawing animation
  useEffect(() => {
    if (!isDesktop || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    const draw = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter(spark => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const eased = easeFunc(progress);
        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = x1 + lineLength * Math.cos(spark.angle);
        const y2 = y1 + lineLength * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale, isDesktop]);

  // Click handler
  const handleClick = (e) => {
    if (!isDesktop || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: performance.now()
    }));

    sparksRef.current.push(...newSparks);
  };

  return (
    <div 
      className="click-spark-wrapper"
      onClick={isDesktop ? handleClick : undefined}
      style={{
        position: 'relative',
        display: 'inline-block',
        width: '100%',
        height: '100%'
      }}
    >
      {isDesktop && (
        <canvas
          ref={canvasRef}
          className="click-spark-canvas"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 5
          }}
        />
      )}
      {children}
    </div>
  );
};

export default ClickSpark;
