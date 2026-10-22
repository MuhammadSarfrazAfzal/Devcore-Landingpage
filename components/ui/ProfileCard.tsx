"use client";
import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import './ProfileCard.css';

const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg, rgba(96, 73, 110, 0.55) 0%, rgba(113, 196, 255, 0.25) 100%)';

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 180,
};

const clamp = (v: number, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v: number, precision = 3) => parseFloat(v.toFixed(precision));
const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number) =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

export interface ProfileCardProps {
  avatarUrl?: string;
  iconUrl?: string;
  grainUrl?: string;
  innerGradient?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  behindGlowSize?: string;
  className?: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  contactHref?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
}

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  iconUrl = '/iconpattern.png',
  grainUrl = '/grain.webp',
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor,
  behindGlowSize,
  className = '',
  enableTilt = true,
  enableMobileTilt = true,
  mobileTiltSensitivity = 5,
  name = 'DevCore',
  title = 'Digital Engineering',
  handle = 'devcore',
  status = 'Available for Projects',
  contactText = 'Start a Conversation',
  contactHref = 'mailto:devcore@devcore.com',
  showUserInfo = true,
  onContactClick,
}) => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);

  const enterTimerRef = useRef<number | null>(null);
  const leaveRafRef = useRef<number | null>(null);

  const tiltEngine = useMemo(() => {
    if (!enableTilt) return null;

    let rafId: number | null = null;
    let running = false;
    let lastTs = 0;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x: number, y: number) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;

      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties: Record<string, string> = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${round(-(centerX / 5))}deg`,
        '--rotate-y': `${round(centerY / 4)}deg`,
      };

      for (const [k, v] of Object.entries(properties)) wrap.style.setProperty(k, v);
    };

    const step = (ts: number) => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);

      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;

      setVarsFromXY(currentX, currentY);

      const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;

      if (stillFar || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setTarget: (x: number, y: number) => {
        targetX = x;
        targetY = y;
        start();
      },
      setTargetImmediate: (x: number, y: number) => {
        targetX = x;
        targetY = y;
        currentX = x;
        currentY = y;
        setVarsFromXY(x, y);
      },
      setInitialUntil: (until: number) => {
        initialUntil = until;
      },
      cancel: () => {
        running = false;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
    };
  }, [enableTilt]);

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      const rect = shell.getBoundingClientRect();
      tiltEngine.setTarget(e.clientX - rect.left, e.clientY - rect.top);
    },
    [tiltEngine]
  );

  const handlePointerEnter = useCallback(
    (e: PointerEvent) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      shell.classList.add('entering');
      const rect = shell.getBoundingClientRect();
      tiltEngine.setTarget(e.clientX - rect.left, e.clientY - rect.top);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = window.setTimeout(() => {
        shell.classList.remove('entering');
      }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);
    },
    [tiltEngine]
  );

  const handlePointerLeave = useCallback(() => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;
    tiltEngine.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
  }, [tiltEngine]);

  const handleDeviceOrientation = useCallback(
    (e: DeviceOrientationEvent) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;

      const { beta, gamma } = e;
      if (beta === null || gamma === null) return;

      const b = clamp(beta, -90, 90);
      const g = clamp(gamma, -90, 90);

      const fX = (g + 90) / 180;
      const fY = (b + 90) / 180;

      const tX = fX * shell.clientWidth;
      const tY = fY * shell.clientHeight;

      tiltEngine.setTarget(tX, tY);
    },
    [tiltEngine]
  );

  useEffect(() => {
    const shell = shellRef.current;
    const wrap = wrapRef.current;
    if (!shell || !wrap || !tiltEngine) return;

    let hasStarted = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStarted) {
          hasStarted = true;
          const rect = shell.getBoundingClientRect();
          const cx = rect.width / 2;
          const cy = rect.height / 2;

          tiltEngine.setTargetImmediate(
            cx + ANIMATION_CONFIG.INITIAL_X_OFFSET,
            cy + ANIMATION_CONFIG.INITIAL_Y_OFFSET
          );
          tiltEngine.setInitialUntil(performance.now() + ANIMATION_CONFIG.INITIAL_DURATION);
          tiltEngine.setTarget(cx, cy);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(shell);

    const pointerEnterHandler = (e: PointerEvent) => handlePointerEnter(e);
    const pointerMoveHandler = (e: PointerEvent) => handlePointerMove(e);
    const pointerLeaveHandler = () => handlePointerLeave();

    shell.addEventListener('pointerenter', pointerEnterHandler as EventListener);
    shell.addEventListener('pointermove', pointerMoveHandler as EventListener);
    shell.addEventListener('pointerleave', pointerLeaveHandler);

    let deviceOrientationHandler: (e: DeviceOrientationEvent) => void;
    if (enableMobileTilt) {
      deviceOrientationHandler = (e: DeviceOrientationEvent) => handleDeviceOrientation(e);
      window.addEventListener('deviceorientation', deviceOrientationHandler);
    }

    return () => {
      observer.disconnect();
      shell.removeEventListener('pointerenter', pointerEnterHandler as EventListener);
      shell.removeEventListener('pointermove', pointerMoveHandler as EventListener);
      shell.removeEventListener('pointerleave', pointerLeaveHandler);
      if (enableMobileTilt && deviceOrientationHandler) {
        window.removeEventListener('deviceorientation', deviceOrientationHandler);
      }
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
      shell.classList.remove('entering');
    };
  }, [
    enableTilt,
    enableMobileTilt,
    tiltEngine,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
    handleDeviceOrientation,
  ]);

  const cardStyle = useMemo(
    () =>
      ({
        '--icon': iconUrl ? `url(${iconUrl})` : 'none',
        '--grain': grainUrl ? `url(${grainUrl})` : 'none',
        '--inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT,
        '--behind-glow-color': behindGlowColor ?? 'rgba(139, 92, 246, 0.45)',
        '--behind-glow-size': behindGlowSize ?? '60%',
      }) as React.CSSProperties,
    [iconUrl, grainUrl, innerGradient, behindGlowColor, behindGlowSize]
  );

  const handleCopyEmail = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText('devcore@devcore.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }, []);

  const handleContactClick = useCallback(() => {
    onContactClick?.();
  }, [onContactClick]);

  return (
    <div ref={wrapRef} className={`pc-card-wrapper ${className}`.trim()} style={cardStyle}>
      {behindGlowEnabled && <div className="pc-behind" />}
      <div ref={shellRef} className="pc-card-shell">
        <section className="pc-card">
          <div className="pc-inside">
            <div className="pc-shine" />
            <div className="pc-glare" />

            {/* Top Brand & Title Header */}
            <div className="pc-details-header">
              <div className="pc-badge-tag">
                <span className="pc-pulse-dot" />
                <span>DEVCORE STUDIO // V2.0</span>
              </div>
              <h3 className="pc-title-brand">{name}</h3>
              <p className="pc-subtitle-spec">{title}</p>
            </div>

            {/* Central Creative Holographic Emblem (Replaces boy photo) */}
            <div className="pc-emblem-container">
              <div className="pc-emblem-orbit pc-orbit-1" />
              <div className="pc-emblem-orbit pc-orbit-2" />
              <div className="pc-emblem-orbit pc-orbit-3" />
              
              {/* Central Glowing Cyber Core */}
              <div className="pc-emblem-core">
                <svg
                  viewBox="0 0 100 100"
                  className="pc-core-svg"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#c084fc" />
                      <stop offset="50%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#38bdf8" />
                    </linearGradient>
                  </defs>
                  {/* Outer Hexagon */}
                  <polygon
                    points="50,6 90,28 90,72 50,94 10,72 10,28"
                    stroke="url(#coreGrad)"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    opacity="0.8"
                  />
                  {/* Inner Diamond / Core */}
                  <polygon
                    points="50,20 80,50 50,80 20,50"
                    stroke="url(#coreGrad)"
                    strokeWidth="2.5"
                    fill="rgba(139, 92, 246, 0.15)"
                  />
                  {/* DevCore Center Monogram */}
                  <path
                    d="M38 38 L38 62 M38 38 C48 38 52 42 52 50 C52 58 48 62 38 62"
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M62 42 C58 38 54 42 54 50 C54 58 58 62 62 58"
                    stroke="#38bdf8"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Floating Holographic Telemetry Chips */}
              <div className="pc-telemetry-badge pc-telemetry-top">
                <span>EST. 2024</span>
                <span className="pc-sep">•</span>
                <span>ENGINEERING LAB</span>
              </div>
              <div className="pc-telemetry-badge pc-telemetry-bot">
                <span>LATENCY: &lt;10MS</span>
                <span className="pc-sep">•</span>
                <span>NEXT-GEN WEB</span>
              </div>
            </div>

            {/* Bottom User Info & Interactive Actions */}
            {showUserInfo && (
              <div className="pc-user-info">
                <div className="pc-user-details">
                  <div className="pc-status-icon-box">
                    <span className="pc-status-live-beacon" />
                  </div>
                  <div className="pc-user-text">
                    <div className="pc-handle">@{handle}</div>
                    <div className="pc-status">{status}</div>
                  </div>
                </div>

                <div className="pc-action-group">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="pc-copy-btn"
                    title="Copy Email"
                    aria-label="Copy Email"
                  >
                    {copied ? (
                      <span className="text-emerald-400 font-bold">✓ Copied</span>
                    ) : (
                      <span>Copy Email</span>
                    )}
                  </button>

                  {contactHref ? (
                    <a
                      className="pc-contact-btn"
                      href={contactHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleContactClick}
                      aria-label={`Contact ${name}`}
                    >
                      {contactText}
                    </a>
                  ) : (
                    <button
                      className="pc-contact-btn"
                      onClick={handleContactClick}
                      type="button"
                      aria-label={`Contact ${name}`}
                    >
                      {contactText}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;
