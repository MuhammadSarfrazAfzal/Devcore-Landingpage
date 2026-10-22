"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export const VSCode3DPreview: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframeMode, setWireframeMode] = useState(true);
  const [fps, setFps] = useState(60);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 380;
    let height = container.clientHeight || 340;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06060c, 0.08);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xa78bfa, 3, 20);
    pointLight1.position.set(4, 4, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x38bdf8, 3, 20);
    pointLight2.position.set(-4, -4, 2);
    scene.add(pointLight2);

    // 3. Central Holographic Core (Icosahedron Wireframe + Solid Core)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Outer wireframe icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(1.35, 1);
    const wireMat = new THREE.MeshStandardMaterial({
      color: 0xa78bfa,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.35,
    });
    const icoMesh = new THREE.Mesh(icoGeo, wireMat);
    coreGroup.add(icoMesh);

    // Inner glowing faceted core
    const innerGeo = new THREE.OctahedronGeometry(0.85, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x0284c7,
      emissiveIntensity: 0.45,
      transparent: true,
      opacity: 0.85,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Vertices / Nodes as glowing points
    const pointsMat = new THREE.PointsMaterial({
      color: 0xf5f3ff,
      size: 0.065,
      transparent: true,
      opacity: 0.9,
    });
    const pointsMesh = new THREE.Points(icoGeo, pointsMat);
    coreGroup.add(pointsMesh);

    // 4. Concentric Gyroscopic Rings
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const ringGeo1 = new THREE.TorusGeometry(1.85, 0.012, 16, 80);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const ringGeo2 = new THREE.TorusGeometry(2.15, 0.012, 16, 90);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = Math.PI / 6;
    scene.add(ring2);

    // 5. Starfield / Orbital Particle Cloud
    const particleCount = 240;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0xa78bfa);
    const c2 = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixed = c1.clone().lerp(c2, Math.random());
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const cloudMat = new THREE.PointsMaterial({
      size: 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const particleCloud = new THREE.Points(particleGeo, cloudMat);
    scene.add(particleCloud);

    // 6. Interactive Mouse & Drag Handling
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      mouseX = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = clientX - previousPointerX;
        const deltaY = clientY - previousPointerY;
        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;
        previousPointerX = clientX;
        previousPointerY = clientY;
      }
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      previousPointerX = clientX;
      previousPointerY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    container.addEventListener("mousemove", onPointerMove);
    container.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mouseup", onPointerUp);

    container.addEventListener("touchmove", onPointerMove, { passive: true });
    container.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // 7. Resize Observer
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 380;
      height = container.clientHeight || 340;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 8. Animation Loop with FPS tracking & Visibility check
    let animationFrameId: number;
    let isVisible = true;
    let lastTime = performance.now();
    let frameCount = 0;

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(container);

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      // Track approximate FPS
      frameCount++;
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }

      // Continuous autonomous rotation
      if (!isDragging) {
        targetRotationY += 0.007;
        targetRotationX += 0.003;
      }

      // Smooth inertia lerp
      coreGroup.rotation.y += (targetRotationY + mouseX * 0.5 - coreGroup.rotation.y) * 0.07;
      coreGroup.rotation.x += (targetRotationX - mouseY * 0.5 - coreGroup.rotation.x) * 0.07;

      innerMesh.rotation.y -= 0.015;
      innerMesh.rotation.x -= 0.008;

      ring1.rotation.z += 0.009;
      ring1.rotation.y += 0.004;

      ring2.rotation.z -= 0.006;
      ring2.rotation.x += 0.007;

      particleCloud.rotation.y += 0.002;

      renderer.render(scene, camera);
    };

    animate(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();

      container.removeEventListener("mousemove", onPointerMove);
      container.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mouseup", onPointerUp);
      container.removeEventListener("touchmove", onPointerMove);
      container.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchend", onPointerUp);

      // Clean GPU memory
      icoGeo.dispose();
      innerGeo.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      particleGeo.dispose();
      wireMat.dispose();
      innerMat.dispose();
      pointsMat.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      cloudMat.dispose();
      renderer.dispose();

      if (renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[300px] sm:min-h-[340px] flex flex-col justify-between overflow-hidden bg-[#050509] rounded-lg select-none">
      {/* Subtle Ambient Cosmic Grid & Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(rgba(167,139,250,0.3) 1px, transparent 1px), radial-gradient(rgba(56,189,248,0.2) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0, 12px 12px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-radial from-violet-600/10 via-transparent to-transparent blur-xl"
      />

      {/* Top HUD bar */}
      <div className="relative z-10 flex items-center justify-between px-3.5 py-2.5 bg-black/40 border-b border-white/[0.06] backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
          </span>
          <span className="text-[10px] font-mono tracking-wider uppercase text-cyan-300 font-semibold">
            WebGL 3D Core
          </span>
          <span className="text-[9px] font-mono text-neutral-500">·</span>
          <span className="text-[9px] font-mono text-neutral-400 hidden sm:inline">
            Interactive Mesh
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-400">
          <span className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-violet-300">
            {fps} FPS
          </span>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
      />

      {/* Bottom HUD info & interact cue */}
      <div className="relative z-10 flex items-center justify-between px-3.5 py-2 bg-black/45 border-t border-white/[0.06] backdrop-blur-md font-mono text-[9.5px]">
        <div className="flex items-center gap-2 text-neutral-400">
          <span className="text-violet-400 font-semibold">Engine:</span>
          <span>Three.js v184</span>
        </div>
        <div className="flex items-center gap-1.5 text-neutral-400">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isInteracting ? "bg-emerald-400 shadow-[0_0_6px_#34d399]" : "bg-neutral-600"
            }`}
          />
          <span className="text-[9px] text-neutral-400">
            {isInteracting ? "Active Drag" : "Drag / Move Mouse"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VSCode3DPreview;
