/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.App = void 0;
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const ProtectedRoute_1 = __importDefault(__webpack_require__(/*! @components/auth/ProtectedRoute */ "./src/components/auth/ProtectedRoute.tsx"));
const Index_1 = __importDefault(__webpack_require__(/*! @components/pages/Index */ "./src/components/pages/Index.tsx"));
const Profile_1 = __importDefault(__webpack_require__(/*! @components/pages/Profile */ "./src/components/pages/Profile.tsx"));
const Sandbox_1 = __importDefault(__webpack_require__(/*! @components/pages/Sandbox */ "./src/components/pages/Sandbox.tsx"));
const Callback_1 = __importDefault(__webpack_require__(/*! @components/pages/Callback */ "./src/components/pages/Callback.tsx"));
const _404_1 = __importDefault(__webpack_require__(/*! @components/pages/404 */ "./src/components/pages/404.tsx"));
const About_1 = __importDefault(__webpack_require__(/*! @components/pages/About */ "./src/components/pages/About.tsx"));
const Images_1 = __importDefault(__webpack_require__(/*! @components/pages/Images */ "./src/components/pages/Images.tsx"));
const Builder_1 = __importDefault(__webpack_require__(/*! @components/pages/Builder */ "./src/components/pages/Builder.tsx"));
const SignUp_1 = __importDefault(__webpack_require__(/*! @components/pages/public/SignUp */ "./src/components/pages/public/SignUp.tsx"));
const appContext_1 = __importStar(__webpack_require__(/*! @src/appContext */ "./src/appContext.ts"));
const App = () => {
    const { user: userViaAuth0, loginWithRedirect, isLoading: isLoadingViaAuth0, getAccessTokenSilently, } = (0, auth0_react_1.useAuth0)();
    const [user, setUser] = react_1.default.useState(userViaAuth0);
    const [isLoading, setIsLoading] = react_1.default.useState(isLoadingViaAuth0);
    const [prompt, setPrompt] = react_1.default.useState(appContext_1.defaultContext.prompt);
    const [tags, setTags] = react_1.default.useState(appContext_1.defaultContext.tags);
    react_1.default.useEffect(() => {
        setIsLoading(isLoadingViaAuth0);
    }, [isLoadingViaAuth0]);
    react_1.default.useEffect(() => {
        // Can also use hook
        setUser(userViaAuth0);
        const getAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
            const token = yield getAccessTokenSilently();
            setUser(Object.assign(Object.assign({}, userViaAuth0), { access_token: token }));
        });
        if (userViaAuth0) {
            getAccessToken();
        }
    }, [userViaAuth0]);
    if (isLoading) {
        return (react_1.default.createElement("main", { className: "bg-slate-600 w-full min-h-screen" },
            react_1.default.createElement("div", { className: "container mx-auto h-full" },
                react_1.default.createElement("div", { className: "mx-auto text-center p-12 text-white" },
                    react_1.default.createElement("div", { className: "text-center py-24 text-xl font-thin" }, "Loading...")))));
    }
    const defaultCtx = {
        isLoading,
        prompt,
        setIsLoading,
        setPrompt,
        setTags,
        setUser,
        tags,
        user,
    };
    return (react_1.default.createElement(appContext_1.default.Provider, { value: defaultCtx },
        react_1.default.createElement(react_router_dom_1.Switch, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/", exact: true, component: Index_1.default }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/builder", component: Builder_1.default }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/signup", component: SignUp_1.default }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/sign-up", component: SignUp_1.default }),
            react_1.default.createElement(ProtectedRoute_1.default, { path: "/profile", component: Profile_1.default }),
            react_1.default.createElement(ProtectedRoute_1.default, { path: "/about", component: About_1.default }),
            react_1.default.createElement(ProtectedRoute_1.default, { path: "/images", component: Images_1.default }),
            react_1.default.createElement(ProtectedRoute_1.default, { path: "/sandbox", component: Sandbox_1.default }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/callback", component: Callback_1.default }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "*", component: _404_1.default }))));
};
exports.App = App;


/***/ }),

/***/ "./src/Index.tsx":
/*!***********************!*\
  !*** ./src/Index.tsx ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_dom_1 = __importDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const App_1 = __webpack_require__(/*! ./App */ "./src/App.tsx");
const Auth0ProviderWithHistory_1 = __webpack_require__(/*! @components/auth/Auth0ProviderWithHistory */ "./src/components/auth/Auth0ProviderWithHistory.tsx");
const Sentry = __importStar(__webpack_require__(/*! @sentry/react */ "./node_modules/@sentry/react/esm/index.js"));
const tracing_1 = __webpack_require__(/*! @sentry/tracing */ "./node_modules/@sentry/tracing/esm/index.js");
const api_1 = __importDefault(__webpack_require__(/*! ./api/api */ "./src/api/api.ts"));
const logrocket_1 = __importDefault(__webpack_require__(/*! logrocket */ "./node_modules/logrocket/dist/build.umd.js"));
logrocket_1.default.init('wivfcj/promptiverse');
const sentryDsn = api_1.default.getVar('SENTRY_CLIENT_DSN');
if (sentryDsn) {
    Sentry.init({
        dsn: sentryDsn,
        integrations: [new tracing_1.BrowserTracing()],
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
}
react_dom_1.default.render(react_1.default.createElement(react_1.default.StrictMode, null,
    react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(Auth0ProviderWithHistory_1.Auth0ProviderWithHistory, null,
            react_1.default.createElement(App_1.App, null)))), document.getElementById('root'));


/***/ }),

/***/ "./src/api/api.ts":
/*!************************!*\
  !*** ./src/api/api.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const fetch_1 = __importDefault(__webpack_require__(/*! @utils/fetch */ "./src/utils/fetch.ts"));
const mappings_1 = __webpack_require__(/*! ./mappings */ "./src/api/mappings.ts");
window.promptiverse = window.promptiverse || {};
const ApiService = {
    request: ({ accessToken, method = 'GET', path, postBody, }) => {
        const apiUrl = `${ApiService.getVar('API_SERVER_URL')}/api`;
        return (0, fetch_1.default)(`${apiUrl}${path}`, {
            method,
            postBody,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
    },
    getVar: (name) => {
        if (!window.promptiverse || !window.promptiverse.vars) {
            return undefined;
        }
        return window.promptiverse.vars[name];
    },
    generateImage: ({ accessToken, promptRaw, seed, tagIds = [], }) => {
        return ApiService.request({
            accessToken,
            path: '/prompt',
            method: 'POST',
            postBody: {
                prompt_raw: promptRaw,
                seed,
                tag_ids: tagIds,
            },
        });
    },
    getImages: (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
        return ApiService.request({
            accessToken,
            path: '/prompt',
        }).then(resp => ({ prompts: (0, mappings_1.mapPromptListToTypes)(resp.prompts) }));
    }),
    getTags: (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
        return ApiService.request({
            accessToken,
            path: '/tag',
        }).then(resp => ({
            tags: (0, mappings_1.mapTagListToTypes)(resp.tags),
            categories: resp.categories,
        }));
    }),
    sandboxTest: (accessToken) => {
        return ApiService.request({
            accessToken,
            path: '/sandbox',
            method: 'POST',
        });
    },
};
exports["default"] = ApiService;


