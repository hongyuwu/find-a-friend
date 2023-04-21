
/**
* 使用此文件来定义自定义函数和图形块。
* 想了解更详细的信息，请前往 https://arcade.makecode.com/blocks/custom
*/

namespace sprites {
    export function setDataList(sprite: Sprite, name: string, value: Sprite[]) {
        if (!sprite || !name) return;
        const d = sprite.data;
        d[name] = value;
    }

    export function readDataList(sprite: Sprite, name: string): Sprite[] {
        let spritesList: Sprite[] = []
        if (!sprite || !name) return spritesList;
        const d = sprite.data;
        return d[name] as Sprite[];
    }
}

/**
 * Custom blocks
 */
//%block="认识新朋友"
//% weight=100 color=#0fbc11 icon=""
namespace custom {
    
    type MapType = {
        [name: string]: Sprite
    }

    let spritesList: Sprite[] = []
    const spritesMap: MapType = {}

    //%blockid=init block="开始"
    export function init() {
        game.setGameOverMessage(false, "Sorry, you are wrong")
        game.setGameOverMessage(true, "You are correct!")
        tiles.setCurrentTilemap(tilemap`级别2`)
        
        let 马里奥 = sprites.create(assets.image`马里奥`, SpriteKind.Player)
        initSprite("马里奥", 马里奥)
        let 阿伟 = sprites.create(assets.image`阿伟`, SpriteKind.Player)
        initSprite("阿伟", 阿伟)
        let 小冰 = sprites.create(assets.image`小冰`, SpriteKind.Player)
        initSprite("小冰", 小冰)
        let 派大星 = sprites.create(assets.image`派大星`, SpriteKind.Player)
        initSprite("派大星", 派大星)
        let 卡比 = sprites.create(assets.image`卡比`, SpriteKind.Player)
        initSprite("卡比", 卡比)
        let 机器人 = sprites.create(assets.image`机器人`, SpriteKind.Player)
        initSprite("机器人", 机器人)
        let 葱头 = sprites.create(assets.image`葱头`, SpriteKind.Player)
        initSprite("葱头", 葱头)
        let 阿飞 = sprites.create(assets.image`阿飞`, SpriteKind.Player)
        initSprite("阿飞", 阿飞)
        let 佩奇 = sprites.create(assets.image`佩奇`, SpriteKind.Player)
        initSprite("佩奇", 佩奇)
        let 兔子 = sprites.create(assets.image`兔子`, SpriteKind.Player)
        initSprite("兔子", 兔子)

        initFriendNetwork(10)
    }

    function initSprite(name: string, sprite: Sprite) {
        spritesMap[name] = sprite
        spritesList.push(sprite)
        sprites.setDataString(sprite, "name", name)
        sprite.setPosition(randint(0, 150), randint(0, 110))
        let friendList: Sprite[] = []
        sprites.setDataList(sprite, "friendList", friendList)
    }

    function initFriendNetwork(densityFactor: number) {
        if (densityFactor > 100) {
            densityFactor = 100
        }

        for (let fromSprite of spritesList) {
            for (let toSprite of spritesList) {
                if (fromSprite == toSprite) {
                    continue
                }
                let rand = randint (0, 100)
                if (rand < densityFactor) {
                    connectSprites(fromSprite, toSprite)
                    connectSprites(toSprite, fromSprite)
                }
            }
        }
    }

    function connectSprites(fromSprite: Sprite, toSprite: Sprite) {
        drawLine(fromSprite, toSprite)
        let list = sprites.readDataList(fromSprite, "friendList")
        list.push(toSprite)
    }

    function drawLine(fromSprite: Sprite, toSprite: Sprite) {
        let line = image.create(150, 100)
        line.drawLine(fromSprite.x - 8, fromSprite.y - 10, toSprite.x - 8, toSprite.y - 10, 14)
        let showLine = sprites.create(line, 0)
    }

    function findPage() {
        return 
    }
    /**
         * TODO: describe your function here
         * @param n describe parameter here, eg: 5
         * @param s describe parameter here, eg: "Hello"
         * @param e describe parameter here
         */
    function judge(answer: boolean) {  
        if (answer == isSpritesConnected(getSpriteByName("兔子"), getSpriteByName("佩奇"))) {
            game.gameOver(true)
        } else {
            game.gameOver(false)
        }
    }

    function isSpritesConnected(fromSprite: Sprite, toSprite: Sprite): boolean {
        let visited: MapType = {}
        return doIsSpritesConnected(fromSprite, toSprite, visited)
    }

    function doIsSpritesConnected(fromSprite: Sprite, toSprite: Sprite, visited: MapType): boolean {
        visited[sprites.readDataString(fromSprite, "name")] = fromSprite
        if (fromSprite == toSprite) {
            return true
        }
        let friends = sprites.readDataList(fromSprite, "friendList")
        for (let f of friends) {
            if (visited[sprites.readDataString(f, "name")] != null) {
                continue
            }
            if (doIsSpritesConnected(f, toSprite, visited)) {
                return true
            }
        }
        return false
    }

    //%blockid= block="佩奇可以认识到兔子"
    export function pageCanMeetRabbid() {
        judge(true)
    }

    //%blockid= block="佩奇不能认识到兔子"
    export function pageCannotMeetRabbid() {
        judge(false)
    }

    //%blockid=getSpriteByName block="根据精灵名字找到精灵%s"
    //% draggableParameters
    //% weight=96
    export function getSpriteByName(name: string): Sprite {
        return spritesMap[name]
    }

    //%blockid=getSpriteByName block="根据精灵名字得到精灵的朋友数组%s"
    //% draggableParameters
    //% weight=96
    export function getFriendListByName(name: string): Sprite[] {
        let sprite = spritesMap[name]
        return sprites.readDataList(sprite, "friendList")
    }
}
