const Robot = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <svg
        viewBox="0 0 400 700"
        className="w-[320px] h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#d9d9d9" />
            <stop offset="100%" stopColor="#b8b8b8" />
          </linearGradient>

          <radialGradient id="eyeGlow">
            <stop offset="0%" stopColor="#dffcff" />
            <stop offset="100%" stopColor="#00d9ff" />
          </radialGradient>

          <radialGradient id="coreGlow">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#1ea7ff" />
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="6" result="blur" />
          </filter>
        </defs>

        {/* HEAD */}
        <rect
          x="125"
          y="50"
          rx="35"
          ry="35"
          width="150"
          height="145"
          fill="url(#metal)"
        />

        {/* Face */}
        <rect
          x="150"
          y="82"
          rx="25"
          ry="25"
          width="100"
          height="75"
          fill="#0b0f18"
        />

        {/* Eyes */}
        <circle cx="178" cy="118" r="14" fill="url(#eyeGlow)" filter="url(#glow)" />
        <circle cx="222" cy="118" r="14" fill="url(#eyeGlow)" filter="url(#glow)" />

        {/* Ears */}
        <circle cx="118" cy="118" r="18" fill="none" stroke="#cfcfcf" strokeWidth="6" />
        <circle cx="282" cy="118" r="18" fill="none" stroke="#cfcfcf" strokeWidth="6" />

        {/* Antenna */}
        <rect
          x="275"
          y="65"
          width="8"
          height="40"
          rx="10"
          fill="#2c2c2c"
          transform="rotate(28 275 65)"
        />

        {/* Neck */}
        <rect x="182" y="195" width="35" height="20" rx="8" fill="#cfcfcf" />

        {/* BODY */}
        <rect
          x="148"
          y="220"
          rx="30"
          ry="30"
          width="105"
          height="145"
          fill="url(#metal)"
        />

        {/* Core */}
        <circle cx="200" cy="285" r="22" fill="url(#coreGlow)" filter="url(#glow)" />

        {/* LEFT ARM */}
        <g transform="rotate(18 120 270)">
          <rect x="110" y="235" width="24" height="70" rx="14" fill="url(#metal)" />
          <circle cx="122" cy="312" r="11" fill="#c9c9c9" />
          <rect x="112" y="322" width="20" height="62" rx="12" fill="url(#metal)" />
        </g>

        {/* RIGHT ARM (raised) */}
        <g transform="rotate(-55 285 240)">
          <rect x="275" y="190" width="24" height="70" rx="14" fill="url(#metal)" />
          <circle cx="287" cy="268" r="11" fill="#c9c9c9" />
          <rect x="277" y="278" width="20" height="62" rx="12" fill="url(#metal)" />
        </g>

        {/* HIP */}
        <ellipse cx="200" cy="390" rx="40" ry="15" fill="#d4d4d4" />

        {/* LEFT LEG */}
        <g transform="rotate(5 175 450)">
          <rect x="160" y="400" width="30" height="115" rx="16" fill="url(#metal)" />
          <circle cx="175" cy="448" r="11" fill="#bdbdbd" />
          <ellipse cx="175" cy="525" rx="28" ry="10" fill="#cfcfcf" />
        </g>

        {/* RIGHT LEG */}
        <g transform="rotate(-4 225 450)">
          <rect x="210" y="400" width="30" height="115" rx="16" fill="url(#metal)" />
          <circle cx="225" cy="448" r="11" fill="#bdbdbd" />
          <ellipse cx="225" cy="525" rx="28" ry="10" fill="#cfcfcf" />
        </g>
      </svg>
    </div>
  );
};

export default Robot;

// import { useState, useEffect, useRef } from "react";

// const css = `
//   * { box-sizing: border-box; margin: 0; padding: 0; }

//   body { background: #080d12; }

//   .scene {
//     width: 200px;
//     height: 200px;
//     perspective: 600px;
//     perspective-origin: 50% 40%;
//   }

