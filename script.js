
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

const button = document.querySelector(".click-arrow");
const labels = document.querySelectorAll(".txt-sm");
const inputs = document.querySelectorAll(".input-date");

const elementDay = document.getElementById("age-day")
const elementMonth = document.getElementById("age-month")
const elementYear = document.getElementById("age-year")


// Input restrictions

year.addEventListener("input", () => {
    year.value = year.value.replace(/\D/g, "").slice(0, 4);
});

month.addEventListener("input", () => {
    month.value = month.value.replace(/\D/g, "").slice(0, 2);
});

day.addEventListener("input", () => {
    day.value = day.value.replace(/\D/g, "").slice(0, 2);
});


// Helpers

function clearErrors() {
    document.querySelectorAll(".error-date").forEach(error => error.remove());
    
    labels.forEach(label => label.classList.remove("e-txt"));
    inputs.forEach(input => input.classList.remove("error"));
}

function showErrors() {
    labels.forEach(label => label.classList.add("e-txt"));
    inputs.forEach(input => input.classList.add("error"));
}

function createError(input, message, className) {
    const error = document.createElement("p");

    error.textContent = message;
    error.className = `e-txt error-date ${className}`;

    input.parentElement.append(error);
}

function update (yearsAge , monthsAge , daysAge){
    elementDay.textContent = daysAge
    elementMonth.textContent = monthsAge
    elementYear.textContent = yearsAge
}

function calculate (date){
    let today = new Date
    let yearsAge = today.getFullYear() - date.getFullYear();
    let monthsAge = today.getMonth() - date.getMonth(); 
    let daysAge = today.getDate() - date.getDate();

    if (daysAge < 0) {
        monthsAge--;
        const previousMonth = new Date(today.getFullYear() ,today.getMonth() ,0); // getting the previous month daysAge 30 or 28 or 31...
        daysAge += previousMonth.getDate();
    }
    if (monthsAge < 0) {
        yearsAge--;
        monthsAge += 12;
    }

    return {yearsAge , monthsAge , daysAge}
}
// Validation of Date
function valDate (birthDay,birthMonth,birthYear){
    let error = false
    // Invalid date
    
    // Validate month
    if (birthMonth < 0 || birthMonth > 12) {
        createError(month, "Must be a valid month", "monthError");
        showErrors();
        return true
    }

    // Get number of days in the selected month
    const daysInMonth = new Date(birthYear,birthMonth,0).getDate();

    // Validate day
    if (birthDay < 1 || birthDay > daysInMonth) {
        createError(day, "Must be a valid day", "dayError");
        showErrors();
        return true
    }
    
    return error
}

button.addEventListener("click", () => {
    clearErrors();

    const birthDay = Number(day.value);
    const birthMonth = Number(month.value) // keep 1–12 until empty-field validation is complete.
    const birthYear = Number(year.value);

    // Empty fields
    if (!birthDay || !birthMonth || !birthYear) {
        createError(day, "Must be a valid date");
        createError(month, "Must be a valid date");
        createError(year, "Must be a valid date");

        showErrors();
        return;
    }

    // Create date
    const date = new Date(
        birthYear,
        birthMonth - 1 , // JavaScript months are 0-11; 0 ==> jan
        birthDay
    );
    // check
    const X = valDate(birthDay,birthMonth,birthYear) 
    if(X === true){
        return
    }

    const {yearsAge , monthsAge , daysAge} = calculate(date)

    if(yearsAge < 0 || monthsAge < 0 || daysAge < 0){
        createError(year, "Must be a valid in past", "");
        createError(month, "Must be a valid in past", "");
        createError(day, "Must be a valid in past", "");
        showErrors();
        return
    }

    update(yearsAge , monthsAge , daysAge)
});

