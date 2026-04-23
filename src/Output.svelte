<script>
    //@ts-ignore
    import { Creator } from "./types.js";
    import { getPointCords } from "./lib/toShape.svelte.js";
    import getHue from "./lib/hueRule.svelte.js";
    /** @type {{points: Array<Creator.point<Creator.positionType, Creator.positionType>>, imgSize: {width: Number, height: Number}}} */
    let { points, imgSize } = $props();
    
    let stylizedPath = $derived.by(() => {
        if(points.length > 1) {
            let huePart = Math.round(360/points.length);
            let path = `<span class="shape">shape</span><span class="bracket">(</span><span class="command from" style="--hue: ${getHue(points.length, points.length - 1)}deg;">from</span> `;
            path += getPointCords(points[points.length - 1], imgSize, true, '', ' ', undefined, '', `<span class="number" style="--hue: ${getHue(points.length, points.length - 1)}deg;">`, '</span>');
            path += ', ';
            path += getPointCords(
                points[0],
                imgSize,
                false,
                `<span class="command line" style="--hue: ${getHue(points.length, 0)}deg;">line to</span> `,
                ' ',
                points[points.length - 1],
                `<span class="command curve" style="--hue: ${getHue(points.length, 0)}deg;">curve to</span> `,
                `<span class="number" style="--hue: ${getHue(points.length, 0)}deg;">`,
                '</span>',
                `<span class="command with" style="--hue: ${getHue(points.length, 0)}deg;">with</span>`
            );
            path += ', ';
            for(let i = 1; i < points.length; i++) {
                let currentHue = getHue(points.length, i);
                path += getPointCords(
                    points[i],
                    imgSize,
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