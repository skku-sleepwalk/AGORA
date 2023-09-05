"use strict";
exports.id = 480;
exports.ids = [480];
exports.modules = {

/***/ 4759:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ useMypagePlaytimeBarStyles)
/* harmony export */ });
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_0__);

const useMypagePlaytimeBarStyles = (0,_mantine_core__WEBPACK_IMPORTED_MODULE_0__.createStyles)((theme)=>({
        listItem: {
            width: "30rem",
            ".mantine-List-itemWrapper": {
                width: "100%"
            }
        },
        line: {
            width: "1.5rem",
            height: "0.4rem",
            borderRadius: theme.radius.xs
        },
        group: {
            width: "27rem"
        }
    }));


/***/ }),

/***/ 7663:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ MypagePlaytimeBar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mypagePlaytimeBar_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4759);
/* harmony import */ var _mypagePlaytimesSection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(477);
/* harmony import */ var _hooks_game_useUserPlaytimes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2464);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_mypagePlaytimesSection__WEBPACK_IMPORTED_MODULE_3__, _hooks_game_useUserPlaytimes__WEBPACK_IMPORTED_MODULE_4__]);
([_mypagePlaytimesSection__WEBPACK_IMPORTED_MODULE_3__, _hooks_game_useUserPlaytimes__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





function MypagePlaytimeBar() {
    const { classes, cx } = (0,_mypagePlaytimeBar_styles__WEBPACK_IMPORTED_MODULE_2__/* .useMypagePlaytimeBarStyles */ .f)();
    const theme = (0,_mantine_core__WEBPACK_IMPORTED_MODULE_1__.useMantineTheme)();
    const playtimeColor = (0,_mypagePlaytimesSection__WEBPACK_IMPORTED_MODULE_3__/* .PlaytimeColor */ .gB)();
    const { data: me } = (0,_hooks_game_useUserPlaytimes__WEBPACK_IMPORTED_MODULE_4__/* .useUserPlaytimes */ .e)();
    const listItem = me?.data.playtimes.map((item, index)=>{
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.List.Item, {
            className: classes.listItem,
            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Box, {
                className: classes.line,
                bg: index <= 8 ? playtimeColor[index] : playtimeColor[9]
            }),
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                className: classes.group,
                position: "apart",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Avatar, {
                                size: "2.5rem",
                                radius: "20%",
                                src: "https://play-lh.googleusercontent.com/He92papZcOmkgTi1sLHXQQb02aoyRtJ8ml96njM_cSAcpHhILvxMjhLix4mYEIKXPq4=s96-rw"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                fz: "lg",
                                children: item.game.title
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                        fz: "lg",
                        children: (0,_mypagePlaytimesSection__WEBPACK_IMPORTED_MODULE_3__/* .SwitchPlaytime */ .XM)(item.playtime)
                    })
                ]
            })
        });
    });
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.List, {
        spacing: "sm",
        size: "sm",
        center: true,
        children: listItem
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1461:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ useMypagePlaytimesSectionStyles)
/* harmony export */ });
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_0__);

const useMypagePlaytimesSectionStyles = (0,_mantine_core__WEBPACK_IMPORTED_MODULE_0__.createStyles)((theme)=>({
        container: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between"
        },
        stack: {
            flexGrow: 1,
            padding: "2rem 0rem"
        },
        ringProcess: {},
        playtimeBar: {
            paddingLeft: "2rem",
            paddingTop: "1.5rem"
        },
        totalPlaytimeText: {
            paddingLeft: "2rem"
        }
    }));


/***/ }),

