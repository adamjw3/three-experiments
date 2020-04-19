// Field of view, Seems to always be 75
var fieldOfView = 75;

// Specify the camera's aspect ratio
var aspectRatio = window.innerWidth / window.innerHeight;

// Specify the near and far clipping planes. Only objects
// between those planes will be rendered in the scene
// (these values help control the number of items rendered
// at any given time)
var nearPlane = 0.1;
var farPlane = 1000;

var scene = new THREE.Scene();
// Use the values specified above to create a camera
var camera = new THREE.PerspectiveCamera(
  fieldOfView,
  aspectRatio,
  nearPlane,
  farPlane
);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
document.body.appendChild(renderer.domElement);

var loader1 = new THREE.TextureLoader();
var material1 = new THREE.MeshBasicMaterial({
  map: loader1.load("https://placekitten.com/1000/1000"),
});

var loader2 = new THREE.TextureLoader();
var material2 = new THREE.MeshBasicMaterial({
  map: loader2.load("https://placekitten.com/1500/1500"),
});

var loader3 = new THREE.TextureLoader();
var material3 = new THREE.MeshBasicMaterial({
  map: loader3.load("https://placekitten.com/1800/1800"),
});

var geometry = new THREE.PlaneBufferGeometry(1, 1);

// combine our image geometry and material into a mesh
var mesh = new THREE.Mesh(geometry, material1);
mesh.scale.set(100, 100, 1);
// set the position of the image mesh in the x,y,z dimensions
mesh.position.set(0, 0, 0);

var mesh2 = new THREE.Mesh(geometry, material2);
mesh2.position.set(-100, 0, 0);
mesh2.scale.set(50, 50, 1);

var mesh3 = new THREE.Mesh(geometry, material3);
mesh3.position.set(100, 0, 0);
mesh3.scale.set(50, 50, 1);
//mesh.position.set(-1, 0, 0);
// add the image to the scene
scene.add(mesh);
scene.add(mesh2);
scene.add(mesh3);

var light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

camera.position.set(0, 0, 200);
camera.lookAt(new THREE.Vector3(0, 0, 0)); // Set look at coordinate like this

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseMove(event) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function animate() {
  renderer.render(scene, camera);
  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // calculate objects intersecting the picking ray
  var intersects = raycaster.intersectObjects(scene.children);

  for (var i = 0; i < intersects.length; i++) {
    intersects[i].object.material.color.set(0xff0000);
  }

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("mousemove", onMouseMove, false);
