let createGameScene = function (canvas, engine) {
  // Create scene
  let scene = new BABYLON.Scene(engine);
  scene.gravity = new BABYLON.Vector3(0, -.1, 0);
  scene.enablePhysics(scene.gravity, new BABYLON.CannonJSPlugin());

  // Create camera
  let camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(2, 2, 2), scene);
  camera.attachControl(canvas, true);
  camera.setTarget(BABYLON.Vector3.Zero());

  // 87 corresponds to 'w'
  // 83 corresponds to 's'
  // 65 corresponds to 'a'
  // 68 corresponds to 'd'
  // See more JavaScript KeyCodes here: https://keycode.info/
  camera.keysUp.push(87);
  camera.keysDown.push(83);
  camera.keysLeft.push(65);
  camera.keysRight.push(68);

  camera.speed = .5;
  camera.fov = 0.8;
  camera.inertia = 0;

  // create an ellipsoid around the camera (this will collide with other objects, such as the `sphere`. This makes it so we can't walk inside of the sphere)
  camera.ellipsoid = new BABYLON.Vector3(1.5, 0.5, 1.5);
  camera.checkCollisions = true;
  camera.applyGravity = true;
  camera.collisionsEnabled = true;

  // Create lights
  let light = new BABYLON.HemisphericLight("myLight", new BABYLON.Vector3(1, 1, 0), scene);

  // Create ground
  let plane = BABYLON.MeshBuilder.CreatePlane("ground", {
    height: 20,
    width: 20
  }, scene)
  plane.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.WORLD);
  plane.position.y = -2;
  let groundPhysicsImposter = new BABYLON.PhysicsImpostor(
    plane,
    BABYLON.PhysicsImpostor.BoxImpostor,
    {
        mass: 0,
        friction: 0.1, 
        restitution: .7
    },
    scene
  );
  plane.collisionsEnabled = true;
  plane.checkCollisions = true;

  // Create sphere
  let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene);
  let spherePhysicsImposter = new BABYLON.PhysicsImpostor(
    sphere,
    BABYLON.PhysicsImpostor.BoxImpostor,
    {
      mass: 1, 
      friction: 0.1, 
      restitution: .85
    },
    scene
  );
  sphere.collisionsEnabled = true;
  sphere.checkCollisions = true;
  return scene;
};

export {
  createGameScene
};