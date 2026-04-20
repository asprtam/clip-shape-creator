<script>
    import { storage, derivedStorage } from './storage.svelte';
    import CanvasPoint from "./CanvasPoint.svelte";
    /** @type {HTMLElement} */
    let canvasContainer = $state();
    /** @type {HTMLElement} */
    let container = $state();

    /** @type {{clipPath: String, isDragging: Boolean, isShiftPressed: Boolean}}*/
    let { clipPath, isDragging = $bindable(false), isShiftPressed } = $props();

    let lastXLineTop = $derived.by(() => {
        return storage.outerPadding + (Math.floor(storage.imgSize.height / storage.gridSize) * storage.gridSize);
    });
    let lastYLineLeft = $derived.by(() => {
        return storage.outerPadding + (Math.floor(storage.imgSize.width / storage.gridSize) * storage.gridSize);
    });

</script>

<section class="canvasContainer{isDragging ? ' dragging' : ''}">
    <section class="container" style="width: {derivedStorage.canvasSize.width}px; height: {derivedStorage.canvasSize.height}px; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%) scale({storage.scale}); --scale: {storage.scale};">
        <div class="viewImage unclipped" style="width: {storage.imgSize.width}px; height: {storage.imgSize.height}px; position: absolute; left: {storage.outerPadding}px; top: {storage.outerPadding}px; --bg: {storage.bg};"></div>
        <div class="viewImage clipped" style="width: {storage.imgSize.width}px; height: {storage.imgSize.height}px; position: absolute; left: {storage.outerPadding}px; top: {storage.outerPadding}px; --bg: {storage.bg}; --clipShape: {clipPath};"></div>
        {#if storage.gridVisible}
            <div class="gridLines">
                <div class="outer">
                    {#each {length: Math.floor(storage.outerPadding/storage.gridSize)}, index}
                        <div class="gridLine x" style="top: {storage.gridSize * index}px;"></div>
                        <div class="gridLine x" style="top: {lastXLineTop + (storage.gridSize * (index+1))}px;"></div>
                        <div class="gridLine y" style="left: {storage.gridSize * index}px;"></div>
                        <div class="gridLine y" style="left: {lastYLineLeft + (storage.gridSize * (index+1))}px;"></div>
                    {/each}
                </div>
                <div class="inner">
                    {#each {length: Math.floor(storage.imgSize.height/storage.gridSize) + 1}, index}
                        <div class="gridLine x" style="top: {storage.outerPadding + (storage.gridSize * index)}px;"></div>
                    {/each}
                    {#each {length: Math.floor(storage.imgSize.width/storage.gridSize) + 1}, index}
                        <div class="gridLine y" style="left: {storage.outerPadding + (storage.gridSize * index)}px;"></div>
                    {/each}
                </div>
            </div>
        {/if}
        <div class="points" style="width: {storage.imgSize.width}px; height: {storage.imgSize.height}px; position: absolute; left: {storage.outerPadding}px; top: {storage.outerPadding}px;">
            {#each storage.points as point, index }
                <CanvasPoint bind:isDragging={isDragging} isShiftPressed={isShiftPressed} id={index} type='point'></CanvasPoint>
                <CanvasPoint bind:isDragging={isDragging} isShiftPressed={isShiftPressed} id={index} type='with'></CanvasPoint>
            {/each}
        </div>
    </section>
</section>