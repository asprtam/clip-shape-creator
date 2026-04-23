<script>
    import CanvasPoint from "./CanvasPoint.svelte";
    /** @type {HTMLElement} */
    let canvasContainer = $state();
    /** @type {HTMLElement} */
    let container = $state();

    /** @type {{clipPath: String, isDragging: Boolean, 'storage': import('./storage.svelte.js').Storage, btnPress: { shift: Boolean, ctrl: Boolean, alt: Boolean } }}*/
    let { clipPath, isDragging = $bindable(false), storage = $bindable(null), btnPress } = $props();

    let lastXLineTop = $derived.by(() => {
        return storage.settings.outerPadding + (Math.floor(storage.settings.imgSize.height / storage.settings.gridSize) * storage.settings.gridSize);
    });
    let lastYLineLeft = $derived.by(() => {
        return storage.settings.outerPadding + (Math.floor(storage.settings.imgSize.width / storage.settings.gridSize) * storage.settings.gridSize);
    });

</script>

<section class="canvasContainer{isDragging ? ' dragging' : ''}">
    <section class="container" style="width: {storage.canvasSize.width}px; height: {storage.canvasSize.height}px; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%) scale({storage.settings.scale}); --scale: {storage.settings.scale};">
        {#if storage.settings.bgShowUnclipped}
            <div class="viewImage unclipped" style="width: {storage.settings.imgSize.width}px; height: {storage.settings.imgSize.height}px; position: absolute; left: {storage.settings.outerPadding}px; top: {storage.settings.outerPadding}px; --bg: {storage.settings.bg}; --opacity: {storage.settings.bgUnclippedOpacity};"></div>
        {/if}
        <div class="viewImage clipped{!storage.settings.bgShowUnclipped ? ' noUnclipped' : ''}" style="width: {storage.settings.imgSize.width}px; height: {storage.settings.imgSize.height}px; position: absolute; left: {storage.settings.outerPadding}px; top: {storage.settings.outerPadding}px; --bg: {storage.settings.bg}; --clipShape: {clipPath}; --opacity: {storage.settings.bgOpacity};"></div>
        {#if storage.settings.gridVisible}
            <div class="gridLines">
                <div class="outer">
                    {#each {length: Math.floor(storage.settings.outerPadding/storage.settings.gridSize)}, index}
                        <div class="gridLine x" style="top: {storage.settings.gridSize * index}px;"></div>
                        <div class="gridLine x" style="top: {lastXLineTop + (storage.settings.gridSize * (index+1))}px;"></div>
                        <div class="gridLine y" style="left: {storage.settings.gridSize * index}px;"></div>
                        <div class="gridLine y" style="left: {lastYLineLeft + (storage.settings.gridSize * (index+1))}px;"></div>
                    {/each}
                </div>
                <div class="inner">
                    {#each {length: Math.floor(storage.settings.imgSize.height/storage.settings.gridSize) + 1}, index}
                        <div class="gridLine x" style="top: {storage.settings.outerPadding + (storage.settings.gridSize * index)}px;"></div>
                    {/each}
                    {#each {length: Math.floor(storage.settings.imgSize.width/storage.settings.gridSize) + 1}, index}
                        <div class="gridLine y" style="left: {storage.settings.outerPadding + (storage.settings.gridSize * index)}px;"></div>
                    {/each}
                </div>
            </div>
        {/if}
        <div class="points" style="width: {storage.settings.imgSize.width}px; height: {storage.settings.imgSize.height}px; position: absolute; left: {storage.settings.outerPadding}px; top: {storage.settings.outerPadding}px;">
            {#if storage.points.length > 1}
                <CanvasPoint btnPress={btnPress} storage={storage} bind:isDragging={isDragging} id={0} prevId={storage.points.length - 1} nextId={1} type='point'></CanvasPoint>
                <CanvasPoint btnPress={btnPress} storage={storage} bind:isDragging={isDragging} id={0} prevId={storage.points.length - 1} nextId={1} type='with'></CanvasPoint>
                <CanvasPoint btnPress={btnPress} storage={storage} bind:isDragging={isDragging} id={storage.points.length - 1} prevId={storage.points.length - 2} nextId={0} type='point'></CanvasPoint>
                <CanvasPoint btnPress={btnPress} storage={storage} bind:isDragging={isDragging} id={storage.points.length - 1} prevId={storage.points.length - 2} nextId={0} type='with'></CanvasPoint>
            {/if}
            {#each { length: storage.points.length - 2 }, index }
                <CanvasPoint btnPress={btnPress} storage={storage} bind:isDragging={isDragging} id={index + 1} prevId={index} nextId={index + 2} type='point'></CanvasPoint>
                <CanvasPoint btnPress={btnPress} storage={storage} bind:isDragging={isDragging} id={index + 1} prevId={index} nextId={index + 2} type='with'></CanvasPoint>
            {/each}
        </div>
    </section>
</section>