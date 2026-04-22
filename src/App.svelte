<script>
  import Canvas from "./Canvas.svelte";
  import Controls from "./Controls.svelte";
  import Output from "./Output.svelte";
  import { Storage, defaultSettings } from './storage.svelte';
  import pointsToShape from "./lib/toShape.svelte";
  import { onMount } from "svelte";
  import Footer from "./Footer.svelte";
  import { CookieManger } from "./lib/cookie.svelte";
  import CookieBanner from "./CookieBanner.svelte";

  let isShiftPressed = $state(false);
  let isDragging = $state(false);
  let cookieManager = $state(new CookieManger());
  let storage = new Storage(defaultSettings, cookieManager);

  let currentClipPath = $derived.by(() => {
    return pointsToShape(storage.points);
  });

  onMount(() => {
    console.log(cookieManager);
    document.body.addEventListener('keydown', (e) => {
      if(e.shiftKey) {
        if(!isShiftPressed) {
          isShiftPressed = true;
        }
      } else {
        if(isShiftPressed) {
          isShiftPressed = false;
        }
      }
    });
    document.body.addEventListener('keyup', (e) => {
      if(e.shiftKey) {
        if(!isShiftPressed) {
          isShiftPressed = true;
        }
      } else {
        if(isShiftPressed) {
          isShiftPressed = false;
        }
      }
    });
  });

  $effect(() => {
    $inspect(cookieManager);
  });
</script>

<main class="{isDragging ? 'dragging' : ''}">
  <Controls storage={storage}></Controls>
  <Output points={storage.points}></Output>
  <Canvas storage={storage} bind:isDragging={isDragging} isShiftPressed={isShiftPressed} clipPath={currentClipPath}></Canvas>
  <Footer></Footer>
  {#if cookieManager.accepted == null}
      <CookieBanner bind:cookiesAccpeted={cookieManager.accepted}></CookieBanner>
  {/if}
</main>
