<script>
    //@ts-ignore
    import { Creator } from "./types.js";
    import { getPointCords } from "./lib/toShape.svelte.js";
    /** @type {{points: Array<Creator.point<Creator.positionType, Creator.positionType>>}} */
    let { points } = $props();
    
    let stylizedPath = $derived.by(() => {
        if(points.length > 1) {
            let huePart = Math.round(360/points.length);
            let path = `<span class="shape">shape</span><span class="bracket">(</span><span class="command from" style="--hue: ${(points.length - 1) * huePart}deg;">from</span> `;
            path += getPointCords(points[points.length - 1], true, '', ' ', undefined, '', `<span class="number" style="--hue: ${(points.length - 1) * huePart}deg;">`, '</span>');
            path += ', ';
            path += getPointCords(
                points[0],
                false,
                `<span class="command line" style="--hue: 0deg;">line to</span> `,
                ' ',
                points[points.length - 1],
                `<span class="command curve" style="--hue: 0deg;">curve to</span> `,
                `<span class="number" style="--hue: 0deg;">`,
                '</span>',
                `<span class="command with" style="--hue: 0deg;">with</span>`
            );
            path += ', ';
            for(let i = 1; i < points.length; i++) {
                let currentHue = huePart * i;
                path += getPointCords(
                    points[i],
                    false,
                    `<span class="command line" style="--hue: ${currentHue}deg;">line to</span> `,
                    ' ',
                    points[i - 1],
                    `<span class="command curve" style="--hue: ${currentHue}deg;">curve to</span> `,
                    `<span class="number" style="--hue: ${currentHue}deg;">`,
                    '</span>',
                    `<span class="command with" style="--hue: ${currentHue}deg;">with</span>`
                );
                path += ', ';
            }
            return `${path} <span class="command close">close</span><span class="bracket">)</span>`;
        } else {
            return `<span class="error">Not enough points - minimum 2 points are required</span>`
        }
    });
</script>

<section class="outputsContainer">
    <div class="outputTextContainer">
        <p class="outputText"><span class="propName">clip-path:</span> <span class="stylizedPath" contenteditable="false" bind:innerHTML={stylizedPath}></span><span class="end">;</span></p>
    </div>
</section>