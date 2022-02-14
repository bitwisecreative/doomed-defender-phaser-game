var AI = {};

AI.Boot = function(game) {};

AI.Boot.prototype = {
    preload: function() {
        this.load.image('loading', 'img/loading.png');
    },
    create: function() {
        this.input.maxPointers = 1;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setShowAll();
        this.scale.refresh();
        this.state.start('Preloader');
    }
};