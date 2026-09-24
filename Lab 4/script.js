function setError(input, errorId, message) {
    const error = document.getElementById(errorId);
    error.textContent = message;

    if (input) {
        input.classList.toggle("invalid", message !== "");
        input.classList.toggle("valid", message === "" && input.value.trim() !== "");
    }
}

function clearErrors(form) {
    form.querySelectorAll(".error").forEach(el => el.textContent = "");
    form.querySelectorAll("input, select").forEach(el => {
        el.classList.remove("invalid", "valid");
    });
}

// 1. Базовый уровень: вариант №1
document.getElementById("studentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("studentName");
    const email = document.getElementById("studentEmail");
    const course = document.getElementById("studentCourse");
    const agree = document.getElementById("studentAgree");
    const message = document.getElementById("studentMessage");

    message.textContent = "";

    let valid = true;

    if (name.value.trim() === "") {
        setError(name, "studentNameError", "Введите ФИО.");
        valid = false;
    } else {
        setError(name, "studentNameError", "");
    }

    if (email.value.trim() === "") {
        setError(email, "studentEmailError", "Введите e-mail.");
        valid = false;
    } else if (!email.validity.valid) {
        setError(email, "studentEmailError", "Введите корректный e-mail.");
        valid = false;
    } else {
        setError(email, "studentEmailError", "");
    }

    if (course.value === "") {
        setError(course, "studentCourseError", "Выберите курс.");
        valid = false;
    } else {
        setError(course, "studentCourseError", "");
    }

    const agreeError = document.getElementById("studentAgreeError");
    if (!agree.checked) {
        agreeError.textContent = "Необходимо согласиться с правилами.";
        valid = false;
    } else {
        agreeError.textContent = "";
    }

    if (valid) {
        message.textContent = "Регистрация студента прошла успешно.";
    }
});

// 2. Средний уровень: вариант №7
document.getElementById("accountForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const login = document.getElementById("login");
    const email = document.getElementById("accountEmail");
    const password = document.getElementById("password");
    const repeat = document.getElementById("passwordRepeat");
    const message = document.getElementById("accountMessage");

    message.textContent = "";
    let valid = true;

    if (login.value.trim() === "") {
        setError(login, "loginError", "Введите логин.");
        valid = false;
    } else {
        setError(login, "loginError", "");
    }

    if (email.value.trim() === "") {
        setError(email, "accountEmailError", "Введите e-mail.");
        valid = false;
    } else if (!email.validity.valid) {
        setError(email, "accountEmailError", "Введите корректный e-mail.");
        valid = false;
    } else {
        setError(email, "accountEmailError", "");
    }

    if (password.value.length < 8) {
        setError(password, "passwordError", "Пароль должен содержать минимум 8 символов.");
        valid = false;
    } else {
        setError(password, "passwordError", "");
    }

    if (repeat.value === "") {
        setError(repeat, "passwordRepeatError", "Повторите пароль.");
        valid = false;
    } else if (repeat.value !== password.value) {
        setError(repeat, "passwordRepeatError", "Пароли не совпадают.");
        valid = false;
    } else {
        setError(repeat, "passwordRepeatError", "");
    }

    if (valid) {
        message.textContent = "Аккаунт успешно зарегистрирован.";
    }
});

// 3. Повышенный уровень: вариант №16
document.getElementById("shopForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const form = this;
    const message = document.getElementById("shopMessage");
    message.textContent = "";

    let valid = true;

    const name = document.getElementById("shopName");
    const email = document.getElementById("shopEmail");
    const phone = document.getElementById("shopPhone");
    const address = document.getElementById("address");
    const product = document.getElementById("product");
    const quantity = document.getElementById("quantity");
    const agree = document.getElementById("shopAgree");

    if (name.value.trim() === "") {
        setError(name, "shopNameError", "Введите ФИО.");
        valid = false;
    } else {
        setError(name, "shopNameError", "");
    }

    if (email.value.trim() === "") {
        setError(email, "shopEmailError", "Введите e-mail.");
        valid = false;
    } else if (!email.validity.valid) {
        setError(email, "shopEmailError", "Введите корректный e-mail.");
        valid = false;
    } else {
        setError(email, "shopEmailError", "");
    }

    if (phone.value.trim() === "") {
        setError(phone, "shopPhoneError", "Введите номер телефона.");
        valid = false;
    } else if (!/^[+]?[0-9 ()-]{10,20}$/.test(phone.value.trim())) {
        setError(phone, "shopPhoneError", "Введите корректный номер телефона.");
        valid = false;
    } else {
        setError(phone, "shopPhoneError", "");
    }

    if (address.value.trim() === "") {
        setError(address, "addressError", "Введите адрес доставки.");
        valid = false;
    } else {
        setError(address, "addressError", "");
    }

    if (product.value === "") {
        setError(product, "productError", "Выберите товар.");
        valid = false;
    } else {
        setError(product, "productError", "");
    }

    if (quantity.value === "" || Number(quantity.value) <= 0) {
        setError(quantity, "quantityError", "Количество должно быть больше 0.");
        valid = false;
    } else {
        setError(quantity, "quantityError", "");
    }

    const delivery = document.querySelector('input[name="delivery"]:checked');
    const deliveryError = document.getElementById("deliveryError");
    if (!delivery) {
        deliveryError.textContent = "Выберите способ доставки.";
        valid = false;
    } else {
        deliveryError.textContent = "";
    }

    const payment = document.querySelector('input[name="payment"]:checked');
    const paymentError = document.getElementById("paymentError");
    if (!payment) {
        paymentError.textContent = "Выберите способ оплаты.";
        valid = false;
    } else {
        paymentError.textContent = "";
    }

    const agreeError = document.getElementById("shopAgreeError");
    if (!agree.checked) {
        agreeError.textContent = "Необходимо согласиться с правилами.";
        valid = false;
    } else {
        agreeError.textContent = "";
    }

    if (valid) {
        message.textContent = "Заказ успешно оформлен. Все данные прошли проверку.";
    }
});

// Дополнительная интерактивность: проверка отдельных полей при вводе.
document.querySelectorAll("input, select").forEach(field => {
    field.addEventListener("input", function() {
        if (this.value.trim() !== "") {
            this.classList.add("valid");
            this.classList.remove("invalid");
        }
    });

    field.addEventListener("change", function() {
        if (this.value !== "") {
            this.classList.add("valid");
            this.classList.remove("invalid");
        }
    });
});
