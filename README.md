
# Doomed Defender

A game I created in Phaser some years ago.

----

![Doomed Defender Phaser Game](https://bitwisecreative.com/site/assets/files/1025/doomed-defender-html5-retro-game.jpg)

----

A charming and chaotic retro-inspired game. Power up, and kill as many mobs as you can before they eventually take over!

 - Built with Phaser!
 - Easy controls, for desktop (mouse) and mobile (touch)!
 - Game scales for any screen!
 - Retro sound effects!
 - Power ups!
 - Game difficulty progression!
 - LOTS of configuration options!

#### Configuration Options:

 - Starting health.
 - Barrier "health".
 - How much to increase health by with a Health Up.
 - How much to increase barrier by with a Barrier Up.
 - How much damage the aliens do (to the ship or barrier).
 - The speed at which the laser travels.
 - When to get the triple gun.
 - Starting fire rate.
 - Maximum fire rate.
 - Starting move speed.
 - Maximum move speed.
 - The starting alien spawn rate.
 - The starting alien move speed.
 - If colored aliens move faster.
 - How much faster the colored aliens move.
 - The starting power up drop chance percentage per alien kill.
 - The lowest the drop chance percentage will be set to.
 - How long the power up drops will remain on the barrier before disappearing.
 - How long until the game increases difficulty.
 - How much to increase the alien spawn rate when the game increases difficulty.
 - How much to increase the alien move speed when the game increases difficulty.
 - How much to reduce the drop rate percentage by when the game increases difficulty.
 - Whether or not an alien can drop a power up when it hits your ship.

----

This game has no end although there is a cap on certain difficulty increases, the mob speed has no cap, and so sooner or later, game over.

With the configuration provided, the game starts off slow, but quickly gains pace. You rush to collect the power ups and keep your eye on your ship health. Sooner than you know it, you're maxed out and the mobs are pouring down. You rack up the kill count and score as best you can until they eventually take over. Fun! :D

All the fonts used in the game are commercial-use friendly. They are:

***G7 Silkworm*** - Title
***G7 Star Force*** - Text Values (i.e., health)
***Source Code Pro*** - Help Screen Text
The G7 fonts are included in the `/fonts` folder.

The G7 fonts are used in-game for dynamic text (score, level, health, etc.) They are loaded with CSS via the `styles.css` file in the `/css` directory.

#### Images / Sprites

Game screen images and PSD files are located in the `/img` folder. The file names should be self-explanitory.

Game sprites are located in the `/img/sprites` directory.

 ----

#### Sound / Audio

All of the game sound effects are located in the `/audio` directory.

The `.wav` files are unused in the game, but are included because they are the original sound files.

The `.mp3` and `.ogg` files are required for cross-browser compatibility.

 ----

#### Javascript

This game uses the Phaser HTML5 Game Framework (http://phaser.io).

All of the Javascript files are located in the `/js` folder.
 

***Phaser Framework***
Both of these files are required for the game to run. They should be left alone.

`phaser.min.js`
`phaser.map`
 
***Game Files***
(More details in the Configuration section...)

`Boot.js`
Sets some display preferences, and gets the preloading text ready.

`Preload.js`
Preloads all of the game assets.

`MainMenu.js`
The "Main Menu" screen.

`HowToPlay.js`
The "How To Play" screen.

`Game.js`
The main game.

`GameOver.js`
The "Game Over" screen.

----

#### Configuration

I've done a lot of testing, and the current configuration makes for a fun run of the game. However, please feel free to tinker with the configuration variables.

The configuration variables are located at: `/js/Game.js`

It looks like this:

```js
// CONFIGS
health = 100;
barrier = 1000;
healthUpIncrease = 25;
barrierUpIncrease = 100;
mobDamage = 25;
laserSpeed = 5;
weaponLevel = 1; // Level 2 is triple fire
weaponUpGoal = 10;
weaponUpCount = 0;
fireRate = 30; // Lower is faster
fireRateMax = 9;
moveSpeed = 2;
moveSpeedMax = 25;
spawnRate = 1; // Percent chance per frame
mobSpeed = .1;
colorMobsFallFaster = true;
colorMobSpeedAugment = .05;
dropChance = 50; // Percentage
dropChanceMinimum = 5; // Percentage
framesToKeepDropsOnGround = 180;
framesUntilLevelIncrease = 1200;
levelUpSpawnIncrease = 1;
levelUpMobSpeedIncrease = .02;
levelUpDropReduce = 2;
canGetPowerUpsOnShipHit = false;
```

***Configuration Variables***

`var health = 100;`
Starting health.

`var barrier = 1000;`
Barrier "health".

`var healthUpIncrease = 25;`
How much to increase health by with a Health Up.

`var barrierUpIncrease = 100;`
How much to increase barrier by with a Barrier Up.

`var mobDamage = 25;`
How much damage the mobs do (to the ship or barrier).

`var laserSpeed = 5;`
The speed at which the laser travels. Higher is faster.

`var weaponLevel = 1; // Level 2 is triple fire`
`var weaponUpGoal = 10;`
These settings govern the main weapon level up (from single fire to triple fire).
This config: Once you get 10 Weapon Ups, you get the triple fire gun.

`var fireRate = 30; // Lower is faster`
Starting fire rate. The fire rate is increased (lowered) when you get a Weapon Up,
until the max rate is reached (below).

`var fireRateMax = 9;`
Maximum fire rate.

`var moveSpeed = 2;`
Starting move speed. This is increased when you get a Speed Up, until the max is
reached (below).

`var moveSpeedMax = 25;`
Maximum move speed.

`var spawnRate = 1; // Percent chance per frame`
The starting mob spawn rate. This is a percentage chance (1-100) of an mob
spawning per frame. This is increased when the game increases the level
(difficulty).

`var mobSpeed = .1;`
The starting mob move speed. This is optionally increased when the game increases
the level (difficulty).

`var colorMobsFallFaster = true;`
Optional. If true, the colored mobs will fall a bit faster than the grayscale ones,
at varying rates (below). Change to false to disable.

`var colorMobSpeedAugment = .05;`
Optional. Dictates how much faster the different colored mobs fall from each other.
The order, from slower to faster, is green, magenta, cyan, yellow.

`var dropChance = 50; // Percentage`
The starting power up drop chance percentage per mob kill. This is optionally reduced
when the game increases difficulty.

`var dropChanceMinimum = 5; // Percentage`
The lowest the drop chance percentage can be.

`var framesToKeepDropsOnGround = 180;`
How long (in frames) power up drops will remain on the barrier before disappearing.

`var framesUntilLevelIncrease = 1200;`
How long (in frames) until the game increases difficulty. 

`var levelUpSpawnIncrease = 1;`
How much to increase the mob spawn rate when the game increases difficulty.

`var levelUpMobSpeedIncrease = .02;`
How much to increase the mob move speed when the game increases difficulty.

`var levelUpDropReduce = 2;`
How much to reduce the drop rate percentage by when the game increases difficulty.

`var canGetPowerUpsOnShipHit = false;`
Whether or not an mob can drop a power up when it hits your ship. If set to true, the
ship still takes damage.
