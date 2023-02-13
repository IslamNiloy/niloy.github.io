import * as THREE from 'three';
import "./style.css"
import gsap from 'gsap';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
//Scene
const scene =new THREE.Scene();

// create Shpere
const geometry = new THREE.SphereGeometry(3,64,64);
const material = new THREE.MeshStandardMaterial({
  color:'#00ff83',
  roughness: 0.2
})
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh)

//Sizes
const sizes={
  width:window.innerWidth,
  height:window.innerHeight,
}

//Light
const light = new THREE.PointLight(0xfffff,1,100);
light.position.set(0,10,10);
scene.add(light)

//Camera
const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height,0.1,100);
camera.position.z =20;
scene.add(camera);

//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width,sizes.height);
renderer.getPixelRatio(2)
renderer.render(scene,camera);

//controls
const controls= new OrbitControls(camera,canvas)
controls.enableDamping=true
controls.enablePan=true
controls.enableZoom=true
controls.autoRotate=true
controls.autoRotateSpeed=10


//Resize
window.addEventListener("resize",()=>{
  //update Sizes
  sizes.width=window.innerWidth
  sizes.height=window.innerHeight

  //update Camera
  camera.aspect=sizes.width/sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width,sizes.height)
})
const loop = ()=>{
  controls.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
}
loop()

//Timeline magic
