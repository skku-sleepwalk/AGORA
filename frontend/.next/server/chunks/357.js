"use strict";
exports.id = 357;
exports.ids = [357];
exports.modules = {

/***/ 3727:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  h: () => (/* binding */ PhotoViewer)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@mantine/carousel"
var carousel_ = __webpack_require__(3766);
// EXTERNAL MODULE: external "@mantine/hooks"
var hooks_ = __webpack_require__(32);
// EXTERNAL MODULE: external "@mantine/core"
var core_ = __webpack_require__(2247);
// EXTERNAL MODULE: external "@tabler/icons-react"
var icons_react_ = __webpack_require__(2236);
;// CONCATENATED MODULE: ./components/common/PhotoViewer/PhotoViewer.styles.tsx

const usePhotoViewerStyles = (0,core_.createStyles)((theme)=>({
        carousel: {
            ".mantine-Carousel-control": {
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none"
            },
            ".mantine-Carousel-indicator": {
                width: "1.5rem",
                transition: "width 250ms ease",
                "&[data-active]": {
                    width: "2.5rem",
                    backgroundColor: "white"
                }
            }
        },
        carouselSlide: {
            padding: "0px 50px 35px"
        }
    }));

;// CONCATENATED MODULE: ./components/common/PhotoViewer/PhotoViewer.tsx







function PhotoViewer({ imageSrc }) {
    const { classes, cx } = usePhotoViewerStyles();
    const PhotoSrcValues = imageSrc.map((image)=>({
            src: image
        }));
    const [values] = (0,hooks_.useListState)(PhotoSrcValues);
    const TRANSITION_DURATION = 200;
    const [embla, setEmbla] = (0,external_react_.useState)(null);
    (0,carousel_.useAnimationOffsetEffect)(embla, TRANSITION_DURATION);
    const Photos = values.map((value)=>/*#__PURE__*/ jsx_runtime.jsx(carousel_.Carousel.Slide, {
            size: "49.375rem",
            children: /*#__PURE__*/ jsx_runtime.jsx(core_.Center, {
                className: classes.carouselSlide,
                onClick: (e)=>{
                    e.stopPropagation();
                },
                children: /*#__PURE__*/ jsx_runtime.jsx(core_.Image, {
                    width: "43.125rem",
                    height: "28.125rem",
                    fit: "contain",
                    src: value.src
                })
            })
        }));
    return /*#__PURE__*/ jsx_runtime.jsx(carousel_.Carousel, {
        className: classes.carousel,
        getEmblaApi: setEmbla,
        withIndicators: true,
        loop: true,
        align: "center",
        previousControlIcon: /*#__PURE__*/ jsx_runtime.jsx(icons_react_.IconChevronLeft, {
            color: "white",
            size: "2.5rem"
        }),
        nextControlIcon: /*#__PURE__*/ jsx_runtime.jsx(icons_react_.IconChevronRight, {
            color: "white",
            size: "2.5rem"
        }),
        children: Photos
    });
}


/***/ }),

/***/ 5816:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_1__);


function UserInfo({ user }) {
    const theme = (0,_mantine_core__WEBPACK_IMPORTED_MODULE_1__.useMantineTheme)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
        spacing: 14,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Avatar, {
                src: "https://avatars.githubusercontent.com/u/52057157?v=4",
                radius: "xl",
                size: 46
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                spacing: 5,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                        size: "md",
                        children: user.name
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                        size: "xs",
                        color: theme.colors.gray[5],
                        children: user.description
                    })
                ]
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserInfo);


/***/ }),

/***/ 424:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  x: () => (/* binding */ CommunityCategory)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "@mantine/core"
var core_ = __webpack_require__(2247);
// EXTERNAL MODULE: external "@mantine/hooks"
var hooks_ = __webpack_require__(32);
// EXTERNAL MODULE: external "@tabler/icons-react"
var icons_react_ = __webpack_require__(2236);
;// CONCATENATED MODULE: ./components/pages/community/CommunityCategory/CommunityCategory.styles.tsx

const useCommunityCategoryStyles = (0,core_.createStyles)((theme)=>({
        CategoryContainer: {
            boxSizing: "border-box",
            width: "16.313rem",
            position: "relative",
            float: "left",
            backgroundColor: "#FFF",
            boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "15px"
        },
        CategoryText: {
            display: "block",
            position: "relative",
            paddingTop: "1.25rem",
            paddingBottom: "0.938rem",
            fontWeight: 500,
            fontSize: 20,
            color: "#000"
        },
        DropDownButton: {
            display: "inline-block",
            boxSizing: "border-box",
            height: "1.25rem",
            padding: "0px 5px"
        },
        CheckboxGroup: {
            display: "block",
            position: "relative",
            width: "100%"
        },
        CheckboxItems: {
            marginLeft: "0.65rem",
            padding: 0,
            paddingLeft: "0.65rem"
        },
        PaddingBottom: {
            paddingBottom: "1.25rem"
        },
        marginTop: {
            marginTop: "0.5rem"
        },
        allCheckBox: {
            display: "block",
            position: "relative",
            paddingTop: "1.25rem",
            paddingBottom: "0.938rem",
            paddingRight: "0.5rem",
            // marginBottom: "1rem",
            // padding: 0,
            ".mantine-Checkbox-label": {
                color: theme.colors.gray[3]
            }
        },
        allCheckBoxIcon: {
            width: "100%"
        }
    }));

// EXTERNAL MODULE: ./constants/category.tsx
var category = __webpack_require__(7466);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./components/common/InvisibleButton/InvisibleButton.tsx + 1 modules
var InvisibleButton = __webpack_require__(5938);
;// CONCATENATED MODULE: ./components/pages/community/CommunityCategory/CommunityCategory.tsx








