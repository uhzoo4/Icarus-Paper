import * as THREE from 'three';

let mesh = null;
let geometry = null;
const clock = new THREE.Clock();

export let icarusFallProgress = 0;

export function setIcarusFallProgress(t) {
    icarusFallProgress = t;
    if (mesh) {
        mesh.position.y = -t * 3;
        mesh.rotation.z = t * 0.15;
    }
}

export function initIcarusCanvas() {
    const canvas = document.getElementById('icarus-canvas');

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    geometry = new THREE.PlaneGeometry(3, 4, 32, 32);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/assets/images/icarus-story.jpg');

    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.05,
        opacity: 0.85,
        depthWrite: false
    });

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    scene.add(mesh);

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate() {
        requestAnimationFrame(animate);

        const positions = geometry.attributes.position;
        const time = clock.getElapsedTime();
        const flapSpeed = 1.8 + icarusFallProgress * 2.4;

        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            const uvX = (x + 1.5) / 3;
            const isWing = uvX < 0.28 || uvX > 0.72;

            if (isWing) {
                const wingStrength = uvX < 0.28
                    ? (0.28 - uvX) / 0.28
                    : (uvX - 0.72) / 0.28;
                const flap = Math.sin(time * flapSpeed + y * 2) * wingStrength * 0.12;
                positions.setZ(i, flap);
            }
        }

        positions.needsUpdate = true;
        geometry.computeVertexNormals();

        renderer.render(scene, camera);
    }

    animate();
}

export function setIcarusCompositionShift(t) {
    if (!mesh) return;
    mesh.position.x = t * 2.2;
}