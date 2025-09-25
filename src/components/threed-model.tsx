"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeDModel: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const rotationSpeed = useRef({ x: 0.002, y: 0.003 });

    useEffect(() => {
        if (!mountRef.current) return;

        const currentMount = mountRef.current;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);

        const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 100, 16);
        const material = new THREE.MeshStandardMaterial({
            color: 0x3F51B5, // Primary color
            metalness: 0.5,
            roughness: 0.4,
        });
        const torusKnot = new THREE.Mesh(geometry, material);
        scene.add(torusKnot);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        const animate = () => {
            requestAnimationFrame(animate);
            torusKnot.rotation.x += rotationSpeed.current.x;
            torusKnot.rotation.y += rotationSpeed.current.y;
            renderer.render(scene, camera);
        };
        animate();

        const handleMouseMove = (event: MouseEvent) => {
            const { clientX, clientY } = event;
            const { innerWidth, innerHeight } = window;
            const x = (clientX / innerWidth) * 2 - 1;
            const y = -(clientY / innerHeight) * 2 + 1;
            rotationSpeed.current.x = y * 0.005;
            rotationSpeed.current.y = x * 0.005;
        };

        const handleResize = () => {
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (renderer.domElement.parentNode === currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} className="h-full w-full" />;
};

export default ThreeDModel;
