const cardName = document.getElementById("name");
const cardNumber = document.getElementById("number");
const dateMonth = document.getElementById("month");
const dateYear = document.getElementById("year");
const cardLine = document.getElementById("cvc");
const click = document.getElementById("submit");
const form = document.getElementById("form");
const cardNom = document.getElementById("card__nom");
const cardCount = document.getElementById("count");
const cardCal1 = document.getElementById("cal1");
const cardCal2 = document.getElementById("cal2");
const cardCals = document.getElementById("cals");
const complete = document.getElementById("complete");
// console.log(cardCal.innerText);


cardName.addEventListener("change", function (e) {
    return cardNom.innerText = e.target.value.toUpperCase();
});

cardNumber.addEventListener("change", function (e) {
    return cardCount.innerText = e.target.value;
});

dateMonth.addEventListener("change", function (e) {
    return cardCal1.innerText = e.target.value;
});

dateYear.addEventListener("change", function (e) {
    return cardCal2.innerText = e.target.value;
});

cardLine.addEventListener("change", function (e) {
    return cardCals.innerText = e.target.value;
});

// check for required inputs
const isRequired = value => value === "" ? false : true;

// check for minimum and maximum characters
const isBetween = (length, min, max) => length < min || length > max ? false : true;

// shows error on invalid input field
const showError = (input, message) => {

    const formParent = input.parentElement;
    const formInput = input;

    formInput.classList.remove('success');
    formInput.classList.add('error');

    const errorElement = formParent.querySelector('small');
    errorElement.textContent = message;
}

// remove error message
const showSuccess = (input) => {

    const formInput = input;
    const formParent = input.parentElement;

    formInput.classList.remove('error');
    formInput.classList.add('success');

    const errorElement = formParent.querySelector('small');
    errorElement.textContent = "";
}

const checkcardName = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const name = cardName.value.trim();
    if (!isRequired(name)) {
        showError(cardName, 'Name cannot be empty');
    } else if (!isBetween(name.length, min, max)) {
        showError(cardName, `Name must be between ${min} and ${max} characters.`);
    } else {
        showSuccess(cardName);
        valid = true;
    }
    return valid;
};

const checkcardNumber = () => {

    let valid = false;

    const min = 3,
        max = 16;

    const number = cardNumber.value.trim();
    if (!isRequired(number)) {
        showError(cardNumber, 'Number cannot be empty');
    } else if (!isRequired(number.length, max)) {
        showError(cardNumber, `Number must be ${max} character.`);
    } else {
        showSuccess(cardNumber);
        valid = true;
    }
    return valid;
}

const checkdateMonth = () => {

    let valid = false;

    const min = 2,
        max = 2;

    const month = dateMonth.value.trim();
    if (!isRequired(month)) {
        showError(dateMonth, "Can't be blank");
    } else if (!isBetween(month.length, max)) {
        showError(dateMonth, `Number must be between ${min} and ${max} charceters.`);
    } else {
        showSuccess(dateMonth);
        valid = true;
    } return valid;
}

const checkdateYear = () => {

    let valid = false;

    const min = 2,
        max = 2;

    const year = dateYear.value.trim();
    if (!isRequired(year)) {
        showError(dateYear, "Can't be blank");
    } else if (!isBetween(year.length, min, max)) {
        showError(dateYear, `Number must be between ${min} and ${max} charceters.`);
    } else {
        showSuccess(dateYear);
        valid = true;
    } return valid;
}

const checkcardLine = () => {

    let valid = false;

    const min = 1,
        max = 3;
    const cvc = cardLine.value.trim();
    if (!isRequired(cvc)) {
        showError(cardLine, "Can't be blank");
    } else if (!isBetween(cvc.length, min, max)) {
        showError(cardLine, `Number must be between ${min} and ${max} charceters.`);
    } else {
        showSuccess(cardLine);
        valid = true;
    } return valid;
}

cardName.addEventListener("change", function (e) {
    cardName.value === e.target.value;
});


const debounce = (fn, delay = 3000) => {
    let timeoutId;
    return (...args) => {
        // cancel previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // set up a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'name':
            checkcardName();
            break;
        case 'number':
            checkcardNumber();
            break;
        case 'month':
            checkdateMonth();
            break;
        case 'year':
            checkdateYear();
            break;
        case 'cvc':
            checkcardLine();
            break;
    }
}));

click.addEventListener("click", function (e) {
    e.preventDefault()

    // validate field
    let isName = checkcardName();
    isNumber = checkcardNumber();
    isMonth = checkdateMonth();
    isYear = checkdateYear();
    isCvc = checkcardLine();

    let isFormValid = isName
        && isNumber && isMonth && isYear && isCvc;


    console.log(isFormValid)

    // submit to the server if form is valid
    if (isFormValid) {
        form.classList.add('invisible');
        complete.classList.add('visible');
    }
});
