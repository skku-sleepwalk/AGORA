"use strict";
exports.id = 4;
exports.ids = [4];
exports.modules = {

/***/ 9842:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ AuthContext),
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_api_users__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9954);
/* harmony import */ var cookies_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5958);
/* harmony import */ var cookies_ts__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cookies_ts__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5941);
/* harmony import */ var _utils_fetcher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7967);
/* harmony import */ var _SignUpForm_SignUpForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2980);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _SignInForm_SignInForm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4822);
/* harmony import */ var _styles_resetStyle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5953);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils_api_users__WEBPACK_IMPORTED_MODULE_2__, swr__WEBPACK_IMPORTED_MODULE_4__, _utils_fetcher__WEBPACK_IMPORTED_MODULE_5__, _SignUpForm_SignUpForm__WEBPACK_IMPORTED_MODULE_6__, _SignInForm_SignInForm__WEBPACK_IMPORTED_MODULE_8__]);
([_utils_api_users__WEBPACK_IMPORTED_MODULE_2__, swr__WEBPACK_IMPORTED_MODULE_4__, _utils_fetcher__WEBPACK_IMPORTED_MODULE_5__, _SignUpForm_SignUpForm__WEBPACK_IMPORTED_MODULE_6__, _SignInForm_SignInForm__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










const AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    user: null,
    login: async ()=>null,
    logout: ()=>{},
    openSignInModal: ()=>{}
});
function AuthProvider({ children }) {
    const cookie = new (cookies_ts__WEBPACK_IMPORTED_MODULE_3___default())();
    const [token, setToken] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const { data: userData, mutate: mutateUser } = (0,swr__WEBPACK_IMPORTED_MODULE_4__["default"])(token ? `${"http://ec2-3-112-178-120.ap-northeast-1.compute.amazonaws.com:8000"}/users/me` : null, (url)=>(0,_utils_fetcher__WEBPACK_IMPORTED_MODULE_5__/* .fetcher */ ._)(url, token || undefined));
    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(userData?.data || null);
    const [signInModalOpened, setSignInModalOpened] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [signUpModalOpened, setSignUpModalOpened] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (userData) {
            setUser(userData.data);
        } else {
            setUser(null);
        }
    }, [
        userData
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const token = cookie.get("token");
        if (token) {
            setToken(token);
        }
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(AuthContext.Provider, {
        value: {
            user,
            token,
            login: async (email, password)=>{
                const response = await (0,_utils_api_users__WEBPACK_IMPORTED_MODULE_2__/* .login */ .x)(email, password).then((response)=>{
                    if (response) {
                        cookie.set("token", response.data.email, {
                            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                        });
                        setToken(response.data.email);
                        mutateUser();
                        location.reload();
                    // showNotification("로그인 완료!", "로그인이 완료되었습니다.");
                    }
                    return response;
                });
                return response;
            },
            logout: ()=>{
                setUser(null);
                cookie.remove("token");
                setToken(undefined);
                mutateUser();
                location.reload();
            },
            openSignInModal: ()=>{
                setSignInModalOpened(true);
            }
        },
        children: [
            children,
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_7__.Modal, {
                opened: signInModalOpened,
                withCloseButton: false,
                sx: _styles_resetStyle__WEBPACK_IMPORTED_MODULE_9__/* .resetModalStyles */ .w,
                centered: true,
                size: "auto",
                scrollAreaComponent: _mantine_core__WEBPACK_IMPORTED_MODULE_7__.ScrollArea.Autosize,
                onClose: ()=>setSignInModalOpened(false),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_SignInForm_SignInForm__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                    onSignUpClick: ()=>{
                        setSignUpModalOpened(true);
                        setSignInModalOpened(false);
                    },
                    onCompleted: ()=>{
                        setSignInModalOpened(false);
                    }
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_7__.Modal, {
                opened: signUpModalOpened,
                withCloseButton: false,
                sx: _styles_resetStyle__WEBPACK_IMPORTED_MODULE_9__/* .resetModalStyles */ .w,
                centered: true,
                size: "auto",
                scrollAreaComponent: _mantine_core__WEBPACK_IMPORTED_MODULE_7__.ScrollArea.Autosize,
                onClose: ()=>{
                    setSignInModalOpened(true);
                    setSignUpModalOpened(false);
                },
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_SignUpForm_SignUpForm__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                    onCompleted: ()=>{
                        setSignUpModalOpened(false);
                    }
                })
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthProvider);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5938:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ InvisibleButton_InvisibleButton)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "@mantine/core"
var core_ = __webpack_require__(2247);
;// CONCATENATED MODULE: ./components/common/InvisibleButton/InvisibleButton.styles.tsx

const useInvisibleButtonStyles = (0,core_.createStyles)((theme)=>({
        button: {
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            padding: 0,
            margin: 0,
            "&:active": {
                transform: "translateY(1px)"
            }
        }
    }));

;// CONCATENATED MODULE: ./components/common/InvisibleButton/InvisibleButton.tsx



function InvisibleButton({ children, className, center = true, ...others }) {
    const { classes, cx } = useInvisibleButtonStyles();
    return /*#__PURE__*/ jsx_runtime.jsx(core_.UnstyledButton, {
        className: cx(classes.button, className),
        ...others,
        children: center ? /*#__PURE__*/ jsx_runtime.jsx(core_.Center, {
            children: children
        }) : children
    });
}
/* harmony default export */ const InvisibleButton_InvisibleButton = (InvisibleButton);


/***/ }),

