//@ts-ignore
import { Creator } from "../types.js";
import helpers from './helpers.svelte';

/**
 * 
 * @param {{x: Number, y: Number, xPositionType: Creator.positionType, yPositionType: Creator.positionType}} srcCords 
 * @param {{xPositionType: Creator.positionType, yPositionType: Creator.positionType}} requiredTypes
 * @param {{width: Number, height: Number}} imgSize
 * @returns {{x: Number, y: Number, xPositionType: Creator.positionType, yPositionType: Creator.positionType}}
 */
const translateCords = (srcCords, requiredTypes = { xPositionType: 'percent', yPositionType: 'percent' }, imgSize = { width: 100, height: 100 }) => {
    /** @type {{x: Number, y: Number, xPositionType: Creator.positionType, yPositionType: Creator.positionType}} */
    let cords = { x: srcCords.x, y: srcCords.y, xPositionType: requiredTypes.xPositionType, yPositionType: requiredTypes.yPositionType };
    if(srcCords.xPositionType != requiredTypes.xPositionType) {
        switch(requiredTypes.xPositionType) {
            case "percent": {
                switch(srcCords.xPositionType) {
                    case "middle": {
                        cords.x = helpers.roundToFraction(((srcCords.x + (imgSize.width / 2)) / imgSize.width) * 100, 100);
                        break;
                    }
                    case "start": {
                        cords.x = helpers.roundToFraction((srcCords.x / imgSize.width) * 100, 100);
                        break;
                    }
                    case "end": {
                        cords.x = helpers.roundToFraction(((srcCords.x + imgSize.width) / imgSize.width) * 100, 100);
                        break;
                    }
                }
                break;
            }
            case "middle": {
                switch(srcCords.xPositionType) {
                    case "percent": {
                        cords.x = helpers.roundToFraction(((srcCords.x/100) * imgSize.width) - (imgSize.width/2))
                        break;
                    }
                    case "start": {
                        cords.x = helpers.roundToFraction(srcCords.x - (imgSize.width / 2));
                        break;
                    }
                    case "end": {
                        cords.x = helpers.roundToFraction(srcCords.x + (imgSize.width / 2));
                        break;
                    }
                }
                break;
            }
            case "start": {
                switch(srcCords.xPositionType) {
                    case "percent": {
                        cords.x = helpers.roundToFraction(((srcCords.x / 100) * imgSize.width))
                        break;
                    }
                    case "middle": {
                        cords.x = helpers.roundToFraction(srcCords.x + (imgSize.width / 2));
                        break;
                    }
                    case "end": {
                        cords.x = helpers.roundToFraction(srcCords.x - imgSize.width);
                        break;
                    }
                }
                break;
            }
            case "end": {
                switch(srcCords.xPositionType) {
                    case "percent": {
                        cords.x = helpers.roundToFraction(((srcCords.x / 100) * imgSize.width) - imgSize.width)
                        break;
                    }
                    case "start": {
                        cords.x = helpers.roundToFraction(srcCords.x - imgSize.width);
                        break;
                    }
                    case "middle": {
                        cords.x = helpers.roundToFraction(srcCords.x - (imgSize.width / 2));
                        break;
                    }
                }
                break;
            }
        }
    }
    if(srcCords.yPositionType != requiredTypes.yPositionType) {
        switch(requiredTypes.yPositionType) {
            case "percent": {
                switch(srcCords.yPositionType) {
                    case "middle": {
                        cords.y = helpers.roundToFraction(((srcCords.y + (imgSize.height / 2)) / imgSize.height) * 100, 100);
                        break;
                    }
                    case "start": {
                        cords.y = helpers.roundToFraction((srcCords.y / imgSize.height) * 100, 100);
                        break;
                    }
                    case "end": {
                        cords.y = helpers.roundToFraction(((srcCords.y + imgSize.height) / imgSize.height) * 100, 100);
                        break;
                    }
                }
                break;
            }
            case "middle": {
                switch(srcCords.yPositionType) {
                    case "percent": {
                        cords.y = helpers.roundToFraction(((srcCords.y / 100) * imgSize.height) - (imgSize.height / 2))
                        break;
                    }
                    case "start": {
                        cords.y = helpers.roundToFraction(srcCords.y - (imgSize.height / 2));
                        break;
                    }
                    case "end": {
                        cords.y = helpers.roundToFraction(srcCords.y + (imgSize.height / 2));
                        break;
                    }
                }
                break;
            }
            case "start": {
                switch(srcCords.yPositionType) {
                    case "percent": {
                        cords.y = helpers.roundToFraction(((srcCords.y / 100) * imgSize.height))
                        break;
                    }
                    case "middle": {
                        cords.y = helpers.roundToFraction(srcCords.y + (imgSize.height / 2));
                        break;
                    }
                    case "end": {
                        cords.y = helpers.roundToFraction(srcCords.y - imgSize.height);
                        break;
                    }
                }
                break;
            }
            case "end": {
                switch(srcCords.yPositionType) {
                    case "percent": {
                        cords.y = helpers.roundToFraction(((srcCords.y / 100) * imgSize.height) - imgSize.height)
                        break;
                    }
                    case "start": {
                        cords.y = helpers.roundToFraction(srcCords.y - imgSize.height);
                        break;
                    }
                    case "middle": {
                        cords.y = helpers.roundToFraction(srcCords.y - (imgSize.height / 2));
                        break;
                    }
                }
                break;
            }
        }
    }
    return cords;
}

