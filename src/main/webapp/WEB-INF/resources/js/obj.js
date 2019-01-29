var camera, controls, scene, renderer;

init();

animate();

// 加载进度

var onProgress = function(xhr) {

    if (xhr.lengthComputable) {

        var percentComplete = xhr.loaded / xhr.total * 100;

        var percent = document.getElementById("jstree");

        percent.innerText = Math.round(percentComplete, 2) + '% 已经加载';

    }

};

var onError = function(xhr) {};

//当mtl中引用了dds类型的图片时，还需导入DDSLoader文件

// THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

//mtl文件加载器

var mtlLoader = new THREE.MTLLoader();

//你的模型材质文件的目录地方路径

mtlLoader.setPath(locationPath+'/imgs/');

//导入材质文件

mtlLoader.load('543ae7255e6a8.mtl', function(materials) {

    materials.preload();

    //ob文件加载器

    var objLoader = new THREE.OBJLoader();

    objLoader.setMaterials(materials);

//你的模型文件的目录地方路径

    objLoader.setPath(locationPath+'/imgs/');

    objLoader.load('543ae7257d2af.obj', function(object) {

//这里的object参数就是模型加载方法的回调函数，object就是你的模型，下面的属性自行设置

        // object.position.y = 0;
        //
        // object.rotation.x = -90;
        //
        // object.rotation.y = 90;
        //
        // object.rotation.z = 90;

        //自行调整模型比例

        object.scale.set(1, 1, 1);

        //加入到场景中
        scene.add(object);

    }, onProgress, onError);

});



function init() {

    //创建一个透视相机，设置相机视角60度，最远能看1000，最近能看1

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );

    camera.position.set( 0, 200, 400 );//设置相机位置

    //控制相机

    controls = new THREE.OrbitControls( camera );

    //设置相机移动距离

    controls.minDistance = 100;

    controls.maxDistance = 900;

    //创建场景

    scene = new THREE.Scene();

    //设置场景背景色，灰色

    scene.background = new THREE.Color( 0xeeeeee );

    //场景中添加网格辅助

    scene.add( new THREE.GridHelper( 400, 10 ) );

// 灯光

// 给场景添加一个环境光

    var ambientLight = new THREE.AmbientLight( 0xfff );

    scene.add( ambientLight );

// 给场景添加一个半球光出来

    hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.8 );

    hemiLight.color.setHSL( 0.6, 1, 0.6 );

    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );

    hemiLight.position.set( 0, 50, 0 );

    scene.add( hemiLight );

// 给场景添加一个平行光出来

    dirLight = new THREE.DirectionalLight( 0xffffff, 0.8 );

    dirLight.color.setHSL( 0.1, 1, 0.95 );

    dirLight.position.set( -1, 1.75, 1 );

    dirLight.position.multiplyScalar( 30 );

    scene.add( dirLight );

    dirLight.castShadow = true;

    //实例化一个渲染器s

    renderer = new THREE.WebGLRenderer( { antialias: true } );

    renderer.setPixelRatio( window.devicePixelRatio );

    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    //每一帧渲染一次画面,不然画面是静止的

    requestAnimationFrame( animate );

    renderer.render( scene, camera );

}