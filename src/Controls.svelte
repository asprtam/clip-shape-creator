<script> //@ts-ignore
    import { Creator } from './types';
    import { onMount } from 'svelte';
    import helpers from './lib/helpers.svelte';
    import Storage from './storage.svelte';
    import ControlPoint from "./ControlPoint.svelte";
    import Checkbox from "./lib/Checkbox.svelte";
    import { translateCords } from './lib/toShape.svelte';
    import { localisationTexts } from "./lib/localisationTexts.svelte";
    import getHue from './lib/hueRule.svelte';

    /** @type {{'storage': import('./storage.svelte.js').Storage}} */
    let { storage = $bindable(null) } = $props(); 

    /** @type {HTMLInputElement} */
    let inputWidth = $state();
    /** @type {HTMLInputElement} */
    let inputHeight = $state();
    /** @type {HTMLInputElement} */
    let inputOuterPadding = $state();
    /** @type {HTMLInputElement} */
    let inputGridSize = $state();
    /** @type {HTMLInputElement} */
    let inputScale = $state();
    /** @type {HTMLInputElement} */
    let inputBgOpacity = $state();
    /** @type {HTMLInputElement} */
    let inputBgUnclippedOpacity = $state();

    /** @param {Number} pos */
    const handleClickAddPoint = (pos) => {
        if(pos <= 0) {
            let translatedPrev = translateCords(storage.points[storage.points.length - 1].pos, { xPositionType: 'percent', yPositionType: 'percent' });
            let translatedNext = translateCords(storage.points[0].pos, { xPositionType: 'percent', yPositionType: 'percent' });
            /** @type {{x: Number, y: Number, xPositionType: Creator.positionType, yPositionType: Creator.positionType }} */
            let position = { x: (translatedPrev.x + translatedNext.x) / 2, y: (translatedPrev.y + translatedNext.y) / 2, xPositionType: 'percent', yPositionType: 'percent' };
            storage.points.unshift({
                pos: position,
                with: position,
            });
        } else if(pos >= storage.points.length) {
            let translatedPrev = translateCords(storage.points[storage.points.length - 1].pos, { xPositionType: 'percent', yPositionType: 'percent' });
            let translatedNext = translateCords(storage.points[0].pos, { xPositionType: 'percent', yPositionType: 'percent' });
            /** @type {{x: Number, y: Number, xPositionType: Creator.positionType, yPositionType: Creator.positionType }} */
            let position = { x: (translatedPrev.x + translatedNext.x) / 2, y: (translatedPrev.y + translatedNext.y) / 2, xPositionType: 'percent', yPositionType: 'percent' };
            storage.points.push({
                pos: position,
                with: position,
            });
        } else {
            let translatedPrev = translateCords(storage.points[pos - 1].pos, { xPositionType: 'percent', yPositionType: 'percent' });
            let translatedNext = translateCords(storage.points[pos].pos, { xPositionType: 'percent', yPositionType: 'percent' });
            /** @type {{x: Number, y: Number, xPositionType: Creator.positionType, yPositionType: Creator.positionType }} */
            let position = { x: (translatedPrev.x + translatedNext.x) / 2, y: (translatedPrev.y + translatedNext.y) / 2, xPositionType: 'percent', yPositionType: 'percent' };
            storage.points = storage.points.slice(0, pos).concat([{
                pos: position,
                with: position,
            }]).concat(storage.points.slice(pos));
        }
    }

    onMount(() => {
        helpers.createNumericInput(inputWidth, (val) => {
            storage.settings.imgSize.width = Math.round(val);
            inputWidth.value = `${Math.round(val)}`;
        }, storage.settings.imgSize.width, false, 10);
        helpers.createNumericInput(inputHeight, (val) => {
            storage.settings.imgSize.height = Math.round(val);
            inputHeight.value = `${Math.round(val)}`;
        }, storage.settings.imgSize.height, false, 10);
        helpers.createNumericInput(inputOuterPadding, (val) => {
            storage.settings.outerPadding = Math.round(val);
            inputOuterPadding.value = `${Math.round(val)}`;
        }, storage.settings.outerPadding, false, 0);
        helpers.createNumericInput(inputGridSize, (val) => {
            storage.settings.gridSize = Math.round(val);
            inputGridSize.value = `${Math.round(val)}`;
        }, storage.settings.gridSize, false, 1);
        helpers.createNumericInput(inputScale, (val) => {
            storage.settings.scale = helpers.roundToFraction(val, 100);
            inputScale.value = `${helpers.roundToFraction(val, 100)}`;
        }, storage.settings.scale, true, 0.1);
        helpers.createNumericInput(inputBgOpacity, (val) => {
            storage.settings.bgOpacity = helpers.roundToFraction(val, 100);
            inputBgOpacity.value = `${helpers.roundToFraction(val, 100)}`;
        }, storage.settings.bgOpacity, true, 0, 1, 0.05);
        helpers.createNumericInput(inputBgUnclippedOpacity, (val) => {
            storage.settings.bgUnclippedOpacity = helpers.roundToFraction(val, 100);
            inputBgUnclippedOpacity.value = `${helpers.roundToFraction(val, 100)}`;
        }, storage.settings.bgUnclippedOpacity, true, 0, 1, 0.05);
    });