/***/ }),

/***/ "./src/api/mappings.ts":
/*!*****************************!*\
  !*** ./src/api/mappings.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mapTagListToTypes = exports.mapTagToTypes = exports.mapPromptListToTypes = exports.mapPromptToTypes = void 0;
// TODO: this should happen server side at query time, or else probably not at all for large lists.
const mapPromptToTypes = (prompt) => {
    return Object.assign(Object.assign({}, prompt), { imgUrl: prompt.img_url, promptRaw: prompt.prompt_raw, loading: false });
};
exports.mapPromptToTypes = mapPromptToTypes;
const mapPromptListToTypes = (prompts) => {
    return prompts.map(p => (0, exports.mapPromptToTypes)(p));
};
exports.mapPromptListToTypes = mapPromptListToTypes;
const mapTagToTypes = (tag) => {
    return Object.assign(Object.assign({}, tag), { tagCategory: tag.tag_category });
};
exports.mapTagToTypes = mapTagToTypes;
const mapTagListToTypes = (tags) => {
    return tags.map(t => (0, exports.mapTagToTypes)(t));
};
exports.mapTagListToTypes = mapTagListToTypes;


/***/ }),

/***/ "./src/appContext.ts":
/*!***************************!*\
  !*** ./src/appContext.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultContext = void 0;
const react_1 = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const localStorage_1 = __importDefault(__webpack_require__(/*! @utils/localStorage */ "./src/utils/localStorage.ts"));
exports.defaultContext = {
    isLoading: true,
    prompt: localStorage_1.default.getPrompt(),
    setIsLoading: () => { },
    setPrompt: (prompt) => { },
    setTags: (tags) => { },
    setUser: (user) => { },
    tags: localStorage_1.default.getTags(),
    user: undefined,
};
const AppContext = (0, react_1.createContext)(exports.defaultContext);
exports["default"] = AppContext;


/***/ }),

/***/ "./src/components/Footer.tsx":
/*!***********************************!*\
  !*** ./src/components/Footer.tsx ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const Logo_1 = __importDefault(__webpack_require__(/*! @components/base/Logo */ "./src/components/base/Logo.tsx"));
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const api_1 = __importDefault(__webpack_require__(/*! @api/api */ "./src/api/api.ts"));
const Footer = () => {
    const routerHistory = (0, react_router_dom_1.useHistory)();
    const linkStyle = 'text-sm text-red-400 mx-2 md:mx-10 hover:underline pt-2';
    const { loginWithRedirect } = (0, auth0_react_1.useAuth0)();
    const goToPage = (path) => {
        routerHistory.push(path);
    };
    const handleLogin = () => __awaiter(void 0, void 0, void 0, function* () {
        yield loginWithRedirect({
            prompt: 'login',
            appState: {
                returnTo: '/',
            },
        });
    });
    const enableSignup = api_1.default.getVar('ENABLE_SIGNUP') === true;
    return (react_1.default.createElement("footer", { className: "bg-red-50 p-6 mt-12 border-t border-red-100" },
        react_1.default.createElement("div", { className: "flex container mx-auto justify-center" },
            react_1.default.createElement("a", { href: "", className: linkStyle, onClick: () => goToPage('/') }, "Home"),
            react_1.default.createElement("a", { href: "", className: linkStyle, onClick: () => goToPage('/builder') }, "Builder"),
            react_1.default.createElement("a", { href: "", className: linkStyle, onClick: () => goToPage('/about') }, "About"),
            react_1.default.createElement("div", { className: "pt-1 w-10 md:w-12 md:pt-0 mx-2 md:mx-8" },
                react_1.default.createElement(Logo_1.default, { iconOnly: true, linkedToHome: false })),
            react_1.default.createElement("a", { href: "", className: linkStyle, onClick: handleLogin }, "Sign In"),
            enableSignup && react_1.default.createElement("a", { href: "", className: linkStyle, onClick: () => goToPage('/signup') }, "Sign Up"))));
};
exports["default"] = Footer;


/***/ }),

/***/ "./src/components/Hero.tsx":
/*!*********************************!*\
  !*** ./src/components/Hero.tsx ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const Button_1 = __importDefault(__webpack_require__(/*! @components/base/Button */ "./src/components/base/Button.tsx"));
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const Hero = () => {
    const routerHistory = (0, react_router_dom_1.useHistory)();
    const linkStyle = 'text-red-400 mx-4 hover:underline';
    const goToPage = (path) => {
        routerHistory.push(path);
    };
    return (react_1.default.createElement("div", { className: "h-[500px] bg-red-900 px-6" },
        react_1.default.createElement("div", { className: "container mx-auto grid sm:grid-cols-3 text-white" },
            react_1.default.createElement("div", { className: "col-span-1 mt-24 md:mt-36" },
                react_1.default.createElement("h1", { className: "text-4xl font-bold" }, "The future of generative images starts here"),
                react_1.default.createElement("h4", { className: "text-xl mt-2" }, "Use our builder to explore the magic of AI imagery for free."),
                react_1.default.createElement(Button_1.default, { size: "lg", className: "mt-6", onClick: () => goToPage('/builder') }, "Get Started")))));
};
exports["default"] = Hero;


/***/ }),

/***/ "./src/components/Prompt.tsx":
/*!***********************************!*\
  !*** ./src/components/Prompt.tsx ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const api_1 = __importDefault(__webpack_require__(/*! @api/api */ "./src/api/api.ts"));
