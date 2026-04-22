//@ts-ignore
import { Creator } from "./types.js";

const storage = $state({
    bg: 'url(\'https://free-images.com/lg/2b9d/bird_wildlife_sky_clouds.jpg\')',
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
    ],
    history: []
});

const defaults = {
    bg: 'url(\'https://free-images.com/lg/2b9d/bird_wildlife_sky_clouds.jpg\')',
    imgSize: { width: 100, height: 100 },
    outerPadding: 50,
    scale: 3,
    gridSize: 5,
    gridVisible: true
}

const derivedStorage = {
    canvasSize: (() => {
        return { width: storage.imgSize.width + (storage.outerPadding * 2), height: storage.imgSize.height + (storage.outerPadding * 2) };
    })(),
    points: (() => {
        return storage.points;
    })()
}
export { storage, derivedStorage, defaults };
export default storage;