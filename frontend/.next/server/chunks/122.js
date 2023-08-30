"use strict";
exports.id = 122;
exports.ids = [122];
exports.modules = {

/***/ 3395:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5941);
/* harmony import */ var _useAuth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8823);
/* harmony import */ var _utils_fetcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7967);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr__WEBPACK_IMPORTED_MODULE_0__, _useAuth__WEBPACK_IMPORTED_MODULE_1__, _utils_fetcher__WEBPACK_IMPORTED_MODULE_2__]);
([swr__WEBPACK_IMPORTED_MODULE_0__, _useAuth__WEBPACK_IMPORTED_MODULE_1__, _utils_fetcher__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



function useGame(gameId) {
    const { token } = (0,_useAuth__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)();
    const url = `${"http://ec2-43-207-85-73.ap-northeast-1.compute.amazonaws.com:8000"}/game/${gameId}`;
    const response = (0,swr__WEBPACK_IMPORTED_MODULE_0__["default"])(url, (url)=>(0,_utils_fetcher__WEBPACK_IMPORTED_MODULE_2__/* .fetcher */ ._)(url, token));
    return response;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useGame);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 36:
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




const getKey = (pageIndex, previousPageData, gameId, categories, { search, parentId, boardType })=>{
    if (previousPageData && previousPageData.data.cursor.afterCursor === null) return null;
    let query = {
        categoryNames: categories.length > 0 ? categories.join(",") : null
    };
    if (search) query.q = search;
    if (boardType) query.boardType = boardType;
    if (pageIndex > 0) query.afterCursor = previousPageData?.data.cursor.afterCursor;
    const queryString = (0,querystring__WEBPACK_IMPORTED_MODULE_1__.stringify)(query);
    if (search) return `${"http://ec2-43-207-85-73.ap-northeast-1.compute.amazonaws.com:8000"}/game/${gameId}/board/search?${queryString}`;
    if (parentId) return `${"http://ec2-43-207-85-73.ap-northeast-1.compute.amazonaws.com:8000"}/game/${gameId}/board/getChild/${parentId}?${queryString}`;
    else return `${"http://ec2-43-207-85-73.ap-northeast-1.compute.amazonaws.com:8000"}/game/${gameId}/board?${queryString}`;
};
function useGameBoardList(categories, gameId, settings = {}) {
    const { token } = (0,_useAuth__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)();
    const response = (0,swr_infinite__WEBPACK_IMPORTED_MODULE_0__["default"])((pageIndex, previousPageData)=>getKey(pageIndex, previousPageData, gameId, categories, settings), (url)=>(0,_utils_fetcher__WEBPACK_IMPORTED_MODULE_2__/* .fetcher */ ._)(url, token));
    const isLast = response.data?.[response.data.length - 1]?.data.cursor?.afterCursor === null;
    const isEmpty = response.data?.[0]?.data.data.length === 0;
    return {
        ...response,
        isLast,
        isEmpty
    };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useGameBoardList);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;