var game = {
		    scene: null,
		    camera: null,
		    renderer: null,
		    controls: null,
		    stats: null,
		    hero: null,

		    init: function() {

		    	/* Detect WebGL and get renderer */
		    	if(Detector.webgl) {
					this.renderer = new THREE.WebGLRenderer({
						antialias: true,	
						preserveDrawingBuffer: true
					});

					this.renderer.setClearColor(0x009CFF);

				} else {
					this.renderer = new THREE.CanvasRenderer();
				}
                
				this.renderer.setSize( window.innerWidth, window.innerHeight );

				this.renderer.shadowMapEnabled = true;
				this.renderer.shadowMapSoft = true;

				document.getElementById('container').appendChild(this.renderer.domElement);

				// add Stats.js - https://github.com/mrdoob/stats.js
				this.stats = new Stats();
				this.stats.domElement.style.position = 'absolute';
				this.stats.domElement.style.bottom = '0px';
				document.body.appendChild(this.stats.domElement);

				/* Init Scene */
				this.scene = new THREE.Scene();

				/* Put a camera in the scene */
				this.camera	= new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 200);
				this.camera.position.set(0, 3, 5);
				this.scene.add(this.camera);

                /* Resize window */
                THREEx.WindowResize.bind(this.renderer, this.camera);
                
				/* Simple ambient light */
				var ambientLight = new THREE.AmbientLight(0x404040);
				this.scene.add(ambientLight);

				/* Oh, the sun */
				var sunLight = new THREE.DirectionalLight(0xFFFFFF);
				sunLight.position.set(0, 10, 20);

                //sunLight.castShadow = true;
                
				this.scene.add(sunLight);

				/* Add our Hero */
				this.hero = new THREE.Mesh(new THREE.CubeGeometry(1,1,1), new THREE.MeshLambertMaterial({color: 0x00FF00}));
				this.scene.add(this.hero);

				generateBoxes();

				/* Add ground */
				var grassTexture = THREE.ImageUtils.loadTexture('images/grass.png');
				grassTexture.wrapS = THREE.RepeatWrapping; 
				grassTexture.wrapT = THREE.RepeatWrapping; 
				grassTexture.repeat.x = 256; 
				grassTexture.repeat.y = 256;

				var planeGeometry = new THREE.PlaneGeometry(200, 200);
				var ground = new THREE.Mesh(planeGeometry, new THREE.MeshLambertMaterial({map: grassTexture}));

				ground.position.y = -1.9; 
				ground.rotation.x = -Math.PI/2; 
                
                ground.receiveShadow = true;

				ground.doubleSided = true; 
				this.scene.add(ground); 

				this.camera.lookAt(this.hero.position);
		    }
		};

		function animate() {
		    requestAnimationFrame(animate);
		    render();
		    update();
		}

		function update() {
		    //game.controls.update();
		    game.stats.update();
		  //  game.camera.lookAt(game.hero.position);
		}

		function render() {
		    if (game.renderer)
		        game.renderer.render(game.scene, game.camera);
		}

		/* "Main" */
		$(function() {
  			game.init();
		    animate();

		    $(document).keydown(function(ev) {

		    	switch(String.fromCharCode(ev.keyCode)) {
		    		case 'W':
		    			game.hero.position.z-=1;
                        socket.emit('pos', {id: game.hero.id, z: -1});
		    		break;

		    		case 'A':
		    			game.hero.position.x-=1;
                        socket.emit('pos', {id: game.hero.id, x: -1});
		    		break;

		    		case 'S':
		    			game.hero.position.z+=1;
                        socket.emit('pos', {id: game.hero.id, z: 1});
		    		break;

		    		case 'D':
		    			game.hero.position.x+=1;
                        socket.emit('pos', {id: game.hero.id, x: 1});
		    		break;

		    		case 'R':
		    			game.hero.rotation.y+=0.1;
		    		break;
		    	}

		    	game.camera.position.set(game.hero.position.x, 3, game.hero.position.z + 5);
		    	game.camera.lookAt(game.hero.position);
		    });
            
            
            initNetwork();
            
		});

		function generateBoxes() {

			for(var i = 0; i < 10; i++) {
				var myBox = new THREE.Mesh(new THREE.CubeGeometry(2,20,2), new THREE.MeshLambertMaterial({color: Math.random()*0xFF0000}));
				
				var desv = Math.random() > 0.5 ? 1 : -1;

				myBox.position.x = Math.random()*200 - 100;
				myBox.position.z = Math.random()*200 - 100;
                
                myBox.castShadow = true;
                
				game.scene.add(myBox);
			}
		}