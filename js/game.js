var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});
var platforms;

function preload() {
    game.load.image('platform', 'assets/platform.png');
    game.load.image('player', 'assets/player.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 32, 'platform');
    ground.scale.setTo(18.75, 1)
    ground.body.immovable = true;

//        make second platform
    ground = platforms.create(800, game.world.height - 32, 'platform');
    ground.scale.setTo(18.75, 1)
    ground.body.immovable = true;

    player = game.add.sprite(0, game.world.height - 64, 'player');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 1000;
    player.body.drag.x = 3000; 

    cursors = game.input.keyboard.createCursorKeys();

    game.world.setBounds(0, 0, 1600, 600);

    game.camera.follow(player);
}

function update() {
    game.physics.arcade.collide(player, platforms);

//        player.body.velocity.x = 0;

    if(cursors.left.isDown) {
        player.body.velocity.x -= 200;
    }
    else if(cursors.right.isDown) {
        player.body.velocity.x += 200;
    }
    if(cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -600;
    }

    if(player.body.velocity.x > 1000) {
        player.body.velocity.x = 1000;
    }
    else if(player.body.velocity.x < -1000) {
        player.body.velocity.x = -1000;
    }
}
