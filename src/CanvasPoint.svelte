<script>
    import { onMount } from 'svelte';
    import { getPointCords } from "./lib/toShape.svelte";
    import helpers from './lib/helpers.svelte';
    import { storage, derivedStorage } from './storage.svelte';
    /** @type {{id: Number, isDragging: Boolean, type: 'point'|'with', isShiftPressed: Boolean}} */
    let { id, isDragging = $bindable(false), type, isShiftPressed } = $props();
    let isThisDragging = $state(false);
    let hasEvent = { mousedown: false, mouseup: false, mousemove: false };
    /** @type {HTMLElement} */
    let element = $state();
    let prevClientPos = { x: 0, y: 0 };
    // svelte-ignore state_referenced_locally
    let draggingStartPos = $state(storage.points[id].pos);

    let realPositon = $derived.by(() => {
        let obj = { left: 0, top: 0 };
        if(storage.points[id]) {
            let check = storage.points[id].pos;
            if(type == 'with') {
                check = storage.points[id].with;
            }
            switch(storage.points[id].xPositionType) {
                case 'percent': {
                    obj.left = storage.imgSize.width * (check.x / 100);
                    break;
                }
                case 'middle': {
                    obj.left = (storage.imgSize.width/2) + check.x;
                    break;
                }
                case 'start': {
                    obj.left = check.x;
                    break;
                }
                case 'end': {
                    obj.left = storage.imgSize.width + check.x;
                    break;
                }
            }
            switch(storage.points[id].yPositionType) {
                case 'percent': {
                    obj.top = storage.imgSize.height * (check.y / 100);
                    break;
                }
                case 'middle': {
                    obj.top = (storage.imgSize.height/2) + check.y;
                    break;
                }
                case 'start': {
                    obj.top = check.y;
                    break;
                }
                case 'end': {
                    obj.top = storage.imgSize.height + check.y;
                    break;
                }
            }
        }
        return obj;
    });

    let tooltipCords = $derived.by(() => {
        let obj = { x: '', y: '' };
        if(type == 'point') {
            let strPos = getPointCords(storage.points[id], true, '', '|');
            if(strPos.split('|').length > 1) {
                obj.x = strPos.split('|')[0];
                obj.y = strPos.split('|')[1];
            }
        } else {
            let point = JSON.parse(JSON.stringify(storage.points[id]));
            point.pos = point.with;
            let strPos = getPointCords(point, true, '', '|');
            if(strPos.split('|').length > 1) {
                obj.x = strPos.split('|')[0];
                obj.y = strPos.split('|')[1];
            }
        }
        return obj;
    });

    /**
     * @param {MouseEvent} e
     */
    const handleMousedown = (e) => {
        if(!isDragging) {
            isThisDragging = true;
            isDragging = true;
            if(type == 'point') {
                draggingStartPos = storage.points[id].pos;
            } else {
                draggingStartPos = storage.points[id].with;
            }
            prevClientPos = { x: e.clientX, y: e.clientY };
            switchEvents();
        }
    }

    /**
     * @param {MouseEvent} e
     */
    const handleMouseup = (e) => {
        isThisDragging = false;
        isDragging = false;
        prevClientPos = { x: 0, y: 0 };
        setupEvents();
    }

    /**
     * @param {MouseEvent} e
     */
    const handleMousemove = (e) => {
        let diffX = helpers.roundToFraction((e.clientX - prevClientPos.x)/storage.scale);
        switch(storage.points[id].xPositionType) {
            case 'percent': {
                diffX = helpers.roundToFraction((diffX/storage.imgSize.width)*100);
                break;
            }
        }
        let diffY = helpers.roundToFraction((e.clientY - prevClientPos.y)/storage.scale);
        switch(storage.points[id].yPositionType) {
            case 'percent': {
                diffY = helpers.roundToFraction((diffY/storage.imgSize.height)*100);
                break;
            }
        }
        if(type == 'point') {
            if(isShiftPressed) {
                storage.points[id].pos = { x: helpers.roundToMultiplicity(draggingStartPos.x + diffX, storage.gridSize), y: helpers.roundToMultiplicity(draggingStartPos.y + diffY, storage.gridSize) };
            } else {
                storage.points[id].pos = { x: draggingStartPos.x + diffX, y: draggingStartPos.y + diffY }
            }
        } else {
            if(isShiftPressed) {
                storage.points[id].with = { x: helpers.roundToMultiplicity(draggingStartPos.x + diffX, storage.gridSize), y: helpers.roundToMultiplicity(draggingStartPos.y + diffY, storage.gridSize) };
            } else {
                storage.points[id].with = { x: draggingStartPos.x + diffX, y: draggingStartPos.y + diffY }
            }
        }
    }

    const setupEvents = () => { 
        if(hasEvent.mouseup) {
            hasEvent.mouseup = false;
            document.body.removeEventListener('mouseup', handleMouseup);
        }
        if(hasEvent.mousemove) {
            hasEvent.mousemove = false;
            document.body.removeEventListener('mousemove', handleMousemove);
        }
        if(element) {
            if(!hasEvent.mousedown) {
                hasEvent.mousedown = true;
                element.addEventListener('mousedown', handleMousedown);
            }
        } else {
            hasEvent.mousedown = false;
        }
    }

    const switchEvents = () => {
        if(!hasEvent.mousemove) {
            hasEvent.mousemove = true;
            document.body.addEventListener('mousemove', handleMousemove);
        }
        if(!hasEvent.mouseup) {
            hasEvent.mouseup = true;
            document.body.addEventListener('mouseup', handleMouseup);
        }
        if(element) {
            if(hasEvent.mousedown) {
                hasEvent.mousedown = false;
                element.removeEventListener('mousedown', handleMousedown);
            }
        } else {
            hasEvent.mousedown = false;
        }
    }

    onMount(() => {
        setupEvents();
    });
</script>

<div class="canvasPoint {type} {type}-{id}{isThisDragging ? ' dragging' : ''}" style="--hue: {Math.round(360/storage.points.length) * id}deg; left: {realPositon.left}px; top: {realPositon.top}px;{ type=='with' && id == 0 ? ' display: none !important;' : ''}" bind:this={element}>
    <div class="tooltip">
        <span class="x"><span class="cordType">x: </span><span class="value">{tooltipCords.x}</span></span>
        <span class="y"><span class="cordType">y: </span><span class="value">{tooltipCords.y}</span></span>
    </div>
</div>