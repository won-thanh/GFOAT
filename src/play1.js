class play1 extends Phaser.Scene{
    constructor(){
        super({key:"play1Scene"});
        this.VEL=100
    }
    preload(){
        //loading images and tilemaps
        this.load.path='./assets/';
        this.load.image('X','focus2.png');  
        this.load.image('A','A1.png');
        this.load.image('Aback','Aback.png');
//        this.load.image('focus','focus1.png');  
        this.load.image('tilesetImage','seven_eleven_tileset.png');
        this.load.tilemapTiledJSON('tilemapJSON','area01.json');
        this.load.audio('play_music', 'GFOATmusic.wav');
    }

    create(){
        //loading tilemap
        const map=this.add.tilemap('tilemapJSON');
        const seven_eleven_tileset= map.addTilesetImage('seven_eleven_tileset', 'tilesetImage');

        //adding each layer from the tilemap
        const floorLayer=map.createLayer('floor',seven_eleven_tileset,0,0);
        const wallLayer=map.createLayer('walls',seven_eleven_tileset,0,0);

    //    this.focus=this.physics.add.sprite(38,35,'focus').setScale(.5);
    //    this.focus.body.setSize(5,5);

        //adding x sprite and scaling it down in size to fit
//        this.x=this.physics.add.sprite(38,35,'X',0).setScale(.30);
        this.x=this.physics.add.sprite(38,35,'X',0);
        //this.x=this.add.container(38,35,[this.add.sprite(0,0,'X',0).setScale(.1),this.add.sprite(0,0,'focus').setScale(.2)])
//        const physicsX= this.physics.add.gameObject();
        //setting the hitbox of the sprite to make sure it fits through the spaces 
        this.x.body.setSize(6,6);
//        this.a=this.physics.add.sprite(220,140,'A',0).setScale(.30);
        this.a=this.physics.add.sprite(220,140,'A',0);

        this.aback=this.physics.add.sprite(220,140,'Aback',0);
        this.aback.body.setSize(40,40);

      //  this.focus.body.setCollideWorldBounds(true);
        //setting x to collide with the world bounds and with the maze walls 
        this.x.body.setCollideWorldBounds(true);
        wallLayer.setCollisionByProperty({collides:true});
        //this.physics.add.collider(this.focus,wallLayer);
        this.physics.add.collider(this.x,wallLayer);
        this.physics.add.collider(this.x,this.Aback);


        //creates the cursor keys to register when playing the game 
        this.cursors=this.input.keyboard.createCursorKeys();
        //adding music 
        this.music =  this.sound.add('play_music', {
            volume: 0.2,
            loop: true
        })
        this.music.play()
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }
    update(){
        
        //adding movement
        this.direction=new Phaser.Math.Vector2(0);
        if(this.cursors.left.isDown){
            this.direction.x=-.25;
        }
        else if(this.cursors.right.isDown){
            this.direction.x=.25;
        }
        if(this.cursors.up.isDown){
            this.direction.y=-.25;
        }
        else if(this.cursors.down.isDown){
            this.direction.y=.25;
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("play2Scene");
        }
        this.direction.normalize();
        //adding movement to x
        this.x.setVelocity(this.VEL*this.direction.x,this.VEL*this.direction.y);
        //this.focus.setVelocity(this.VEL*this.direction.x,this.VEL*this.direction.y);

    }
}