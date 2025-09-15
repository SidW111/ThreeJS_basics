import * as THREE from "three";

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const aspectRatio = size.width / size.height;
const target = document.querySelector(".webgl");

//scene
const scene = new THREE.Scene();

//object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "blue" });

const box = new THREE.Mesh(geometry, material);

scene.add(box);

//camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio);
camera.position.z = 4;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas: target });

renderer.setSize(size.width, size.height);
renderer.render(scene, camera);
