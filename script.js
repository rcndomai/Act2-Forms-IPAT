document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('studentForm');
    const summary = document.getElementById('summary');

    function setInvalidState(field, invalid) {
        if (!field) return;

        if (invalid) {
            field.classList.add('invalid');
        } else {
            field.classList.remove('invalid');
        }
    }

    function validateRequired(field, message) {
        if (!field || field.value.trim() === '') {
            setInvalidState(field, true);
            return false;
        }

        setInvalidState(field, false);
        return true;
    }

    form.addEventListener('reset', function () {
        setTimeout(function () {
            document.querySelectorAll('input, select, textarea').forEach(function (field) {
                setInvalidState(field, false);
            });

            summary.classList.add('hidden');
        }, 0);
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        let isValid = true;
        const firstName = document.getElementById('firstname');
        const lastName = document.getElementById('lastname');
        const studentId = document.getElementById('studentId');
        const dob = document.getElementById('dob');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const address = document.getElementById('address');
        const course = document.getElementById('course');
        const yearLevel = document.getElementById('yearLevel');
        const section = document.getElementById('section');
        const schoolYear = document.getElementById('schoolYear');
        const username = document.getElementById('username');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const genderOptions = document.querySelectorAll('input[name="gender"]');
        const selectedGender = document.querySelector('input[name="gender"]:checked');

        if (!validateRequired(firstName)) isValid = false;
        if (!validateRequired(lastName)) isValid = false;
        if (!validateRequired(studentId)) isValid = false;
        if (!validateRequired(dob)) isValid = false;
        if (!validateRequired(email)) isValid = false;
        if (!validateRequired(phone)) isValid = false;
        if (!validateRequired(address)) isValid = false;
        if (!validateRequired(course)) isValid = false;
        if (!validateRequired(yearLevel)) isValid = false;
        if (!validateRequired(section)) isValid = false;
        if (!validateRequired(schoolYear)) isValid = false;
        if (!validateRequired(username)) isValid = false;
        if (!validateRequired(password)) isValid = false;
        if (!validateRequired(confirmPassword)) isValid = false;

        genderOptions.forEach(function (radio) {
            setInvalidState(radio, false);
        });

        if (!selectedGender) {
            genderOptions.forEach(function (radio) {
                radio.classList.add('invalid');
            });
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && email.value.trim() && !emailPattern.test(email.value.trim())) {
            setInvalidState(email, true);
            isValid = false;
        }

        if (phone && phone.value.trim() && !/^\d{11}$/.test(phone.value.trim())) {
            setInvalidState(phone, true);
            isValid = false;
        }

        if (password && confirmPassword && password.value.trim() && confirmPassword.value.trim()) {
            if (password.value.trim() !== confirmPassword.value.trim()) {
                setInvalidState(password, true);
                setInvalidState(confirmPassword, true);
                isValid = false;
            }
        }

        if (!isValid) {
            alert('Please correct the highlighted fields before submitting.');
            return;
        }

        const middleName = document.getElementById('middlename').value.trim();
        const fullName = `${firstName.value.trim()} ${middleName ? middleName + ' ' : ''}${lastName.value.trim()}`.trim();
        const genderValue = selectedGender ? selectedGender.value : '';

        document.getElementById('summaryName').textContent = fullName;
        document.getElementById('summaryStudentId').textContent = studentId.value.trim();
        document.getElementById('summaryDob').textContent = dob.value;
        document.getElementById('summaryGender').textContent = genderValue;
        document.getElementById('summaryEmail').textContent = email.value.trim();
        document.getElementById('summaryPhone').textContent = phone.value.trim();
        document.getElementById('summaryAddress').textContent = address.value.trim();
        document.getElementById('summaryCourse').textContent = course.value;
        document.getElementById('summaryYear').textContent = yearLevel.value;
        document.getElementById('summarySection').textContent = section.value;
        document.getElementById('summarySchoolYear').textContent = schoolYear.value.trim();
        document.getElementById('summaryUsername').textContent = username.value.trim();

        summary.classList.remove('hidden');
        alert('Registration successful!');
    });
});
