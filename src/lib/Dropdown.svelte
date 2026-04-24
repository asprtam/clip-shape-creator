<script>
    import { onDestroy, onMount } from "svelte";
    import helpers from './helpers.svelte';
    import { slideBanner, scaleAndOpacity } from './customAnimations';
    /**
     * @type {{ options: {[id: String]: { classList?: Array<String>, css?: String, text?: String }}, value: String, defaultValue?: String, classList?: Array<String>, classListMenu?: Array<String>, id?: String, onChange?: () => void; checkBounds?: Boolean, minBound?: Number }}
     */
    let { options, value = $bindable(), defaultValue, classList, classListMenu, id, onChange, checkBounds = true, minBound = 10 } = $props();
    let isOpened = $state(false);
    let hasEvent = { focus: false, click: false, offClick: false };
    /** @type {HTMLElement} */
    let container = $state();
    /** @type {HTMLElement} */
    let placeholder = $state();
    /** @type {HTMLSelectElement} */
    let fakeSelect = $state();
    /** @type {HTMLElement} */
    let menuContainer = $state();
    /** @type {String} */
    let currentHover = $state(null);

    let _id = $derived.by(() => {
        if(id) {
            return id;
        }
        return helpers.makeId(10, 'dropdown-');
    });

    let closestOverflowHiddenElement = $derived.by(() => {
        /**
         * @param {HTMLElement} el
         * @returns {HTMLElement}
         */
        const check = (el) => {
            let tempCompStyle = window.getComputedStyle(el);
            if([`${tempCompStyle.getPropertyValue('overflow')}`.trim().toLowerCase(), `${tempCompStyle.getPropertyValue('overflow-x')}`.trim().toLowerCase(), `${tempCompStyle.getPropertyValue('overflow-y')}`.trim().toLowerCase()].includes('hidden') || el.parentElement == null) {
                return el;
            }
            return check(el.parentElement);
        }
        if(container && checkBounds) {
            if(container.parentElement) { //@ts-ignore
                return check(container.parentElement);
            }
        }
        return(document.body);
    });

    /**
     * @param {String} txt
     * @param {Number} [currentDepth]
     * @returns {String}
     */
    const parseOptionText = (txt, currentDepth = 0) => {
        if(typeof txt == 'string') {
            let optionText = `${txt}`;
            let matches = optionText.match(/\([\w\W\d\D]*\)/gmi);
            if(matches) {
                matches.forEach((match) => {
                    let inner = parseOptionText(`${match.slice(1, -1)}`, currentDepth + 1);
                    optionText = optionText.replace(match, `<span class="bracket lvl-${currentDepth + 1}">(</span><span class="misc lvl-${currentDepth + 1}">${inner}</span><span class="bracket lvl-${currentDepth + 1}">)</span>`);
                });
            }
            return optionText;
        } else {
            return '';
        }
    }

    /** @type {{[id: String]: String}} */
    let optionTexts = $derived.by(() => {
        /** @type {{[id: String]: String}} */
        let obj = {};
        Object.keys(options).forEach((option) => {
            obj[option] = parseOptionText(options[option].text);
        });
        return obj;
    });

    const getDefaultValue = () => {
         if(Object.keys(options).includes(defaultValue)) {
            return defaultValue;
        } else if(Object.keys(options).length > 0) {
            return Object.keys(options)[0];
        }
        return null;
    }

    const handleOnChange_fakeSelect = () => {
        if(fakeSelect) {
            if(Object.keys(options).includes(fakeSelect.value)) {
                value = fakeSelect.value;
                if(onChange) {
                    onChange();
                }
            } else {
                fakeSelect.value = value;
            }
        }
    }

    const handleClick_fakeSelect = () => {
        if(fakeSelect && !isOpened) {
            isOpened = true;
            if(hasEvent.focus) {
                hasEvent.focus = false;
                fakeSelect.removeEventListener('focus', handleFocus_fakeSelect);
            }
            if(hasEvent.click && container) {
                hasEvent.click = false;
                container.removeEventListener('pointerdown', handleClick_fakeSelect);
            }
            setTimeout(() => {
                if(!hasEvent.offClick) {
                    hasEvent.offClick = true;
                    document.body.addEventListener('pointerdown', handleOffclick)
                }
                fakeSelect.blur();
            });
        }
    }

    const handleFocus_fakeSelect = () => {
        if(!isOpened) {
            if(hasEvent.focus && fakeSelect) {
                hasEvent.focus = false;
                fakeSelect.removeEventListener('focus', handleFocus_fakeSelect);
            }
            if(hasEvent.click && container) {
                hasEvent.click = false;
                container.removeEventListener('pointerdown', handleClick_fakeSelect);
            }
            setTimeout(() => {
                if(!hasEvent.offClick) {
                    hasEvent.offClick = true;
                    document.body.addEventListener('pointerdown', handleOffclick)
                }
                fakeSelect.blur();
            });
        }
    }

    let listHeight = $state(0);
    let listWidth = $state(0);

    /**
     * @param {PointerEvent} e
     */
    const handleOffclick = (e) => {
        let contOk = false;
        if(container) { //@ts-ignore
            contOk = (!container.contains(e.target) || e.target == container);
        }
        if(placeholder) { //@ts-ignore
            contOk = contOk || (e.target == placeholder || placeholder.contains(e.target));
        }
        if(contOk && isOpened) {
            hide();
        }
    }

    const hide = () => {
        if(isOpened) {
            currentHover = null;
            isOpened = false;
            if(hasEvent.offClick) {
                hasEvent.offClick = false;
                document.body.removeEventListener('pointerdown', handleOffclick)
            }
            setTimeout(() => {
                if(!hasEvent.focus && fakeSelect) {
                    hasEvent.focus = true;
                    fakeSelect.addEventListener('focus', handleFocus_fakeSelect);
                }
                if(!hasEvent.click && container) {
                    hasEvent.click = true;
                    container.addEventListener('pointerdown', handleClick_fakeSelect);
                }
            });
        }
    }

    let prevOffset = null;

    /** @type {Number} */
    let currentOffset = $derived.by(() => {
        if(checkBounds && container) {
            let relativePosition = helpers.getPositionRelativeTo(container, closestOverflowHiddenElement);
            let bounds = closestOverflowHiddenElement.getBoundingClientRect();
            let offset = typeof prevOffset == 'number' ? prevOffset : 0;
            if(bounds.width - minBound < ((relativePosition.left + (relativePosition.width / 2) + (listWidth / 2)) - offset)) {
                return ((relativePosition.left + (relativePosition.width / 2) + (listWidth / 2)) - offset) - (bounds.width - minBound);
            }
        }
        return null;
    });

    $effect(() => {
        if(!Object.keys(options).includes(value) && typeof value == 'string') {
            value = getDefaultValue();
        }
        if(fakeSelect) {
            fakeSelect.value = value;
        }
        if(menuContainer) {
            if(listWidth != menuContainer.offsetWidth) {
                listWidth = menuContainer.offsetWidth;
            }
        }
        prevOffset = currentOffset;
    });

    onMount(() => {
        if(value != getDefaultValue()) {
            value = getDefaultValue();
        }
        if(fakeSelect) {
            fakeSelect.value = value;
            if(!hasEvent.focus) {
                hasEvent.focus = true;
                fakeSelect.addEventListener('focus', handleFocus_fakeSelect);
            }
            if(!hasEvent.click && container) {
                hasEvent.click = true;
                container.addEventListener('pointerdown', handleClick_fakeSelect);
            }    
        }
        prevOffset = currentOffset;
    });

    onDestroy(() => {
        if(hasEvent.offClick) {
            hasEvent.offClick = false;
            document.body.removeEventListener('pointerdown', handleOffclick)
        }
    });
