enum ActionKind {
    RunningLeft,
    RunningRight,
    Idle,
    IdleLeft,
    IdleRight,
    JumpingLeft,
    JumpingRight,
    CrouchLeft,
    CrouchRight,
    Flying,
    Walking,
    Jumping
}
namespace SpriteKind {
    export const Bumper = SpriteKind.create()
    export const Goal = SpriteKind.create()
    export const Coin = SpriteKind.create()
    export const Flier = SpriteKind.create()
    export const KingSquare = SpriteKind.create()
    export const Player1 = SpriteKind.create()
    export const FLYINGSQUARE = SpriteKind.create()
    export const Bullet = SpriteKind.create()
    export const GOLDENBullet = SpriteKind.create()
    export const upwardwave = SpriteKind.create()
    export const Mage = SpriteKind.create()
    export const Fireball = SpriteKind.create()
    export const Moving_Target = SpriteKind.create()
    export const NotZach = SpriteKind.create()
    export const rustbullet = SpriteKind.create()
    export const Alex = SpriteKind.create()
    export const A = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.FLYINGSQUARE, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.say("How the hell are you even flying?", invincibilityPeriod * 1.5)
    music.powerDown.play()
    pause(invincibilityPeriod * 1.5)
})
function animateGOLDGUNRUN () {
    GOLDGUNRUN = animation.createAnimation(ActionKind.RunningLeft, 150)
    animation.attachAnimation(hero, GOLDGUNRUN)
    GOLDGUNRUN.addAnimationFrame(assets.image`goldzachfacingleftwithashotgun1`)
    GOLDGUNRUN.addAnimationFrame(assets.image`goldenzachwalkingleftwithashotgun1`)
    GOLDGUNRUN = animation.createAnimation(ActionKind.RunningRight, 150)
    animation.attachAnimation(hero, GOLDGUNRUN)
    GOLDGUNRUN.addAnimationFrame(assets.image`goldzachfacingrightwithashotgun1`)
    GOLDGUNRUN.addAnimationFrame(assets.image`goldenzachwalkingrightwithashotgun`)
}
function animateSHOTGUNRUN () {
    SHOTGUNRUN = animation.createAnimation(ActionKind.RunningLeft, 150)
    animation.attachAnimation(hero, SHOTGUNRUN)
    SHOTGUNRUN.addAnimationFrame(assets.image`zachfacingleftwithashotgun`)
    SHOTGUNRUN.addAnimationFrame(assets.image`zachwalkingleftwithashotgun`)
    SHOTGUNRUN = animation.createAnimation(ActionKind.RunningRight, 150)
    animation.attachAnimation(hero, SHOTGUNRUN)
    SHOTGUNRUN.addAnimationFrame(assets.image`zachwalkingrightwithashotgun0`)
    SHOTGUNRUN.addAnimationFrame(assets.image`zachfacingrightwithashotgun0`)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bumper, function (sprite, otherSprite) {
    if (sprite.vy > 0 && !(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y < otherSprite.top) {
        otherSprite.destroy(effects.ashes, 250)
        otherSprite.vy = -50
        sprite.vy = -2 * pixelsToMeters
        info.changeScoreBy(3)
        info.changeLifeBy(randint(0, 1))
        music.powerUp.play()
    } else if (hero.vx > 200) {
        info.changeScoreBy(3)
        sprites.destroy(otherSprite, effects.fire, 250)
        otherSprite.sayText("AAAAAAAAAAAAAAAAAAA")
    } else {
        sprite.say("YOU ASSHOLE!", invincibilityPeriod)
        music.powerDown.play()
        info.changeLifeBy(-1)
        pause(invincibilityPeriod)
    }
})
function initializeAnimations () {
    initializeHeroAnimations()
    initializeCoinAnimation()
    initializeFlierAnimations()
}
function giveIntroduction () {
    game.setDialogFrame(img`
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 
        2 2 1 1 1 1 1 1 1 1 1 1 1 2 2 . 
        2 1 1 2 2 2 2 2 2 2 2 2 1 1 2 . 
        2 1 2 2 1 1 1 1 1 1 1 2 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 2 1 1 1 1 1 1 1 2 2 1 2 . 
        2 1 1 2 2 2 2 2 2 2 2 2 1 1 2 . 
        2 2 1 1 1 1 1 1 1 1 1 1 1 2 2 . 
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 
        . . . . . . . . . . . . . . . . 
        `)
    game.setDialogCursor(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f 5 5 5 5 f f . . . . 
        . . . . f 5 5 5 5 5 5 f . . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . . f 5 5 5 5 5 5 f . . . . 
        . . . . f f 5 5 5 5 f f . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    showInstruction("Ok, prepare for a lot of reading...")
    showInstruction("Move Zach around with the A and S keys.")
    showInstruction("the A Button/Space Key does a jump.")
    showInstruction("You can do a double jump by pressing it again.")
    showInstruction("Press Up/W to do an uppercut, a kind of 3rd jump.")
    showInstruction("Press B/Enter to dash.")
    showInstruction("While dashing, blocks will break if you hit them.")
    showInstruction("You will also be invulnerable to enemies mid-dash.")
    showInstruction("Press down to crouch. Jump while crouching to Super Jump.")
    showInstruction("Squares are bad. Jump or Dash through them to kill them.")
    showInstruction("Touch the flag to end a level.")
    showInstruction("Collect coins to get score, get 200 score....")
    showInstruction("Well, press A to find out.")
    showInstruction("DM Player for context of the game LMAO")
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (zachisgolden == false && zachisholdingshotgun == false) {
        animateKicks()
        hero.vy += -150
        music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
        pause(500)
        animateJumps()
    }
    if (zachisgolden == true && zachisholdingshotgun == false) {
        hero.vy += -250
        animateGKICK()
    }
    if (zachisholdingshotgun == true && zachisgolden == false) {
        hero.vy += -50
        hero.setImage(assets.image`BANGBANGup`)
        for (let index = 0; index < 5; index++) {
            FUCKINGBULLET = sprites.createProjectileFromSprite(assets.image`FUCKINGBULLETV2UP`, hero, 0, -500)
            FUCKINGBULLET.setKind(SpriteKind.Bullet)
            pause(10)
        }
        pause(100)
    }
    if (zachisholdingshotgun == true && zachisgolden == true) {
        hero.vy += -100
        animateGOLDGUNJUMP()
        for (let index = 0; index < 5; index++) {
            FUCKINGBULLET = sprites.createProjectileFromSprite(assets.image`FUCKINGBULLETV2DOWN0`, hero, 0, 1000)
            FUCKINGBULLET.setKind(SpriteKind.GOLDENBullet)
            FUCKINGBULLET = sprites.createProjectileFromSprite(assets.image`FUCKINGBULLETV2UP0`, hero, 0, -1000)
            FUCKINGBULLET.setKind(SpriteKind.GOLDENBullet)
            pause(10)
        }
        pause(100)
    }
})
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if ((hero.vy > 150 || (hero.vx > 200 || hero.vx <= -250)) && (zachisgolden == false && tiles.tileAtLocationEquals(location, assets.tile`Stone`))) {
        showInstruction("I forgot to tell you that those blocks-")
        showInstruction("-Are Dash-Proof. You need a gun to break them.")
        showInstruction("Or be made of fuckin' gold or some other metal-")
        showInstruction("-strong enough to punch through it.")
        hero.sayText("bruh")
    }
    if ((hero.vy > 150 || (hero.vx > 200 || (hero.vx <= -250 || hero.vy <= -175))) && tiles.tileAtLocationEquals(location, assets.tile`tile3`)) {
        if (hero.vx > 200) {
            tiles.setWallAt(location, false)
            tiles.setTileAt(location, assets.tile`transparency16`)
            hero.vx += 50
        }
        if (hero.vx <= -250) {
            tiles.setWallAt(location, false)
            tiles.setTileAt(location, assets.tile`transparency16`)
            hero.vx += -50
        }
        if (hero.vy > 150) {
            tiles.setWallAt(location, false)
            tiles.setTileAt(location, assets.tile`transparency16`)
            hero.vy += 100
        }
        if (hero.vy <= -175) {
            tiles.setWallAt(location, false)
            tiles.setTileAt(location, assets.tile`transparency16`)
            hero.vy = -180
        }
    }
    if (tiles.tileAtLocationEquals(location, assets.tile`SHOTGUN`)) {
        if (zachisgolden == false) {
            tiles.setWallAt(location, false)
            tiles.setTileAt(location, assets.tile`transparency16`)
            zachisholdingshotgun = true
            initializeSHOTGUNanimations()
            showInstruction("Is.")
            showInstruction("Is that a fucking shotgun?")
            hero.sayText("yeah", 1000, false)
            showInstruction("Okay, whatever, just do your thing.")
            showInstruction("Press ENTER/B to shoot.")
            showInstruction("Spam X and Enter at the same time to fire really fast")
            showInstruction("Oh right, make sure to collect some ammo.")
            showInstruction("You're not God.")
            showInstruction("If you have no ammo, your Score will be-")
            showInstruction("sacrificed in order to shoot.")
            hero.sayText("bet", 5000, false)
            sprites.setDataNumber(hero, "Ammo", 50)
            for (let index = 0; index < 1; index++) {
                AMMOBAR = statusbars.create(20, 4, StatusBarKind.Health)
                AMMOBAR.setLabel("AMMO")
                AMMOBAR.max = 100
                AMMOBAR.value = sprites.readDataNumber(hero, "Ammo")
                AMMOBAR.attachToSprite(hero)
                AMMOBAR.setColor(5, 4)
            }
        } else if (zachisgolden == true) {
            tiles.setWallAt(location, false)
            tiles.setTileAt(location, assets.tile`transparency16`)
            for (let index = 0; index < 1; index++) {
                zachisholdingshotgun = true
                showInstruction("Are you not strong enough as is?!")
                hero.sayText("no", 1000, false)
                showInstruction("Ugh, fine. Press Enter/B to shoot.")
                showInstruction("Spam E, Enter, and X to Fire really, really fast.")
                hero.sayText("bet.", 1000, false)
                showInstruction("To make you not God-like, you need to make sure you-")
                showInstruction("-fill the shotgun with Ammo.")
                hero.sayText("bruh", 1000, false)
                sprites.setDataNumber(hero, "Ammo", 100)
                initializeGOLDGUNanimations()
                createshotgunbar()
            }
        }
    }
    if (tiles.tileAtLocationEquals(location, assets.tile`AMMO`)) {
        if (zachisholdingshotgun == true) {
            sprites.setDataNumber(hero, "Ammo", 100)
            AMMOBAR.value = 100
            tiles.setTileAt(location, assets.tile`transparency16`)
            tiles.setWallAt(location, false)
            refreshshotgunbar()
        } else {
            hero.sayText("I don't have a shotgun to put these bullets in.", 1000, false)
            tiles.setTileAt(location, assets.tile`transparency16`)
            tiles.setWallAt(location, false)
        }
    }
    if (tiles.tileAtLocationEquals(location, assets.tile`INFINITEammo`)) {
        if (zachisholdingshotgun == true) {
            sprites.setDataNumber(hero, "Ammo", 999)
            AMMOBAR.value = 100
            tiles.setTileAt(location, assets.tile`transparency16`)
            tiles.setWallAt(location, false)
        } else {
            hero.sayText("I don't have a shotgun to put these bullets in.", 1000, false)
            tiles.setTileAt(location, assets.tile`transparency16`)
            tiles.setWallAt(location, false)
        }
    }
    if (hero.tileKindAt(TileDirection.Top, assets.tile`suggestionblock`)) {
        showInstruction("Don't break these blocks, you need to platform")
    }
    if (tiles.tileAtLocationEquals(location, assets.tile`portal`)) {
        music.stopAllSounds()
        tiles.setCurrentTilemap(tilemap`secret1`)
        music.play(music.createSong(assets.song`SOMARI`), music.PlaybackMode.LoopingInBackground)
        tiles.placeOnTile(hero, tiles.getTileLocation(15, 69))
    }
    if (tiles.tileAtLocationEquals(location, assets.tile`portal2`)) {
        music.stopAllSounds()
        tiles.setCurrentTilemap(tilemap`level 2`)
        tiles.placeOnTile(hero, tiles.getTileLocation(37, 68))
        music.play(music.createSong(assets.song`GRAND DAD`), music.PlaybackMode.LoopingInBackground)
    }
    if (tiles.tileAtLocationEquals(location, assets.tile`portal0`)) {
        tiles.placeOnTile(hero, tiles.getTileLocation(22, 64))
    }
    if (hero.tileKindAt(TileDirection.Top, assets.tile`suggestionblock2`)) {
        showInstruction("Combine your Super-Jump, Double jump and-")
        showInstruction("-Uppercut to clear this part!")
        showInstruction("...You do remember how to do them, right?")
    }
    if (hero.tileKindAt(TileDirection.Top, assets.tile`suggestionblock3`)) {
        showInstruction("These are portals, they bring you to chase levels.")
        showInstruction("Avoid the MCDONALD'S FRIES")
    }
    if (hero.tileKindAt(TileDirection.Top, assets.tile`suggestionblock4`)) {
        showInstruction("I forgot to tell you if you spam the uppercut,")
        showInstruction("You can literally fly.")
        showInstruction("So just go absolutely wild with that.")
    }
    if (hero.tileKindAt(TileDirection.Top, assets.tile`suggestionblock5`)) {
        showInstruction("If you've played this game before")
        showInstruction("Use this to skip levels.")
        showInstruction("Nobody wants to run from fries 2000 times.")
    }
    if (hero.tileKindAt(TileDirection.Top, assets.tile`suggestionblock0`)) {
        showInstruction("You really thought that was the end?")
        showInstruction("Nah, it wasn't.")
        showInstruction("You can clip through the ceiling above.")
        showInstruction("You're not done yet.")
        showInstruction("Remember; Spam the Uppercut to fly.")
    }
    if (hero.tileKindAt(TileDirection.Top, assets.tile`suggestionblock7`)) {
        showInstruction("You can break through blocks with speed.")
        showInstruction("This is how your dash works.")
        showInstruction("Since crouching mid-air sends you flying down,")
        showInstruction("You can use it to break these bricks")
    }
    if (hero.tileKindAt(TileDirection.Top, assets.tile`suggestionblock1`)) {
        showInstruction("If you do a bunch of specific inputs,")
        showInstruction("Something Cool will happen.")
        showInstruction("Press Left, then Right, then Down, then Up")
        showInstruction("It'll release a wave attack that can kill squares-")
        showInstruction("-And break bricks.")
    }
    if (hero.tileKindAt(TileDirection.Top, assets.tile`suggestionblock6`)) {
        showInstruction("These are Bullets for your shotgun.")
        showInstruction("You should probably take them.")
        showInstruction("(You have no choice so you have to anyway)")
    }
    if (hero.tileKindAt(TileDirection.Top, assets.tile`suggestionblock8`)) {
        showInstruction("I hope you have good aim.")
        showInstruction("You need to hit the moving target.")
    }
    if (hero.tileKindAt(TileDirection.Top, assets.tile`suggestionblockINFINITE0`)) {
        showInstruction("This is filename \"whatthefuck\" and the Shotgun.")
        showInstruction("\"whatthefuck\" was a beta block used for-")
        showInstruction("changing the scene to the castle.")
        showInstruction("He goes unused now, though.")
        showInstruction("The shotgun is a powerup. It lets Zach-")
        showInstruction("-be a true American.")
        showInstruction("Go to the end of the stage to be-")
        showInstruction("-able to get the real powerup.")
    }
    if (hero.tileKindAt(TileDirection.Top, assets.tile`suggestionblockINFINITE2`)) {
        showInstruction("These are blocks that end stages.")
        showInstruction("The red eyes are used for Level 3's chase")
        showInstruction("The SKIP button is always found somewhere-")
        showInstruction("-near every level's entrance")
        showInstruction("And you probably know the flag.")
    }
    if (hero.tileKindAt(TileDirection.Top, assets.tile`suggestionblockINFINITE1`)) {
        showInstruction("These are the two powerups.")
        showInstruction("The shotgun, and the Gold Block.")
        showInstruction("The Gold Block doesn't appear normally.")
        showInstruction("Only in this room!")
        showInstruction("It turns you into Golden Zach.")
    }
    if (hero.tileKindAt(TileDirection.Top, assets.tile`level8`)) {
        clearGame()
        game.splash("warping to level 1!")
        setLevelTileMap(0)
        refreshshotgunbar()
    }
    if (hero.tileKindAt(TileDirection.Top, assets.tile`level1chase`)) {
        clearGame()
        game.splash("warping to level 1's chase!")
        setLevelTileMap(1)
        refreshshotgunbar()
    }
    if (hero.tileKindAt(TileDirection.Top, assets.tile`level0`)) {
        clearGame()
        game.splash("warping to level 2!")
        setLevelTileMap(2)
        refreshshotgunbar()
    }
    if (hero.tileKindAt(TileDirection.Top, assets.tile`level2chase`)) {
        clearGame()
        game.splash("warping to level 2's chase!")
        setLevelTileMap(3)
        refreshshotgunbar()
    }
    if (hero.tileKindAt(TileDirection.Top, assets.tile`level3`)) {
        clearGame()
        game.splash("warping to level 3!")
        setLevelTileMap(4)
        refreshshotgunbar()
    }
    if (hero.tileKindAt(TileDirection.Top, assets.tile`level3chase0`)) {
        clearGame()
        game.splash("warping to level 3's chase!")
        setLevelTileMap(5)
        refreshshotgunbar()
    }
    if (hero.tileKindAt(TileDirection.Top, assets.tile`level4`)) {
        clearGame()
        game.splash("warping to level 4!")
        setLevelTileMap(6)
        refreshshotgunbar()
    }
    if (hero.tileKindAt(TileDirection.Top, assets.tile`level4chase`)) {
        clearGame()
        game.splash("warping to level 4's chase!")
        setLevelTileMap(7)
        refreshshotgunbar()
        zachisholdingshotgun = false && zachisgolden == false
    }
    if (hero.tileKindAt(TileDirection.Top, assets.tile`level5`)) {
        clearGame()
        game.splash("Warping to the end.")
        setLevelTileMap(8)
        initializeHeroAnimations()
    }
    if (hero.tileKindAt(TileDirection.Top, assets.tile`GOLD`)) {
        if (zachisgolden == false) {
            hero.sayText("It's Morbing time.", 2000, false)
            zachisgolden = true
            if (zachisgolden == true) {
                animatepower()
                initializegoldanimation()
                showInstruction("Congrats, you've unlocked Golden Zach!")
                showInstruction("Show your unmatched power to the world!")
                hero.startEffect(effects.fire, 2000)
                info.setLife(100)
                info.setScore(0)
                controller.moveSprite(hero, 210, 0)
            }
        }
    }
    if (hero.tileKindAt(TileDirection.Bottom, assets.tile`LAVA`) || (hero.tileKindAt(TileDirection.Bottom, assets.tile`LAVADIAGONAL`) || (hero.tileKindAt(TileDirection.Bottom, assets.tile`LAVA1`) || hero.tileKindAt(TileDirection.Bottom, assets.tile`LAVADIAGONAL0`)))) {
        info.changeLifeBy(-1)
        hero.y += -30
        hero.vy = -120
        hero.sayText("OW MY ASS!", 500, false)
    }
    if (hero.tileKindAt(TileDirection.Bottom, assets.tile`LAVADIAGONAL1`) || (hero.tileKindAt(TileDirection.Bottom, assets.tile`LAVADIAGONAL2`) || (hero.tileKindAt(TileDirection.Bottom, assets.tile`LOWLAVA`) || hero.tileKindAt(TileDirection.Bottom, assets.tile`LAVABLOCK-FILLED`)))) {
        info.changeLifeBy(-1)
        hero.y += -30
        hero.vy = -120
        hero.sayText("OW MY ASS!", 500, false)
    }
    if (hero.tileKindAt(TileDirection.Left, assets.tile`dirt0`)) {
        scene.setBackgroundImage(assets.image`cave`)
        tiles.setTileAt(tiles.getTileLocation(27, 13), assets.tile`transparency16`)
        tiles.setWallAt(tiles.getTileLocation(27, 13), false)
        music.stopAllSounds()
        music.play(music.createSong(assets.song`CAVE`), music.PlaybackMode.LoopingInBackground)
    }
    if (hero.tileKindAt(TileDirection.Right, assets.tile`THE END`)) {
        controller.moveSprite(hero, 0, 0)
        scene.cameraFollowSprite(A)
        showInstruction("A:\"Zach! Glad you could make it!\"")
        scene.cameraFollowSprite(hero)
        showInstruction("Zach:\"Heya- It was quite a struggle getting here...\"")
        scene.cameraFollowSprite(A)
        showInstruction("A: \"Well, at least you're not dead.\"")
        scene.cameraFollowSprite(hero)
        showInstruction("Zach: \"True that.\"")
        scene.cameraFollowSprite(A)
        showInstruction("A: \"Well, that's the end. Thanks for Playing!\"")
        showInstruction("Zach: \"WHO THE FUCK ARE YOU TALKING TO-\"")
        music.play(music.createSong(assets.song`ending_theme`), music.PlaybackMode.UntilDone)
        game.setGameOverMessage(true, "The End!")
        game.gameOver(true)
    }
    if (hero.tileKindAt(TileDirection.Bottom, assets.tile`tile2`)) {
        scene.setBackgroundImage(img`
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            8999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9989998999899989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            8989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            8999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            8989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998999899989998999899989998999899989
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989998999899989
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
            9899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999999999999999999999999999
            8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            `)
    }
    if (hero.tileKindAt(TileDirection.Left, assets.tile`plush`)) {
        showInstruction("It's a creepy plushie.")
        showInstruction("Being near it gives you an uneasy feeling.")
        showInstruction("You should lea-ASRO3124HJO12J3423PTHJIORGH")
        showInstruction("1W45N13UOH4OHT6O4U2P1QWENJO51")
        showInstruction("ASF23KL4NMK;EMA;SRMJKL;J1;135")
        showInstruction("Come and Face me. Let's see if you can stand up to me.")
        tiles.setWallAt(tiles.getTileLocation(32, 70), false)
        tiles.setTileAt(tiles.getTileLocation(32, 70), assets.tile`transparency16`)
        if (hasNextLevel()) {
            currentLevel = 999
            music.stopAllSounds()
            game.splash("A NEW CHALLENGER APPROACHES!")
            music.play(music.createSong(assets.song`challenger`), music.PlaybackMode.UntilDone)
            setLevelTileMap(currentLevel)
        }
    }
})
scene.onOverlapTile(SpriteKind.GOLDENBullet, assets.tile`Stone`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    tiles.setWallAt(location, false)
})
function initializeCoinAnimation () {
    coinAnimation = animation.createAnimation(ActionKind.Idle, 200)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f 5 5 5 5 f f . . . . 
        . . . . f 5 5 5 5 5 5 f . . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . . f 5 5 5 5 5 5 f . . . . 
        . . . . f f 5 5 5 5 f f . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . f f 5 f 5 5 5 f . . . . . 
        . . . f 5 f 5 5 5 5 5 f . . . . 
        . . f 5 f 5 5 5 4 5 5 f . . . . 
        . . f 5 f 5 5 5 4 4 5 5 f . . . 
        . . f 5 f 5 5 5 4 4 5 5 f . . . 
        . . f 5 f 5 5 5 4 5 5 f . . . . 
        . . . f 5 f 5 5 5 5 5 f . . . . 
        . . . . f 5 f 5 5 5 f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f f 5 f 5 f f . . . . . 
        . . . f f 5 f 5 5 5 f . . . . . 
        . . . f 5 f 5 5 5 5 f f . . . . 
        . . . f 5 f 5 5 4 5 5 f . . . . 
        . . . f 5 f 5 5 4 5 5 f . . . . 
        . . . f 5 f 5 5 5 5 f f . . . . 
        . . . f f 5 f 5 5 5 f . . . . . 
        . . . . f f 5 f 5 f f . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . f 5 f 5 f f . . . . . 
        . . . . . f 5 f 5 5 f . . . . . 
        . . . . . f 5 f 5 5 f . . . . . 
        . . . . . f 5 f 5 5 f . . . . . 
        . . . . . f 5 f 5 5 f . . . . . 
        . . . . . f 5 f 5 f f . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . f f 5 f 5 f . . . . . 
        . . . . . f 5 5 f 5 f . . . . . 
        . . . . . f 5 5 f 5 f . . . . . 
        . . . . . f 5 5 f 5 f . . . . . 
        . . . . . f 5 5 f 5 f . . . . . 
        . . . . . f f 5 f 5 f . . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . f f 5 f 5 f f . . . . 
        . . . . . f 5 5 5 f 5 f f . . . 
        . . . . f f 5 5 5 5 f 5 f . . . 
        . . . . f 5 5 4 5 5 f 5 f . . . 
        . . . . f 5 5 4 5 5 f 5 f . . . 
        . . . . f f 5 5 5 5 f 5 f . . . 
        . . . . . f 5 5 5 f 5 f f . . . 
        . . . . . f f 5 f 5 f f . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . f 5 5 5 f 5 f f . . . 
        . . . . f 5 5 5 5 5 f 5 f . . . 
        . . . . f 5 5 4 5 5 5 f 5 f . . 
        . . . f 5 5 4 4 5 5 5 f 5 f . . 
        . . . f 5 5 4 4 5 5 5 f 5 f . . 
        . . . . f 5 5 4 5 5 5 f 5 f . . 
        . . . . f 5 5 5 5 5 f 5 f . . . 
        . . . . . f 5 5 5 f 5 f . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    otherSprite.destroy(effects.trail, 250)
    otherSprite.y += -3
    info.changeScoreBy(1)
    music.baDing.play()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`RIFT`, function (sprite, location) {
    info.changeLifeBy(1)
    currentLevel = 8
    game.splash("Next Level Unlocked!")
    setLevelTileMap(8)
    zachisholdingshotgun = false
    initializeHeroAnimations()
})
function attemptJump () {
    // else if: either fell off a ledge, or double jumping
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        hero.vy = -4 * pixelsToMeters
    } else if (canDoubleJump) {
        doubleJumpSpeed = -3 * pixelsToMeters
        // Good double jump
        if (hero.vy >= -40) {
            doubleJumpSpeed = -4.5 * pixelsToMeters
            hero.startEffect(effects.trail, 500)
            scene.cameraShake(2, 250)
        }
        hero.vy = doubleJumpSpeed
        canDoubleJump = false
    }
}
controller.combos.attachCombo("uubb", function () {
    if (debugmodeON == true) {
        game.splash("Next level unlocked!")
        setLevelTileMap(-1)
        if (zachisholdingshotgun) {
            refreshshotgunbar()
        }
    }
})
sprites.onOverlap(SpriteKind.Bullet, SpriteKind.KingSquare, function (sprite, otherSprite) {
    statusbar.value += -1
    sprites.changeDataNumberBy(otherSprite, "HP", -1)
    sprites.destroy(sprite)
    info.changeScoreBy(randint(0, 1))
    if (sprites.readDataNumber(otherSprite, "HP") == statusbar.max - 2) {
        kingsquare.follow(hero, 2.5)
        controller.moveSprite(hero, 1, 0)
        game.showLongText("MASH SHOOT!!!!", DialogLayout.Bottom)
        kingsquare.setStayInScreen(false)
    }
    kingsquare.sayText("BOSS HP =" + sprites.readDataNumber(otherSprite, "HP"), 2000, false)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
    scene.cameraShake(4, 500)
    if (sprites.readDataNumber(otherSprite, "HP") == 0) {
        sprites.destroy(otherSprite)
        music.stopAllSounds()
        hero.sayText("Game, Set and Match!", 5000, false)
        controller.moveSprite(hero, 110, 0)
        music.play(music.createSong(assets.song`victorious`), music.PlaybackMode.UntilDone)
        info.setLife(10)
        currentLevel += 1
        if (hasNextLevel()) {
            game.splash("Next level unlocked!")
            setLevelTileMap(currentLevel)
            refreshshotgunbar()
        } else {
            game.over(true, effects.confetti)
        }
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (zachisgolden == true && zachisholdingshotgun == false) {
        attemptGoldDash()
    }
    if (zachisgolden == false && (zachisholdingshotgun == false && heroFacingLeft == false)) {
        hero.vx += 250
        animateDash()
        music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.UntilDone)
        animateJumps()
        hero.vx = 0
        pause(300)
    } else if (heroFacingLeft == true && (zachisholdingshotgun == false && zachisgolden == false)) {
        hero.vx += -250
        animateDash()
        music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.UntilDone)
        hero.vx = 0
        pause(300)
    }
    if (zachisholdingshotgun == true) {
        if (sprites.readDataNumber(hero, "Ammo") > 0) {
            ShotgunInput()
        }
        if (sprites.readDataNumber(hero, "Ammo") == 0) {
            hero.sayText("I have no ammo.")
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Player1, function (sprite, otherSprite) {
    if (sprite.vy > 0 && !(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y < otherSprite.top) {
        hero.sayText("BOSS HP =" + statusbar.value, 2000, false)
        music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
        sprites.changeDataNumberBy(otherSprite, "HP", -1)
        otherSprite.vx += randint(25, -25)
        scene.cameraShake(4, 500)
        if (sprites.readDataNumber(otherSprite, "HP") == 0) {
            sprites.destroy(otherSprite)
            music.stopAllSounds()
            hero.sayText("yippee i lived.", 5000, false)
            music.play(music.createSong(assets.song`victorious`), music.PlaybackMode.UntilDone)
            currentLevel += 1
            if (hasNextLevel()) {
                game.splash("Next level unlocked!")
                setLevelTileMap(currentLevel)
            } else {
                game.over(true, effects.confetti)
            }
        }
    } else {
        info.changeLifeBy(-1)
        statusbar.value += -1
        pause(10)
        sprite.say("OW!", invincibilityPeriod)
        music.powerDown.play()
    }
})
function animateIdle () {
    mainIdleLeft = animation.createAnimation(ActionKind.IdleLeft, 100)
    animation.attachAnimation(hero, mainIdleLeft)
    mainIdleLeft.addAnimationFrame(assets.image`zachfacingleft1`)
    mainIdleRight = animation.createAnimation(ActionKind.IdleRight, 100)
    animation.attachAnimation(hero, mainIdleRight)
    mainIdleRight.addAnimationFrame(assets.image`zachfacingright0`)
}
sprites.onOverlap(SpriteKind.GOLDENBullet, SpriteKind.NotZach, function (sprite, otherSprite) {
    statusbar.value += -4
    sprites.changeDataNumberBy(otherSprite, "HP", -2)
    sprites.destroy(sprite)
    if (Math.percentChance(10)) {
        info.changeScoreBy(1)
        info.changeLifeBy(1)
    }
    hero.sayText("BOSS HP =" + statusbar.value, 2000, false)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
    scene.cameraShake(4, 500)
    if (sprites.readDataNumber(otherSprite, "HP") == 0) {
        tiles.placeOnTile(otherSprite, tiles.getTileLocation(47, 35))
        tiles.placeOnTile(hero, tiles.getTileLocation(52, 35))
        controller.moveSprite(hero, 0, 0)
        otherSprite.setBounceOnWall(false)
        scene.cameraFollowSprite(otherSprite)
        otherSprite.vx = 0
        otherSprite.vy = 0
        for (let index = 0; index < 1; index++) {
            otherSprite.setImage(assets.image`yourselfsing-31`)
            pause(200)
        }
        for (let index = 0; index < 1; index++) {
            otherSprite.setImage(assets.image`yourselfsing-30`)
            pause(200)
        }
        for (let index = 0; index < 1; index++) {
            otherSprite.setImage(assets.image`yourselfsing-33`)
            pause(200)
        }
        for (let index = 0; index < 1; index++) {
            otherSprite.setImage(assets.image`yourselfsing-32`)
            pause(200)
        }
        for (let index = 0; index < 1; index++) {
            otherSprite.setImage(assets.image`yourselfsing-34`)
            pause(200)
        }
        sprites.destroy(otherSprite)
        scene.cameraFollowSprite(hero)
        scene.cameraShake(4, 1000)
        info.changeScoreBy(25)
        tiles.placeOnRandomTile(hero, assets.tile`you0`)
        hero.y += -75
        if (zachisgolden == false) {
            controller.moveSprite(hero, 110, 0)
        }
        if (zachisgolden == true) {
            controller.moveSprite(hero, 210, 0)
        }
    }
})
function setLevelTileMap (level: number) {
    clearGame()
    if (level == 0) {
        tiles.setTilemap(tilemap`level0`)
    } else if (level == 1) {
        music.stopAllSounds()
        music.play(music.createSong(assets.song`DEMISE`), music.PlaybackMode.LoopingInBackground)
        tiles.setTilemap(tilemap`level1_run`)
    } else if (level == 2) {
        music.stopAllSounds()
        music.play(music.createSong(assets.song`GRAND DAD`), music.PlaybackMode.LoopingInBackground)
        tiles.setTilemap(tilemap`level 2`)
    } else if (level == 3) {
        music.stopAllSounds()
        music.play(music.createSong(assets.song`DEMISE`), music.PlaybackMode.LoopingInBackground)
        tiles.setTilemap(tilemap`level2_run`)
    } else if (level == 4) {
        music.stopAllSounds()
        music.play(music.createSong(assets.song`GRAND DAD`), music.PlaybackMode.LoopingInBackground)
        tiles.setTilemap(tilemap`level_8`)
        if (zachisholdingshotgun && Math.percentChance(1)) {
            tiles.setTilemap(tilemap`level_3`)
        }
    } else if (level == 5) {
        music.stopAllSounds()
        music.play(music.createSong(assets.song`DEMISE`), music.PlaybackMode.LoopingInBackground)
        tiles.setTilemap(tilemap`level_4`)
    } else if (level == 6) {
        music.stopAllSounds()
        info.stopCountdown()
        sprites.destroyAllSpritesOfKind(SpriteKind.KingSquare)
        sprites.destroyAllSpritesOfKind(SpriteKind.Bumper)
        sprites.destroyAllSpritesOfKind(SpriteKind.Flier)
        scene.setBackgroundImage(assets.image`FNFREFERENCE`)
        tiles.setTilemap(tilemap`level_5`)
        music.play(music.createSong(assets.song`NO-PARTY`), music.PlaybackMode.LoopingInBackground)
    } else if (level == 7) {
        music.stopAllSounds()
        music.play(music.createSong(assets.song`DEMISE`), music.PlaybackMode.LoopingInBackground)
        tiles.setTilemap(tilemap`level_5chase`)
        info.startCountdown(120)
    } else if (level == 8) {
        music.stopAllSounds()
        info.stopCountdown()
        zachisholdingshotgun = false
        zachisgolden = false
        AMMOBAR.setBarSize(0, 0)
        AMMOBAR.setLabel(" ")
        initializeHeroAnimations()
        scene.setBackgroundImage(assets.image`house`)
        tiles.setCurrentTilemap(tilemap`level42`)
    } else if (level == 1000) {
        tiles.setCurrentTilemap(tilemap`levellevelselect`)
        music.play(music.createSong(assets.song`ending_theme`), music.PlaybackMode.LoopingInBackground)
        showInstruction("You killed the creator, so the game ends.")
        showInstruction("This is where you will remain now.")
        showInstruction("ENDING: ENDLESS ENCAGEMENT")
        game.setGameOverMessage(true, "THE END")
        game.gameOver(true)
    } else if (level == -1) {
        scene.setBackgroundImage(assets.image`house`)
        tiles.setCurrentTilemap(tilemap`levellevelselect`)
    }
    initializeLevel(level)
}
controller.combos.attachCombo("ududlrlrbaa", function () {
    music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.InBackground)
    zachisgolden = true
    zachisholdingshotgun = true
    sprites.setDataNumber(hero, "Ammo", 999)
    info.setLife(999)
    initializeGOLDGUNanimations()
    createshotgunbar()
    controller.moveSprite(hero, 210, 0)
    showInstruction("debug mode activated.")
    showInstruction("You can now access any level through an input.")
    showInstruction("press Up-Up-B-B to go to the Level Select room.")
    debugmodeON = true
})
controller.combos.attachCombo("lrdu", function () {
    for (let index = 0; index < 10; index++) {
        upwardwave = sprites.createProjectileFromSprite(assets.image`upwardwave`, hero, 0, -250)
        upwardwave.setKind(SpriteKind.upwardwave)
    }
})
function initializeFlierAnimations () {
    flierFlying = animation.createAnimation(ActionKind.Flying, 100)
    flierFlying.addAnimationFrame(img`
        4 4 4 4 . . 4 4 4 4 . . . 4 4 4 
        5 5 5 4 4 4 4 5 5 4 4 4 4 4 5 5 
        5 5 5 4 5 5 4 5 5 4 5 5 5 4 5 5 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 5 5 2 2 2 2 2 5 5 2 2 2 2 
        2 2 2 5 2 5 2 2 2 5 2 5 2 2 2 2 
        2 2 2 5 2 2 5 2 5 2 2 5 2 2 2 2 
        2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
        2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
        2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
        2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
        2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
        2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        `)
    flierFlying.addAnimationFrame(img`
        4 4 4 4 . . 4 4 4 4 . . . 4 4 4 
        5 5 5 4 4 4 4 5 5 4 4 4 4 4 5 5 
        5 5 5 4 5 5 4 5 5 4 5 5 5 4 5 5 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 5 5 2 2 2 2 2 5 5 2 2 2 2 
        2 2 2 5 2 5 2 2 2 5 2 5 2 2 2 2 
        2 2 2 5 2 2 5 2 5 2 2 5 2 2 2 2 
        2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
        2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
        2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
        2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
        2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
        2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        `)
    flierFlying.addAnimationFrame(img`
        4 4 4 4 . . 4 4 4 4 . . . 4 4 4 
        5 5 5 4 4 4 4 5 5 4 4 4 4 4 5 5 
        5 5 5 4 5 5 4 5 5 4 5 5 5 4 5 5 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 5 5 2 2 2 2 2 5 5 2 2 2 2 
        2 2 2 5 2 5 2 2 2 5 2 5 2 2 2 2 
        2 2 2 5 2 2 5 2 5 2 2 5 2 2 2 2 
        2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
        2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
        2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
        2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
        2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
        2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        `)
    flierIdle = animation.createAnimation(ActionKind.Idle, 100)
    flierIdle.addAnimationFrame(img`
        4 4 4 4 . . 4 4 4 4 . . . 4 4 4 
        5 5 5 4 4 4 4 5 5 4 4 4 4 4 5 5 
        5 5 5 4 5 5 4 5 5 4 5 5 5 4 5 5 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 5 5 2 2 2 2 2 5 5 2 2 2 2 
        2 2 2 5 2 5 2 2 2 5 2 5 2 2 2 2 
        2 2 2 5 2 2 5 2 5 2 2 5 2 2 2 2 
        2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
        2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
        2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
        2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
        2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
        2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        `)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (zachisgolden == false && zachisholdingshotgun == false) {
        attemptJump()
        animateJumps()
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.UntilDone)
        animateJumps()
    }
    if (controller.down.isPressed() && (zachisholdingshotgun && zachisgolden) == false) {
        animation.stopAnimation(animation.AnimationTypes.All, hero)
        animateJumps()
        hero.vy += -150
        pauseUntil(() => hero.isHittingTile(CollisionDirection.Bottom))
    }
    if (controller.down.isPressed() && (zachisholdingshotgun == true && zachisgolden) == false) {
        animation.stopAnimation(animation.AnimationTypes.All, hero)
        animateSHOTGUNJUMP()
        hero.vy += -150
        pauseUntil(() => hero.isHittingTile(CollisionDirection.Bottom))
    }
    if (controller.down.isPressed() && (zachisholdingshotgun == false && zachisgolden) == true) {
        animation.stopAnimation(animation.AnimationTypes.All, hero)
        animatepower()
        hero.vy += -200
        pauseUntil(() => hero.isHittingTile(CollisionDirection.Bottom))
    }
    if (controller.down.isPressed() && (zachisholdingshotgun == true && zachisgolden) == true) {
        animation.stopAnimation(animation.AnimationTypes.All, hero)
        animateGOLDGUNJUMP()
        hero.vy += -200
        pauseUntil(() => hero.isHittingTile(CollisionDirection.Bottom))
    }
    if (zachisholdingshotgun == false && info.score() > 99) {
        animatepower()
        hero.vy += -200
        pause(100)
        hero.sayText("It's Zachary Time.", 1000, true)
        zachisgolden = true
        animatepower()
        initializegoldanimation()
        showInstruction("Congrats, you've unlocked Golden Zach!")
        showInstruction("Show your unmatched power to the world!")
        hero.startEffect(effects.fire, 2000)
        info.setLife(100)
        info.setScore(0)
        controller.moveSprite(hero, 210, 0)
    } else if (zachisholdingshotgun == true && info.score() > 199) {
        animateGOLDGUNJUMP()
        zachisgolden = true
        showInstruction("Are you not strong enough as is?!")
        hero.sayText("no", 1000, false)
        showInstruction("Ugh, fine. Press Enter/B to shoot.")
        showInstruction("Spam E, Enter, and X to Fire really, really fast.")
        hero.sayText("bet.", 1000, false)
        initializeGOLDGUNanimations()
        info.setLife(100)
        info.setScore(0)
        controller.moveSprite(hero, 210, 0)
    } else if (zachisgolden == true && zachisholdingshotgun == true) {
        animateGOLDGUNJUMP()
        hero.vy += -200
        FUCKINGBULLET = sprites.createProjectileFromSprite(assets.image`goldbulletright`, hero, 500, 0)
        FUCKINGBULLET.setKind(SpriteKind.GOLDENBullet)
        FUCKINGBULLET = sprites.createProjectileFromSprite(assets.image`goldbulletleft`, hero, -500, 0)
        FUCKINGBULLET.setKind(SpriteKind.GOLDENBullet)
        FUCKINGBULLET = sprites.createProjectileFromSprite(assets.image`goldbulletup0`, hero, 0, 1000)
        FUCKINGBULLET.setKind(SpriteKind.GOLDENBullet)
        FUCKINGBULLET = sprites.createProjectileFromSprite(assets.image`goldbulletdown`, hero, 0, -1000)
        FUCKINGBULLET.setKind(SpriteKind.GOLDENBullet)
        pause(100)
    }
    if (zachisgolden == true && zachisholdingshotgun == false) {
        hero.vy += -200
        pause(100)
        animatepower()
    }
    if (zachisgolden == false && zachisholdingshotgun == true) {
        animateSHOTGUNJUMP()
        attemptJump()
        pauseUntil(() => hero.isHittingTile(CollisionDirection.Bottom))
    }
})
function animateGDASH () {
    // Because there isn't currently an easy way to say "play this animation a single time
    // and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    // the same behavior
    GDASH = animation.createAnimation(ActionKind.JumpingLeft, 100)
    animation.attachAnimation(hero, GDASH)
    for (let index = 0; index < 30; index++) {
        GDASH.addAnimationFrame(assets.image`golddashleft`)
    }
    GDASH = animation.createAnimation(ActionKind.JumpingRight, 100)
    animation.attachAnimation(hero, GDASH)
    for (let index = 0; index < 30; index++) {
        GDASH.addAnimationFrame(assets.image`golddashright`)
    }
}
sprites.onOverlap(SpriteKind.GOLDENBullet, SpriteKind.Mage, function (sprite, otherSprite) {
    statusbar.value += -2
    sprites.changeDataNumberBy(otherSprite, "HP", -2)
    sprites.destroy(sprite)
    if (Math.percentChance(15)) {
        info.changeScoreBy(1)
        info.changeLifeBy(1)
    }
    hero.sayText("BOSS HP =" + statusbar.value, 2000, false)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
    scene.cameraShake(4, 500)
    if (sprites.readDataNumber(otherSprite, "HP") == 0) {
        sprites.destroy(otherSprite)
        hero.sayText("Man those fireballs were annoying", 5000, false)
        info.changeScoreBy(15)
        tiles.placeOnRandomTile(hero, assets.tile`myTile2`)
        sprites.destroyAllSpritesOfKind(SpriteKind.Fireball)
    }
})
function animateRun () {
    mainRunLeft = animation.createAnimation(ActionKind.RunningLeft, 250)
    animation.attachAnimation(hero, mainRunLeft)
    mainRunLeft.addAnimationFrame(assets.image`zachwalkingleft4`)
    mainRunLeft.addAnimationFrame(assets.image`zachwalkingleftv22`)
    mainRunLeft.addAnimationFrame(assets.image`zachwalkingleft4`)
    mainRunLeft.addAnimationFrame(assets.image`zachwalkingleftv2`)
    mainRunRight = animation.createAnimation(ActionKind.RunningRight, 250)
    animation.attachAnimation(hero, mainRunRight)
    mainRunRight.addAnimationFrame(assets.image`zachwalkingright3`)
    mainRunRight.addAnimationFrame(assets.image`zachwalkingrightv1`)
    mainRunRight.addAnimationFrame(assets.image`zachwalkingright3`)
    mainRunRight.addAnimationFrame(assets.image`zachwalkingrightv0`)
}
function animateGOLDGUNJUMP () {
    // Because there isn't currently an easy way to say "play this animation a single time
    // and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    // the same behavior
    GOLDGUNJUMP = animation.createAnimation(ActionKind.JumpingLeft, 100)
    animation.attachAnimation(hero, GOLDGUNJUMP)
    for (let index = 0; index < 30; index++) {
        GOLDGUNJUMP.addAnimationFrame(assets.image`goldenzachjumpingleftwithashotgun`)
    }
    GOLDGUNJUMP = animation.createAnimation(ActionKind.JumpingRight, 100)
    animation.attachAnimation(hero, GOLDGUNJUMP)
    for (let index = 0; index < 30; index++) {
        GOLDGUNJUMP.addAnimationFrame(assets.image`goldenzachjumpingrightwithashotgun`)
    }
}
sprites.onOverlap(SpriteKind.Bullet, SpriteKind.Moving_Target, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    tiles.placeOnTile(hero, tiles.getTileLocation(21, 43))
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile50`, function (sprite, location) {
    sprites.destroyAllSpritesOfKind(SpriteKind.FLYINGSQUARE)
    info.changeLifeBy(1)
    currentLevel += 1
    if (hasNextLevel()) {
        game.splash("Next level unlocked!")
        setLevelTileMap(currentLevel)
        if (zachisholdingshotgun) {
            refreshshotgunbar()
        }
    } else {
        game.over(true, effects.confetti)
    }
})
scene.onOverlapTile(SpriteKind.Bullet, assets.tile`Stone`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    tiles.setWallAt(location, false)
})
function animateJumps () {
    // Because there isn't currently an easy way to say "play this animation a single time
    // and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    // the same behavior
    mainJumpLeft = animation.createAnimation(ActionKind.JumpingLeft, 100)
    animation.attachAnimation(hero, mainJumpLeft)
    for (let index = 0; index < 30; index++) {
        mainJumpLeft.addAnimationFrame(assets.image`zachjump2`)
    }
    mainJumpRight = animation.createAnimation(ActionKind.JumpingRight, 100)
    animation.attachAnimation(hero, mainJumpRight)
    for (let index = 0; index < 30; index++) {
        mainJumpRight.addAnimationFrame(assets.image`zachjumpright`)
    }
}
function animateGOLDBANG () {
    // Because there isn't currently an easy way to say "play this animation a single time
    // and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    // the same behavior
    GOLDBANG = animation.createAnimation(ActionKind.JumpingLeft, 100)
    animation.attachAnimation(hero, GOLDBANG)
    for (let index = 0; index < 30; index++) {
        GOLDBANG.addAnimationFrame(assets.image`goldenzachfacingleftfiringashotgun`)
    }
    GOLDBANG = animation.createAnimation(ActionKind.JumpingRight, 100)
    animation.attachAnimation(hero, GOLDBANG)
    for (let index = 0; index < 30; index++) {
        GOLDBANG.addAnimationFrame(assets.image`goldenzachfacingrightfiringashotgun`)
    }
}
function initializegoldanimation () {
    animatepower()
    animateGKICK()
    animateGDASH()
    animateGCROUCH()
    animategoldidle()
    animateGRUN()
}
sprites.onCreated(SpriteKind.GOLDENBullet, function (sprite) {
    sprite.setFlag(SpriteFlag.GhostThroughWalls, true)
})
function animateCrouch () {
    mainCrouchLeft = animation.createAnimation(ActionKind.CrouchLeft, 100)
    animation.attachAnimation(hero, mainCrouchLeft)
    mainCrouchLeft.addAnimationFrame(assets.image`zachcrouchleft0`)
    mainCrouchRight = animation.createAnimation(ActionKind.CrouchRight, 100)
    animation.attachAnimation(hero, mainCrouchRight)
    mainCrouchRight.addAnimationFrame(assets.image`zachcrouchright`)
}
scene.onHitWall(SpriteKind.Flier, function (sprite, location) {
    if (tiles.tileAtLocationIsWall(location)) {
        tiles.setWallAt(location, false)
        tiles.setTileAt(location, assets.tile`transparency16`)
        scene.cameraShake(4, 150)
        flier.setVelocity(100, 100)
    }
})
sprites.onOverlap(SpriteKind.GOLDENBullet, SpriteKind.KingSquare, function (sprite, otherSprite) {
    statusbar.value += -2
    sprites.changeDataNumberBy(otherSprite, "HP", -2)
    sprites.destroy(sprite)
    if (sprites.readDataNumber(otherSprite, "HP") == statusbar.max - 10) {
        kingsquare.follow(hero, 2.5)
        controller.moveSprite(hero, 1, 0)
        game.showLongText("MASH SHOOT!!!!", DialogLayout.Bottom)
        kingsquare.setStayInScreen(false)
    }
    kingsquare.sayText("BOSS HP =" + sprites.readDataNumber(otherSprite, "HP"), 2000, false)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
    scene.cameraShake(4, 500)
    if (sprites.readDataNumber(otherSprite, "HP") <= 0) {
        sprites.destroy(otherSprite)
        music.stopAllSounds()
        hero.sayText("Game, Set and Match!", 5000, false)
        controller.moveSprite(hero, 210, 0)
        music.play(music.createSong(assets.song`victorious`), music.PlaybackMode.UntilDone)
        currentLevel += 1
        if (hasNextLevel()) {
            game.splash("Next level unlocked!")
            setLevelTileMap(currentLevel)
            refreshshotgunbar()
        } else {
            game.over(true, effects.confetti)
        }
    }
})
function clearGame () {
    for (let value of sprites.allOfKind(SpriteKind.Bumper)) {
        value.destroy()
    }
    for (let value2 of sprites.allOfKind(SpriteKind.Coin)) {
        value2.destroy()
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Goal)) {
        value3.destroy()
    }
    for (let value4 of sprites.allOfKind(SpriteKind.Flier)) {
        value4.destroy()
    }
}
sprites.onOverlap(SpriteKind.Fireball, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Fireball)
    info.changeLifeBy(-1)
    hero.sayText("IT BURNS!!!")
    pause(invincibilityPeriod)
})
controller.combos.attachCombo("lrdr", function () {
    for (let index = 0; index < 10; index++) {
        upwardwave = sprites.createProjectileFromSprite(assets.image`rightwardwave`, hero, 250, 0)
        upwardwave.setKind(SpriteKind.upwardwave)
    }
})
sprites.onOverlap(SpriteKind.upwardwave, SpriteKind.Bumper, function (sprite, otherSprite) {
    info.changeScoreBy(3)
    otherSprite.sayText("ACK")
    sprites.destroy(otherSprite, effects.fire, 500)
})
function createshotgunbar () {
    for (let index = 0; index < 1; index++) {
        AMMOBAR = statusbars.create(20, 4, StatusBarKind.Health)
        AMMOBAR.setLabel("AMMO")
        AMMOBAR.max = 100
        AMMOBAR.value = sprites.readDataNumber(hero, "Ammo")
        AMMOBAR.attachToSprite(hero)
        AMMOBAR.setColor(5, 4)
    }
}
function animategoldidle () {
    goldidle = animation.createAnimation(ActionKind.IdleLeft, 100)
    animation.attachAnimation(hero, goldidle)
    goldidle.addAnimationFrame(assets.image`goldenzachleft0`)
    goldidle = animation.createAnimation(ActionKind.IdleRight, 100)
    animation.attachAnimation(hero, goldidle)
    goldidle.addAnimationFrame(assets.image`goldenzachright`)
}
scene.onHitWall(SpriteKind.upwardwave, function (sprite, location) {
    if (tiles.tileAtLocationEquals(location, assets.tile`tile3`)) {
        tiles.setTileAt(location, assets.tile`transparency16`)
        tiles.setWallAt(location, false)
        upwardwave = sprites.createProjectileFromSprite(assets.image`leftwardwave`, hero, 0, -250)
    }
})
function animateBANGBANGup () {
    // Because there isn't currently an easy way to say "play this animation a single time
    // and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    // the same behavior
    BANGBANG = animation.createAnimation(ActionKind.JumpingLeft, 100)
    animation.attachAnimation(hero, BANGBANG)
    for (let index = 0; index < 30; index++) {
        BANGBANG.addAnimationFrame(assets.image`BANGBANGup0`)
    }
    // Because there isn't currently an easy way to say "play this animation a single time
    // and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    // the same behavior
    BANGBANG = animation.createAnimation(ActionKind.JumpingLeft, 100)
    animation.attachAnimation(hero, BANGBANG)
    for (let index = 0; index < 30; index++) {
        BANGBANG.addAnimationFrame(assets.image`BANGBANGup`)
    }
}
function animateGRUN () {
    GRUN = animation.createAnimation(ActionKind.RunningLeft, 25)
    animation.attachAnimation(hero, GRUN)
    GRUN.addAnimationFrame(assets.image`goldwalkleft1`)
    GRUN.addAnimationFrame(assets.image`goldwalkleft7`)
    GRUN.addAnimationFrame(assets.image`goldwalkleft8`)
    GRUN = animation.createAnimation(ActionKind.RunningRight, 25)
    animation.attachAnimation(hero, GRUN)
    GRUN.addAnimationFrame(assets.image`goldwalkright 1`)
    GRUN.addAnimationFrame(assets.image`goldwalkright 2`)
    GRUN.addAnimationFrame(assets.image`goldwalkright 4`)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile1`, function (sprite, location) {
    info.changeLifeBy(1)
    currentLevel += 1
    if (hasNextLevel()) {
        game.splash("Next level unlocked!")
        setLevelTileMap(currentLevel)
        if (zachisholdingshotgun) {
            refreshshotgunbar()
        }
    } else {
        game.over(true, effects.confetti)
    }
})
function animateGOLDGUNIDLE () {
    GOLDENGUNIDLE = animation.createAnimation(ActionKind.IdleLeft, 100)
    animation.attachAnimation(hero, GOLDENGUNIDLE)
    GOLDENGUNIDLE.addAnimationFrame(assets.image`goldzachfacingleftwithashotgun1`)
    GOLDENGUNIDLE = animation.createAnimation(ActionKind.IdleRight, 100)
    animation.attachAnimation(hero, GOLDENGUNIDLE)
    GOLDENGUNIDLE.addAnimationFrame(assets.image`goldzachfacingrightwithashotgun1`)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Flier, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.say("FUCK YOU!", invincibilityPeriod * 1.5)
    music.powerDown.play()
    pause(invincibilityPeriod * 1.5)
})
function animatepower () {
    // Because there isn't currently an easy way to say "play this animation a single time
    // and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    // the same behavior
    power2 = animation.createAnimation(ActionKind.JumpingLeft, 100)
    animation.attachAnimation(hero, power2)
    for (let index = 0; index < 30; index++) {
        power2.addAnimationFrame(assets.image`goldjumpright`)
    }
    power2 = animation.createAnimation(ActionKind.JumpingRight, 100)
    animation.attachAnimation(hero, power2)
    for (let index = 0; index < 30; index++) {
        power2.addAnimationFrame(assets.image`goldjumpleft`)
    }
}
controller.combos.attachCombo("lrdl", function () {
    for (let index = 0; index < 10; index++) {
        upwardwave = sprites.createProjectileFromSprite(assets.image`leftwardwave`, hero, -250, 0)
        upwardwave.setKind(SpriteKind.upwardwave)
    }
})
function animateGCROUCH () {
    GCROUCH = animation.createAnimation(ActionKind.CrouchLeft, 100)
    animation.attachAnimation(hero, GCROUCH)
    GCROUCH.addAnimationFrame(assets.image`goldcrouchright`)
    GCROUCH = animation.createAnimation(ActionKind.CrouchRight, 100)
    animation.attachAnimation(hero, GCROUCH)
    GCROUCH.addAnimationFrame(assets.image`goldcrouchright`)
}
scene.onHitWall(SpriteKind.Bullet, function (sprite, location) {
    if (tiles.tileAtLocationEquals(location, assets.tile`Stone`)) {
        tiles.setTileAt(location, assets.tile`transparency16`)
        tiles.setWallAt(location, false)
    } else if (tiles.tileAtLocationEquals(location, assets.tile`tile3`)) {
        tiles.setTileAt(location, assets.tile`transparency16`)
        tiles.setWallAt(location, false)
    } else if (tiles.tileAtLocationEquals(location, assets.tile`bulletblock0`)) {
        hero.y += 25
        sprites.destroyAllSpritesOfKind(SpriteKind.Bullet)
    }
})
function animateGKICK () {
    // Because there isn't currently an easy way to say "play this animation a single time
    // and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    // the same behavior
    GKICK = animation.createAnimation(ActionKind.JumpingLeft, 100)
    animation.attachAnimation(hero, GKICK)
    for (let index = 0; index < 30; index++) {
        GKICK.addAnimationFrame(assets.image`goldpunchleft`)
    }
    GKICK = animation.createAnimation(ActionKind.JumpingRight, 100)
    animation.attachAnimation(hero, GKICK)
    for (let index = 0; index < 30; index++) {
        GKICK.addAnimationFrame(assets.image`goldpunchright`)
    }
}
function createEnemies () {
    // enemy that moves back and forth
    for (let value10 of tiles.getTilesByType(assets.tile`boss`)) {
        PlayerBoss = sprites.create(assets.image`playerfacingleft`, SpriteKind.Player1)
        info.setLife(100)
        PlayerBoss.scale = 1
        statusbar = statusbars.create(100, 25, StatusBarKind.Health)
        statusbar.attachToSprite(hero)
        statusbar.value = 100
        statusbar.setColor(7, 2, 4)
        statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
        statusbar.setLabel("YOUR HP")
        tiles.placeOnTile(PlayerBoss, value10)
        tiles.setTileAt(value10, assets.tile`tile0`)
        PlayerBoss.follow(hero, 250)
        PlayerBoss.vx = 250
        sprites.setDataNumber(PlayerBoss, "HP", 150)
        PlayerBoss.ay = gravity
        PlayerBoss.setBounceOnWall(true)
        showInstruction("This boss fight will be left unfinished so uh, die.")
    }
    // enemy that moves back and forth
    for (let value10 of tiles.getTilesByType(assets.tile`crown`)) {
        kingsquare = sprites.create(assets.image`kingsquare0`, SpriteKind.KingSquare)
        bumper.scale = 15
        statusbar = statusbars.create(40, 4, StatusBarKind.Health)
        statusbar.attachToSprite(kingsquare)
        statusbar.max = 100
        statusbar.value = 100
        statusbar.setColor(7, 2, 4)
        statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
        statusbar.setLabel("KING SQUARE HP")
        tiles.placeOnTile(kingsquare, value10)
        tiles.setTileAt(value10, assets.tile`tile0`)
        kingsquare.vy = 150
        kingsquare.setBounceOnWall(true)
        kingsquare.vx = 50
        sprites.setDataNumber(kingsquare, "HP", 5)
    }
    // enemy that moves back and forth
    for (let value12 of tiles.getTilesByType(assets.tile`rizzard`)) {
        rizzard = sprites.create(assets.image`rizzard`, SpriteKind.Mage)
        rizzard.scale = 1.25
        tiles.placeOnTile(rizzard, value12)
        tiles.setTileAt(value12, assets.tile`tile0`)
        statusbar = statusbars.create(80, 8, StatusBarKind.Health)
        statusbar.attachToSprite(rizzard)
        statusbar.max = 100
        statusbar.value = 100
        statusbar.setColor(7, 2, 4)
        statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
        statusbar.setLabel("MAGE HP")
        tiles.placeOnTile(rizzard, value12)
        tiles.setTileAt(value12, assets.tile`tile0`)
        rizzard.ay = 5 * pixelsToMeters
        sprites.setDataNumber(rizzard, "HP", 100)
    }
    // enemy that moves back and forth
    for (let value5 of tiles.getTilesByType(assets.tile`tile4`)) {
        bumper = sprites.create(assets.image`pawnsquare`, SpriteKind.Bumper)
        bumper.scale = 2
        tiles.placeOnTile(bumper, value5)
        tiles.setTileAt(value5, assets.tile`tile0`)
        bumper.ay = gravity
        if (Math.percentChance(50)) {
            bumper.vx = Math.randomRange(30, 60)
        } else {
            bumper.vx = Math.randomRange(-60, -30)
        }
    }
    // enemy that flies at player
    for (let value6 of tiles.getTilesByType(assets.tile`tile7`)) {
        flier = sprites.create(img`
            4 4 4 4 . . 4 4 4 4 . . . 4 4 4 
            5 5 5 4 4 4 4 5 5 4 4 4 4 4 5 5 
            5 5 5 4 5 5 4 5 5 4 5 5 5 4 5 5 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 5 5 2 2 2 2 2 5 5 2 2 2 2 
            2 2 2 5 2 5 2 2 2 5 2 5 2 2 2 2 
            2 2 2 5 2 2 5 2 5 2 2 5 2 2 2 2 
            2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
            2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
            2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
            2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
            2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
            2 2 2 5 2 2 2 5 2 2 2 5 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            `, SpriteKind.Flier)
        tiles.placeOnTile(flier, value6)
        tiles.setTileAt(value6, assets.tile`tile0`)
        animation.attachAnimation(flier, flierFlying)
        animation.attachAnimation(flier, flierIdle)
    }
    // enemy that flies at player
    for (let value11 of tiles.getTilesByType(assets.tile`FLYSQUARE`)) {
        info.startCountdown(90)
        flyingsquare = sprites.create(assets.image`squarebutbetter0`, SpriteKind.FLYINGSQUARE)
        tiles.placeOnTile(flyingsquare, value11)
        tiles.setTileAt(value11, assets.tile`tile0`)
        flyingsquare.follow(hero, 75)
        flyingsquare.setStayInScreen(false)
    }
    // enemy that flies at player
    for (let value13 of tiles.getTilesByType(assets.tile`movingtarget`)) {
        movingtarget = sprites.create(img`
            9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
            9 1 8 1 1 1 1 1 1 1 1 1 1 8 9 
            9 1 9 9 9 9 9 9 9 9 9 9 9 1 9 
            9 1 9 9 9 9 9 9 9 9 9 9 9 1 9 
            9 1 9 9 8 1 1 1 1 1 8 9 9 1 9 
            9 1 9 9 1 8 1 1 1 8 1 9 9 1 9 
            9 1 9 9 1 1 9 9 9 1 1 9 9 1 9 
            9 1 9 9 1 1 9 9 9 1 1 9 9 1 9 
            9 1 9 9 1 1 9 9 9 1 1 9 9 1 9 
            9 1 9 9 1 8 1 1 1 8 1 9 9 1 9 
            9 1 9 9 8 1 1 1 1 1 8 9 9 1 9 
            9 1 9 9 9 9 9 9 9 9 9 9 9 1 9 
            9 1 9 9 9 9 9 9 9 9 9 9 9 1 9 
            9 8 1 1 1 1 1 1 1 1 1 1 1 8 9 
            9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
            `, SpriteKind.Moving_Target)
        tiles.placeOnTile(movingtarget, value13)
        tiles.setTileAt(value13, assets.tile`tile0`)
        movingtarget.setBounceOnWall(true)
        movingtarget.vy = 75
    }
    // enemy that flies at player
    for (let value14 of tiles.getTilesByType(assets.tile`you`)) {
        yourself = sprites.create(assets.image`yourselfleft`, SpriteKind.NotZach)
        tiles.placeOnTile(yourself, value14)
        tiles.setTileAt(value14, assets.tile`tile0`)
        yourself.ay = gravity
        yourself.vx = 150
        sprites.setDataNumber(yourself, "HP", 50)
        yourself.setFlag(SpriteFlag.BounceOnWall, true)
        yourselfhp = statusbars.create(20, 4, StatusBarKind.Health)
        yourselfhp.attachToSprite(yourself)
        yourselfhp.max = 100
        yourselfhp.value = 100
        yourselfhp.setColor(2, 7, 9)
        statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, false)
        yourselfhp.setLabel("YOUR HP")
    }
    // enemy that flies at player
    for (let value15 of tiles.getTilesByType(assets.tile`you0`)) {
        if (sprites.readDataNumber(yourself, "HP") == 0) {
            tiles.setTileAt(value15, assets.tile`transparency16`)
            tiles.setWallAt(value15, false)
        }
    }
    // enemy that flies at player
    for (let value16 of tiles.getTilesByType(assets.tile`Alex`)) {
        Alex = sprites.create(assets.image`zachfacingleft0`, SpriteKind.Alex)
        Alex.scale = 1
        tiles.placeOnTile(Alex, value16)
        tiles.setTileAt(value16, assets.tile`tile0`)
    }
    // enemy that flies at player
    for (let value17 of tiles.getTilesByType(assets.tile`A`)) {
        A = sprites.create(assets.image`A`, SpriteKind.A)
        A.scale = 1
        tiles.placeOnTile(A, value17)
        tiles.setTileAt(value17, assets.tile`tile0`)
    }
}
function animateBANGBANG () {
    // Because there isn't currently an easy way to say "play this animation a single time
    // and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    // the same behavior
    BANGBANG = animation.createAnimation(ActionKind.JumpingLeft, 100)
    animation.attachAnimation(hero, BANGBANG)
    for (let index = 0; index < 30; index++) {
        BANGBANG.addAnimationFrame(assets.image`BANGBANGleft0`)
    }
    BANGBANG = animation.createAnimation(ActionKind.JumpingRight, 100)
    animation.attachAnimation(hero, BANGBANG)
    for (let index = 0; index < 30; index++) {
        BANGBANG.addAnimationFrame(assets.image`BANGBANGright1`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.KingSquare, function (sprite, otherSprite) {
    if (sprite.vy > 0 && !(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y < otherSprite.top) {
        info.changeLifeBy(1)
        statusbar.value += -20
        hero.sayText("BOSS HP =" + statusbar.value, 2000, false)
        music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
        sprites.changeDataNumberBy(otherSprite, "HP", -1)
        otherSprite.vx += randint(25, -25)
        scene.cameraShake(4, 500)
        if (sprites.readDataNumber(otherSprite, "HP") > 0) {
            pause(2000)
        }
        if (sprites.readDataNumber(otherSprite, "HP") == 0) {
            sprites.destroy(otherSprite)
            music.stopAllSounds()
            hero.sayText("Game, Set and Match!", 5000, false)
            music.play(music.createSong(assets.song`victorious`), music.PlaybackMode.UntilDone)
            currentLevel += 1
            if (hasNextLevel()) {
                game.splash("Next level unlocked!")
                setLevelTileMap(currentLevel)
            } else {
                game.over(true, effects.confetti)
            }
        }
    } else {
        info.changeLifeBy(-1)
        pause(invincibilityPeriod)
        sprite.say("OW!", invincibilityPeriod)
        music.powerDown.play()
    }
})
function animateSHOTGUNJUMP () {
    // Because there isn't currently an easy way to say "play this animation a single time
    // and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    // the same behavior
    SHOTGUNJUMP = animation.createAnimation(ActionKind.JumpingLeft, 100)
    animation.attachAnimation(hero, SHOTGUNJUMP)
    for (let index = 0; index < 30; index++) {
        SHOTGUNJUMP.addAnimationFrame(assets.image`zachjumpingleftwithashotgun`)
    }
    SHOTGUNJUMP = animation.createAnimation(ActionKind.JumpingRight, 100)
    animation.attachAnimation(hero, SHOTGUNJUMP)
    for (let index = 0; index < 30; index++) {
        SHOTGUNJUMP.addAnimationFrame(assets.image`zachjumpingrightwithashotgun0`)
    }
}
function animateKicks () {
    // Because there isn't currently an easy way to say "play this animation a single time
    // and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    // the same behavior
    kick = animation.createAnimation(ActionKind.JumpingLeft, 100)
    animation.attachAnimation(hero, kick)
    for (let index = 0; index < 30; index++) {
        kick.addAnimationFrame(assets.image`zachpunchright0`)
    }
    kick = animation.createAnimation(ActionKind.JumpingRight, 100)
    animation.attachAnimation(hero, kick)
    for (let index = 0; index < 30; index++) {
        kick.addAnimationFrame(assets.image`zachpunchleft0`)
    }
}
function initializeSHOTGUNanimations () {
    animateSHOTGUNRUN()
    animateSHOTGUNidle()
    animateSHOTGUNCROUCH()
    animateSHOTGUNJUMP()
    animateBANGBANGup()
    animateBANGBANG()
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(hero.isHittingTile(CollisionDirection.Bottom))) {
        hero.vy += 500
        music.play(music.melodyPlayable(music.jumpDown), music.PlaybackMode.UntilDone)
    } else if (controller.A.isPressed()) {
        attemptJump()
    }
    if (zachisholdingshotgun == true && zachisgolden == false) {
        for (let index = 0; index < 2; index++) {
            FUCKINGBULLET = sprites.createProjectileFromSprite(assets.image`FUCKINGBULLETV2DOWN`, hero, 0, 1000)
            FUCKINGBULLET.setKind(SpriteKind.Bullet)
            pause(25)
        }
    }
    if (zachisholdingshotgun == true && zachisgolden == true) {
        for (let index = 0; index < 6; index++) {
            FUCKINGBULLET = sprites.createProjectileFromSprite(assets.image`FUCKINGBULLETV2DOWN0`, hero, 0, 1000)
            FUCKINGBULLET.setKind(SpriteKind.Bullet)
            pause(2)
        }
    }
})
function animatePlayerBossWalk () {
    pbossrun = animation.createAnimation(ActionKind.Walking, 150)
    animation.attachAnimation(PlayerBoss, pbossrun)
    pbossrun.addAnimationFrame(assets.image`playerfacingleft`)
    pbossrun.addAnimationFrame(assets.image`playerrunleft0`)
    pbossrun.addAnimationFrame(assets.image`playerfacingleft`)
    pbossrun.addAnimationFrame(assets.image`playerrunleft1`)
}
function ShotgunInput () {
    if (sprites.readDataNumber(hero, "Ammo") > 0) {
        if (zachisholdingshotgun && heroFacingLeft == false && zachisgolden == false) {
            animateBANGBANG()
            for (let index = 0; index < 1; index++) {
                FUCKINGBULLET = sprites.createProjectileFromSprite(assets.image`FUCKINGBULLET1`, hero, 500, 0)
                FUCKINGBULLET.setKind(SpriteKind.Bullet)
                pause(1)
            }
            pause(1)
            sprites.changeDataNumberBy(hero, "Ammo", -1)
            AMMOBAR.value += -1
        } else if (zachisholdingshotgun && heroFacingLeft == true && zachisgolden == false) {
            animateBANGBANG()
            for (let index = 0; index < 1; index++) {
                FUCKINGBULLET = sprites.createProjectileFromSprite(assets.image`FUCKINGBULLETV2LEFT`, hero, -500, 0)
                FUCKINGBULLET.setKind(SpriteKind.Bullet)
                pause(1)
            }
            pause(1)
            sprites.changeDataNumberBy(hero, "Ammo", -1)
            AMMOBAR.value += -1
        }
        if (zachisholdingshotgun && heroFacingLeft == false && zachisgolden == true) {
            animateGOLDBANG()
            for (let index = 0; index < 5; index++) {
                FUCKINGBULLET = sprites.createProjectileFromSprite(assets.image`FUCKINGBULLET0`, hero, 500, 0)
                FUCKINGBULLET.setKind(SpriteKind.GOLDENBullet)
                pause(0.5)
            }
            pause(0.5)
            sprites.changeDataNumberBy(hero, "Ammo", -1)
            AMMOBAR.value += -1
        } else if (zachisholdingshotgun && heroFacingLeft == true && zachisgolden == true) {
            animateGOLDBANG()
            for (let index = 0; index < 5; index++) {
                FUCKINGBULLET = sprites.createProjectileFromSprite(assets.image`FUCKINGBULLETV2LEFT0`, hero, -500, 0)
                FUCKINGBULLET.setKind(SpriteKind.GOLDENBullet)
                pause(0.5)
            }
            pause(0.5)
            sprites.changeDataNumberBy(hero, "Ammo", -1)
            AMMOBAR.value += -1
        }
    }
}
function refreshshotgunbar () {
    for (let index = 0; index < 1; index++) {
        AMMOBAR.value = sprites.readDataNumber(hero, "Ammo")
    }
}
function showInstruction (text: string) {
    game.showLongText(text, DialogLayout.Bottom)
    music.baDing.play()
    info.changeScoreBy(0)
}
function animateSHOTGUNCROUCH () {
    SHOTGUNCROUCH = animation.createAnimation(ActionKind.CrouchLeft, 100)
    animation.attachAnimation(hero, SHOTGUNCROUCH)
    SHOTGUNCROUCH.addAnimationFrame(assets.image`zachcrouchingleftwithashotgun`)
    SHOTGUNCROUCH = animation.createAnimation(ActionKind.CrouchRight, 100)
    animation.attachAnimation(hero, SHOTGUNCROUCH)
    SHOTGUNCROUCH.addAnimationFrame(assets.image`zachcrouchingrightwithashotgun0`)
}
scene.onOverlapTile(SpriteKind.GOLDENBullet, assets.tile`tile3`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    tiles.setWallAt(location, false)
})
scene.onOverlapTile(SpriteKind.Bullet, assets.tile`tile3`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    tiles.setWallAt(location, false)
})
function initializeHeroAnimations () {
    animateRun()
    animateIdle()
    animateCrouch()
    animateKicks()
    animateJumps()
    animateDash()
}
function initializeGOLDGUNanimations () {
    animateGOLDGUNIDLE()
    animateGOLDGUNCROUCH()
    animateGOLDBANG()
    animateGOLDGUNRUN()
    animateGOLDGUNJUMP()
}
sprites.onOverlap(SpriteKind.Bullet, SpriteKind.Bumper, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.disintegrate, 500)
    otherSprite.sayText("WHO GAVE YOU THAT?!", 500, false)
    info.changeScoreBy(3)
})
sprites.onOverlap(SpriteKind.Bullet, SpriteKind.Mage, function (sprite, otherSprite) {
    statusbar.value += -1
    sprites.changeDataNumberBy(otherSprite, "HP", -1)
    sprites.destroy(sprite)
    if (Math.percentChance(7.5)) {
        info.changeScoreBy(1)
        info.changeLifeBy(1)
    }
    hero.sayText("BOSS HP =" + statusbar.value, 2000, false)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
    scene.cameraShake(4, 500)
    if (sprites.readDataNumber(otherSprite, "HP") == 0) {
        sprites.destroy(otherSprite)
        hero.sayText("Psh- Easy!", 5000, false)
        info.changeScoreBy(15)
        tiles.placeOnRandomTile(hero, assets.tile`myTile2`)
        sprites.destroyAllSpritesOfKind(SpriteKind.Fireball)
    }
})
function createPlayer (player2: Sprite) {
    player2.ay = gravity
    scene.cameraFollowSprite(player2)
    controller.moveSprite(player2, 100, 0)
    player2.z = 5
    info.setLife(3)
    info.setScore(0)
}
sprites.onOverlap(SpriteKind.GOLDENBullet, SpriteKind.Moving_Target, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    tiles.placeOnTile(hero, tiles.getTileLocation(21, 43))
})
scene.onHitWall(SpriteKind.Mage, function (sprite, location) {
    if (rizzard.isHittingTile(CollisionDirection.Bottom)) {
        heads = sprites.createProjectileFromSide(assets.image`fireball`, 150, randint(10, 100))
        sprites.create(assets.image`fireball`, SpriteKind.Fireball).setFlag(SpriteFlag.GhostThroughWalls, true)
        heads.setKind(SpriteKind.Fireball)
        rizzard.vy = -100
    } else {
        pauseUntil(() => true)
    }
})
function initializeLevel (level: number) {
    effects.clouds.startScreenEffect()
    playerStartLocation = tiles.getTilesByType(assets.tile`tile6`)[0]
    tiles.placeOnTile(hero, playerStartLocation)
    tiles.setTileAt(playerStartLocation, assets.tile`tile0`)
    createEnemies()
    spawnGoals()
}
sprites.onOverlap(SpriteKind.Bullet, SpriteKind.NotZach, function (sprite, otherSprite) {
    statusbar.value += -2
    sprites.changeDataNumberBy(otherSprite, "HP", -1)
    sprites.destroy(sprite)
    if (Math.percentChance(10)) {
        info.changeScoreBy(1)
        info.changeLifeBy(1)
    }
    hero.sayText("BOSS HP =" + (statusbar.value - 50), 2000, false)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
    scene.cameraShake(4, 500)
    if (sprites.readDataNumber(otherSprite, "HP") == 0) {
        tiles.placeOnTile(otherSprite, tiles.getTileLocation(47, 35))
        tiles.placeOnTile(hero, tiles.getTileLocation(52, 35))
        controller.moveSprite(hero, 0, 0)
        otherSprite.setBounceOnWall(false)
        scene.cameraFollowSprite(otherSprite)
        otherSprite.vx = 0
        otherSprite.vy = 0
        for (let index = 0; index < 1; index++) {
            otherSprite.setImage(assets.image`yourselfsing-31`)
            pause(200)
        }
        for (let index = 0; index < 1; index++) {
            otherSprite.setImage(assets.image`yourselfsing-30`)
            pause(200)
        }
        for (let index = 0; index < 1; index++) {
            otherSprite.setImage(assets.image`yourselfsing-33`)
            pause(200)
        }
        for (let index = 0; index < 1; index++) {
            otherSprite.setImage(assets.image`yourselfsing-32`)
            pause(200)
        }
        for (let index = 0; index < 1; index++) {
            otherSprite.setImage(assets.image`yourselfsing-34`)
            pause(200)
        }
        sprites.destroy(otherSprite)
        scene.cameraFollowSprite(hero)
        scene.cameraShake(4, 1000)
        info.changeScoreBy(25)
        tiles.placeOnRandomTile(hero, assets.tile`you0`)
        hero.y += -75
        if (zachisgolden == false) {
            controller.moveSprite(hero, 110, 0)
        }
        if (zachisgolden == true) {
            controller.moveSprite(hero, 210, 0)
        }
    }
})
sprites.onCreated(SpriteKind.Bullet, function (sprite) {
    sprite.setFlag(SpriteFlag.GhostThroughWalls, true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.rustbullet, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.InBackground)
    sprite.sayText("I'm 100% getting tetanus from that.", 500, false)
    pause(invincibilityPeriod)
})
function animateGOLDGUNCROUCH () {
    GOLDGUNCROUCH = animation.createAnimation(ActionKind.CrouchLeft, 100)
    animation.attachAnimation(hero, GOLDGUNCROUCH)
    GOLDGUNCROUCH.addAnimationFrame(assets.image`goldenzachfacingrightwhilecrouchingwithashotgun`)
    GOLDGUNCROUCH = animation.createAnimation(ActionKind.CrouchRight, 100)
    animation.attachAnimation(hero, GOLDGUNCROUCH)
    GOLDGUNCROUCH.addAnimationFrame(assets.image`goldenzachcrouchingfacingleftwithashotgun`)
}
controller.combos.attachCombo("lrdd", function () {
    for (let index = 0; index < 10; index++) {
        upwardwave = sprites.createProjectileFromSprite(assets.image`downwardwave`, hero, 0, 250)
        upwardwave.setKind(SpriteKind.upwardwave)
    }
})
function hasNextLevel () {
    return currentLevel != levelCount
}
function animateSHOTGUNidle () {
    GOLDENGUNIDLE = animation.createAnimation(ActionKind.IdleLeft, 100)
    animation.attachAnimation(hero, GOLDENGUNIDLE)
    GOLDENGUNIDLE.addAnimationFrame(assets.image`zachfacingleftwithashotgun`)
    shotgunidleright = animation.createAnimation(ActionKind.IdleRight, 100)
    animation.attachAnimation(hero, shotgunidleright)
    shotgunidleright.addAnimationFrame(assets.image`zachfacingrightwithashotgun0`)
}
sprites.onOverlap(SpriteKind.GOLDENBullet, SpriteKind.Bumper, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.disintegrate, 500)
    otherSprite.sayText("AAAAAAAAA", 500, false)
    info.changeScoreBy(3)
})
function animateDash () {
    // Because there isn't currently an easy way to say "play this animation a single time
    // and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    // the same behavior
    dash = animation.createAnimation(ActionKind.JumpingLeft, 100)
    animation.attachAnimation(hero, dash)
    for (let index = 0; index < 30; index++) {
        dash.addAnimationFrame(assets.image`zachdashleft`)
    }
    dash = animation.createAnimation(ActionKind.JumpingRight, 100)
    animation.attachAnimation(hero, dash)
    for (let index = 0; index < 30; index++) {
        dash.addAnimationFrame(assets.image`zachdash1`)
    }
}
function attemptGoldDash () {
    if (zachisgolden == true && heroFacingLeft == false) {
        hero.vy = -50
        hero.vx += 500
        animateGDASH()
        pause(300)
        animateGDASH()
    } else if ((heroFacingLeft && zachisgolden) == true) {
        hero.vy = -50
        hero.vx += -500
        animateGDASH()
        pause(300)
        animateGDASH()
    }
}
function spawnGoals () {
    for (let value7 of tiles.getTilesByType(assets.tile`tile5`)) {
        coin = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . f f 5 5 5 5 f f . . . . 
            . . . . f 5 5 5 5 5 5 f . . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . . f 5 5 5 5 5 5 f . . . . 
            . . . . f f 5 5 5 5 f f . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Coin)
        tiles.placeOnTile(coin, value7)
        animation.attachAnimation(coin, coinAnimation)
        animation.setAction(coin, ActionKind.Idle)
        tiles.setTileAt(value7, assets.tile`tile0`)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`skiptile`, function (sprite, location) {
    info.changeLifeBy(1)
    currentLevel += 2
    if (hasNextLevel()) {
        game.splash("Skipped levels!")
        setLevelTileMap(currentLevel)
        if (zachisholdingshotgun) {
            refreshshotgunbar()
        }
    }
})
scene.onHitWall(SpriteKind.GOLDENBullet, function (sprite, location) {
    if (tiles.tileAtLocationEquals(location, assets.tile`Stone`)) {
        tiles.setTileAt(location, assets.tile`transparency16`)
        tiles.setWallAt(location, false)
    } else if (tiles.tileAtLocationEquals(location, assets.tile`tile3`)) {
        tiles.setTileAt(location, assets.tile`transparency16`)
        tiles.setWallAt(location, false)
    } else if (tiles.tileAtLocationEquals(location, assets.tile`bulletblock0`)) {
        hero.y += 25
        sprites.destroyAllSpritesOfKind(SpriteKind.GOLDENBullet)
    }
})
let rustbullet: Sprite = null
let coin: Sprite = null
let dash: animation.Animation = null
let shotgunidleright: animation.Animation = null
let GOLDGUNCROUCH: animation.Animation = null
let playerStartLocation: tiles.Location = null
let heads: Sprite = null
let SHOTGUNCROUCH: animation.Animation = null
let pbossrun: animation.Animation = null
let kick: animation.Animation = null
let SHOTGUNJUMP: animation.Animation = null
let Alex: Sprite = null
let yourselfhp: StatusBarSprite = null
let yourself: Sprite = null
let movingtarget: Sprite = null
let flyingsquare: Sprite = null
let rizzard: Sprite = null
let bumper: Sprite = null
let PlayerBoss: Sprite = null
let GKICK: animation.Animation = null
let GCROUCH: animation.Animation = null
let power2: animation.Animation = null
let GOLDENGUNIDLE: animation.Animation = null
let GRUN: animation.Animation = null
let BANGBANG: animation.Animation = null
let goldidle: animation.Animation = null
let flier: Sprite = null
let mainCrouchRight: animation.Animation = null
let mainCrouchLeft: animation.Animation = null
let GOLDBANG: animation.Animation = null
let mainJumpRight: animation.Animation = null
let mainJumpLeft: animation.Animation = null
let GOLDGUNJUMP: animation.Animation = null
let mainRunRight: animation.Animation = null
let mainRunLeft: animation.Animation = null
let GDASH: animation.Animation = null
let flierIdle: animation.Animation = null
let flierFlying: animation.Animation = null
let upwardwave: Sprite = null
let mainIdleRight: animation.Animation = null
let mainIdleLeft: animation.Animation = null
let heroFacingLeft = false
let kingsquare: Sprite = null
let statusbar: StatusBarSprite = null
let debugmodeON = false
let doubleJumpSpeed = 0
let canDoubleJump = false
let coinAnimation: animation.Animation = null
let A: Sprite = null
let AMMOBAR: StatusBarSprite = null
let FUCKINGBULLET: Sprite = null
let zachisholdingshotgun = false
let SHOTGUNRUN: animation.Animation = null
let GOLDGUNRUN: animation.Animation = null
let currentLevel = 0
let levelCount = 0
let zachisgolden = false
let gravity = 0
let pixelsToMeters = 0
let invincibilityPeriod = 0
let hero: Sprite = null
hero = sprites.create(assets.image`zachfacingright0`, SpriteKind.Player)
// how long to pause between each contact with a
// single enemy
invincibilityPeriod = 600
pixelsToMeters = 30
gravity = 9.81 * pixelsToMeters
zachisgolden = false
scene.setBackgroundImage(img`
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9989998999899989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998999899989998999899989998999899989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989998999899989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
    9899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999999999999999999999999999
    8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    `)
