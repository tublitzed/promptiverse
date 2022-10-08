/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.App = void 0;
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const page_loader_1 = __webpack_require__(/*! ./components/page-loader */ "./src/components/page-loader.tsx");
const protected_route_1 = __webpack_require__(/*! ./components/protected-route */ "./src/components/protected-route.tsx");
const admin_page_1 = __webpack_require__(/*! ./pages/admin-page */ "./src/pages/admin-page.tsx");
const callback_page_1 = __webpack_require__(/*! ./pages/callback-page */ "./src/pages/callback-page.tsx");
const home_page_1 = __importDefault(__webpack_require__(/*! ./pages/home-page */ "./src/pages/home-page.tsx"));
const not_found_page_1 = __webpack_require__(/*! ./pages/not-found-page */ "./src/pages/not-found-page.tsx");
const profile_page_1 = __webpack_require__(/*! ./pages/profile-page */ "./src/pages/profile-page.tsx");
const protected_page_1 = __webpack_require__(/*! ./pages/protected-page */ "./src/pages/protected-page.tsx");
const public_page_1 = __webpack_require__(/*! ./pages/public-page */ "./src/pages/public-page.tsx");
const App = () => {
    const { isLoading } = (0, auth0_react_1.useAuth0)();
    if (isLoading) {
        return (react_1.default.createElement("main", { className: "bg-slate-600 w-full min-h-screen" },
            react_1.default.createElement("div", { className: "container mx-auto h-full" },
                react_1.default.createElement("div", { className: "mx-auto text-center p-12 text-white" },
                    react_1.default.createElement(page_loader_1.PageLoader, null)))));
    }
    return (react_1.default.createElement(react_router_dom_1.Switch, null,
        react_1.default.createElement(react_router_dom_1.Route, { path: "/", exact: true, component: home_page_1.default }),
        react_1.default.createElement(protected_route_1.ProtectedRoute, { path: "/profile", component: profile_page_1.ProfilePage }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/public", component: public_page_1.PublicPage }),
        react_1.default.createElement(protected_route_1.ProtectedRoute, { path: "/protected", component: protected_page_1.ProtectedPage }),
        react_1.default.createElement(protected_route_1.ProtectedRoute, { path: "/admin", component: admin_page_1.AdminPage }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/callback", component: callback_page_1.CallbackPage }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "*", component: not_found_page_1.NotFoundPage })));
};
exports.App = App;


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
const localStorage_1 = __importDefault(__webpack_require__(/*! ./utils/localStorage */ "./src/utils/localStorage.ts"));
exports.defaultContext = {
    isLoading: true,
    prompt: localStorage_1.default.getPrompt() || { loading: false },
    setIsLoading: () => { },
    setPrompt: (prompt) => { },
    setUser: (user) => { },
    user: undefined,
};
const AppContext = (0, react_1.createContext)(exports.defaultContext);
exports["default"] = AppContext;


/***/ }),

/***/ "./src/auth0-provider-with-history.tsx":
/*!*********************************************!*\
  !*** ./src/auth0-provider-with-history.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Auth0ProviderWithHistory = void 0;
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const api_service_1 = __importDefault(__webpack_require__(/*! @services/api-service */ "./src/services/api-service.ts"));
const Auth0ProviderWithHistory = ({ children, }) => {
    const history = (0, react_router_dom_1.useHistory)();
    const domain = api_service_1.default.getVar('CLIENT_APP_AUTH0_DOMAIN');
    const clientId = api_service_1.default.getVar('CLIENT_APP_AUTH0_CLIENT_ID');
    const audience = api_service_1.default.getVar('CLIENT_APP_AUTH0_AUDIENCE');
    const redirectUri = api_service_1.default.getVar('CLIENT_APP_AUTH0_CALLBACK_URL');
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

/***/ "./src/components/Layout.tsx":
/*!***********************************!*\
  !*** ./src/components/Layout.tsx ***!
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
const Header_1 = __importDefault(__webpack_require__(/*! @components/base/Header */ "./src/components/base/Header.tsx"));
const appContext_1 = __importStar(__webpack_require__(/*! @src/appContext */ "./src/appContext.ts"));
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const login_button_1 = __webpack_require__(/*! @components/buttons/login-button */ "./src/components/buttons/login-button.tsx");
const api_service_1 = __importDefault(__webpack_require__(/*! @services/api-service */ "./src/services/api-service.ts"));
const API_SERVER_URL = api_service_1.default.getVar('API_SERVER_URL');
const Layout = ({ children }) => {
    const { user: userViaAuth0 } = (0, auth0_react_1.useAuth0)();
    const [user, setUser] = react_1.default.useState(userViaAuth0);
    const [isLoading, setIsLoading] = react_1.default.useState(appContext_1.defaultContext.isLoading);
    const [prompt, setPrompt] = react_1.default.useState(appContext_1.defaultContext.prompt);
    const { getAccessTokenSilently } = (0, auth0_react_1.useAuth0)();
    const verifyApiAuthIsWorking = () => __awaiter(void 0, void 0, void 0, function* () {
        const accessToken = yield getAccessTokenSilently();
        console.log(accessToken);
        // const testUrl = `${process.env.NEXT_PUBLIC_API_URL}api/private`
        // const authResp = await fetcher(testUrl, {
        //   method: 'POST',
        //   headers: {
        //     'Authorization': `Bearer ${accessToken}`,
        //   },
        // })
        // console.log(authResp)
    });
    verifyApiAuthIsWorking();
    const defaultCtx = {
        user,
        isLoading,
        setUser,
        setIsLoading,
        prompt,
        setPrompt,
    };
    if (!user) {
        return (react_1.default.createElement("main", { className: "bg-slate-600 w-full min-h-screen" },
            react_1.default.createElement("div", { className: "container mx-auto h-full" },
                react_1.default.createElement("div", { className: "mx-auto text-center p-12 text-white" },
                    react_1.default.createElement(login_button_1.LoginButton, null)))));
    }
    return (react_1.default.createElement(appContext_1.default.Provider, { value: defaultCtx },
        react_1.default.createElement("main", { className: "bg-slate-600 w-full min-h-screen" },
            react_1.default.createElement(Header_1.default, null),
            react_1.default.createElement("div", { className: "container mx-auto h-full" },
                react_1.default.createElement("div", { className: "py-6 px-8" }, children)))));
};
exports["default"] = Layout;


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
const Button = ({ children, download, href, onClick, disabled, className }) => {
    const cssClasses = (0, clsx_1.default)(className, 'py-2 px-6 border no-underline border-transparent text-sm font-medium rounded-md text-white', disabled
        ? 'bg-gray-300'
        : 'bg-slate-700 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500');
    if (href) {
        return (react_1.default.createElement("a", { onClick: onClick, className: `${cssClasses} inline-block`, href: href, download: download }, children));
    }
    return (react_1.default.createElement("button", { onClick: onClick, className: cssClasses, disabled: disabled }, children));
};
exports["default"] = Button;


