"use strict";
exports.id = 688;
exports.ids = [688];
exports.modules = {

/***/ 4920:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ useRichTextEditorControlGroupStyles)
/* harmony export */ });
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_0__);

const useRichTextEditorControlGroupStyles = (0,_mantine_core__WEBPACK_IMPORTED_MODULE_0__.createStyles)((theme)=>({
        photoButton: {
            color: "black",
            borderRadius: "0.25rem 0 0 0.25rem",
            border: `1px solid ${theme.colors.gray[4]}`,
            borderRight: "none",
            "&:hover": {
                backgroundColor: theme.colors.gray[0]
            },
            "&:active": {
                transform: "none !important"
            }
        }
    }));


/***/ }),

/***/ 4118:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mantine_tiptap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9975);
/* harmony import */ var _mantine_tiptap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mantine_tiptap__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2236);
/* harmony import */ var _tabler_icons_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _RichTextEditorControlGroup_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4920);
/* harmony import */ var _mantine_dropzone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7932);
/* harmony import */ var _mantine_dropzone__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mantine_dropzone__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_notifications__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8233);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _utils_api_upload__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4189);
/* harmony import */ var _mantine_hooks__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(32);
/* harmony import */ var _mantine_hooks__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_mantine_hooks__WEBPACK_IMPORTED_MODULE_9__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils_api_upload__WEBPACK_IMPORTED_MODULE_8__]);
_utils_api_upload__WEBPACK_IMPORTED_MODULE_8__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];