/**
 * @param {Creator.point<Creator.positionType, Creator.positionType>} point
 * @param {{ width: Number, height: Number }} imgSize
 * @param {Boolean} [ignoreWith]
 * @param {String} [start]
 * @param {String} [join]
 * @param {Creator.point<Creator.positionType, Creator.positionType>|undefined} [prevPoint]
 * @param {String} [startCurve]
 * @param {String} [numberBegin]
 * @param {String} [numberEnd]
 * @param {String} [withStart]
 * @returns {String}
 */
const getPointCords = (point, imgSize, ignoreWith = false, start = 'line to ', join = ' ', prevPoint = undefined, startCurve = 'curve to', numberBegin = '', numberEnd = '', withStart = 'with') => {
    let str = `${start}`;
    let withStr = '';
    let withDefault = true;
    if(point.with && !ignoreWith) {
        const translatedWith = translateCords(point.with, { xPositionType: point.pos.xPositionType, yPositionType: point.pos.yPositionType });
        if(prevPoint) {
            const translatedPrevPoint = translateCords(prevPoint.pos, { xPositionType: point.pos.xPositionType, yPositionType: point.pos.yPositionType });
            if((translatedWith.x != point.pos.x || translatedWith.y != point.pos.y) && (translatedWith.x != translatedPrevPoint.x || translatedWith.y != translatedPrevPoint.y)) {
                withStr = `${join}${withStart}${join}`;
                str = `${startCurve}${join}`;
                withDefault = false;
            }
        } else if(translatedWith.x != point.pos.x || translatedWith.y != point.pos.y) {
            withStr = `${join}${withStart}${join}`;
            str = `${startCurve}${join}`;
            withDefault = false;
        }
    }
    switch(point.pos.xPositionType) {
        case "percent": {
            str += `${numberBegin}${point.pos.x}%${numberEnd}${join}`;
            break;
        }
        case "middle": {
            if(point.pos.x == 0) {
                str += `${numberBegin}50%${numberEnd}${join}`;
            } else if(point.pos.x < 0) {
                str += `${numberBegin}calc(50% - ${Math.abs(point.pos.x)}px)${numberEnd}${join}`;
            } else {
                str += `${numberBegin}calc(50% + ${point.pos.x}px)${numberEnd}${join}`;
            }
            break;
        }
        case "start": {
            str += `${numberBegin}${point.pos.x}px${numberEnd}${join}`;
            break;
        }
        case "end": {
            if(point.pos.x == 0) {
                str += `${numberBegin}100%${numberEnd}${join}`;
            } else if(point.pos.x < 0) {
                str += `${numberBegin}calc(100% - ${Math.abs(point.pos.x)}px)${numberEnd}${join}`;
            } else {
                str += `${numberBegin}calc(100% + ${point.pos.x}px)${numberEnd}${join}`;
            }
            break;
        }
    }
    switch(point.pos.yPositionType) {
        case "percent": {
            str += `${numberBegin}${point.pos.y}%${numberEnd}`;
            break;
        }
        case "middle": {
            if(point.pos.y == 0) {
                str += `${numberBegin}50%${numberEnd}`;
            } else if(point.pos.y < 0) {
                str += `${numberBegin}calc(50% - ${Math.abs(point.pos.y)}px)${numberEnd}`;
            } else {
                str += `${numberBegin}calc(50% + ${point.pos.y}px)${numberEnd}`;
            }
            break;
        }
        case "start": {
            str += `${numberBegin}${point.pos.y}px${numberEnd}`;
            break;
        }
        case "end": {
            if(point.pos.y == 0) {
                str += `${numberBegin}100%${numberEnd}`;
            } else if(point.pos.y < 0) {
                str += `${numberBegin}calc(100% - ${Math.abs(point.pos.y)}px)${numberEnd}`;
            } else {
                str += `${numberBegin}calc(100% + ${point.pos.y}px)${numberEnd}`;
            }
            break;
        }
    }
    if(point.with && !withDefault && !ignoreWith) {
        switch(point.with.xPositionType) {
            case "percent": {
                withStr += `${numberBegin}${point.with.x}%${numberEnd}${join}`;
                break;
            }
            case "middle": {
                if(point.with.x == 0) {
                    withStr += `${numberBegin}50%${numberEnd}${join}`;
                } else if(point.with.x < 0) {
                    withStr += `${numberBegin}calc(50% - ${Math.abs(point.with.x)}px)${numberEnd}${join}`;
                } else {
                    withStr += `${numberBegin}calc(50% + ${point.with.x}px)${numberEnd}${join}`;
                }
                break;
            }
            case "start": {
                withStr += `${numberBegin}${point.with.x}px${numberEnd}${join}`;
                break;
            }
            case "end": {
                if(point.with.x == 0) {
                    withStr += `${numberBegin}100%${numberEnd}${join}`;
                } else if(point.with.x < 0) {
                    withStr += `${numberBegin}calc(100% - ${Math.abs(point.with.x)}px)${numberEnd}${join}`;
                } else {
                    withStr += `${numberBegin}calc(100% + ${point.with.x}px)${numberEnd}${join}`;
                }
                break;
            }
        }
        switch(point.with.yPositionType) {
            case "percent": {
                withStr += `${numberBegin}${point.with.y}%${numberEnd}`;
                break;
            }
            case "middle": {
                if(point.with.y == 0) {
                    withStr += `${numberBegin}50%${numberEnd}`;
                } else if(point.with.y < 0) {
                    withStr += `${numberBegin}calc(50% - ${Math.abs(point.with.y)}px)${numberEnd}`;
                } else {
                    withStr += `${numberBegin}calc(50% + ${point.with.y}px)${numberEnd}`;
                }
                break;
            }
            case "start": {
                withStr += `${numberBegin}${point.with.y}px${numberEnd}`;
                break;
            }
            case "end": {
                if(point.with.y == 0) {
                    withStr += `${numberBegin}100%${numberEnd}`;
                } else if(point.with.y < 0) {
                    withStr += `${numberBegin}calc(100% - ${Math.abs(point.with.y)}px)${numberEnd}`;
                } else {
                    withStr += `${numberBegin}calc(100% + ${point.with.y}px)${numberEnd}`;
                }
                break;
            }
        }
    }
    return `${str}${withStr}`;
}


/**
 * @param {Array<Creator.point<Creator.positionType, Creator.positionType>>} points
 * @param {{ width: Number, height: Number }} imgSize
 * @returns {String}
 */
const pointsToShape = (points, imgSize) => {
    if(points.length > 1) {
        let str = `shape(from ${getPointCords(points[points.length - 1], imgSize, true, '')}, `;
        str += `${getPointCords(points[0], imgSize, false, 'line to ', ' ', points[points.length - 1])}, `;
        for(let i = 1; i < points.length; i++) {
            str += `${getPointCords(points[i], imgSize, false, 'line to ', ' ', points[i - 1])}, `;
        }
        str += `close)`;
        return str;
    } else {
        return 'none';
    }
}

export { pointsToShape, getPointCords, translateCords };
export default pointsToShape;