const Input_1 = __importDefault(__webpack_require__(/*! ./base/Input */ "./src/components/base/Input.tsx"));
const Tags_1 = __importStar(__webpack_require__(/*! ./tags/Tags */ "./src/components/tags/Tags.tsx"));
const PromptImage_1 = __importDefault(__webpack_require__(/*! ./PromptImage */ "./src/components/PromptImage.tsx"));
const Button_1 = __importDefault(__webpack_require__(/*! ./base/Button */ "./src/components/base/Button.tsx"));
const appContext_1 = __importDefault(__webpack_require__(/*! @src/appContext */ "./src/appContext.ts"));
const localStorage_1 = __importDefault(__webpack_require__(/*! @utils/localStorage */ "./src/utils/localStorage.ts"));
const PromptComponent = () => {
    const { setPrompt, prompt, user, tags } = react_1.default.useContext(appContext_1.default);
    const [seed, setSeed] = react_1.default.useState(prompt === null || prompt === void 0 ? void 0 : prompt.seed);
    const submit = () => __awaiter(void 0, void 0, void 0, function* () {
        setPrompt(Object.assign(Object.assign({}, prompt), { loading: true }));
        const response = yield api_1.default.generateImage({
            promptRaw: prompt.promptRaw,
            accessToken: user.access_token,
            seed,
            tagIds: (0, Tags_1.getSelectedTagIds)(tags),
        });
        if (!response.prompt) {
            console.error(`Unable to generate prompt`, response);
            setPrompt(Object.assign(Object.assign({}, prompt), { loading: false }));
            return;
        }
        const newPromptVal = Object.assign(Object.assign({}, response.prompt), { loading: false });
        setPrompt(newPromptVal);
        setSeed(newPromptVal.seed);
        localStorage_1.default.setPrompt(newPromptVal);
        localStorage_1.default.setTags(tags);
    });
    const setPromptRaw = (newVal) => {
        setPrompt(Object.assign(Object.assign({}, prompt), { promptRaw: newVal }));
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: "flex flex-row gap-x-2" },
            react_1.default.createElement(Input_1.default, { value: (prompt === null || prompt === void 0 ? void 0 : prompt.promptRaw) || '', onChange: setPromptRaw, className: "grow", placeholder: "enter a prompt, like 'cat dancing on the moon'", disabled: prompt === null || prompt === void 0 ? void 0 : prompt.loading, autoFocus: true }),
            react_1.default.createElement(Input_1.default, { className: "w-24", placeholder: "Seed?", value: seed, type: "number", onChange: (value) => {
                    const possibleNumber = typeof value === 'string' ? parseInt(value.trim(), 10) : undefined;
                    if (typeof possibleNumber === 'number' && !isNaN(possibleNumber)) {
                        return setSeed(possibleNumber);
                    }
                    setSeed(undefined);
                }, disabled: prompt === null || prompt === void 0 ? void 0 : prompt.loading }),
            react_1.default.createElement(Button_1.default, { onClick: submit, disabled: prompt === null || prompt === void 0 ? void 0 : prompt.loading, className: "min-w-[150px]" }, "Go!")),
        react_1.default.createElement(Tags_1.default, null),
        react_1.default.createElement("div", null,
            react_1.default.createElement(PromptImage_1.default, null))));
};
exports["default"] = PromptComponent;


/***/ }),

/***/ "./src/components/PromptImage.tsx":
/*!****************************************!*\
  !*** ./src/components/PromptImage.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const Loader_1 = __importDefault(__webpack_require__(/*! @components/base/Loader */ "./src/components/base/Loader.tsx"));
const appContext_1 = __importDefault(__webpack_require__(/*! @src/appContext */ "./src/appContext.ts"));
const PromptImage = () => {
    const { prompt } = react_1.default.useContext(appContext_1.default);
    if (!prompt || !prompt.imgUrl) {
        return null;
    }
    if (prompt.loading) {
        return (react_1.default.createElement("div", { className: "mt-4 text-center" },
            react_1.default.createElement(Loader_1.default, null),
            react_1.default.createElement("h2", { className: "text-slate-50 font-thin text-lg mt-4" }, "Loading...")));
    }
    return (react_1.default.createElement("div", { className: "p-6 bg-white rounded mt-6" },
        react_1.default.createElement("img", { src: prompt === null || prompt === void 0 ? void 0 : prompt.imgUrl, title: prompt === null || prompt === void 0 ? void 0 : prompt.prompt, alt: `Image for prompt ${(prompt === null || prompt === void 0 ? void 0 : prompt.prompt) ? prompt.prompt : ''}`, width: 512, height: 512, className: "border m-auto rounded shadow p-2 bg-slate-400" })));
};
exports["default"] = PromptImage;


/***/ }),

/***/ "./src/components/auth/Auth0ProviderWithHistory.tsx":
/*!**********************************************************!*\
  !*** ./src/components/auth/Auth0ProviderWithHistory.tsx ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Auth0ProviderWithHistory = void 0;
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const api_1 = __importDefault(__webpack_require__(/*! @api/api */ "./src/api/api.ts"));
const Auth0ProviderWithHistory = ({ children, }) => {
    const history = (0, react_router_dom_1.useHistory)();
    const domain = api_1.default.getVar('CLIENT_APP_AUTH0_DOMAIN');
    const clientId = api_1.default.getVar('CLIENT_APP_AUTH0_CLIENT_ID');
    const audience = api_1.default.getVar('CLIENT_APP_AUTH0_AUDIENCE');
    const redirectUri = api_1.default.getVar('CLIENT_APP_AUTH0_CALLBACK_URL');
    const onRedirectCallback = (appState) => {
        history.push((appState === null || appState === void 0 ? void 0 : appState.returnTo) || window.location.pathname);
    };
    if (!(domain && clientId && audience)) {
        return null;
    }
    return (react_1.default.createElement(auth0_react_1.Auth0Provider, { domain: domain, clientId: clientId, audience: audience, redirectUri: redirectUri, onRedirectCallback: onRedirectCallback }, children));
};
exports.Auth0ProviderWithHistory = Auth0ProviderWithHistory;


/***/ }),

/***/ "./src/components/auth/ProtectedRoute.tsx":
/*!************************************************!*\
  !*** ./src/components/auth/ProtectedRoute.tsx ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const ProtectedRoute = (_a) => {
    var { component } = _a, args = __rest(_a, ["component"]);
    return (react_1.default.createElement(react_router_dom_1.Route, Object.assign({ component: (0, auth0_react_1.withAuthenticationRequired)(component, {
            onRedirecting: () => (react_1.default.createElement("div", null, "Loading")),
        }) }, args)));
};
exports["default"] = ProtectedRoute;


/***/ }),

/***/ "./src/components/base/Avatar.tsx":
/*!****************************************!*\
  !*** ./src/components/base/Avatar.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const appContext_1 = __importDefault(__webpack_require__(/*! @src/appContext */ "./src/appContext.ts"));
const Avatar = () => {
    const { user } = react_1.default.useContext(appContext_1.default);
    if (!user) {
        return null;
    }
    return (react_1.default.createElement("img", { src: user.picture, alt: user.username, width: 150, height: 150, className: "h-8 w-8 rounded-full" }));
};
exports["default"] = Avatar;


