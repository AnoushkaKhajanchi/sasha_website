// import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
// import { gsap } from 'gsap';

// const useMedia = (queries, values, defaultValue) => {
//   const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
//   const [value, setValue] = useState(get);
//   useEffect(() => {
//     const handler = () => setValue(get);
//     queries.forEach(q => matchMedia(q).addEventListener('change', handler));
//     return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [queries]);
//   return value;
// };

// const useMeasure = () => {
//   const ref = useRef(null);
//   const [size, setSize] = useState({ width: 0, height: 0 });
//   useLayoutEffect(() => {
//     if (!ref.current) return;
//     const ro = new ResizeObserver(([entry]) => {
//       const { width, height } = entry.contentRect;
//       setSize({ width, height });
//     });
//     ro.observe(ref.current);
//     return () => ro.disconnect();
//   }, []);
//   return [ref, size];
// };

// const preloadImages = async urls => {
//   await Promise.all(
//     urls.map(
//       src =>
//         new Promise(resolve => {
//           const img = new Image();
//           img.src = src;
//           img.onload = img.onerror = () => resolve();
//         })
//     )
//   );
// };

// export default function Masonry({
//   items,
//   ease = 'power3.out',
//   duration = 0.6,
//   stagger = 0.05,
//   animateFrom = 'bottom',
//   scaleOnHover = true,
//   hoverScale = 0.95,
//   blurToFocus = true,
//   colorShiftOnHover = false
// }) {
//   const columns = useMedia(
//     ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
//     [5, 4, 3, 2],
//     1
//   );

//   const [containerRef, { width }] = useMeasure();
//   const [imagesReady, setImagesReady] = useState(false);

//   const getInitialPosition = item => {
//     const containerRect = containerRef.current?.getBoundingClientRect();
//     if (!containerRect) return { x: item.x, y: item.y };

//     let direction = animateFrom;
//     if (animateFrom === 'random') {
//       const directions = ['top', 'bottom', 'left', 'right'];
//       direction = directions[Math.floor(Math.random() * directions.length)];
//     }

//     switch (direction) {
//       case 'top':
//         return { x: item.x, y: -200 };
//       case 'bottom':
//         return { x: item.x, y: window.innerHeight + 200 };
//       case 'left':
//         return { x: -200, y: item.y };
//       case 'right':
//         return { x: window.innerWidth + 200, y: item.y };
//       case 'center':
//         return {
//           x: containerRect.width / 2 - item.w / 2,
//           y: containerRect.height / 2 - item.h / 2
//         };
//       default:
//         return { x: item.x, y: item.y + 100 };
//     }
//   };

//   useEffect(() => {
//     preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
//   }, [items]);

//   const grid = useMemo(() => {
//     if (!width) return [];
//     const colHeights = new Array(columns).fill(0);
//     const columnWidth = width / columns;

//     return items.map(child => {
//       const col = colHeights.indexOf(Math.min(...colHeights));
//       const x = columnWidth * col;
//       const height = child.height / 2; // keeping your original heuristic
//       const y = colHeights[col];
//       colHeights[col] += height;
//       return { ...child, x, y, w: columnWidth, h: height };
//     });
//   }, [columns, items, width]);

//   const hasMounted = useRef(false);

//   // Animate items into place
//   useLayoutEffect(() => {
//     if (!imagesReady) return;

//     grid.forEach((item, index) => {
//       const selector = `[data-key="${item.id}"]`;
//       const animationProps = {
//         x: item.x,
//         y: item.y,
//         width: item.w,
//         height: item.h
//       };

//       if (!hasMounted.current) {
//         const initialPos = getInitialPosition(item, index);
//         const initialState = {
//           opacity: 0,
//           x: initialPos.x,
//           y: initialPos.y,
//           width: item.w,
//           height: item.h,
//           ...(blurToFocus && { filter: 'blur(10px)' })
//         };

//         gsap.fromTo(selector, initialState, {
//           opacity: 1,
//           ...animationProps,
//           ...(blurToFocus && { filter: 'blur(0px)' }),
//           duration: 0.8,
//           ease: 'power3.out',
//           delay: index * stagger
//         });
//       } else {
//         gsap.to(selector, {
//           ...animationProps,
//           duration,
//           ease,
//           overwrite: 'auto'
//         });
//       }
//     });

//     hasMounted.current = true;
//   }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

//   // Ensure the container height wraps absolutely-positioned children
//   useLayoutEffect(() => {
//     if (!containerRef.current) return;
//     const totalHeight =
//       grid.length > 0 ? Math.max(...grid.map(it => it.y + it.h)) : 0;
//     containerRef.current.style.height = `${totalHeight}px`;
//   }, [grid, containerRef]);

//   const handleMouseEnter = (e, item) => {
//     const element = e.currentTarget;
//     const selector = `[data-key="${item.id}"]`;

//     if (scaleOnHover) {
//       gsap.to(selector, { scale: hoverScale, duration: 0.3, ease: 'power2.out' });
//     }

//     if (colorShiftOnHover) {
//       const overlay = element.querySelector('.color-overlay');
//       if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
//     }
//   };

//   const handleMouseLeave = (e, item) => {
//     const element = e.currentTarget;
//     const selector = `[data-key="${item.id}"]`;

//     if (scaleOnHover) {
//       gsap.to(selector, { scale: 1, duration: 0.3, ease: 'power2.out' });
//     }

//     if (colorShiftOnHover) {
//       const overlay = element.querySelector('.color-overlay');
//       if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
//     }
//   };

