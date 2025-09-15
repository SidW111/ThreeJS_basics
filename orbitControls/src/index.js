import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

//size
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const aspectRatio = size.width / size.height;
//the canvas
const target = document.querySelector(".wbgl");

//1 scene
const scene = new THREE.Scene();

//2 object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const box = new THREE.Mesh(geometry, material);

//add the object to the scene
scene.add(box);

//3 camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio);
camera.position.z = 4;

//add the camera to the scene
scene.add(camera);

//4 render
const renderer = new THREE.WebGLRenderer({ canvas: target });

//set renderer size
renderer.setSize(size.width, size.height);

const clock = new THREE.Clock();

const controls = new OrbitControls(camera, target);
controls.enableDamping= true;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  //   box.position.y = Math.sin(elapsedTime) * 2;
  //   box.position.x = Math.cos(elapsedTime) * 2;
  
  controls.update()
  requestAnimationFrame(tick);
  //render the scene,camera
  renderer.render(scene, camera);
};
tick();
