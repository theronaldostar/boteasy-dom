/** @license Boteasy.net
	* This robot/App was developed by Ronaldo for https://www.boteasy.net/
	* Copyright (c) since 2020 Boteasy, all rights reserved.
*/
const DOM = document;
const UDF = undefined;

const DOMChange = (fn, t, v) => {
	const props = {
		html: {function: "innerHTML", value: v},
		prop: {function: "disabled", value: JSON.parse(v)}
	};
	const target = t.replace(/\s/g, "").split(",");
	target.forEach((t, i) => {
		const element = DOM.querySelector(t);
		if (element) element[props[fn].function] = props[fn].value;
	});
};

const DOMCss = (fn, t, v) => {
	const target = t.replace(/\s/g, "").split(",");
	const css = v.replace(/\s/g, "").split(",");
	target.forEach((t, i) => {
		const element = DOM.querySelector(t);
		if (element) element.classList[fn](...css);
	});
};

const app = {
	coins: {USDT: "₮ether",BTC: "₿itcoin",BCH: "₿itcoin Cash",ETH: "Ξthereum",LTC: "Łitecoin",XRP: "Ripple",BNB: "Binance Coin",DOGE: "Đogecoin",ADA: "Cardano"},
	api: {
		local: window.location.protocol+"//"+window.location.hostname+"/api/v1/index",
		binance: window.location.protocol+"//api.binance.com/api/v3/"
	},
	message: {
		connection: "Detectamos uma falha técnica que já está sendo consertada.",
		input: "Preencha todos os campos corretamente.",
		code: "Você deve gerar um código de verificação antes de efetuar qual quer ação.",
		data: "O dado que irá ser alterado deve ser diferente do atual.",
		null: "Sentimos muito, mas não encontramos informações no servidor que possa ser mostradas atualmente nesta aba ou pagina.",
	}
};

const css = {
	add: (t, v) => DOMCss("add", t, v),
	remove: (t, v) => DOMCss("remove", t, v)
};
const html = (t, v) => DOMChange("html", t, v);
const prop = (t, v) => DOMChange("prop", t, v);

const tests = async (t, v) => {

	const element = t.replace(/\s/g, "");
	const string = {
		name: /[A-Za-z][ ][A-Za-z]/gi,
		email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/,
		password: /^(?=.*[\d])(?=.*[A-Za-z])([\w!@#$%^&*]){6,}$/,
		phone: /\d{2}[ ]\d{5}-\d{4}/
	};

	if (string[element] !== UDF) {
		return await string[element].test(v);
	} else if (element === "CPF") {
		let userCPF = v.replace(/\D/g, ""), result = true;
		if (userCPF.toString().length !== 11 || /^(\d)\1{10}$/.test(userCPF)) return false;
		[9, 10].forEach((res) => {
			let sum = 0, answer;
			userCPF.split(/(?=)/).splice(0, res).forEach((e, i) => sum += parseInt(e) * ((res+2)-(i+1)));
			answer = sum%11;
			answer = answer < 2 ? 0 : 11-answer;
			if (answer !== Number(userCPF.substring(res, res+1))) result = false;
		});
		return result;
	} else if (element === "birthday") {
		const birthday = v.split("/"), day = birthday[0], month = birthday[1], year = birthday[2];
		if (v.replace(/[^\d]/g, "").toString().length !== 8) {
			return false;
		} else if (day === UDF || day <= 0 || day > 31) {
			return false;
		} else if (month === UDF || month <= 0 || month > 12) {
			return false;
		} else if (year === UDF || year <= 0 || year <= 1930 || year >= 2008) {
			return false;
		} else if (day <= 31 && month <= 12 && year < new Date().getFullYear()) {
			return true;
		};
	};
};

const wait = (props) => {
	const target = "html, head, body, #root";
	const element = DOM.querySelectorAll(target);
	const value = props ? "pointer-events: none" : null;
	element.forEach((e, i) => e.style = value);
};

const copy = (value) => {
	let yPosition = window.pageYOffset || document.documentElement.scrollTop;
	const isRTL = document.documentElement.getAttribute("dir") === "rtl";
	const fakeElement = document.createElement("textarea");
	fakeElement.style.fontSize = "12pt";
	fakeElement.style.border = "0";
	fakeElement.style.padding = "0";
	fakeElement.style.margin = "0";
	fakeElement.style.position = "absolute";
	fakeElement.style[isRTL ? "right" : "left"] = "-9999px";
	fakeElement.style.top = `${yPosition}px`;
	fakeElement.setAttribute("readonly", "");
	fakeElement.value = value;
	document.body.appendChild(fakeElement);
	fakeElement.focus();
	fakeElement.select();
	document.execCommand("copy");
	document.body.removeChild(fakeElement);
};

const request = (props) => {

	let url = props.url === UDF || props.url === null || props.url === "" || props.url === {} ? `${window.location.origin}/` : props.url;
	let method = props.method === UDF || props.method === null || props.method === "" || props.method === {} ? "GET" : (props.method).toUpperCase();
	let headers = new Headers(props.headers === UDF || props.headers === null || props.headers === {} ? [] : props.headers);
	let dataParams = new URLSearchParams(Object.entries(props.data === UDF || props.data === null || props.data === {} ? [] : props.data));

	const dataType = props.dataType === UDF || props.dataType === null || props.dataType === "" || props.dataType === {} ? "json" : (props.dataType).toLowerCase();
	const success = props.success === UDF || props.success === null || props.success === "" || props.success === {} ? () => {} : props.success;
	const error = props.error === UDF || props.error === null || props.error === "" || props.error === {} ? (error) => console.error(error) : props.error;

	if (method !== "GET") headers.append("Content-Type", "application/x-www-form-urlencoded");
	headers.append("Content-Type", "charset=utf-8");
	dataParams = dataParams !== UDF && dataParams !== null && method === "GET" ? `?${dataParams.toString()}` : dataParams.toString();

	const cors = "//cors-anywhere.herokuapp.com/";
	const endLink = method === "GET" ? dataParams : "";
	const params = dataParams !== UDF && dataParams !== null && method !== "GET" ? dataParams : null;
	const link = props.cors !== UDF && props.cors === true ? cors+url+endLink : url+endLink;

	let callback = {
		responseText: UDF,
		responseJSON: UDF,
		type: "ethernet",
		status: "connection::ERROR",
		statusText: "A technical fault has been detected and is already being fixed."
	};

	fetch(link, {
		method,
		headers,
		body: params
	}).then(async (response) => {
		if (!response.ok) {
			let resolve = response.text();
			callback.type = response.type;
			callback.status = response.status;
			callback.statusText = response.statusText;
			await resolve.then((event) => {
				callback.responseText = event;
				callback.responseJSON = JSON.parse(event);
				throw callback;
			});
		};
		return response[dataType]();
	}).then(success).catch((data) => error({...callback, data}));
};

exports.app = app;
exports.css = css;
exports.html = html;
exports.prop = prop;
exports.tests = tests;
exports.wait = wait;
exports.copy = copy;
exports.request = request;