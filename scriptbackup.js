$(document).ready(function () {
	var saveDataArray = [];
	// var nowDateTime = new Date('August 19, 1984 16:15:30');
	var nowDateTime = moment();
	var nowHour = moment(nowDateTime).hour();
	// var nowYear = moment(nowDateTime).year();
	console.log(nowHour);
	var nowDate = moment(nowDateTime).format('dddd, MMMM Do YYYY');
	var nowDateOnly = moment(nowDateTime).set({
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0,
	});
	console.log(nowDate);
	console.log(nowDateOnly);
	// var nowDateSave = moment(nowDateTime).format('MMMM Do YYYY');
	var selectDate = nowDateTime;
	console.log(selectDate);
	loadFromDateSessionStroage();
	console.log(selectDate);
	var selectDateOnly = moment(selectDate);
	var selectDisplayDate = moment(selectDate).format('dddd, MMMM Do YYYY');
	var selectDateSave = moment(selectDate).format('MMMM Do YYYY');

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
		// console.log(moment(hourCount, ["HH"]).format("hh A"));
		$(div3).text(moment(hourCount, ['HH']).format('h A'));
		div2.append(textarea1);
		// console.log(nowHour);
		// console.log(hourCount);
		div2.append(div4);
		div4.append(button1);
		// set the button class and add the image for save icon
		$(button1).attr('class', 'btn btn-primary saveBtn');
		$(button1).html(
			'<img src="../uwbootscamphomework5/assets/images/saveicon.png" alt ="save icon"></img>'
		);
		// load the data from local stroage
		loadFromDPLocal();
	}

	function loadFromDPLocal() {
		var storedResult = JSON.parse(
			localStorage.getItem('dayplannerDataArray' + selectDateSave)
		);
		if (storedResult !== null) {
			saveDataArray = storedResult;
		}
		for (k = 0; k < saveDataArray.length; k++) {
			// console.log(saveDataArray.length);
			// console.log(k);
			// console.log(saveDataArray[k].saveDataDate);
			// console.log(nowDateSave);
			// console.log(saveDataArray[k].saveDataDate === nowDateSave);
			if (saveDataArray[k].saveDataDate === selectDateSave) {
				$('#textarea' + saveDataArray[k].saveDataHour).val(
					saveDataArray[k].saveDataText
				);
			}
		}
	}

	function loadFromDateSessionStroage() {
		var storedDateResult = JSON.parse(sessionStorage.getItem('changeDate'));
		if (storedDateResult !== null) {
			selectDate = storedDateResult;
		}
	}

	// set the for loop in order to run the day planner after every refresh
	let hourCount = 9;
	for (let i = 0; i < 9; i++) {
		// run 9 times for the 9 hours from 9AM to 5PM
		createHourBlock(hourCount);
		hourCount++;
	}

	$('#datepicker').datepicker({
		changeMonth: true,
		changeYear: true,
	});

	$('#datepicker').on('change', function () {
		event.preventDefault();
		selectDate = $('#datepicker').datepicker('getDate');
		console.log($('#datepicker').datepicker('getDate'));
		console.log(selectDate);
	});

	// let yearCount = nowYear + 10;
	// for (let m = 0; m < nowYear - 1899 + 10; m++) {
	// 	// run 9 times for the 9 hours from 9AM to 5PM
	// 	createYearList(yearCount);
	// 	yearCount--;
	// }

	// function createYearList() {
	// 	var option1 = document.createElement('option');
	// 	$(option1).text(yearCount);
	// 	option1.setAttribute('value', yearCount);
	// 	$('#yearSelection').append(option1);
	// }

	// function createDateList(dateCount) {
	// 	var option2 = document.createElement('option');
	// 	$(option2).text(dateCount);
	// 	option2.setAttribute('value', dateCount);
	// 	$('#dateSelection').append(option2);
	// }

	// append the date to jumbotron
	$('#currentDay').append(selectDisplayDate);

	// change the color of the text area base on the time
	$('.textareaStyle').each(function (j) {
		if (selectDateOnly < nowDateOnly) {
			$('#textarea' + (j + 9)).addClass('past');
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
		} else {
			$('#textarea' + (j + 9)).addClass('future');
		}
	});

	// when the 'go' button is click
	$('#selectDateBtn').on('click', function () {
		event.preventDefault();
		console.log(selectDate);
		// store the new date in the selectDate
		sessionStorage.setItem('changeDate', JSON.stringify(selectDate));
		// reload the page
		location.reload(true);
	});

	// when the 'go to today' button is click
	$('#returntoToday').on('click', function () {
		event.preventDefault();
		selectDate = nowDateTime;
		console.log(selectDate);
		// store the new date in the selectDate
		sessionStorage.setItem('changeDate', JSON.stringify(selectDate));
		// reload the page
		location.reload(true);
	});

	// when the save button is clicked
	$('.saveBtn').on('click', function () {
		event.preventDefault();
		// console.log($(this).attr("hourButton"));
		var hourCheck = $(this).attr('hourButton');
		// console.log(hourCheck);
		// console.log($("#textarea"+hourCheck).val().trim());
		var saveData = {
			saveDataDate: selectDateSave,
			saveDataHour: parseInt(hourCheck),
			saveDataText: $('#textarea' + hourCheck)
				.val()
				.trim(),
		};
		console.log(saveData);
		saveDataArray.push(saveData);
		localStorage.setItem(
			'dayplannerDataArray' + selectDateSave,
			JSON.stringify(saveDataArray)
		);
	});
});