/***/ 2502:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ LoginForm_LoginForm)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "@mantine/core"
var core_ = __webpack_require__(2247);
;// CONCATENATED MODULE: ./components/common/LoginForm/LoginForm.styles.tsx

const useLoginFormStyles = (0,core_.createStyles)((theme)=>({
        container: {
            width: 450,
            borderRadius: 30,
            padding: "23px 28px"
        },
        textInput: {
            ".mantine-TextInput-input": {
                height: 50,
                backgroundColor: theme.colors.gray[2],
                border: "none"
            }
        },
        submitButton: {
            height: 40,
            backgroundColor: theme.colors.teal[5],
            color: "white",
            "&:hover": {
                backgroundColor: theme.colors.teal[6]
            },
            fontSize: 18,
            fontWeight: 500
        }
    }));

;// CONCATENATED MODULE: ./components/common/LoginForm/LoginForm.tsx



function LoginForm({ children }) {
    const { classes } = useLoginFormStyles();
    return /*#__PURE__*/ jsx_runtime.jsx(core_.Stack, {
        spacing: 15,
        className: classes.container,
        children: children
    });
}
LoginForm.Label = ({ children })=>{
    return /*#__PURE__*/ jsx_runtime.jsx(core_.Title, {
        order: 4,
        children: children
    });
};
LoginForm.TextInput = ({ placeholder, ...others })=>{
    const { classes } = useLoginFormStyles();
    return /*#__PURE__*/ jsx_runtime.jsx(core_.TextInput, {
        placeholder: placeholder,
        radius: "lg",
        ...others,
        className: classes.textInput
    });
};
LoginForm.SubmitButton = ({ children, ...others })=>{
    const { classes } = useLoginFormStyles();
    return /*#__PURE__*/ jsx_runtime.jsx(core_.Button, {
        type: "submit",
        radius: "lg",
        className: classes.submitButton,
        ...others,
        children: children
    });
};
/* harmony default export */ const LoginForm_LoginForm = (LoginForm);


/***/ }),

/***/ 4822:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LoginForm_LoginForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2502);
/* harmony import */ var _InvisibleButton_InvisibleButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5938);
/* harmony import */ var _mantine_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9445);
/* harmony import */ var _mantine_form__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mantine_form__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _hooks_useAuth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8823);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_hooks_useAuth__WEBPACK_IMPORTED_MODULE_5__]);
_hooks_useAuth__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






function SignInForm({ onSignUpClick, onCompleted }) {
    const form = (0,_mantine_form__WEBPACK_IMPORTED_MODULE_4__.useForm)({
        initialValues: {
            email: "",
            password: ""
        },
        validate: {
            email: (value)=>/^\S+@\S+$/.test(value) ? null : "이메일 형식이 올바르지 않습니다.",
            password: (value)=>value.length >= 8 ? null : "비밀번호는 8자 이상이어야 합니다."
        }
    });
    const { login } = (0,_hooks_useAuth__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)();
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("form", {
        onSubmit: form.onSubmit(({ email, password })=>{
            login(email, password).then((response)=>{
                if (response) {
                    onCompleted();
                }
            });
        }),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_LoginForm_LoginForm__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_LoginForm_LoginForm__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Label, {
                    children: "로그인"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_LoginForm_LoginForm__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.TextInput, {
                    placeholder: "이메일",
                    ...form.getInputProps("email")
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_LoginForm_LoginForm__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.TextInput, {
                    placeholder: "비밀번호",
                    type: "password",
                    ...form.getInputProps("password")
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Group, {
                    position: "apart",
                    sx: {
                        padding: "0 5px"
                    },
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Checkbox, {
                            label: "로그인 유지",
                            color: "teal",
                            sx: {
                                label: {
                                    color: "gray"
                                }
                            }
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_InvisibleButton_InvisibleButton__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                            onClick: onSignUpClick,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                color: "gray",
                                children: "회원가입"
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_LoginForm_LoginForm__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.SubmitButton, {
                    children: "로그인"
                })
            ]
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SignInForm);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2980:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _mantine_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9445);
/* harmony import */ var _mantine_form__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mantine_form__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LoginForm_LoginForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2502);
/* harmony import */ var _utils_notifications__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8233);
/* harmony import */ var _utils_api_users__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9954);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils_api_users__WEBPACK_IMPORTED_MODULE_4__]);
_utils_api_users__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