</script>

<section class="controlsContainer">
    <div class="controlSection baseControls">
        <p>{localisationTexts.controls.workspace}</p>
        <div class="innerContainer">
            <div class="entries">
                <div class="controlEntry double">
                    <p>{localisationTexts.controls.boxSize}</p>
                    <div class="controlBox titled">
                        <p>{localisationTexts.controls.width}:</p>
                        <input bind:this={inputWidth} type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
                    </div>
                    <div class="controlBox titled">
                        <p>{localisationTexts.controls.height}:</p>
                        <input bind:this={inputHeight} type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
                    </div>
                </div>
                <div class="controlEntry single">
                    <p>{localisationTexts.controls.externalSize}:</p>
                    <div class="controlBox">
                        <input bind:this={inputOuterPadding} type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
                    </div>
                </div>
                <div class="controlEntry double">
                    <p>{localisationTexts.controls.grid}</p>
                    <div class="controlBox titled">
                        <p>{localisationTexts.controls.gridSize}:</p>
                        <input bind:this={inputGridSize} type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
                    </div>
                    <div class="controlBox titled">
                        <p>{localisationTexts.controls.gridVisibility}:</p>
                        <Checkbox bind:selected={storage.settings.gridVisible}></Checkbox>
                    </div>
                </div>
                <div class="controlEntry single">
                    <p>{localisationTexts.controls.scale}:</p>
                    <div class="controlBox">
                        <input bind:this={inputScale} type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
                    </div>
                </div>
                <div class="controlEntry multi longInput">
                    <p>{localisationTexts.controls.bgSettings}</p>
                    <div class="controlBox titled longInput">
                        <p>{localisationTexts.controls.bg}:</p>
                        <input bind:value={storage.settings.bg} type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
                    </div>
                    <div class="controlBox titled">
                        <p>{localisationTexts.controls.bgOpacity}:</p>
                        <input bind:this={inputBgOpacity} type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
                    </div>
                    <div class="controlBox titled">
                        <p>{localisationTexts.controls.bgShowUnclipped}:</p>
                        <Checkbox bind:selected={storage.settings.bgShowUnclipped}></Checkbox>
                    </div>
                    <div class="controlBox titled">
                        <p>{localisationTexts.controls.bgUnclippedOpacity}:</p>
                        <input bind:this={inputBgUnclippedOpacity} type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="controlSection pointsControls">
        <p>{localisationTexts.controls.points}</p>
        <div class="innerContainer">
            <div class="entries">
                <button class="addBtn" onclick={() => { handleClickAddPoint(0) }}>+</button>
                {#each storage.points as point, index }
                    <ControlPoint bind:storage={storage} id={index} hue='{getHue(storage.points.length, index)}deg'></ControlPoint>
                    <button class="addBtn" onclick={() => { handleClickAddPoint(index+1) }}>+</button>
                {/each}
            </div>
        </div>
    </div>
</section>