AI.MainMenu = function(game) {};

AI.MainMenu.prototype = {
    create: function() {
        this.add.sprite(0, 0, 'main_menu');
        // Timer hack for custom font rendering...
        this.time.events.add(Phaser.Timer.SECOND, this.loadFont, this);
        // Add buttons
        // Note: timeout is to wait for the custom font to load...
        var mm = this;
        setTimeout(function() {
            mm.add.button(252, 180, 'button_play', mm.playGame, mm);
            mm.add.button(400, 520, 'button_help', mm.howToPlay, mm);
        }, 1200);
    },
    playGame: function() {
        this.state.start('Game');
    },
    howToPlay: function() {
        this.state.start('HowToPlay');
    },
    loadFont: function() {
        this.add.text(10, 10, 'DOOMED DEFENDER', { font: '1px "G7 Star Force"', fill: '#111111' });
    }
};