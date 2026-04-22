//@ts-ignore
import { Creator } from "../types.js";

/**
 * @param {Creator.point<Creator.positionType, Creator.positionType>} point
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
const getPointCords = (point, ignoreWith = false, start = 'line to ', join = ' ', prevPoint = undefined, startCurve = 'curve to', numberBegin = '', numberEnd = '', withStart = 'with') => {
    let str = `${start}`;
    let withStr = '';
    let withDefault = true;
    if(point.with && !ignoreWith) {
        if(prevPoint) {
            if((point.with.x != point.pos.x || point.with.y != point.pos.y) && (point.with.x != prevPoint.pos.x || point.with.y != prevPoint.pos.y)) {
                withStr = `${join}${withStart}${join}`;
                str = `${startCurve}${join}`;
                withDefault = false;
            }
        } else if(point.with.x != point.pos.x || point.with.y != point.pos.y) {
            withStr = `${join}${withStart}${join}`;
            str = `${startCurve}${join}`;
            withDefault = false;
        }
    }
    switch(point.xPositionType) {
        case "percent": {
            str += `${numberBegin}${point.pos.x}%${numberEnd}${join}`;
            if(point.with && !ignoreWith && !withDefault) {
                withStr += `${numberBegin}${point.with.x}%${numberEnd}${join}`;
            }
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
            if(point.with && !ignoreWith && !withDefault) {
                if(point.with.x == 0) {
                    withStr += `${numberBegin}50%${numberEnd}${join}`;
                } else if(point.with.x < 0) {
                    withStr += `${numberBegin}calc(50% - ${Math.abs(point.with.x)}px)${numberEnd}${join}`;
                } else {
                    withStr += `${numberBegin}calc(50% + ${point.with.x}px)${numberEnd}${join}`;
                }
            }
            break;
        }
        case "start": {
            str += `${numberBegin}${point.pos.x}px${numberEnd}${join}`;
            if(point.with && !ignoreWith && !withDefault) {
                withStr += `${numberBegin}${point.with.x}px${numberEnd}${join}`;
            }
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
            if(point.with && !ignoreWith && !withDefault) {
                if(point.with.x == 0) {
                    withStr += `${numberBegin}100%${numberEnd}${join}`;
                } else if(point.with.x < 0) {
                    withStr += `${numberBegin}calc(100% - ${Math.abs(point.with.x)}px)${numberEnd}${join}`;
                } else {
                    withStr += `${numberBegin}calc(100% + ${point.with.x}px)${numberEnd}${join}`;
                }
            }
            break;
        }
    }
    switch(point.yPositionType) {
        case "percent": {
            str += `${numberBegin}${point.pos.y}%${numberEnd}`;
            if(point.with && !ignoreWith && !withDefault) {
                withStr += `${numberBegin}${point.with.y}%${numberEnd}`;
            }
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
            if(point.with && !ignoreWith && !withDefault) {
                if(point.with.y == 0) {
                    withStr += `${numberBegin}50%${numberEnd}`;
                } else if(point.with.y < 0) {
                    withStr += `${numberBegin}calc(50% - ${Math.abs(point.with.y)}px)${numberEnd}`;
                } else {
                    withStr += `${numberBegin}calc(50% + ${point.with.y}px)${numberEnd}`;
                }
            }
            break;
        }
        case "start": {
            str += `${numberBegin}${point.pos.y}px${numberEnd}`;
            if(point.with && !ignoreWith && !withDefault) {
                withStr += `${numberBegin}${point.with.y}px${numberEnd}`;
            }
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
            if(point.with && !ignoreWith && !withDefault) {
                if(point.with.y == 0) {
                    withStr += `${numberBegin}100%${numberEnd}`;
                } else if(point.with.y < 0) {
                    withStr += `${numberBegin}calc(100% - ${Math.abs(point.with.y)}px)${numberEnd}`;
                } else {
                    withStr += `${numberBegin}calc(100% + ${point.with.y}px)${numberEnd}`;
                }
            }
            break;
        }
    }
    return `${str}${withStr}`;
}


/**
 * @param {Array<Creator.point<Creator.positionType, Creator.positionType>>} points
 * @returns {String}
 */
const pointsToShape = (points) => {
    if(points.length > 1) {
        let str = `shape(from ${getPointCords(points[points.length - 1], true, '')}, `;
        str += `${getPointCords(points[0], false, 'line to ', ' ', points[points.length - 1])}, `;
        for(let i = 1; i < points.length; i++) {
            str+= `${getPointCords(points[i], false, 'line to ', ' ', points[i - 1])}, `;
        }
        str += `close)`;
        return str;
    } else {
        return 'none';
    }
}

export { pointsToShape, getPointCords };
export default pointsToShape;