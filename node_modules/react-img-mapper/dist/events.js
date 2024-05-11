"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.touchEnd = exports.touchStart = exports.mouseUp = exports.mouseDown = exports.mouseMove = exports.imageClick = exports.imageMouseMove = void 0;
var imageMouseMove = function (event, props) {
    if (props.onImageMouseMove)
        props.onImageMouseMove(event);
};
exports.imageMouseMove = imageMouseMove;
var imageClick = function (event, props) {
    if (props.onImageClick) {
        event.preventDefault();
        props.onImageClick(event);
    }
};
exports.imageClick = imageClick;
var mouseMove = function (area, index, event, props) {
    if (props.onMouseMove)
        props.onMouseMove(area, index, event);
};
exports.mouseMove = mouseMove;
var mouseDown = function (area, index, event, props) {
    if (props.onMouseDown)
        props.onMouseDown(area, index, event);
};
exports.mouseDown = mouseDown;
var mouseUp = function (area, index, event, props) {
    if (props.onMouseUp)
        props.onMouseUp(area, index, event);
};
exports.mouseUp = mouseUp;
var touchStart = function (area, index, event, props) {
    if (props.onTouchStart)
        props.onTouchStart(area, index, event);
};
exports.touchStart = touchStart;
var touchEnd = function (area, index, event, props) {
    if (props.onTouchEnd)
        props.onTouchEnd(area, index, event);
};
exports.touchEnd = touchEnd;
