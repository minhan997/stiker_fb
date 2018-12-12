window.onload = function(){
    const SPRITE_SELECTOR = '.sprite';

    function init(){
        const sprites = document.querySelectorAll(SPRITE_SELECTOR);
        for(const sprite of sprites){
            const image = getAttr(sprite,'image');
            const width = getAttr(sprite,'width',true);
            const height = getAttr(sprite,'height',true);
            const columns = getAttr(sprite,'columns',true);
            const rows = getAttr(sprite,'rows',true);
            const max = getAttr(sprite,'max',true);
            const loop = getAttr(sprite,'loop',true);
            const frame = getAttr(sprite,'frame',true);

            //mutil css
            Object.assign(sprite.style, {
                width: width + 'px',
                height: height + 'px',
                backgroundImage: `url(${image})`,
                backgroundSize:`${width * columns}px ${height * rows}px`,
                backgroundPosition:'0 0'
            });

            let playing = false;
            const _play = function(){
                if (playing) {
                    return;
                }
                playing = true;
                play({
                    sprite,
                    width,
                    height,
                    columns,
                    rows,
                    max,
                    loop,
                    frame,
                    done: function(){
                        playing = false;
                    }
                });
            }

            sprite.onmouseover = _play;
            _play();
        }
    }

    function play({sprite, width, height, columns, rows, max, loop, frame, done }) {
        const aSecond = 1000;
        const timePerFrame = aSecond / frame;

        const spriteInfo = { x: 0, y: 0, loop: 0 };

        let i = 0;
        const playTimer =  setInterval(function(){
            i++;

            Object.assign(sprite.style,{
                backgroundPosition: `${spriteInfo.x}px ${spriteInfo.y}px`
            });
            if (i%columns == 0) {
                spriteInfo.x = 0;
                spriteInfo.y -= height;
            }else {
                spriteInfo.x -= width;
            }
            if (i >= max ) {
                i = 0;
                spriteInfo.x = 0;
                spriteInfo.y = 0;
                spriteInfo.loop++;

                if (spriteInfo.loop > loop) {
                    clearInterval(playTimer);
                    if (typeof done === 'function') {
                        done();
                    }
                }
            }

        },timePerFrame);
    }


    function getAttr(element, attr, toNumber) {
        if (toNumber === true) {
          return parseInt(
            element.getAttribute(attr)
            );
        }
        return element.getAttribute(attr);
    }

    init();
}
