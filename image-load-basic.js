var scene = new THREE.Scene();

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

// Use the values specified above to create a camera
var camera = new THREE.PerspectiveCamera(
  fieldOfView,
  aspectRatio,
  nearPlane,
  farPlane
);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var loader = new THREE.TextureLoader();

// Load an image file into a custom material
/*var material = new THREE.MeshLambertMaterial({
  map: loader.load(
    "https://s3.amazonaws.com/duhaime/blog/tsne-webgl/assets/cat.jpg"
  ),
});*/

var material = new THREE.MeshBasicMaterial({
  map: loader.load(
    "https://s3.amazonaws.com/duhaime/blog/tsne-webgl/assets/cat.jpg"
  ),
});

//PlaneGeometry(width : Float, height : Float, widthSegments : Integer,
var geometry = new THREE.PlaneGeometry(1, 1);

// combine our image geometry and material into a mesh
var mesh = new THREE.Mesh(geometry, material);

// set the position of the image mesh in the x,y,z dimensions
mesh.position.set(0, 0, 0);

// add the image to the scene
scene.add(mesh);

// Add a point light with #fff color, .7 intensity, and 0 distance
var light = new THREE.PointLight(0xffffff, 1, 0);

// Specify the light's position
light.position.set(1, 1, 100);

// Add the light to the scene
scene.add(light);

camera.position.z = 5;

function animate() {
  renderer.render(scene, camera);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  mesh.scale.x += 0.01;
  mesh.scale.y += 0.01;
  requestAnimationFrame(animate);
}
animate();
