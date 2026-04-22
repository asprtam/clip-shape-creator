<script>
    import { onMount } from 'svelte';
    import helpers from './lib/helpers.svelte';
    import Storage from './storage.svelte';
    import ControlPoint from "./ControlPoint.svelte";
    import Checkbox from "./lib/Checkbox.svelte";

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

    /** @param {Number} pos */
    const handleClickAddPoint = (pos) => {
        if(pos <= 0) {
            storage.points.unshift({
                xPositionType: 'percent',
                yPositionType: 'percent',
                pos: { x: 50, y: 50 },
                with: { x: 50, y: 50 },
            });
        } else if(pos >= storage.points.length) {
            storage.points.push({
                xPositionType: 'percent',
                yPositionType: 'percent',
                pos: { x: 50, y: 50 },
                with: { x: 50, y: 50 },
            });
        } else {
            storage.points = storage.points.slice(0, pos).concat([{
                xPositionType: 'percent',
                yPositionType: 'percent',
                pos: { x: 50, y: 50 },
                with: { x: 50, y: 50 },
            }]).concat(storage.points.slice(pos));
        }
    }

    onMount(() => {
        helpers.createNumericInput(inputWidth, (val) => {
            storage.settings.imgSize.width = val;
        }, storage.settings.imgSize.width, false, 10);
        helpers.createNumericInput(inputHeight, (val) => {
            storage.settings.imgSize.height = val;
        }, storage.settings.imgSize.height, false, 10);
        helpers.createNumericInput(inputOuterPadding, (val) => {
            storage.settings.outerPadding = val;
        }, storage.settings.outerPadding, false, 0);
        helpers.createNumericInput(inputGridSize, (val) => {
            storage.settings.gridSize = val;
        }, storage.settings.gridSize, false, 1);
        helpers.createNumericInput(inputScale, (val) => {
            storage.settings.scale = val;
        }, storage.settings.scale, true, 0.1);
    });
</script>

<section class="controlsContainer">
    <div class="controlSection baseControls">
        <p>Workspace</p>
        <div class="innerContainer">
            <div class="entries">
                <div class="controlEntry double">
                    <p>Box size</p>
                    <div class="controlBox titled">
                        <p>Width:</p>
                        <input bind:this={inputWidth} type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
                    </div>
                    <div class="controlBox titled">
                        <p>Height:</p>
                        <input bind:this={inputHeight} type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
                    </div>
                </div>
                <div class="controlEntry single">
                    <p>External work area size:</p>
                    <div class="controlBox">
                        <input bind:this={inputOuterPadding} type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
                    </div>
                </div>
                <div class="controlEntry double">
                    <p>Grid</p>
                    <div class="controlBox titled">
                        <p>Grid size:</p>
                        <input bind:this={inputGridSize} type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
                    </div>
                    <div class="controlBox titled">
                        <p>Grid visiblity:</p>
                        <Checkbox bind:selected={storage.settings.gridVisible}></Checkbox>
                    </div>
                    <p class="hint"><span class="hintTitle">Hint:</span> <span>hold</span> <span class="btnName"><span class="btnTextName">Shift</span> <span class="btnIcon">&#8679;</span></span> <span>while dragging to make points snap to grid.</span></p>
                </div>
                <div class="controlEntry single">
                    <p>Scale:</p>
                    <div class="controlBox">
                        <input bind:this={inputScale} type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
                    </div>
                </div>
                <div class="controlEntry single longInput">
                    <p>Background:</p>
                    <div class="controlBox">
                        <input bind:value={storage.settings.bg} type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="controlSection pointsControls">
        <p>Points</p>
        <div class="innerContainer">
            <div class="entries">
                <button class="addBtn" onclick={() => { handleClickAddPoint(0) }}>+</button>
                {#each storage.points as point, index }
                    <ControlPoint bind:storage={storage} id={index} hue='{Math.round(360/storage.points.length) * index}deg'></ControlPoint>
                    <button class="addBtn" onclick={() => { handleClickAddPoint(index+1) }}>+</button>
                {/each}
            </div>
        </div>
    </div>
</section>