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
let platforms;
let score = 0;
let scoreText;
 
function bounce() {
    ball.setVelocityY(-600)
}

function preload() {
    this.load.image("ball", "assets/ball.png")
    this.load.image("platform", "assets/platform.png")
}

function create() {
    scoreText = this.add.text(16, 16, "Score : 0")
    ball = this.physics.add.sprite(100, 100, "ball")
    platforms = this.physics.add.group() 

let platformX = 250;
for(let i = 0; i < 5; i++) {
    let platform = platforms.create(platformX, 300, "platform")
    platformX += Phaser.Math.Between(100, 250)
    platform.setImmovable(true)
    platform.setVelocityX(-250)
}


    ball.setGravityY(1000);

    this.physics.add.collider(ball, platforms, bounce)

    
    this.input.on("pointerdown", () => {
        ball.setVelocityY(1000)
  })
}

function update() {
    if (ball.getBounds().bottom > 400) {
        this.scene.restart()
        score = 0
    }

    platforms.getChildren().forEach((platform) => {
        if (platform.getBounds().right < 0) {
          score += 1  
          scoreText.setText(`Score: ${score}`);
          let end = 0;
          platforms.getChildren().forEach((platform) => {
              end = Math.max(platform.x, end)
          })  
          
          platform.x = end + Phaser.Math.Between(100, 250);
        }
      })
}