//   /* ── FLOAT ANIMATION ── */
//   @keyframes float {
//     0%,100% { transform: translateY(0px) rotateY(var(--ry)); }
//     50%      { transform: translateY(-12px) rotateY(var(--ry)); }
//   }
//   @keyframes headBob {
//     0%,100% { transform: rotateY(-12deg) rotateX(2deg); }
//     50%      { transform: rotateY(12deg) rotateX(-2deg); }
//   }
//   @keyframes wave {
//     0%,100% { transform: rotateZ(-110deg) rotateX(0deg); }
//     50%      { transform: rotateZ(-140deg) rotateX(10deg); }
//   }
//   @keyframes walkRA {
//     0%,100% { transform: rotateX(-35deg) rotateZ(10deg); }
//     50%      { transform: rotateX(35deg) rotateZ(10deg); }
//   }
//   @keyframes walkLA {
//     0%,100% { transform: rotateX(35deg) rotateZ(-10deg); }
//     50%      { transform: rotateX(-35deg) rotateZ(-10deg); }
//   }
//   @keyframes walkRL {
//     0%,100% { transform: rotateX(28deg); }
//     50%      { transform: rotateX(-28deg); }
//   }
//   @keyframes walkLL {
//     0%,100% { transform: rotateX(-28deg); }
//     50%      { transform: rotateX(28deg); }
//   }
//   @keyframes eyePulse {
//     0%,100% { box-shadow: 0 0 8px 3px #22c3f0aa, 0 0 2px 1px #22c3f0; }
//     50%      { box-shadow: 0 0 18px 7px #22c3f0cc, 0 0 4px 2px #22c3f0; }
//   }
//   @keyframes antPulse {
//     0%,100% { box-shadow: 0 0 6px 3px #22c3f0aa; background: #4db0df; }
//     50%      { box-shadow: 0 0 14px 6px #22c3f0; background: #88eeff; }
//   }
//   @keyframes blink {
//     0%,90%,100% { transform: scaleY(1); }
//     95%          { transform: scaleY(0.05); }
//   }
//   @keyframes chestPulse {
//     0%,100% { box-shadow: 0 0 10px 4px #22c3f088; }
//     50%      { box-shadow: 0 0 22px 9px #22c3f0cc; }
//   }
//   @keyframes soundBar {
//     0%,100% { transform: scaleY(0.3); }
//     50%      { transform: scaleY(1); }
//   }

//   .robot-root {
//     --ry: 0deg;
//     animation: float 3s ease-in-out infinite;
//     transform-style: preserve-3d;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     position: relative;
//   }

//   /* ──────────────── ANTENNA ──────────────── */
//   .antenna-wrap {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     margin-bottom: -2px;
//     transform: translateX(6px);
//   }
//   .ant-ball {
//     width: 10px; height: 10px;
//     border-radius: 50%;
//     background: #4db0df;
//     animation: antPulse 1.6s ease-in-out infinite;
//     margin-bottom: 0;
//   }
//   .ant-stick {
//     width: 3px; height: 18px;
//     background: linear-gradient(to bottom, #9aa0a8, #6a7078);
//     border-radius: 2px;
//   }

//   /* ──────────────── HEAD ──────────────── */
//   .head {
//     width: 100px; height: 92px;
//     background: linear-gradient(145deg, #f2f5f8 0%, #dde4ea 55%, #c8d2da 100%);
//     border-radius: 22px;
//     position: relative;
//     transform-style: preserve-3d;
//     animation: headBob 4s ease-in-out infinite;
//     box-shadow:
//       4px 5px 16px rgba(0,0,0,0.5),
//       -2px -2px 6px rgba(255,255,255,0.15),
//       inset 0 1px 0 rgba(255,255,255,0.4);
//     border: 1px solid #bcc8d4;
//   }

