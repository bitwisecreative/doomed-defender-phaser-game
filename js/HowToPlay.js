AI.HowToPlay= function(game) {};

AI.HowToPlay.prototype = {
    create: function() {
        this.showHowto();
    },
    showHowto: function() {
        this.add.sprite(0, 0, 'how_to_play');
        this.buttonContinue = this.add.button(0, 0, 'button_overlay', this.mainMenu, this);
    },
    mainMenu: function() {
        this.state.start('MainMenu');
    }
};