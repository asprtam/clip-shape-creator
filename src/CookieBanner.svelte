<script>
    import { onMount } from 'svelte';
    /** @type {{cookiesAccpeted: 'accepted'|'declined'|null }} */
    let { cookiesAccpeted = $bindable(null) } = $props();
    import { cubicInOut } from 'svelte/easing';

    /**
     * 
     * @param {HTMLElement} node
     * @param {{delay?: Number, duration?: Number, easing?: (t:Number) => Number }} params
     */
    const slideBanner = (node, { delay = 0, duration = 200, easing = cubicInOut }) => {
        const finalHeight = node.offsetHeight;
        return {
            delay: delay || 0,
            duration: duration || 200,
            easing: easing || cubicInOut,
            /**
             * @param {Number} t
             * @param {Number} u
             */
            css: (t, u) => {
                return `overflow: hidden; height: ${finalHeight * t}px;`;
            }
        }
    }
    /** @type {HTMLElement} */
    let btnAccept = $state();
    /** @type {HTMLElement} */
    let btnDecline = $state();

    onMount(() => {
        if(btnAccept) {
            btnAccept.addEventListener('click', () => {
                cookiesAccpeted = 'accepted';
            });
        }
        if(btnDecline) {
            btnDecline.addEventListener('click', () => {
                cookiesAccpeted = 'declined';
            });
        }
    });
</script>

<section in:slideBanner={{}} out:slideBanner={{}} class="cookieBanner">
    <div class="innerContent">
        <p>We use cookies to save your editor settings <span class="bracket">(</span><span class="misc">e.g. background, grid, size</span><span class="bracket">)</span>. No tracking or personal data is collected.</p>
        <div class="btnsRow">
            <button id="acceptCookie" bind:this={btnAccept} class="accept">Accept</button>
            <button id="declineCookie" bind:this={btnDecline}  class="decline">Decline</button>
        </div>
    </div>
</section>