function RichTextEditorControlGroup({ editor }) {
    const { classes } = (0,_RichTextEditorControlGroup_styles__WEBPACK_IMPORTED_MODULE_4__/* .useRichTextEditorControlGroupStyles */ .T)();
    const [imageUploading, setImageUploading] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(false);
    const [imagePopoverOpen, { toggle: toggleImagePopover, close: closeImagePopover }] = (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_9__.useDisclosure)();
    const uploadFileRef = (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_9__.useClickOutside)(()=>closeImagePopover());
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_tiptap__WEBPACK_IMPORTED_MODULE_2__.RichTextEditor.ControlsGroup, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_tiptap__WEBPACK_IMPORTED_MODULE_2__.RichTextEditor.Bold, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_tiptap__WEBPACK_IMPORTED_MODULE_2__.RichTextEditor.Italic, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_tiptap__WEBPACK_IMPORTED_MODULE_2__.RichTextEditor.Underline, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_tiptap__WEBPACK_IMPORTED_MODULE_2__.RichTextEditor.Strikethrough, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_tiptap__WEBPACK_IMPORTED_MODULE_2__.RichTextEditor.Code, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_tiptap__WEBPACK_IMPORTED_MODULE_2__.RichTextEditor.CodeBlock, {
                        icon: ()=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__.IconCodeDots, {
                                size: 16,
                                stroke: 2
                            })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_tiptap__WEBPACK_IMPORTED_MODULE_2__.RichTextEditor.ControlsGroup, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_tiptap__WEBPACK_IMPORTED_MODULE_2__.RichTextEditor.Hr, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_tiptap__WEBPACK_IMPORTED_MODULE_2__.RichTextEditor.Subscript, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_tiptap__WEBPACK_IMPORTED_MODULE_2__.RichTextEditor.Superscript, {})
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_tiptap__WEBPACK_IMPORTED_MODULE_2__.RichTextEditor.ControlsGroup, {
                ref: uploadFileRef,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Popover, {
                        width: 600,
                        position: "bottom",
                        withArrow: true,
                        shadow: "md",
                        opened: imagePopoverOpen,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Popover.Target, {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.ActionIcon, {
                                    variant: "outline",
                                    className: classes.photoButton,
                                    size: 26,
                                    onClick: toggleImagePopover,
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__.IconPhoto, {
                                        size: 16,
                                        stroke: 1
                                    })
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Popover.Dropdown, {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_dropzone__WEBPACK_IMPORTED_MODULE_5__.Dropzone, {
                                    onDrop: async (files)=>{
                                        setImageUploading(true);
                                        const uploadPromises = files.map((file)=>(0,_utils_api_upload__WEBPACK_IMPORTED_MODULE_8__/* .uploadImage */ .I)(file).catch((e)=>{
                                                (0,_utils_notifications__WEBPACK_IMPORTED_MODULE_6__/* .showError */ .x2)(`${file.name} 업로드중 문제가 발생했습니다.`, "잠시 후 다시 시도해주세요.");
                                                return Promise.resolve(null);
                                            }));
                                        const uploadResults = await Promise.all(uploadPromises);
                                        const urls = uploadResults.filter((result)=>result !== null).map(({ data: { url } })=>url);
                                        setImageUploading(false);
                                        const { state } = editor.view;
                                        let { tr } = state;
                                        const pos = state.selection.to;
                                        urls.reverse().forEach((url, index)=>{
                                            console.log(url);
                                            const node = state.schema.nodes.image.create({
                                                src: url
                                            });
                                            tr.insert(pos + index, node);
                                        });
                                        editor?.view.dispatch(tr);
                                        editor?.view.focus();
                                        closeImagePopover();
                                    },
                                    onReject: ()=>{
                                        (0,_utils_notifications__WEBPACK_IMPORTED_MODULE_6__/* .showError */ .x2)("이미지 형식이 올바르지 않습니다.", "5MB, 10개 이하의 올바른 이미지 파일을 첨부해주세요.");
                                    },
                                    maxSize: 5 * 1024 ** 2,
                                    accept: _mantine_dropzone__WEBPACK_IMPORTED_MODULE_5__.IMAGE_MIME_TYPE,
                                    loading: imageUploading,
                                    maxFiles: 10,
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                                        position: "center",
                                        spacing: "xl",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_dropzone__WEBPACK_IMPORTED_MODULE_5__.Dropzone.Accept, {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__.IconUpload, {
                                                    size: "3.2rem",
                                                    stroke: 1.5
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_dropzone__WEBPACK_IMPORTED_MODULE_5__.Dropzone.Reject, {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__.IconX, {
                                                    size: "3.2rem",
                                                    stroke: 1.5
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_dropzone__WEBPACK_IMPORTED_MODULE_5__.Dropzone.Idle, {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__.IconPhoto, {
                                                    size: "3.2rem",
                                                    stroke: 1.5
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                                spacing: 5,
                                                align: "center",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                                        size: "xl",
                                                        inline: true,
                                                        children: "클릭하거나 파일을 드래그하여 업로드"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                                        size: "sm",
                                                        color: "dimmed",
                                                        inline: true,
                                                        mt: 7,
                                                        children: "파일을 여러 개 첨부할 수 있습니다 (최대 10개). 각 파일의 크기는 5MB를 초과할 수 없습니다."
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_tiptap__WEBPACK_IMPORTED_MODULE_2__.RichTextEditor.Link, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_tiptap__WEBPACK_IMPORTED_MODULE_2__.RichTextEditor.Unlink, {})
                ]
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RichTextEditorControlGroup);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4588:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  w: () => (/* binding */ ButtonProgress)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@mantine/core"
var core_ = __webpack_require__(2247);
;// CONCATENATED MODULE: ./components/pages/community/PostWriter/ButtonProgress/ButtonProgress.styles.tsx

const useButtonProgressStyles = (0,core_.createStyles)((theme)=>({
        button: {
            position: "relative",
            transition: "background-color 150ms ease",
            width: 120
        },
        progress: {
            ...theme.fn.cover(-1),
            height: "auto",
            backgroundColor: "transparent",
            zIndex: 0
        },
        label: {
            position: "relative",
            zIndex: 1,
            fontWeight: "normal"
        }
    }));

;// CONCATENATED MODULE: ./components/pages/community/PostWriter/ButtonProgress/ButtonProgress.tsx




function ButtonProgress({ CloseModal, text, ...others }) {
    const { classes, theme } = useButtonProgressStyles();
    const [progress, setProgress] = (0,external_react_.useState)(0);
    const [loaded, setLoaded] = (0,external_react_.useState)(false);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Button, {
        className: classes.button,
        //   setLoaded(false) <--원래 null자리
        color: loaded ? "teal" : theme.primaryColor,
        ...others,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: classes.label,
                children: text
            }),
            progress !== 0 && /*#__PURE__*/ jsx_runtime.jsx(core_.Progress, {
                value: progress,
                color: theme.fn.rgba(theme.colors[theme.primaryColor][2], 0.35),
                radius: "sm"
            })
        ]
    });
}


/***/ }),

/***/ 2827:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ useRichEditorStyles)
/* harmony export */ });
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_0__);

const useRichEditorStyles = (0,_mantine_core__WEBPACK_IMPORTED_MODULE_0__.createStyles)((theme)=>({
        editor: {
            minHeight: 300
        }
    }));


/***/ }),