/***/ }),

/***/ "./src/components/base/Header.tsx":
/*!****************************************!*\
  !*** ./src/components/base/Header.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const clsx_1 = __importDefault(__webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js"));
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
                            react_1.default.createElement(Logo_1.default, null)),
                        react_1.default.createElement("div", { className: "hidden sm:ml-6 sm:block" },
                            react_1.default.createElement("div", { className: "flex space-x-4" },
                                react_1.default.createElement("a", { href: "/", className: (0, clsx_1.default)('rounded-md px-3 py-2 text-sm font-medium', location.pathname === '/' ? activeNavLinkClassname : navLinkClassname) }, "Dashboard"),
                                react_1.default.createElement("a", { href: "/about", className: (0, clsx_1.default)('rounded-md px-3 py-2 text-sm font-medium', location.pathname === '/about' ? activeNavLinkClassname : navLinkClassname) }, "About")))),
                    react_1.default.createElement("div", { className: "hidden sm:ml-6 sm:block" },
                        react_1.default.createElement("div", { className: "flex items-center" },
                            react_1.default.createElement(react_3.Menu, { as: "div", className: "relative ml-3" },
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement(react_3.Menu.Button, { className: "flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" },
                                        react_1.default.createElement("span", { className: "sr-only" }, "Open user menu"),
                                        react_1.default.createElement(Avatar_1.default, null))),
                                react_1.default.createElement(react_3.Transition, { as: react_2.Fragment, enter: "transition ease-out duration-100", enterFrom: "transform opacity-0 scale-95", enterTo: "transform opacity-100 scale-100", leave: "transition ease-in duration-75", leaveFrom: "transform opacity-100 scale-100", leaveTo: "transform opacity-0 scale-95" },
                                    react_1.default.createElement(react_3.Menu.Items, { className: "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" },
                                        react_1.default.createElement(react_3.Menu.Item, null, ({ active }) => (react_1.default.createElement("a", { href: "/profile", className: classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700') }, "Your Profile"))),
                                        react_1.default.createElement(react_3.Menu.Item, null, ({ active }) => (react_1.default.createElement("a", { href: "/api/logout", className: classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700') }, "Sign out")))))))),
                    react_1.default.createElement("div", { className: "-mr-2 flex sm:hidden" },
                        react_1.default.createElement(react_3.Disclosure.Button, { className: "inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" },
                            react_1.default.createElement("span", { className: "sr-only" }, "Open main menu"),
                            open
                                ? (react_1.default.createElement(outline_1.XMarkIcon, { className: "block h-6 w-6", "aria-hidden": "true" }))
                                : (react_1.default.createElement(outline_1.Bars3Icon, { className: "block h-6 w-6", "aria-hidden": "true" })))))),
            react_1.default.createElement(react_3.Disclosure.Panel, { className: "sm:hidden" },
                react_1.default.createElement("div", { className: "space-y-1 px-2 pt-2 pb-3" },
                    react_1.default.createElement(react_3.Disclosure.Button, { as: "a", href: "/", className: (0, clsx_1.default)('block rounded-md px-3 py-2 text-base font-medium', location.pathname === '/' ? activeNavLinkClassname : navLinkClassname) }, "Dashboard"),
                    react_1.default.createElement(react_3.Disclosure.Button, { as: "a", href: "/about", className: (0, clsx_1.default)('block rounded-md px-3 py-2 text-base font-medium', location.pathname === '/about' ? activeNavLinkClassname : navLinkClassname) }, "About")),
                react_1.default.createElement("div", { className: "border-t border-gray-700 pt-4 pb-3" },
                    react_1.default.createElement("div", { className: "flex items-center px-5" },
                        react_1.default.createElement("div", { className: "flex-shrink-0" },
                            react_1.default.createElement(Avatar_1.default, null)),
                        react_1.default.createElement("div", { className: "ml-3" },
                            react_1.default.createElement("div", { className: "text-base font-medium text-white" }, user.nickname),
                            react_1.default.createElement("div", { className: "text-sm font-medium text-gray-400" }, user.name))),
                    react_1.default.createElement("div", { className: "mt-3 space-y-1 px-2" },
                        react_1.default.createElement(react_3.Disclosure.Button, { as: "a", href: "/profile", className: "block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white" }, "Your Profile"),
                        react_1.default.createElement(react_3.Disclosure.Button, { as: "a", href: "/api/logout", className: "block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white" }, "Sign out")))))))));
};
exports["default"] = Header;


/***/ }),

/***/ "./src/components/base/Image.tsx":
/*!***************************************!*\
  !*** ./src/components/base/Image.tsx ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const appContext_1 = __importDefault(__webpack_require__(/*! @src/appContext */ "./src/appContext.ts"));
const Image = () => {
    const { prompt } = react_1.default.useContext(appContext_1.default);
    if (!prompt || !prompt.url) {
        return null;
    }
    return (react_1.default.createElement("div", { className: "p-6 bg-white rounded mt-6" },
        react_1.default.createElement("img", { src: prompt === null || prompt === void 0 ? void 0 : prompt.url, title: prompt === null || prompt === void 0 ? void 0 : prompt.value, alt: `Image for prompt ${(prompt === null || prompt === void 0 ? void 0 : prompt.value) ? prompt.value : ''}`, width: 512, height: 512, className: "border m-auto rounded shadow p-2 bg-slate-400" })));
};
exports["default"] = Image;


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
    var { className, type, value: valueViaProps, autoFocus, onChange } = _a, otherProps = __rest(_a, ["className", "type", "value", "autoFocus", "onChange"]);
    const inputRef = react_1.default.useRef(null);
    const [value, setValue] = react_1.default.useState(valueViaProps);
    react_1.default.useEffect(() => {
        if (autoFocus && (inputRef === null || inputRef === void 0 ? void 0 : inputRef.current)) {
            inputRef.current.focus();
        }
    }, [autoFocus]);
    return (react_1.default.createElement("input", Object.assign({ value: value, ref: inputRef, type: type || 'string', onChange: (e) => {
            setValue(e.target.value);
            if (onChange) {
                onChange(e.target.value);
            }
        }, className: (0, clsx_1.default)(className, 'cursor:pointer p-2 rounded-sm bg-gray-200 text-gray-700', 'focus:bg-white focus:outline-none focus:ring focus:ring-blue-200') }, otherProps)));
};
exports["default"] = Input;


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
const Logo = () => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("span", { className: "font-light text-2xl text-white" }, "[ N ]")));
};
exports["default"] = Logo;


