import * as THREE from "three";

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const canvas = document.querySelector(".webgl");

//scene
const scene = new THREE.Scene();

//object
// const geometry = new THREE.SphereGeometry(1, 32, 32);
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//camera
const camera = new THREE.OrthographicCamera(75, size.width, size.height);
camera.position.z = 4;
scene.add(camera);


//renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(size.width, size.height);
renderer.render(scene,camera);
