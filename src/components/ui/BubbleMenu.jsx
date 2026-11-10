'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';

import './BubbleMenu.css';

const DEFAULT_ITEMS = [
  {
    label: 'Home',
    href: '/',
    ariaLabel: 'Home',
    rotation: -6,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'Wa',
    href: 'https://wa.me/6281257591101',
    target: '_blank',
    ariaLabel: 'WhatsApp',
    rotation: 6,
    hoverStyles: { bgColor: '#22c55e', textColor: '#ffffff' }
  },
  {
    label: 'Ig',
    href: 'https://www.instagram.com/kenaltaher',
    target: '_blank',
    ariaLabel: 'Instagram',
    rotation: -5,
    hoverStyles: { bgColor: '#ec4899', textColor: '#ffffff' }
  },
  {
    label: 'Project',
    href: '/#work',
    ariaLabel: 'Project',
    rotation: 6,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
  },
  {
    label: 'Gmail',
    href: 'mailto:taherdaeng386@gmail.com',
    ariaLabel: 'Gmail',
    rotation: -6,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
  }
];

export default function BubbleMenu({
  logo,
  onMenuClick,
  className = '',
  style,
  menuAriaLabel = 'Toggle menu',
  menuBg = '#18181b',
  menuContentColor = '#ffffff',
  useFixedPosition = false,
  items,
  animationEase = 'back.out(1.5)',
  animationDuration = 0.5,
  staggerDelay = 0.12,
  isOpen: controlledIsOpen,
  onClose,
  showNav = true,
  variant = 'default' // 'default' | 'footer'
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isMenuOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayRef = useRef(null);
  const bubblesRef = useRef([]);
  const labelRefs = useRef([]);

  const menuItems = items?.length ? items : DEFAULT_ITEMS;
  const containerClassName = ['bubble-menu', useFixedPosition ? 'fixed' : 'absolute', className]
    .filter(Boolean)
    .join(' ');

  const handleToggle = useCallback(() => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    if (controlledIsOpen === undefined) {
      setInternalOpen(nextState);
    }
    onMenuClick?.(nextState);
    if (!nextState) {
      onClose?.();
    }
  }, [isMenuOpen, controlledIsOpen, onMenuClick, onClose]);

  // Sync external controlled state
  useEffect(() => {
    if (controlledIsOpen !== true) return undefined;
    const frame = window.requestAnimationFrame(() => setShowOverlay(true));
    return () => window.cancelAnimationFrame(frame);
  }, [controlledIsOpen]);

  // GSAP animation on open/close
  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);

    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      gsap.set(overlay, { display: 'flex' });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.03, 0.03);
        const tl = gsap.timeline({ delay });

        tl.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase
        });
        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration,
              ease: 'power3.out'
            },
            `-=${animationDuration * 0.9}`
          );
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, {
        y: 20,
        autoAlpha: 0,
        duration: 0.18,
        ease: 'power3.in'
      });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
          setShowOverlay(false);
          onClose?.();
        }
      });
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay, onClose]);

  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen) {
        const bubbles = bubblesRef.current.filter(Boolean);

        bubbles.forEach((bubble, i) => {
          const item = menuItems[i];
          if (bubble && item) {
            const rotation = item.rotation ?? 0;
            gsap.set(bubble, { rotation });
          }
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen, menuItems]);

  return (
    <>
      {showNav && (
        <nav className={containerClassName} style={style} aria-label="Main navigation">
          <div className="bubble logo-bubble" aria-label="Logo" style={{ background: menuBg }}>
            <span className="logo-content">
              {typeof logo === 'string' ? <img src={logo} alt="Logo" className="bubble-logo" /> : logo}
            </span>
          </div>

          <button
            type="button"
            className={`bubble toggle-bubble menu-btn ${isMenuOpen ? 'open' : ''}`}
            onClick={handleToggle}
            aria-label={menuAriaLabel}
            aria-pressed={isMenuOpen}
            style={{ background: menuBg }}
          >
            <span className="menu-line" style={{ background: menuContentColor }} />
            <span className="menu-line short" style={{ background: menuContentColor }} />
          </button>
        </nav>
      )}

      {showOverlay && (
        <div
          ref={overlayRef}
          className={`bubble-menu-items ${variant === 'footer' ? 'bubble-menu-items--footer' : ''} ${
            useFixedPosition ? 'fixed' : 'absolute'
          }`}
          aria-hidden={!isMenuOpen}
        >
          <ul className="pill-list" role="menu" aria-label="Menu links">
            {menuItems.map((item, idx) => (
              <li key={idx} role="none" className="pill-col">
                <a
                  role="menuitem"
                  href={item.href}
                  target={item.target || (item.href?.startsWith('http') ? '_blank' : undefined)}
                  rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={item.ariaLabel || item.label}
                  className="pill-link"
                  style={{
                    '--item-rot': `${item.rotation ?? 0}deg`,
                    '--pill-bg': menuBg,
                    '--pill-color': menuContentColor,
                    '--hover-bg': item.hoverStyles?.bgColor || '#f3f4f6',
                    '--hover-color': item.hoverStyles?.textColor || '#ffffff'
                  }}
                  ref={el => {
                    if (el) bubblesRef.current[idx] = el;
                  }}
                  onClick={() => {
                    // Small delay to allow click/navigation before close
                    setTimeout(() => {
                      if (controlledIsOpen === undefined) {
                        setInternalOpen(false);
                      }
                      onClose?.();
                    }, 120);
                  }}
                >
                  <span
                    className="pill-label"
                    ref={el => {
                      if (el) labelRefs.current[idx] = el;
                    }}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