function CommunityCategory({ onCategoryChange }) {
    const { classes, cx } = useCommunityCategoryStyles();
    const categoryNames = category/* Values */.$m.reduce((acc, cur)=>[
            ...acc,
            ...cur.map((item)=>item.label)
        ], []);
    const [checked, checkedHandler] = (0,hooks_.useListState)(categoryNames);
    (0,external_react_.useEffect)(()=>{
        onCategoryChange?.(checked);
    }, [
        checked
    ]);
    // 카테고리 모두 선택/해제 관련
    const [state, setState] = (0,hooks_.useSetState)({
        checked: false,
        isChanging: false
    });
    let allCheckBox = new Array(category/* CategoryNum */.aq);
    let CategoryItems = new Array(category/* CategoryNum */.aq);
    for(let i = 0; i < category/* CategoryNum */.aq; i++){
        const [values, handlers] = (0,hooks_.useListState)(category/* Values */.$m[i]); // useListState : list처럼 작동하게 하는 듯
        const [opened, { toggle }] = (0,hooks_.useDisclosure)(false);
        const allChecked = values.every((value)=>value.checked); // every : 모든 요소가 true면 true 반환
        const indeterminate = values.some((value)=>value.checked) && !allChecked;
        allCheckBox[i] = allChecked;
        const Items = values.map((value, index)=>{
            return /*#__PURE__*/ jsx_runtime.jsx(core_.Group, {
                spacing: "xs",
                children: /*#__PURE__*/ jsx_runtime.jsx(core_.Checkbox, {
                    label: value.label,
                    checked: value.checked,
                    onChange: (event)=>{
                        const checked = event.currentTarget.checked; // checkbox가 checked인지 반환
                        handlers.setItemProp(index, "checked", checked); // 해당 index의 checked 속성을 checked로 설정
                        if (checked) checkedHandler.append(value.label); // 만약 checked이면 checkHandler에 value.label 추가
                        else checkedHandler.filter((item)=>item !== value.label); // 아니면 checkHandler에서 value.label 제거
                    }
                }, value.key)
            });
        });
        const ChangeCategoryItems = ()=>{
            // onChange : 체크 상태가 변경되면 이벤트 발생
            handlers.setState((current)=>current.map((value)=>({
                        ...value,
                        checked: !allChecked
                    }))); // handler가 현재 상태 배열을 받아서 각 value의 checked 속성을 반전시킴.
            if (allChecked) checkedHandler.filter((item)=>values.every((value)=>value.label !== item));
            else checkedHandler.append(...values.map((value)=>value.label).filter((item)=>!checked.includes(item)));
        // values 배열의 각 요소의 label 속성을 추출하고, 
        // 이 중 checked 배열에 포함되지 않은 요소들을 checkedHandler 배열에 추가
        };
        CategoryItems[i] = /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Box, {
            className: classes.CheckboxGroup,
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Group, {
                    position: "apart",
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx(core_.Checkbox, {
                            display: "inline-block",
                            checked: allChecked,
                            indeterminate: indeterminate,
                            label: category/* Category */.WD[i],
                            transitionDuration: 0,
                            onChange: ChangeCategoryItems
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Button, {
                            onClick: toggle,
                            variant: "white",
                            className: classes.DropDownButton,
                            children: [
                                opened && /*#__PURE__*/ jsx_runtime.jsx(icons_react_.IconChevronUp, {
                                    stroke: 1.5,
                                    color: "#000"
                                }),
                                !opened && /*#__PURE__*/ jsx_runtime.jsx(icons_react_.IconChevronDown, {
                                    stroke: 1.5,
                                    color: "#000"
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime.jsx(core_.Container, {
                    className: classes.CheckboxItems,
                    children: /*#__PURE__*/ jsx_runtime.jsx(core_.Collapse, {
                        in: opened,
                        className: classes.marginTop,
                        children: /*#__PURE__*/ jsx_runtime.jsx(core_.Stack, {
                            spacing: "sm",
                            children: Items
                        })
                    })
                })
            ]
        });
        // 카테고리 모두 선택/해제 관련
        if (state.isChanging) {
            if (allChecked != state.checked) {
                ChangeCategoryItems();
            }
            setState({
                isChanging: false
            });
        }
    }
    const allTrue = allCheckBox.every((item)=>item === true);
    if (!state.checked && allTrue) {
        setState({
            checked: true
        });
    } else if (!allTrue && state.checked) {
        setState({
            checked: false
        });
    }
    const CheckboxIcon = ({ indeterminate, className })=>indeterminate ? /*#__PURE__*/ jsx_runtime.jsx(icons_react_.IconChecks, {
            size: 15,
            stroke: 3,
            className: cx(className, classes.allCheckBoxIcon)
        }) : /*#__PURE__*/ jsx_runtime.jsx(icons_react_.IconChecks, {
            size: 15,
            stroke: 3,
            className: cx(className, classes.allCheckBoxIcon)
        });
    const AllCheckBox = /*#__PURE__*/ jsx_runtime.jsx(core_.Checkbox, {
        className: classes.allCheckBox,
        icon: CheckboxIcon,
        color: "cyan",
        // label="카테고리 모두 선택/해제"
        checked: state.checked,
        onChange: ()=>{
            setState((current)=>({
                    checked: current.checked ? false : true
                }));
            setState({
                isChanging: true
            });
        }
    });
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Container, {
        className: classes.CategoryContainer,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Group, {
                position: "apart",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(core_.Text, {
                        className: classes.CategoryText,
                        children: "카테고리"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(InvisibleButton/* default */.Z, {
                        children: AllCheckBox
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx(core_.Stack, {
                align: "flex-start",
                spacing: "md",
                className: classes.PaddingBottom,
                children: CategoryItems
            })
        ]
    });
}


/***/ }),

/***/ 2307:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ CommunityLayout_CommunityLayout)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "@mantine/core"
var core_ = __webpack_require__(2247);
;// CONCATENATED MODULE: ./components/pages/community/CommunityLayout/CommunityLayout.styles.tsx

const useCommunityLayoutStyles = (0,core_.createStyles)((theme)=>({
        container: {
            display: "flex",
            width: "100%",
            gap: 83,
            height: "100%"
        },
        leftMainContainer: {
            display: "flex",
            padding: 20,
            flexGrow: 1,
            gap: 39
        },
        leftContainer: {
            margin: 0,
            width: 260
        },
        mainContainer: {
            width: 616,
            margin: 0
        },
        rightContainer: {
            width: 260,
            margin: 0
        }
    }));

;// CONCATENATED MODULE: ./components/pages/community/CommunityLayout/CommunityLayout.tsx


function CommunityLayout({ children, leftSection, rightSection }) {
    const { classes } = useCommunityLayoutStyles();
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: classes.container,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: classes.leftMainContainer,
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                        className: classes.leftContainer,
                        children: leftSection
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                        className: classes.mainContainer,
                        children: children
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: classes.rightContainer,
                children: rightSection
            })
        ]
    });
}
/* harmony default export */ const CommunityLayout_CommunityLayout = (CommunityLayout);


/***/ }),

/***/ 9090:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  C: () => (/* binding */ LoadingPost)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "@mantine/core"
var core_ = __webpack_require__(2247);
// EXTERNAL MODULE: ./components/common/CardContainer/CardContainer.tsx + 1 modules
var CardContainer = __webpack_require__(1576);
;// CONCATENATED MODULE: ./components/pages/community/LoadingPost/LoadingPost.styles.tsx

