import { cubicInOut } from 'svelte/easing';

/**
 * 
 * @param {HTMLElement} node
 * @param {{delay?: Number, duration?: Number, easing?: (t:Number) => Number }} params
 */
function slideBanner(node, { delay = 0, duration = 200, easing = cubicInOut }) {
    const finalHeight = node.offsetHeight;
    return {
        delay: delay || 0,
        duration: duration || 200,
        easing: easing || cubicInOut,
        /**
         * @param {Number} t
         * @param {Number} u
         */
        css: (t, u) => {
            return `overflow: hidden; height: ${finalHeight * t}px;`;
        }
    }
}

/**
 * 
 * @param {HTMLElement} node
 * @param {{delay?: Number, duration?: Number, easing?: (t:Number) => Number }} params
 */
function slideBannerWithOpacity(node, { delay = 0, duration = 200, easing = cubicInOut }) {
    const finalHeight = node.offsetHeight;
    return {
        delay: delay || 0,
        duration: duration || 200,
        easing: easing || cubicInOut,
        /**
         * @param {Number} t
         * @param {Number} u
         */
        css: (t, u) => {
            return `overflow: hidden; height: ${finalHeight * t}px; opacity: ${1 * t};`;
        }
    }
}

export { slideBanner, slideBannerWithOpacity };