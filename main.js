import './style.scss';

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
document.body.appendChild( renderer.domElement );
renderer.setClearColor( 0x000000, 0 );
renderer.setSize( document.querySelector('canvas').clientWidth, document.querySelector('canvas').clientHeight );

const camera = new THREE.PerspectiveCamera( 75, document.querySelector('canvas').clientWidth / document.querySelector('canvas').clientHeight, 0.1, 1000 );
const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x4a220d, 3 );
				hemiLight.position.set( 0, 20, 0 );
				scene.add( hemiLight );

camera.position.z = 60;
const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0, 0 );
controls.update();
controls.enablePan = false;
controls.enableDamping = true;

const loader = new GLTFLoader();

const onResize = ( renderer, camera ) => {
	const width = document.querySelector('canvas').clientWidth;
	const height = document.querySelector('canvas').clientHeight;
	renderer.setSize( width, height );
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
}

window.addEventListener( 'resize', () => onResize( renderer, camera ) );

loader.load( 'maison.gltf', gltf => {
	scene.add( gltf.scene );
	gltf.scene.rotation.y = Math.PI * 1.5;
	gltf.scene.rotation.z = Math.PI * 1.9;
	console.log( gltf );

	const animate = () => {
		controls.update();
		gltf.scene.rotation.y = gltf.scene.rotation.y + 0.01;
		renderer.render( scene, camera );
	}
	renderer.setAnimationLoop( animate );

}, undefined, function ( error ) {
	console.error( error );
} );