/***/ }),

/***/ "./src/components/base/Button.tsx":
/*!****************************************!*\
  !*** ./src/components/base/Button.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const clsx_1 = __importDefault(__webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js"));
const Button = ({ children, download, href, onClick, disabled, className, style = 'primary', variant = 'filled', size = 'med', }) => {
    const cssClasses = (0, clsx_1.default)(className, variant === 'filled' && style === 'primary'
        ? 'text-white bg-red-500 ring ring-offset-2 ring-transparent hover:ring-red-400 hover:bg-red-600 focus:ring-red-600 focus:bg-red-700'
        : '', variant === 'unfilled' && style === 'primary'
        ? 'text-red-600 hover:text-red-700 ring-offset-2 hover:ring hover:ring-red-700 focus:ring-red-800 focus:text-red-800'
        : '', 'font-medium rounded-lg', size === 'med' ? 'py-2 px-6' : '', size === 'lg' ? 'text-lg py-2 px-10' : '');
    if (href) {
        return (react_1.default.createElement("a", { onClick: onClick, className: `${cssClasses} inline-block`, href: href, download: download }, children));
    }
    return (react_1.default.createElement("button", { onClick: onClick, className: cssClasses, disabled: disabled }, children));
};
exports["default"] = Button;


/***/ }),

/***/ "./src/components/base/Input.tsx":
/*!***************************************!*\
  !*** ./src/components/base/Input.tsx ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const clsx_1 = __importDefault(__webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js"));
const Input = (_a) => {
    var { className, type, value: valueViaProps, autoFocus, onChange, disabled } = _a, otherProps = __rest(_a, ["className", "type", "value", "autoFocus", "onChange", "disabled"]);
    const inputRef = react_1.default.useRef(null);
    const [value, setValue] = react_1.default.useState(valueViaProps || '');
    react_1.default.useEffect(() => {
        if (autoFocus && (inputRef === null || inputRef === void 0 ? void 0 : inputRef.current)) {
            inputRef.current.focus();
        }
        if (valueViaProps !== value) {
            setValue(valueViaProps || '');
        }
    }, [
        autoFocus,
        valueViaProps,
    ]);
    return (react_1.default.createElement("input", Object.assign({ value: value, ref: inputRef, disabled: disabled, type: type || 'string', onChange: (e) => {
            setValue(e.target.value);
            if (onChange) {
                onChange(e.target.value);
            }
        }, className: (0, clsx_1.default)(className, 'p-2 rounded-sm', disabled ? 'bg-gray-300 text-gray-500' : 'bg-gray-200 text-gray-700 cursor:pointer', 'focus:bg-white focus:outline-none focus:ring focus:ring-blue-200') }, otherProps)));
};
exports["default"] = Input;


/***/ }),

/***/ "./src/components/base/Loader.tsx":
/*!****************************************!*\
  !*** ./src/components/base/Loader.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const clsx_1 = __importDefault(__webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js"));
const Loader = ({ bgClassName = 'bg-white' }) => {
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)('bg-gradient-to-r from-slate-300 to-slate-400 h-[3px] w-full', `after:absolute after:h-[3px] after:bg-slate-600 after:left-0 after:right-[100%] after:animate-loader`) }));
};
exports["default"] = Loader;


/***/ }),

/***/ "./src/components/base/Logo.tsx":
/*!**************************************!*\
  !*** ./src/components/base/Logo.tsx ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const Logo = ({ className, iconOnly = false, linkedToHome = true, }) => {
    const routerHistory = (0, react_router_dom_1.useHistory)();
    const goToHome = () => {
        routerHistory.push('/');
    };
    const wrapper = (content) => {
        if (linkedToHome) {
            return (react_1.default.createElement("a", { onClick: goToHome, href: "#", className: className }, content));
        }
        return react_1.default.createElement("span", { className: className }, content);
    };
    return (wrapper(react_1.default.createElement("img", { src: iconOnly ? 'static/img/icon.svg' : 'static/img/logo.svg', alt: "logo" })));
};
exports["default"] = Logo;


/***/ }),

