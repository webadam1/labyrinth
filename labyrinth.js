const MAZE_SIZE = 10;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const screensize = Math.min(window.innerWidth, window.innerHeight / 2 * 3)
const width = (window.innerWidth / screensize) * MAZE_SIZE;
const height = (window.innerHeight / screensize) * MAZE_SIZE;
var camera2 = new THREE.OrthographicCamera(-width, width, height, -height, -500, 500);
camera2.position.x = 5;
camera2.position.y = 5;
camera2.position.z = 5;
camera2.lookAt(0, 0, 0);
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
camera.lookAt(0, 0, 0);
scene.add(camera);
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshStandardMaterial({ color: 0xffffff });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.x = 5;
scene.add(directionalLight);
var light = new THREE.AmbientLight(0xffffff, 0.3); // soft white light
scene.add( light )
window.addEventListener('load', () => {
    document.body.appendChild( renderer.domElement );
    const maze = new Maze();
    maze.fields[8][9].setIsWall(false);
    maze.fields[1][0].setIsWall(false);
    renderer.render(scene, camera2);
});

class Field {
    constructor(maze, x, y) {
        this.maze = maze;
        this.x = x;
        this.y = y;
        this.isWall = true;
        this.isFinal = false;
        this.cube = new THREE.Mesh(geometry, material);
        this.cube.position.x = x;
        this.cube.position.z = y;
    }

    addToScene(scene) {
        scene.add(this.cube);
    }

    setIsWall(shouldBeWall) {
        this.isWall = shouldBeWall;
        this.cube.visible = shouldBeWall;
    }
}

class Maze {
    constructor() {
        this.built = false;
        this.fields = new Array(MAZE_SIZE);
        for(let i = 0; i < MAZE_SIZE; i++) {
            this.fields[i] = new Array(MAZE_SIZE);
            for(let j = 0; j < MAZE_SIZE; j++) {
                const field = new Field(this, i - MAZE_SIZE / 2, j - MAZE_SIZE / 2);
                field.addToScene(scene);
                this.fields[i][j] = field;
            }
        }
    }
}