/***/ 477:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cm: () => (/* binding */ MypagePlaytimesSection),
/* harmony export */   XM: () => (/* binding */ SwitchPlaytime),
/* harmony export */   gB: () => (/* binding */ PlaytimeColor)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_useAuth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8823);
/* harmony import */ var _common_CardContainer_CardContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1576);
/* harmony import */ var _mypagePlaytimesSection_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1461);
/* harmony import */ var _hooks_game_useUserPlaytimes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2464);
/* harmony import */ var _mypagePlaytimeBar_mypagePlaytimeBar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7663);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_hooks_useAuth__WEBPACK_IMPORTED_MODULE_2__, _hooks_game_useUserPlaytimes__WEBPACK_IMPORTED_MODULE_5__, _mypagePlaytimeBar_mypagePlaytimeBar__WEBPACK_IMPORTED_MODULE_6__]);
([_hooks_useAuth__WEBPACK_IMPORTED_MODULE_2__, _hooks_game_useUserPlaytimes__WEBPACK_IMPORTED_MODULE_5__, _mypagePlaytimeBar_mypagePlaytimeBar__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







function SwitchPlaytime(playtime) {
    const hours = Math.floor(playtime / 60);
    const minutes = playtime % 60;
    if (hours === 0) {
        return `${minutes}분`;
    } else if (minutes === 0) {
        return `${hours}시간`;
    } else {
        return `${hours}시간 ${minutes}분`;
    }
}
function PlaytimeColor() {
    const theme = (0,_mantine_core__WEBPACK_IMPORTED_MODULE_1__.useMantineTheme)();
    return [
        theme.colors.cyan[6],
        theme.colors.orange[6],
        theme.colors.grape[6],
        theme.colors.lime[6],
        theme.colors.teal[6],
        theme.colors.pink[6],
        theme.colors.indigo[6],
        theme.colors.yellow[6],
        theme.colors.red[6],
        theme.colors.gray[4]
    ];
}
function MypagePlaytimesSection() {
    const { classes, cx } = (0,_mypagePlaytimesSection_styles__WEBPACK_IMPORTED_MODULE_4__/* .useMypagePlaytimesSectionStyles */ .V)();
    const theme = (0,_mantine_core__WEBPACK_IMPORTED_MODULE_1__.useMantineTheme)();
    const playtimeColor = PlaytimeColor();
    const { user, token } = (0,_hooks_useAuth__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)();
    const { data: me } = (0,_hooks_game_useUserPlaytimes__WEBPACK_IMPORTED_MODULE_5__/* .useUserPlaytimes */ .e)();
    const sections = me?.data.playtimes.map((item, index)=>{
        const percent = item.playtime / me.data.totalPlaytime * 100;
        const color = index <= 8 ? playtimeColor[index] : playtimeColor[9];
        const tooltip = item.game.title;
        return index <= 8 ? {
            value: percent,
            color: color,
            tooltip: tooltip
        } : {
            value: percent,
            color: color
        };
    });
    console.log(sections);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_common_CardContainer_CardContainer__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
        bg: "white",
        w: "100%",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Stack, {
            className: classes.stack,
            spacing: 0,
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                    className: classes.totalPlaytimeText,
                    fz: "1.6rem",
                    children: "총 게임 시간"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: classes.container,
                    children: [
                        sections && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.RingProgress, {
                            size: 370,
                            thickness: 40,
                            label: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                size: "xl",
                                align: "center",
                                children: me !== undefined ? SwitchPlaytime(me.data.totalPlaytime) : null
                            }),
                            sections: sections
                        }),
                        !sections && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.RingProgress, {
                            className: classes.ringProcess,
                            size: 370,
                            thickness: 40,
                            label: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                size: "xl",
                                align: "center",
                                children: "플레이 기록 없음"
                            }),
                            sections: [
                                {
                                    value: 100,
                                    color: theme.colors.gray[2]
                                }
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Box, {
                            className: classes.playtimeBar,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mypagePlaytimeBar_mypagePlaytimeBar__WEBPACK_IMPORTED_MODULE_6__/* .MypagePlaytimeBar */ .S, {})
                        })
                    ]
                })
            ]
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2464:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ useUserPlaytimes)
/* harmony export */ });
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5941);
/* harmony import */ var _utils_fetcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7967);
/* harmony import */ var _useAuth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8823);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr__WEBPACK_IMPORTED_MODULE_0__, _utils_fetcher__WEBPACK_IMPORTED_MODULE_1__, _useAuth__WEBPACK_IMPORTED_MODULE_2__]);
([swr__WEBPACK_IMPORTED_MODULE_0__, _utils_fetcher__WEBPACK_IMPORTED_MODULE_1__, _useAuth__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



function useUserPlaytimes() {
    const { user, token } = (0,_useAuth__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)();
    const url = `${"http://ec2-3-112-178-120.ap-northeast-1.compute.amazonaws.com:8000"}/users/${user?.id}`;
    const response = (0,swr__WEBPACK_IMPORTED_MODULE_0__["default"])(url, (url)=>(0,_utils_fetcher__WEBPACK_IMPORTED_MODULE_1__/* .fetcher */ ._)(url, token));
    return response;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;