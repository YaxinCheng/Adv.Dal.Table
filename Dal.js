// ==UserScript==
// @name         Dalhousie Advanced Academic Timetable
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Easier course selection
// @author       Yaxin Cheng
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @match        https://dalonline.dal.ca/PROD/fysktime.P_DisplaySchedule?s_term=*&s_subj=*&s_district=*
// @grant        GM_addStyle
// ==/UserScript==

function setupTheButton() {
    let nextButton = document.createElement('button');
    let buttonStyle = `
        position: fixed;
        right: 15px;
        z-index: 100;
        bottom: 10px;
        width: 50px;
        height: 50px;
        background-color: #ffbf00;
        border: none;
        border-radius: 50%
    `
    nextButton.className = "nextButton";
    nextButton.style = buttonStyle;
    nextButton.innerHTML = "Next";
    document.body.appendChild(nextButton);
}

function checkboxSelected(element) {
    var crn = element.children[1].innerHTML;
    var isChecked = element.getElementsByTagName('input')[0].checked;
    if (isChecked) {
        selected[crn] = true;
    } else {
        delete selected[crn];
    }
}

function setupCheckbox() {
    let rows = $('table.dataentrytable > tbody > tr:not([valign=middle])').slice(3);
    let courseRows = rows.toArray().filter(function (tr) {
        return tr.children[0].innerHTML != "<b>NOTE</b>";
    });
    courseRows.forEach(function(tr) {
        tr.children[0].innerHTML = "<input type=checkbox> " + tr.children[0].innerHTML;
        tr.children[0].addEventListener("click", function() { checkboxSelected(tr); }, false);
    });
}

var selected = {};
setupTheButton();
setupCheckbox();