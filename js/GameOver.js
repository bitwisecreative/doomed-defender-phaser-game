AI.GameOver = function(game) {};

AI.GameOver.prototype = {
    create: function() {
        this.add.sprite(0, 0, 'game_over');
        this.buttonPlayAgain = this.add.button(366, 450, 'button_again', this.playGame, this);
        
        // Text
        var go_kills = this.add.text(0, 200, kills.toString() + ' KILLS', { font: '24px "G7 Star Force"', fill: '#8B68E3' });
        var go_level = this.add.text(0, 275, 'LEVEL ' + gameLevel.toString(), { font: '24px "G7 Star Force"', fill: '#73E368' });
        var go_score = this.add.text(0, 350, 'SCORE ' + score.toString(), { font: '36px "G7 Star Force"', fill: '#ffffff' });
        go_kills.align = 'center';
        go_kills.x = 480 - go_kills._width / 2;
        go_level.align = 'center';
        go_level.x = 480 - go_level._width / 2;
        go_score.align = 'center';
        go_score.x = 480 - go_score._width / 2;
    },
    playGame: function() {
        this.state.start('Game');
    }
};