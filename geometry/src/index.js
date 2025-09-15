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
        document.exitFullscreen();
    }
})

//scene
const scene = new THREE.Scene();

//object
const geometry = new THREE.BoxGeometry(1, 1, 1, 3,3,3);
const material = new THREE.MeshBasicMaterial({ color: "red",wireframe:true });
const box = new THREE.Mesh(geometry, material);
scene.add(box);

//camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio);
camera.position.z = 4;
scene.add(camera);

//renderer
const renderer = new THREE.WebGLRenderer({ canvas: target });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(2,window.devicePixelRatio))

const controls = new OrbitControls(camera, target);
controls.enableDamping = true;

window.addEventListener('resize',()=>{
    size.width = window.innerWidth;
    size.height = window.innerHeight;

    camera.aspect = size.width/size.height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(size.width,size.height)
})

const tick = () => {
  controls.update();
  requestAnimationFrame(tick);
  renderer.render(scene, camera);
};
tick();