/***/ "./src/components/headers/Header.tsx":
/*!*******************************************!*\
  !*** ./src/components/headers/Header.tsx ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const clsx_1 = __importDefault(__webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js"));
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const react_2 = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const react_3 = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/index.cjs");
const outline_1 = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/index.js");
const Avatar_1 = __importDefault(__webpack_require__(/*! @components/base/Avatar */ "./src/components/base/Avatar.tsx"));
const Logo_1 = __importDefault(__webpack_require__(/*! @components/base/Logo */ "./src/components/base/Logo.tsx"));
const appContext_1 = __importDefault(__webpack_require__(/*! @src/appContext */ "./src/appContext.ts"));
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
const Header = () => {
    const { logout } = (0, auth0_react_1.useAuth0)();
    const handleLogout = () => {
        logout({
            returnTo: window.location.origin,
        });
    };
    const routerHistory = (0, react_router_dom_1.useHistory)();
    const goToAboutPage = () => {
        routerHistory.push('/about');
    };
    const goToDashboard = () => {
        routerHistory.push('/');
    };
    const goToProfile = () => {
        routerHistory.push('/profile');
    };
    const goToImages = () => {
        routerHistory.push('/images');
    };
    const { user } = react_1.default.useContext(appContext_1.default);
    const activeNavLinkClassname = 'bg-gray-900 text-white';
    const navLinkClassname = 'text-gray-300 hover:bg-gray-700 hover:text-white';
    const location = (0, react_router_dom_1.useLocation)();
    if (!user) {
        return null;
    }
    return (react_1.default.createElement("header", null,
        react_1.default.createElement(react_3.Disclosure, { as: "nav", className: "bg-gray-800" }, ({ open }) => (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "container mx-auto px-8" },
                react_1.default.createElement("div", { className: "flex h-16 items-center justify-between" },
                    react_1.default.createElement("div", { className: "flex items-center" },
                        react_1.default.createElement("div", { className: "flex-shrink-0" },
                            react_1.default.createElement("a", { onClick: goToDashboard },
                                react_1.default.createElement(Logo_1.default, null))),
                        react_1.default.createElement("div", { className: "hidden sm:ml-6 sm:block" },
                            react_1.default.createElement("div", { className: "flex space-x-4" },
                                react_1.default.createElement("a", { onClick: goToDashboard, className: (0, clsx_1.default)('rounded-md px-3 py-2 text-sm font-medium cursor-pointer', location.pathname === '/' ? activeNavLinkClassname : navLinkClassname) }, "Dashboard"),
                                react_1.default.createElement("a", { onClick: goToImages, className: (0, clsx_1.default)('rounded-md px-3 py-2 text-sm font-medium cursor-pointer', location.pathname === '/images' ? activeNavLinkClassname : navLinkClassname) }, "Images"),
                                react_1.default.createElement("a", { onClick: goToAboutPage, className: (0, clsx_1.default)('rounded-md px-3 py-2 text-sm font-medium cursor-pointer', location.pathname === '/about' ? activeNavLinkClassname : navLinkClassname) }, "About")))),
                    react_1.default.createElement("div", { className: "hidden sm:ml-6 sm:block" },
                        react_1.default.createElement("div", { className: "flex items-center" },
                            react_1.default.createElement(react_3.Menu, { as: "div", className: "relative ml-3" },
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement(react_3.Menu.Button, { className: "flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" },
                                        react_1.default.createElement("span", { className: "sr-only" }, "Profile"),
                                        react_1.default.createElement(Avatar_1.default, null))),
                                react_1.default.createElement(react_3.Transition, { as: react_2.Fragment, enter: "transition ease-out duration-100", enterFrom: "transform opacity-0 scale-95", enterTo: "transform opacity-100 scale-100", leave: "transition ease-in duration-75", leaveFrom: "transform opacity-100 scale-100", leaveTo: "transform opacity-0 scale-95" },
                                    react_1.default.createElement(react_3.Menu.Items, { className: "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" },
                                        react_1.default.createElement(react_3.Menu.Item, null, ({ active }) => (react_1.default.createElement("a", { onClick: goToProfile, className: classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer') }, "My Profile"))),
                                        react_1.default.createElement(react_3.Menu.Item, null, ({ active }) => (react_1.default.createElement("a", { onClick: handleLogout, className: classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer') }, "Sign Out")))))))),
                    react_1.default.createElement("div", { className: "-mr-2 flex sm:hidden" },
                        react_1.default.createElement(react_3.Disclosure.Button, { className: "inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" },
                            react_1.default.createElement("span", { className: "sr-only" }, "Open main menu"),
                            open
                                ? (react_1.default.createElement(outline_1.XMarkIcon, { className: "block h-6 w-6", "aria-hidden": "true" }))
                                : (react_1.default.createElement(outline_1.Bars3Icon, { className: "block h-6 w-6", "aria-hidden": "true" })))))),
            react_1.default.createElement(react_3.Disclosure.Panel, { className: "sm:hidden" },
                react_1.default.createElement("div", { className: "space-y-1 px-2 pt-2 pb-3" },
                    react_1.default.createElement(react_3.Disclosure.Button, { as: "a", onClick: goToDashboard, className: (0, clsx_1.default)('block rounded-md px-3 py-2 text-base font-medium cursor-pointer', location.pathname === '/' ? activeNavLinkClassname : navLinkClassname) }, "Dashboard"),
                    react_1.default.createElement(react_3.Disclosure.Button, { as: "a", onClick: goToImages, className: (0, clsx_1.default)('block rounded-md px-3 py-2 text-base font-medium cursor-pointer', location.pathname === '/images' ? activeNavLinkClassname : navLinkClassname) }, "Images"),
                    react_1.default.createElement(react_3.Disclosure.Button, { as: "a", onClick: goToAboutPage, className: (0, clsx_1.default)('block rounded-md px-3 py-2 text-base font-medium cursor-pointer', location.pathname === '/about' ? activeNavLinkClassname : navLinkClassname) }, "About")),
                react_1.default.createElement("div", { className: "border-t border-gray-700 pt-4 pb-3" },
                    react_1.default.createElement("div", { className: "flex items-center px-5" },
                        react_1.default.createElement("div", { className: "flex-shrink-0" },
                            react_1.default.createElement(Avatar_1.default, null)),
                        react_1.default.createElement("div", { className: "ml-3" },
                            react_1.default.createElement("div", { className: "text-base font-medium text-white" }, user.nickname),
                            react_1.default.createElement("div", { className: "text-sm font-medium text-gray-400" }, user.name))),
                    react_1.default.createElement("div", { className: "mt-3 space-y-1 px-2" },
                        react_1.default.createElement(react_3.Disclosure.Button, { as: "a", onClick: goToProfile, className: "block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer" }, "Your Profile"),
                        react_1.default.createElement(react_3.Disclosure.Button, { as: "a", onClick: handleLogout, className: "block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer" }, "Sign Out")))))))));
};
exports["default"] = Header;


/***/ }),

/***/ "./src/components/headers/PublicHeader.tsx":
/*!*************************************************!*\
  !*** ./src/components/headers/PublicHeader.tsx ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const Logo_1 = __importDefault(__webpack_require__(/*! @components/base/Logo */ "./src/components/base/Logo.tsx"));
const Button_1 = __importDefault(__webpack_require__(/*! @components/base/Button */ "./src/components/base/Button.tsx"));
const api_1 = __importDefault(__webpack_require__(/*! @api/api */ "./src/api/api.ts"));
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
const PublicHeader = () => {
    const routerHistory = (0, react_router_dom_1.useHistory)();
    const { loginWithRedirect, user } = (0, auth0_react_1.useAuth0)();
    const handleLogin = () => __awaiter(void 0, void 0, void 0, function* () {
        yield loginWithRedirect({
            prompt: 'login',
            appState: {
                returnTo: '/',
            },
        });
    });
    const goToPage = (path) => {
        routerHistory.push(path);
    };
    const enableSignup = api_1.default.getVar('ENABLE_SIGNUP') === true;
    return (react_1.default.createElement("header", { className: "bg-gray-100 px-6" },
        react_1.default.createElement("div", { className: "flex container mx-auto py-2" },
            react_1.default.createElement("div", { className: "grow" },
                react_1.default.createElement(Logo_1.default, { className: "w-[100px] md:w-[135px] block" })),
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", { className: "inline-flex mt-2" },
                    react_1.default.createElement(Button_1.default, { onClick: handleLogin, size: "med", variant: "unfilled", className: "whitespace-nowrap md:mr-2 mr-4" }, "Sign In"),
                    enableSignup && react_1.default.createElement(Button_1.default, { size: "med", variant: "filled", style: "primary", className: "whitespace-nowrap", onClick: () => goToPage('/signup') }, "Sign Up"))))));
};
exports["default"] = PublicHeader;


/***/ }),

/***/ "./src/components/images/ImageList.tsx":
/*!*********************************************!*\
  !*** ./src/components/images/ImageList.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const Loader_1 = __importDefault(__webpack_require__(/*! @components/base/Loader */ "./src/components/base/Loader.tsx"));
