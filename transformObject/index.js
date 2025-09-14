//1. Scene
const scene = new THREE.Scene();

// //creating a object
// const geometry = new THREE.BoxGeometry(2, 2, 2);
// const material = new THREE.MeshBasicMaterial({ color: "red" });

//2. Object
// const box = new THREE.Mesh(geometry, material);

//adding the object to the scene.
// scene.add(box);

const group = new THREE.Group();

scene.add(group);

const box1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "blue" })
);
box1.position.x = -2

group.add(box1);
const box2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "green" })
);
group.add(box2);

const box3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "red" })
);
box3.position.x = 2
group.add(box3);

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
renderer.render(scene, camera);
