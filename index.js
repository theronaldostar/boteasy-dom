/** @license Boteasy v1.0.4
 * index.js
 * 
 * This document is inspired by jQuery and developed by Ronaldo exclusively for the Boteasy platform,
 * but can be used on other platforms.
 * 
 * Copyright (c) since 2020 Boteasy, all rights reserved.
*/
const dom = document;
const nl = null;
const undef = undefined;
const link = window.location;

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
	}
};

const domSplit = (event) => event.replace(/\s/g, "").split(",");

const domState = (func, tar, val) => {
	const _ = func ? "innerHTML" : "disabled";
	const value = func ? val : JSON.parse(val);
	const target = domSplit(tar);
	target.forEach((tar, i) => {
		const selector = dom.querySelector(tar);
		if (selector) selector[_] = value;
	});
};

const html = (tar, val) => domState("html", tar, val);
const prop = (tar, val) => domState("prop", tar, val);

const css = (func, tar, val) => {
	const target = domSplit(tar);
	const name = domSplit(val);
	target.forEach((tar, i) => {
		const selector = dom.querySelector(tar);
		if (selector) selector.classList[func ? "add" : "remove"](...name);
	});
};

const wait = (action) => {
	const elements = dom.querySelectorAll("html, head, body, #root, #app");
	const props = action && "none" || "all";
	elements.forEach((event, i) => event.style = `pointer-events: ${props}`);
};

const copy = (value) => {
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
		[9, 10].forEach(res => {
			let sum = 0, answer;
			userCPF.split(/(?=)/).splice(0, res).forEach((e, i) => sum += parseInt(e) * ((res+2) - (i+1)));
			answer = sum%11;
			answer = answer < 2 ? 0 : 11-answer;
			if (answer !== Number(userCPF.substring(res, res+1))) result = false;
		});
		return result;
	} else if (element === "birthday") {
		const birthday = val.split("/"),day = birthday[0],month = birthday[1],year = birthday[2];
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

const request = (event) => {

	const url = event?.url || nl;
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
	const body = method === "GET" ? nl : params;
	const link = event?.cors ? cors + url + endPoint : url + endPoint;

	const callback = {
		responseText: undef,
		responseJSON: undef,
		type: "connection",
		status: "connection::ERROR",
		statusText: "A technical fault has been detected and is already being fixed"
	};

	fetch(link, { method, headers, body }).then(async (res) => {
		if (!res.ok) {
			let resolve = res.text();
			callback.type = res.type;
			callback.status = res.status;
			callback.statusText = res.statusText;
			await resolve.then((event) => {
				callback.responseText = event;
				callback.responseJSON = JSON.parse(event);
				throw callback;
			});
		};
		return res[dataType]();
	}).then(success).catch(data => error({...callback, data}));
};

exports.dom = dom;
exports.nl = nl;
exports.undef = undef;
exports.link = link;
exports.coins = coins;
exports.app = app;
exports.html = html;
exports.prop = prop;
exports.css = css;
exports.wait = wait;
exports.copy = copy;
exports.tests = tests;
exports.request = request;