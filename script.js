$(function(){
	const finalResult = $('.result');
	const number = $('.number');
	const operator = $('.operator');
	const equal = $('.equals');
	const clear = $('.clear');
	const undo = $('.undo');

	let input = '';
	let isOperatorPrev = false;
	let start = true;
	finalResult.text('0');

	number.on('click',function(){
		if(start) finalResult.text('');start=false; //Clear default zero
		if(isOperatorPrev) finalResult.text(''); isOperatorPrev = false;  //Clear screen from previous input if previous input is operator
		finalResult.append($(this).text());  //Append inputed number to console
		input += ($(this).text());  //Append inputed number to string
	});

	operator.on('click',function(){
		input = finalResult.text();
		finalResult.text('');	//Clean screen from previous input
		finalResult.text($(this).text());
		input += ($(this).text());  //Append inputed operator to string
		isOperatorPrev = true; //We set test case boolean to true
	});

	equal.on('click',function(){
		if(isValid(input)){
			var temp = (input.length>0) ? input.split('') : void(0);  //Check if we even have input
			for(var x in temp){ //Loop to find out if we have any operations in our input
				if(x.match(/(\+|\/|\-|\*)/g)){
					finalResult.text(eval(input));
					return; //<--- This returns undefined but it doesn't matter since we just care about line above and not return type
				}
			}
			if((input.length>0) ? input.includes('/0') : void(0)){ //Handling divisionByZeroException
				input = 0;
			}
			console.log(input);
			finalResult.text(eval(input));
		}else{
			console.log(input);
			finalResult.text('Wrong Input. Please refresh the page.');
		}
	});

	clear.on('click',function(){	
		input = ''; //We set our input string to ''
		finalResult.text('0'); //We set our console to 0
	})

	undo.on('click',function(){
		if(finalResult.text().charAt(input.length-1).match(/(\+|\/|\-|\*)/g)){ //Checks if last char in input is operation. Then we just return to previous console input
			finalResult.text(eval(input.slice(0,input.length-1)));
		}else{
			input = input.slice(0,input.length-1);  //We take away last element
			if(input.length == 0){ //If we have only one number then we prinr 0 to console
				finalResult.text('0');
			}
			else{
				finalResult.text(eval(input)); //In other cases we just calculated our current input
			}
		}
	});

	function isValid(input){
		var i = 0,j = 1;
		while(j<input.length){
			if(input.charAt(i).match(/(\+|\/|\*|\-)/) && input.charAt(j).match(/(\+|\/|\*|\-)/)) return false;
			i++;
			j++;
		}
		return true;
	}
});