//   /* Head side face — gives 3D depth */
//   .head::before {
//     content: '';
//     position: absolute;
//     right: -10px; top: 8px;
//     width: 10px; height: 76px;
//     background: linear-gradient(to right, #b0bcc8, #8898a8);
//     border-radius: 0 8px 8px 0;
//     transform: rotateY(90deg);
//     transform-origin: left center;
//   }
//   /* Head top */
//   .head::after {
//     content: '';
//     position: absolute;
//     top: -8px; left: 8px;
//     width: 84px; height: 8px;
//     background: linear-gradient(to bottom, #d8e2ea, #c0ccd6);
//     border-radius: 8px 8px 0 0;
//     transform: rotateX(90deg);
//     transform-origin: bottom center;
//   }

//   .face-screen {
//     position: absolute;
//     top: 10px; left: 10px;
//     width: 80px; height: 66px;
//     background: linear-gradient(160deg, #060c10 0%, #0c1820 100%);
//     border-radius: 14px;
//     border: 1.5px solid #1a2838;
//     box-shadow: inset 0 2px 8px #000000bb;
//     overflow: hidden;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     gap: 5px;
//   }

//   /* Screen inner glow */
//   .face-screen::before {
//     content: '';
//     position: absolute;
//     inset: 0;
//     background: radial-gradient(ellipse at 50% 20%, #1a4a7a20 0%, transparent 65%);
//     border-radius: 14px;
//   }

//   .eyes-row {
//     display: flex;
//     gap: 12px;
//     animation: blink 4s ease-in-out infinite;
//     transform-origin: center;
//   }
//   .eye {
//     width: 22px; height: 14px;
//     border-radius: 50%;
//     background: radial-gradient(circle at 35% 30%, #aaddff 0%, #4ab8ff 40%, #0d6ecc 75%, #061a44 100%);
//     animation: eyePulse 2.2s ease-in-out infinite;
//     position: relative;
//   }
//   .eye::after {
//     content: '';
//     position: absolute;
//     top: 3px; left: 5px;
//     width: 7px; height: 5px;
//     border-radius: 50%;
//     background: rgba(255,255,255,0.55);
//     transform: rotate(-20deg);
//   }

//   .smile {
//     width: 36px; height: 8px;
//     border-bottom: 2.5px solid #4ab8ff;
//     border-left: 2.5px solid transparent;
//     border-right: 2.5px solid transparent;
//     border-radius: 0 0 18px 18px;
//     box-shadow: 0 3px 8px #22c3f066;
//   }

//   .sound-bars {
//     display: flex;
//     gap: 2px;
//     align-items: center;
//     position: absolute;
//     bottom: 5px; right: 7px;
//   }
//   .sbar {
//     width: 2px;
//     border-radius: 1px;
//     background: #4ab8ff;
//     transform-origin: bottom;
//     animation: soundBar 0.5s ease-in-out infinite;
//   }

//   /* Ear disc */
//   .ear {
//     position: absolute;
//     right: -10px; top: 30px;
//     width: 20px; height: 20px;
//     border-radius: 50%;
//     background: linear-gradient(135deg, #c8d4dc, #8898a8);
//     border: 1px solid #a0b0bc;
//     display: flex; align-items: center; justify-content: center;
//   }
//   .ear-inner {
//     width: 9px; height: 9px;
//     border-radius: 50%;
//     background: #4ab8ff;
//     box-shadow: 0 0 6px 2px #22c3f088;
//   }

//   /* ──────────────── NECK ──────────────── */
//   .neck {
//     width: 26px; height: 10px;
//     background: linear-gradient(to bottom, #9aa0a8, #7a8088);
//     border-radius: 0 0 5px 5px;
//     box-shadow: 2px 2px 4px rgba(0,0,0,0.4);
//   }