/***/ }),

/***/ "./src/components/buttons/login-button.tsx":
/*!*************************************************!*\
  !*** ./src/components/buttons/login-button.tsx ***!
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
exports.LoginButton = void 0;
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const LoginButton = () => {
    const { loginWithRedirect } = (0, auth0_react_1.useAuth0)();
    const handleLogin = () => __awaiter(void 0, void 0, void 0, function* () {
        yield loginWithRedirect({
            prompt: "login",
            appState: {
                returnTo: "/profile",
            },
        });
    });
    return (react_1.default.createElement("button", { className: "button__login", onClick: handleLogin }, "Log In"));
};
exports.LoginButton = LoginButton;


/***/ }),

/***/ "./src/components/buttons/logout-button.tsx":
/*!**************************************************!*\
  !*** ./src/components/buttons/logout-button.tsx ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogoutButton = void 0;
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const LogoutButton = () => {
    const { logout } = (0, auth0_react_1.useAuth0)();
    const handleLogout = () => {
        logout({
            returnTo: window.location.origin,
        });
    };
    return (react_1.default.createElement("button", { className: "button__logout", onClick: handleLogout }, "Log Out"));
};
exports.LogoutButton = LogoutButton;


/***/ }),

/***/ "./src/components/buttons/signup-button.tsx":
/*!**************************************************!*\
  !*** ./src/components/buttons/signup-button.tsx ***!
  \**************************************************/
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
exports.SignupButton = void 0;
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const SignupButton = () => {
    const { loginWithRedirect } = (0, auth0_react_1.useAuth0)();
    const handleSignUp = () => __awaiter(void 0, void 0, void 0, function* () {
        yield loginWithRedirect({
            prompt: "login",
            screen_hint: "signup",
            appState: {
                returnTo: "/profile",
            },
        });
    });
    return (react_1.default.createElement("button", { className: "button__sign-up", onClick: handleSignUp }, "Sign Up"));
};
exports.SignupButton = SignupButton;


/***/ }),

/***/ "./src/components/code-snippet.tsx":
/*!*****************************************!*\
  !*** ./src/components/code-snippet.tsx ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CodeSnippet = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const CodeSnippet = ({ title, code = "", }) => (react_1.default.createElement("div", { className: "code-snippet" },
    react_1.default.createElement("span", { className: "code-snippet__title" }, title),
    react_1.default.createElement("div", { className: "code-snippet__container" },
        react_1.default.createElement("div", { className: "code-snippet__wrapper" },
            react_1.default.createElement("pre", { className: "code-snippet__body" }, code)))));
exports.CodeSnippet = CodeSnippet;


/***/ }),

/***/ "./src/components/navigation/desktop/nav-bar-brand.tsx":
/*!*************************************************************!*\
  !*** ./src/components/navigation/desktop/nav-bar-brand.tsx ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NavBarBrand = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const NavBarBrand = () => {
    return (react_1.default.createElement("div", { className: "nav-bar__brand" },
        react_1.default.createElement(react_router_dom_1.NavLink, { to: "/", exact: true },
            react_1.default.createElement("img", { className: "nav-bar__logo", src: "https://cdn.auth0.com/blog/hub/code-samples/hello-world/auth0-logo.svg", alt: "Auth0 shield logo", width: "122", height: "36" }))));
};
exports.NavBarBrand = NavBarBrand;


/***/ }),

/***/ "./src/components/navigation/desktop/nav-bar-buttons.tsx":
/*!***************************************************************!*\
  !*** ./src/components/navigation/desktop/nav-bar-buttons.tsx ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NavBarButtons = void 0;
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const login_button_1 = __webpack_require__(/*! ../../buttons/login-button */ "./src/components/buttons/login-button.tsx");
const logout_button_1 = __webpack_require__(/*! ../../buttons/logout-button */ "./src/components/buttons/logout-button.tsx");
const signup_button_1 = __webpack_require__(/*! ../../buttons/signup-button */ "./src/components/buttons/signup-button.tsx");
const NavBarButtons = () => {
    const { isAuthenticated } = (0, auth0_react_1.useAuth0)();
    return (react_1.default.createElement("div", { className: "nav-bar__buttons" },
        !isAuthenticated && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(signup_button_1.SignupButton, null),
            react_1.default.createElement(login_button_1.LoginButton, null))),
        isAuthenticated && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(logout_button_1.LogoutButton, null)))));
};
exports.NavBarButtons = NavBarButtons;


/***/ }),

/***/ "./src/components/navigation/desktop/nav-bar-tab.tsx":
/*!***********************************************************!*\
  !*** ./src/components/navigation/desktop/nav-bar-tab.tsx ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NavBarTab = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const NavBarTab = ({ path, label }) => {
    return (react_1.default.createElement(react_router_dom_1.NavLink, { to: path, exact: true, className: "nav-bar__tab", activeClassName: "nav-bar__tab--active" }, label));
};
exports.NavBarTab = NavBarTab;


/***/ }),

/***/ "./src/components/navigation/desktop/nav-bar-tabs.tsx":
/*!************************************************************!*\
  !*** ./src/components/navigation/desktop/nav-bar-tabs.tsx ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NavBarTabs = void 0;
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const nav_bar_tab_1 = __webpack_require__(/*! ./nav-bar-tab */ "./src/components/navigation/desktop/nav-bar-tab.tsx");
const NavBarTabs = () => {
    const { isAuthenticated } = (0, auth0_react_1.useAuth0)();
    return (react_1.default.createElement("div", { className: "nav-bar__tabs" },
        react_1.default.createElement(nav_bar_tab_1.NavBarTab, { path: "/profile", label: "Profile" }),
        react_1.default.createElement(nav_bar_tab_1.NavBarTab, { path: "/public", label: "Public" }),
        isAuthenticated && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(nav_bar_tab_1.NavBarTab, { path: "/protected", label: "Protected" }),
            react_1.default.createElement(nav_bar_tab_1.NavBarTab, { path: "/admin", label: "Admin" })))));
};
exports.NavBarTabs = NavBarTabs;


/***/ }),

