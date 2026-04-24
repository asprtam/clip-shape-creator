<script>
    /** @typedef {typeof import('./lib/localisationTexts.svelte.js').localisationEN} locType */
    import { parseLocalisationText, localisationsFlags } from "./lib/localisationTexts.svelte";
    //@ts-ignore
    import { Creator } from "./types.js";
    import Hints from "./Hints.svelte";
    import Dropdown from "./lib/Dropdown.svelte";
    /** @type {{ settings: Creator.settings, localisationTexts: locType }} */
    let { settings = $bindable(), localisationTexts } = $props();

    /**
     * @type {{[K in ('en')|(keyof typeof import('./lib/localisationTexts.svelte.js').otherLocalisations)]: { classList?: Array<String>, css?: String, text?: String }}}
     */
    let dropdownOptions = $derived.by(() => {
        /**
         * @type {{[K in ('en')|(keyof typeof import('./lib/localisationTexts.svelte.js').otherLocalisations)]: { classList?: Array<String>, css?: String, text?: String }}}
         */ //@ts-ignore
        let options = {};
        Object.keys(localisationsFlags).forEach((set) => {
            options[set] = { text: localisationsFlags[set].name, css: `--bg: ${localisationsFlags[set].flag};`, classList: [`flag-${set}`] };
        });
        return options;
    });
     
</script>

<section class="topBar">
    <button class="showHintsBtn" id="showHints" onclick={() => { settings.hintsClosed = false; }}>{localisationTexts.hints.show}</button>
    <Dropdown classList={['langMenu']} options={dropdownOptions} id='langMenu' bind:value={settings.lang} defaultValue={settings.lang}></Dropdown>
</section>
<Hints localisationTexts={localisationTexts} bind:closed={settings.hintsClosed}></Hints>