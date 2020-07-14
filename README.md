# Project Name 
Homework 4 - Code Quiz

# Table of contents
- [Project Name](#project-name)
- [Table of contents](#table-of-contents)
- [General info](#general-info)
- [Screenshots](#screenshots)
- [Features](#features)
- [Code Style](#code-style)
  - [<span style="color: rgb(220, 105, 1);"> Description for the code</span>](#description-for-the-code)
- [Technology](#technology)
- [Code Example](#code-example)
- [Test](#test)
- [Status](#status)
- [Future Plan](#future-plan)
- [Create By](#create-by)

# General info
This project is to bulid a daily planner in order to drop down and find out the note for the hour between (9AM-5PM).  
   
1. 3 local CSS files for styling the entire application:
   1. reset.css - to reset all the styling setting
   2. style.css - to add the style to this generator 
   3. jquery-ui.css - to set the style for jquery UI item (i.e. Datepicker)
2. 3 javascript file has been composed for this application:
   1. script.js - the local script for the application
   2. moment.js - the script for formatting and calculating the time
   3. jquery-ui.js - the script for the Datepicker 
    
Please visit [https://rickyfuk.github.io/uwbootscamphomework5/](https://rickyfuk.github.io/uwbootscamphomework5/) for the site.

For the feature of the site, please visit the [Features](#features) section for more details.

# Screenshots
![screenshot](https://github.com/rickyfuk/uwbootscamphomework5/blob/master/assets/images/screenshot.PNG?raw=true)

# Features
In this project, the following features have apply to the site:

1. Favicon have been added for the page
2. The users can pick a day from the input bar (a calander will show up after the input bar is click or selected)
3. The users can retun to today by clicking the "Go to Today" button
4. The text input area will change its color in the following scenerio:
    |         Scenerio         | Color |
    | :----------------------: | :---: |
    | Any time before the hour | Grey  |
    |       On the hour        |  Red  |
    | Any time after the hour  | Green |

5. The users can enter the any text in the text area and press "save button" (at the right end of thetext area) to save the item
6. The color of the text area will change base on the real time. (i.e. if the user stay on the website, tie color of the block will change in the same day)
7. The day will change to next day after 12AM if the user select the same day.
   
    

# Code Style
Standard

## <span style="color: rgb(220, 105, 1);"> Description for the code</span>
A general description for the every section on the top of the code to breifly explain the puopose of that section and some note for the section details.

  <div>
  <img src="assets/images/descriptionexample.png" alt="Description Example">
   *example for the section description*
  </div>

For easier reference, the location of the function will place inside its description
 ![functionlocation](assets/images/functionlocation.png) 
  


# Technology
The following technology have been used for this project:

  1. [HTML](https://whatwg.org/)
  2. [CSS](https://www.w3.org/Style/CSS/)
  3. [Bootstrap](https://getbootstrap.com/)
  4. [JavaScript](https://www.javascript.com/)
  5. [JQUERY](https://jquery.com/)

# Code Example
Below are some example for the code has been used and the corresponding outcome:

1. To activiate the datepicker
    ```Javascript
            	// add the datepicker for the date selection
                $('#datepicker').datepicker({
                    changeMonth: true,
                    changeYear: true,
                });
    ```
2. To add the datepicker function, the following link and script files are required
   ```html
        <!-- jquery UI CSS for "DatePicker" -->
		<link rel="stylesheet" href="assets/CSS/jquery-ui.css" />
		<!-- jquery -->
		<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
		<!-- jquery UI for "DatePicker" -->
		<script src="../uwbootscamphomework5/jquery-ui.js"></script>
   ``` 
 
3.  To avoid the overloading for the array to save the data, the date has been added for the key name when the data is saving into the local stroage
    ```Javascript
        // for saving the data into the local stroage
        localStorage.setItem(
			'dayplannerDataArray' + selectDateSave,
			JSON.stringify(saveDataArrayFinal)
        );
        // for loading the date from the local stroage
        var storedResult = JSON.parse(
			localStorage.getItem('dayplannerDataArray' + selectDateSave)
		);
    ```
4.  To avoid the overloading for the array to save the data, the following scripts added to remove the duplicated hours object where it had been save before
    ```Javascript
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
    ```
5.  In order to make the date selection works, the page will reload after the user press "Go" button and the date will save into the session stroage. Below is an example for storing the select date in session stroage
     ```Javascript
        // saving the select date to session stroage
        $('#selectDateBtn').on('click', function () {
            event.preventDefault();
            // store the new date in the selectDate
            sessionStorage.setItem('changeDate', JSON.stringify(selectDate));
            // reload the page
            location.reload(true);
	    });
    
        // load the select date from session stroage
        function loadFromDateSessionStroage() {
            var storedDateResult = JSON.parse(sessionStorage.getItem('changeDate'));
            if (storedDateResult !== null) {
                selectDate = storedDateResult;
            }
        }
    ```

 
# Test
1. The site have been tested by open with small/medium/large device respectively.
2. The site have been tested by a HTML validation service - [W3C](https://validator.w3.org/)

# Status
Project status: finished

# Future Plan

Plan for the future development of this site:

1. Open another text box for the mobile screen size when the text box is selected(under 768px)   

# Create By
Created by Chung Hei Fuk