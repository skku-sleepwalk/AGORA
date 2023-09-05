"use strict";
exports.id = 385;
exports.ids = [385];
exports.modules = {

/***/ 1986:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ MainLayout_MainLayout)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "@mantine/core"
var core_ = __webpack_require__(2247);
;// CONCATENATED MODULE: ./components/pages/game/MainLayout/MainLayout.styles.tsx

const useMainLayoutStyles = (0,core_.createStyles)((theme)=>({
        container: {
            width: "100%",
            height: "100%"
        },
        tapContainer: {
            position: "fixed",
            width: "100%",
            height: "3rem",
            zIndex: 50
        },
        upMainContainer: {
            position: "relative",
            top: "3rem",
            width: "100%"
        },
        upContainer: {
            aspectRatio: "20 / 7",
            width: "100%"
        },
        mainContainer: {
            width: "100%",
            margin: 0
        }
    }));

;// CONCATENATED MODULE: ./components/pages/game/MainLayout/MainLayout.tsx


function MainLayout({ children, tapSection, upSection }) {
    const { classes } = useMainLayoutStyles();
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: classes.container,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: classes.tapContainer,
                children: tapSection
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: classes.upMainContainer,
                children: [
                    upSection && /*#__PURE__*/ jsx_runtime.jsx("div", {
                        className: classes.upContainer,
                        children: upSection
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                        className: classes.mainContainer,
                        children: children
                    })
                ]
            })
        ]
    });
}
/* harmony default export */ const MainLayout_MainLayout = (MainLayout);


/***/ }),

/***/ 8575:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  L: () => (/* binding */ MainTab)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "@mantine/core"
var core_ = __webpack_require__(2247);
;// CONCATENATED MODULE: ./components/pages/game/MainTab/MainTab.styles.tsx

const useMainTabStyles = (0,core_.createStyles)((theme)=>({
        tabList: {
            position: "relative",
            boxSizing: "border-box",
            width: "100%",
            height: "3rem",
            borderBottom: "0.2rem solid white",
            backgroundColor: "white",
            boxShadow: `0px 3px 10px rgba(0, 0, 0, 0.2)`
        },
        tabItem: {
            width: "7rem",
            height: "3rem",
            fontSize: "1rem",
            "&:hover": {
                backgroundColor: "transparent",
                borderBottom: "0.2rem solid white"
            }
        },
        tabItemActive: {
            color: `${theme.colors.blue[6]} !important`,
            borderBottom: `0.2rem solid ${theme.colors.blue[6]}`,
            "&:hover": {
                borderBottom: `0.2rem solid ${theme.colors.blue[6]}`
            }
        },
        button_B: {
            position: "absolute",
            top: "0.35rem",
            right: "4rem",
            borderColor: "black",
            "&:hover": {
                backgroundColor: "transparent"
            },
            ".mantine-Button-inner": {
                fontWeight: "normal",
                color: "black"
            }
        },
        button_S: {
            display: "none"
        }
    }));

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@mantine/hooks"
var hooks_ = __webpack_require__(32);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
;// CONCATENATED MODULE: ./components/pages/game/MainTab/MainTab.tsx






function MainTab({ active }) {
    const { classes, cx } = useMainTabStyles();
    const [activeTab, setActiveTab] = (0,external_react_.useState)(active);
    const router = (0,router_.useRouter)();
    const smallScreen = (0,hooks_.useMediaQuery)("(max-width: 780px)");
    return /*#__PURE__*/ jsx_runtime.jsx(core_.Tabs, {
        value: activeTab,
        onTabChange: setActiveTab,
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Tabs.List, {
            className: classes.tabList,
            position: "center",
            children: [
                /*#__PURE__*/ jsx_runtime.jsx(core_.Tabs.Tab, {
                    value: "main",
                    className: cx(classes.tabItem, activeTab === "main" && classes.tabItemActive),
                    onClick: ()=>router.replace("/game"),
                    children: "메인"
                }),
                /*#__PURE__*/ jsx_runtime.jsx(core_.Tabs.Tab, {
                    value: "allGame",
                    className: cx(classes.tabItem, activeTab === "allGame" && classes.tabItemActive),
                    onClick: ()=>router.replace("/game/allGame"),
                    children: "전체 게임"
                })
            ]
        })
    });
}


/***/ })

};
;