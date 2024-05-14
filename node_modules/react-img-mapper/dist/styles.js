"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var absPos = {
    position: 'absolute',
    top: 0,
    left: 0,
};
var imgNonResponsive = __assign(__assign({}, absPos), { zIndex: 1, userSelect: 'none' });
var imgResponsive = __assign(__assign({}, imgNonResponsive), { width: '100%', height: 'auto' });
var styles = function (props) { return ({
    container: {
        position: 'relative',
    },
    canvas: __assign(__assign({}, absPos), { pointerEvents: 'none', zIndex: 2 }),
    img: (props === null || props === void 0 ? void 0 : props.responsive) ? imgResponsive : imgNonResponsive,
    map: ((props === null || props === void 0 ? void 0 : props.onClick) && {
        cursor: 'pointer',
    }) ||
        undefined,
}); };
exports.default = styles;