/***/ "./src/components/navigation/desktop/nav-bar.tsx":
/*!*******************************************************!*\
  !*** ./src/components/navigation/desktop/nav-bar.tsx ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NavBar = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const nav_bar_brand_1 = __webpack_require__(/*! ./nav-bar-brand */ "./src/components/navigation/desktop/nav-bar-brand.tsx");
const nav_bar_buttons_1 = __webpack_require__(/*! ./nav-bar-buttons */ "./src/components/navigation/desktop/nav-bar-buttons.tsx");
const nav_bar_tabs_1 = __webpack_require__(/*! ./nav-bar-tabs */ "./src/components/navigation/desktop/nav-bar-tabs.tsx");
const NavBar = () => {
    return (react_1.default.createElement("div", { className: "nav-bar__container" },
        react_1.default.createElement("nav", { className: "nav-bar" },
            react_1.default.createElement(nav_bar_brand_1.NavBarBrand, null),
            react_1.default.createElement(nav_bar_tabs_1.NavBarTabs, null),
            react_1.default.createElement(nav_bar_buttons_1.NavBarButtons, null))));
};
exports.NavBar = NavBar;


/***/ }),

/***/ "./src/components/navigation/mobile/mobile-menu-toggle-button.tsx":
/*!************************************************************************!*\
  !*** ./src/components/navigation/mobile/mobile-menu-toggle-button.tsx ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MobileMenuToggleButton = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const MobileMenuToggleButton = ({ icon, handleClick, }) => {
    return (react_1.default.createElement("span", { className: "mobile-nav-bar__toggle material-icons", id: "mobile-menu-toggle-button", onClick: handleClick }, icon));
};
exports.MobileMenuToggleButton = MobileMenuToggleButton;


/***/ }),

/***/ "./src/components/navigation/mobile/mobile-nav-bar-brand.tsx":
/*!*******************************************************************!*\
  !*** ./src/components/navigation/mobile/mobile-nav-bar-brand.tsx ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MobileNavBarBrand = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const MobileNavBarBrand = ({ handleClick, }) => {
    return (react_1.default.createElement("div", { onClick: handleClick, className: "mobile-nav-bar__brand" },
        react_1.default.createElement(react_router_dom_1.NavLink, { to: "/" },
            react_1.default.createElement("img", { className: "mobile-nav-bar__logo", src: "https://cdn.auth0.com/blog/hub/code-samples/hello-world/auth0-logo.svg", alt: "Auth0 shield logo", width: "82", height: "24" }))));
};
exports.MobileNavBarBrand = MobileNavBarBrand;


/***/ }),

/***/ "./src/components/navigation/mobile/mobile-nav-bar-buttons.tsx":
/*!*********************************************************************!*\
  !*** ./src/components/navigation/mobile/mobile-nav-bar-buttons.tsx ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MobileNavBarButtons = void 0;
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const login_button_1 = __webpack_require__(/*! ../../buttons/login-button */ "./src/components/buttons/login-button.tsx");
const logout_button_1 = __webpack_require__(/*! ../../buttons/logout-button */ "./src/components/buttons/logout-button.tsx");
const signup_button_1 = __webpack_require__(/*! ../../buttons/signup-button */ "./src/components/buttons/signup-button.tsx");
const MobileNavBarButtons = () => {
    const { isAuthenticated } = (0, auth0_react_1.useAuth0)();
    return (react_1.default.createElement("div", { className: "mobile-nav-bar__buttons" },
        !isAuthenticated && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(signup_button_1.SignupButton, null),
            react_1.default.createElement(login_button_1.LoginButton, null))),
        isAuthenticated && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(logout_button_1.LogoutButton, null)))));
};
exports.MobileNavBarButtons = MobileNavBarButtons;


/***/ }),

/***/ "./src/components/navigation/mobile/mobile-nav-bar-tab.tsx":
/*!*****************************************************************!*\
  !*** ./src/components/navigation/mobile/mobile-nav-bar-tab.tsx ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MobileNavBarTab = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const MobileNavBarTab = ({ path, label, handleClick, }) => {
    return (react_1.default.createElement(react_router_dom_1.NavLink, { to: path, onClick: handleClick, exact: true, className: "mobile-nav-bar__tab", activeClassName: "mobile-nav-bar__tab--active" }, label));
};
exports.MobileNavBarTab = MobileNavBarTab;


/***/ }),

/***/ "./src/components/navigation/mobile/mobile-nav-bar-tabs.tsx":
/*!******************************************************************!*\
  !*** ./src/components/navigation/mobile/mobile-nav-bar-tabs.tsx ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MobileNavBarTabs = void 0;
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const mobile_nav_bar_tab_1 = __webpack_require__(/*! ./mobile-nav-bar-tab */ "./src/components/navigation/mobile/mobile-nav-bar-tab.tsx");
const MobileNavBarTabs = ({ handleClick, }) => {
    const { isAuthenticated } = (0, auth0_react_1.useAuth0)();
    return (react_1.default.createElement("div", { className: "mobile-nav-bar__tabs" },
        react_1.default.createElement(mobile_nav_bar_tab_1.MobileNavBarTab, { path: "/profile", label: "Profile", handleClick: handleClick }),
        react_1.default.createElement(mobile_nav_bar_tab_1.MobileNavBarTab, { path: "/public", label: "Public", handleClick: handleClick }),
        isAuthenticated && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(mobile_nav_bar_tab_1.MobileNavBarTab, { path: "/protected", label: "Protected", handleClick: handleClick }),
            react_1.default.createElement(mobile_nav_bar_tab_1.MobileNavBarTab, { path: "/admin", label: "Admin", handleClick: handleClick })))));
};
exports.MobileNavBarTabs = MobileNavBarTabs;


/***/ }),

/***/ "./src/components/navigation/mobile/mobile-nav-bar.tsx":
/*!*************************************************************!*\
  !*** ./src/components/navigation/mobile/mobile-nav-bar.tsx ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MobileNavBar = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const mobile_menu_toggle_button_1 = __webpack_require__(/*! ./mobile-menu-toggle-button */ "./src/components/navigation/mobile/mobile-menu-toggle-button.tsx");
