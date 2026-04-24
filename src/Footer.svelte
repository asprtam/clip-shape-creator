<script>
    /** @typedef {typeof import('./lib/localisationTexts.svelte.js').localisationEN} locType */
    import { parseLocalisationText } from "./lib/localisationTexts.svelte";

    /** @type {{localisationTexts: locType}}*/
    let { localisationTexts } = $props();

    let parsedFontText = $derived.by(() => {
        return parseLocalisationText(localisationTexts.footer.fontTakenFrom, {'name': 'Menlo'});
    });
</script>
<footer class="footer">
    <p>{localisationTexts.footer.checkTheRepo} <a href="https://github.com/asprtam/clip-shape-creator">https://github.com/asprtam/clip-shape-creator</a></p>
    <p>{localisationTexts.footer.inspiredBy} <a href="https://bennettfeely.com/clippy/">https://bennettfeely.com/clippy/</a></p>
    <p>{parsedFontText} <a href="http://www.onlinewebfonts.com/fonts">Web Fonts</a> {localisationTexts.footer.isLicensed}</p>
</footer>