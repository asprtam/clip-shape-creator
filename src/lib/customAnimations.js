import { cubicInOut, elasticOut } from 'svelte/easing';

/**
 * 
 * @param {HTMLElement} node
 * @param {{_final?: Number, delay?: Number, duration?: Number, easing?: (t:Number) => Number }} params
 */
function slideBanner(node, { _final = 0, delay = 0, duration = 200, easing = cubicInOut }) {
    const finalHeight = _final ? _final : node.offsetHeight;
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
 * @param {{ delay?: Number, duration?: Number, easing?: (t:Number) => Number }} params
 */
function scaleAndOpacity(node, { delay = 0, duration = 200, easing = elasticOut }) {
    return {
        delay: delay || 0,
        duration: duration || 200,
        easing: easing || cubicInOut,
        /**
         * @param {Number} t
         * @param {Number} u
         */
        css: (t, u) => {
            return `opacity: ${1 * t};`;
        }
    }
}

/**
 * 
 * @param {HTMLElement} node
 * @param {{_final?: Number, delay?: Number, duration?: Number, easing?: (t:Number) => Number }} params
 */
function slideBannerWithOpacity(node, { _final = 0, delay = 0, duration = 200, easing = cubicInOut }) {
    const finalHeight = _final ? _final : node.offsetHeight;
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

export { slideBanner, slideBannerWithOpacity, scaleAndOpacity };