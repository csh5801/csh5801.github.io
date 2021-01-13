    const config = {
        type: Phaser.AUTO,
        pixelArt: true,
        width: 600,
        height: 400,
        physics: {
            default: "arcade" ,
            arcade: {
                gravity: { y: 0 } ,
                debug: false
            }
        } ,
        scene: { preload, create, update }
    }

    const game = new Phaser.Game(config)

    let ball;
    let ground;
    let spike;

    function preload() {
        this.load.image("ball", "assets/ball.png")
        this.load.image("spike", "assects/spike.png")
        this.load.image("ground", "assects/ground.png")
    }
    function bounce() {
       ball.setVelocityY(-250)
    }

    function create() {
        ball = this.physics.add.sprite(100, 100, "ball")
        ground = this.physics.add.sprite(100, 300, "ground") 
        spikes = this.physics.add.group()
        
        ground.setImmovable(true)
        ball.body.gravity.y = 200;
        ball.setBounce(1)
 
    for (let i = 0; i < 10; i++) {
        let x = 600 + 50 * i;
        let y = ground.getBounds().top
        console.log(y)
        let spike = spikes.create(x, y, "spike")
    }
    
    spikes.setVelocityX(-100);

        this.physics.add.collider(ground, ball, bounce)

         this.input.on("pointerdown", () => {
             ball.setVelocityY(1000)
         })
    }
        
     
    function update() {
      spikes.getChildren().forEach((spike) => {
        if (spike.getBounds().right < 0) {
          spike.x = 600
        }
      })
    }