const appContext_1 = __importDefault(__webpack_require__(/*! @src/appContext */ "./src/appContext.ts"));
const api_1 = __importDefault(__webpack_require__(/*! @api/api */ "./src/api/api.ts"));
const ImageListItem_1 = __importDefault(__webpack_require__(/*! ./ImageListItem */ "./src/components/images/ImageListItem.tsx"));
const ImageList = () => {
    const { user } = react_1.default.useContext(appContext_1.default);
    const [images, setImages] = react_1.default.useState();
    react_1.default.useEffect(() => {
        const loadImages = () => __awaiter(void 0, void 0, void 0, function* () {
            // Images are really just prompt objects.
            const resp = yield api_1.default.getImages(user.access_token);
            if (!(resp === null || resp === void 0 ? void 0 : resp.prompts)) {
                console.log('TODO: errors');
                return;
            }
            setImages(resp.prompts);
        });
        if (user.access_token) {
            loadImages();
        }
    }, [user]);
    return (react_1.default.createElement("div", { className: "p-6 bg-white rounded mt-6" }, images
        ? react_1.default.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4" }, images.map(img => react_1.default.createElement(ImageListItem_1.default, Object.assign({}, img, { key: `imageListItem_${img.id}` }))))
        : react_1.default.createElement(Loader_1.default, null)));
};
exports["default"] = ImageList;


/***/ }),

/***/ "./src/components/images/ImageListItem.tsx":
/*!*************************************************!*\
  !*** ./src/components/images/ImageListItem.tsx ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const ImageListItem = ({ imgUrl, prompt, className, }) => {
    return (react_1.default.createElement("div", { className: className },
        react_1.default.createElement("img", { src: imgUrl, title: prompt, alt: prompt })));
};
exports["default"] = ImageListItem;


/***/ }),

/***/ "./src/components/layouts/ErrorLayout.tsx":
/*!************************************************!*\
  !*** ./src/components/layouts/ErrorLayout.tsx ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const ErrorLayout = ({ children, errorMessage }) => {
    return (react_1.default.createElement("main", { className: "bg-slate-600 w-full min-h-screen" },
        react_1.default.createElement("div", { className: "container mx-auto h-full" },
            react_1.default.createElement("div", { className: "mx-auto text-center p-12 text-white" }, children
                ? children :
                react_1.default.createElement("div", { className: "text-center py-24 text-xl font-thin" }, errorMessage ? errorMessage : 'Unknown Error')))));
};
exports["default"] = ErrorLayout;


/***/ }),

/***/ "./src/components/layouts/Layout.tsx":
/*!*******************************************!*\
  !*** ./src/components/layouts/Layout.tsx ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const Header_1 = __importDefault(__webpack_require__(/*! @components/headers/Header */ "./src/components/headers/Header.tsx"));
const PublicHeader_1 = __importDefault(__webpack_require__(/*! @components/headers/PublicHeader */ "./src/components/headers/PublicHeader.tsx"));
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const Hero_1 = __importDefault(__webpack_require__(/*! @components/Hero */ "./src/components/Hero.tsx"));
const Footer_1 = __importDefault(__webpack_require__(/*! @components/Footer */ "./src/components/Footer.tsx"));
const Layout = ({ children, page }) => {
    const { user } = (0, auth0_react_1.useAuth0)();
    if (!user) {
        return (react_1.default.createElement("main", { className: "overflow-x-hidden" },
            react_1.default.createElement("div", { className: "min-h-screen" },
                react_1.default.createElement(PublicHeader_1.default, null),
                page === 'INDEX' &&
                    react_1.default.createElement(Hero_1.default, null),
                react_1.default.createElement("section", { className: "container mx-auto px-6" }, children)),
            react_1.default.createElement(Footer_1.default, null)));
    }
    return (react_1.default.createElement("main", { className: "bg-slate-600 w-full min-h-screen" },
        react_1.default.createElement(Header_1.default, null),
        react_1.default.createElement("div", { className: "container mx-auto h-full" },
            react_1.default.createElement("div", { className: "py-6 px-8" }, children))));
};
exports["default"] = Layout;


/***/ }),

/***/ "./src/components/pages/404.tsx":
/*!**************************************!*\
  !*** ./src/components/pages/404.tsx ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const ErrorLayout_1 = __importDefault(__webpack_require__(/*! @components/layouts/ErrorLayout */ "./src/components/layouts/ErrorLayout.tsx"));
const Page = () => {
    return (react_1.default.createElement(ErrorLayout_1.default, null,
        react_1.default.createElement("h1", { className: "text-white" }, "Page Not Found")));
};
exports["default"] = Page;


/***/ }),

/***/ "./src/components/pages/About.tsx":
/*!****************************************!*\
  !*** ./src/components/pages/About.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const Layout_1 = __importDefault(__webpack_require__(/*! @components/layouts/Layout */ "./src/components/layouts/Layout.tsx"));
const Page = () => {
    return (react_1.default.createElement(Layout_1.default, null,
        react_1.default.createElement("h1", null, "About"),
        react_1.default.createElement("p", null, "Credits"),
        react_1.default.createElement("p", null,
            "Powered by the ",
            react_1.default.createElement("a", { href: "https://github.com/Stability-AI/stability-sdk" }, "Stability-AI SDK"))));
};
exports["default"] = Page;


/***/ }),

/***/ "./src/components/pages/Builder.tsx":
/*!******************************************!*\
  !*** ./src/components/pages/Builder.tsx ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const Layout_1 = __importDefault(__webpack_require__(/*! @components/layouts/Layout */ "./src/components/layouts/Layout.tsx"));
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const Prompt_1 = __importDefault(__webpack_require__(/*! @components/Prompt */ "./src/components/Prompt.tsx"));
const Builder_1 = __importDefault(__webpack_require__(/*! @components/pages/public/Builder */ "./src/components/pages/public/Builder.tsx"));
const Page = () => {
    const { user } = (0, auth0_react_1.useAuth0)();
    return (react_1.default.createElement(Layout_1.default, null, user ? react_1.default.createElement(Prompt_1.default, null) : react_1.default.createElement(Builder_1.default, null)));
};
exports["default"] = Page;


/***/ }),

/***/ "./src/components/pages/Callback.tsx":
/*!*******************************************!*\
  !*** ./src/components/pages/Callback.tsx ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const Layout_1 = __importDefault(__webpack_require__(/*! @components/layouts/Layout */ "./src/components/layouts/Layout.tsx"));
