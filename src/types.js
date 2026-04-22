/** @namespace Creator */

const PositionTypes = { 'percent': 'Percents', 'middle': 'PX from middle', 'start': 'PX from start', 'end': 'PX from end' };

/**
 * @typedef {keyof typeof PositionTypes} Creator.positionType
 * @memberof Creator
 */
/**
 * @template {Creator.positionType} xType
 * @template {Creator.positionType} yType
 * @typedef {Object} Creator.point
 * @property {xType & Creator.positionType} xPositionType
 * @property {yType & Creator.positionType} yPositionType
 * @property {{x: Number, y: Number}} pos
 * @property {{x: Number, y: Number}} with
 * @memberof Creator
 */

const Creator = {};
export { Creator, PositionTypes };