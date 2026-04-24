<script>
    //@ts-ignore
    import { PositionTypes, Creator } from "./types.js";
    import { translateCords } from "./lib/toShape.svelte";
    import helpers from './lib/helpers.svelte';
    import { onMount } from "svelte";
    /** @typedef {typeof import('./lib/localisationTexts.svelte.js').localisationEN} locType */
    import Dropdown from "./lib/Dropdown.svelte";
    /** @type {{id: Number, hue: String, storage: import('./storage.svelte.js').Storage, localisationTexts: locType}} */
    let { id, hue, storage = $bindable(null), localisationTexts } = $props();

    /** @type {HTMLInputElement} */
    let inputX = $state();
    /** @type {ReturnType<helpers['createNumericInput']>} */
    let numericInputX;

    /** @type {HTMLInputElement} */
    let inputY = $state();
    /** @type {ReturnType<helpers['createNumericInput']>} */
    let numericInputY;

    /** @type {HTMLInputElement} */
    let inputXWith = $state();
    /** @type {ReturnType<helpers['createNumericInput']>} */
    let numericInputXWith;
    /** @type {HTMLInputElement} */
    let inputYWith = $state();
    /** @type {ReturnType<helpers['createNumericInput']>} */
    let numericInputYWith;
    
    const handleRemove = () => {
        storage.points = storage.points.slice(0, id).concat(storage.points.slice(id + 1));
    }

    // svelte-ignore state_referenced_locally
    let posXpositionType = $state(storage.points[id].pos.xPositionType);
    // svelte-ignore state_referenced_locally
    let posYpositionType = $state(storage.points[id].pos.yPositionType);
    // svelte-ignore state_referenced_locally
    let withXpositionType = $state(storage.points[id].with.xPositionType);
    // svelte-ignore state_referenced_locally
    let withYpositionType = $state(storage.points[id].with.yPositionType);

    /** @type {{[key in keyof PositionTypes]: { classList?: Array<String>, css?: String, text?: String }}}*/
    let positionTypeOptions = $derived.by(() => {
        /** @type {{[key in keyof PositionTypes]: { classList?: Array<String>, css?: String, text?: String }}}*/ //@ts-ignore
        let retObj = {};
        Object.keys(PositionTypes).forEach((type) => {
            retObj[type] = { text: localisationTexts.calcTypes[type] };
        });
        return(retObj);
    });

    /**
     * @param {HTMLSelectElement} element
     * @param {Boolean} pos
     * @param {Boolean} xOrY
     * @param {Creator.positionType} toType
     */
    const handleChangeCalcType = (element, pos, xOrY, toType) => {
        if(pos) {
            if(xOrY) {
                storage.points[id].pos = translateCords(storage.points[id].pos, { xPositionType: toType, yPositionType: storage.points[id].pos.yPositionType }, storage.settings.imgSize);
            } else {
                storage.points[id].pos = translateCords(storage.points[id].pos, { xPositionType: storage.points[id].pos.xPositionType, yPositionType: toType }, storage.settings.imgSize);
            }
        } else {
            if(xOrY) {
                storage.points[id].with = translateCords(storage.points[id].with, { xPositionType: toType, yPositionType: storage.points[id].with.yPositionType }, storage.settings.imgSize);
            } else {
                storage.points[id].with = translateCords(storage.points[id].with, { xPositionType: storage.points[id].with.xPositionType, yPositionType: toType }, storage.settings.imgSize);
            }
        }
    }

    $effect(() => {
        if(inputX) {
            inputX.value = `${storage.points[id].pos.x}`;
        }
        if(numericInputX == undefined || numericInputX == null) {
            numericInputX = helpers.createNumericInput(inputX, (val) => {
                storage.points[id].pos.x = val;
            }, storage.points[id].pos.x)
        }
        if(inputY) {
            inputY.value = `${storage.points[id].pos.y}`;
        }
        if(numericInputY == undefined || numericInputY == null) {
            numericInputY = helpers.createNumericInput(inputY, (val) => {
                storage.points[id].pos.y = val;
            }, storage.points[id].pos.y);
        }

        if(inputXWith) {
            if(document.body.contains(inputXWith)) {
                inputXWith.value = `${storage.points[id].with.x}`;
                if(numericInputXWith == undefined || numericInputXWith == null) {
                    numericInputXWith = helpers.createNumericInput(inputXWith, (val) => {
                        storage.points[id].with.x = val;
                    }, storage.points[id].with.x);
                }
            } else {
                numericInputYWith = undefined;
            }
        } else if(numericInputYWith) {
            numericInputYWith = undefined;
        }

        if(inputYWith) {
            if(document.body.contains(inputXWith)) {
                inputYWith.value = `${storage.points[id].with.y}`;
                if(numericInputYWith == undefined || numericInputYWith == null) {
                    numericInputYWith = helpers.createNumericInput(inputYWith, (val) => {
                        storage.points[id].with.y = val;
                    }, storage.points[id].with.y);
                }
            } else {
                numericInputYWith = undefined;
            }
        } else if(numericInputYWith) {
            numericInputYWith = undefined;
        }
    });

    onMount(() => {
        numericInputX = helpers.createNumericInput(inputX, (val) => {
            storage.points[id].pos.x = val;
        }, storage.points[id].pos.x);
        numericInputY = helpers.createNumericInput(inputY, (val) => {
            storage.points[id].pos.y = val;
        }, storage.points[id].pos.y);
        if(inputXWith) {
            numericInputXWith = helpers.createNumericInput(inputXWith, (val) => {
                storage.points[id].with.x = val;
            }, storage.points[id].with.x);
        }
        if(inputYWith) {
            numericInputYWith = helpers.createNumericInput(inputYWith, (val) => {
                storage.points[id].with.y = val;
            }, storage.points[id].with.y);
        }
    });