const mobile_nav_bar_brand_1 = __webpack_require__(/*! ./mobile-nav-bar-brand */ "./src/components/navigation/mobile/mobile-nav-bar-brand.tsx");
const mobile_nav_bar_buttons_1 = __webpack_require__(/*! ./mobile-nav-bar-buttons */ "./src/components/navigation/mobile/mobile-nav-bar-buttons.tsx");
const mobile_nav_bar_tabs_1 = __webpack_require__(/*! ./mobile-nav-bar-tabs */ "./src/components/navigation/mobile/mobile-nav-bar-tabs.tsx");
var MobileMenuState;
(function (MobileMenuState) {
    MobileMenuState["CLOSED"] = "closed";
    MobileMenuState["OPEN"] = "open";
})(MobileMenuState || (MobileMenuState = {}));
var MobileMenuIcon;
(function (MobileMenuIcon) {
    MobileMenuIcon["CLOSE"] = "close";
    MobileMenuIcon["MENU"] = "menu";
})(MobileMenuIcon || (MobileMenuIcon = {}));
const MobileNavBar = () => {
    const [mobileMenuState, setMobileMenuState] = react_1.default.useState(MobileMenuState.CLOSED);
    const [mobileMenuIcon, setMobileMenuIcon] = react_1.default.useState(MobileMenuIcon.MENU);
    const isMobileMenuOpen = () => {
        return mobileMenuState === MobileMenuState.OPEN;
    };
    const closeMobileMenu = () => {
        document.body.classList.remove("mobile-scroll-lock");
        setMobileMenuState(MobileMenuState.CLOSED);
        setMobileMenuIcon(MobileMenuIcon.MENU);
    };
    const openMobileMenu = () => {
        document.body.classList.add("mobile-scroll-lock");
        setMobileMenuState(MobileMenuState.OPEN);
        setMobileMenuIcon(MobileMenuIcon.CLOSE);
    };
    const toggleMobileMenu = () => {
        if (isMobileMenuOpen()) {
            closeMobileMenu();
        }
        else {
            openMobileMenu();
        }
    };
    return (react_1.default.createElement("div", { className: "mobile-nav-bar__container" },
        react_1.default.createElement("nav", { className: "mobile-nav-bar" },
            react_1.default.createElement(mobile_nav_bar_brand_1.MobileNavBarBrand, { handleClick: closeMobileMenu }),
            react_1.default.createElement(mobile_menu_toggle_button_1.MobileMenuToggleButton, { icon: mobileMenuIcon, handleClick: toggleMobileMenu }),
            isMobileMenuOpen() && (react_1.default.createElement("div", { className: "mobile-nav-bar__menu" },
                react_1.default.createElement(mobile_nav_bar_tabs_1.MobileNavBarTabs, { handleClick: closeMobileMenu }),
                react_1.default.createElement(mobile_nav_bar_buttons_1.MobileNavBarButtons, null))))));
};
exports.MobileNavBar = MobileNavBar;


/***/ }),

/***/ "./src/components/page-footer-hyperlink.tsx":
/*!**************************************************!*\
  !*** ./src/components/page-footer-hyperlink.tsx ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PageFooterHyperlink = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const PageFooterHyperlink = ({ children, path, }) => {
    return (react_1.default.createElement("a", { className: "page-footer__hyperlink", href: path, target: "_blank", rel: "noopener noreferrer" }, children));
};
exports.PageFooterHyperlink = PageFooterHyperlink;


/***/ }),

/***/ "./src/components/page-footer.tsx":
/*!****************************************!*\
  !*** ./src/components/page-footer.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PageFooter = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const page_footer_hyperlink_1 = __webpack_require__(/*! ./page-footer-hyperlink */ "./src/components/page-footer-hyperlink.tsx");
const PageFooter = () => {
    const resourceList = [
        {
            path: "https://auth0.com/why-auth0/",
            label: "Why Auth0",
        },
        {
            path: "https://auth0.com/docs/get-started",
            label: "How It Works",
        },
        {
            path: "https://auth0.com/blog/developers/",
            label: "Developer Blog",
        },
        {
            path: "https://auth0.com/contact-us",
            label: "Contact an Expert",
        },
    ];
    return (react_1.default.createElement("footer", { className: "page-footer" },
        react_1.default.createElement("div", { className: "page-footer-grid" },
            react_1.default.createElement("div", { className: "page-footer-grid__info" },
                react_1.default.createElement("div", { className: "page-footer-info__message" },
                    react_1.default.createElement("p", { className: "page-footer-message__headline" },
                        react_1.default.createElement("span", null, "This sample application is brought to you by\u00A0"),
                        react_1.default.createElement(page_footer_hyperlink_1.PageFooterHyperlink, { path: "https://auth0.com/" }, "Auth0")),
                    react_1.default.createElement("p", { className: "page-footer-message__description" },
                        react_1.default.createElement(page_footer_hyperlink_1.PageFooterHyperlink, { path: "https://auth0.com/docs/quickstarts/" },
                            react_1.default.createElement("span", null, "Securely implement authentication using Auth0 on any stack and any device\u00A0"),
                            react_1.default.createElement("u", null, "in less than 10 minutes")))),
                react_1.default.createElement("div", { className: "page-footer-info__button" },
                    react_1.default.createElement("a", { id: "create-account-button", className: "button button--secondary", href: "https://auth0.com/signup", target: "_blank", rel: "noreferrer noopener" }, "Create Free Auth0 Account")),
                react_1.default.createElement("div", { className: "page-footer-info__resource-list" }, resourceList.map((resource) => (react_1.default.createElement("div", { key: resource.path, className: "page-footer-info__resource-list-item" },
                    react_1.default.createElement(page_footer_hyperlink_1.PageFooterHyperlink, { path: resource.path }, resource.label)))))),
            react_1.default.createElement("div", { className: "page-footer-grid__brand" },
                react_1.default.createElement("div", { className: "page-footer-brand" },
                    react_1.default.createElement("img", { className: "page-footer-brand__logo", src: "https://cdn.auth0.com/blog/hello-auth0/auth0-shield.svg", alt: "Auth0", width: "20", height: "22.22" }),
                    react_1.default.createElement(page_footer_hyperlink_1.PageFooterHyperlink, { path: "https://auth0.com/" }, "Auth0 Inc"))))));
};
exports.PageFooter = PageFooter;


/***/ }),

/***/ "./src/components/page-layout.tsx":
/*!****************************************!*\
  !*** ./src/components/page-layout.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PageLayout = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const nav_bar_1 = __webpack_require__(/*! ./navigation/desktop/nav-bar */ "./src/components/navigation/desktop/nav-bar.tsx");
