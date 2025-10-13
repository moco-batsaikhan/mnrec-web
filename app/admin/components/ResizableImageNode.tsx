import { NodeViewWrapper } from '@tiptap/react';
import { useEffect, useRef, useState } from 'react';

export default function ResizableImageNode({ node, updateAttributes, selected }: any) {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const startPos = useRef({ x: 0, y: 0, width: 0, height: 0 });

  const handleMouseDown = (e: React.MouseEvent, handle: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    setResizeHandle(handle);
    
    const img = imageRef.current;
    if (!img) return;
    
    const rect = img.getBoundingClientRect();
    startPos.current = {
      x: e.clientX,
      y: e.clientY,
      width: rect.width,
      height: rect.height,
    };
  };

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const img = imageRef.current;
      if (!img) return;

      const deltaX = e.clientX - startPos.current.x;
      const deltaY = e.clientY - startPos.current.y;
      
      let newWidth = startPos.current.width;
      let newHeight = startPos.current.height;
      
      // Aspect ratio preservation
      const aspectRatio = startPos.current.width / startPos.current.height;

      switch (resizeHandle) {
        // Corners - maintain aspect ratio
        case 'top-left':
          newWidth = startPos.current.width - deltaX;
          newHeight = newWidth / aspectRatio;
          break;
        case 'top-right':
          newWidth = startPos.current.width + deltaX;
          newHeight = newWidth / aspectRatio;
          break;
        case 'bottom-left':
          newWidth = startPos.current.width - deltaX;
          newHeight = newWidth / aspectRatio;
          break;
        case 'bottom-right':
          newWidth = startPos.current.width + deltaX;
          newHeight = newWidth / aspectRatio;
          break;
        
        // Edges - only width or height
        case 'top':
          newHeight = startPos.current.height - deltaY;
          break;
        case 'bottom':
          newHeight = startPos.current.height + deltaY;
          break;
        case 'left':
          newWidth = startPos.current.width - deltaX;
          break;
        case 'right':
          newWidth = startPos.current.width + deltaX;
          break;
      }

      // Minimum size constraints
      if (newWidth < 50) newWidth = 50;
      if (newHeight < 50) newHeight = 50;

      // Update attributes
      updateAttributes({
        width: Math.round(newWidth),
        height: resizeHandle?.includes('top') || resizeHandle?.includes('bottom') ? Math.round(newHeight) : null,
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeHandle(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, resizeHandle, updateAttributes]);

  const imageStyle: React.CSSProperties = {
    width: node.attrs.width ? `${node.attrs.width}px` : 'auto',
    height: node.attrs.height ? `${node.attrs.height}px` : 'auto',
    maxWidth: '100%',
  };

  return (
    <NodeViewWrapper className="resizable-image-wrapper" style={{ display: 'inline-block', position: 'relative' }}>
      <div className={`image-container ${selected ? 'selected' : ''}`} style={{ position: 'relative', display: 'inline-block' }}>
        <img
          ref={imageRef}
          src={node.attrs.src}
          alt={node.attrs.alt || ''}
          style={imageStyle}
          draggable={false}
        />
        
        {selected && (
          <>
            {/* Corner handles */}
            <div
              className="resize-handle top-left"
              onMouseDown={(e) => handleMouseDown(e, 'top-left')}
              style={{
                position: 'absolute',
                top: '-6px',
                left: '-6px',
                width: '12px',
                height: '12px',
                background: '#3b82f6',
                border: '2px solid white',
                borderRadius: '50%',
                cursor: 'nw-resize',
                zIndex: 10,
              }}
            />
            <div
              className="resize-handle top-right"
              onMouseDown={(e) => handleMouseDown(e, 'top-right')}
              style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                width: '12px',
                height: '12px',
                background: '#3b82f6',
                border: '2px solid white',
                borderRadius: '50%',
                cursor: 'ne-resize',
                zIndex: 10,
              }}
            />
            <div
              className="resize-handle bottom-left"
              onMouseDown={(e) => handleMouseDown(e, 'bottom-left')}
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: '-6px',
                width: '12px',
                height: '12px',
                background: '#3b82f6',
                border: '2px solid white',
                borderRadius: '50%',
                cursor: 'sw-resize',
                zIndex: 10,
              }}
            />
            <div
              className="resize-handle bottom-right"
              onMouseDown={(e) => handleMouseDown(e, 'bottom-right')}
              style={{
                position: 'absolute',
                bottom: '-6px',
                right: '-6px',
                width: '12px',
                height: '12px',
                background: '#3b82f6',
                border: '2px solid white',
                borderRadius: '50%',
                cursor: 'se-resize',
                zIndex: 10,
              }}
            />

            {/* Edge handles */}
            <div
              className="resize-handle top"
              onMouseDown={(e) => handleMouseDown(e, 'top')}
              style={{
                position: 'absolute',
                top: '-6px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '12px',
                height: '12px',
                background: '#3b82f6',
                border: '2px solid white',
                borderRadius: '50%',
                cursor: 'n-resize',
                zIndex: 10,
              }}
            />
            <div
              className="resize-handle bottom"
              onMouseDown={(e) => handleMouseDown(e, 'bottom')}
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '12px',
                height: '12px',
                background: '#3b82f6',
                border: '2px solid white',
                borderRadius: '50%',
                cursor: 's-resize',
                zIndex: 10,
              }}
            />
            <div
              className="resize-handle left"
              onMouseDown={(e) => handleMouseDown(e, 'left')}
              style={{
                position: 'absolute',
                left: '-6px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '12px',
                height: '12px',
                background: '#3b82f6',
                border: '2px solid white',
                borderRadius: '50%',
                cursor: 'w-resize',
                zIndex: 10,
              }}
            />
            <div
              className="resize-handle right"
              onMouseDown={(e) => handleMouseDown(e, 'right')}
              style={{
                position: 'absolute',
                right: '-6px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '12px',
                height: '12px',
                background: '#3b82f6',
                border: '2px solid white',
                borderRadius: '50%',
                cursor: 'e-resize',
                zIndex: 10,
              }}
            />
          </>
        )}
      </div>
      
      <style jsx>{`
        .image-container.selected img {
          outline: 3px solid #3b82f6;
          outline-offset: 2px;
        }
        
        .resize-handle {
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .resize-handle:hover {
          background: #2563eb !important;
          transform: scale(1.2);
        }
      `}</style>
    </NodeViewWrapper>
  );
}
