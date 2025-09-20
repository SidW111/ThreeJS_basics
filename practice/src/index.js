import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
import gsap from "gsap";

const gui = new GUI({
  
  title:"Debug UI",
  closeFolders:true
});
const guiProps = {};
const scrollables = gui.addFolder("Scrollable");
const checks = gui.addFolder("checkbox");
const color = gui.addFolder("color");
color.close();
scrollables.close();
checks.close();
window.addEventListener('keydown',(e)=>{
if(e.key === 'h') {
  gui.show(gui._hidden)
}
})



const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const aspectRatio = size.width / size.height;

const target = document.querySelector(".webgl");

//fullscreen
window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    target.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

//scene
const scene = new THREE.Scene();

//object
guiProps.color = "#ff0000";
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: guiProps.color,
  wireframe: true,
});

const box = new THREE.Mesh(geometry, material);

scene.add(box);
scrollables.add(box.position, "x").min(-3).max(3).name("position X");
scrollables.add(box.position, "y").min(-3).max(3).name("position Y");
scrollables.add(box.position, "z").min(-3).max(3).name("position Z");

checks.add(material, "wireframe");
checks.add(box, "visible");

color.addColor(guiProps, "color").onChange(() => {
  material.color.set(guiProps.color);
});

guiProps.spin = () => {
  gsap.to(box.rotation, {
    delay: 1,
    y: box.rotation.y + Math.PI * 2,
    duration: 3,
  });
};

gui.add(guiProps, "spin");

guiProps.segment = 2;

scrollables
  .add(guiProps, "segment")
  .onChange(() => {
    box.geometry.dispose();
    box.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      guiProps.segment,
      guiProps.segment,
      guiProps.segment
    );
  })
  .min(1)
  .max(15)
  .step(1);

//camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio);
camera.position.z = 4;
scene.add(camera);

//render
const renderer = new THREE.WebGLRenderer({ canvas: target });
renderer.setSize(size.width, size.height);

//OrbitControls
const controls = new OrbitControls(camera, target);
controls.enableDamping = true;

//resizing
window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
});

const tick = () => {
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(tick);
};

tick();
