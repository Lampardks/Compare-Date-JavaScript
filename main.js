document.addEventListener('DOMContentLoaded', function(){

    var time1 = document.querySelector('#time1');
    var time2 = document.querySelector('#time2');
    var precision = document.querySelector('#precision');
    var buttonTime = document.querySelector('#buttonTime');
    var dateTimeRegEx = /\d{4}\-([0]{1}[1-9]{1}|([1]{1}[12]{1}))\-([0-2]{1}[0-9]{1}|([3]{1}[1]{1})) ([0-1]{1}[0-9]{1}|[2]{1}[23]{1})\:([0-5]{1}[0-9]{1})/g;

    compareDate = function(date1, date2, precision) {
        var compareVal;
        dateTime1 = new Date(date1);
        dateTime2 = new Date(date2);
        switch (precision) {
            case 'minute':
                compareVal = Math.floor(Date.parse(date1) / 60000 - Date.parse(date2) / 60000);
                break;
            case 'hour':
                compareVal = Math.floor(Date.parse(date1) / 3600000 - Date.parse(date2) / 3600000);
                break;
            case 'day':
                compareVal = Math.floor(Date.parse(date1) / 86400000 - Date.parse(date2) / 86400000);
                break;
            case 'month':
                compareVal = (dateTime1.getFullYear() - dateTime2.getFullYear()) * 12 +
                            (dateTime1.getMonth() - dateTime2.getMonth());
                break;
            case 'year':
                compareVal = (dateTime1.getFullYear() - dateTime2.getFullYear());
                break;
            default:
        }
        return Math.abs(compareVal);
    }

    showError = function(element, message) {
        element.classList.add('error');
        var showMessage = document.createElement('span');
        showMessage.classList.add('error-message');
        showMessage.innerHTML = message;
        element.parentNode.appendChild(showMessage);
    }

    resetError = function(element) {
        element.classList.remove('error');
        if (element.parentNode.lastChild.className === 'error-message') {
            element.parentNode.removeChild(element.parentNode.lastChild);
        }
    }

    buttonTime.onclick = function() {
        var compareVal = true;

        resetError(time1);
        if (!time1.value) {
            showError(time1, 'Укажите дату и время.');
            compareVal = false;
        } else if (time1.value.search(dateTimeRegEx) === -1) {
            showError(time1, 'Укажите дату и время в правильном формате.');
            compareVal = false;
        }

        resetError(time2);
        if (!time2.value) {
            showError(time2, 'Укажите дату и время.');
            compareVal = false;
        } else if (time2.value.search(dateTimeRegEx) === -1) {
            showError(time2, 'Укажите дату и время в правильном формате.');
            compareVal = false;
        }

        resetError(precision);
        if (precision.value === 'выбрать:') {
            showError(precision, 'Укажите тип сравнения.');
            compareVal = false;
        }

        if (compareVal === true) {
            alert('Разница между датами: ' + compareDate(time1.value, time2.value, precision.value));
        }
    }
});
