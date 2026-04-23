<script>
    import { localisationTexts, parseLocalisationText } from "./lib/localisationTexts.svelte";
    /** @type {{closed: Boolean}} */
    let { closed = $bindable(false) } = $props();
    import { slideBannerWithOpacity } from './lib/customAnimations';
    let isMac = $derived.by(() => {
        return /Mac/gmi.test(window.navigator.userAgent.slice(window.navigator.userAgent.indexOf('(') + 1, window.navigator.userAgent.indexOf(')')));
    });

    let parsedToAddpoints = $derived.by(() => {
        return parseLocalisationText(localisationTexts.hints.toAddPoint, {line: localisationTexts.hints.line, 'points': localisationTexts.hints.points, 'point': localisationTexts.hints.point, points2: localisationTexts.hints.points2});
    });
</script>

{#if closed}
    <button class="showHintsBtn" id="showHints" onclick={() => { closed = false; }}>{localisationTexts.hints.show}</button>
{:else}
    <section class="hintsContainer" in:slideBannerWithOpacity={{}} out:slideBannerWithOpacity={{}}>
        <div class="innerContainer">
            <h3>{localisationTexts.hints.hints} </h3>
            <div class="hints">
                <div class="hintEntry">
                    <p class="hint"><span class="hintTitle">{localisationTexts.hints.hold}</span> <span class="btnName"><span class="btnTextName">Shift</span> <span class="btnIcon">&#8679;</span></span> <span>{localisationTexts.hints.dragHint}</span></p>
                </div>
                {#if isMac}
                    <div class="hintEntry">
                        <p class="hint"><span class="hintTitle">{localisationTexts.hints.hold}</span> <span class="btnName"><span class="btnTextName">Command</span> <span class="btnIcon">&#8984;</span></span> <span>{localisationTexts.hints.extractHint}</span></p>
                    </div>
                    <div class="hintEntry">
                        <p class="hint"><span class="hintTitle">{localisationTexts.hints.byDefault}</span><span>{localisationTexts.hints.whenDraggingPathPoint}</span> <span class="bracket">(</span><span class="misc">{localisationTexts.hints.notCurveControlPoint}</span><span class="bracket">)</span> <span>{localisationTexts.hints.andTheLineIsNotCurved}</span><br/><span class="technical">{localisationTexts.hints.inTechnicalTerms}: {localisationTexts.hints.dragAnyAdjacent}</span> <span class="technical bracket">(</span><span class="technical misc">{localisationTexts.hints.adjacentExplanation}</span><span class="technical bracket">)</span> <span class="technical">{localisationTexts.hints.curveControlPointsUnderneath}</span><br/><span class="hintTitle">{localisationTexts.hints.hold}</span> <span class="btnName"><span class="btnTextName">Option</span> <span class="btnIcon">&#8997;</span></span> <span>{localisationTexts.hints.dragOnlyDesired}</span></p>
                    </div>
                    <div class="hintEntry wip">
                        <p class="hint"><span class="hintTitle">{localisationTexts.hints.workInProgress}</span> <span>{localisationTexts.hints.click}</span> <span class="btnName"><span class="btnTextName">Option</span> <span class="btnIcon">&#8997;</span></span> <span>{parsedToAddpoints}</span></p>
                    </div>
                    <div class="hintEntry wip">
                        <p class="hint"><span class="hintTitle">{localisationTexts.hints.workInProgress}</span> <span>{localisationTexts.hints.click}</span> <span class="btnName"><span class="btnTextName">Command</span> <span class="btnIcon">&#8984;</span></span> + <span class="btnName"><span class="btnTextName">Z</span></span> <span>{localisationTexts.hints.toUndo}</span></p>
                    </div>
                {:else}
                    <div class="hintEntry">
                        <p class="hint"><span class="hintTitle">{localisationTexts.hints.hold}</span> <span class="btnName"><span class="btnTextName">Control</span> <span class="btnIcon">&#8963;</span></span> <span>{localisationTexts.hints.extractHint}</span></p>
                    </div>
                    <div class="hintEntry">
                        <p class="hint"><span class="hintTitle">{localisationTexts.hints.byDefault}</span><span>{localisationTexts.hints.whenDraggingPathPoint}</span> <span class="technical bracket">(</span><span class="misc">{localisationTexts.hints.notCurveControlPoint}</span><span class="bracket">)</span> <span>{localisationTexts.hints.andTheLineIsNotCurved}</span><br/><span class="technical">{localisationTexts.hints.inTechnicalTerms}: {localisationTexts.hints.dragAnyAdjacent}</span> <span class="bracket">(</span><span class="technical misc">{localisationTexts.hints.adjacentExplanation}</span><span class="technical bracket">)</span> <span class="technical">{localisationTexts.hints.curveControlPointsUnderneath}</span><br/><span class="hintTitle">{localisationTexts.hints.hold}</span> <span class="btnName"><span class="btnTextName">Alt</span> <span class="btnIcon">&#9095;</span></span> <span>{localisationTexts.hints.dragOnlyDesired}</span></p>
                    </div>
                    <div class="hintEntry wip">
                        <p class="hint"><span class="hintTitle">{localisationTexts.hints.workInProgress}</span> <span>{localisationTexts.hints.click}</span> <span class="btnName"><span class="btnTextName">Alt</span> <span class="btnIcon">&#9095;</span></span> <span>{parsedToAddpoints}</span></p>
                    </div>
                    <div class="hintEntry wip">
                        <p class="hint"><span class="hintTitle">{localisationTexts.hints.workInProgress}</span> <span>{localisationTexts.hints.click}</span> <span class="btnName"><span class="btnTextName">Control</span> <span class="btnIcon">&#8963;</span></span> + <span class="btnName"><span class="btnTextName">Z</span></span> <span>{localisationTexts.hints.toUndo}</span></p>
                    </div>
                {/if}
            </div>
            <button id="closeHints" class="closeHints" onclick={() => { closed = true; }}>{localisationTexts.hints.close}</button>
        </div>
    </section>
{/if}