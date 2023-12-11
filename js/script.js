// Importando o módulo THREE.js
import * as THREE from 'three';
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect.js';

// Definindo constantes para a largura e altura da cena
const SCENE_WIDTH = window.innerWidth;
const SCENE_HEIGHT = window.innerHeight;

// Função para criar a cena
function createScene() {
    // Cria uma nova cena
    const scene = new THREE.Scene();
    return scene; // Retorna a cena criada
}

// Função para criar a câmera
function createCamera() {
    // Define os limites da câmera perspectiva
    const fov = 75; // Campo de visão
    const aspect = SCENE_WIDTH / SCENE_HEIGHT; // Proporção da cena
    const near = 0.1; // Limite mais próximo que a câmera pode ver
    const far = 1000; // Limite mais distante que a câmera pode ver

    // Cria uma nova câmera perspectiva
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5; // Posiciona a câmera no eixo Z
    return camera; // Retorna a câmera criada
}

// Função para criar o renderizador
function createRenderer() {
    // Cria um novo renderizador WebGL
    const renderer = new THREE.WebGLRenderer();
    // Define o tamanho do renderizador
    renderer.setSize(SCENE_WIDTH, SCENE_HEIGHT);
    // Adiciona o elemento do renderizador ao corpo do documento
    document.body.appendChild(renderer.domElement);
    return renderer; // Retorna o renderizador criado
}

// Função para criar um cubo
function createCube(color) {
    // Define a geometria do cubo
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // Define o material do cubo
    const material = new THREE.MeshBasicMaterial({ color });
    // Cria o cubo
    const cube = new THREE.Mesh(geometry, material);
    return cube; // Retorna o cubo criado
}

// Função principal
function main() {
    // Cria a cena
    const scene = createScene();
    // Cria a câmera
    const camera = createCamera();

    // Cria os cubos
    const cube1 = createCube(0xff0000); // Cubo vermelho
    const cube2 = createCube(0x00ff00); // Cubo verde
    const cube3 = createCube(0x0000ff); // Cubo azul

    // Adiciona os cubos à cena
    scene.add(cube1);
    scene.add(cube2);
    scene.add(cube3);

    // Cria o renderizador
    const renderer = createRenderer();

    // Cria o efeito de contorno
    const effect = new OutlineEffect(renderer);
    effect.setSize(SCENE_WIDTH, SCENE_HEIGHT);

    /**
     * Animate
     */
    const clock = new THREE.Clock(); // Cria um novo relógio

    const tick = () => {
        const elapsedTime = clock.getElapsedTime(); // Obtém o tempo decorrido desde a criação do relógio

        // Atualiza os objetos
        camera.position.x = Math.cos(elapsedTime); // Move a câmera no eixo X
        camera.position.y = Math.sin(elapsedTime); // Move a câmera no eixo Y
        camera.lookAt(cube1.position); // Faz a câmera olhar para o cubo1

        // Faz os cubos girarem
        cube1.rotation.x += 0.01;
        cube1.rotation.y += 0.01;
        cube2.rotation.x += 0.01;
        cube2.rotation.y += 0.01;
        cube3.rotation.x += 0.01;
        cube3.rotation.y += 0.01;

        // Move os cubos 2 e 3 para fora e depois de volta para o cubo 1
        const distance = Math.sin(elapsedTime) * 2;
        cube2.position.x = distance;
        cube3.position.x = -distance;

        // Renderiza a cena
        effect.render(scene, camera);

        // Chama a função tick novamente no próximo frame
        window.requestAnimationFrame(tick);
    }

    tick(); // Chama a função tick pela primeira vez
}

// Chama a função principal
main();