const useLoadingPostStyles = (0,core_.createStyles)((theme)=>({
        postContainer: {
            width: 616,
            padding: 25
        },
        content: {
            position: "relative",
            borderBottom: "none",
            width: "100%",
            padding: 0
        }
    }));

;// CONCATENATED MODULE: ./components/pages/community/LoadingPost/LoadingPost.tsx




function LoadingPost() {
    const { classes } = useLoadingPostStyles();
    return /*#__PURE__*/ jsx_runtime.jsx(CardContainer/* default */.Z, {
        className: classes.postContainer,
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Stack, {
            spacing: 14,
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Group, {
                    position: "apart",
                    align: "flex-start",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Group, {
                            spacing: 14,
                            children: [
                                /*#__PURE__*/ jsx_runtime.jsx(core_.Skeleton, {
                                    height: 46,
                                    circle: true
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Stack, {
                                    spacing: 5,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime.jsx(core_.Skeleton, {
                                            height: 16,
                                            width: 100,
                                            radius: "sm"
                                        }),
                                        /*#__PURE__*/ jsx_runtime.jsx(core_.Skeleton, {
                                            height: 12,
                                            width: 150,
                                            radius: "sm"
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx(core_.Skeleton, {
                            height: 12,
                            width: 30,
                            radius: "sm"
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime.jsx(core_.Container, {
                    className: classes.content,
                    children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Stack, {
                        spacing: 8,
                        h: 157,
                        justify: "center",
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx(core_.Skeleton, {
                                height: 16,
                                radius: "sm"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx(core_.Skeleton, {
                                height: 16,
                                radius: "sm"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx(core_.Skeleton, {
                                height: 16,
                                radius: "sm"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx(core_.Skeleton, {
                                height: 16,
                                radius: "sm"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx(core_.Skeleton, {
                                height: 16,
                                radius: "sm"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx(core_.Skeleton, {
                                height: 16,
                                radius: "sm"
                            })
                        ]
                    })
                })
            ]
        })
    });
}


/***/ }),

/***/ 3440:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_getRelativeTime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4906);
/* harmony import */ var _common_UserInfo_UserInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5816);




function PostHeader({ user, date }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
        position: "apart",
        align: "flex-start",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_common_UserInfo_UserInfo__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                user: user
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                size: "xs",
                color: "gray",
                children: (0,_utils_getRelativeTime__WEBPACK_IMPORTED_MODULE_3__/* .getRelativeTime */ .n)(date)
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PostHeader);


/***/ }),

/***/ 923:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ usePostViewerStyles)
/* harmony export */ });
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_0__);

const usePostViewerStyles = (0,_mantine_core__WEBPACK_IMPORTED_MODULE_0__.createStyles)((theme, { maxContentHeight })=>({
        postContainer: {
            width: 616,
            padding: 25
        },
        contentWrapper: {
            position: "relative",
            overflow: "hidden",
            maxHeight: maxContentHeight,
            borderBottom: "none",
            width: "100%",
            padding: 0,
            "&::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "2em",
                background: "linear-gradient(to bottom, rgba(252, 252, 254, 0), rgba(252, 252, 254, 1) 100%)"
            }
        },
        content: {
            lineHeight: 1.5,
            maxHeight: maxContentHeight,
            overflow: "hidden",
            borderBottom: "none",
            paddingBottom: "1.5rem",
            "*": {
                marginBottom: "0px !important"
            }
        },
        thumbnail: {
            background: theme.colors.gray[8],
            borderRadius: 15,
            maxWidth: "100%",
            overflow: "hidden"
        },
        multiSelect: {
            ".mantine-MultiSelect-values": {
                backgroundColor: "transparent"
            },
            ".mantine-MultiSelect-input": {
                padding: 0,
                border: "none",
                backgroundColor: "transparent"
            }
        },
        modal: {
            ".mantine-Modal-body": {
                padding: 0
            },
            ".mantine-Modal-header": {
                display: "none"
            },
            "	.mantine-Modal-content": {
                borderRadius: 15
            }
        },
        imageModal: {
            ".mantine-Modal-content": {
                backgroundColor: "transparent",
                boxShadow: "none"
            }
        },
        heartFilled: {
            marginLeft: "0.1rem",
            marginRight: "0.1rem"
        }
    }));


/***/ }),

/***/ 2048:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZP: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   tC: () => (/* binding */ ModalContext),
/* harmony export */   z2: () => (/* binding */ provideText)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _PostHeader_PostHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3440);
/* harmony import */ var _PostViewer_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(923);
/* harmony import */ var _mantine_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(32);
/* harmony import */ var _mantine_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mantine_hooks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _common_CardContainer_CardContainer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1576);
/* harmony import */ var _common_PhotoViewer_PhotoViewer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3727);
/* harmony import */ var _utils_api_ViewPhotos__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(9929);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _constants_category__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7466);
/* harmony import */ var _utils_api_onLikeClick__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6350);
/* harmony import */ var _pages_community__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(4357);
/* harmony import */ var _hooks_useAuth__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(8823);
/* harmony import */ var _tabler_icons_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(2236);
/* harmony import */ var _tabler_icons_react__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _common_InvisibleButton_InvisibleButton__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5938);
/* harmony import */ var _utils_notifications__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(8233);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils_api_onLikeClick__WEBPACK_IMPORTED_MODULE_10__, _pages_community__WEBPACK_IMPORTED_MODULE_11__, _hooks_useAuth__WEBPACK_IMPORTED_MODULE_12__]);
([_utils_api_onLikeClick__WEBPACK_IMPORTED_MODULE_10__, _pages_community__WEBPACK_IMPORTED_MODULE_11__, _hooks_useAuth__WEBPACK_IMPORTED_MODULE_12__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);

















const ModalContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_8__.createContext)({
    canCloseModal: ()=>{}
});
// HTML 태그 제거 및 문자열 길이를 제한하는 함수
function extractText(htmlString) {
    const cleanHtml = htmlString.replace(/<.*?>/g, "");
    let truncatedText = cleanHtml.slice(0, 20);
    if (cleanHtml.length > 20) {
        truncatedText += "...";
    }
    return truncatedText;
}
// 사용할 <Text>를 반환하는 함수
function provideText(post) {
    if (post.parent?.title !== null) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
            color: "#228be6",
            children: post.parent?.title
        });
    } else if (post.parent?.content === null || post.parent?.content === undefined) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
            color: "#ced4da",
            children: "(삭제된 게시물 입니다.)"
        });
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
        color: "#228be6",
        children: extractText(post.parent?.content)
    });
}
function PostViewer({ post, thumbnailUrl }) {
    const maxContentHeight = thumbnailUrl ? 50 : 150;
    const { classes } = (0,_PostViewer_styles__WEBPACK_IMPORTED_MODULE_3__/* .usePostViewerStyles */ .O)({
        maxContentHeight
    });
    const [opening, handlers] = (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_4__.useDisclosure)(false); // modal of PhotoViewer
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_7__.useRouter)();
    const { user, token, openSignInModal } = (0,_hooks_useAuth__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z)();
    const [state, setState] = (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_4__.useSetState)({
        modalClickOutside: true
    });
    const imageSrcArray = (0,_utils_api_ViewPhotos__WEBPACK_IMPORTED_MODULE_16__/* .extractImageSrc */ .bu)(post.content);
    const removeImgTag = (0,_utils_api_ViewPhotos__WEBPACK_IMPORTED_MODULE_16__/* .removeImgTags */ .ab)(post.content);
    const canCloseModal = ()=>{
        (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_4__.useSetState)((prevState)=>({
                modalClickOutside: !prevState.modalClickOutside
            }));
    };
    const modalRef = (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_4__.useClickOutside)(()=>{
        if (state.modalClickOutside === false) {
            (0,_utils_notifications__WEBPACK_IMPORTED_MODULE_15__/* .showError */ .x2)("수정 중에는 게시글을 떠날 수 없습니다.", null);
        }
    });
    // 모든 Category 이름 배열로 반환
    const data = [];
    for(let i = 0; i < _constants_category__WEBPACK_IMPORTED_MODULE_9__/* .CategoryNum */ .aq; i++){
        const values = _constants_category__WEBPACK_IMPORTED_MODULE_9__/* .Values */ .$m[i];
        values.forEach((value)=>{
            data.push(value.label);
        });
    }
    // boards/likedUsers에 현재 user-id가 들어있는 지 확인
    const isliking = post.like;
    // post가 post인지 child인지 확인
    const postType = post.parent ? "child" : "post";
    console.log("postType", postType, post);
    const { mutatePost } = (0,react__WEBPACK_IMPORTED_MODULE_8__.useContext)(_pages_community__WEBPACK_IMPORTED_MODULE_11__.CommunityContext);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ModalContext.Provider, {
        value: {
            canCloseModal
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.UnstyledButton, {
            onClick: ()=>{
                router.push(`/community/${post.id}`);
            },
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_common_CardContainer_CardContainer__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                className: classes.postContainer,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                    spacing: 14,
                    children: [
                        postType === "child" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_common_InvisibleButton_InvisibleButton__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z, {
                            center: false,
                            onClick: (e)=>{
                                e.stopPropagation();
                                router.replace(`http://localhost:3000/community/${post.parent?.id}`);
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                                spacing: 0,
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_13__.IconChevronLeft, {
                                        color: "#228be6"
                                    }),
                                    provideText(post)
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_PostHeader_PostHeader__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                            user: post.author,
                            date: post.createdAt
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                            spacing: 7,
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Title, {
                                    order: 3,
                                    children: post.title
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Container, {
                                    className: classes.contentWrapper,
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.TypographyStylesProvider, {
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: classes.content,
                                            dangerouslySetInnerHTML: {
                                                __html: removeImgTag
                                            }
                                        })
                                    })
                                }),
                                thumbnailUrl && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Modal, {
                                            opened: opening,
                                            onClose: handlers.close,
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                            },
                                            size: "49.375rem",
                                            padding: 0,
                                            centered: true,
                                            className: classes.imageModal,
                                            withCloseButton: false,
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_common_PhotoViewer_PhotoViewer__WEBPACK_IMPORTED_MODULE_6__/* .PhotoViewer */ .h, {
                                                imageSrc: imageSrcArray
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Image, {
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                handlers.open();
                                            },
                                            src: thumbnailUrl,
                                            alt: "thumbnail",
                                            width: "100%",
                                            height: 300,
                                            fit: "contain",
                                            className: classes.thumbnail
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.MultiSelect, {
                                    className: classes.multiSelect,
                                    data: data,
                                    value: post.categories.map((item)=>item.name),
                                    readOnly: true
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                                    spacing: 13,
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                                            spacing: 8,
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_13__.IconMessage, {
                                                    size: 20,
                                                    stroke: 1.3
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                                    fz: "sm",
                                                    children: post.childCount
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                                            spacing: 8,
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_common_InvisibleButton_InvisibleButton__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z, {
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        if (!user) {
                                                            openSignInModal();
                                                            return;
                                                        }
                                                        (0,_utils_api_onLikeClick__WEBPACK_IMPORTED_MODULE_10__/* .onLikeClick */ .y)({
                                                            data: {
                                                                boardId: post.id,
                                                                token
                                                            }
                                                        }, isliking).then(()=>{
                                                            mutatePost();
                                                        }).catch((error)=>{
                                                        // 오류 처리
                                                        });
                                                    },
                                                    children: [
                                                        isliking && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Image, {
                                                            className: classes.heartFilled,
                                                            width: "1rem",
                                                            height: "0.9rem",
                                                            src: "/images/HeartFilled.svg"
                                                        }),
                                                        !isliking && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_13__.IconHeart, {
                                                            size: 20,
                                                            stroke: 1.3
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                                    fz: "sm",
                                                    children: post.likeCount
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_common_InvisibleButton_InvisibleButton__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z, {
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                            },
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_13__.IconShare, {
                                                size: 20,
                                                stroke: 1.3
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_common_InvisibleButton_InvisibleButton__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z, {
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                            },
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_13__.IconBookmark, {
                                                size: 20,
                                                stroke: 1.3
                                            })
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            })
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PostViewer);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9918:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ CategorySelector_CategorySelector)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "@mantine/core"
var core_ = __webpack_require__(2247);
;// CONCATENATED MODULE: ./components/pages/community/PostWriter/CategorySelector/CategorySelector.styles.tsx

const useCategorySelectorStyles = (0,core_.createStyles)((theme)=>({
        multiSelect: {
            ".mantine-MultiSelect-label": {
                marginBottom: 3
            }
        }
    }));

// EXTERNAL MODULE: ./constants/category.tsx
var category = __webpack_require__(7466);
;// CONCATENATED MODULE: ./components/pages/community/PostWriter/CategorySelector/CategorySelector.tsx




let data = new Array();
for(let i = 0; i < category/* CategoryNum */.aq; i++){
    const values = category/* Values */.$m[i];
    values.map((value)=>{
        data.push({
            value: value.label,
            label: value.label,
            group: category/* Category */.WD[i]
        });
    });
}
function CategorySelector({ ...others }) {
    const { classes } = useCategorySelectorStyles();
    return /*#__PURE__*/ jsx_runtime.jsx(core_.MultiSelect, {
        data: data,
        label: "카테고리",
        placeholder: "하나 이상의 카테고리를 선택해주세요.",
        className: classes.multiSelect,
        ...others
    });
}
/* harmony default export */ const CategorySelector_CategorySelector = (CategorySelector);


/***/ }),