const mobile_nav_bar_1 = __webpack_require__(/*! ./navigation/mobile/mobile-nav-bar */ "./src/components/navigation/mobile/mobile-nav-bar.tsx");
const page_footer_1 = __webpack_require__(/*! ./page-footer */ "./src/components/page-footer.tsx");
const PageLayout = ({ children }) => {
    return (react_1.default.createElement("div", { className: "page-layout bg-blue-100" },
        react_1.default.createElement(nav_bar_1.NavBar, null),
        react_1.default.createElement(mobile_nav_bar_1.MobileNavBar, null),
        react_1.default.createElement("div", { className: "page-layout__content" }, children),
        react_1.default.createElement(page_footer_1.PageFooter, null)));
};
exports.PageLayout = PageLayout;


/***/ }),

/***/ "./src/components/page-loader.tsx":
/*!****************************************!*\
  !*** ./src/components/page-loader.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PageLoader = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const PageLoader = () => {
    const loadingImg = "https://cdn.auth0.com/blog/hello-auth0/loader.svg";
    return (react_1.default.createElement("div", { className: "loader" },
        react_1.default.createElement("img", { src: loadingImg, alt: "Loading..." })));
};
exports.PageLoader = PageLoader;


/***/ }),

/***/ "./src/components/protected-route.tsx":
/*!********************************************!*\
  !*** ./src/components/protected-route.tsx ***!
  \********************************************/
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
exports.ProtectedRoute = void 0;
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const page_loader_1 = __webpack_require__(/*! ./page-loader */ "./src/components/page-loader.tsx");
const ProtectedRoute = (_a) => {
    var { component } = _a, args = __rest(_a, ["component"]);
    return (react_1.default.createElement(react_router_dom_1.Route, Object.assign({ component: (0, auth0_react_1.withAuthenticationRequired)(component, {
            onRedirecting: () => (react_1.default.createElement("div", { className: "page-layout" },
                react_1.default.createElement(page_loader_1.PageLoader, null))),
        }) }, args)));
};
exports.ProtectedRoute = ProtectedRoute;


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_dom_1 = __importDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const App_1 = __webpack_require__(/*! ./App */ "./src/App.tsx");
const auth0_provider_with_history_1 = __webpack_require__(/*! ./auth0-provider-with-history */ "./src/auth0-provider-with-history.tsx");
react_dom_1.default.render(react_1.default.createElement(react_1.default.StrictMode, null,
    react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(auth0_provider_with_history_1.Auth0ProviderWithHistory, null,
            react_1.default.createElement(App_1.App, null)))), document.getElementById("root"));


/***/ }),

/***/ "./src/pages/admin-page.tsx":
/*!**********************************!*\
  !*** ./src/pages/admin-page.tsx ***!
  \**********************************/
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminPage = void 0;
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const code_snippet_1 = __webpack_require__(/*! ../components/code-snippet */ "./src/components/code-snippet.tsx");
const page_layout_1 = __webpack_require__(/*! ../components/page-layout */ "./src/components/page-layout.tsx");
const message_service_1 = __webpack_require__(/*! ../services/message.service */ "./src/services/message.service.ts");
const AdminPage = () => {
    const [message, setMessage] = (0, react_1.useState)("");
    const { getAccessTokenSilently } = (0, auth0_react_1.useAuth0)();
    (0, react_1.useEffect)(() => {
        let isMounted = true;
        const getMessage = () => __awaiter(void 0, void 0, void 0, function* () {
            const accessToken = yield getAccessTokenSilently();
            const { data, error } = yield (0, message_service_1.getAdminResource)(accessToken);
            if (!isMounted) {
                return;
            }
            if (data) {
                setMessage(JSON.stringify(data, null, 2));
            }
            if (error) {
                setMessage(JSON.stringify(error, null, 2));
            }
        });
        getMessage();
        return () => {
            isMounted = false;
        };
    }, [getAccessTokenSilently]);
    return (react_1.default.createElement(page_layout_1.PageLayout, null,
        react_1.default.createElement("div", { className: "content-layout" },
            react_1.default.createElement("h1", { id: "page-title", className: "content__title" }, "Admin Page"),
            react_1.default.createElement("div", { className: "content__body" },
                react_1.default.createElement("p", { id: "page-description" },
                    react_1.default.createElement("span", null,
                        "This page retrieves an ",
                        react_1.default.createElement("strong", null, "admin message"),
                        " from an external API."),
                    react_1.default.createElement("span", null,
                        react_1.default.createElement("strong", null,
                            "Only authenticated users with the",
                            " ",
                            react_1.default.createElement("code", null, "read:admin-messages"),
                            " permission should access this page."))),
                react_1.default.createElement(code_snippet_1.CodeSnippet, { title: "Admin Message", code: message })))));
};
exports.AdminPage = AdminPage;


/***/ }),

/***/ "./src/pages/callback-page.tsx":
/*!*************************************!*\
  !*** ./src/pages/callback-page.tsx ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CallbackPage = void 0;
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const nav_bar_1 = __webpack_require__(/*! ../components/navigation/desktop/nav-bar */ "./src/components/navigation/desktop/nav-bar.tsx");
const mobile_nav_bar_1 = __webpack_require__(/*! ../components/navigation/mobile/mobile-nav-bar */ "./src/components/navigation/mobile/mobile-nav-bar.tsx");
const page_layout_1 = __webpack_require__(/*! ../components/page-layout */ "./src/components/page-layout.tsx");
const CallbackPage = () => {
    const { error } = (0, auth0_react_1.useAuth0)();
    console.log(`callback`, error);
    if (error) {
        return (react_1.default.createElement(page_layout_1.PageLayout, null,
            react_1.default.createElement("div", { className: "content-layout" },
                react_1.default.createElement("h1", { id: "page-title", className: "content__title" }, "Error"),
                react_1.default.createElement("div", { className: "content__body" },
                    react_1.default.createElement("p", { id: "page-description" },
                        react_1.default.createElement("span", null, error.message))))));
    }
    return (react_1.default.createElement("div", { className: "page-layout" },
        react_1.default.createElement(nav_bar_1.NavBar, null),
        react_1.default.createElement(mobile_nav_bar_1.MobileNavBar, null),
        react_1.default.createElement("div", { className: "page-layout__content" })));
};
exports.CallbackPage = CallbackPage;


/***/ }),

