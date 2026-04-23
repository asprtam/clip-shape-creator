<script>
    import { onMount } from 'svelte';
    import getHue from './lib/hueRule.svelte';
    import { getPointCords, translateCords } from "./lib/toShape.svelte";
    import helpers from './lib/helpers.svelte';
    /** @type {{id: Number, prevId: Number, nextId: Number, isDragging: Boolean, type: 'point'|'with', 'storage': import('./storage.svelte.js').Storage, btnPress: { shift: Boolean, ctrl: Boolean, alt: Boolean }, isDraggingSibling: Boolean }} */
    let { id, prevId, nextId, isDragging = $bindable(), type, storage = $bindable(null), btnPress, isDraggingSibling } = $props();
    let hasEvent = { mousedown: false, mouseup: false, mousemove: false };
    /** @type {HTMLElement} */
    let element = $state();
    let prevClientPos = { x: 0, y: 0 };
    let isMouseOver = $state(false);
    let isMouseOverLine = $state(false);
    // svelte-ignore state_referenced_locally
    let draggingStartPos = $state(storage.points[id].pos);

    let realPositon = $derived.by(() => {
        let obj = { left: 0, top: 0 };
        if(storage.points[id]) {
            let check = storage.points[id].pos;
            if(type == 'with') {
                check = storage.points[id].with;
            }
            switch(check.xPositionType) {
                case 'percent': {
                    obj.left = storage.settings.imgSize.width * (check.x / 100);
                    break;
                }
                case 'middle': {
                    obj.left = (storage.settings.imgSize.width/2) + check.x;
                    break;
                }
                case 'start': {
                    obj.left = check.x;
                    break;
                }
                case 'end': {
                    obj.left = storage.settings.imgSize.width + check.x;
                    break;
                }
            }
            switch(check.yPositionType) {
                case 'percent': {
                    obj.top = storage.settings.imgSize.height * (check.y / 100);
                    break;
                }
                case 'middle': {
                    obj.top = (storage.settings.imgSize.height/2) + check.y;
                    break;
                }
                case 'start': {
                    obj.top = check.y;
                    break;
                }
                case 'end': {
                    obj.top = storage.settings.imgSize.height + check.y;
                    break;
                }
            }
        }
        return obj;
    });

    let pointingLineSize = $derived.by(() => {
        let obj = { left: 0, top: 0 };
        if(storage.points[id]) {
            switch(storage.points[id].pos.xPositionType) {
                case 'percent': {
                    obj.left = storage.settings.imgSize.width * (storage.points[id].pos.x / 100);
                    break;
                }
                case 'middle': {
                    obj.left = (storage.settings.imgSize.width/2) + storage.points[id].pos.x;
                    break;
                }
                case 'start': {
                    obj.left = storage.points[id].pos.x;
                    break;
                }
                case 'end': {
                    obj.left = storage.settings.imgSize.width + storage.points[id].pos.x;
                    break;
                }
            }
            switch(storage.points[id].pos.yPositionType) {
                case 'percent': {
                    obj.top = storage.settings.imgSize.height * (storage.points[id].pos.y / 100);
                    break;
                }
                case 'middle': {
                    obj.top = (storage.settings.imgSize.height/2) + storage.points[id].pos.y;
                    break;
                }
                case 'start': {
                    obj.top = storage.points[id].pos.y;
                    break;
                }
                case 'end': {
                    obj.top = storage.settings.imgSize.height + storage.points[id].pos.y;
                    break;
                }
            }
        }
        return { width: realPositon.left - obj.left, height: realPositon.top - obj.top };
    });

    let pointingLinePrevPointSize = $derived.by(() => {
        let obj = { left: 0, top: 0 };
        if(storage.points[prevId]) {
            switch(storage.points[prevId].pos.xPositionType) {
                case 'percent': {
                    obj.left = storage.settings.imgSize.width * (storage.points[prevId].pos.x / 100);
                    break;
                }
                case 'middle': {
                    obj.left = (storage.settings.imgSize.width/2) + storage.points[prevId].pos.x;
                    break;
                }
                case 'start': {
                    obj.left = storage.points[prevId].pos.x;
                    break;
                }
                case 'end': {
                    obj.left = storage.settings.imgSize.width + storage.points[prevId].pos.x;
                    break;
                }
            }
            switch(storage.points[prevId].pos.yPositionType) {
                case 'percent': {
                    obj.top = storage.settings.imgSize.height * (storage.points[prevId].pos.y / 100);
                    break;
                }
                case 'middle': {
                    obj.top = (storage.settings.imgSize.height/2) + storage.points[prevId].pos.y;
                    break;
                }
                case 'start': {
                    obj.top = storage.points[prevId].pos.y;
                    break;
                }
                case 'end': {
                    obj.top = storage.settings.imgSize.height + storage.points[prevId].pos.y;
                    break;
                }
            }
        }
        return { width: realPositon.left - obj.left, height: realPositon.top - obj.top };
    });

    let tooltipCords = $derived.by(() => {
        let obj = { x: '', y: '' };
        if(type == 'point') {
            let strPos = getPointCords(storage.points[id], storage.settings.imgSize, true, '', '|');
            if(strPos.split('|').length > 1) {
                obj.x = strPos.split('|')[0];
                obj.y = strPos.split('|')[1];
            }
        } else {
            let point = JSON.parse(JSON.stringify(storage.points[id]));
            point.pos = point.with;
            let strPos = getPointCords(point, storage.settings.imgSize, true, '', '|');
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
            isDragging = true;
            if(type == 'point') {
                draggingStartPos = storage.points[id].pos;
            } else {
                draggingStartPos = storage.points[id].with;
            }
            prevClientPos = { x: e.clientX, y: e.clientY };
            switchDragEvents();
        }
    }

    /**
     * @param {MouseEvent} e
     */
    const handleMouseup = (e) => {
        isDragging = false;
        prevClientPos = { x: 0, y: 0 };
        setupDragEvents();
    }

    /**
     * @param {MouseEvent} e
     */
    const handleMousemove = (e) => {
        let diffX = helpers.roundToFraction((e.clientX - prevClientPos.x)/storage.settings.scale);
        let diffY = helpers.roundToFraction((e.clientY - prevClientPos.y)/storage.settings.scale);
        let newX = draggingStartPos.x;
        let newY = draggingStartPos.y;
        let checkX = storage.points[id].pos.xPositionType;
        let checkY = storage.points[id].pos.yPositionType;
        if(type == 'with') {
            checkX = storage.points[id].with.xPositionType;
            checkY = storage.points[id].with.yPositionType;
        }
        if(btnPress.shift) {
            switch(checkX) {
                case 'percent': {
                    newX = helpers.roundToFraction((helpers.roundToMultiplicity((storage.settings.imgSize.width * (draggingStartPos.x / 100)) + diffX, storage.settings.gridSize) / storage.settings.imgSize.width) * 100, 100);
                    break;
                }
                case 'middle': {
                    let half = storage.settings.imgSize.width/2;
                    newX = helpers.roundToMultiplicity(half + draggingStartPos.x + diffX, storage.settings.gridSize) - half;
                    break;
                }
                case 'start': {
                    newX = helpers.roundToMultiplicity(draggingStartPos.x + diffX, storage.settings.gridSize);
                    break;
                }
                case 'end': {
                    newX = helpers.roundToMultiplicity(storage.settings.imgSize.width + draggingStartPos.x + diffX, storage.settings.gridSize) - storage.settings.imgSize.width;
                    break;
                }
            }
            switch(checkY) {
                case 'percent': {
                    newY = helpers.roundToFraction((helpers.roundToMultiplicity((storage.settings.imgSize.height * (draggingStartPos.y / 100)) + diffY, storage.settings.gridSize) / storage.settings.imgSize.height) * 100, 100);
                    break;
                }
                case 'middle': {
                    let half = storage.settings.imgSize.height/2;
                    newY = helpers.roundToMultiplicity(half + draggingStartPos.y + diffY, storage.settings.gridSize) - half;
                    break;
                }
                case 'start': {
                    newY = helpers.roundToMultiplicity(draggingStartPos.y + diffY, storage.settings.gridSize);
                    break;
                }
                case 'end': {
                    newY = helpers.roundToMultiplicity(storage.settings.imgSize.height + draggingStartPos.y + diffY, storage.settings.gridSize) - storage.settings.imgSize.height;
                    break;
                }
            }
        } else {
            if(checkX == 'percent') {
                newX += helpers.roundToFraction((diffX/storage.settings.imgSize.width)*100, 100);
            } else {
                newX += diffX;
            }
            if(checkY == 'percent') {
                newY += helpers.roundToFraction((diffY/storage.settings.imgSize.height)*100, 100);
            } else {
                newY += diffY;
            }
        }
        if(type == 'point') {
            if(!btnPress.alt) {
                let translatedWith = translateCords(storage.points[id].with, { xPositionType: checkX, yPositionType: checkY }, storage.settings.imgSize);
                if(translatedWith.x == storage.points[id].pos.x && translatedWith.y == storage.points[id].pos.y) {
                    storage.points[id].with = translateCords({ x: newX, y: newY, xPositionType: checkX, yPositionType: checkY }, { xPositionType: storage.points[id].with.xPositionType, yPositionType: storage.points[id].with.yPositionType }, storage.settings.imgSize);
                }
                if(storage.points[prevId]) {
                    let translatedWithPrev = translateCords(storage.points[prevId].with, { xPositionType: checkX, yPositionType: checkY });
                    if(translatedWithPrev.x == storage.points[id].pos.x && translatedWithPrev.y == storage.points[id].pos.y) {
                        storage.points[prevId].with = translateCords({ x: newX, y: newY, xPositionType: checkX, yPositionType: checkY }, { xPositionType: storage.points[prevId].with.xPositionType, yPositionType: storage.points[prevId].with.yPositionType }, storage.settings.imgSize);
                    }
                }
                if(prevId != nextId && storage.points[nextId]) {
                    let translatedWithNext = translateCords(storage.points[nextId].with, { xPositionType: checkX, yPositionType: checkY });
                    if(translatedWithNext.x == storage.points[id].pos.x && translatedWithNext.y == storage.points[id].pos.y) {
                        storage.points[nextId].with = translateCords({ x: newX, y: newY, xPositionType: checkX, yPositionType: checkY }, { xPositionType: storage.points[nextId].with.xPositionType, yPositionType: storage.points[nextId].with.yPositionType }, storage.settings.imgSize);
                    }
                }
            }
            storage.points[id].pos = { x: newX, y: newY, xPositionType: checkX, yPositionType: checkY };
        } else {
            storage.points[id].with = { x: newX, y: newY, xPositionType: checkX, yPositionType: checkY };
        }
    }

    const setupDragEvents = () => { 
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

    const switchDragEvents = () => {
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

    const handleMouseOver = () => {
        if(!isDragging && !isDraggingSibling && !isMouseOver) {
            isMouseOver = true;
        }
    }

    const handleMouseOut = () => {
        if(!isDragging && !isDraggingSibling && isMouseOver) {
            isMouseOver = false;
        }
    }

    const handleMouseOverLine = () => {
        if(!isDragging && !isDraggingSibling && !isMouseOverLine) {
            isMouseOverLine = true;
        }
    }

    const handleMouseOutLine = () => {
        if(!isDragging && !isDraggingSibling && isMouseOverLine) {
            isMouseOverLine = false;
        }
    }

    onMount(() => {
        setupDragEvents();
    });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<div 
    class="canvasPoint {type} {type}-{id}{isDragging ? ' dragging' : isDraggingSibling ? ' draggingSibling' : isMouseOver ? ' hover' : isMouseOverLine ? ' hoverLine' : ''}"
    style="
            --hue: {getHue(storage.points.length, id)}deg;
            left: {realPositon.left}px;
            top: {realPositon.top}px;
        "
    onmouseover={handleMouseOver} onmouseout={handleMouseOut}
    bind:this={element}
    >
        <div class="tooltip">
            <span class="x"><span class="cordType">x: </span><span class="value">{tooltipCords.x}</span></span>
            <span class="y"><span class="cordType">y: </span><span class="value">{tooltipCords.y}</span></span>
        </div>
</div>
{#if type == 'with'}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_mouse_events_have_key_events -->
    <div 
    class="pointingLine prevPoint pointingLine-prevPoint-{id}{isDragging ? ' dragging' : isDraggingSibling ? ' draggingSibling' : isMouseOverLine ? ' hover' : isMouseOver ? 'hoverParent' : ''}"
    style="
            --hue: {getHue(storage.points.length, id)}deg;
            --hue2: {getHue(storage.points.length, prevId)}deg;
            left: {realPositon.left}px; top: {realPositon.top}px;
            width: {Math.sqrt(Math.pow(pointingLinePrevPointSize.width, 2) + Math.pow(pointingLinePrevPointSize.height, 2))}px;
            --rotation: {((Math.atan2(pointingLinePrevPointSize.height, pointingLinePrevPointSize.width) * 180) / Math.PI) + 180}deg;
        "
    onmouseover={handleMouseOver} onmouseout={handleMouseOut}
    ></div>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_mouse_events_have_key_events -->
    <div 
    class="pointingLine pointingLine-{id}{isDragging ? ' dragging' : isDraggingSibling ? ' draggingSibling' : isMouseOverLine ? ' hover' : ''}"
    style="
            --hue: {getHue(storage.points.length, id)}deg;
            left: {realPositon.left}px;
            top: {realPositon.top}px;
            width: {Math.sqrt(Math.pow(pointingLineSize.width, 2) + Math.pow(pointingLineSize.height, 2))}px;
            --rotation: {((Math.atan2(pointingLineSize.height, pointingLineSize.width) * 180) / Math.PI) + 180}deg;
        "
    onmouseover={handleMouseOver} onmouseout={handleMouseOut}
    ></div>
{/if}