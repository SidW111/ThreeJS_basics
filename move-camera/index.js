//1. Scene
const scene = new THREE.Scene();

//creating a object
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: "red" });

//2. Object
const box = new THREE.Mesh(geometry, material);

//adding the object to the scene.
scene.add(box);

//specifying aspect ratio for the camera
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//3. Camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 4;

//adding the camera to the scene
scene.add(camera);

//canvas for rendering
const target = document.querySelector(".wbgl");

//4. Rendering
const renderer = new THREE.WebGLRenderer({ canvas: target });

renderer.setSize(size.width, size.height);

let clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  box.rotation.y = elapsedTime;
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