//   /* ──────────────── SHOULDER YOKE ──────────────── */
//   .yoke {
//     position: relative;
//     width: 130px; height: 14px;
//     background: linear-gradient(to bottom, #dde8ee, #c4d0d8);
//     border-radius: 8px;
//     box-shadow: 0 3px 8px rgba(0,0,0,0.4);
//   }
//   .yoke::after {
//     content: '';
//     position: absolute;
//     bottom: -6px; left: 8px;
//     width: 114px; height: 6px;
//     background: linear-gradient(to right, #b0bcc8, #8898a8, #b0bcc8);
//     border-radius: 0 0 4px 4px;
//     transform: rotateX(90deg);
//     transform-origin: top center;
//   }
//   .shoulder-cap {
//     position: absolute;
//     top: 50%; transform: translateY(-50%);
//     width: 22px; height: 22px;
//     border-radius: 50%;
//     background: radial-gradient(circle at 35% 30%, #d8e4ec, #8898a8);
//     border: 1.5px solid #9aaab8;
//     box-shadow: 0 2px 6px rgba(0,0,0,0.3);
//   }
//   .shoulder-cap.left  { left: -5px; }
//   .shoulder-cap.right { right: -5px; }

//   /* ──────────────── BODY + ARMS ROW ──────────────── */
//   .body-row {
//     position: relative;
//     display: flex;
//     align-items: flex-start;
//   }

//   /* ──────────────── TORSO ──────────────── */
//   .torso {
//     width: 90px; min-height: 100px;
//     background: linear-gradient(155deg, #edf2f6 0%, #d4e0e8 45%, #bccad4 100%);
//     border-radius: 16px;
//     position: relative;
//     box-shadow:
//       4px 5px 14px rgba(0,0,0,0.5),
//       -2px -2px 6px rgba(255,255,255,0.12),
//       inset 0 1px 0 rgba(255,255,255,0.3);
//     border: 1px solid #bccad4;
//     z-index: 2;
//   }
//   /* Torso side depth */
//   .torso::before {
//     content: '';
//     position: absolute;
//     right: -10px; top: 6px;
//     width: 10px; height: 88px;
//     background: linear-gradient(to right, #a8b8c4, #8090a0);
//     border-radius: 0 6px 6px 0;
//     transform: rotateY(90deg);
//     transform-origin: left center;
//   }

//   .chest-panel {
//     position: absolute;
//     top: 12px; left: 10px;
//     width: 70px; height: 46px;
//     background: linear-gradient(145deg, #080f14, #101e28);
//     border-radius: 8px;
//     border: 1px solid #1a2e3e;
//     box-shadow: inset 0 2px 6px #00000099;
//     display: flex;
//     flex-direction: column;
//     padding: 6px 8px;
//     gap: 4px;
//   }
//   .chest-dots {
//     display: flex; gap: 4px;
//   }
//   .cdot {
//     width: 7px; height: 7px;
//     border-radius: 50%;
//   }
//   .chest-line {
//     height: 3px;
//     border-radius: 2px;
//     background: linear-gradient(to right, #4ab8ff33, #4ab8ff99, #4ab8ff33);
//   }
//   .chest-core {
//     position: absolute;
//     bottom: 12px; left: 50%;
//     transform: translateX(-50%);
//     width: 20px; height: 20px;
//     border-radius: 50%;
//     background: radial-gradient(circle, #88eeff, #22c3f0, #0a5a8a);
//     animation: chestPulse 2s ease-in-out infinite;
//     border: 2px solid #4ab8ff44;
//   }
//   .hip-tab {
//     position: absolute;
//     bottom: -4px;
//     width: 16px; height: 10px;
//     background: linear-gradient(135deg, #b8c8d4, #7888a0);
//     border-radius: 3px;
//     border: 1px solid #8898a8;
//   }
//   .hip-tab.left  { left: 12px; }
//   .hip-tab.right { right: 12px; }

//   /* ──────────────── ARM ──────────────── */
//   .arm-wrap {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     transform-origin: top center;
//     transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1);
//     margin-top: 6px;
//   }
//   .arm-wrap.left  { margin-right: -6px; order: -1; }
//   .arm-wrap.right { margin-left: -6px; }

