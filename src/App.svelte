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
  import Hints from "./Hints.svelte";

  let btnPress = $state({
    shift: false,
    ctrl: false,
    alt: false
  });

  let isDragging = $state(false);
  let cookieManager = $state(new CookieManger());
  let storage = $state(new Storage(defaultSettings, cookieManager));

  let currentClipPath = $derived.by(() => {
    return pointsToShape(storage.points, storage.settings.imgSize);
  });

  const bannerTimeout = () => {
    return new Promise((res) => {
      setTimeout(() => {
        res(true);
      }, 200);
    });
  }

  onMount(() => {
    document.body.addEventListener('keydown', (e) => {
      if(e.shiftKey) {
        if(!btnPress.shift) {
          btnPress.shift = true;
        }
      } else {
        if(btnPress.shift) {
          btnPress.shift = false;
        }
      }
      if(e.ctrlKey || e.metaKey) {
        if(!btnPress.ctrl) {
          btnPress.ctrl = true;
        }
      } else {
        if(btnPress.ctrl) {
          btnPress.ctrl = false;
        }
      }
      if(e.altKey) {
        if(!btnPress.alt) {
          btnPress.alt = true;
        }
      } else {
        if(btnPress.alt) {
          btnPress.alt = false;
        }
      }
    });
    document.body.addEventListener('keyup', (e) => {
      if(e.shiftKey) {
        if(!btnPress.shift) {
          btnPress.shift = true;
        }
      } else {
        if(btnPress.shift) {
          btnPress.shift = false;
        }
      }
      if(e.ctrlKey || e.metaKey) {
        if(!btnPress.ctrl) {
          btnPress.ctrl = true;
        }
      } else {
        if(btnPress.ctrl) {
          btnPress.ctrl = false;
        }
      }
      if(e.altKey) {
        if(!btnPress.alt) {
          btnPress.alt = true;
        }
      } else {
        if(btnPress.alt) {
          btnPress.alt = false;
        }
      }
    });
  });
</script>

<main class="{isDragging ? 'dragging' : ''}{btnPress.ctrl ? ' controlPressed' : ''}">
  <Controls bind:storage={storage}></Controls>
  <Output imgSize={storage.settings.imgSize} points={storage.points}></Output>
  <Canvas btnPress={btnPress} bind:storage={storage} bind:isDragging={isDragging} clipPath={currentClipPath}></Canvas>
  <Footer></Footer>
  <!-- svelte-ignore block_empty -->
  {#await bannerTimeout()}
  {:then done} 
      {#if cookieManager.accepted == null}
        <CookieBanner bind:cookiesAccpeted={cookieManager.accepted}></CookieBanner>
    {/if}
  {/await}
  <Hints bind:closed={storage.settings.hintsClosed}></Hints>
</main>
