const config = {
    type: Phaser.AUTO,
    pixelArt: true,
    width: 750,
    height: 1200,
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
let ballOnPlatform = true;
let score = 0;
let scoreText;

function topPlatform() {
    let topY = Infinity;
    let p

    platforms.getChildren().forEach((platform) => {
      topY = Math.min(platform.y, topY)
      if (topY === platform.y) {
          p = platform
      }
    })

    return p
}

function bottomY() {
    let bottom = 0;

    platforms.getChildren().forEach((platform) => {
      bottom = Math.max(platform.y, bottom)
    })

    return bottom
}

function hitPlatform(ball, platform) {
  if (ballOnPlatform) {
      return
  }

  ballOnPlatform = true

  if(platform !== topPlatform()) {
     this.scene.restart()
     score = 0;
  } else {
     score += 1
     scoreText.setText(score)
     platform.setVelocityX(0) 
 }
}

function preload() {
    this.load.image("ball", "assets/ball.png")
    this.load.image("platform", "assets/platform.png")
}

function create() {
    scoreText = this.add.text(35, 35, score, { fontSize: "60px"})
    scoreText.setScrollFactor(0, 0)

    ball = this.physics.add.sprite(375, 100, "ball")
    ball.setGravityY(1500)
    ball.setFrictionX(1)

    this.cameras.main.startFollow(ball, false, 1, 1, 0, -200)

    platforms = this.physics.add.group()

    this.physics.add.collider(ball, platforms, hitPlatform, null, this)
     
    let startPlatform = platforms.create(375, 160, "platform")
    startPlatform.setImmovable(true)

for (i = 0; i < 10; i++) {
    const x = Phaser.Math.Between(150, 600);
    const y = 300 + i * 200
     let platform = platforms.create(x, y, "platform")
     platform.setImmovable(true)
     platform.setVelocityX(Phaser.Math.Between(100, 200))
     platform.setFrictionX(1)
    }

    this.input.on("pointerdown", () => {
        const y = bottomY() + Phaser.Math.Between(200, 400)      
        const topP = topPlatform()
        topP.setY(y)
        topP.setVelocityX(Phaser.Math.Between(100, 200))
        ballOnPlatform = false
    })
}

function update() {
    platforms.getChildren().forEach((platform) => {
        if (platform.getBounds().right > 700 || platform.getBounds().left < 50) {
          platform.setVelocityX(-platform.body.velocity.x)
        }
      })

      if (ball.getBounds().top > bottomY()) {
          this.scene.restart()
          score = 0;
      }
}