// console.log(document.body)

var objects = [
   'P3(0)', 'P3(1)', 'P3(2)', 
   'P4(0)', 'P4(1)', 'P4(2)', 
   'P5(0)', 'P5(1)', 'P5(2)', 
   'P6(0)', 'P6(1)', 'P6(2)', 
   'P7(0)', 'P7(1)', 'P7(2)']

// var objects = [
//    'P1(0)', 'P1(1)', 'P1(2)', 
//    'P2(0)', 'P2(1)', 'P2(2)', 
// ]
var promiseArray = [];
// var i =
// for (var i = 0; i<objects.length; i++){
//    promiseArray.push(set3DModel('sketches', objects[i]));
// }

// objects.forEach(task => {
//    result = result.then(() => task());
//  });


// set3DModel('sketches', objects[0]).then(() => console.log('HELLO'));

//    var result = Promise.resolve();
//   tasks.forEach(task => {
//     result = result.then(() => task());
//   });
//   return result;

// var f = x => new Promise(resolve => setTimeout(() => resolve(console.log(x)), 2000))

// (async () => {
//     for (let job of objects.map(x => () => set3DModel('sketches', x)))
//         await job()
// })()





function set3DModel(idElement, path, width, height){


   return new Promise((resolve, reject) => {
      // <div class="col m4"></div>

      // var div = document.createElement("div");
      // div.setAttribute('class', 'col m4')
      // document.getElementById(idElement).appendChild(div);



    
      console.log(width, height)

      var element = document.getElementById(idElement)

      //REMOVE CHILDREN
      while (element.firstChild) {
         element.removeChild(element.firstChild);
      }


      var scene = new THREE.Scene();
      // scene.background = new THREE.Color( 0xffffff );
      var camera = new THREE.PerspectiveCamera( 75, width/ height, 0.1, 1000 );
      camera.position.set(0, -2,2); // Set position like this
      camera.lookAt(new THREE.Vector3(0,0,0));




      
      var renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize( width-50, height-150 );
      // renderer.antialias= true;
      element.append( renderer.domElement );
      // camera.position.z = 1;

      

      var controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
				controls.dampingFactor = 0.05;
				controls.screenSpacePanning = false;
				// controls.minDistance = 100;
				// controls.maxDistance = 500;
            controls.maxPolarAngle = Math.PI / 2;
            controls.minPolarAngle = Math.PI / 2;
      // controls.enableDamping = true;
      // controls.dampingFactor = 0.25;
      // controls.enableZoom = true;
      // controls.autoRotate = true;

      // controls.minPolarAngle = -Math.PI/2;
      // controls.maxPolarAngle = Math.PI/2;
      // controls.maxPolarAngle = Math.PI/2; 
      
      // controls.minAzimuthAngle = 0//Math.PI/2;
      // controls.maxAzimuthAngle = 0//Math.PI/2;

      // controls

// console.log('HELLO', controls)
         
      
      var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(100, 100%, 100%)'), 1.0);
      keyLight.position.set(-10, 0, 10);

      var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(100, 100%, 100%)'), 0.75);
      fillLight.position.set(10, 0, 10);

      var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
      backLight.position.set(10, 0, -10).normalize();

      scene.add(keyLight);
      scene.add(fillLight);
      scene.add(backLight);

      // scene.add(new THREE.CameraHelper(camera)) 
//       var light = new THREE.AmbientLight( 0x404040 ); // soft white light
// scene.add( light );

//       var light = new THREE.PointLight( 0xff0000, 1, 100 );
//       light.position.set( 50, 50, 50 );
//       scene.add( light );


      var geometry = new THREE.PlaneGeometry( 5, 5, 32 );
      var material = new THREE.MeshBasicMaterial( {color: 0xebebeb, side: THREE.DoubleSide} );
      var plane = new THREE.Mesh( geometry, material );
      
      plane.rotation.set(-Math.PI/2, Math.PI/2000, Math.PI); 
      plane.position.y = -1;
      scene.add( plane );

      // console.log(scene)

      var mtlLoader = new THREE.MTLLoader();
      
      mtlLoader.setTexturePath('object/userObj/');
      mtlLoader.setPath('object/userObj/');
      mtlLoader.load('bmp.mtl', function (materials) {

         materials.preload();

         var objLoader = new THREE.OBJLoader();
         objLoader.setMaterials(materials);
         objLoader.setPath('object/userObj/');
         objLoader.load(path+'.obj', function (object) {

            scene.add(object);
            // object.position.y -= 60;
            // object.children[0].scale.set(50,50,50)


            var cent = new THREE.Vector3();
            var size = new THREE.Vector3();
            var bbox = new THREE.Box3().setFromObject(object);
            bbox.getCenter(cent);
            bbox.getSize(size);
      
            //Rescale the object to normalized space
            var maxAxis = Math.max(size.x, size.y, size.z);
            object.scale.multiplyScalar((1.0 / maxAxis) + 0.5);
            // object.scale.multiplyScalar(30)
            //Now get the updated/scaled bounding box again..
            bbox.setFromObject(object);
            bbox.getCenter(cent);
            bbox.getSize(size);
      
            object.position.x = -cent.x;
            object.position.y = 0;
            object.position.z = -cent.z;

            // object.rotation.x = 90 * (Math.PI / 180)
            // object.rotation.y = -90 * (Math.PI / 180)
            

            controls.target = object.position;
            // camera.lookAt(scene.position);
            // camera.rotation.z = 65 * (Math.PI / 180)

            // console.log(object)
            resolve()

         });

      });
      var animate = function () {
         requestAnimationFrame( animate );
         controls.update();

         renderer.render(scene, camera);
         // camera.rotation.z +=0.1;
         // var speed = Date.now() * 0.00025;
         // camera.position.y = Math.cos(speed) * 10;
         // camera.position.x = Math.sin(speed) * 10;
      };

      animate();

   })

  
}