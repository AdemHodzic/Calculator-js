$(function(){
	const finalResult = $('.result');
	const number = $('.number');
	const operator = $('.operator');
	const equal = $('.equals');

	let num = [];
	let numString = '';
	let operation = {
		'+': function(a,b){return a + b},
		'-':function(a,b){return a - b},
		'*':function(a,b){return a * b},
		'/':function(a,b){return (b!==0)?a/b:0}
	};
	let tempOperator = '';
	let isOperator = false;
	number.on('click',function(){
		console.log($(this).text());
		if(isOperator) finalResult.text('');isOperator=false;
		finalResult.append($(this).text());
	});

	operator.on('click',function(){
		numString = finalResult.text();
		num.push(parseInt(numString));
		finalResult.text(tempOperator);
		tempOperator = ($(this).text());
		numString='';
		isOperator = true;
	});

	equal.on('click',function(){
		numString = finalResult.text();
		num.push(parseInt(numString));
		finalResult.text(operation[tempOperator](num[0],num[1]));
		tempOperator = '';
		console.log(num);
		console.log(tempOperator + ' ' + num[0] + ' ' + num[1]);
	});
});