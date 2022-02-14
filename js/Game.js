AI.Game = function(game) {};

AI.Game.prototype = {

    // PHASER CREATE
    create: function() {

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

        // Runtimes
        f = 0;
        fps = 0;
        fpsLastFrame = 0;
        score = 0;
        gameLevel = 1;
        kills = 0;
        lastFired = 0;
        mX = 0;

        // UI
        //this.add.sprite(0, 0, 'ui');
        bar = this.add.sprite(0, 550, 'barrier');

        // Init Sprites and Audio
        player = this.add.sprite(460, 492, 'ship');
        pc = 0;
        mobs = new Array();
        lasers = new Array();
        sounds = new Array();
        sounds['barrierup'] = this.add.audio('barrierup');
        sounds['damage'] = this.add.audio('damage');
        sounds['healthup'] = this.add.audio('healthup');
        sounds['kill'] = this.add.audio('kill');
        sounds['laser'] = this.add.audio('laser');
        sounds['speedup'] = this.add.audio('speedup');
        sounds['weaponup'] = this.add.audio('weaponup');

        // Text
        t_kills = this.add.text(12, 570, kills.toString() + ' KILLS', { font: '18px "G7 Star Force"', fill: '#8B68E3' });
        t_level = this.add.text(12, 610, 'LEVEL ' + gameLevel.toString(), { font: '18px "G7 Star Force"', fill: '#73E368' });
        t_score = this.add.text(220, 570, 'SCORE ' + score.toString(), { font: '24px "G7 Star Force"', fill: '#ffffff' });
        t_barrier = this.add.text(600, 570, barrier.toString() + ' BARRIER', { font: '24px "G7 Star Force"', fill: '#00ffff' });
        t_health = this.add.text(600, 610, health.toString() + ' HEALTH', { font: '24px "G7 Star Force"', fill: '#ff00ff' });
        t_fps = this.add.text(10, 10, fps.toString() + ' FPS', { font: '12px "G7 Star Force"', fill: '#222222' });


        // FPS Interval
        i_fps = setInterval(function() {
            fps = Math.floor(f - fpsLastFrame);
            fpsLastFrame = f;
            t_fps.text = fps.toString() + ' FPS';
        }, 1000);
    },

    // PHASER UPDATE
    update: function() {

        // Inc frame
        f += 1;

        // Reusable vars
        var i = 0;
        var j = 0;
        var diff = 0;
        var t;

        // Game Over
        if (health <= 0 || barrier <= 0) {
            clearInterval(i_fps);
            this.state.start('GameOver');
        }

        // Mouse & Touch Handler
        pc = player.x + player.width / 2;
        mX = this.input.activePointer.x;

        // Move Ship
        if (mX > pc) {
            diff = mX - pc;
            if (diff < moveSpeed) {
                player.x += diff;
            } else {
                player.x += moveSpeed;
            }
        }
        if (mX < pc) {
            diff = pc - mX;
            if (diff < moveSpeed) {
                player.x -= diff;
            } else {
                player.x -= moveSpeed;
            }
        }

        // Autofire
        this.fire();

        // Laser handling
        for (var i = lasers.length - 1; i >= 0; i--) {
            lasers[i].y -= laserSpeed;
            if (lasers[i].y < 0) {
                this.removeLaser(i);
            }
        }

        // Spawn mobs
        var spawn = this.randomInt(1, 100);
        if (spawn <= spawnRate) {
            this.spawnMob();
        }

        // Mob movement
        for (var i = mobs.length - 1; i >= 0; i--) {
            if (mobs[i].killedFrames < 1) {
                if (mobs[i].dropFrames < 1) {
                    mobs[i].y += mobs[i].aSpeed;
                }
            } else {
                mobs[i].killedFrames += 1;
                if (mobs[i].killedFrames > 3) {
                    mobs[i].loadTexture('kill1');
                }
                if (mobs[i].killedFrames > 7) {
                    this.removeMob(i);
                }
            }
        }

        // Hit Testing (Every 4 Frames)
        if (f % 4 == 0) {
            for (var i = mobs.length - 1; i >= 0; i--) {
                if (mobs[i].killedFrames < 1) {
                    if (mobs[i].drop == false) {
                        for (var j = lasers.length - 1; j >= 0; j--) {
                            if (this.hitTest(mobs[i], lasers[j])) {
                                var skipKill = 0;
                                // Power up drop
                                if (!mobs[i].drop) {
                                    if (this.randomInt(1, 100) <= dropChance) {
                                        if (mobs[i].type > 4) {
                                            // :D
                                            this.mobDrop(i);
                                            skipKill = 1;
                                        }
                                    }
                                }
                                if (skipKill == 0) {
                                    kills++;
                                    this.killMob(i);
                                    t_kills.text = kills.toString() + ' KILLS';
                                }
                                this.removeLaser(j);
                            }
                        }
                    }
                }
            }

            // Mob attack hit test
            var damageQueue = new Array();
            for (var i = mobs.length - 1; i >= 0; i--) {
                if (mobs[i].killedFrames < 1) {
                    if (mobs[i].y > 440) {
                        if (this.hitTest(mobs[i], player)) {
                            if (canGetPowerUpsOnShipHit && !mobs[i].drop) {
                                if (this.randomInt(1, 100) <= dropChance) {
                                    if (mobs[i].type > 4) {
                                        // :D
                                        mobs[i].drop = true;
                                    }
                                }
                            }
                            if (mobs[i].drop == false) {
                                health -= mobDamage;
                                damageQueue.push(i);
                                t_health.text = health.toString() + ' HEALTH';
                            } else {
                                if (mobs[i].type < 9) {
                                    this.mobDrop(i);
                                }
                                this.powerUp(i);
                                this.removeMob(i);
                            }
                        }
                        if (this.hitTest(mobs[i], bar)) {
                            if (mobs[i].drop == false) {
                                barrier -= mobDamage;
                                damageQueue.push(i);
                                t_barrier.text = barrier.toString() + ' BARRIER';
                            } else {
                                if (mobs[i].dropFrames >= framesToKeepDropsOnGround) {
                                    this.removeMob(i);
                                } else {
                                    mobs[i].dropFrames++;
                                }
                            }
                        }
                    }
                }
            }
            for (var i = damageQueue.length - 1; i >= 0; i--) {
                this.killMob(damageQueue[i], true);
            }
        }

        // Level increase
        if (f % framesUntilLevelIncrease == 0) {
            gameLevel++;
            if (spawnRate < 100) {
                spawnRate += levelUpSpawnIncrease;
            }
            mobSpeed += levelUpMobSpeedIncrease;
            if (dropChance > dropChanceMinimum) {
                dropChance -= levelUpDropReduce;
            }
            t_level.text = 'LEVEL ' + gameLevel.toString();
        }

    },

    // Remove Laser Handler
    removeLaser: function(i) {
        if (lasers[i] != null) {
            lasers[i].kill();
        }
        lasers.splice(i, 1);
    },

    // Remove Mob Handler
    removeMob: function(i) {
        if (mobs[i] != null) {
            mobs[i].kill();
        }
        mobs.splice(i, 1);
    },

    // Kill Mob Handler
    killMob: function(i, a) {
        a = typeof a !== 'undefined' ? a : false;
        if (a) {
            sounds['damage'].play();
            mobs[i].loadTexture('kill2');
            // Damage takes in hit test
        } else {
            sounds['kill'].play();
            mobs[i].loadTexture('kill1');
            score += 100;
            t_score.text = 'SCORE ' + score.toString();
        }
        mobs[i].killedFrames = 1;
    },

    // Mob Drop Handler
    mobDrop: function(i) {
        if (!mobs[i].drop) {
            sounds['kill'].play();
            score += 100;
            mobs[i].drop = true;
            mobs[i].type += 4;
            switch (mobs[i].type) {
                case 9:
                    mobs[i].loadTexture('speedup');
                    break;
                case 10:
                    mobs[i].loadTexture('healthup');
                    break;
                case 11:
                    mobs[i].loadTexture('barrierup');
                    break;
                case 12:
                    mobs[i].loadTexture('weaponup');
                    break;
            }
            t_score.text = 'SCORE ' + score.toString();
        }
    },

    // Fire Weapon Handler
    fire: function() {
        if (f - lastFired >= fireRate) {
            var laserSprite = 'laser';
            var laserScore = 1;
            var laserPosX = pc - 2;
            if (weaponLevel == 2) {
                laserSprite = 'laser2';
                laserScore = 3;
                laserPosX = pc - 21;
            }
            var l = this.add.sprite(laserPosX, 490, laserSprite);
            lasers.push(l);
            l.id = lasers.length - 1;
            sounds['laser'].play();
            score += laserScore;
            lastFired = f;
            t_score.text = 'SCORE ' + score.toString();
        }
    },

    // Spawn Mob Handler
    spawnMob: function() {
        var s = this.randomInt(1, 8);
        var a = this.add.sprite(0, 0, 'a' + s.toString());
        a.y = -40;
        a.x = this.randomInt(0, 920);
        if (colorMobsFallFaster) {
            a.aSpeed = mobSpeed * (s + colorMobSpeedAugment);
        } else {
            a.aSpeed = mobSpeed;
        }
        a.type = s;
        a.killedFrames = 0;
        a.drop = false;
        a.dropFrames = 0;
        mobs.push(a);
    },

    // Power Up Handler
    powerUp: function(i) {
        score += 1000;
        switch (mobs[i].type) {
            case 9:
                sounds['speedup'].play();
                if (moveSpeed < moveSpeedMax) {
                    moveSpeed += 1;
                } else {
                    score += 1000;
                }
                break;
            case 10:
                sounds['healthup'].play();
                health += healthUpIncrease;
                t_health.text = health.toString() + ' HEALTH';
                break;
            case 11:
                sounds['barrierup'].play();
                barrier += barrierUpIncrease;
                t_barrier.text = barrier.toString() + ' BARRIER';
                break;
            case 12:
                sounds['weaponup'].play();
                this.weaponUp();
                break;
        }
        t_score.text = 'SCORE ' + score.toString();
    },

    // Weapon Up Handler
    weaponUp: function() {
        if (fireRate > fireRateMax) {
            fireRate -= 1;
        } else {
            score += 1000;
            t_score.text = 'SCORE ' + score.toString();
        }
        weaponUpCount++;
        if (weaponUpCount == weaponUpGoal) {
            // >:D
            weaponLevel = 2;
        }
    },

    // Simple Hit Test
    hitTest: function(a, b) {
        return !(((a.x + a.width - 1) < b.x) ||
                 ((b.x + b.width - 1) < a.x) ||
                 ((a.y + a.height - 1) < b.y) ||
                 ((b.y + b.height - 1) < a.y));
    },

    // Random Integer Helper
    randomInt: function(min, max) {
        var r = Math.random();
        var ri = Math.floor(r * (max - min + 1) + min);
        return ri;
    },

    // Get Unique Array Helper
    arrayUnique: function(a) {
        return a.reduce(function(p, c) {
            if (p.indexOf(c) < 0) p.push(c);
            return p;
        }, []);
    }
};