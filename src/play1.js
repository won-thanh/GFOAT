class play1 extends Phaser.Scene{
    constructor(){
        super({key:"play1Scene"});
        this.VEL=100
    }
    preload(){
        this.load.path='./assets/';
        this.load.image('X','X.png');  
        this.load.image('focus','focus.png');  
        this.load.image('tilesetImage','seven_eleven_tileset.png');
        this.load.tilemapTiledJSON('tilemapJSON','area01.json');
    }
    create(){
//        this.player=this.add.container(38,35,[this.physics.add.sprite(38,35,'X',0).setScale(.1),])
        const map=this.add.tilemap('tilemapJSON');
        const seven_eleven_tileset= map.addTilesetImage('seven_eleven_tileset', 'tilesetImage');

        //add back
        const floorLayer=map.createLayer('floor',seven_eleven_tileset,0,0);
        const wallLayer=map.createLayer('walls',seven_eleven_tileset,0,0);
        this.focus=this.add.sprite(38,35,'focus').setScale(.2);
        //add sprite
        this.x=this.physics.add.sprite(38,35,'X',0).setScale(.1);

        this.x.body.setCollideWorldBounds(true);
        wallLayer.setCollisionByProperty({collides:true});
        this.physics.add.collider(this.x,wallLayer);
        // //cameras
        // this.cameras.main.setBounds(0,0, map.widthInPixels,map.heightInPixels);
        // this.cameras.main.startFollow(this.slime,true,0.25,0.25);
        // this.physics.world.bounds.setTo(0,0,map.widthInPixels,map.heightInPixels);
        this.cursors=this.input.keyboard.createCursorKeys();

    }
    update(){
        this.direction=new Phaser.Math.Vector2(0);
        if(this.cursors.left.isDown){
            this.direction.x=-.5;
        }
        else if(this.cursors.right.isDown){
            this.direction.x=.5;
        }
        if(this.cursors.up.isDown){
            this.direction.y=-.5;
        }
        else if(this.cursors.down.isDown){
            this.direction.y=.5;
        }
        this.direction.normalize();
        this.x.setVelocity(this.VEL*this.direction.x,this.VEL*this.direction.y);
     }
}