/***/ "./src/pages/home-page.tsx":
/*!*********************************!*\
  !*** ./src/pages/home-page.tsx ***!
  \*********************************/
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
const uuid_1 = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/commonjs-browser/index.js");
const api_service_1 = __importDefault(__webpack_require__(/*! @services/api-service */ "./src/services/api-service.ts"));
const Layout_1 = __importDefault(__webpack_require__(/*! @components/Layout */ "./src/components/Layout.tsx"));
const Button_1 = __importDefault(__webpack_require__(/*! @components/base/Button */ "./src/components/base/Button.tsx"));
const appContext_1 = __importDefault(__webpack_require__(/*! @src/appContext */ "./src/appContext.ts"));
const Input_1 = __importDefault(__webpack_require__(/*! @components/base/Input */ "./src/components/base/Input.tsx"));
const Image_1 = __importDefault(__webpack_require__(/*! @components/base/Image */ "./src/components/base/Image.tsx"));
const localStorage_1 = __importDefault(__webpack_require__(/*! ../utils/localStorage */ "./src/utils/localStorage.ts"));
const API_SERVER_URL = api_service_1.default.getVar('API_SERVER_URL');
const Index = () => {
    const { setPrompt, prompt } = react_1.default.useContext(appContext_1.default);
    const [promptString, setPromptString] = react_1.default.useState();
    const submit = () => {
        setPrompt(Object.assign(Object.assign({}, prompt), { value: promptString, id: (0, uuid_1.v4)(), loading: true }));
    };
    react_1.default.useEffect(() => {
        var _a;
        function fetchData(promptValue) {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield api_service_1.default.getImage(promptValue);
                console.log(response);
                if (response === null || response === void 0 ? void 0 : response.error) {
                    console.error(`Unable to generated for prompt! ${response.error}`);
                    return;
                }
                if (!(response === null || response === void 0 ? void 0 : response.file)) {
                    console.error('Missing required file');
                    return;
                }
                const url = `${API_SERVER_URL}/${response.file}`;
                const newPromptVal = Object.assign(Object.assign({}, prompt), { url, loading: false });
                setPrompt(newPromptVal);
                localStorage_1.default.setPrompt(newPromptVal);
            });
        }
        const hasNewPromptId = ((_a = localStorage_1.default.getPrompt()) === null || _a === void 0 ? void 0 : _a.id) !== (prompt === null || prompt === void 0 ? void 0 : prompt.id);
        if ((prompt === null || prompt === void 0 ? void 0 : prompt.value) && hasNewPromptId) {
            fetchData(prompt === null || prompt === void 0 ? void 0 : prompt.value);
        }
    }, [
        prompt,
        setPrompt,
    ]);
    return (react_1.default.createElement(Layout_1.default, null,
        react_1.default.createElement("div", { className: "flex flex-row gap-x-2" },
            react_1.default.createElement(Input_1.default, { value: prompt === null || prompt === void 0 ? void 0 : prompt.value, onChange: setPromptString, className: "grow", placeholder: "enter a prompt, like 'cat dancing on the moon'", autoFocus: true }),
            react_1.default.createElement(Button_1.default, { onClick: submit }, "Go!")),
        react_1.default.createElement("div", null,
            react_1.default.createElement(Image_1.default, null))));
};
exports["default"] = Index;


/***/ }),

/***/ "./src/pages/not-found-page.tsx":
/*!**************************************!*\
  !*** ./src/pages/not-found-page.tsx ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotFoundPage = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const page_layout_1 = __webpack_require__(/*! ../components/page-layout */ "./src/components/page-layout.tsx");
const NotFoundPage = () => {
    return (react_1.default.createElement(page_layout_1.PageLayout, null,
        react_1.default.createElement("div", { className: "content-layout" },
            react_1.default.createElement("h1", { id: "page-title", className: "content__title" }, "Not Found"))));
};
exports.NotFoundPage = NotFoundPage;


/***/ }),

/***/ "./src/pages/profile-page.tsx":
/*!************************************!*\
  !*** ./src/pages/profile-page.tsx ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfilePage = void 0;
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const code_snippet_1 = __webpack_require__(/*! ../components/code-snippet */ "./src/components/code-snippet.tsx");
const Layout_1 = __importDefault(__webpack_require__(/*! @components/Layout */ "./src/components/Layout.tsx"));
const appContext_1 = __importDefault(__webpack_require__(/*! @src/appContext */ "./src/appContext.ts"));
const ProfilePage = () => {
    const { setPrompt, prompt } = react_1.default.useContext(appContext_1.default);
    console.log('here at all?', prompt);
    const { user } = (0, auth0_react_1.useAuth0)();
    console.log(user);
    // const { user } = useAuth0();
    // if (!user) {
    //   return null;
    // }
    return (react_1.default.createElement(Layout_1.default, null,
        react_1.default.createElement("div", { className: "content-layout" },
            react_1.default.createElement("h1", { id: "page-title", className: "content__title" }, "Profile Page"),
            react_1.default.createElement("div", { className: "content__body" },
                react_1.default.createElement("p", { id: "page-description" },
                    react_1.default.createElement("span", null,
                        "You can use the ",
                        react_1.default.createElement("strong", null, "ID Token"),
                        " to get the profile information of an authenticated user."),
                    react_1.default.createElement("span", null,
                        react_1.default.createElement("strong", null, "Only authenticated users can access this page."))),
                react_1.default.createElement("div", { className: "profile-grid" },
                    react_1.default.createElement("div", { className: "profile__header" },
                        react_1.default.createElement("img", { src: user.picture, alt: "Profile", className: "profile__avatar" }),
                        react_1.default.createElement("div", { className: "profile__headline" },
                            react_1.default.createElement("h2", { className: "profile__title" }, user.name),
                            react_1.default.createElement("span", { className: "profile__description" }, user.email))),
                    react_1.default.createElement("div", { className: "profile__details" },
                        react_1.default.createElement(code_snippet_1.CodeSnippet, { title: "Decoded ID Token", code: JSON.stringify(user, null, 2) })))))));
};
exports.ProfilePage = ProfilePage;


/***/ }),

