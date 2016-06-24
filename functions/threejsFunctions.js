/**
 * Created by Alanx on 6/18/16.
 */
console.log("threejsFunctions imported");

function renderAll(){
    renderCube();
}


function renderSquare()
{
    console.log("rendering square");
    // Grab container div
    var container = document.getElementById("containerSquare");

    // Create the Three.js renderer, add it to div
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild( renderer.domElement );

    // Create a new Three.js scene
    var scene = new THREE.Scene();

    // Create a camera and add it to the scene
    var camera = new THREE.PerspectiveCamera( 45,
        container.offsetWidth / container.offsetHeight, 1, 4000 );
    camera.position.set( 0, 0, 3.3333 );
    scene.add( camera );

    // Now, create a rectangle and add it to the scene
    var geometry = new THREE.PlaneGeometry(1, 1);
    var mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( ) );
    scene.add( mesh );

    // Render it
    renderer.render( scene, camera );
}


//TODO: remove global variables
var renderer = null,
    scene = null,
    camera = null,
    cube = null,
    animating = false;

function renderCube() {
    console.log("rendering cube");

    // Grab container div
    var container = document.getElementById("containerCube");

    // Create the Three.js renderer
    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setSize(container.offsetWidth, container.offsetHeight);

    // Turn background white
    renderer.setClearColor( 0xffffff, 0);

    // Add to div
    container.appendChild(renderer.domElement);

    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Put in a camera
    camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 1, 3000);
    camera.position.set(0, 0, 3);

    // Create a directional light to show off the object
    var light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(0, 0, 1);
    scene.add(light);

    // Create a shaded, texture-mapped cube and add it to the scene
    var mapUrl ="assets/images/aurora.jpg";
    var loader = new THREE.TextureLoader();
    var map = loader.load(mapUrl);

    // Now, create a Phong material to show shading; pass in the map
    var material = new THREE.MeshPhongMaterial({map: map});

    // Create the cube geometry
    var geometry = new THREE.CubeGeometry(1.0, 1.0, 1.0);

    // And put the geometry and material together into a mesh
    cube = new THREE.Mesh(geometry, material);

    // Turn it toward the scene
    cube.rotation.x = Math.PI / 5;
    cube.rotation.y = Math.PI / 5;

    // Add the cube to the scene
    scene.add(cube);

    // Add a mouse up handler to toggle the animation
    addMouseHandler();

    // Run render loop
    run();
}

function run()
{
    console.log("test");

    // Render the scene
    renderer.render( scene, camera );

    // Spin the cube for next frame
    if (animating)
    {
        cube.rotation.y -= 0.01;
    }

    // Ask for another frame
    requestAnimationFrame(run);
}

function addMouseHandler()
{
    var dom = renderer.domElement;

    dom.addEventListener( 'mouseup', onMouseUp, false);
}

function onMouseUp ( event )
{
    event.preventDefault();

    animating = !animating;
}

