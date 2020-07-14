$(document).ready(function () {
	// empty array for the saving the date / time / text content
	var saveDataArray = [];
	// set the now time
	var nowDateTime = moment();
	// a variable for current hour
	var nowHour = moment(nowDateTime).hour();
	// a variable for the current date in dddd, MMMM Do YYYY format
	var nowDate = moment(nowDateTime).format('dddd, MMMM Do YYYY');
	// a variable for the current date with the time as 00:00:00 (for comparsion to change the textarea format)
	var nowDateOnly = moment(nowDateTime).set({
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0,
	});
	// set the select Date as now (default setting)
	var selectDate = nowDateTime;
	// load if there are any save date (select by the user) from the session
	loadFromDateSessionStroage();
	// set the select date as save day (if any)
	var selectDateOnly = moment(selectDate);
	// set a display date format base on the select date
	var selectDisplayDate = moment(selectDate).format('dddd, MMMM Do YYYY');
	// set a save date format base on the select date
	var selectDateSave = moment(selectDate).format('MMMM Do YYYY');

	// function 1 - create the block
	function createHourBlock(hourCount) {
		// create div for the row
		var div1 = document.createElement('div');
		div1.setAttribute('class', 'row time-block');
		div1.setAttribute('hourRow', hourCount);
		// create div for grouping the hour-block / textarea / submit button
		var div2 = document.createElement('div');
		div2.setAttribute('class', 'input-group mb-0');
		div2.setAttribute('group', hourCount);
		// create div for the hour-block
		var div3 = document.createElement('div');
		div3.setAttribute(
			'class',
			'input-group-prepend hour align-items-center justify-content-end pr-2'
		);
		// create the textarea for the user to input the day plan
		var textarea1 = document.createElement('textarea');
		textarea1.setAttribute('class', 'form-control userinput textareaStyle');
		textarea1.setAttribute('id', 'textarea' + hourCount);
		textarea1.setAttribute('aria-label', 'With textarea');
		textarea1.setAttribute('hourTextArea', hourCount);
		// create the div for the submit button
		var div4 = document.createElement('div');
		div4.setAttribute('class', 'input-group-append');
		var button1 = document.createElement('button');
		button1.setAttribute('type', 'submit');
		button1.setAttribute('hourButton', hourCount);
		// append the element
		$('#timeBlockStart').append(div1);
		div1.append(div2);
		div2.append(div3);
		$(div3).text(moment(hourCount, ['HH']).format('h A'));
		div2.append(textarea1);
		div2.append(div4);
		div4.append(button1);
		// set the button class and add the image for save icon
		$(button1).attr('class', 'btn btn-primary saveBtn');
		$(button1).html(
			'<img src="../uwbootscamphomework5/assets/images/saveicon.png" alt ="save icon"></img>'
		);
		// load the data from local stroage (function 2)
		loadFromDPLocal();
	}

	// function 2 - load the text area data from local stroage
	function loadFromDPLocal() {
		// load the result from local stroage
		var storedResult = JSON.parse(
			localStorage.getItem('dayplannerDataArray' + selectDateSave)
		);
		console.log(storedResult);
		if (storedResult !== null) {
			saveDataArray = storedResult;
		}
		// run all the save data from the array and append to the textarea if any
		for (k = 0; k < saveDataArray.length; k++) {
			$('#textarea' + saveDataArray[k].saveDataHour).val(
				saveDataArray[k].saveDataText
			);
		}
	}

	// function 3 - load the select date from session stroage and so it will not being lose when reload the window
	function loadFromDateSessionStroage() {
		var storedDateResult = JSON.parse(sessionStorage.getItem('changeDate'));
		if (storedDateResult !== null) {
			selectDate = storedDateResult;
		}
	}

	// default - the script will run every time when the page open / reload
	// set the for loop in order to run the day planner after every refresh
	let hourCount = 9;
	for (let i = 0; i < 9; i++) {
		// run 9 times for the 9 hours from 9AM to 5PM (function 1)
		createHourBlock(hourCount);
		hourCount++;
	}

	// add the datepicker for the date selection
	$('#datepicker').datepicker({
		changeMonth: true,
		changeYear: true,
	});

	// when the input for datepicker is change => get the date to select day
	$('#datepicker').on('change', function () {
		event.preventDefault();
		selectDate = $('#datepicker').datepicker('getDate');
	});

	// append the date to jumbotron
	$('#currentDay').append(selectDisplayDate);

	// change the color of the text area base on the time
	$('.textareaStyle').each(function (j) {
		// if the date is the day before => add the class as past
		if (selectDateOnly < nowDateOnly) {
			$('#textarea' + (j + 9)).addClass('past');
			// if the date is today => check the time and change the class accordingly
		} else if (selectDisplayDate === nowDate) {
			if (
				parseInt(nowHour) >
				parseInt($('#textarea' + (j + 9)).attr('hourTextArea'))
			) {
				$('#textarea' + (j + 9)).addClass('past');
			} else if (
				parseInt(nowHour) ===
				parseInt($('#textarea' + (j + 9)).attr('hourTextArea'))
			) {
				$('#textarea' + (j + 9)).addClass('present');
			} else {
				$('#textarea' + (j + 9)).addClass('future');
			}
			// if teh date is furture => change the class to furture
		} else {
			$('#textarea' + (j + 9)).addClass('future');
		}
	});

	// when the 'go' button is click
	$('#selectDateBtn').on('click', function () {
		event.preventDefault();
		// store the new date in the selectDate
		sessionStorage.setItem('changeDate', JSON.stringify(selectDate));
		// reload the page
		location.reload(true);
	});

	// when the 'go to today' button is click
	$('#returntoToday').on('click', function () {
		event.preventDefault();
		selectDate = nowDateTime;
		// store the new date in the selectDate
		sessionStorage.setItem('changeDate', JSON.stringify(selectDate));
		// reload the page
		location.reload(true);
	});

	// when the save button is clicked
	$('.saveBtn').on('click', function () {
		event.preventDefault();
		// locate the hour by the hourButton attriubute
		var hourCheck = $(this).attr('hourButton');
		// save the hour and textcontent in an object
		var saveData = {
			saveDataHour: parseInt(hourCheck),
			saveDataText: $('#textarea' + hourCheck)
				.val()
				.trim(),
		};
		// push the data to the save data array
		saveDataArray.push(saveData);
		// remove the duplicated data record
		// (i.e.) if original textcontent for Jul-1-2020 3pm is ABC =>
		// 		  and now the user input CBA =>
		//        then CBA will replace ABC and the ABC object will remove from the array
		// the purpose is to reduce the size of the array when the user repeat input a lot of times
		// to do that we need the following 5 steps:
		// 1. set up a temp arr
		var temparr = saveDataArray.map(function (a) {
			return a.saveDataHour;
		});
		// 2. find the dup item
		var findDup = function (arr) {
			let dups = [];
			let compare = [];
			for (a = 0; a < arr.length; a++) {
				if (compare.includes(arr[a])) {
					dups.push(arr[a]);
				} else {
					compare.push(arr[a]);
					console.log(compare);
				}
			}
			return compare;
		};
		// 3. find the last index for the dup item
		var lastIndex = function (arr1, arr2) {
			let lastIndexArr = [];
			for (b = 0; b < arr2.length; b++) {
				let num = arr1.lastIndexOf(arr2[b]);
				lastIndexArr.push(num);
			}
			return lastIndexArr;
		};
		// 4. only get the last time to the final array
		var removeDup = function (arr1, arr2) {
			let finalResult = [];
			for (c = 0; c < arr2.length; c++) {
				finalResult.push(arr1[arr2[c]]);
			}
			return finalResult;
		};
		// 5. return the final result for saving
		saveDataArrayFinal = removeDup(
			saveDataArray,
			lastIndex(temparr, findDup(temparr))
		);

		localStorage.setItem(
			'dayplannerDataArray' + selectDateSave,
			JSON.stringify(saveDataArrayFinal)
		);
	});
});