//   .arm-upper {
//     width: 18px; height: 38px;
//     background: linear-gradient(to right, #dde8ee, #c4d0d8, #b0bcc8);
//     border-radius: 9px;
//     border: 1px solid #bcc8d4;
//     box-shadow: 2px 2px 6px rgba(0,0,0,0.3);
//   }
//   .elbow {
//     width: 22px; height: 16px;
//     border-radius: 50%;
//     background: radial-gradient(circle at 35% 30%, #c8d8e0, #8090a0);
//     border: 1.5px solid #9aaab8;
//     margin: -2px 0;
//     box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
//   }
//   .arm-lower {
//     width: 15px; height: 32px;
//     background: linear-gradient(to right, #dde8ee, #c4d0d8, #b0bcc8);
//     border-radius: 8px;
//     border: 1px solid #bcc8d4;
//     box-shadow: 2px 2px 6px rgba(0,0,0,0.3);
//   }
//   .hand {
//     width: 20px; height: 16px;
//     border-radius: 8px;
//     background: linear-gradient(135deg, #262a30, #1a1e22);
//     border: 1px solid #3a3e44;
//     margin-top: -2px;
//     box-shadow: 2px 2px 5px rgba(0,0,0,0.4);
//   }

//   /* ──────────────── WAIST ──────────────── */
//   .waist {
//     width: 60px; height: 14px;
//     background: linear-gradient(to bottom, #9aa0a8, #7a8088);
//     border-radius: 6px;
//     box-shadow: 0 3px 6px rgba(0,0,0,0.4);
//     margin-top: 2px;
//   }

//   /* ──────────────── PELVIS ──────────────── */
//   .pelvis {
//     width: 80px; height: 20px;
//     background: linear-gradient(to bottom, #c4d0d8, #9aaab4);
//     border-radius: 8px;
//     margin-top: 2px;
//     box-shadow: 0 3px 8px rgba(0,0,0,0.4);
//     border: 1px solid #8898a8;
//     position: relative;
//   }
//   .pelvis::after {
//     content: '';
//     position: absolute;
//     bottom: -5px; left: 10px;
//     width: 60px; height: 5px;
//     background: #7a8898;
//     transform: rotateX(90deg);
//     transform-origin: top;
//     border-radius: 0 0 3px 3px;
//   }

//   /* ──────────────── LEGS ──────────────── */
//   .legs-row {
//     display: flex;
//     gap: 10px;
//     margin-top: 3px;
//   }
//   .leg-wrap {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     transform-origin: top center;
//     transition: transform 0.4s ease;
//   }
//   .thigh {
//     width: 26px; height: 36px;
//     background: linear-gradient(to right, #dde8ee, #c4d0d8, #b0bcc8);
//     border-radius: 9px;
//     border: 1px solid #bcc8d4;
//     box-shadow: 2px 2px 6px rgba(0,0,0,0.35);
//   }
//   .knee {
//     width: 30px; height: 14px;
//     border-radius: 6px;
//     background: radial-gradient(ellipse at 40% 30%, #c4d0d8, #8090a0);
//     border: 1.5px solid #9aaab4;
//     margin: -1px 0;
//     box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
//   }
//   .shin {
//     width: 22px; height: 30px;
//     background: linear-gradient(to right, #dde8ee, #c4d0d8, #b0bcc8);
//     border-radius: 7px;
//     border: 1px solid #bcc8d4;
//     box-shadow: 2px 2px 6px rgba(0,0,0,0.3);
//   }
//   .foot {
//     width: 36px; height: 12px;
//     background: linear-gradient(to bottom, #9aa0a8, #262a30);
//     border-radius: 6px 6px 4px 4px;
//     border: 1px solid #3a3e44;
//     margin-top: -1px;
//     box-shadow: 2px 3px 6px rgba(0,0,0,0.5);
//   }

//   /* ──────────────── SHADOW ──────────────── */
//   .ground-shadow {
//     width: 110px; height: 12px;
//     background: radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, transparent 72%);
//     border-radius: 50%;
//     margin-top: 6px;
//   }

