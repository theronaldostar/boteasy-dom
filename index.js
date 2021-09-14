/** @license Boteasy v1.0.3
	* index.js 
	*
	* This library was developed by Ronaldo for https://www.boteasy.net/
	* Copyright (c) since 2020 Boteasy, all rights reserved.
*/

const DOM = document;
const UDF = undefined;

const DOMChange = (func,t,v) => {
	const _func = func === "html" ? "innerHTML" : "disabled";
	const value = func === "html" ? v : JSON.parse(v);
	const target = t.replace(/\s/g, "").split(",");
	target.forEach((t,i) => {
		const element = DOM.querySelector(t);
		if (element) element[_func] = value;
	});
};

const DOMCss = (func,t,v) => {
	const target = t.replace(/\s/g, "").split(",");
	const css = v.replace(/\s/g, "").split(",");
	target.forEach((t, i) => {
		const element = DOM.querySelector(t);
		if (element) element.classList[func](...css);
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
	add: (t,v) => DOMCss("add", t, v),
	remove: (t,v) => DOMCss("remove", t, v)
};
const html = (t,v) => DOMChange("html", t, v);
const prop = (t,v) => DOMChange("prop", t, v);

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

	const url = props.url ? props.url : null;
	const method = props.method ? props.method.toUpperCase() : "GET";
	const headers = new Headers(props.headers || {});
	if (method !== "GET") headers.append("Content-Type", "application/x-www-form-urlencoded");
	const data = new URLSearchParams(props.data || {});
	const params = method === "GET" ? `?${data.toString()}` : data.toString();
	const dataType = props.dataType ? props.dataType.toLowerCase() : "json";
	const success = props.success ? props.success : () => {};
	const error = props.error ? props.error : (error) => console.error(error);

	const cors = "//cors-anywhere.herokuapp.com/";
	const endPoint = method === "GET" ? params : "";
	const body = method !== "GET" ? params : null;
	const link = props.cors ? cors+url+endPoint : url+endPoint;

	const callback = {
		responseText: UDF,
		responseJSON: UDF,
		type: "connection",
		status: "connection::ERROR",
		statusText: "A technical fault has been detected and is already being fixed."
	};

	fetch(link, {
		method,
		headers,
		body
	})
	.then(async (response) => {
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
	})
	.then(success)
	.catch((data) => error({...callback, data}));
};

exports.app = app;
exports.css = css;
exports.html = html;
exports.prop = prop;
exports.tests = tests;
exports.wait = wait;
exports.copy = copy;
exports.request = request;