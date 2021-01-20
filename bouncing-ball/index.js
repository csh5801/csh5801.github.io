    const config = {
        type: Phaser.AUTO,
        pixelArt: true,
        width: 750,
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
    let spikes;
    let scoreText;
    let score = 0;
    
    
    
    function hitSpike() {
        this.scene.restart()
        score = 0;
    }

    function preload() {
        this.load.image("ball", "assets/ball.png")
        this.load.image("spike", "assets/spike.png")
        this.load.image("ground", "assets/ground.png")
    }
    function bounce() {
       ball.setVelocityY(-600)
    }

    function create() {
        scoreText = this.add.text(16, 16, "score : 0")
        ball = this.physics.add.sprite(100, 100, "ball")
        ground = this.physics.add.sprite(375, 300, "ground") 
        spikes = this.physics.add.group()
        
        ground.setImmovable(true)
        ball.body.gravity.y = 1000;
        ball.setBounce(1)
 
    let spikeX = 750;
    for (let i = 0; i < 10; i++) {
        spikeX += Phaser.Math.Between(100, 250)
        let y = ground.getBounds().top - 20
        console.log(y)
        let spike = spikes.create(spikeX, y, "spike")
        spike.setImmovable(true)
    }
    
        this.physics.add.collider(ball, spikes, hitSpike, null, this)
    
    spikes.setVelocityX(-100);

        this.physics.add.collider(ground, ball, bounce)

         this.input.on("pointerdown", () => {
             ball.setVelocityY(1000)
         })
    }
        
     
    function update() {
      spikes.getChildren().forEach((spike) => {
        if (spike.getBounds().right < 0) {
          score += 1
          scoreText.setText(`Score: ${score}`);
          let end = 0;
          spikes.getChildren().forEach((spike) => {
              end = Math.max(spike.x, end)
          })  
          
          spike.x = end + Phaser.Math.Between(100, 250);
        }
      })
    }