//   /* ──────────────── POSE CLASSES ──────────────── */
//   .pose-idle .arm-wrap.right { transform: rotateZ(12deg); }
//   .pose-idle .arm-wrap.left  { transform: rotateZ(-12deg); }

//   .pose-wave .arm-wrap.right { animation: wave 0.65s ease-in-out infinite; }
//   .pose-wave .arm-wrap.left  { transform: rotateZ(-12deg); }

//   .pose-point .arm-wrap.right { transform: rotateZ(-80deg) rotateX(-20deg); }
//   .pose-point .arm-wrap.left  { transform: rotateZ(-12deg); }

//   .pose-walk .arm-wrap.right { animation: walkRA 0.55s ease-in-out infinite; }
//   .pose-walk .arm-wrap.left  { animation: walkLA 0.55s ease-in-out infinite; }
//   .pose-walk .leg-wrap.right { animation: walkRL 0.55s ease-in-out infinite; }
//   .pose-walk .leg-wrap.left  { animation: walkLL 0.55s ease-in-out infinite; }
// `;

// export default function CSSRobot() {
//   const [pose, setPose] = useState("idle");
//   const [speaking, setSpeaking] = useState(false);
//   const [rotY, setRotY] = useState(0);
//   const dragging = useRef(false);
//   const lastX = useRef(0);
//   const rootRef = useRef(null);

//   // Drag to rotate
//   const onMouseDown = (e) => { dragging.current = true; lastX.current = e.clientX; };
//   const onMouseMove = (e) => {
//     if (!dragging.current) return;
//     const dx = e.clientX - lastX.current;
//     lastX.current = e.clientX;
//     setRotY(r => r + dx * 0.6);
//   };
//   const onMouseUp = () => { dragging.current = false; };

//   // Touch support
//   const onTouchStart = (e) => { dragging.current = true; lastX.current = e.touches[0].clientX; };
//   const onTouchMove = (e) => {
//     if (!dragging.current) return;
//     const dx = e.touches[0].clientX - lastX.current;
//     lastX.current = e.touches[0].clientX;
//     setRotY(r => r + dx * 0.6);
//   };

//   useEffect(() => {
//     window.addEventListener("mouseup", onMouseUp);
//     return () => window.removeEventListener("mouseup", onMouseUp);
//   }, []);

//   const poses = ["idle", "wave", "point", "walk"];
//   const soundHeights = [0.5, 1, 0.75, 1.2, 0.6];

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "radial-gradient(ellipse at 50% 30%, #0d2035 0%, #080d12 100%)",
//       display: "flex", flexDirection: "column",
//       alignItems: "center", justifyContent: "center",
//       fontFamily: "'Inter', sans-serif",
//       userSelect: "none",
//     }}
//       onMouseMove={onMouseMove}
//       onTouchMove={onTouchMove}
//       onTouchEnd={() => { dragging.current = false; }}
//     >
//       <style>{css}</style>

//       {/* Title */}
//       <div style={{ color: "#4db0df", fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 28, textTransform: "uppercase", opacity: 0.8 }}>
//         Pure CSS 3D Robot — No Three.js
//       </div>

//       {/* Robot scene */}
//       <div className="scene"
//         style={{ cursor: "grab" }}
//         onMouseDown={onMouseDown}
//         onTouchStart={onTouchStart}
//       >
//         <div
//           ref={rootRef}
//           className={`robot-root pose-${pose}`}
//           style={{ "--ry": `${rotY}deg`, transform: `translateY(0px) rotateY(${rotY}deg)` }}
//         >
//           {/* ANTENNA */}
//           <div className="antenna-wrap">
//             <div className="ant-ball" />
//             <div className="ant-stick" />
//           </div>