/***/ 3748:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ useWriteWritingStyles)
/* harmony export */ });
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_0__);

const useWriteWritingStyles = (0,_mantine_core__WEBPACK_IMPORTED_MODULE_0__.createStyles)((theme)=>({
        container: {
            height: 74,
            display: "flex",
            overflow: "hidden",
            alignItems: "center",
            padding: "14px 18px",
            gap: 19
        },
        TextInput: {
            float: "left",
            flex: 1
        },
        erase: {
            display: "none"
        },
        avatarInWriting: {
            border: `1px solid ${theme.colors.gray[2]}`
        },
        editorModal: {
            ".mantine-Modal-body": {
                padding: 0
            },
            ".mantine-Modal-header": {
                display: "none"
            },
            "	.mantine-Modal-content": {
                borderRadius: 15
            }
        },
        editorContainer: {
            width: 800,
            padding: 19
        }
    }));


/***/ }),

/***/ 9456:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mantine_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(32);
/* harmony import */ var _mantine_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mantine_hooks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _PostWriter_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3748);
/* harmony import */ var _common_CardContainer_CardContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1576);
/* harmony import */ var _common_UserInfo_UserInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5816);
/* harmony import */ var _RichEditor_RichEditor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6883);
/* harmony import */ var _ButtonProgress_ButtonProgress__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4588);
/* harmony import */ var _CategorySelector_CategorySelector__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9918);
/* harmony import */ var _mantine_form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9445);
/* harmony import */ var _mantine_form__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_mantine_form__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _utils_api_uploadPost__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(1117);
/* harmony import */ var _utils_notifications__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(8233);
/* harmony import */ var _pages_community__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(4357);
/* harmony import */ var _hooks_useAuth__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(8823);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_RichEditor_RichEditor__WEBPACK_IMPORTED_MODULE_6__, _utils_api_uploadPost__WEBPACK_IMPORTED_MODULE_11__, _pages_community__WEBPACK_IMPORTED_MODULE_13__, _hooks_useAuth__WEBPACK_IMPORTED_MODULE_14__]);
([_RichEditor_RichEditor__WEBPACK_IMPORTED_MODULE_6__, _utils_api_uploadPost__WEBPACK_IMPORTED_MODULE_11__, _pages_community__WEBPACK_IMPORTED_MODULE_13__, _hooks_useAuth__WEBPACK_IMPORTED_MODULE_14__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


















function PostWriter() {
    const { classes } = (0,_PostWriter_styles__WEBPACK_IMPORTED_MODULE_3__/* .useWriteWritingStyles */ .X)();
    const [opened, { open, close }] = (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_2__.useDisclosure)(false);
    const isMobile = (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_2__.useMediaQuery)("(max-width: 50em)");
    const [content, setcontent] = (0,react__WEBPACK_IMPORTED_MODULE_10__.useState)("");
    const [title, settitle] = (0,react__WEBPACK_IMPORTED_MODULE_10__.useState)("");
    const form = (0,_mantine_form__WEBPACK_IMPORTED_MODULE_9__.useForm)({
        initialValues: {
            title: title,
            category: []
        }
    });
    const editorRef = (0,react__WEBPACK_IMPORTED_MODULE_10__.useRef)(null);
    const { mutatePost } = (0,react__WEBPACK_IMPORTED_MODULE_10__.useContext)(_pages_community__WEBPACK_IMPORTED_MODULE_13__.CommunityContext);
    const { token } = (0,_hooks_useAuth__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z)();
    const [isKeepMounted, setIsKeepMounted] = (0,react__WEBPACK_IMPORTED_MODULE_10__.useState)(true);
    const [categorychanged, setcategorychange] = (0,react__WEBPACK_IMPORTED_MODULE_10__.useState)(false);
    const { user, openSignInModal } = (0,_hooks_useAuth__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_common_CardContainer_CardContainer__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                className: classes.container,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Avatar, {
                        className: classes.avatarInWriting,
                        radius: "xl",
                        size: 46,
                        src: "https://avatars.githubusercontent.com/u/52057157?v=4"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.TextInput, {
                        placeholder: "새로운 글을 작성해보세요.",
                        pos: "relative",
                        onFocus: (e)=>{
                            e.currentTarget.blur();
                            setIsKeepMounted(true);
                            user ? open() : openSignInModal();
                        },
                        className: classes.TextInput,
                        value: form.values.title,
                        readOnly: true
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Modal, {
                opened: opened,
                onClose: close,
                fullScreen: isMobile,
                className: classes.editorModal,
                size: "auto",
                scrollAreaComponent: _mantine_core__WEBPACK_IMPORTED_MODULE_1__.ScrollArea.Autosize,
                centered: true,
                keepMounted: isKeepMounted,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("form", {
                    onSubmit: form.onSubmit((values)=>{
                        const content = editorRef.current.getHTML();
                        const postData = {
                            ...values,
                            content
                        };
                        if (categorychanged === false || postData.category.length === 0) {
                            (0,_utils_notifications__WEBPACK_IMPORTED_MODULE_12__/* .showNotification */ .c0)("카테고리 없음", "카테고리를 1개 이상 추가해주세요.");
                        } else if (postData.content === "<p></p>") {
                            (0,_utils_notifications__WEBPACK_IMPORTED_MODULE_12__/* .showNotification */ .c0)("본문 없음", "본문 내용을 추가해주세요.");
                        } else if (postData.title === "") {
                            (0,_utils_notifications__WEBPACK_IMPORTED_MODULE_12__/* .showNotification */ .c0)("제목 없음", "제목을 추가해주세요.");
                        } else {
                            (0,_utils_api_uploadPost__WEBPACK_IMPORTED_MODULE_11__/* .uploadPost */ .l)({
                                title: postData.title,
                                content: postData.content,
                                categoryNames: postData.category
                            }, token).then(()=>{
                                form.setFieldValue("title", "");
                                setIsKeepMounted(false);
                                close();
                                (0,_utils_notifications__WEBPACK_IMPORTED_MODULE_12__/* .showNotification */ .c0)("업로드 완료", "게시물이 성공적으로 게시되었습니다.");
                                mutatePost();
                                setcategorychange(false);
                            });
                        }
                    }),
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.FocusTrap, {
                        active: opened,
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                            className: classes.editorContainer,
                            spacing: 17,
                            children: [
                                user && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_common_UserInfo_UserInfo__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                    user: user
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.TextInput, {
                                    placeholder: "멋진 제목을 입력해주세요.",
                                    "data-autofocus": true,
                                    onKeyDown: (e)=>{
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                        }
                                    },
                                    ...form.getInputProps("title")
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_RichEditor_RichEditor__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                    content: content,
                                    ref: editorRef
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_CategorySelector_CategorySelector__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                                    onChange: (category)=>{
                                        form.setFieldValue("category", category);
                                        setcategorychange(true);
                                    }
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                                    position: "right",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ButtonProgress_ButtonProgress__WEBPACK_IMPORTED_MODULE_7__/* .ButtonProgress */ .w, {
                                        CloseModal: close,
                                        text: "글 작성",
                                        type: "submit"
                                    })
                                })
                            ]
                        })
                    })
                })
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PostWriter);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3011:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ SearchBar_SearchBar)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "@mantine/core"
var core_ = __webpack_require__(2247);
;// CONCATENATED MODULE: ./components/pages/community/SearchBar/SearchBar.styles.tsx

