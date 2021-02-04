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

function preload() {
    this.load.image("ball", "assets/ball.png")
    this.load.image("platform", "assets/platform.png")
}

function create() {
    ball = this.physics.add.sprite(100, 100, "ball")
    ball.setGravityY(1500)

    this.cameras.main.startFollow(ball)

    platforms = this.physics.add.group()

    this.physics.add.collider(ball, platforms)

for (i = 0; i < 10; i++) {
    const x = 100;
    const y = 300 + i * 50
     let platform = platforms.create(x, y, "platform")
     platform.setImmovable(true)
    }

    this.input.on("pointerdown", () => {
        const y = bottomY() + 50      
        topPlatform().setY(y)
    })
}

function update() {}