/***/ 6883:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _mantine_tiptap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9975);
/* harmony import */ var _mantine_tiptap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mantine_tiptap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tiptap_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3348);
/* harmony import */ var _tiptap_extension_highlight__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3706);
/* harmony import */ var _tiptap_starter_kit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8910);
/* harmony import */ var _tiptap_extension_underline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7828);
/* harmony import */ var _tiptap_extension_superscript__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3857);
/* harmony import */ var _tiptap_extension_subscript__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9574);
/* harmony import */ var _common_RichTextEditorControlGroup_RichTextEditorControlGroup__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4118);
/* harmony import */ var _RichEditor_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2827);
/* harmony import */ var _tiptap_extension_image__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4136);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _tiptap_extension_code_block_lowlight__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1512);
/* harmony import */ var lowlight__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(1360);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tiptap_react__WEBPACK_IMPORTED_MODULE_2__, _tiptap_extension_highlight__WEBPACK_IMPORTED_MODULE_3__, _tiptap_starter_kit__WEBPACK_IMPORTED_MODULE_4__, _tiptap_extension_underline__WEBPACK_IMPORTED_MODULE_5__, _tiptap_extension_superscript__WEBPACK_IMPORTED_MODULE_6__, _tiptap_extension_subscript__WEBPACK_IMPORTED_MODULE_7__, _common_RichTextEditorControlGroup_RichTextEditorControlGroup__WEBPACK_IMPORTED_MODULE_8__, _tiptap_extension_image__WEBPACK_IMPORTED_MODULE_10__, _tiptap_extension_code_block_lowlight__WEBPACK_IMPORTED_MODULE_12__, lowlight__WEBPACK_IMPORTED_MODULE_13__]);
([_tiptap_react__WEBPACK_IMPORTED_MODULE_2__, _tiptap_extension_highlight__WEBPACK_IMPORTED_MODULE_3__, _tiptap_starter_kit__WEBPACK_IMPORTED_MODULE_4__, _tiptap_extension_underline__WEBPACK_IMPORTED_MODULE_5__, _tiptap_extension_superscript__WEBPACK_IMPORTED_MODULE_6__, _tiptap_extension_subscript__WEBPACK_IMPORTED_MODULE_7__, _common_RichTextEditorControlGroup_RichTextEditorControlGroup__WEBPACK_IMPORTED_MODULE_8__, _tiptap_extension_image__WEBPACK_IMPORTED_MODULE_10__, _tiptap_extension_code_block_lowlight__WEBPACK_IMPORTED_MODULE_12__, lowlight__WEBPACK_IMPORTED_MODULE_13__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);














const RichEditor = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_11__.forwardRef)(({ content }, ref)=>{
    const editor = (0,_tiptap_react__WEBPACK_IMPORTED_MODULE_2__.useEditor)({
        extensions: [
            _tiptap_starter_kit__WEBPACK_IMPORTED_MODULE_4__["default"],
            _tiptap_extension_underline__WEBPACK_IMPORTED_MODULE_5__["default"],
            _mantine_tiptap__WEBPACK_IMPORTED_MODULE_1__.Link,
            _tiptap_extension_superscript__WEBPACK_IMPORTED_MODULE_6__["default"],
            _tiptap_extension_subscript__WEBPACK_IMPORTED_MODULE_7__["default"],
            _tiptap_extension_highlight__WEBPACK_IMPORTED_MODULE_3__["default"],
            _tiptap_extension_code_block_lowlight__WEBPACK_IMPORTED_MODULE_12__["default"].configure({
                lowlight: lowlight__WEBPACK_IMPORTED_MODULE_13__.lowlight
            }),
            _tiptap_extension_image__WEBPACK_IMPORTED_MODULE_10__["default"]
        ],
        content: content
    });
    const { classes } = (0,_RichEditor_styles__WEBPACK_IMPORTED_MODULE_9__/* .useRichEditorStyles */ .P)();
    (0,react__WEBPACK_IMPORTED_MODULE_11__.useImperativeHandle)(ref, ()=>({
            getHTML: ()=>{
                return editor?.getHTML();
            }
        }));
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_tiptap__WEBPACK_IMPORTED_MODULE_1__.RichTextEditor, {
        editor: editor,
        className: classes.editor,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_tiptap__WEBPACK_IMPORTED_MODULE_1__.RichTextEditor.Toolbar, {
                sticky: true,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_common_RichTextEditorControlGroup_RichTextEditorControlGroup__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                    editor: editor
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_tiptap__WEBPACK_IMPORTED_MODULE_1__.RichTextEditor.Content, {})
        ]
    });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RichEditor);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7466:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $m: () => (/* binding */ Values),