const useSearchBarStyles = (0,core_.createStyles)((theme)=>({
        container: {
            height: 46
        },
        input: {
            height: "100%",
            flexGrow: 1,
            ".mantine-TextInput-wrapper": {
                height: "100%",
                width: "100%"
            },
            ".mantine-TextInput-input": {
                height: "100%",
                borderRadius: "23px 0 0 23px",
                border: `1px solid ${theme.colors.gray[5]}`,
                borderRight: "none"
            }
        },
        searchButton: {
            backgroundColor: theme.colors.gray[2],
            border: `1px solid ${theme.colors.gray[5]}`,
            borderRadius: "0 23px 23px 0",
            width: 76,
            height: "100%"
        },
        searchIcon: {
            position: "relative",
            left: -3
        }
    }));

// EXTERNAL MODULE: external "@tabler/icons-react"
var icons_react_ = __webpack_require__(2236);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
;// CONCATENATED MODULE: ./components/pages/community/SearchBar/SearchBar.tsx






function SearchBar({ className, onSubmit, defaultValue }) {
    const { classes, cx } = useSearchBarStyles();
    const [search, setSearch] = (0,external_react_.useState)(defaultValue ?? "");
    const router = (0,router_.useRouter)();
    const searchQuery = router.query.search;
    (0,external_react_.useEffect)(()=>{
        setSearch(searchQuery?.toString() ?? "");
    }, [
        searchQuery
    ]);
    return /*#__PURE__*/ jsx_runtime.jsx("form", {
        onSubmit: (event)=>{
            event.preventDefault();
            onSubmit?.(search);
        },
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Group, {
            spacing: 0,
            className: cx(classes.container, className),
            children: [
                /*#__PURE__*/ jsx_runtime.jsx(core_.TextInput, {
                    placeholder: "검색어를 입력해주세요.",
                    className: classes.input,
                    value: search,
                    onChange: (event)=>setSearch(event.currentTarget.value)
                }),
                /*#__PURE__*/ jsx_runtime.jsx(core_.UnstyledButton, {
                    variant: "transparent",
                    className: classes.searchButton,
                    type: "submit",
                    children: /*#__PURE__*/ jsx_runtime.jsx(core_.Center, {
                        children: /*#__PURE__*/ jsx_runtime.jsx(icons_react_.IconSearch, {
                            className: classes.searchIcon
                        })
                    })
                })
            ]
        })
    });
}
/* harmony default export */ const SearchBar_SearchBar = (SearchBar);


