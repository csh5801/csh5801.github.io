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
        
        ground.setImmovable(true)
        ball.body.gravity.y = 200;
        ball.setBounce(1)
        
        this.physics.add.collider(ground, ball, bounce)
        

         this.input.on("pointerdown", () => {
             ball.setVelocityY(1000)
         })
    }
        
     
    function update() {}