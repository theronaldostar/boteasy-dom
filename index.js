/** 
 * @license Boteasy-DOM
 * @file index.js
 * 
 * @copyright (c) since 2020 Boteasy, all rights reserved.
 * 
 * @description This document is inspired by jQuery and React and was developed by Ronaldo,
 * exclusively for the Boteasy platform, but can be used on other platforms.
*/

(function (global, factory) {
	typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
	typeof define === "function" && define.amd ? define(["exports"], factory) :
	(global = global || self, factory(global.BoteasyDOM = {}));
} (this, (exports => {

	"use strict";

	let hooks = [];

	const version = "1.2.1";
	const Fragment = 0xeacb;
	const dom = document;
	const instance = `boteasy-root$${Math.random().toString(36).slice(2)}`;

	const link = (() => {
		const data = window.location;
		const to = (url = "/", historic = true) => {
			url && (historic ? data.assign(url) : data.replace(url));
		};
		const reload = (time = 0) => {
			setTimeout(() => data.reload(), time);
		};
		const protocol = data.protocol;
		const host = data.hostname.replace("www.", "");
		const route = data.pathname;

		return { to, reload, protocol, host, route };
	})();

	const storage = (() => {
		const data = window.localStorage;
		const set = (key, value = null) => {
			data.setItem(key, typeof value === "object" ? JSON.stringify(value) : value);
		};
		const get = key => {
			const value = data.getItem(key);
			return (value || "").includes("{") ? JSON.parse(value) : value;
		};
		const remove = key => data.removeItem(key);
		const clear = key => data.clear(key);
		return { set, get, remove, clear };
	})();

	const css = (() => {
		const toSplit = string => string.replace(/\s/g, "").split(",");
		const toApply = (action, target, value) => {
			const selectorAll = dom.querySelectorAll(target);
			selectorAll.length >= 1 && selectorAll.forEach(selector => selector.classList[action](...toSplit(value || "")));
		};
		const add = (target, value) => toApply("add", target, value);
		const remove = (target, value) => toApply("remove", target, value);
		return { add, remove };
	})();

	const html = (target, newValue) => {
		const allSelector = dom.querySelectorAll(target || "*");
		allSelector.length >= 1 && allSelector.forEach(selector => selector.innerHTML = newValue);
	};

	const prop = (target, prop, newValue) => {
		const value = typeof newValue === "string" ? (newValue === "true" || newValue === "false" ? JSON.parse(newValue) : undefined) : newValue || undefined;
		const allSelector = dom.querySelectorAll(target || "*");
		allSelector.length >= 1 && allSelector.forEach(selector => selector[prop] = value);
	};

	const wait = action => {
		const value = match({ true: "none", false: undefined, default: undefined }, String(action));
		const allSelector = dom.querySelectorAll("html, head, body");
		allSelector.length >= 1 && allSelector.forEach(selector => selector.style["pointer-events"] = value);
	};

	const tests = async (element, value) => {

		const type = element?.replace(/\s/g, "");

		const object = match({
			fullname: /[A-Za-z][ ][A-Za-z]/gi,
			email: /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z\-0-9]+.)+[a-zA-Z]{2,4}))$/,
			password: /^(?=.*[\d])(?=.*[A-Za-z])([\w!@#$%^&*]){6,}$/,
			phone: /\d{2}[ ]\d{5}-\d{4}/,
			PIXRandom: /[a-zA-Z\-0-9]{8}-[a-zA-Z\-0-9]{4}-[a-zA-Z\-0-9]{4}-[a-zA-Z\-0-9]{4}-[a-zA-Z\-0-9]{12}/
		}, type);

		if (type === "CPF") {

			let result = true;
			const CPFNumber = value?.replace(/\D/g, "");
			if (CPFNumber.toString().length !== 11 || /^(\d)\1{10}$/.test(CPFNumber)) return false;

			[9, 10].forEach(response => {
				let sum = 0;
				let answer;
				CPFNumber.split(/(?=)/).splice(0, response).forEach((event, i) => {
					return sum += parseInt(event) * ((response+2) - (i+1));
				});
				answer = sum%11;
				answer = answer < 2 ? 0 : 11-answer;
				if (answer !== Number(CPFNumber.substring(response, response+1))) result = false;
			});

			return result;

		} else if (type === "CNPJ") {

			let result = true;
			const CNPJNumber = value?.replace(/\D/g, "");

			if (CNPJNumber.toString().length !== 14 || /^(\d)\1{13}$/.test(CNPJNumber)) return false;

			let size = CNPJNumber.length - 2;
			let numbers = CNPJNumber.substring(0, size);
			let digits = CNPJNumber.substring(size);
			let sum = 0;
			let pos = size-7;

			for (let i = size; i >= 1; i--) {
				sum += numbers.charAt(size - i) * pos--;
				if (pos < 2) pos = 9;
			};

			let _result = sum % 11 < 2 ? 0 : 11 - sum % 11;
			if (_result != digits.charAt(0)) result = false;
	
			size = size + 1;
			numbers = CNPJNumber.substring(0, size);
			sum = 0;
			pos = size-7;

			for (let k = size; k >= 1; k--) {
				sum += numbers.charAt(size - k) * pos--;
				if (pos < 2) pos = 9;
			};

			_result = sum % 11 < 2 ? 0 : 11 - sum % 11;
			if (_result != digits.charAt(1)) result = false;

			return result;

		} else if (type === "birthday") {

			const birthday = value ? value.split("/") : "";
			const day = match(birthday, 0);
			const month = match(birthday, 1);
			const year = match(birthday, 2);

			if (value?.replace(/[^\d]/g, "").toString().length !== 8) {
				return false;
			} else if (day === undefined || day <= 0 || day > 31) {
				return false;
			} else if (month === undefined || month <= 0 || month > 12) {
				return false;
			} else if (year === undefined || year <= 0 || year <= 1930 || year >= 2008) {
				return false;
			} else if (day <= 31 && month <= 12 && year < new Date().getFullYear()) return true;

		} else if (object !== undefined) {
			return object ? await object.test(value) : false;
		} else return false;
	};

	const request = props => {

		const url = props?.url || null;
		const method = props?.method?.toUpperCase() || "GET";
		const headers = new Headers(props?.headers || {});
		method !== "GET" && headers.append("Content-Type", "application/x-www-form-urlencoded");
		const data = new URLSearchParams(props?.data || {});
		const params = method === "GET" ? `?${data.toString()}` : data.toString();
		const dataType = props?.dataType?.toLowerCase() || "json";
		const success = props?.success || function() {};
		const error = props?.error || function(error) {
			throw error;
		};

		const endPoint = method === "GET" ? params : "";
		const body = method === "GET" ? null : params;
		const link = url + endPoint;

		const callback = {
			responseText: undefined,
			responseJSON: undefined,
			type: "connection",
			status: "connection::ERROR",
			statusText: "A technical fault has been detected and is already being fixed."
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

		}).then(success).catch(data => error({...callback, data}));
	};

	const copy = value => {

		const yPosition = window.pageYOffset || dom.documentElement.scrollTop;
		const isRTL = dom.documentElement.getAttribute("dir") === "rtl";
		const element = dom.createElement("textarea");

		element.style.fontSize = "10px";
		element.style.border = 0;
		element.style.padding = 0;
		element.style.margin = 0;
		element.style.position = "absolute";
		element.style[isRTL ? "right" : "left"] = "-9999px";
		element.style.top = `${yPosition}px`;
		element.setAttribute("readonly", "");
		element.value = value;
		dom.body.appendChild(element);
		element.focus();
		element.select();
		dom.execCommand("copy");
		dom.body.removeChild(element);
	};

	const isValidElementType = type => {
		return (
			type === Fragment ||
			typeof type === "object" ||
			typeof type === "function" ||
			typeof type === "string" ||
			typeof type === "number"
		) && typeof type !== "undefined";
	};

	const createElement = (type, props, ...children) => {
		const virtualProps = {...props, children};
		if (typeof type === "function") return type(virtualProps);
		return { type, props: {...props}, children };
	};

	const createVirtualNode = virtualNode => {

		let element = undefined;
		const type = virtualNode?.type;
		const props = virtualNode?.props;
		const isValid = isValidElementType(type || virtualNode);

		const propsDOM = {
			className: true,
			htmlFor: true,
			tabIndex: true,
			textContent: true
		};

		if (typeof virtualNode.type === "object") {
			virtualNode.type.props = {...virtualNode.type.props, ...virtualNode.props};
			virtualNode.type.children = virtualNode.children;
			return createVirtualNode(virtualNode.type);
		};

		if (isValid) {
			if (typeof virtualNode === "string" || typeof virtualNode === "number") return dom.createTextNode(virtualNode);
			element = typeof type === "undefined" || type === Fragment ? dom.createDocumentFragment() : dom.createElement(type);
		};

		if (props) {
			for (let name in props) {
				const prop = propsDOM[name] ? name : name.toLocaleLowerCase();
				const isFunc = name.startsWith("on") && name.substring(2, 3) === name.toUpperCase().substring(2, 3);
				if (typeof props[name] === "function" && isFunc) {
					const func = prop.replace("on", "");
					element.addEventListener(func, props[name]);
				} else {
					if (propsDOM[name]) {
						element[name] = props[name];
					} else {
						if (typeof props[name] === "object" && prop === "style") {
							Object.entries(props[name]).map(([name, value]) => {
								element[prop][name] = value;
							});
						} else if (typeof props[name] !== "boolean") {
							const toDiscard = {key: true, __self: true, __source: true};
							!toDiscard[prop] && element.setAttribute(prop, props[name]);
						};
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

	const createRoot = (container, $hydrate = false) => {

		const RootSettings = {
			$hydrate,
			children: null,
			onDisplay: false
		};

		const checkComponent = children => {
			return typeof children === "object" && typeof children.props !== "undefined";
		};

		const updateContainer = () => {
			let sibling;
			while (sibling = container.lastChild) container.removeChild(sibling);
		};

		if (!(container && (container.nodeType === 1 || container.nodeType === 9 || container.nodeType === 11))) {
			throw Error(".createRoot(): Target container is not a DOM element.");
		} else {
			if (container.nodeType === 1 && container.tagName && container.tagName.toUpperCase() === "BODY") {
				throw Error(".createRoot(): Creating roots directly on body is not allowed.");
			};
			container[instance] = RootSettings;
		};

		const render = children => {
			if (checkComponent(children)) {
				if (!container[instance].children && container.lastChild === null) {
					updateContainer();
					const unRendered = createVirtualNode(children);
					container.appendChild(unRendered);
					container[instance].onDisplay = true;
					container[instance].children = children;
				} else {
					throw Error(".render(): It looks like the Boteasy-dom container was removed without using Boteasy-dom. Instead, call .unmount() to empty the root's container.");
				};
			} else {
				throw Error(`.render(): The passed component is invalid, you must pass an object, created by Boteasy-dom itself. Example: Boteasy.createElement("label", {className: "greeting"}, "Hello, world!");`);
			};
		};

		const hydrate = children => {
			if (container[instance].$hydrate) {
				if (checkComponent(children)) {
					if (container[instance].onDisplay && container.lastChild !== null) {
						if (container[instance].children !== children) {
							updateContainer();
							const unRendered = createVirtualNode(children);
							container.appendChild(unRendered);
							container[instance].onDisplay = true;
							container[instance].children = children;
						} else {
							throw Error(".hydrate(): You are trying to Hydrate a route by passing a component identical to the one rendered.");
						};
					} else {
						throw Error(".hydrate(): Cannot update a route that does not have any component rendered by Boteasy-dom");
					};
				} else {
					throw Error(`.hydrate(): The passed component is invalid, you must pass an object, created by Boteasy-dom itself. Example: Boteasy.createElement("label", {className: "greeting"}, "Hello, world!");`);
				};
			} else {
				throw Error(".hydrate(): Cannot hydrate this route because the second parameter in .createRoot (...) was sent null or false when it was created.");
			};
		};

		const unmount = () => {
			if (!container[instance].onDisplay) {
				container[instance] = RootSettings;
				updateContainer();
			} else {
				throw Error(".unmount(): Container cannot be emptied as it does not contain content rendered and recognized by Boteasy-dom.");
			};
		};

		return { render, hydrate, unmount };
	};

	const useState = (initialState = null, hookID = null) => {

		const random = hookID || `state$${Math.random().toString(36).slice(2)}`;
	
		const get = index => {
			if (!hooks[index]) hooks[index] = { state: initialState };
			return hooks[index];
		};
		const set = newState => {
			let data = get(random);
			typeof newState === "function" ? data.state = newState(data.state) : data.state = newState;
			hooks[random] = data;
		};
	
		const state = get(random);

		return [state, set];
	};

	const useEffect = (effect, deps = [], hookID = null) => {

		const random = hookID || `effect$${Math.random().toString(36).slice(2)}`;

		if (hooks[random] !== undefined) {
			//TODO: Under development! On moment.
			console.warn(".useEffect(): Under development! On moment.");
		} else {
			hooks[random] = deps;
			effect();
			useEffect(effect, deps, random);
		};
	};

	const match = (object, index) => {
		const read = {...object}[index] || (object.default || null);
		const isFunc = typeof read === "function";
		return isFunc ? read() : read;
	};

	const isTwins = (object, compare) => {

		let equals = true;
		const keys = Object.keys(object || {});

		const isObject = value => {
			const type = typeof value;
			return value !== null && type === "object";
		};

		if (object === compare) return true;
		if (!isObject(object) || !isObject(compare)) return false;
		if (Object.keys(compare).length !== keys.length) return false;

		for (let i = 0; i < keys.length; i++) {

			let obj = object[keys[i]];
			let objCompare = compare[keys[i]];

			if (typeof obj !== typeof objCompare) {
				equals = false;
				break;
			} else if (isObject(obj)) {
				equals = isTwins(obj, objCompare);
				if (!equals) break;
			} else if (typeof obj === "string") {
				obj = obj.toLowerCase();
				objCompare = objCompare.toLowerCase();
				if (obj !== objCompare) {
					equals = false;
					break;
				};
			} else {
				if (obj !== objCompare) {
					equals = false;
					break;
				};
			};
		};

		return equals;
	};

	const toFloat = (amount, fixed = 0) => {
		const test = value => /^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value);
		return test(amount) ? Number(test(fixed) && fixed >= 1 ? Number(amount).toFixed(fixed) : amount) : NaN;
	};

	exports.version = version;
	exports.Fragment = Fragment;
	exports.dom = dom;
	exports.link = link;
	exports.storage = storage;
	exports.css = css;
	exports.html = html;
	exports.prop = prop;
	exports.wait = wait;
	exports.tests = tests;
	exports.request = request;
	exports.copy = copy;
	exports.createRoot = createRoot;
	exports.createElement = createElement;
	exports.useState = useState;
	exports.useEffect = useEffect;
	exports.match = match;
	exports.isTwins = isTwins;
	exports.toFloat = toFloat;
})));