AI.Preloader = function(game) {};

AI.Preloader.prototype = {
    preload: function() {
        this.stage.backgroundColor = '#111';
        pl = this.add.sprite(0, 0, 'loading');
        this.load.setPreloadSprite(pl);
        
        // Screens and Buttons
        this.load.image('main_menu', 'img/main_menu.png');
        this.load.image('how_to_play', 'img/how_to_play.png');
        //this.load.image('ui', 'img/ui.png');
        this.load.image('game_over', 'img/game_over.png');
        this.load.image('button_help', 'img/button_help.png');
        this.load.image('button_play', 'img/button_play.png');
        this.load.image('button_again', 'img/button_again.png');
        this.load.image('button_overlay', 'img/button_overlay.png');
        
        // Sprites
        this.load.image('ship', 'img/sprites/ship.png');
        this.load.image('laser', 'img/sprites/laser.png');
        this.load.image('laser2', 'img/sprites/laser2.png');
        this.load.image('a1', 'img/sprites/a1.png');
        this.load.image('a2', 'img/sprites/a2.png');
        this.load.image('a3', 'img/sprites/a3.png');
        this.load.image('a4', 'img/sprites/a4.png');
        this.load.image('a5', 'img/sprites/a5.png');
        this.load.image('a6', 'img/sprites/a6.png');
        this.load.image('a7', 'img/sprites/a7.png');
        this.load.image('a8', 'img/sprites/a8.png');
        this.load.image('speedup', 'img/sprites/speedup.png');
        this.load.image('barrierup', 'img/sprites/barrierup.png');
        this.load.image('healthup', 'img/sprites/healthup.png');
        this.load.image('weaponup', 'img/sprites/weaponup.png');
        this.load.image('barrier', 'img/sprites/barrier.png');
        this.load.image('kill1', 'img/sprites/kill1.png');
        this.load.image('kill2', 'img/sprites/kill2.png');
        
        // Audio
        this.load.audio('barrierup', ['audio/barrierup.mp3', 'audio/barrierup.ogg']);
        this.load.audio('damage', ['audio/damage.mp3', 'audio/damage.ogg']);
        this.load.audio('healthup', ['audio/healthup.mp3', 'audio/healthup.ogg']);
        this.load.audio('kill', ['audio/kill.mp3', 'audio/kill.ogg']);
        this.load.audio('laser', ['audio/laser.mp3', 'audio/laser.ogg']);
        this.load.audio('speedup', ['audio/speedup.mp3', 'audio/speedup.ogg']);
        this.load.audio('weaponup', ['audio/weaponup.mp3', 'audio/weaponup.ogg']);
    },
    create: function() {
        this.state.start('MainMenu');
    }
};