const ErrorLayout_1 = __importDefault(__webpack_require__(/*! @components/layouts/ErrorLayout */ "./src/components/layouts/ErrorLayout.tsx"));
const Page = () => {
    const { error } = (0, auth0_react_1.useAuth0)();
    console.error(error);
    if (error) {
        return (react_1.default.createElement(ErrorLayout_1.default, { errorMessage: "Unable to login." }));
    }
    return (react_1.default.createElement(Layout_1.default, null));
};
exports["default"] = Page;


/***/ }),

/***/ "./src/components/pages/Images.tsx":
/*!*****************************************!*\
  !*** ./src/components/pages/Images.tsx ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const Layout_1 = __importDefault(__webpack_require__(/*! @components/layouts/Layout */ "./src/components/layouts/Layout.tsx"));
const ImageList_1 = __importDefault(__webpack_require__(/*! @components/images/ImageList */ "./src/components/images/ImageList.tsx"));
const Page = () => {
    return (react_1.default.createElement(Layout_1.default, null,
        react_1.default.createElement(ImageList_1.default, null)));
};
exports["default"] = Page;


/***/ }),

/***/ "./src/components/pages/Index.tsx":
/*!****************************************!*\
  !*** ./src/components/pages/Index.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const Layout_1 = __importDefault(__webpack_require__(/*! @components/layouts/Layout */ "./src/components/layouts/Layout.tsx"));
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const Prompt_1 = __importDefault(__webpack_require__(/*! @components/Prompt */ "./src/components/Prompt.tsx"));
const Index_1 = __importDefault(__webpack_require__(/*! @components/pages/public/Index */ "./src/components/pages/public/Index.tsx"));
const Page = () => {
    const { user } = (0, auth0_react_1.useAuth0)();
    return (react_1.default.createElement(Layout_1.default, { page: "INDEX" }, user ? react_1.default.createElement(Prompt_1.default, null) : react_1.default.createElement(Index_1.default, null)));
};
exports["default"] = Page;


/***/ }),

/***/ "./src/components/pages/Profile.tsx":
/*!******************************************!*\
  !*** ./src/components/pages/Profile.tsx ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const Layout_1 = __importDefault(__webpack_require__(/*! @components/layouts/Layout */ "./src/components/layouts/Layout.tsx"));
const Page = () => {
    const { user } = (0, auth0_react_1.useAuth0)();
    return (react_1.default.createElement(Layout_1.default, null,
        react_1.default.createElement("ul", { className: "list-disc list-inside text-white" },
            react_1.default.createElement("li", null,
                "Name: ",
                user.name),
            react_1.default.createElement("li", null,
                "Email: ",
                user.email),
            react_1.default.createElement("li", null,
                "Nickname: ",
                user.nickname))));
};
exports["default"] = Page;


/***/ }),

/***/ "./src/components/pages/Sandbox.tsx":
/*!******************************************!*\
  !*** ./src/components/pages/Sandbox.tsx ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const Layout_1 = __importDefault(__webpack_require__(/*! @components/layouts/Layout */ "./src/components/layouts/Layout.tsx"));
const getAccessToken_1 = __importDefault(__webpack_require__(/*! @hooks/getAccessToken */ "./src/hooks/getAccessToken.ts"));
const api_1 = __importDefault(__webpack_require__(/*! @api/api */ "./src/api/api.ts"));
const Page = () => {
    const token = (0, getAccessToken_1.default)();
    const testSandboxApi = () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield api_1.default.sandboxTest(token);
    });
    if (token) {
        testSandboxApi();
    }
    return (react_1.default.createElement(Layout_1.default, null,
        react_1.default.createElement(react_1.default.Fragment, null, "sandbox")));
};
exports["default"] = Page;


/***/ }),

/***/ "./src/components/pages/public/Builder.tsx":
/*!*************************************************!*\
  !*** ./src/components/pages/public/Builder.tsx ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const Page = () => {
    return (react_1.default.createElement("div", null, "Public Builder"));
};
exports["default"] = Page;


/***/ }),

/***/ "./src/components/pages/public/Index.tsx":
/*!***********************************************!*\
  !*** ./src/components/pages/public/Index.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const Page = () => {
    const { loginWithRedirect, user } = (0, auth0_react_1.useAuth0)();
    const handleLogin = () => __awaiter(void 0, void 0, void 0, function* () {
        yield loginWithRedirect({
            prompt: "login",
            appState: {
                returnTo: "/",
            },
        });
    });
    //   const style = {
    //     background: 'url("/static/img/bgs/cover.png") no-repeat 0 -200px',
    //     backgroundSize: 'cover',
    // }
    const imgClassName = "border h-24 mt-4 md:mt-0";
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: "my-4 text-center" },
            react_1.default.createElement("h2", { className: "text-xl" }, "Main heading")),
        react_1.default.createElement("div", { className: "md:grid grid-cols-2 gap-4 mt-4" },
            react_1.default.createElement("img", { src: "static/img/1.png", alt: "image 1", className: imgClassName }),
            react_1.default.createElement("img", { src: "static/img/2.png", alt: "image 2", className: imgClassName }),
            react_1.default.createElement("img", { src: "static/img/3.png", alt: "image 3", className: imgClassName }),
            react_1.default.createElement("img", { src: "static/img/4.png", alt: "image 4", className: imgClassName }),
            react_1.default.createElement("img", { src: "static/img/5.png", alt: "image 5", className: imgClassName }),
            react_1.default.createElement("img", { src: "static/img/6.png", alt: "image 6", className: imgClassName }))));
};
exports["default"] = Page;


/***/ }),

/***/ "./src/components/pages/public/SignUp.tsx":
/*!************************************************!*\
  !*** ./src/components/pages/public/SignUp.tsx ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const Layout_1 = __importDefault(__webpack_require__(/*! @components/layouts/Layout */ "./src/components/layouts/Layout.tsx"));
const Page = () => {
    return (react_1.default.createElement(Layout_1.default, null,
        react_1.default.createElement("div", { className: "text-center py-12" },
            react_1.default.createElement("h2", { className: "text-2xl" }, "Signups are currently closed to the public."),
            react_1.default.createElement("p", null, "Stay tuned! We'll be opening up soon."))));
};
exports["default"] = Page;


/***/ }),

