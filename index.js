/** 
 * @license Boteasy-DOM
 * index.js
 * 
 * @license MIT
 * @copyright (c) since 2020 Boteasy, all rights reserved.
 * @description This document is inspired by React, React-router, jQuery and styled-components, the aim is to have a merge of everything good in one documentation.
*/

(function (global, factory) {
	typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
	typeof define === "function" && define.amd ? define(["exports"], factory) :
	(global = global || self, factory(global.BoteasyDOM = {}));
} (this, (function(exports) {

	let currentRoot = null;
	let dispatcher = {};

	const version = "1.2.4-next-n7tax8";
	const dom = document;
	const Fragment = Symbol.for("fragment");

	const nodeList = selector => dom.querySelectorAll(selector || "*");

	function match(object, index) {
		let item = {...object}[index];
		const test = prop => typeof prop === "function";
		if (item === undefined) return test(object.default || null) ? object.default() : object.default;
		return test(item) ? item() : item;
	};

	function useId(start = 2) {
		const i = start >= 2 && start <= 9 ? start : 2;
		const first = Date.now().toString(36);
		const last = Math.random().toString(36).substring(i);
		return first + last;
	};

	function useRef(initialRef = null) {

		const hookId = useId();

		if (typeof initialRef === "function") initialRef = initialRef();

		function getRef(key) {
			const hooks = dispatcher[currentRoot].hooks;
			if (!hooks[key]) hooks[key] = initialRef;
			return hooks[key];
		};

		function setRef({ target }) {
			/**
			 * TODO: Under Construction
			 * this function is incomplete.
			*/
			console.warn(`<element ref={ref} />: (${target.value})`);
		};

		let value = getRef(hookId);

		return { value, setRef };
	};

	function useHtml(selector, value) {
		const list = nodeList(selector);
		list.length >= 1 && list.forEach(target => target.innerHTML = value || "");
	};

	function useAppend(selector, element, position = false) {
		const list = nodeList(selector);
		list.length >= 1 && list.forEach(target => target.insertAdjacentHTML(!position ? "afterbegin" : "beforeend", element));
	};

	function useWait(action) {
		const value = match({ true: "none", false: undefined, default: undefined }, String(action));
		const list = nodeList("html, head, body");
		list.length >= 1 && list.forEach(selector => selector.style["pointer-events"] = value);
	};

	function useProp(selector, attribute, newValue = true) {
		const attr = typeof newValue === "string" ? (newValue === "true" || newValue === "false" ? JSON.parse(newValue) : true) : newValue;
		const list = nodeList(selector);
		list.length >= 1 && list.forEach(target => target[attribute] = attr);
	};

	function useRequest(props) {

		const url = props?.url || "";
		const method = props?.method?.toUpperCase() || "GET";
		const headers = new Headers(props?.headers || {});
		method !== "GET" && headers.append("Content-Type", "application/x-www-form-urlencoded");
		const data = new URLSearchParams(props?.data || {});
		const params = method === "GET" ? `?${data.toString()}` : data.toString();
		const dataType = props?.dataType?.toLowerCase() || "json";
		const success = props?.success || function() {};
		const error = props?.error || function(error) {throw error};
		const $finally = props?.finally || function() {};

		const endPoint = method === "GET" ? params : "";
		const body = method === "GET" ? null : params;
		const link = url + endPoint;

		const callback = {
			responseText: undefined,
			responseJSON: undefined,
			type: "connection",
			status: "connection::ERROR",
			statusText: "A technical fault has been detected and is already being fixed"
		};

		fetch(link, { method, headers, body }).then(async response => {
			if (!response.ok) {
				let resolve = response.text();
				callback.type = response.type;
				callback.status = response.status;
				callback.statusText = response.statusText;
				await resolve.then(data => {
					callback.responseText = data;
					callback.responseJSON = JSON.parse(data);
					throw callback;
				});
			};
			return response[dataType]();
		}).then(success).catch(data => error({...callback, data})).finally($finally);
	};

	function useVibrate(pattern = 1000) {
		const set = time => navigator.vibrate(time);
		"vibrate" in navigator && set(pattern);
	};

	function useClipboard(value, effect = function() {}) {
		const test = "clipboard" in navigator;
		test && navigator.clipboard.writeText(value).then(effect);
	};

	function useTwins(primary = {}, secondary = {}) {

		let isTwins = true;
		const __primary = Object.keys(primary || {});
		const __secondary = Object.keys(secondary || {});

		function check(object) {
			const type = typeof object === "object";
			const length = Object.keys(object || {}).length > 0;
			return object !== null && type && length;
		};

		if (__primary.length !== __secondary.length) return false;
		if (!check(primary) || !check(secondary)) return false;

		function forEach($primary, $secondary) {
			Object.entries($primary).map(([i, value]) => {
				const $value = $secondary[i];
				if (check(value) && check($value)) {
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

	function useFloat(value, fixed = 0) {
		const amount = typeof value === "number" ? value : Number(value) || NaN;
		const check = amount => /^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(amount);
		return check(amount) ? Number(check(fixed) && fixed >= 1 ? amount.toFixed(fixed) : amount) : NaN;
	};

	function useState(initialState = null) {

		const hookId = useId();

		let hooks = dispatcher[currentRoot].hooks;

		if (typeof initialState === "function") initialState = initialState();

		function getState(key) {
			if (!hooks[key]) hooks[key] = { state: initialState };
			return hooks[key];
		};

		function setState(newState) {
			let prev = getState(hookId);
			typeof newState === "function" ? prev.state = newState(prev.state) : prev.state = newState;
			hooks[hookId] = prev;
		};

		let state = getState(hookId);

		return [state, setState];
	};

	function useEffect(effect, deps = []) {

		const hookId = useId();

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

	function useStorage() {
		const local = window.localStorage;
		function storage(key, value = null) {
			const item = local.getItem(key);
			if (key && value) {
				if (typeof value === "function") value = value();
				local.setItem(key, typeof value === "object" ? JSON.stringify(value) : value);
			} else if (key && !value) {
				return /^(?=.*[{}])/.test(item) ? JSON.parse(item) : item;
			};
			return $key => $key && local.removeItem($key);
		};
		return storage;
	};

	function useNavigate(delay = 0) {
		const data = window.location;
		return function(to = ".", historic = true) {
			const action = () => historic ? data.assign(to) : data.replace(to);
			to && delay > 0 ? setTimeout(() => action(), delay) : action();
		};
	};

	function useScroll(selector, options = {}) {
		let { behavior = "auto" } = options;
		/**
		 * TODO: Don't take this feature seriously at the moment!!
		 * let { x, y } useScroll(selector, { ...options });
		*/
		let x;
		let y;
		return { x, y };
	};

	async function flushAsync(callback, arg) {
		await callback(arg);
	};

	function createElement(type, props, ...children) {
		if (typeof type === "function") return type({...props, children});
		return {type, props: {...props}, children};
	};

	const createDOMElement = (type = null, label = null) => (match({
		element: () => dom.createElement(label),
		text: () => dom.createTextNode(label),
		default: () => dom.createDocumentFragment()
	}, type));

	const hydrateProp = prop => typeof prop === "string" ? prop.split(/(?=[A-Z])/).join("-").toLocaleLowerCase() : prop;

	function isValidElementType(type) {
		return (
			type === Fragment ||
			typeof type === "object" ||
			typeof type === "function" ||
			typeof type === "string" ||
			typeof type === "number"
		) && typeof type !== "undefined";
	};

	function createVirtualNode(virtualNode) {

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
						Object.entries(props[i]).map(([name, value]) => {
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

	function unmarkContainer(container) {
		let sibling;
		while (sibling = container.lastChild) container.removeChild(sibling);
	};

	function renderRoot(container, node) {
		const i = container.__root$instance;
		const virtualNode = createVirtualNode(node);
		/**/
		dispatcher[i].mounted = true;
		dispatcher[i].virtualNode = node;
		/**/
		unmarkContainer(container);
		container.appendChild(virtualNode);
	};

	const checkComponent = children => typeof children === "object" && typeof children.props !== "undefined";

	function createRoot(container, options = false) {
		const instance = `root$${useId()}`;
		/**/
		if (!(container && (container.nodeType === 1 || container.nodeType === 9 || container.nodeType === 11))) {
			throw Error(".createRoot(container, {...}): Target container is not a DOM element.");
		} else if (container.nodeType === 1 && container.tagName && container.tagName.toUpperCase() === "BODY") {
			throw Error(".createRoot(container, {...}): Creating roots directly on body is not allowed.");
		};
		/**/
		container.__root$instance = instance;
		currentRoot = instance;
		/**/
		dispatcher[instance] = {
			options,
			virtualNode: null,
			mounted: false,
			hooks: { container }
		};
		/**/
		function render(children) {
			if (checkComponent(children)) {
				if (!dispatcher[instance].virtualNode && container.lastChild === null) {
					renderRoot(container, children);
					const $response = dispatcher[instance].options?.response;
					typeof $response === "function" && $response();
				} else throw Error(".render(</>): It looks like the Boteasy-dom container was removed without using Boteasy-dom. Instead, call .unmount() to empty the root's container.");
			} else throw Error(`.render(</>): The passed component is invalid, you must pass an object, created by Boteasy-dom itself. Example: BoteasyDOM.createElement("label", {className: "greeting"}, "Hello, world!");`);
		};
		/**/
		function unmount() {
			if (!dispatcher[instance].mounted) {
				delete dispatcher[instance];
				unmarkContainer(container);
			} else throw Error(".unmount(): Container cannot be emptied as it does not contain content rendered and recognized by Boteasy-dom.");
		};
		/**/
		return { render, unmount };
	};

	function hydrateRoot(container, children) {
		const instance = container?.__root$instance;
		if (dispatcher[instance]?.options?.hydrate) {
			if (checkComponent(children)) {
				if (dispatcher[instance].mounted && container.lastChild !== null) {
					if (!useTwins(dispatcher[instance].virtualNode, children)) {
						renderRoot(container, children);
						const response = dispatcher[instance].options?.response;
						typeof response === "function" && response();
					} else throw Error(".hydrateRoot(container, </>): You are trying to Hydrate a route by passing a component identical to the one rendered.");
				} else throw Error(".hydrateRoot(container, </>): Cannot update a route that does not have any component rendered by Boteasy-dom");
			} else throw Error(`.hydrateRoot(container, </>): The passed component is invalid, you must pass an object, created by Boteasy-dom itself. Example: BoteasyDOM.createElement("label", {className: "greeting"}, "Hello, world!");`);
		} else throw Error(".hydrateRoot(container, </>): Cannot hydrate this route because the second parameter in .createRoot(container, {...}): Was sent false, null or a object empty when it was created.");
	};

	function StrictMode(props) {
		"use strict";
		return createElement(Fragment, null, props?.children);
	};

	function createStyle(random, object) {
		/**/
		let css = "";
		let rules = {};
		/**/
		function forEach(label, props, $rule = false) {
			const listing = Object.entries(props).map(([i, value]) => {
				if (typeof value === "object") {
					let __i = [];
					const test = /^(?=.*[&>~+])/.test(i);
					const operator = test && i.replace(/\s+/g, "").substring(0, 1);
					const tag = i.replace(/\s+/g, "").replace(/&|>|~|\+/gi, "");
					const search = match({"&": "", ">": " > ", "~": " ~ ", "+": " + ", default: " "}, operator);
					if(/^(?=.*[,])/.test(tag)) {
						tag.split(",").map(event => __i.push("".concat(label, search, event)));
						__i = __i.join(",").trim();
					} else __i = label.concat(search, tag).trim();
					forEach(__i, value, $rule);
				} else return `${hydrateProp(i)}: ${hydrateProp(value)};`;
			}).join("");
			listing && ($rule ? rules[$rule].css = rules[$rule].css.concat(`${label} {${listing}}`) : css = css.concat(`${label} {${listing}}`));
		};
		/**/
		Object.keys(object).map(key => {
			if (key.startsWith("@")) {
				key === "@import" ? css = css.concat(`${key} ${object[key]};`) : rules[key] = {css: "", object: object[key]};
				delete object[key];
			};
		});
		/**/
		forEach(random, object);
		/**/
		Object.entries(rules).map(([i, data]) => {
			forEach(random, data.object, i);
			css = css.concat(`${i} {${data.css}}`);
		});
		/**/
		return css;
	};

	function cssClass(selector) {
		const split = string => (string || "").replace(/\s/g, "").split(",");
		const replace = (action, list) => {
			const list = nodeList(selector);
			list.length >= 1 && list.forEach(target => target.classList[action](...split(list)));
		};
		const add = classList => replace("add", classList);
		const remove = classList => replace("remove", classList);
		const toggle = classList => replace("toggle", classList);
		return { add, remove, toggle };
	};

	function globalStyle(jssObject) {
		const style = createDOMElement("element", "style");
		style.setAttribute("data-boteasy", "global-style");
		style.textContent = createStyle("", jssObject);
		dom.querySelector("head").appendChild(style);
	};

	function cssStyled(jssObject) {
		const random = `jss-${useId(6)}`;
		const style = createDOMElement("element", "style");
		style.setAttribute("data-boteasy", `agnostic-style(${random})`);
		style.textContent = createStyle(`.${random}`, jssObject);
		dom.querySelector("head").appendChild(style);
		return random;
	};

	function styled(tagName, jssObject) {
		const random = `jss-${useId(6)}`;
		const style = createDOMElement("element", "style");
		style.setAttribute("data-boteasy", `${tagName}(${random})`);
		style.textContent = createStyle(`.${random}`, jssObject);
		dom.querySelector("head").appendChild(style);
		return createElement(tagName || "div", {className: random});
	};

	function rgba(hex, opacity = 1) {
		const rgb = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,
		(_,r,g,b) => "#"+r+r+g+g+b+b).substring(1).match(/.{2}/g).map(x => parseInt(x, 16));
		return `rgba(${rgb}, ${opacity})`;
	};

	exports.version = version;
	exports.dom = dom;
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
	exports.createElement = createElement;
	exports.cssClass = cssClass;
	exports.globalStyle = globalStyle;
	exports.cssStyled = cssStyled;
	exports.styled = styled;
	exports.rgba = rgba;
})));