//           {/* HEAD */}
//           <div className="head">
//             <div className="face-screen">
//               <div className="eyes-row">
//                 <div className="eye" style={{ animationDelay: "0s" }} />
//                 <div className="eye" style={{ animationDelay: "0.15s" }} />
//               </div>
//               <div className="smile" />
//               {speaking && (
//                 <div className="sound-bars">
//                   {soundHeights.map((h, i) => (
//                     <div key={i} className="sbar" style={{
//                       height: `${h * 10}px`,
//                       animationDelay: `${i * 0.09}s`,
//                     }} />
//                   ))}
//                 </div>
//               )}
//             </div>
//             <div className="ear"><div className="ear-inner" /></div>
//           </div>

//           {/* NECK */}
//           <div className="neck" />

//           {/* SHOULDER YOKE */}
//           <div className="yoke">
//             <div className="shoulder-cap left" />
//             <div className="shoulder-cap right" />
//           </div>

//           {/* BODY + ARMS */}
//           <div className="body-row">
//             {/* LEFT ARM */}
//             <div className="arm-wrap left">
//               <div className="arm-upper" />
//               <div className="elbow" />
//               <div className="arm-lower" />
//               <div className="hand" />
//             </div>

//             {/* TORSO */}
//             <div className="torso">
//               <div className="chest-panel">
//                 <div className="chest-dots">
//                   {["#ff5555","#ffaa00","#44ee66"].map((c,i) => (
//                     <div key={i} className="cdot" style={{ background: c, boxShadow: `0 0 4px ${c}` }} />
//                   ))}
//                 </div>
//                 <div className="chest-line" />
//                 <div style={{ height: 2, background: "#1a2e3e", borderRadius: 2 }} />
//               </div>
//               <div className="chest-core" />
//               <div className="hip-tab left" />
//               <div className="hip-tab right" />
//             </div>

//             {/* RIGHT ARM */}
//             <div className="arm-wrap right">
//               <div className="arm-upper" />
//               <div className="elbow" />
//               <div className="arm-lower" />
//               <div className="hand" />
//             </div>
//           </div>

//           {/* WAIST */}
//           <div className="waist" />

//           {/* PELVIS */}
//           <div className="pelvis" />

//           {/* LEGS */}
//           <div className="legs-row">
//             <div className="leg-wrap left">
//               <div className="thigh" />
//               <div className="knee" />
//               <div className="shin" />
//               <div className="foot" />
//             </div>
//             <div className="leg-wrap right">
//               <div className="thigh" />
//               <div className="knee" />
//               <div className="shin" />
//               <div className="foot" />
//             </div>
//           </div>

//           {/* SHADOW */}
//           <div className="ground-shadow" />
//         </div>
//       </div>

//       {/* Controls */}
//       <div style={{ marginTop: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
//         {/* Pose buttons */}
//         <div style={{ display: "flex", gap: 8 }}>
//           {poses.map(p => (
//             <button key={p} onClick={() => setPose(p)} style={{
//               padding: "7px 16px", borderRadius: 8,
//               border: "none", cursor: "pointer",
//               background: pose === p ? "#4db0df" : "#0d1e2e",
//               color: pose === p ? "#000" : "#5588aa",
//               fontWeight: 700, fontSize: 11,
//               textTransform: "capitalize",
//               letterSpacing: 0.5,
//               transition: "all 0.2s",
//               boxShadow: pose === p ? "0 0 12px #22c3f066" : "none",
//             }}>{p}</button>
//           ))}
//         </div>

//         {/* Speaking toggle */}
//         <button onClick={() => setSpeaking(s => !s)} style={{
//           padding: "7px 20px", borderRadius: 8,
//           border: "1px solid #1a3a50",
//           cursor: "pointer",
//           background: speaking ? "#0d3a18" : "#0d1e2e",
//           color: speaking ? "#44ee88" : "#5588aa",
//           fontWeight: 700, fontSize: 11,
//           letterSpacing: 0.5,
//         }}>
//           {speaking ? "🔊 Speaking ON" : "🔇 Speaking OFF"}
//         </button>

//         <div style={{ fontSize: 10, color: "#334", marginTop: 4 }}>
//           ← Drag robot to rotate →
//         </div>
//       </div>
//     </div>
//   );
// }