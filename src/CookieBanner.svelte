<script>
    import { localisationTexts } from "./lib/localisationTexts.svelte";
    import { onMount } from 'svelte';
    /** @type {{cookiesAccpeted: 'accepted'|'declined'|null }} */
    let { cookiesAccpeted = $bindable(null) } = $props();
    import { slideBanner } from './lib/customAnimations';
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
        <p>{localisationTexts.cookieBanner.weUse} <span class="bracket">(</span><span class="misc">{localisationTexts.cookieBanner.misc}</span><span class="bracket">)</span>. {localisationTexts.cookieBanner.noTrack}</p>
        <div class="btnsRow">
            <button id="acceptCookie" bind:this={btnAccept} class="accept">{localisationTexts.cookieBanner.accept}</button>
            <button id="declineCookie" bind:this={btnDecline}  class="decline">{localisationTexts.cookieBanner.decline}</button>
        </div>
    </div>
</section>