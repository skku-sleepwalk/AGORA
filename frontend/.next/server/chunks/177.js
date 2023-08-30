"use strict";
exports.id = 177;
exports.ids = [177];
exports.modules = {

/***/ 3177:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ SmallPost)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: ./components/common/CardContainer/CardContainer.tsx + 1 modules
var CardContainer = __webpack_require__(1576);
// EXTERNAL MODULE: external "@mantine/core"
var core_ = __webpack_require__(2247);
;// CONCATENATED MODULE: ./components/common/UserInfoSmall/UserInfoSmall.tsx


function UserInfo({ user }) {
    const theme = (0,core_.useMantineTheme)();
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Group, {
        spacing: 7,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(core_.Avatar, {
                src: "https://avatars.githubusercontent.com/u/52057157?v=4",
                radius: "xl",
                size: 20
            }),
            /*#__PURE__*/ jsx_runtime.jsx(core_.Stack, {
                spacing: 5,
                children: /*#__PURE__*/ jsx_runtime.jsx(core_.Text, {
                    size: "xs",
                    children: user.name
                })
            })
        ]
    });
}
/* harmony default export */ const UserInfoSmall = (UserInfo);

// EXTERNAL MODULE: external "@tabler/icons-react"
var icons_react_ = __webpack_require__(2236);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: ./components/pages/game/SmallPost/SmallPost.tsx








/* harmony default export */ function SmallPost({ post, thumbnailUrl }) {
    // 그냥 아무거나 집어넣기
    //but 나중에도 description은 비워둬야함
    const [isHovered, setIsHovered] = (0,external_react_.useState)(false);
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
    return /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
        href: `/game/${post.id}`,
        style: {
            textDecoration: "none",
            color: "black"
        },
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(CardContainer/* default */.Z, {
            style: sizeStyle,
            onMouseEnter: handleHover,
            onMouseLeave: handleLeave,
            children: [
                /*#__PURE__*/ jsx_runtime.jsx(core_.Text, {
                    size: "xs",
                    color: "gray",
                    style: margins,
                    children: newarray
                }),
                /*#__PURE__*/ jsx_runtime.jsx(core_.Text, {
                    "font-weight": "bold",
                    size: 20,
                    style: margins,
                    children: post.store.title
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Group, {
                    position: "apart",
                    style: margins,
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx(UserInfoSmall, {
                            user: post.author
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx(core_.Group, {
                            spacing: 0,
                            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Group, {
                                spacing: 5,
                                style: {
                                    marginRight: "1rem"
                                },
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx(icons_react_.IconHeart, {
                                        size: 15,
                                        stroke: 1.3
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Text, {
                                        size: "xs",
                                        children: [
                                            "(",
                                            post.likeCount,
                                            ")"
                                        ]
                                    })
                                ]
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime.jsx(core_.Group, {
                    children: post.store.cost?.isSale ? /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Text, {
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
                /*#__PURE__*/ jsx_runtime.jsx("div", {
                    style: {
                        marginRight: "1rem"
                    },
                    children: post.store.cost?.isFree ? /*#__PURE__*/ jsx_runtime.jsx(core_.Text, {
                        align: "right",
                        size: "lg",
                        children: "FREE"
                    }) : post.store.cost?.isSale ? /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Group, {
                        style: {
                            paddingLeft: "124px"
                        },
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Text, {
                                style: {
                                    backgroundColor: "#F1A2A2"
                                },
                                children: [
                                    "-",
                                    post.store.cost.salePercentage,
                                    "%"
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Text, {
                                size: "lg",
                                children: [
                                    "\\",
                                    post.store?.cost?.saledPrice
                                ]
                            })
                        ]
                    }) : /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Text, {
                        align: "right",
                        size: "lg",
                        children: [
                            "\\",
                            post.store?.cost?.defaultPrice
                        ]
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    style: containerStyle,
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx("img", {
                            src: post.shortImgUrl,
                            height: "400rem"
                        }),
                        isHovered && /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ jsx_runtime.jsx("div", {
                                    style: overlayStyle
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx("div", {
                                    style: overlayStyle2,
                                    children: /*#__PURE__*/ jsx_runtime.jsx("p", {
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


/***/ })

};
;