/***/ }),

/***/ 6509:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ SearchTab_SearchTab)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "@mantine/core"
var core_ = __webpack_require__(2247);
;// CONCATENATED MODULE: ./components/pages/community/SearchTab/SearchTab.styles.tsx

const useSearchTabStyles = (0,core_.createStyles)((theme)=>({
        tabItem: {
            color: theme.colors.gray[6],
            fontSize: 20,
            width: 115
        },
        tabItemActive: {
            color: `${theme.colors.blue[6]} !important`
        },
        tabList: {
            width: "100%"
        },
        settingButton: {
            color: theme.colors.gray[6],
            backgroundColor: "white",
            fontSize: 20,
            fontWeight: 500,
            "&:hover": {
                backgroundColor: theme.colors.gray[1]
            }
        },
        dropdown: {
            padding: "20px 17px"
        },
        settingItem: {
            ".mantine-NativeSelect-label": {
                marginBottom: 10
            },
            ".mantine-NativeSelect-input": {
                color: theme.colors.gray[6],
                width: 100
            }
        }
    }));

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@tabler/icons-react"
var icons_react_ = __webpack_require__(2236);
;// CONCATENATED MODULE: ./components/pages/community/SearchTab/SearchTab.tsx





function SearchTab({ className, onChange }) {
    const { classes, cx } = useSearchTabStyles();
    const [tab, setTab] = (0,external_react_.useState)("post");
    return /*#__PURE__*/ jsx_runtime.jsx(core_.Tabs, {
        value: tab,
        onTabChange: (tabName)=>{
            setTab(tabName);
            onChange?.(tabName);
        },
        className: className,
        children: /*#__PURE__*/ jsx_runtime.jsx(core_.Tabs.List, {
            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Group, {
                position: "apart",
                className: classes.tabList,
                noWrap: true,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Group, {
                        spacing: 0,
                        noWrap: true,
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx(core_.Tabs.Tab, {
                                value: "post",
                                className: cx(classes.tabItem, tab === "post" && classes.tabItemActive),
                                children: "게시글"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx(core_.Tabs.Tab, {
                                value: "comment",
                                className: cx(classes.tabItem, tab === "comment" && classes.tabItemActive),
                                children: "댓글"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Menu, {
                        closeOnItemClick: false,
                        position: "right-start",
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx(core_.Menu.Target, {
                                children: /*#__PURE__*/ jsx_runtime.jsx(core_.Button, {
                                    leftIcon: /*#__PURE__*/ jsx_runtime.jsx(icons_react_.IconAdjustmentsHorizontal, {}),
                                    className: classes.settingButton,
                                    children: "검색 설정"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx(core_.Menu.Dropdown, {
                                className: classes.dropdown,
                                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Group, {
                                    spacing: 10,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime.jsx(core_.NativeSelect, {
                                            data: [
                                                "최신순",
                                                "조회순"
                                            ],
                                            label: "정렬 순서",
                                            className: classes.settingItem
                                        }),
                                        /*#__PURE__*/ jsx_runtime.jsx(core_.NativeSelect, {
                                            data: [
                                                "전체",
                                                "최근 1일",
                                                "최근 1주",
                                                "최근 1개월",
                                                "최근 1년"
                                            ],
                                            label: "기간",
                                            className: classes.settingItem
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                ]
            })
        })
    });
}
/* harmony default export */ const SearchTab_SearchTab = (SearchTab);


/***/ }),

/***/ 9827:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  K: () => (/* binding */ SideBar)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "@mantine/core"
var core_ = __webpack_require__(2247);
;// CONCATENATED MODULE: ./components/pages/community/sidebar/SideBar.styles.tsx

const useSideBarStyles = (0,core_.createStyles)((theme)=>({
        SideBarContainer: {
            width: "16.375rem",
            height: "100vh",
            position: "fixed",
            // flexShrink: 0,
            // background: "#F9FEFF",
            backgroundColor: "#F9FEFF",
            float: "right",
            padding: "0",
            boxShadow: "-4px 4px 4px 0px rgba(0, 0, 0, 0.50)"
        },
        SideBarName: {
            float: "left",
            width: "5rem",
            height: "1.4375rem",
            backgroundColor: "#9AE3EB",
            borderRadius: "0.3rem",
            marginTop: "1rem"
        },
        SideBarN: {
            marginTop: "0.2rem"
        },
        Search: {
            // paddingTop: "3rem",
            // paddingTop: "1rem",
            // paddingBottom: "1rem",
            // // backgroundImage:
            // //   "url(https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-256.png)",
            // width: "12.59619rem",
            // height: "2rem",
            // borderRadius: " 15px",
            // border: "1px solid #757575",
            // backgroundColor: "#F3F3F3",
            width: "12.59619rem",
            height: "2rem",
            ".mantine-TextInput-wrapper": {
                // paddingTop: "1rem",
                // paddingBottom: "1rem",
                borderRadius: " 15px",
                border: "1px solid #757575",
                backgroundColor: "#F3F3F3"
            },
            ".mantine-TextInput-input": {
                border: "none",
                backgroundColor: "transparent"
            }
        },
        Grouping: {
            marginBottom: "14rem",
            paddingLeft: "1rem"
        }
    }));

// EXTERNAL MODULE: external "@tabler/icons-react"
var icons_react_ = __webpack_require__(2236);
// EXTERNAL MODULE: ./components/common/InvisibleButton/InvisibleButton.tsx + 1 modules
var InvisibleButton = __webpack_require__(5938);
// EXTERNAL MODULE: external "@mantine/form"
var form_ = __webpack_require__(9445);
// EXTERNAL MODULE: ./utils/notifications.tsx
var notifications = __webpack_require__(8233);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
;// CONCATENATED MODULE: ./components/pages/community/sidebar/SideBar.tsx









function SideBar({ onSearchSubmit }) {
    const { classes, cx } = useSideBarStyles();
    const form = (0,form_.useForm)({
        initialValues: {
            searchKeyword: ""
        }
    });
    const router = (0,router_.useRouter)();
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Container, {
        className: classes.SideBarContainer,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Stack, {
                className: classes.Grouping,
                spacing: "1rem",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(core_.Center, {
                        className: classes.SideBarName,
                        children: /*#__PURE__*/ jsx_runtime.jsx(core_.Text, {
                            color: "white",
                            children: "검색"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("form", {
                        onSubmit: form.onSubmit((values)=>{
                            if (values.searchKeyword.trim() === "") {
                                (0,notifications/* showError */.x2)("검색어를 입력해주세요.", "검색 창에 아무 내용도 입력하지 않으셨습니다.");
                            } else {
                                onSearchSubmit?.(values.searchKeyword);
                                router.replace(`http://localhost:3000/community?search=${values.searchKeyword}`);
                            }
                        }),
                        children: /*#__PURE__*/ jsx_runtime.jsx(core_.TextInput, {
                            ...form.getInputProps("searchKeyword"),
                            onSubmit: (event)=>{
                                alert(event.currentTarget.value);
                            },
                            icon: /*#__PURE__*/ jsx_runtime.jsx(icons_react_.IconSearch, {
                                size: "1rem"
                            }),
                            rightSection: /*#__PURE__*/ jsx_runtime.jsx(InvisibleButton/* default */.Z, {
                                children: /*#__PURE__*/ jsx_runtime.jsx(icons_react_.IconX, {
                                    onClick: (event)=>form.setFieldValue("searchKeyword", "")
                                })
                            }),
                            // value={value} //이거 왜 있는지 모르겠어서 일단 살려둠
                            placeholder: "검색 부탁드립니다!",
                            className: classes.Search
                        })
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx("br", {}),
            /*#__PURE__*/ jsx_runtime.jsx("br", {}),
            /*#__PURE__*/ jsx_runtime.jsx(core_.Container, {
                className: classes.Grouping,
                children: /*#__PURE__*/ jsx_runtime.jsx(core_.Center, {
                    className: classes.SideBarName,
                    children: /*#__PURE__*/ jsx_runtime.jsx(core_.Text, {
                        color: "white",
                        children: "테마"
                    })
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx("br", {}),
            /*#__PURE__*/ jsx_runtime.jsx("br", {}),
            /*#__PURE__*/ jsx_runtime.jsx(core_.Container, {
                className: classes.Grouping
            })
        ]
    });
}


/***/ }),

/***/ 769:
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




const getKey = (pageIndex, previousPageData, categories, { search, parentId, boardType })=>{
    if (previousPageData && previousPageData.data.cursor.afterCursor === null) return null;
    let query = {
        categoryNames: categories.length > 0 ? categories.join(",") : null
    };
    if (search) query.q = search;
    if (boardType) query.boardType = boardType;
    if (pageIndex > 0) query.afterCursor = previousPageData?.data.cursor.afterCursor;
    const queryString = (0,querystring__WEBPACK_IMPORTED_MODULE_1__.stringify)(query);
    if (search) return `${"http://ec2-43-207-85-73.ap-northeast-1.compute.amazonaws.com:8000"}/community/board/search?${queryString}`;
    if (parentId) return `${"http://ec2-43-207-85-73.ap-northeast-1.compute.amazonaws.com:8000"}/community/board/getChild/${parentId}?${queryString}`;
    else return `${"http://ec2-43-207-85-73.ap-northeast-1.compute.amazonaws.com:8000"}/community/board?${queryString}`;
};
function useBoardList(categories, settings = {}) {
    const { token } = (0,_useAuth__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)();
    const response = (0,swr_infinite__WEBPACK_IMPORTED_MODULE_0__["default"])((pageIndex, previousPageData)=>getKey(pageIndex, previousPageData, categories, settings), (url)=>(0,_utils_fetcher__WEBPACK_IMPORTED_MODULE_2__/* .fetcher */ ._)(url, token));
    const isLast = response.data?.[response.data.length - 1]?.data.cursor?.afterCursor === null;
    const isEmpty = response.data?.[0]?.data.data.length === 0;
    return {
        ...response,
        isLast,
        isEmpty
    };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useBoardList);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4357:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommunityContext: () => (/* binding */ CommunityContext),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_pages_community_CommunityLayout_CommunityLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2307);
/* harmony import */ var _components_pages_community_PostWriter_PostWriter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9456);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_pages_community_PostViewer_PostViewer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2048);
/* harmony import */ var _components_pages_community_SearchBar_SearchBar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3011);
/* harmony import */ var _components_pages_community_SearchTab_SearchTab__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6509);
/* harmony import */ var _components_pages_community_sidebar_SideBar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9827);
/* harmony import */ var _hooks_useBoardList__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(769);
/* harmony import */ var _components_pages_community_LoadingPost_LoadingPost__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9090);
/* harmony import */ var _mantine_hooks__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(32);
/* harmony import */ var _mantine_hooks__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_mantine_hooks__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _constants_category__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(7466);
/* harmony import */ var _utils_api_ViewPhotos__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(9929);
/* harmony import */ var _components_pages_community_CommunityCategory_CommunityCategory__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(424);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_pages_community_PostWriter_PostWriter__WEBPACK_IMPORTED_MODULE_3__, _components_pages_community_PostViewer_PostViewer__WEBPACK_IMPORTED_MODULE_5__, _hooks_useBoardList__WEBPACK_IMPORTED_MODULE_9__]);
([_components_pages_community_PostWriter_PostWriter__WEBPACK_IMPORTED_MODULE_3__, _components_pages_community_PostViewer_PostViewer__WEBPACK_IMPORTED_MODULE_5__, _hooks_useBoardList__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
















const CommunityContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_12__.createContext)({
    mutatePost: ()=>{}
});
function Community() {
    const theme = (0,_mantine_core__WEBPACK_IMPORTED_MODULE_4__.useMantineTheme)();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const search = router.query.search;
    let data = new Array();
    for(let i = 0; i < _constants_category__WEBPACK_IMPORTED_MODULE_13__/* .CategoryNum */ .aq; i++){
        const values = _constants_category__WEBPACK_IMPORTED_MODULE_13__/* .Values */ .$m[i];
        values.map((value)=>{
            data.push(value.label);
        });
    }
    const [categorystrings, setcategory] = (0,react__WEBPACK_IMPORTED_MODULE_12__.useState)(data);
    const [tab, setTab] = (0,react__WEBPACK_IMPORTED_MODULE_12__.useState)("post");
    const { data: postData, isLoading: isPostLoading, setSize: setPostSize, mutate: mutatePost, isEmpty } = (0,_hooks_useBoardList__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z)(categorystrings, {
        search: search ? search.toString() : undefined,
        boardType: tab == "post" ? "parent" : "child"
    });
    const [{ y: scrollY }, scrollTo] = (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_11__.useWindowScroll)();
    const [scrollThreshold, setScrollThreshold] = (0,react__WEBPACK_IMPORTED_MODULE_12__.useState)(0);
    (0,react__WEBPACK_IMPORTED_MODULE_12__.useEffect)(()=>{
        if (scrollY >= scrollThreshold) {
            setPostSize((prev)=>prev + 1);
            setScrollThreshold((prev)=>prev + 1000);
            console.log("scroll");
        }
    }, [
        scrollY
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(CommunityContext.Provider, {
        value: {
            mutatePost
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_pages_community_CommunityLayout_CommunityLayout__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
            leftSection: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_4__.Stack, {
                spacing: 16,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_pages_community_CommunityCategory_CommunityCategory__WEBPACK_IMPORTED_MODULE_14__/* .CommunityCategory */ .x, {
                    onCategoryChange: (category)=>{
                        setcategory(category);
                    }
                })
            }),
            rightSection: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_pages_community_sidebar_SideBar__WEBPACK_IMPORTED_MODULE_8__/* .SideBar */ .K, {
                onSearchSubmit: (text)=>{
                    console.log(text);
                }
            }),
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_4__.Stack, {
                spacing: 50,
                children: [
                    search ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_4__.Stack, {
                        spacing: 20,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_pages_community_SearchBar_SearchBar__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                defaultValue: search.toString(),
                                onSubmit: (text)=>{
                                    router.push(`?search=${text}`);
                                }
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_pages_community_SearchTab_SearchTab__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                                onChange: (tab)=>{
                                    setTab(tab);
                                }
                            }),
                            isEmpty && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_4__.Text, {
                                color: theme.colors.gray[4],
                                children: [
                                    "'",
                                    search.toString(),
                                    "'로 검색된 결과가 없습니다."
                                ]
                            })
                        ]
                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_pages_community_PostWriter_PostWriter__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {}),
                    postData?.map((data)=>{
                        return data.data.data.map((data)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_pages_community_PostViewer_PostViewer__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .ZP, {
                                post: data,
                                thumbnailUrl: (0,_utils_api_ViewPhotos__WEBPACK_IMPORTED_MODULE_15__/* .extractThumbnailUrl */ .Z7)(data)
                            }, data.id));
                    }),
                    isPostLoading && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_pages_community_LoadingPost_LoadingPost__WEBPACK_IMPORTED_MODULE_10__/* .LoadingPost */ .C, {})
                ]
            })
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Community);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6350:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ onLikeClick)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function onLikeClick({ data: { boardId, token } }, currentLike) {
    const url = `${"http://ec2-43-207-85-73.ap-northeast-1.compute.amazonaws.com:8000"}/community/board/${boardId}/like`; // PATCH 요청을 보낼 엔드포인트 URL
    const headers = {
        "Content-Type": "application/json",
        Authorization: `${token}`
    };
    try {
        let response;
        if (currentLike) {
            response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"]["delete"](url, {
                headers
            });
        } else {
            response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(url, {}, {
                headers
            });
        }
        return response.data;
    } catch (error) {
        // 오류 처리
        throw error;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1117:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ uploadPost)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function uploadPost(post, token) {
    const { data } = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(`${"http://ec2-43-207-85-73.ap-northeast-1.compute.amazonaws.com:8000"}/community/board`, post, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`
        }
    });
    return data;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;