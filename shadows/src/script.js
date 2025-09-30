import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const canvas = document.querySelector(".webgl");

//scene
const scene = new THREE.Scene();

//object
// const geometry = new THREE.SphereGeometry(1, 32, 32);
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshDepthMaterial({});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const planeGeometry = new THREE.PlaneGeometry(5,5)
const plane = new THREE.Mesh(planeGeometry,material)
plane.position.y = -1.5
plane.rotation.x = -Math.PI * 0.5


scene.add(plane)
//camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 4;
scene.add(camera);

//renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.render(scene, camera);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};
tick();