</script>

<span id={_id} class="dropdownContainer{classList ? ` ${classList.join(' ')}` : ''}{isOpened ? ' open' : ''}" bind:this={container} style="position: relative;">
    <select class="dropdownContainerFakeSelect" onchange={() => { handleOnChange_fakeSelect(); }} bind:this={fakeSelect} style="user-select: none; pointer-events: none; touch-action: none; position: absolute !important; opacity: 0 !important; width: 100%; height: 100%; left: 0px; top: 0px;">
        {#each Object.keys(options) as option}
            <option value={option}>{options[option].text}</option>
        {/each}
    </select>
    {#if isOpened}
        <div class="dropdownMenu{classListMenu ? ` ${classListMenu.join(' ')}` : ''}" style="position: absolute; min-width: 100%; width: {listWidth}px; left: 50%; top: 100%; transform: translateX({typeof currentOffset == 'number' ? `calc(-50% - ${currentOffset}px)` : `-50%`});">
            <div class="dropdownMenuInner" in:slideBanner={{_final: listHeight, duration: 300 }} out:slideBanner={{_final: listHeight, duration: 300 }}>
                <ul bind:this={menuContainer} class="dropdownMenuList" bind:offsetHeight={listHeight} bind:offsetWidth={listWidth} style="position: relative; display: flex; flex-direction: column; list-style-type: none;">
                    {#each Object.keys(options) as option}
                        <li class="{value == option ? (currentHover == value || !Object.keys(options).includes(currentHover)) ? ' selected-hover' : ' selected' : currentHover == option ? ' hover': ''}{options[option].classList ? ` ${options[option].classList.join(' ')}` : ''}" style="{options[option].css ? options[option].css : ''}" onpointerover={() => { if(isOpened) { currentHover = option; } }} onpointerdown={() => { if(isOpened) { value = option; if(onChange) { onChange(); } hide(); } }} bind:innerHTML={optionTexts[option]} contenteditable="false"></li>
                    {/each}
                </ul>
            </div>
        </div>
    {/if}
    {#each Object.keys(options) as option}
        {#if value == option}
            <span in:scaleAndOpacity={{delay: 100, duration: 300}} out:scaleAndOpacity={{delay: 0, duration: 300}} bind:this={placeholder} class="dropdownPlaceholder{options[option]?.classList ? ` ${options[option].classList.join(' ')}` : ''}" style="position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; {options[option]?.css ? options[option].css : ''}"><span class="placeholderTextContent" bind:innerHTML={optionTexts[option]} contenteditable="false"></span></span>
        {/if}
    {/each}
</span>