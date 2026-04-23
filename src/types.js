/** @namespace Creator */
/** @namespace TG */

const PositionTypes = { 'percent': 'Percents', 'middle': 'PX from middle', 'start': 'PX from start', 'end': 'PX from end' };

/**
 * @typedef {keyof typeof PositionTypes} Creator.positionType
 * @memberof Creator
 */
/**
 * @template {Creator.positionType} xType
 * @template {Creator.positionType} yType
 * @typedef {Object} Creator.point
 * @property {{x: Number, y: Number, xPositionType: xType & Creator.positionType, yPositionType: yType & Creator.positionType}} pos
 * @property {{x: Number, y: Number, xPositionType: xType & Creator.positionType, yPositionType: yType & Creator.positionType}} with
 * @memberof Creator
 */

/**
 * @template {{[id: String]: *}} T
 * @typedef {{'=>': {[key in keyof T]: T[key]}}} TG.StealHisLook
 * @memberof TG
 */

/**
 * @template {{[id: String]: *}} T
 * @typedef {{'=>': {[key in keyof T]?: T[key]}}} TG.StealHisLookOptional
 * @memberof TG
 */

/**
 * typescript omit variant
 * https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
 * @template {{[id: String]: *}} T0
 * @template {{[id: String]: *}} T1
 * @typedef {TG.StealHisLook<(
 * {[K in keyof Omit<T0, (keyof T0) & (keyof T1)>]: T0[K]} &
 * {[K in keyof Omit<T1, (keyof T0) & (keyof T1)>]: T1[K]}
 * )>} TG.NotSharedKeysTS
 * @memberof TG
 */

/**
 * @typedef {typeof import('./storage.svelte.js').defaultSettings} Creator.settings
 * @memberof Creator
 */

const Creator = {};
const TG = {};
export { Creator, PositionTypes, TG };