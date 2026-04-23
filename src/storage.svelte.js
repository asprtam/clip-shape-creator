//@ts-ignore
import { Creator, TG } from "./types.js";
/** @typedef {import('./lib/cookie.svelte.js').CookieManger} CookieManger */

class Storage {
    /** @type {{[key in keyof Creator.settings]: (Creator.settings)[key]}} */ //ts-ignore
    // @ts-ignore
    #settings = $state({});
    /** @type {{[key in keyof Creator.settings]: (Creator.settings)[key]}} */
    #defaultSettings;
    /** @type {{[key in keyof Creator.settings]: (Creator.settings)[key]}} */ //@ts-ignore
    #proxyObject;
    /** @type {{width: Number, height: Number}} */
    #proxyImgSize;
    /** @type {CookieManger} */
    #cookieManager = $state();

    get cookieManager() {
        return this.#cookieManager;
    }

    set cookieManager(cm) {
        this.#getSettingsFromCookies(cm);
        this.#cookieManager = cm;
    }

    /**
     * @param {CookieManger} cookieManger
     */
    #getSettingsFromCookies = (cookieManger) => {
        let allCookies = cookieManger.getAll();
        Object.keys(allCookies).forEach((key) => {
            switch(typeof this.#defaultSettings[key]) {
                case "string": {
                    this.settings[key] = allCookies[key];
                    break;
                }
                case "number": {
                    if(!isNaN(Number(allCookies[key]))) {
                        this.settings[key] = Number(allCookies[key]);
                    }
                    break;
                }
                case "boolean": {
                    switch(allCookies[key].trim().toLowerCase()) {
                        case 'true': {
                            this.settings[key] = true;
                            break;
                        }
                        case 'false': {
                            this.settings[key] = false;
                            break;
                        }
                    }
                    break;
                }
            }
        });
        if(allCookies['imgSize_width']) {
            if(!isNaN(Number(allCookies['imgSize_width']))) {
                this.settings.imgSize.width = Number(allCookies['imgSize_width']);
            }
        }
        if(allCookies['imgSize_height']) {
            if(!isNaN(Number(allCookies['imgSize_height']))) {
                this.settings.imgSize.height = Number(allCookies['imgSize_height']);
            }
        }
    }

    get settings() {
        if(!this.#proxyObject) {
            /** @type {{[key in keyof Creator.settings]: (Creator.settings)[key]}} */ //@ts-ignore
            let proxyObject = {};
            Object.keys(this.#defaultSettings).filter((key) => { return !['imgSize'].includes(key); }).forEach(
                /**
                 * 
                 * @param {keyof TG.NotSharedKeysTS<Creator.settings, {'imgSize': ''}>['=>']} _key 
                 */ //@ts-ignore
                (_key) => {
                    let key = `${_key}`;
                    Object.defineProperty(proxyObject, key, {
                        get: () => {
                            switch(typeof this.#settings[key]) {
                                case "string":
                                case "number":
                                case "boolean": {
                                    return this.#settings[key];
                                    break;
                                }
                                default: {
                                    return this.#defaultSettings[key];
                                }
                            }
                        },
                        set: (val) => {
                            if(this.#defaultSettings[key] == val) {
                                this.#settings[key] = undefined;
                                if (this.#cookieManager) {
                                    this.#cookieManager.remove(key);
                                }
                            } else {
                                this.#settings[key] = val;
                                if (this.#cookieManager) {
                                    this.#cookieManager.set(key, `${val}`);
                                }
                            }
                        },
                        enumerable: true
                    });
                }
            );
            if(!this.#proxyImgSize) {
                let proxyImgSize = {};
                Object.defineProperty(proxyImgSize, 'width', {
                    set: (val) => {
                        if(val != this.#defaultSettings.imgSize.width) {
                            if (!this.#settings.imgSize) { //@ts-ignore
                                this.#settings.imgSize = { width: val };
                            } else {
                                this.#settings.imgSize.width = val;
                            }
                            if (this.#cookieManager) {
                                this.#cookieManager.set('imgSize_width', `${val}`);
                            }
                        } else {
                            if(this.#settings.imgSize) {
                                if(typeof this.#settings.imgSize.width == 'number') {
                                    this.#settings.imgSize.width = undefined;
                                }
                            }
                            if(this.#cookieManager) {
                                this.#cookieManager.remove('imgSize_width');   
                            }
                        }
                    },
                    get: () => {
                        if(this.#settings.imgSize) {
                            if(typeof this.#settings.imgSize.width == 'number') {
                                return this.#settings.imgSize.width;
                            }
                        }
                        return this.#defaultSettings.imgSize.width;
                    },
                    enumerable: true
                });
                Object.defineProperty(proxyImgSize, 'height', {
                    set: (val) => {
                        if (val != this.#defaultSettings.imgSize.height) {
                            if (!this.#settings.imgSize) { //@ts-ignore
                                this.#settings.imgSize = { height: val };
                            } else {
                                this.#settings.imgSize.height = val;
                            }
                            this.#cookieManager.set('imgSize_height', `${val}`);
                        } else {
                            if (this.#settings.imgSize) {
                                if (typeof this.#settings.imgSize.height == 'number') {
                                    this.#settings.imgSize.height = undefined;
                                }
                            }
                            if (this.#cookieManager) {
                                this.#cookieManager.remove('imgSize_height');
                            }
                        }
                    },
                    get: () => {
                        if (this.#settings.imgSize) {
                            if (typeof this.#settings.imgSize.height == 'number') {
                                return this.#settings.imgSize.height;
                            }
                        }
                        return this.#defaultSettings.imgSize.height;
                    },
                    enumerable: true
                }); //@ts-ignore
                this.#proxyImgSize = proxyImgSize;
            }
            Object.defineProperty(proxyObject, 'imgSize', {
                get: () => {
                    return this.#proxyImgSize;
                },
                enumerable: true
            });
            this.#proxyObject = proxyObject;
        }
        return this.#proxyObject;
    }

    get canvasSize() {
        return { width: this.settings.imgSize.width + (this.settings.outerPadding * 2), height: this.settings.imgSize.height + (this.settings.outerPadding * 2)  }
    }
    
    /** @type {Array<Creator.point<Creator.positionType, Creator.positionType>>} */
    points = $state([
        {
            pos: { x: 0, y: 100, xPositionType: 'percent', yPositionType: 'percent', },
            with: { x: 0, y: 100, xPositionType: 'percent', yPositionType: 'percent', }
        },
        {
            pos: { x: 50, y: 0, xPositionType: 'percent', yPositionType: 'percent', },
            with: { x: 0, y: 50, xPositionType: 'percent', yPositionType: 'percent', }
        },
        {
            pos: { x: 100, y: 100, xPositionType: 'percent', yPositionType: 'percent', },
            with: { x: 100, y: 50, xPositionType: 'percent', yPositionType: 'percent', }
        }
    ]);

    /** 
     * @param {{[key in keyof Creator.settings]: (Creator.settings)[key]}} defaultSettings
     * @param {CookieManger} [cookieManger]
     */
    constructor(defaultSettings, cookieManger) {
        this.#defaultSettings = defaultSettings;
        if(cookieManger) {
            this.#getSettingsFromCookies(cookieManger);
            this.#cookieManager = cookieManger;
        }
    }
}

const defaultSettings = {
    bg: 'url(\'https://free-images.com/lg/2b9d/bird_wildlife_sky_clouds.jpg\')',
    bgOpacity: 1,
    bgShowUnclipped: true,
    bgUnclippedOpacity: 0.2,
    imgSize: { width: 100, height: 100 },
    outerPadding: 50,
    scale: 3,
    gridSize: 5,
    gridVisible: true,
    hintsClosed: false
}

export { Storage, defaultSettings };
export default Storage;