/** @license boteasy-dom
 * index.js
 * 
 * This document is inspired by jQuery and developed by Ronaldo exclusively for the Boteasy platform,
 * but can be used on other platforms.
 * 
 * Copyright (c) since 2020 Boteasy, all rights reserved.
*/
"use strict";

const version = "1.0.7-experimental-0-20211031";
const dom = document;
const undef = undefined;
const link = window.location;
const storage = window.localStorage;

const coins = {
	USDT: "₮ether",
	BTC: "₿itcoin",
	BCH: "₿itcoin Cash",
	ETH: "Ξthereum",
	LTC: "Łitecoin",
	XRP: "Ripple",
	BNB: "Binance Coin",
	DOGE: "Đogecoin",
	ADA: "Cardano"
};

const app = {
	api: {
		local: `${link.protocol}//${link.hostname}/api/index`,
		binance: `${link.protocol}//api.binance.com/api/v3/`
	},
	message: {
		connection: "Detectamos uma falha técnica que já está sendo consertada.",
		input: "Você deve preencher todos os campos corretamente!",
		code: "Você deve gerar um código de verificação antes de efetuar qual quer ação.",
		data: "O dado que irá ser alterado deve ser diferente do atual, modifique-o!",
		null: "Não foi encontrado dados/informações para que possa ser mostradas atualmente nesta aba/pagina.",
		notfound: "Oops, parece que essa pagina que você tentou acessar, foi removida do servidor."
	}
};

const setState = (func, tar, val) => {

	const setSplit = event => event.replace(/\s/g, "").split(",");

	const _ = func === "html" ? "innerHTML" : "disabled";
	const value = func === "html" ? val : JSON.parse(val);
	const target = setSplit(tar);

	target.forEach((t, i) => {
		const selector = dom.querySelector(t);
		if (selector) selector[_] = value;
	});
};

const html = (tar, val) => setState("html", tar, val);

const prop = (tar, val) => setState("prop", tar, val);

const css = target => {

	const setSplit = event => event.replace(/\s/g, "").split(",");

	class BoteasyCss {
		constructor(target) {
			this.target = setSplit(target);
			this.add = this.add.bind(this);
			this.remove = this.remove.bind(this);
		};
		add(value) {
			const name = setSplit(value);
			this.target.forEach((t, i) => {
				const selector = dom.querySelector(t);
				selector && selector.classList.add(...name);
			});
		};
		remove(value) {
			const name = setSplit(value);
			this.target.forEach((t, i) => {
				const selector = dom.querySelector(t);
				selector && selector.classList.remove(...name);
			});
		};
	};
	return new BoteasyCss(target);
};

const wait = action => {
	const elements = dom.querySelectorAll("html, head, body");
	const props = action && "none" || "all";
	elements.forEach(event => event.style = `pointer-events: ${props}`);
};

const copy = value => {

	const yPosition = window.pageYOffset || dom.documentElement.scrollTop;
	const isRTL = dom.documentElement.getAttribute("dir") === "rtl";
	const fakeElement = dom.createElement("textarea");

	fakeElement.style.fontSize = "12pt";
	fakeElement.style.border = "0";
	fakeElement.style.padding = "0";
	fakeElement.style.margin = "0";
	fakeElement.style.position = "absolute";
	fakeElement.style[isRTL ? "right" : "left"] = "-9999px";
	fakeElement.style.top = `${yPosition}px`;
	fakeElement.setAttribute("readonly", "");
	fakeElement.value = value;

	dom.body.appendChild(fakeElement);

	fakeElement.focus();
	fakeElement.select();

	dom.execCommand("copy");
	dom.body.removeChild(fakeElement);
};

const tests = async (tar, val) => {

	const element = tar.replace(/\s/g, "");

	const object = {
		fullname: /[A-Za-z][ ][A-Za-z]/gi,
		email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/,
		password: /^(?=.*[\d])(?=.*[A-Za-z])([\w!@#$%^&*]){6,}$/,
		phone: /\d{2}[ ]\d{5}-\d{4}/
	};

	if (object[element] !== undef) {
		return await object[element].test(val);
	} else if (element === "CPF") {
		const userCPF = val.replace(/\D/g, "");
		let result = true;
		if (userCPF.toString().length !== 11 || /^(\d)\1{10}$/.test(userCPF)) return false;
		[9, 10].forEach(response => {
			let sum = 0, answer;
			userCPF.split(/(?=)/).splice(0, response).forEach((e, i) => sum += parseInt(e) * ((response+2) - (i+1)));
			answer = sum%11;
			answer = answer < 2 ? 0 : 11-answer;
			if (answer !== Number(userCPF.substring(response, response+1))) result = false;
		});
		return result;
	} else if (element === "birthday") {

		const birthday = val.split("/"), day = birthday[0], month = birthday[1], year = birthday[2];

		if (val.replace(/[^\d]/g, "").toString().length !== 8) {
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
	};
};

const request = event => {

	const url = event?.url || null;
	const method = event?.method.toUpperCase() || "GET";
	const headers = new Headers(event?.headers || {});
	if (method !== "GET") headers.append("Content-Type", "application/x-www-form-urlencoded");
	const data = new URLSearchParams(event?.data || {});
	const params = method === "GET" ? `?${data.toString()}` : data.toString();
	const dataType = event?.dataType.toLowerCase() || "json";
	const success = event?.success || function() {};
	const error = event?.error || function(error) {throw Error(error)};

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

const createRoot = target => {
	class BoteasyRoot {
		constructor(target) {
			this.target = target;
			this.render = this.render.bind(this);
			this.unmount = this.unmount.bind(this);
			this.state = {
				target,
				component: null
			};
		};
		render(component) {
			this.state.component = component;
			if (this.state.target && !this.state.component) {
				component && this.state.target.appendChild(component);
			} else {
				throw new Error("Cannot render another element at this time as another element has already been rendered by .createRoot() in this instance.");
			};
		};
		unmount() {
			if (this.state.target && this.state.component) {
				this.state.target.removeChild(this.state.component);
			} else {
				throw new Error("Oops. We didn't find any elements rendered by this instance.");
			};
		};
	};
	return new BoteasyRoot(target);
};

exports.version = version;
exports.dom = dom;
exports.undef = undef;
exports.link = link;
exports.storage = storage;
exports.coins = coins;
exports.app = app;
exports.html = html;
exports.prop = prop;
exports.css = css;
exports.wait = wait;
exports.copy = copy;
exports.tests = tests;
exports.request = request;
exports.createRoot = createRoot;