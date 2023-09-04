"use strict";
exports.id = 518;
exports.ids = [518];
exports.modules = {

/***/ 8518:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  m: () => (/* binding */ MainCarousel)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@mantine/core"
var core_ = __webpack_require__(2247);
// EXTERNAL MODULE: external "@mantine/hooks"
var hooks_ = __webpack_require__(32);
// EXTERNAL MODULE: external "@mantine/carousel"
var carousel_ = __webpack_require__(3766);
// EXTERNAL MODULE: external "embla-carousel-autoplay"
var external_embla_carousel_autoplay_ = __webpack_require__(9288);
var external_embla_carousel_autoplay_default = /*#__PURE__*/__webpack_require__.n(external_embla_carousel_autoplay_);
// EXTERNAL MODULE: ./components/pages/game/MainCarousel/MainCarousel.constants.tsx
var MainCarousel_constants = __webpack_require__(1822);
// EXTERNAL MODULE: external "@tabler/icons-react"
var icons_react_ = __webpack_require__(2236);
;// CONCATENATED MODULE: ./components/pages/game/MainCarousel/MainCarousel.styles.tsx

const useMainCarouselStyles = (0,core_.createStyles)((theme)=>({
        backgroundImage: {
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            "&:hover": {
                textDecoration: "none"
            }
        },
        imageContainer: {
            width: "100%",
            height: "100%",
            padding: 0,
            borderRadius: "1rem",
            backgroundColor: theme.colors.gray[2]
        },
        image: {
            height: "100%",
            ".mantine-Image-imageWrapper, .mantine-Image-figure, .mantine-Image-image": {
                height: "100%"
            }
        },
        gameIntro: {
            marginLeft: "7rem",
            marginBottom: "3.5rem",
            gap: "2rem",
            [theme.fn.smallerThan(820)]: {
                marginLeft: "4.6rem",
                marginBottom: "2.7rem",
                gap: "1.3rem"
            },
            [theme.fn.smallerThan(540)]: {
                marginLeft: "2.3rem",
                marginBottom: "0.65rem",
                gap: "0.65rem"
            }
        },
        gameAvatar: {
            minWidth: "3rem",
            width: "3rem",
            height: "3rem",
            [theme.fn.smallerThan(820)]: {
                minWidth: "2rem",
                width: "2rem",
                height: "2rem"
            },
            [theme.fn.smallerThan(540)]: {
                minWidth: "1rem",
                width: "1rem",
                height: "1rem"
            }
        },
        gameName: {
            fontSize: "1.8rem",
            [theme.fn.smallerThan(820)]: {
                fontSize: "1.2rem"
            },
            [theme.fn.smallerThan(540)]: {
                fontSize: "0.6rem"
            }
        },
        gameExplain: {
            width: "37rem",
            fontSize: "1.3rem",
            lineHeight: 1.5,
            color: "white",
            [theme.fn.smallerThan(820)]: {
                width: "24.6rem",
                fontSize: "0.86rem"
            },
            [theme.fn.smallerThan(540)]: {
                width: "12.3rem",
                fontSize: "0.43rem"
            }
        },
        carousel: {
            width: "100%",
            height: "100%",
            ".mantine-Carousel-root, .mantine-Carousel-container, .mantine-Carousel-viewport": {
                height: "100%"
            },
            ".mantine-Carousel-control": {
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none"
            },
            ".mantine-Carousel-indicator": {
                width: "2rem",
                height: "0.4rem",
                transition: "width 250ms ease",
                "&[data-active]": {
                    width: "3rem",
                    backgroundColor: theme.colors.blue[3]
                }
            },
            [theme.fn.smallerThan(820)]: {
                ".mantine-Carousel-indicators": {
                    gap: "0.3rem"
                },
                ".mantine-Carousel-indicator": {
                    width: "1.3rem",
                    height: "0.26rem",
                    "&[data-active]": {
                        width: "2rem"
                    }
                }
            },
            [theme.fn.smallerThan(540)]: {
                ".mantine-Carousel-indicators": {
                    gap: "0.15rem"
                },
                ".mantine-Carousel-indicator": {
                    width: "0.65rem",
                    height: "0.13rem",
                    "&[data-active]": {
                        width: "1rem"
                    }
                }
            }
        }
    }));

;// CONCATENATED MODULE: ./components/pages/game/MainCarousel/MainCarousel.tsx









function processString(input) {
    if (!input) {
        return "";
    }
    if (input.length <= 75) {
        return input;
    }
    let processedString = input.slice(0, 75);
    if (input.length > 150) {
        processedString += "...";
    }
    return processedString;
}
function MainCarousel({ isMain, isInfo, imgUrls }) {
    const { classes, cx } = useMainCarouselStyles();
    const TRANSITION_DURATION = 200;
    const [embla, setEmbla] = (0,external_react_.useState)(null);
    (0,carousel_.useAnimationOffsetEffect)(embla, TRANSITION_DURATION);
    const autoplay = (0,external_react_.useRef)(external_embla_carousel_autoplay_default()({
        delay: 4000
    }));
    const [values] = (0,hooks_.useListState)(imgUrls?.map((url)=>({
            src: url
        })) || MainCarousel_constants/* GameSrcValues */.u);
    const lgScreen = (0,hooks_.useMediaQuery)("(max-width: 820px)");
    const smScreen = (0,hooks_.useMediaQuery)("(max-width: 540px)");
    const GameCarouselSlides = values.map((value)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(carousel_.Carousel.Slide, {
            children: [
                isMain && /*#__PURE__*/ jsx_runtime.jsx(core_.BackgroundImage, {
                    className: classes.backgroundImage,
                    component: "a",
                    href: value.href,
                    src: value.src,
                    h: "100%",
                    children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Stack, {
                        className: classes.gameIntro,
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)(core_.Group, {
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx(core_.Avatar, {
                                        className: classes.gameAvatar,
                                        radius: "20%",
                                        src: value.src
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx(core_.Text, {
                                        className: classes.gameName,
                                        color: "#fff",
                                        children: value.gameName
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx(core_.Box, {
                                className: classes.gameExplain,
                                children: processString(value.gameExplain)
                            })
                        ]
                    })
                }),
                isInfo && /*#__PURE__*/ jsx_runtime.jsx(core_.Container, {
                    className: classes.imageContainer,
                    children: /*#__PURE__*/ jsx_runtime.jsx(core_.Image, {
                        className: classes.image,
                        width: "100%",
                        height: "100%",
                        radius: "lg",
                        fit: "contain",
                        src: value.src
                    })
                })
            ]
        }));
    return /*#__PURE__*/ jsx_runtime.jsx(carousel_.Carousel, {
        className: classes.carousel,
        slideSize: "100%",
        slideGap: "md",
        loop: true,
        draggable: false,
        withIndicators: true,
        previousControlIcon: /*#__PURE__*/ jsx_runtime.jsx(icons_react_.IconChevronLeft, {
            color: "white",
            size: smScreen ? "1rem" : lgScreen ? "2rem" : "3rem"
        }),
        nextControlIcon: /*#__PURE__*/ jsx_runtime.jsx(icons_react_.IconChevronRight, {
            color: "white",
            size: smScreen ? "1rem" : lgScreen ? "2rem" : "3rem"
        }),
        getEmblaApi: setEmbla,
        plugins: [
            autoplay.current
        ],
        onMouseEnter: autoplay.current.stop,
        onMouseLeave: autoplay.current.reset,
        children: GameCarouselSlides
    });
}


/***/ })

};
;