// 开发者A
let AModule = (function () {
	let n = 10;
	let query = function () {
		//...
	};
	let fn = function () {
		//...
		//调取开发者B编写的QUERY方法
		BModule.query();
	};

	return {
		query: query,
		init: function () {
			query();
			fn();
		}
	}
})();

// 开发者B
let BModule = (function () {
	let n = 20;
	let query = function () {
		//...
	};
	let sum = function () {
		//...
		//调取开发者A编写的QUERY方法
		AModule.query();
	};

	return {
		query: query,
		init: function () {
			query();
			sum();
		}
	}
})();

AModule.init();
BModule.init();