</script>

<div class="pointEntry" style="--hue: {hue};">
    <p>{localisationTexts.controls.point} {id + 1}</p>
    <div class="controlGroup double">
        <p>{localisationTexts.controls.position}</p>
        <div class="controlEntry double">
            <p>X/left:</p>
            <div class="controlBox titled">
                <p>{localisationTexts.controls.value} <span class="unit">({storage.points[id].pos.xPositionType == 'percent' ? localisationTexts.controls.inPercents : localisationTexts.controls.inPx})</span>:</p>
                <input bind:this={inputX} type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
            </div>
            <div class="controlBox titled">
                <p>{localisationTexts.controls.calcType}:</p>
                <Dropdown options={positionTypeOptions} defaultValue={posXpositionType} bind:value={posXpositionType} onChange={() => { handleChangeCalcType(this, true, true, posXpositionType) }}>
                </Dropdown>
                <!-- <select bind:value={posXpositionType} onchange={() => { handleChangeCalcType(this, true, true, posXpositionType) }}>
                    {#each Object.keys(PositionTypes) as type}
                        <option value={type}>{localisationTexts.calcTypes[type]}</option>
                    {/each}
                </select> -->
            </div>
        </div>
        <div class="controlEntry double">
            <p>Y/top:</p>
            <div class="controlBox titled">
                <p>{localisationTexts.controls.value} <span class="unit">({storage.points[id].pos.yPositionType == 'percent' ? localisationTexts.controls.inPercents : localisationTexts.controls.inPx})</span>:</p>
                <input bind:this={inputY} type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
            </div>
            <div class="controlBox titled">
                <p>{localisationTexts.controls.calcType}:</p>
                <Dropdown options={positionTypeOptions} defaultValue={posYpositionType} bind:value={posYpositionType} onChange={() => { handleChangeCalcType(this, true, false, posYpositionType) }}>
                </Dropdown>
                <!-- <select bind:value={posYpositionType} onchange={() => { handleChangeCalcType(this, true, false, posYpositionType) }}>
                    {#each Object.keys(PositionTypes) as type}
                        <option value={type}>{localisationTexts.calcTypes[type]}</option>
                    {/each}
                </select> -->
            </div>
        </div>
    </div>
    <div class="controlGroup double">
        <p>{localisationTexts.controls.curve}</p>
        <div class="controlEntry double">
            <p>X/left:</p>
            <div class="controlBox titled">
                <p>{localisationTexts.controls.value} <span class="unit">({storage.points[id].with.xPositionType == 'percent' ? localisationTexts.controls.inPercents : localisationTexts.controls.inPx})</span>:</p>
                <input bind:this={inputXWith} type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
            </div>
            <div class="controlBox titled">
                <p>{localisationTexts.controls.calcType}:</p>
                <Dropdown options={positionTypeOptions} defaultValue={withXpositionType} bind:value={withXpositionType} onChange={() => { handleChangeCalcType(this, false, true, withXpositionType) }}>
                </Dropdown>
                <!-- <select bind:value={withXpositionType} onchange={() => { handleChangeCalcType(this, false, true, withXpositionType) }}>
                    {#each Object.keys(PositionTypes) as type}
                        <option value={type}>{localisationTexts.calcTypes[type]}</option>
                    {/each}
                </select> -->
            </div>
        </div>
        <div class="controlEntry double">
            <p>Y/top:</p>
            <div class="controlBox titled">
                <p>{localisationTexts.controls.value} <span class="unit">({storage.points[id].with.yPositionType == 'percent' ? localisationTexts.controls.inPercents : localisationTexts.controls.inPx})</span>:</p>
                <input bind:this={inputYWith} type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
            </div>
            <div class="controlBox titled">
                <p>{localisationTexts.controls.calcType}:</p>
                <Dropdown options={positionTypeOptions} defaultValue={withYpositionType} bind:value={withYpositionType} onChange={() => { handleChangeCalcType(this, false, false, withYpositionType) }}>
                </Dropdown>
                <!-- <select bind:value={withYpositionType} onchange={() => { handleChangeCalcType(this, false, false, withYpositionType) }}>
                    {#each Object.keys(PositionTypes) as type}
                        <option value={type}>{localisationTexts.calcTypes[type]}</option>
                    {/each}
                </select> -->
            </div>
        </div>
    </div>
    <button class="removeBtn" onclick={handleRemove}><span>{localisationTexts.controls.remove}</span></button>
</div>