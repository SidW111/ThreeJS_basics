import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import typeFaceFont from "three/examples/fonts/helvetiker_regular.typeface.json";
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const canvas = document.querySelector(".webgl");

//scene
const scene = new THREE.Scene();

//texture
const textureLoader = new THREE.TextureLoader();

//fonts
const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
const textGeometry = new TextGeometry("Savior", {
  font: font,
  // size: 0.5,
  // height: 0.2,
  curveSegments:12,
  bevelEnabled: true,
  bevelThickness: 0.02,
  bevelSize: 0.02,
  bevelSegments: 3,
  
});
  textGeometry.center()

  const textMaterial = new THREE.MeshNormalMaterial({ });
  const text = new THREE.Mesh(textGeometry, textMaterial);

  scene.add(text);
});

const axesHelper= new THREE.AxesHelper()
scene.add(axesHelper)

//object
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: "red" });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

//camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 50;
scene.add(camera);

//render
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera);
});

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};
tick();
