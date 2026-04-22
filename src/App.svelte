<script>
  import Canvas from "./Canvas.svelte";
  import Controls from "./Controls.svelte";
  import Output from "./Output.svelte";
  import storage from './storage.svelte';
  import pointsToShape from "./lib/toShape.svelte";
  import { onMount } from "svelte";
  import Footer from "./Footer.svelte";

  let isShiftPressed = $state(false);
  let isDragging = $state(false);

  let currentClipPath = $derived.by(() => {
    return pointsToShape(storage.points);
  });

  onMount(() => {
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
</script>

<main class="{isDragging ? 'dragging' : ''}">
  <Controls></Controls>
  <Output points={storage.points}></Output>
  <Canvas bind:isDragging={isDragging} isShiftPressed={isShiftPressed} clipPath={currentClipPath}></Canvas>
  <Footer></Footer>
</main>
