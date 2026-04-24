/**
 * 
 * @param {Number} len 
 * @param {Number} curr 
 * @returns {Number}
 */
const getHue = (len, curr) => {
    let step = 110;
    let minExtraStep = 10;
    let maxExtraStep = 30;
    let parts = Math.floor(360 / step);
    let extraStep = Math.max(minExtraStep, Math.min(maxExtraStep, (360 / (len + (parts - (len % parts))))));
    let currIteration = Math.floor(curr / parts);
    return ((-5 + (extraStep * currIteration)) + (Math.round(step * (curr%parts)))) % 360;
}

export default getHue;