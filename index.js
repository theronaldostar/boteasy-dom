/**
 * @license Boteasy-DOM
 * index.js
 * 
 * @license MIT
 * @copyright (c) since 2021 Boteasy, all rights reserved.
 * 
 * @description This document is inspired by React, React-router, jQuery and styled-components, the aim is to have a merge of everything good in one documentation.
 */

(function (global, factory) {
	typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
	typeof define === "function" && define.amd ? define(["exports"], factory) :
	(global = global || self, factory(global.BoteasyDOM = {}));
} (this, (function(exports) {

	let currentRoot = null;
	let dispatcher = {};
	let themeStorage = {};

	const version = "1.2.6-remake";
	const Fragment = Symbol.for("fragment");
	const Obg = Object;

	const { console, localStorage, location, navigator, scroll } = window;

	const nodeList = selector => document.querySelectorAll(selector || "*");

	const match = (object, index) => {
		let item = {...object}[index];
		const test = prop => typeof prop === "function";
		if (item === undefined) return test(object.default || null) ? object.default() : object.default;
		return test(item) ? item() : item;
	};

	const useId = (start = 2, selectable = false) => {
		const i = start >= 2 && start <= 9 ? start : 2;
		const first = Date.now().toString(36);
		const last = Math.random().toString(36).substring(i);
		const string = first + last;
		return selectable ? string : `:${string}:`;
	};

	const useRef = (initialRef = null) => {

		const hookId = useId(undefined, true);

		if (typeof initialRef === "function") initialRef = initialRef();

		const getRef = key => {
			const hooks = dispatcher[currentRoot].hooks;
			if (!hooks[key]) hooks[key] = initialRef;
			return hooks[key];
		};

		const setRef = ({ target }) => {
			/**
			 * TODO: Under Construction
			 * this function is incomplete.
			*/
			console.warn(`<element ref={ref} />: (${target.value})`);
		};

		let value = getRef(hookId);

		return { value, setRef };
	};

	const useHtml = (selector, value) => {
		const list = nodeList(selector);
		list.length >= 1 && list.forEach(target => target.innerHTML = value || "");
	};

	const useAppend = (selector, element, position = false) => {
		const list = nodeList(selector);
		list.length >= 1 && list.forEach(target => target.insertAdjacentHTML(!position ? "afterbegin" : "beforeend", element));
	};

	const useWait = action => {
		const value = match({ true: "none", false: undefined, default: undefined }, String(action));
		const list = nodeList("html, head, body");
		list.length >= 1 && list.forEach(selector => selector.style["pointer-events"] = value);
	};

	const useProp = (selector, attribute, newValue = true) => {
		const attr = typeof newValue === "string" ? (newValue === "true" || newValue === "false" ? JSON.parse(newValue) : true) : newValue;
		const list = nodeList(selector);
		list.length >= 1 && list.forEach(target => target[attribute] = attr);
	};

	const useRequest = props => {

		const url = props?.url || "";
		const method = props?.method?.toUpperCase() || "GET";
		const headers = new Headers(props?.headers || {});
		const data = new URLSearchParams(props?.data || {});
		const params = method === "GET" ? `?${data.toString()}` : data.toString();
		const dataType = props?.dataType?.toLowerCase() || "json";
		const success = props?.success || function() {};
		const error = props?.error || function(error) {throw error};
		const $finally = props?.finally || function() {};

		const endPoint = method === "GET" ? params : "";
		const body = method === "GET" ? null : params;
		const link = url+endPoint;

		const callback = {
			responseText: undefined,
			responseJSON: undefined,
			type: "connection",
			status: "connection::ERROR",
			statusText: "Check your internet connection or the working status of the [url] in question."
		};

		if (method !== "GET") headers.append("Content-Type", "application/x-www-form-urlencoded");

		fetch(link, { method, headers, body }).then(async response => {
			if (!response.ok) {
				callback.type = response.type;
				callback.status = response.status;
				callback.statusText = response.statusText;
				let resolve = response.text();
				await resolve.then(data => {
					callback.responseText = data;
					callback.responseJSON = JSON.parse(data);
					throw callback;
				});
			};
			return response[dataType]();
		}).then(success).catch(data => error({...callback, data})).finally($finally);
	};

	const useVibrate = (pattern = 1000) => {
		const set = time => navigator.vibrate(time);
		"vibrate" in navigator && set(pattern);
	};

	const useClipboard = (value, effect = function() {}) => {
		const test = "clipboard" in navigator;
		test && navigator.clipboard.writeText(value).then(effect);
	};

	const isObj = data => {
		const type = typeof data === "object";
		const length = Obg.keys(data || {}).length > 0;
		return data !== null && type && length;
	};

	const useTwins = (primary = {}, secondary = {}) => {

		let isTwins = true;
		const $primary = Obg.keys(primary || {});
		const $secondary = Obg.keys(secondary || {});

		const isObj = object => {
			const type = typeof object === "object";
			const length = Obg.keys(object || {}).length > 0;
			return object !== null && type && length;
		};

		if ($primary.length !== $secondary.length) return false;

		if (!isObj(primary) || !isObj(secondary)) {
			if (primary === secondary) return true;
			return false;
		};

		const forEach = ($primary, $secondary) => {
			Obg.entries($primary).map(([i, value]) => {
				const $value = $secondary[i];
				if (isObj(value) && isObj($value)) {
					forEach(value, $value);
					return;
				};
				if (typeof value !== typeof $value) isTwins = false;
				if (JSON.stringify(value) !== JSON.stringify($value)) isTwins = false;
			});
		};

		forEach(primary, secondary);

		return isTwins;
	};

	const useFloat = (value, fixed = 0) => {
		const amount = typeof value === "number" ? value : Number(value) || NaN;
		const isFloat = amount => /^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(amount);
		return isFloat(amount) ? Number(isFloat(fixed) && fixed >= 1 ? amount.toFixed(fixed) : amount) : NaN;
	};

	const useState = (initialState = null) => {

		const hookId = useId(undefined, true);

		let hooks = dispatcher[currentRoot].hooks;

		if (typeof initialState === "function") initialState = initialState();

		const getState = key => {
			if (!hooks[key]) hooks[key] = { state: initialState };
			return hooks[key];
		};

		const setState = newState => {
			let prev = getState(hookId);
			typeof newState === "function" ? prev.state = newState(prev.state) : prev.state = newState;
			hooks[hookId] = prev;
		};

		let state = getState(hookId);

		return [state, setState];
	};

	const useEffect = (effect, deps = []) => {

		const hookId = useId(undefined, true);

		let hooks = dispatcher[currentRoot].hooks;

		if (hooks[hookId] !== undefined) {
			/**
			 * TODO: Under Construction
			 * this function is incomplete.
			*/
		} else {
			effect();
			hooks[hookId] = { effect, deps };
			console.warn(".useEffect(() => {...}, [...]): Under development!!!");
		};
	};

	const useStorage = () => {
		const local = localStorage;
		return (key, value) => {
			const item = local.getItem(key);
			if (key && value !== undefined) {
				if (typeof value === "function") value = value();
				local.setItem(key, typeof value === "object" ? JSON.stringify(value) : value);
			} else if (key && !value) {
				return (item === "null" || /s}|{s*/.test(item)) ? JSON.parse(item) : item;
			};
			return $key => typeof $key === "string" ? local.removeItem($key) : local.clear();
		};
	};

	const useNavigate = (delay = 0) => {
		const data = location;
		return (to = ".", historic = true) => {
			const action = () => historic ? data.assign(to) : data.replace(to);
			to && delay > 0 ? setTimeout(() => action(), delay) : action();
		};
	};

	const useScroll = (selector, options = {}) => {

		const {
			behavior = "auto",
			offset = { top: 0, left: 0 }
		} = options;

		const element = document.querySelector(selector || "body");

		const set = props => scroll(props);

		const props = coord => ({
			get value() {
				const { x, y } = element?.getBoundingClientRect() || { x: -0, y: -0 };
				return Math.abs({ top: y, left: x }[coord]);
			},
			start: () => set({ [coord]: 0 }),
			end: () => set({ [coord]: element.scrollHeight }),
			setScroll: val => {
				this.value = val;
				set({[coord]: val, behavior});
			}
		});

		set({...offset});

		return {
			x: props("left"),
			y: props("top")
		};
	};

	const flushAsync = async (callback, arg) => await callback(arg);

	const createElement = (type, props, ...children) => {
		if (typeof type === "function") return type({...props, children});
		return {type, props: {...props}, children};
	};

	const createDOMElement = (type = null, label = null) => (
		match({
			element: () => document.createElement(label),
			text: () => document.createTextNode(label),
			default: () => document.createDocumentFragment()
		}, type)
	);

	const hydrateProp = prop => {
		if (typeof prop === "function") return prop();
		return typeof prop === "string" ? prop.split(/(?=[A-Z])/).join("-").toLocaleLowerCase() : prop;
	};

	const isValidElementType = type => (
		type === Fragment ||
		typeof type === "object" ||
		typeof type === "function" ||
		typeof type === "string" ||
		typeof type === "number"
	) && typeof type !== "undefined";

	const createVirtualNode = virtualNode => {

		let element;
		const type = virtualNode.type || Fragment;
		const props = virtualNode.props || null;
		const isElement = isValidElementType(type || virtualNode);

		if (type && typeof virtualNode.type === "object") {
			virtualNode.type.props = {...virtualNode.type.props, ...virtualNode.props};
			virtualNode.type.children = virtualNode.children;
			return createVirtualNode(virtualNode.type);
		};

		if (isElement) {
			if (typeof virtualNode === "string" || typeof virtualNode === "number") return createDOMElement("text", virtualNode);
			element = typeof type === "undefined" || type === Fragment ? createDOMElement() : createDOMElement("element", type);
		};

		if (props) {
			for (let i in props) {
				const isRef = i === "ref";
				const semantic = /[A-Z]/.test(i);
				const isFn = i.startsWith("on") && semantic;
				if (isRef || isFn) {
					const type = isFn ? i.replace("on", "").toLocaleLowerCase() : "change";
					element.addEventListener(type, isFn ? props[i] : props[i].setRef);
				} else {
					if (semantic) {
						element[i] = props[i];
					} else if (typeof props[i] === "object" && i === "style") {
						Obg.entries(props[i]).map(([name, value]) => {
							const test = typeof value !== "string";
							element.style[test ? name : hydrateProp(name)] = value;
						});
					} else if (typeof props[i] !== "boolean") {
						const toDiscard = { key: true, __self: true, __source: true };
						!toDiscard[i] && element.setAttribute(i, props[i]);
					};
				};
			};
		};

		if (Array.isArray(virtualNode)) {
			virtualNode.map(children => element.appendChild(createVirtualNode(children)));
		} else {
			(virtualNode.children || []).map(children => element.appendChild(createVirtualNode(children)));
		};

		return element;
	};

	const unmarkContainer = container => {
		let sibling;
		while (sibling = container.lastChild) container.removeChild(sibling);
	};

	const renderRoot = (container, node) => {
		const i = container.__root$instance;
		const virtualNode = createVirtualNode(node);
		dispatcher[i].mounted = true;
		dispatcher[i].virtualNode = node;
		unmarkContainer(container);
		container.appendChild(virtualNode);
	};

	const isComponent = children => typeof children === "object" && typeof children.props !== "undefined";

	const createRoot = (container, options = false) => {

		const instance = `root$${useId(undefined, true)}`;

		if (!(container && (container.nodeType === 1 || container.nodeType === 9 || container.nodeType === 11))) {
			throw Error(".createRoot(container, {...}): Target container is not a DOM element.");
		} else if (container.nodeType === 1 && container.tagName && container.tagName.toUpperCase() === "BODY") {
			throw Error(".createRoot(container, {...}): Creating roots directly on body is not allowed.");
		};

		container.__root$instance = instance;
		currentRoot = instance;

		dispatcher[instance] = {
			options,
			virtualNode: null,
			mounted: false,
			hooks: { container }
		};

		const render = children => {
			if (isComponent(children)) {
				if (!dispatcher[instance].virtualNode && container.lastChild === null) {
					renderRoot(container, children);
					const $response = dispatcher[instance].options?.response;
					typeof $response === "function" && $response();
				} else throw Error(".render(</>): It looks like the Boteasy-dom container was removed without using Boteasy-dom. Instead, call .unmount() to empty the root's container.");
			} else throw Error(`.render(</>): The passed component is invalid, you must pass an object, created by Boteasy-dom itself. Example: BoteasyDOM.jsxDEV("label", {className: "greeting"}, "Hello, world!");`);
		};

		const unmount = () => {
			if (!dispatcher[instance].mounted) {
				delete dispatcher[instance];
				unmarkContainer(container);
			} else throw Error(".unmount(): Container cannot be emptied as it does not contain content rendered and recognized by Boteasy-dom.");
		};

		return { render, unmount };
	};

	const hydrateRoot = (container, children) => {
		const instance = container?.__root$instance;
		if (dispatcher[instance]?.options?.hydrate) {
			if (isComponent(children)) {
				if (dispatcher[instance].mounted && container.lastChild !== null) {
					if (!useTwins(dispatcher[instance].virtualNode, children)) {
						renderRoot(container, children);
						const response = dispatcher[instance].options?.response;
						typeof response === "function" && response();
					} else throw Error(".hydrateRoot(container, </>): You are trying to Hydrate a route by passing a component identical to the one rendered.");
				} else throw Error(".hydrateRoot(container, </>): Cannot update a route that does not have any component rendered by Boteasy-dom");
			} else throw Error(`.hydrateRoot(container, </>): The passed component is invalid, you must pass an object, created by Boteasy-dom itself. Example: BoteasyDOM.jsxDEV("label", {className: "greeting"}, "Hello, world!");`);
		} else throw Error(".hydrateRoot(container, </>): Cannot hydrate this route because the second parameter in .createRoot(container, {...}): Was sent false, null or a object empty when it was created.");
	};

	const StrictMode = props => {
		"use strict";
		const { element, children } = props;
		return /*#__PURE__*/createElement(Fragment, null, element || children);
	};

	const StyleProvider = props => {
		const { theme = {}, element, children } = props;
		themeStorage = theme;
		return /*#__PURE__*/createElement(Fragment, null, element || children);
	};

	const createStyle = (random = "", object) => {

		let css = "";
		let rules = {};

		const forEach = (label, props, $rule = false) => {
			const listing = Obg.entries(props).map(([i, value]) => {
				if (typeof value === "object") {
					let $i = [];
					const test = /^(?=.*[&>~+])/.test(i);
					const operator = test && i.replace(/\s+/g, "").substring(0, 1);
					const tag = i.replace(/\s+/g, "").replace(/&|>|~|\+/gi, "");
					const search = match({"&": "", ">": " > ", "~": " ~ ", "+": " + ", default: " "}, operator);
					if(/^(?=.*[,])/.test(tag)) {
						tag.split(",").map(event => $i.push("".concat(label, search, event)));
						$i = $i.join(",").trim();
					} else $i = label.concat(search, tag).trim();
					forEach($i, value, $rule);
				} else return `${hydrateProp(i)}: ${hydrateProp(value)};`;
			}).join("");
			listing && ($rule ? rules[$rule].css = rules[$rule].css.concat(`${label} {${listing}}`) : css = css.concat(`${label} {${listing}}`));
		};

		Obg.keys(object).map(key => {
			if (key.startsWith("@")) {
				key === "@import" ? css = css.concat(`${key} ${object[key]};`) : rules[key] = {css: "", object: object[key]};
				delete object[key];
			};
		});

		forEach(random, object);

		Obg.entries(rules).map(([i, data]) => {
			forEach(random, data.object, i);
			css = css.concat(`${i} {${data.css}}`);
		});

		return css;
	};

	const cssClass = selector => {
		const split = string => (string || "").replace(/\s/g, "").split(",");
		const replace = (action, list) => {
			const allNode = nodeList(selector);
			allNode.length >= 1 && allNode.forEach(target => target.classList[action](...split(list)));
		};
		const add = classList => replace("add", classList);
		const remove = classList => replace("remove", classList);
		const toggle = classList => replace("toggle", classList);
		return { add, remove, toggle };
	};

	const appendCSSInHead = (cssContent, global = false) => {
		const style = document.querySelector(`head > [data-boteasy="${global ? "global-style" : "style"}"]`);
		if (style) {
			style.insertAdjacentText("beforeend", cssContent);
		} else {
			const newStyle = createDOMElement("element", "style");
			newStyle.setAttribute("data-boteasy", global ? "global-style" : "style");
			newStyle.textContent = cssContent;
			document.querySelector("head").appendChild(newStyle);
		};
	};

	const globalStyle = jssObject => {
		const content = createStyle(undefined, jssObject);
		appendCSSInHead(content, true);
	};

	const cssStyled = jssObject => {
		const random = `jss-${useId(undefined, true)}`;
		const content = createStyle(`.${random}`, jssObject);
		appendCSSInHead(content);
		return random;
	};

	const styled = (tagName, jssObject) => {
		const random = `jss-${useId(6, true)}`;
		const content = createStyle(`.${random}`, jssObject);
		appendCSSInHead(content);
		return /*#__PURE__*/createElement(tagName || "div", { className: random });
	};

	const rgba = (color, opacity = 1) => {

		const isHex = color.startsWith("#");

		const getHex = colorName => {
			const $ = createDOMElement("element", "div");
			$.style.color = colorName;
			const $color = window.getComputedStyle(document.body.appendChild($)).color.match(/\d+/g).map(data => parseInt(data, 10));
			document.body.removeChild($);
			return ($color.length >= 3) ? `#${(((1<<24) + ($color[0] << 16) + ($color[1] << 8) + $color[2]).toString(16).substring(1))}` : "#fff0";
		};

		color = isHex ? color : getHex(color);

		const rgb = color.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_,r,g,b) => "#"+r+r+g+g+b+b).substring(1).match(/.{2}/g).map(x => parseInt(x, 16));
		return `rgba(${rgb}, ${opacity})`;
	};

	exports.theme = themeStorage;
	exports.version = version;
	exports.Fragment = Fragment;
	exports.match = match;
	exports.useId = useId;
	exports.useRef = useRef;
	exports.useHtml = useHtml;
	exports.useAppend = useAppend;
	exports.useWait = useWait;
	exports.useProp = useProp;
	exports.useRequest = useRequest;
	exports.useVibrate = useVibrate;
	exports.useClipboard = useClipboard;
	exports.isObj = isObj;
	exports.useTwins = useTwins;
	exports.useFloat = useFloat;
	exports.useState = useState;
	exports.useEffect = useEffect;
	exports.useStorage = useStorage;
	exports.useNavigate = useNavigate;
	exports.useScroll = useScroll;
	exports.flushAsync = flushAsync;
	exports.createRoot = createRoot;
	exports.hydrateRoot = hydrateRoot;
	exports.StrictMode = StrictMode;
	exports.StyleProvider = StyleProvider;
	exports.createElement = createElement;
	exports.jsxDEV = createElement;
	exports.cssClass = cssClass;
	exports.globalStyle = globalStyle;
	exports.cssStyled = cssStyled;
	exports.styled = styled;
	exports.rgba = rgba;
})));
