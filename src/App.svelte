<script>
  import Canvas from "./Canvas.svelte";
  import Controls from "./Controls.svelte";
  import storage from './storage.svelte';
  import pointsToShape from "./lib/toShape.svelte";
  import { onMount } from "svelte";

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
  <Canvas bind:isDragging={isDragging} isShiftPressed={isShiftPressed} clipPath={currentClipPath}></Canvas>
</main>
