"use strict";
exports.id = 509;
exports.ids = [509];
exports.modules = {

/***/ 7662:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _common_CardContainer_CardContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1576);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);






/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__({ post, thumbnailUrl }) {
    // 그냥 아무거나 집어넣기
    //but 나중에도 description은 비워둬야함
    const [isHovered, setIsHovered] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const handleHover = ()=>{
        setIsHovered(true);
    };
    const handleLeave = ()=>{
        setIsHovered(false);
    };
    const sizeStyle = {
        transform: isHovered ? "scale(1.1)" : "scale(1)",
        transition: "transform 0.3s ease",
        height: "20rem",
        width: "16rem",
        padding: "0px",
        overflow: "hidden"
    };
    const margins = {
        marginLeft: "1rem",
        marginTop: "0.5rem"
    };
    const containerStyle = {
        position: "relative",
        width: "320px",
        height: "100rem",
        overflow: "hidden"
    };
    const overlayStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 1,
        transition: "opacity 0.3s ease"
    };
    const overlayStyle2 = {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: "10rem",
        width: "16rem",
        // 반투명한 배경 색상
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 1,
        transition: "opacity 0.3s ease"
    };
    const namesArray = post.genres?.map((item)=>item.name);
    const newarray = namesArray?.join(", ");
    console.log(post.store?.cost);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {
        href: `/game/${post.id}`,
        style: {
            textDecoration: "none",
            color: "black"
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_common_CardContainer_CardContainer__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
            style: sizeStyle,
            onMouseEnter: handleHover,
            onMouseLeave: handleLeave,
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                    size: "xs",
                    color: "gray",
                    style: margins,
                    children: newarray
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                    "font-weight": "bold",
                    size: 20,
                    style: margins,
                    children: post.title
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Group, {
                    position: "apart",
                    style: margins,
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Group, {
                            spacing: 7,
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Avatar, {
                                    src: "https://avatars.githubusercontent.com/u/52057157?v=4",
                                    radius: "xl",
                                    size: 20
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                                    size: "xs",
                                    children: post.store.developer
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Group, {
                            spacing: 0,
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Group, {
                                spacing: 4,
                                style: {
                                    marginRight: "1rem"
                                },
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Image, {
                                        width: "0.8rem",
                                        height: "0.65rem",
                                        src: "/images/HeartFilled.svg"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                                        size: "xs",
                                        children: post.likeCount
                                    })
                                ]
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Group, {
                    children: post.store.cost?.isSale ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                        style: {
                            marginLeft: "190px"
                        },
                        align: "right",
                        td: "line-through",
                        c: "gray",
                        size: "md",
                        children: [
                            "\\",
                            post.store?.cost?.defaultPrice
                        ]
                    }) : null
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    style: {
                        marginRight: "1rem"
                    },
                    children: post.store.cost?.isFree ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                        align: "right",
                        size: "lg",
                        children: "FREE"
                    }) : post.store.cost?.isSale ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Group, {
                        style: {
                            paddingLeft: "124px"
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                                style: {
                                    backgroundColor: "#F1A2A2"
                                },
                                children: [
                                    "-",
                                    post.store.cost.salePercentage,
                                    "%"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                                size: "lg",
                                children: [
                                    "\\",
                                    post.store?.cost?.saledPrice
                                ]
                            })
                        ]
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                        align: "right",
                        size: "lg",
                        children: [
                            "\\",
                            post.store?.cost?.defaultPrice
                        ]
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    style: containerStyle,
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                            src: post.shortImgUrl,
                            height: "400rem"
                        }),
                        isHovered && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    style: overlayStyle
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    style: overlayStyle2,
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: post.shortContent
                                    })
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
}


/***/ }),

/***/ 6012:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var swr_infinite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1448);
/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3477);
/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(querystring__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_fetcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7967);
/* harmony import */ var _useAuth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8823);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr_infinite__WEBPACK_IMPORTED_MODULE_0__, _utils_fetcher__WEBPACK_IMPORTED_MODULE_2__, _useAuth__WEBPACK_IMPORTED_MODULE_3__]);
([swr_infinite__WEBPACK_IMPORTED_MODULE_0__, _utils_fetcher__WEBPACK_IMPORTED_MODULE_2__, _useAuth__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




//getKey 함수란, 인덱스와 이전 페이지 데이터를 받고 페이지 키를 반환하는 함수이다.
const getKey = (pageIndex, previousPageData, { genreNames, search })=>{
    if (previousPageData && previousPageData.data.cursor.afterCursor === null) return null;
    let queryString = "";
    let searchString = "";
    if (search != "" && search != undefined && search != null) {
        searchString = search;
    }
    if (pageIndex === 0) {
        // 첫번째 페이지
        console.log("장르", genreNames);
        console.log("서치", searchString);
        queryString = (0,querystring__WEBPACK_IMPORTED_MODULE_1__.stringify)({
            genreNames: genreNames,
            q: searchString
        });
    } else {
        // 두번째 페이지부터
        queryString = (0,querystring__WEBPACK_IMPORTED_MODULE_1__.stringify)({
            afterCursor: previousPageData?.data.cursor.afterCursor,
            genreNames: genreNames,
            q: searchString
        });
    }
    return `${"http://ec2-43-207-85-73.ap-northeast-1.compute.amazonaws.com:8000"}/game/search?${queryString}`; //이거 맞는지 모르겠음
};
function useAllGame(settings = {}) {
    const { token } = (0,_useAuth__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)();
    const response = (0,swr_infinite__WEBPACK_IMPORTED_MODULE_0__["default"])((pageIndex, previousPageData)=>getKey(pageIndex, previousPageData, settings), (url)=>(0,_utils_fetcher__WEBPACK_IMPORTED_MODULE_2__/* .fetcher */ ._)(url, token));
    console.log(token);
    const isLast = response.data?.[response.data.length - 1]?.data.cursor?.afterCursor === null;
    const isEmpty = response.data?.[0]?.data.data.length === 0;
    return {
        ...response,
        isLast,
        isEmpty
    };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useAllGame);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;