initializeAnimations()
createPlayer(hero)
hero.scale = 1
levelCount = 8
currentLevel = 0
setLevelTileMap(currentLevel)
giveIntroduction()
music.play(music.createSong(assets.song`GRAND DAD`), music.PlaybackMode.LoopingInBackground)
// set up hero animations
game.onUpdate(function () {
    if (hero.vx < 0) {
        heroFacingLeft = true
    } else if (hero.vx > 0) {
        heroFacingLeft = false
    }
    if (hero.isHittingTile(CollisionDirection.Top)) {
        hero.vy = 0
    }
    if (controller.down.isPressed()) {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.CrouchLeft)
        } else {
            animation.setAction(hero, ActionKind.CrouchRight)
        }
    } else if (hero.vy < 20 && !(hero.isHittingTile(CollisionDirection.Bottom))) {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.JumpingLeft)
        } else {
            animation.setAction(hero, ActionKind.JumpingRight)
        }
    } else if (hero.vx < 0) {
        animation.setAction(hero, ActionKind.RunningLeft)
    } else if (hero.vx > 0) {
        animation.setAction(hero, ActionKind.RunningRight)
    } else {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.IdleLeft)
        } else {
            animation.setAction(hero, ActionKind.IdleRight)
        }
    }
})
// Flier movement
game.onUpdate(function () {
    for (let value8 of sprites.allOfKind(SpriteKind.Flier)) {
        if (value8.x - hero.x < 100) {
            if (value8.x - hero.x < -5) {
                value8.vx = 25
            } else if (value8.x - hero.x > 5) {
                value8.vx = -25
            }
            if (value8.y - hero.y < -5) {
                value8.vy = 25
            } else if (value8.y - hero.y > 5) {
                value8.vy = -25
            }
            animation.setAction(value8, ActionKind.Flying)
        } else {
            value8.vy = -20
            value8.vx = 0
            animation.setAction(value8, ActionKind.Idle)
        }
        flier.follow(hero, 100)
    }
})
// Reset double jump when standing on wall
game.onUpdate(function () {
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        canDoubleJump = true
    }
})
// bumper movement
game.onUpdate(function () {
    for (let value9 of sprites.allOfKind(SpriteKind.Bumper)) {
        if (value9.isHittingTile(CollisionDirection.Left)) {
            value9.vx = Math.randomRange(30, 60)
        } else if (value9.isHittingTile(CollisionDirection.Right)) {
            value9.vx = Math.randomRange(-60, -30)
        }
    }
})
// bumper movement
game.onUpdate(function () {
    for (let value14 of sprites.allOfKind(SpriteKind.NotZach)) {
        if (value14.isHittingTile(CollisionDirection.Left)) {
            value14.vx = Math.randomRange(125, 200)
            value14.setImage(assets.image`yourselfright`)
        } else if (value14.isHittingTile(CollisionDirection.Right)) {
            value14.vx = Math.randomRange(-125, 200)
            value14.setImage(assets.image`yourselfleft`)
        }
    }
})
game.onUpdateInterval(2500, function () {
    for (let value14 of sprites.allOfKind(SpriteKind.NotZach)) {
        if (value14.isHittingTile(CollisionDirection.Bottom)) {
            value14.vy += -150
        }
    }
})
game.onUpdateInterval(1000, function () {
    for (let value14 of sprites.allOfKind(SpriteKind.NotZach)) {
        if (value14.vx > 10) {
            value14.setImage(assets.image`yourselfright`)
            rustbullet = sprites.createProjectileFromSprite(assets.image`FUCKINGBULLET2`, yourself, 100, 0)
            rustbullet.setKind(SpriteKind.rustbullet)
        } else if (value14.vx < 10) {
            value14.setImage(assets.image`yourselfleft`)
            rustbullet = sprites.createProjectileFromSprite(assets.image`YOURSELF_BULLET`, yourself, -100, 0)
            rustbullet.setKind(SpriteKind.rustbullet)
        }
    }
})