/***/ "./src/components/tags/Tags.tsx":
/*!**************************************!*\
  !*** ./src/components/tags/Tags.tsx ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSelectedTagIds = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_select_1 = __importDefault(__webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.esm.js"));
const api_1 = __importDefault(__webpack_require__(/*! @api/api */ "./src/api/api.ts"));
const appContext_1 = __importDefault(__webpack_require__(/*! @src/appContext */ "./src/appContext.ts"));
const selectStyles = {
    // https://react-select.com/styles#style-object
    // option: (provided:any, state:any) => {
    //   console.log(provided, state)
    //   return provided
    // },
    control: (provided, state) => {
        return Object.assign({}, provided);
    },
};
const customSelectTheme = (provided) => {
    // console.log(provided)
    return Object.assign(Object.assign({}, provided), { colors: Object.assign({}, provided.colors) });
};
const getSelectedTagIds = (tagCollections) => {
    if (!tagCollections.length) {
        return [];
    }
    return tagCollections.flatMap(collection => (collection.selectedTags.map(tag => tag.id)));
};
exports.getSelectedTagIds = getSelectedTagIds;
const tagsToSelectOptions = (tags) => {
    return tags.map((tag) => ({
        value: tag.id,
        label: tag.label,
    }));
};
const Tags = ({}) => {
    const { user, setTags, tags } = react_1.default.useContext(appContext_1.default);
    const [error, setError] = react_1.default.useState();
    const onChange = (changedTags, category) => {
        const newTags = tags.map(tagCollection => {
            if (tagCollection.category.id === category.id) {
                return Object.assign(Object.assign({}, tagCollection), { 
                    // map back from SelectOption format to Tag
                    selectedTags: changedTags.map(tag => ({
                        id: tag.value,
                        label: tag.label,
                        tagCategory: tagCollection.category.id,
                    })) });
            }
            return tagCollection;
        });
        setTags(newTags);
    };
    const loadTags = () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield api_1.default.getTags(user.access_token);
        if (!resp.tags || !resp.categories) {
            setError('Unable to load tags');
            return;
        }
        const tagCollections = [];
        resp.categories.forEach((category) => {
            var _a;
            const selectedTags = tags && tags.length ? (_a = tags[category.id]) === null || _a === void 0 ? void 0 : _a.selectedTags : [];
            tagCollections.push({
                category,
                allTags: resp.tags.filter(tag => tag.tagCategory === category.id),
                selectedTags,
            });
        });
        setTags(tagCollections);
    });
    react_1.default.useEffect(() => {
        if (user.access_token && !tags) {
            loadTags();
        }
    }, [user.access_token]);
    if (error) {
        return react_1.default.createElement("div", null, error);
    }
    if (!tags) {
        return null;
    }
    return (react_1.default.createElement(react_1.default.Fragment, null, tags.map((tagCollection) => {
        return (react_1.default.createElement("div", { key: `tagCategory_${tagCollection.category.id}`, className: "mt-4 text-slate-600 text-sm" },
            react_1.default.createElement(react_select_1.default, { defaultValue: tagsToSelectOptions(tagCollection.selectedTags), placeholder: `Add ${tagCollection.category.label.toLowerCase()}`, options: tagsToSelectOptions(tagCollection.allTags), styles: selectStyles, theme: customSelectTheme, isMulti: true, onChange: (selectedValues) => {
                    onChange(selectedValues, tagCollection.category);
                } })));
    })));
};
exports["default"] = Tags;


/***/ }),

/***/ "./src/hooks/getAccessToken.ts":
/*!*************************************!*\
  !*** ./src/hooks/getAccessToken.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const getAccessToken = () => {
    const { user, isLoading, getAccessTokenSilently, } = (0, auth0_react_1.useAuth0)();
    const [accessToken, setAccessToken] = react_1.default.useState();
    react_1.default.useEffect(() => {
        if (isLoading || !user) {
            return;
        }
        const getAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
            const token = yield getAccessTokenSilently();
            setAccessToken(token);
        });
        getAccessToken();
        return () => { }; // needed as callback
    }, [
        user,
        isLoading,
    ]);
    return accessToken;
};
exports["default"] = getAccessToken;


/***/ }),

/***/ "./src/utils/fetch.ts":
/*!****************************!*\
  !*** ./src/utils/fetch.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const api_1 = __importDefault(__webpack_require__(/*! @api/api */ "./src/api/api.ts"));
const fetcher = (url, options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const csrfToken = api_1.default.getVar('APP_TOKEN');
    try {
        const fetchOptions = Object.assign({ method: (options === null || options === void 0 ? void 0 : options.method) || 'GET', headers: {
                'Accept': ((_a = options === null || options === void 0 ? void 0 : options.headers) === null || _a === void 0 ? void 0 : _a.Accept) || 'application/json',
                'Content-Type': ((_b = options === null || options === void 0 ? void 0 : options.headers) === null || _b === void 0 ? void 0 : _b['Content-Type']) || 'application/json',
                'Authorization': ((_c = options === null || options === void 0 ? void 0 : options.headers) === null || _c === void 0 ? void 0 : _c.Authorization) || '',
                'X-CSRF-Token': ((_d = options === null || options === void 0 ? void 0 : options.headers) === null || _d === void 0 ? void 0 : _d['X-CSRF-Token']) || csrfToken,
            } }, ((options === null || options === void 0 ? void 0 : options.postBody) ? { body: JSON.stringify(options.postBody) } : []));
        return fetch(url, fetchOptions)
            .then(response => {
            if (!response.ok) {
                // throw new Error(response.statusText)
                console.error(response.statusText);
                return { error: response.statusText,
                    status: response.status };
            }
            return response.json();
        })
            .then(resp => resp);
    }
    catch (err) {
        console.log(err);
    }
});
exports["default"] = fetcher;


/***/ }),

/***/ "./src/utils/localStorage.ts":
/*!***********************************!*\
  !*** ./src/utils/localStorage.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const localStorageNamespace = 'promptiverse';
const LocalStorage = {
    localStorageExists: () => {
        return typeof window !== 'undefined' && typeof (window === null || window === void 0 ? void 0 : window.localStorage) !== 'undefined';
    },
    setItem: (item, itemStr) => {
        if (!LocalStorage.localStorageExists() || !item) {
            return;
        }
        localStorage.setItem(`${localStorageNamespace}.${itemStr}`, JSON.stringify(item));
    },
    getItem: (itemStr) => {
        if (!LocalStorage.localStorageExists()) {
            return;
        }
        const val = localStorage.getItem(`${localStorageNamespace}.${itemStr}`);
        if (!val) {
            return;
        }
        return JSON.parse(val);
    },
    setPrompt: (prompt) => {
        return LocalStorage.setItem(prompt, 'prompt');
    },
    getPrompt: () => {
        return LocalStorage.getItem('prompt');
    },
    setTags: (tagCollections) => {
        return LocalStorage.setItem(tagCollections, 'tags');
    },
    getTags: () => {
        return LocalStorage.getItem('tags');
    },
};
exports["default"] = LocalStorage;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkpromptiverse"] = self["webpackChunkpromptiverse"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./src/Index.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.bundle.js.map