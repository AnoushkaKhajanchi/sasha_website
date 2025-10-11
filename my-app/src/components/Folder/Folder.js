import { useState } from 'react';
import './Folder.css';

const darkenColor = (hex, percent) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color.split('').map(c => c + c).join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return (
    '#' +
    ((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)
      .toUpperCase()
  );
};

/**
 * Props
 * - color: string hex
 * - size: number scale
 * - items: array of React nodes for the 3 papers
 * - className: string
 * - scrollTargets: (string | Element | null)[]  // NEW — selector, id, or Element
 * - scrollOffset: number                         // NEW — px to offset (sticky headers)
 */
const Folder = ({
  color = '#5227FF',
  size = 1,
  items = [],
  className = '',
  scrollTargets = [],
  scrollOffset = 0
}) => {
  const maxItems = 3;
  const papers = Array.from({ length: maxItems }, (_, i) => items[i] ?? null);

  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
  );

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor('#ffffff', 0.1);
  const paper2 = darkenColor('#ffffff', 0.05);
  const paper3 = '#ffffff';

  const handleClickFolder = () => {
    setOpen(prev => !prev);
    if (open) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperMouseMove = (e, index) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets(prev => {
      const next = [...prev];
      next[index] = { x: offsetX, y: offsetY };
      return next;
    });
  };

  const handlePaperMouseLeave = (_, index) => {
    setPaperOffsets(prev => {
      const next = [...prev];
      next[index] = { x: 0, y: 0 };
      return next;
    });
  };

  // ---- NEW: scrolling helper
  const resolveTargetElement = target => {
    if (!target) return null;
    if (target instanceof Element) return target;

    // String: try as selector first, then as id
    if (typeof target === 'string') {
      const asSelector = document.querySelector(target);
      if (asSelector) return asSelector;
      const asId = document.getElementById(
        target.startsWith('#') ? target.slice(1) : target
      );
      if (asId) return asId;
    }
    return null;
  };

  const scrollToTarget = target => {
    const el = resolveTargetElement(target);
    if (!el) return;

    // If no offset needed, native smooth scroll is cleanest.
    if (!scrollOffset) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    // Manual smooth scroll with offset (sticky header, etc.)
    const rect = el.getBoundingClientRect();
    const absoluteTop = window.pageYOffset + rect.top - scrollOffset;
    window.scrollTo({ top: absoluteTop, behavior: 'smooth' });
  };

  const handlePaperClick = (e, index) => {
    // Do not toggle folder when clicking a paper
    e.stopPropagation();

    const target = scrollTargets[index];
    if (target) {
      scrollToTarget(target);
    } else {
      // No target provided — optional: open the folder instead
      setOpen(true);
    }
  };
  // ---- end NEW

  const folderStyle = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
    '--paper-1': paper1,
    '--paper-2': paper2,
    '--paper-3': paper3
  };

  const folderClassName = `folder ${open ? 'open' : ''}`.trim();
  const scaleStyle = { transform: `scale(${size})`, transformOrigin: 'top left' };

  return (
    <div style={scaleStyle} className={className}>
      <div
        className={folderClassName}
        style={folderStyle}
        onClick={handleClickFolder}
        role="button"
        aria-expanded={open}
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClickFolder();
          }
        }}
      >
        <div className="folder__back">
          {papers.map((item, i) => (
            <div
              key={i}
              className={`paper paper-${i + 1}`}
              onClick={e => handlePaperClick(e, i)}             
              onMouseMove={e => handlePaperMouseMove(e, i)}
              onMouseLeave={e => handlePaperMouseLeave(e, i)}
              style={
                open
                  ? {
                      '--magnet-x': `${paperOffsets[i]?.x || 0}px`,
                      '--magnet-y': `${paperOffsets[i]?.y || 0}px`,
                      cursor: scrollTargets[i] ? 'pointer' : 'default'        // NEW
                    }
                  : { cursor: scrollTargets[i] ? 'pointer' : 'default' }      // NEW
              }
            >
              {item}
            </div>
          ))}
          <div className="folder__front"></div>
          <div className="folder__front right"></div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