function SignUpForm({ onCompleted }) {
    const form = (0,_mantine_form__WEBPACK_IMPORTED_MODULE_1__.useForm)({
        initialValues: {
            email: "",
            password: "",
            passwordConfirm: "",
            name: "",
            description: ""
        },
        validate: {
            email: (value)=>/^\S+@\S+$/.test(value) ? null : "이메일 형식이 올바르지 않습니다.",
            password: (value)=>value.length >= 8 ? null : "비밀번호는 8자 이상이어야 합니다.",
            passwordConfirm: (value, values)=>value === values.password ? null : "비밀번호가 일치하지 않습니다.",
            name: (value)=>value.trim().length > 0 ? null : "닉네임을 입력해주세요."
        }
    });
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("form", {
        onSubmit: form.onSubmit(({ email, password, name, description })=>{
            console.log(email, password, name, description);
            (0,_utils_api_users__WEBPACK_IMPORTED_MODULE_4__/* .register */ .z)({
                email,
                password,
                name,
                description
            }).then((response)=>{
                (0,_utils_notifications__WEBPACK_IMPORTED_MODULE_3__/* .showNotification */ .c0)("회원가입 완료!", "회원가입이 완료되었습니다.");
                onCompleted();
            });
        }),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_LoginForm_LoginForm__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_LoginForm_LoginForm__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Label, {
                    children: "이메일"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_LoginForm_LoginForm__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.TextInput, {
                    placeholder: "이메일",
                    ...form.getInputProps("email")
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_LoginForm_LoginForm__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Label, {
                    children: "닉네임"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_LoginForm_LoginForm__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.TextInput, {
                    placeholder: "닉네임",
                    ...form.getInputProps("name")
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_LoginForm_LoginForm__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Label, {
                    children: "비밀번호"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_LoginForm_LoginForm__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.TextInput, {
                    placeholder: "비밀번호",
                    type: "password",
                    ...form.getInputProps("password")
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_LoginForm_LoginForm__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.TextInput, {
                    placeholder: "비밀번호 확인",
                    type: "password",
                    ...form.getInputProps("passwordConfirm")
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_LoginForm_LoginForm__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Label, {
                    children: "한 줄 소개"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_LoginForm_LoginForm__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.TextInput, {
                    placeholder: "한 줄 소개",
                    ...form.getInputProps("description")
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_LoginForm_LoginForm__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.SubmitButton, {
                    children: "가입 완료"
                })
            ]
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SignUpForm);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8823:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_common_AuthProvider_AuthProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9842);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_common_AuthProvider_AuthProvider__WEBPACK_IMPORTED_MODULE_1__]);
_components_common_AuthProvider_AuthProvider__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


function useAuth() {
    const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_components_common_AuthProvider_AuthProvider__WEBPACK_IMPORTED_MODULE_1__/* .AuthContext */ .V);
    // console.log("context", context);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useAuth);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5953:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ resetModalStyles)
/* harmony export */ });
const resetModalStyles = {
    ".mantine-Modal-body": {
        padding: 0
    },
    ".mantine-Modal-header": {
        display: "none"
    },
    "	.mantine-Modal-content": {
        borderRadius: 15
    }
};


/***/ }),

/***/ 9954:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ login),
/* harmony export */   z: () => (/* binding */ register)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
/* harmony import */ var _notifications__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8233);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


async function login(email, password) {
    try {
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(`${"http://ec2-3-112-178-120.ap-northeast-1.compute.amazonaws.com:8000"}/users/login`, {
            email,
            password
        });
        return response.data;
    } catch (error) {
        (0,_notifications__WEBPACK_IMPORTED_MODULE_1__/* .showError */ .x2)("로그인에 실패했습니다.", "이메일과 비밀번호를 확인해주세요.");
        return null;
    }
}
async function register({ email, password, name, description }) {
    const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(`${"http://ec2-3-112-178-120.ap-northeast-1.compute.amazonaws.com:8000"}/users`, {
        email,
        password,
        name,
        description
    });
    return response.data;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7967:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ fetcher)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function fetcher(url, token, config) {
    const res = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(url, {
        ...config,
        headers: {
            ...config?.headers,
            Authorization: token ? `${token}` : ""
        }
    });
    return res.data;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8233:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c0: () => (/* binding */ showNotification),
/* harmony export */   fd: () => (/* binding */ cleanNotification),
/* harmony export */   x2: () => (/* binding */ showError)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _mantine_notifications__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(914);
/* harmony import */ var _mantine_notifications__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mantine_notifications__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tabler_icons_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2236);
/* harmony import */ var _tabler_icons_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_2__);



function showNotification(title, message, option) {
    _mantine_notifications__WEBPACK_IMPORTED_MODULE_1__.notifications.show({
        title,
        message,
        ...option
    });
}
function showError(title, message, option) {
    _mantine_notifications__WEBPACK_IMPORTED_MODULE_1__.notifications.show({
        title,
        message,
        color: "red",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_2__.IconX, {}),
        ...option
    });
}
function cleanNotification() {
    _mantine_notifications__WEBPACK_IMPORTED_MODULE_1__.notifications.clean();
}


/***/ })

};
;