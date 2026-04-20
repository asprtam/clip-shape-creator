//@ts-ignore
import { Creator } from "./types.js";

const storage = $state({
    bg: 'url(\'https://files.wydawnictwodraco.pl/books/?file=_images/columbia_tlo0.svg\')',
    imgSize: { width: 100, height: 100 },
    outerPadding: 50,
    scale: 3,
    gridSize: 5,
    gridVisible: true,
    /** @type {Array<Creator.point<Creator.positionType, Creator.positionType>>} */
    points: [
        {
            xPositionType: 'percent',
            yPositionType: 'percent',
            pos: { x: 0, y: 100 },
            with: { x: 0, y: 100 }
        },
        {
            xPositionType: 'percent',
            yPositionType: 'percent',
            pos: { x: 50, y: 0},
            with: { x: 0, y: 50 }
        },
        {
            xPositionType: 'percent',
            yPositionType: 'percent',
            pos: { x: 100, y: 100 },
            with: { x: 100, y: 50 }
        }
    ]
});

const defaults = {
    bg: 'url(\'https://files.wydawnictwodraco.pl/books/?file=_images/columbia_tlo0.svg\')',
    imgSize: { width: 100, height: 100 },
    outerPadding: 50,
    scale: 3,
    gridSize: 5,
    gridVisible: true
}

const derivedStorage = {
    canvasSize: (() => {
        return { width: storage.imgSize.width + (storage.outerPadding * 2), height: storage.imgSize.height + (storage.outerPadding * 2) };
    })()
}
export { storage, derivedStorage, defaults };
export default storage;