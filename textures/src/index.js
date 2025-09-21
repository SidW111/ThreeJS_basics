import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const aspectRatio = size.width / size.height;
const target = document.querySelector(".webgl");

//scene
const scene = new THREE.Scene();

//Object
const textureLoader = new THREE.TextureLoader()
const color  = textureLoader.load('/textures/doors/color.jpg')
color.colorSpace =  THREE.SRGBColorSpace
// color.minFilter = true;


const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map:color });


const box = new THREE.Mesh(geometry, material);
scene.add(box);

//camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio);
camera.position.z = 4;
scene.add(camera);

const controls = new OrbitControls(camera, target);
controls.enableDamping = true;

//renderer
const renderer = new THREE.WebGLRenderer({ canvas: target });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

//resize
window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

});

const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
