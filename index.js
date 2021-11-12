/** 
 * @license boteasy-dom
 * index.js
 * 
 * This document is inspired by jQuery and React and was developed by Ronaldo exclusively for the Boteasy platform,
 * but can be used on other platforms.
 * 
 * @copyright (c) since 2020 Boteasy, all rights reserved.
*/
(function (global, factory) {
	typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
	typeof define === "function" && define.amd ? define(["exports"], factory) :
	(global = global || self, factory(global.BoteasyDOM = {}));
} (this, ((exports) => {

	"use strict";
	/**
	 * @version 1.0.7-correction
	 * experimental
	 * beta
	*/

	const instanceKey = `boteasy-root$${Math.random().toString(36).slice(2)}`;
	const version = "1.0.7-correction";
	const Fragment = 0xeacb;
	const dom = document;
	const undef = undefined;
	const link = window.location;
	const storage = window.localStorage;

	const setSplit = string => string.replace(/\s/g, "").split(",");

	const setProp = (func, tar, value) => {
		const data = {
			html: {action: "innerHTML", value: value || null},
			prop: {action: "disabled", value: typeof value === "string" ? value === "true" || value === "false" ? JSON.parse(value) : false : value}
		};
		setSplit(tar).map(element => {
			const selector = dom.querySelector(element);
			if (selector) selector[data[func].action] = data[func].value;
		});
	};

	const css = (() => {
		const toApply = (action, element, value) => {
			const selector = dom.querySelector(element);
			selector && selector.classList[action](...setSplit(value));
		};
		const add = (tar, value) => setSplit(tar).map(element => toApply("add", element, value));
		const remove = (tar, value) => setSplit(tar).map(element => toApply("remove", element, value));
		return { add, remove };
	})();

	const html = (tar, value) => setProp("html", tar, value);

	const prop = (tar, value) => setProp("prop", tar, value);

	const wait = action => {
		const selectorAll = dom.querySelectorAll("html, head, body");
		const props = typeof action === "string" ? JSON.parse(action) : action;
		selectorAll.forEach(element => element.style["pointer-events"] = props ? "none" : "all");
	};

	const tests = async (element, value) => {

		const typeElement = element?.replace(/\s/g, "");

		const object = {
			fullname: /[A-Za-z][ ][A-Za-z]/gi,
			email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/,
			password: /^(?=.*[\d])(?=.*[A-Za-z])([\w!@#$%^&*]){6,}$/,
			phone: /\d{2}[ ]\d{5}-\d{4}/
		};

		if (typeElement === "CPF") {

			let result = true;
			const CPFNumber = value?.replace(/\D/g, "");
			if (CPFNumber.toString().length !== 11 || /^(\d)\1{10}$/.test(CPFNumber)) return false;
	
			[9, 10].forEach(response => {
				let sum = 0;
				let answer;
				CPFNumber.split(/(?=)/).splice(0, response).forEach((event, i) => sum += parseInt(event) * ((response+2) - (i+1)));
				answer = sum%11;
				answer = answer < 2 ? 0 : 11-answer;
				if (answer !== Number(CPFNumber.substring(response, response+1))) result = false;
			});
			return result;
		} else if (typeElement === "birthday") {

			const birthday = value ? value.split("/") : "";
			const day = birthday[0];
			const month = birthday[1];
			const year = birthday[2];

			if (value?.replace(/[^\d]/g, "").toString().length !== 8) {
				return false;
			} else if (day === undef || day <= 0 || day > 31) {
				return false;
			} else if (month === undef || month <= 0 || month > 12) {
				return false;
			} else if (year === undef || year <= 0 || year <= 1930 || year >= 2008) {
				return false;
			} else if (day <= 31 && month <= 12 && year < new Date().getFullYear()) {
				return true;
			};
		} else if (object[typeElement] !== undef) {
			return await object[typeElement].test(value);
		} else {
			return false;
		};
	};

	const request = event => {

		const url = event?.url || null;
		const method = event?.method?.toUpperCase() || "GET";
		const headers = new Headers(event?.headers || {});
		if (method !== "GET") headers.append("Content-Type", "application/x-www-form-urlencoded");
		const data = new URLSearchParams(event?.data || {});
		const params = method === "GET" ? `?${data.toString()}` : data.toString();
		const dataType = event?.dataType?.toLowerCase() || "json";
		const success = event?.success || function() {};
		const error = event?.error || function(error) {throw error};

		const cors = "//cors-anywhere.herokuapp.com/";
		const endPoint = method === "GET" ? params : "";
		const body = method === "GET" ? null : params;
		const link = event?.cors ? cors + url + endPoint : url + endPoint;

		const callback = {
			responseText: undef,
			responseJSON: undef,
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
				await resolve.then(event => {
					callback.responseText = event;
					callback.responseJSON = JSON.parse(event);
					throw callback;
				});
			};
			return response[dataType]();
		}).then(success).catch(data => error({...callback, data}));
	};

	const copy = string => {

		const yPosition = window.pageYOffset || dom.documentElement.scrollTop;
		const isRTL = dom.documentElement.getAttribute("dir") === "rtl";
		const nodeElement = dom.createElement("textarea");

		nodeElement.style.fontSize = "10px";
		nodeElement.style.border = 0;
		nodeElement.style.padding = 0;
		nodeElement.style.margin = 0;
		nodeElement.style.position = "absolute";
		nodeElement.style[isRTL ? "right" : "left"] = "-9999px";
		nodeElement.style.top = `${yPosition}px`;
		nodeElement.setAttribute("readonly", "");
		nodeElement.value = string;

		dom.body.appendChild(nodeElement);

		nodeElement.focus();
		nodeElement.select();

		dom.execCommand("copy");
		dom.body.removeChild(nodeElement);
	};

	const isValidElementType = type => {
		return type === Fragment ||
		typeof type === "object" ||
		typeof type === "function" ||
		typeof type === "string" ||
		typeof type === "number" && typeof type !== "undefined"
	};

	const createElement = (type, props, ...children) => {
		const virtualProps = {...props, children};
		if (typeof type === "function") return type(virtualProps);
		return { type, props: {...props}, children };
	};

	const createVirtualNode = virtualNode => {

		const propsDOM = {"className": true, "htmlFor": true, "tabIndex": true};
		const type = virtualNode?.type;
		const props = virtualNode?.props;
		const isValid = isValidElementType(type || virtualNode);
		let element = undef;

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
							const toDiscard = {"key": true, "__self" : true, "__source": true};
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
			throw Error(".createRoot(...): Target container is not a DOM element.");
		} else {
			if (container.nodeType === 1 && container.tagName && container.tagName.toUpperCase() === "BODY") {
				throw Error(".createRoot(): Creating roots directly on body is not allowed.");
			};
			container[instanceKey] = RootSettings;
		};

		const render = children => {
			if (checkComponent(children)) {
				if (!container[instanceKey].children && container.lastChild === null) {
					updateContainer();
					const unRendered = createVirtualNode(children);
					container.appendChild(unRendered);
					container[instanceKey].onDisplay = true;
					container[instanceKey].children = children;
				} else {
					throw Error(".render(...): It looks like the Boteasy-dom container was removed without using Boteasy-dom. Instead, call .unmount() to empty the root's container.");
				};
			} else {
				throw Error(`.render(...): The passed component is invalid, you must pass an object, created by Boteasy-dom itself. Example: Boteasy.createElement("label", {className: "greeting"}, "Hello, world!");`);
			};
		};

		const hydrate = children => {
			if (container[instanceKey].$hydrate) {
				if (checkComponent(children)) {
					if (container[instanceKey].onDisplay && container.lastChild !== null) {
						if (container[instanceKey].children !== children) {
							updateContainer();
							const unRendered = createVirtualNode(children);
							container.appendChild(unRendered);
							container[instanceKey].onDisplay = true;
							container[instanceKey].children = children;
						} else {
							throw Error(".hydrate(...). You are trying to Hydrate a route by passing a component identical to the one rendered.");
						};
					} else {
						throw Error(".hydrate (...): Cannot update a route that does not have any component rendered by Boteasy-dom");
					};
				} else {
					throw Error(`.hydrate(...): The passed component is invalid, you must pass an object, created by Boteasy-dom itself. Example: Boteasy.createElement("label", {className: "greeting"}, "Hello, world!");`);
				};
			} else {
				throw Error(".hydrate(...): Cannot hydrate this route because the second parameter in .createRoot (...) was sent null or false when it was created.");
			};
		};

		const unmount = () => {
			if (!container[instanceKey].onDisplay) {
				container[instanceKey] = RootSettings;
				updateContainer();
			} else {
				throw Error(".unmount(...): Container cannot be emptied as it does not contain content rendered and recognized by Boteasy-dom.");
			};
		};

		return { render, hydrate, unmount };
	};

	const useState = (initialState = null) => {

		const weakMap = new WeakMap();
	
		const get = object => {
			if(!weakMap.has(object)) weakMap.set(object, {});
			return weakMap.get(object);
		};
	
		const set = newState => {
			let old = get(this);
			if (typeof newState === "function") {
				old.state = newState(old.state);
			} else old.state = newState;
		};
	
		set(initialState);
		const data = get(this);
		return [data, set];
	};

	const useEffect = (create, deps) => {
		//TODO: ...
	};

	exports.version = version;
	exports.Fragment = Fragment;
	exports.dom = dom;
	exports.undef = undef;
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
})));