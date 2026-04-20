<script>
    /** @type {{selected: Boolean}} */
    let { selected = $bindable(false) } = $props();
</script>

<div class="checkboxContainer{selected ? ' selected' : ''}">
    <input type="checkbox" bind:checked={selected}>
    <div class="checkboxFace{selected ? ' selected' : ''}"></div>
</div>