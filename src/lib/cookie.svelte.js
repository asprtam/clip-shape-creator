class Cookie {
    /** @type {String} */
    name;
    /** @type {String} */
    value;

    /** @returns {{[id:String]:String}} */
    static getAll = () => {
        /** @type {{[id:String]:String}} */
        let cookie = {};
        document.cookie.split(';').forEach((el) => {
            let splitted = el.split('=');
            if (splitted.length > 0) {
                let cookieName = splitted[0].trim();
                let cookieContents = '';
                if (splitted.length > 1) {
                    for (let i = 1; i < splitted.length; i++) {
                        cookieContents += `${splitted[i]}=`;
                    }
                    cookieContents = cookieContents.slice(0, -1);
                }
                cookie[cookieName] = cookieContents;
            }
        });
        return cookie;
    }
    /** 
     * @param {String} name
     * @returns {String|Null}
     */
    static get = (name) => {
        let all = this.getAll();
        if (Object.keys(all).includes(name)) {
            return all[name];
        } else {
            return null;
        }
    }
    /**
     * @param {String} name
     * @param {String} value
     * @param {Number} [days=365]
     * @returns {String}
     */
    static set = (name, value, days = 365) => {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + "; SameSite=Strict; path=/";
        return value;
    }
    /**
     * @param {String} name 
     */
    static remove = (name) => {
        this.set(name, '', -1);
    }
    remove = () => {
        Cookie.remove(this.name);
    }
    /**
     * @param {String} name
     * @param {String} value
     * @param {Number} [days=365]
     */
    constructor(name, value, days = 365) {
        this.name = name;
        this.value = value;
        Cookie.set(name, value, days);
    }
}

class CookieManger {
    /** @type {'accepted'|'declined'|null} */
    #accepted = $state(null);

    get accepted() {
        return this.#accepted;
    }
    
    set accepted(value) {
        switch (value) {
            case "accepted":
            case "declined": {
                this.#accepted = value;
                break;
            }
        }
    }

    /** @returns {{[id:String]:String}} */
    getAll = () => {
        if(this.#accepted == 'accepted') {
            console.log(Cookie.getAll());
            return Cookie.getAll();
        }
        return {};
    }
    /** 
     * @param {String} name
     * @returns {String|Null}
     */
    get = (name) => {
        if (this.#accepted == 'accepted') {
            return Cookie.get(name);
        }
        return null;
    }
    /**
     * @param {String} name
     * @param {String} value
     * @param {Number} [days=365]
     * @returns {String}
     */
    set = (name, value, days = 365) => {
        if (this.#accepted == 'accepted') {
            Cookie.set(name, value, days);
        }
        return name;
    }
    /**
     * @param {String} name 
     */
    remove = (name) => {
        Cookie.remove(name);
    }

    constructor() {
        switch (Cookie.get('cookie_consent')) {
            case 'accepted': {
                this.accepted = 'accepted';
                break;
            }
            case 'declined': {
                this.accepted = 'declined';
                break;
            }
        }
    }
}

export { CookieManger };
export default Cookie;