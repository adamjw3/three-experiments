var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var geometry = new THREE.PlaneGeometry(5, 10, 12);
var material = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  side: THREE.DoubleSide,
});

var plane = new THREE.Mesh(geometry, material);
scene.add(plane);

camera.position.z = 10;

function animate() {
  renderer.render(scene, camera);
}
animate();