/* harmony export */   WD: () => (/* binding */ Category),
/* harmony export */   XF: () => (/* binding */ GAME_BOARD_CATEGORIES),
/* harmony export */   aq: () => (/* binding */ CategoryNum)
/* harmony export */ });
/* unused harmony exports DevelopValues, DesignValues, ContestValues, MusicValues, PublishingValues, InterfaceValues, StartUpValues, BasicValues */
/* harmony import */ var _mantine_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
/* harmony import */ var _mantine_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mantine_hooks__WEBPACK_IMPORTED_MODULE_0__);

const Category = new Array("개발", "디자인", "공모전", "음악", "퍼블리싱", "인터페이스", "창업", "입문");
const DevelopValues = [
    // { label: "Unity", checked: true, key: randomId() },
    // { label: "C#", checked: true, key: randomId() },
    // { label: "Python", checked: true, key: randomId() },
    {
        label: "자료",
        checked: true,
        key: (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_0__.randomId)()
    },
    {
        label: "정보",
        checked: true,
        key: (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_0__.randomId)()
    },
    {
        label: "질문",
        checked: true,
        key: (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_0__.randomId)()
    },
    {
        label: "개발일지",
        checked: true,
        key: (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_0__.randomId)()
    },
    {
        label: "홍보",
        checked: true,
        key: (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_0__.randomId)()
    }
];
const DesignValues = [
    {
        label: "캐릭터",
        checked: true,
        key: (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_0__.randomId)()
    },
    {
        label: "적",
        checked: true,
        key: (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_0__.randomId)()
    },
    {
        label: "배경",
        checked: true,
        key: (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_0__.randomId)()
    }
];
const ContestValues = [
    {
        label: "Unity 공모전",
        checked: true,
        key: (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_0__.randomId)()
    },
    {
        label: "C# 공모전",
        checked: true,
        key: (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_0__.randomId)()
    },
    {
        label: "Python 공모전",
        checked: true,
        key: (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_0__.randomId)()
    }
];
const MusicValues = [
    {
        label: "배경 음악",
        checked: true,
        key: (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_0__.randomId)()
    },
    {
        label: "효과음",
        checked: true,
        key: (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_0__.randomId)()
    }
];
const PublishingValues = [
    {
        label: "퍼블리싱",
        checked: true,
        key: (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_0__.randomId)()
    }
];
const InterfaceValues = [
    {
        label: "게임 시작",
        checked: true,
        key: (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_0__.randomId)()
    },
    {
        label: "설정",
        checked: true,
        key: (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_0__.randomId)()
    }
];
const StartUpValues = [
    {
        label: "팀원 모집",
        checked: true,
        key: (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_0__.randomId)()
    },
    {
        label: "자금",
        checked: true,
        key: (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_0__.randomId)()
    }
];
const BasicValues = [
    {
        label: "유니티 입문",
        checked: true,
        key: (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_0__.randomId)()
    },
    {
        label: "언리얼 입문",
        checked: true,
        key: (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_0__.randomId)()
    }
];
const Values = new Array(DevelopValues, DesignValues, ContestValues, MusicValues, PublishingValues, InterfaceValues, StartUpValues, BasicValues);
let a = Category.length;
let b = Values.length;
const CategoryNum = a == b ? a : a > b ? b : a;
const GAME_BOARD_CATEGORIES = [
    "공지사항",
    "업데이트",
    "개발일지",
    "리뷰",
    "공략",
    "뻘글"
];


/***/ }),

/***/ 4189:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ uploadImage)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function uploadImage(image) {
    const formData = new FormData();
    formData.append("image", image);
    const { data } = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(`${"http://ec2-43-207-85-73.ap-northeast-1.compute.amazonaws.com:8000"}/upload/image`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return data;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4906:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* binding */ getRelativeTime)
/* harmony export */ });
function getRelativeTime(date) {
    const currentDate = new Date();
    const diff = currentDate.getTime() - new Date(date).getTime() - 9 * 60 * 60 * 1000;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    if (seconds < 5) {
        return "방금 전";
    } else if (seconds < 60) {
        return `${seconds}초 전`;
    } else if (minutes < 60) {
        return `${minutes}분 전`;
    } else if (hours < 24) {
        return `${hours}시간 전`;
    } else if (days < 30) {
        return `${days}일 전`;
    } else if (months < 12) {
        return `${months}달 전`;
    } else {
        return `${years}년 전`;
    }
}


/***/ })

};
;