//   return (
//     <div ref={containerRef} className="masonry-list" style={{ position: 'relative', width: '100%' }}>
//       {/* Inline styles replacing Masonry.css */}
//       <style>{`
//         .masonry-list {
//           box-sizing: border-box;
//         }
//         .item-wrapper {
//           position: absolute;
//           box-sizing: border-box;
//           cursor: pointer;
//           transform-origin: center center;
//           padding: 6px;
//         }
//         .item-img {
//           position: absolute;
//           inset: 6px;
//           background-size: cover;
//           background-position: center;
//           background-repeat: no-repeat;
//           border-radius: 8px;
//           overflow: hidden;
//           box-shadow: 0 6px 24px rgba(0,0,0,0.1);
//         }
//         .item-wrapper:focus-visible .item-img {
//           outline: 2px solid #3b82f6; /* focus ring */
//           outline-offset: 2px;
//         }
//       `}</style>

//       {grid.map(item => (
//         <div
//           key={item.id}
//           data-key={item.id}
//           className="item-wrapper"
//           onClick={() => window.open(item.url, '_blank', 'noopener')}
//           onMouseEnter={e => handleMouseEnter(e, item)}
//           onMouseLeave={e => handleMouseLeave(e, item)}
//         >
//           <div className="item-img" style={{ backgroundImage: `url(${item.img})` }}>
//             {colorShiftOnHover && (
//               <div
//                 className="color-overlay"
//                 style={{
//                   position: 'absolute',
//                   inset: 0,
//                   background:
//                     'linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))',
//                   opacity: 0,
//                   pointerEvents: 'none',
//                   borderRadius: '8px'
//                 }}
//               />
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

const useMedia = (queries, values, defaultValue) => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState(get);
  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);
  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, size];
};

const preloadImages = async urls => {
  await Promise.all(
    urls.map(
      src =>
        new Promise(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

export default function Masonry({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false
}) {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    const urls = items.filter(i => i.img).map(i => i.img);
    if (urls.length === 0) {
      setImagesReady(true);
      return;
    }
    preloadImages(urls).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;

      // use provided height (required for now)
      const height = Number(child.height ?? child.h ?? 300);
      const y = colHeights[col];
      colHeights[col] += height;

      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  const getInitialPosition = item => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x: item.x, y: item.y };
    let direction = animateFrom;
    if (animateFrom === 'random') {
      const dirs = ['top', 'bottom', 'left', 'right'];
      direction = dirs[Math.floor(Math.random() * dirs.length)];
    }
    switch (direction) {
      case 'top': return { x: item.x, y: -200 };
      case 'bottom': return { x: item.x, y: window.innerHeight + 200 };
      case 'left': return { x: -200, y: item.y };
      case 'right': return { x: window.innerWidth + 200, y: item.y };
      case 'center': return { x: rect.width / 2 - item.w / 2, y: rect.height / 2 - item.h / 2 };
      default: return { x: item.x, y: item.y + 100 };
    }
  };

  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item);
        const initialState = {
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: 'blur(10px)' })
        };
        gsap.fromTo(selector, initialState, {
          opacity: 1,
          ...animProps,
          ...(blurToFocus && { filter: 'blur(0px)' }),
          duration: 0.8,
          ease: 'power3.out',
          delay: index * stagger
        });
      } else {
        gsap.to(selector, { ...animProps, duration, ease, overwrite: 'auto' });
      }
    });

    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const total = grid.length ? Math.max(...grid.map(it => it.y + it.h)) : 0;
    containerRef.current.style.height = `${total}px`;
  }, [grid]);

  const onEnter = (e, item) => {
    const selector = `[data-key="${item.id}"]`;
    if (scaleOnHover) gsap.to(selector, { scale: hoverScale, duration: 0.3, ease: 'power2.out' });
    if (colorShiftOnHover && item.img) {
      const overlay = e.currentTarget.querySelector('.color-overlay');
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
    }
  };
  const onLeave = (e, item) => {
    const selector = `[data-key="${item.id}"]`;
    if (scaleOnHover) gsap.to(selector, { scale: 1, duration: 0.3, ease: 'power2.out' });
    if (colorShiftOnHover && item.img) {
      const overlay = e.currentTarget.querySelector('.color-overlay');
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };

  return (
    <div ref={containerRef} className="masonry-list" style={{ position: 'relative', width: '100%' }}>
      <style>{`
        .masonry-list { box-sizing: border-box; }
        .item-wrapper {
          position: absolute; box-sizing: border-box; cursor: ${items.some(i => i.url) ? 'pointer' : 'default'};
          transform-origin: center center; padding: 6px;
        }
        .item-frame {
          position: absolute; inset: 6px; border-radius: 8px; overflow: hidden; box-shadow: 0 6px 24px rgba(0,0,0,0.1);
          display: flex; flex-direction: column;
          background: #fff; color: #111;
        }
        .item-img {
          position: absolute; inset: 6px; background-size: cover; background-position: center; background-repeat: no-repeat;
          border-radius: 8px; overflow: hidden; box-shadow: 0 6px 24px rgba(0,0,0,0.1);
        }
      `}</style>

      {grid.map(item => {
        const handleClick = () => { if (item.url) window.open(item.url, '_blank', 'noopener'); };

        return (
          <div
            key={item.id}
            data-key={item.id}
            className="item-wrapper"
            onClick={handleClick}
            onMouseEnter={e => onEnter(e, item)}
            onMouseLeave={e => onLeave(e, item)}
            role={item.url ? 'link' : 'group'}
          >
            {item.render ? (
              <div className="item-frame" style={item.frameStyle}>
                {typeof item.render === 'function' ? item.render(item) : item.render}
              </div>
            ) : (
              <div className="item-img" style={{ backgroundImage: `url(${item.img})` }}>
                {colorShiftOnHover && (
                  <div
                    className="color-overlay"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))',
                      opacity: 0,
                      pointerEvents: 'none',
                      borderRadius: '8px'
                    }}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

