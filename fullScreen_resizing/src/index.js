import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const aspectRatio = size.width / size.height;
const target = document.querySelector(".webgl");

window.addEventListener('dblclick',()=>{
   if(!document.fullscreenElement){
    target.requestFullscreen()
   }else{
    document.exitFullscreen()
   }
})          

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
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

window.addEventListener("resize", () => {
  size.width = innerWidth;
  size.height = innerHeight;
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
});

const controls = new OrbitControls(camera, target);
controls.enableDamping = true;


const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  // box.position.z += 0.01;

  //   box.position.y = Math.sin(elapsedTime);
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
