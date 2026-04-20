//@ts-ignore
import { Creator } from "../types.js";

/**
 * @param {Creator.point<Creator.positionType, Creator.positionType>} point
 * @param {Boolean} [ignoreWith]
 * @param {String} [start]
 * @param {String} [join]
 * @returns {String}
 */
const getPointCords = (point, ignoreWith = false, start = 'line to ', join = ' ') => {
    let str = `${start}`;
    let withStr = '';
    let withDefault = true;
    if(point.with && !ignoreWith) {
        if(point.with.x != point.pos.x || point.with.y != point.pos.y) {
            withStr = `${join}with${join}`;
            str = `${join}curve to${join}`;
            withDefault = false;
        }
    }
    switch(point.xPositionType) {
        case "percent": {
            str += `${point.pos.x}%${join}`;
            if(point.with && !ignoreWith && !withDefault) {
                withStr += `${point.with.x}%${join}`;
            }
            break;
        }
        case "middle": {
            if(point.pos.x < 0) {
                str += `calc(50% - ${Math.abs(point.pos.x)}px)${join}`;
            } else {
                str += `calc(50% + ${point.pos.x}px)${join}`;
            }
            if(point.with && !ignoreWith && !withDefault) {
                if(point.with.x < 0) {
                    withStr += `calc(50% - ${Math.abs(point.with.x)}px)${join}`;
                } else {
                    withStr += `calc(50% + ${point.with.x}px)${join}`;
                }
            }
            break;
        }
        case "start": {
            str += `${point.pos.x}px${join}`;
            if(point.with && !ignoreWith && !withDefault) {
                withStr += `${point.with.x}px${join}`;
            }
            break;
        }
        case "end": {
            if(point.pos.x < 0) {
                str += `calc(100% - ${Math.abs(point.pos.x)}px)${join}`;
            } else {
                str += `calc(100% + ${point.pos.x}px)${join}`;
            }
            if(point.with && !ignoreWith && !withDefault) {
                if(point.with.x < 0) {
                    withStr += `calc(100% - ${Math.abs(point.with.x)}px)${join}`;
                } else {
                    withStr += `calc(100% + ${point.with.x}px)${join}`;
                }
            }
            break;
        }
    }
    switch(point.yPositionType) {
        case "percent": {
            str += `${point.pos.y}%`;
            if(point.with && !ignoreWith && !withDefault) {
                withStr += `${point.with.y}%`;
            }
            break;
        }
        case "middle": {
            if(point.pos.y < 0) {
                str += `calc(50% - ${Math.abs(point.pos.y)}px)`;
            } else {
                str += `calc(50% + ${point.pos.y}px)`;
            }
            if(point.with && !ignoreWith && !withDefault) {
                if(point.with.y < 0) {
                    withStr += `calc(50% - ${Math.abs(point.with.y)}px)`;
                } else {
                    withStr += `calc(50% + ${point.with.y}px)`;
                }
            }
            break;
        }
        case "start": {
            str += `${point.pos.y}px`;
            if(point.with && !ignoreWith && !withDefault) {
                withStr += `${point.with.y}px`;
            }
            break;
        }
        case "end": {
            if(point.pos.x < 0) {
                str += `calc(100% - ${Math.abs(point.pos.y)}px)`;
            } else {
                str += `calc(100% + ${point.pos.y}px)`;
            }
            if(point.with && !ignoreWith && !withDefault) {
                if(point.with.y < 0) {
                    withStr += `calc(100% - ${Math.abs(point.with.y)}px)`;
                } else {
                    withStr += `calc(100% + ${point.with.y}px)`;
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
        let str = `shape(from ${getPointCords(points[0], true, '')}, `;
        for(let i = 1; i < points.length; i++) {
            str+= `${getPointCords(points[i])}, `;
        }
        str += `close)`;
        return str;
    } else {
        return 'none';
    }
}

export { pointsToShape, getPointCords };
export default pointsToShape;