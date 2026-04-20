<script>
    //@ts-ignore
    import { PositionTypes } from "./types.js";
    import helpers from './lib/helpers.svelte';
    import storage from './storage.svelte';
    import { onMount } from "svelte";
    /** @type {{id: Number}} */
    let { id } = $props();

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

<div class="pointEntry">
    <p>Point {id + 1}</p>
    <div class="controlGroup double">
        <p>Position</p>
        <div class="controlEntry double">
            <p>X/left:</p>
            <div class="controlBox titled">
                <p>Value <span class="unit">({storage.points[id].xPositionType == 'percent' ? 'in %' : 'in PXs'})</span>:</p>
                <input bind:this={inputX} type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
            </div>
            <div class="controlBox titled">
                <p>Calculation type:</p>
                <select bind:value={storage.points[id].xPositionType}>
                    {#each Object.keys(PositionTypes) as type}
                        <option value={type}>{PositionTypes[type]}</option>
                    {/each}
                </select>
            </div>
        </div>
        <div class="controlEntry double">
            <p>Y/top:</p>
            <div class="controlBox titled">
                <p>Value <span class="unit">({storage.points[id].yPositionType == 'percent' ? 'in %' : 'in PXs'})</span>:</p>
                <input bind:this={inputY} type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
            </div>
            <div class="controlBox titled">
                <p>Calculation type:</p>
                <select bind:value={storage.points[id].yPositionType}>
                    {#each Object.keys(PositionTypes) as type}
                        <option value={type}>{PositionTypes[type]}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>
    {#if id > 0}
        <div class="controlGroup">
            <p>Curve</p>
            <div class="controlEntry double">
                <div class="controlBox titled">
                    <p>X/left <span class="unit">({storage.points[id].xPositionType == 'percent' ? 'in %' : 'in PXs'})</span>:</p>
                    <input bind:this={inputXWith} type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
                </div>
                <div class="controlBox titled">
                    <p>Y/top <span class="unit">({storage.points[id].yPositionType == 'percent' ? 'in %' : 'in PXs'})</span>:</p>
                    <input bind:this={inputYWith} type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
                </div>
            </div>
        </div>
    {/if}
    <button class="removeBtn" onclick={handleRemove}>remove</button>
</div>