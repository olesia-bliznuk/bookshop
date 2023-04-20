const form = document.querySelector('form');
form.addEventListener('submit', totalOrder);

form.addEventListener('blur', (event) => {
    if (event.target.value.length == 0) {
        event.target.classList.remove('valid');
        event.target.classList.add('error');
    }
}, true);

//final form 
function totalOrder() {
    const name = document.querySelector('#name').value;
    const surname = document.querySelector('#surname').value;
    const street = document.querySelector('#street').value;
    const houseNumber = document.querySelector('#houseNumber').value;
    const flatNumber = document.querySelector('#flatNumber').value;
    const dateDelivery = document.querySelector('#date').value;
    event.preventDefault();
    document.body.classList.add('stop-scrolling');
    const finalForm = document.querySelector('.final_form');
    finalForm.classList.add('open');
    finalCard = document.querySelector('.final_card');
    finalCard.innerHTML = ` <h3>Dear ${name} ${surname}, your order created!</h3>
    <h4>Delivery adress: ${street} street ${houseNumber}, ${flatNumber}</h4>
    <h4>Delivery date: ${dateDelivery}</h4>
    <h4>Thanks for your order!</h4>
    <a href='../../pages/main/index.html' class = "button_close">OK</a>`;
};

//validation form
function validationForm() {
    let validArr = document.querySelectorAll('.valid');
    const confirmBtn = document.querySelector('#confirm_order');
    if (validArr.length == 7) {
        confirmBtn.disabled = false;
    } else {
        confirmBtn.disabled = true;
    }
};

// validation payment type
const payment = document.querySelector('#payment')
payment.addEventListener('change', function () {
    let paymentTypes = payment.querySelectorAll('input');
    for (let type of paymentTypes) {
        if (type.checked) {
            payment.classList.add('valid');
            validationForm();
        }
    }
});

//limit for gifts
const checkboxGifts = document.querySelector('#checkboxGifts');
let limit = 2;
checkboxGifts.addEventListener('change', function () {
    const checkBoxGroup = checkboxGifts.querySelectorAll("input");
    let checkedCount = 0;
    for (let checkGift of checkBoxGroup) {
        checkedCount += (checkGift.checked) ? 1 : 0;
    }
    if (checkedCount == limit) {
        for (checkGift of checkBoxGroup)
            (checkGift.checked) ? checkGift.disabled = false : checkGift.disabled = true;
    } else {
        for (checkGift of checkBoxGroup) {
            checkGift.disabled = false;
        }
    }
});

// validation name
const namePerson = document.querySelector('#name');
namePerson.addEventListener('change', function () {
    const regExp = /^[A-Za-zА-Яа-я]+$/;
    if (regExp.test(namePerson.value) && namePerson.value.length > 3) {
        rightRegExp(namePerson);
    }
    else {
        wrongRegExp(namePerson, '*The field should contain only letters without spaces and at least 4 symbols');
    }
});

// validation surname
const surnamePerson = document.querySelector('#surname');
surnamePerson.addEventListener('change', function () {
    const regExp = /^[A-Za-zА-Яа-я]+$/;
    if (regExp.test(surnamePerson.value) && surnamePerson.value.length > 4) {
        rightRegExp(surnamePerson);
    }
    else {
        wrongRegExp(surnamePerson, '*The field should contain only letters without spaces and at least 5 symbols');
    }
});

// validation date
let tomorrow = new Date();
tomorrow = new Date(tomorrow.setDate(tomorrow.getDate() + 1)).toISOString().split('T')[0];
const dateDelivery = document.querySelector('#date');
dateDelivery.setAttribute('min', tomorrow);
dateDelivery.addEventListener('change', function () {
    if (dateDelivery.value.length > 0 && dateDelivery.value >= tomorrow) {
        rightRegExp(dateDelivery);
    }
    else {
        wrongRegExp(dateDelivery, '*The field contains wrong date');
    }
});

// validation flat street
const street = document.querySelector('#street');
street.addEventListener('change', function () {
    const regExp = /^[а-яА-ЯёЁa-zA-Z0-9\s]+$/;
    if (regExp.test(street.value) && street.value.length > 4) {
        rightRegExp(street);
    }
    else {
        wrongRegExp(street, '*The field should contain at least 5 symbols, the numbers are allowed');
    }
});

// validation house number
const houseNumber = document.querySelector('#houseNumber');
houseNumber.addEventListener('change', function () {
    const regExp = /^\d+$/;
    if (regExp.test(houseNumber.value) && houseNumber.value.length > 0) {
        rightRegExp(houseNumber);
    }
    else {
        wrongRegExp(houseNumber, '*The field should contain only positive numbers');
    }
});

// validation flat number
const flatNumber = document.querySelector('#flatNumber');
flatNumber.addEventListener('change', function () {
    const regExp = /^[1-9]+[0-9-]*$/;
    if (regExp.test(flatNumber.value) && flatNumber.value.length > 0) {
        rightRegExp(flatNumber);
    }
    else {
        wrongRegExp(flatNumber, '*The field should contain positive numbers only, the dash symbol is allowed');
    }
});

function rightRegExp(element) {
    element.classList.add('valid');
    element.classList.remove('error');
    const parentElement = element.parentElement;
    const errorText = parentElement.querySelector('.errorText');
    if (errorText) errorText.parentNode.removeChild(errorText);
    validationForm();
};

function wrongRegExp(element, text) {
    element.classList.remove('valid');
    element.classList.add('error');
    const parentElement = element.parentElement;
    if (!parentElement.querySelector('.errorText')) {
        const errorText = document.createElement('p');
        errorText.innerText = text;
        errorText.classList.add('errorText');
        parentElement.append(errorText);
    }
    validationForm();
};








