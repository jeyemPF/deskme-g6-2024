"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var drawRect = function (coords, fillColor, lineWidth, strokeColor, ctx) {
    var left = coords[0], top = coords[1], right = coords[2], bot = coords[3];
    ctx.current.fillStyle = fillColor;
    ctx.current.lineWidth = lineWidth;
    ctx.current.strokeStyle = strokeColor;
    ctx.current.strokeRect(left, top, right - left, bot - top);
    ctx.current.fillRect(left, top, right - left, bot - top);
};
var drawCircle = function (coords, fillColor, lineWidth, strokeColor, ctx) {
    ctx.current.fillStyle = fillColor;
    ctx.current.beginPath();
    ctx.current.lineWidth = lineWidth;
    ctx.current.strokeStyle = strokeColor;
    ctx.current.arc(coords[0], coords[1], coords[2], 0, 2 * Math.PI);
    ctx.current.closePath();
    ctx.current.stroke();
    ctx.current.fill();
};
var drawPoly = function (coords, fillColor, lineWidth, strokeColor, ctx) {
    var newCoords = coords.reduce(function (a, v, i, s) { return (i % 2 ? a : __spreadArray(__spreadArray([], a, true), [s.slice(i, i + 2)], false)); }, []);
    // const first = newCoords.unshift();
    ctx.current.fillStyle = fillColor;
    ctx.current.beginPath();
    ctx.current.lineWidth = lineWidth;
    ctx.current.strokeStyle = strokeColor;
    // ctx.current.moveTo(first[0], first[1]);
    newCoords.forEach(function (c) { return ctx.current.lineTo(c[0], c[1]); });
    ctx.current.closePath();
    ctx.current.stroke();
    ctx.current.fill();
};
var callingFn = function (shape, coords, fillColor, lineWidth, strokeColor, isAreaActive, ctx) {
    if (shape === 'rect' && isAreaActive) {
        return drawRect(coords, fillColor, lineWidth, strokeColor, ctx);
    }
    if (shape === 'circle' && isAreaActive) {
        return drawCircle(coords, fillColor, lineWidth, strokeColor, ctx);
    }
    if (shape === 'poly' && isAreaActive) {
        return drawPoly(coords, fillColor, lineWidth, strokeColor, ctx);
    }
    return false;
};
exports.default = callingFn;