/***/ "./src/pages/protected-page.tsx":
/*!**************************************!*\
  !*** ./src/pages/protected-page.tsx ***!
  \**************************************/
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProtectedPage = void 0;
const auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const code_snippet_1 = __webpack_require__(/*! ../components/code-snippet */ "./src/components/code-snippet.tsx");
const page_layout_1 = __webpack_require__(/*! ../components/page-layout */ "./src/components/page-layout.tsx");
const message_service_1 = __webpack_require__(/*! ../services/message.service */ "./src/services/message.service.ts");
const ProtectedPage = () => {
    const [message, setMessage] = (0, react_1.useState)("");
    const { getAccessTokenSilently } = (0, auth0_react_1.useAuth0)();
    (0, react_1.useEffect)(() => {
        let isMounted = true;
        const getMessage = () => __awaiter(void 0, void 0, void 0, function* () {
            const accessToken = yield getAccessTokenSilently();
            const { data, error } = yield (0, message_service_1.getProtectedResource)(accessToken);
            if (!isMounted) {
                return;
            }
            if (data) {
                setMessage(JSON.stringify(data, null, 2));
            }
            if (error) {
                setMessage(JSON.stringify(error, null, 2));
            }
        });
        getMessage();
        return () => {
            isMounted = false;
        };
    }, [getAccessTokenSilently]);
    return (react_1.default.createElement(page_layout_1.PageLayout, null,
        react_1.default.createElement("div", { className: "content-layout" },
            react_1.default.createElement("h1", { id: "page-title", className: "content__title" }, "Protected Page"),
            react_1.default.createElement("div", { className: "content__body" },
                react_1.default.createElement("p", { id: "page-description" },
                    react_1.default.createElement("span", null,
                        "This page retrieves a ",
                        react_1.default.createElement("strong", null, "protected message"),
                        " from an external API."),
                    react_1.default.createElement("span", null,
                        react_1.default.createElement("strong", null, "Only authenticated users can access this page."))),
                react_1.default.createElement(code_snippet_1.CodeSnippet, { title: "Protected Message", code: message })))));
};
exports.ProtectedPage = ProtectedPage;


/***/ }),

/***/ "./src/pages/public-page.tsx":
/*!***********************************!*\
  !*** ./src/pages/public-page.tsx ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PublicPage = void 0;
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const message_service_1 = __webpack_require__(/*! ../services/message.service */ "./src/services/message.service.ts");
const PublicPage = () => {
    const [message, setMessage] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        let isMounted = true;
        const getMessage = () => __awaiter(void 0, void 0, void 0, function* () {
            const { data, error } = yield (0, message_service_1.getPublicResource)();
            if (!isMounted) {
                return;
            }
            if (data) {
                setMessage(JSON.stringify(data, null, 2));
            }
            if (error) {
                setMessage(JSON.stringify(error, null, 2));
            }
        });
        getMessage();
        return () => {
            isMounted = false;
        };
    }, []);
    return (react_1.default.createElement("div", null, "Public Page"));
};
exports.PublicPage = PublicPage;


/***/ }),

/***/ "./src/services/api-service.ts":
/*!*************************************!*\
  !*** ./src/services/api-service.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const fetch_1 = __importDefault(__webpack_require__(/*! ../utils/fetch */ "./src/utils/fetch.ts"));
window.promptiverse = window.promptiverse || {};
const ApiService = {
    getVar: (name) => {
        if (!window.promptiverse || !window.promptiverse.vars) {
            return undefined;
        }
        return window.promptiverse.vars[name];
    },
    getImage(prompt) {
        const apiUrl = ApiService.getVar('API_SERVER_URL');
        return (0, fetch_1.default)(`${apiUrl}/prompt`, {
            method: 'POST',
            postBody: { prompt },
        });
    },
};
exports["default"] = ApiService;


/***/ }),

/***/ "./src/services/external-api.service.ts":
/*!**********************************************!*\
  !*** ./src/services/external-api.service.ts ***!
  \**********************************************/
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
exports.callExternalApi = void 0;
const axios_1 = __importDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));
const callExternalApi = (options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, axios_1.default)(options.config);
        const { data } = response;
        return {
            data,
            error: null,
        };
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            const axiosError = error;
            const { response } = axiosError;
            let message = "http request failed";
            if (response && response.statusText) {
                message = response.statusText;
            }
            if (axiosError.message) {
                message = axiosError.message;
            }
            if (response && response.data && response.data.message) {
                message = response.data.message;
            }
            return {
                data: null,
                error: {
                    message,
                },
            };
        }
        return {
            data: null,
            error: {
                message: error.message,
            },
        };
    }
});
exports.callExternalApi = callExternalApi;


/***/ }),

/***/ "./src/services/message.service.ts":
/*!*****************************************!*\
  !*** ./src/services/message.service.ts ***!
  \*****************************************/
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
exports.getAdminResource = exports.getProtectedResource = exports.getPublicResource = void 0;
const external_api_service_1 = __webpack_require__(/*! ./external-api.service */ "./src/services/external-api.service.ts");
const api_service_1 = __importDefault(__webpack_require__(/*! @services/api-service */ "./src/services/api-service.ts"));
const apiServerUrl = api_service_1.default.getVar('API_SERVER_URL');
const getPublicResource = () => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        url: `${apiServerUrl}/api/messages/public`,
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    };
    const { data, error } = (yield (0, external_api_service_1.callExternalApi)({ config }));
    return {
        data,
        error,
    };
});
exports.getPublicResource = getPublicResource;
const getProtectedResource = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        url: `${apiServerUrl}/api/messages/protected`,
        method: "GET",
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };
    const { data, error } = (yield (0, external_api_service_1.callExternalApi)({ config }));
    return {
        data,
        error,
    };
});
exports.getProtectedResource = getProtectedResource;
const getAdminResource = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        url: `${apiServerUrl}/api/messages/admin`,
        method: "GET",
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };
    const { data, error } = (yield (0, external_api_service_1.callExternalApi)({ config }));
    return {
        data,
        error,
    };
});
exports.getAdminResource = getAdminResource;


/***/ }),

/***/ "./src/utils/fetch.ts":
/*!****************************!*\
  !*** ./src/utils/fetch.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const fetcher = (url, options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const fetchOptions = Object.assign({ method: (options === null || options === void 0 ? void 0 : options.method) || 'GET', headers: {
                'Accept': ((_a = options === null || options === void 0 ? void 0 : options.headers) === null || _a === void 0 ? void 0 : _a.Accept) || 'application/json',
                'Content-Type': ((_b = options === null || options === void 0 ? void 0 : options.headers) === null || _b === void 0 ? void 0 : _b['Content-Type']) || 'application/json',
                'Authorization': ((_c = options === null || options === void 0 ? void 0 : options.headers) === null || _c === void 0 ? void 0 : _c.Authorization) || '',
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
    setPrompt: (prompt) => {
        console.log('trying to set in ls: ', prompt);
        if (!LocalStorage.localStorageExists() || !prompt) {
            return;
        }
        localStorage.setItem(`${localStorageNamespace}.prompt`, JSON.stringify(prompt));
    },
    getPrompt: () => {
        if (!LocalStorage.localStorageExists()) {
            return;
        }
        const val = localStorage.getItem(`${localStorageNamespace}.prompt`);
        if (!val) {
            return;
        }
        return JSON.parse(val);
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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./src/index.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.bundle.js.map