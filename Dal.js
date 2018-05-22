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

function setupThePanel() {
    let nextButton = document.createElement('div');
    let panelStyle = `
        position: fixed;
        right: 15px;
        z-index: 100;
        bottom: -460px;
        width: 300px;
        height: 500px;
        background-color: #efefef;
        border: none;
        border-radius: 10px;
        overflow-x: hidden;
        overflow-y: scroll;
        box-shadow: -2px -2px 8px grey;
    `
    nextButton.className = "selectedPanel";
    nextButton.style = panelStyle;
    nextButton.innerHTML = "<div style='padding-top: 10px'><center>Next</center></div>";
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
setupThePanel();
setupCheckbox();