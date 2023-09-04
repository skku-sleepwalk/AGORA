"use strict";
exports.id = 576;
exports.ids = [576];
exports.modules = {

/***/ 1576:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ CardContainer_CardContainer)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "@mantine/core"
var core_ = __webpack_require__(2247);
;// CONCATENATED MODULE: ./components/common/CardContainer/CardContainer.styles.tsx

const useCardContainerStyles = (0,core_.createStyles)((theme, { shadow, borderRadius })=>({
        cardContainer: {
            boxShadow: `0px 3px ${shadow}px rgba(0, 0, 0, 0.2)`,
            borderRadius,
            margin: "0"
        }
    }));

;// CONCATENATED MODULE: ./components/common/CardContainer/CardContainer.tsx



function CardContainer({ children, shadow = 10, borderRadius = 15, className, ...others }) {
    const { classes, cx } = useCardContainerStyles({
        shadow,
        borderRadius
    });
    return /*#__PURE__*/ jsx_runtime.jsx(core_.Container, {
        className: cx(classes.cardContainer, className),
        ...others,
        children: children
    });
}
/* harmony default export */ const CardContainer_CardContainer = (CardContainer);


/***/ })

};
;