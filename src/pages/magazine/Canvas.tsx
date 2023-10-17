import { useRef, useEffect } from 'react';

const Canvas = (props: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;

    const img = new Image();
    img.onload = () => {
      const targetWidth = 300;
      const targetHeight = 300;

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      context.drawImage(img, 0, 0, targetWidth, targetHeight);
    };
  }, []);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
