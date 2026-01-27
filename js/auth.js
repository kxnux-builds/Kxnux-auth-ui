document.addEventListener('DOMContentLoaded', () => {
    const api = new MockBackend();

    // Selectors
    const forms = document.querySelectorAll('.needs-validation');
    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirmPassword');
    const emailInput = document.getElementById('email');
    const strengthBar = document.getElementById('strengthBar');

    // 1. Toggle Password Visibility
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const input = e.currentTarget.previousElementSibling.querySelector('input');
            const icon = e.currentTarget.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('bi-eye', 'bi-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('bi-eye-slash', 'bi-eye');
            }
        });
    });

    // 2. Password Strength Meter (Registration Only)
    if (strengthBar && passwordInput) {
        passwordInput.addEventListener('input', () => {
            const val = passwordInput.value;
            let strength = 0;

            if (val.length >= 8) strength += 25;
            if (val.match(/[A-Z]/)) strength += 25;
            if (val.match(/[0-9]/)) strength += 25;
            if (val.match(/[^A-Za-z0-9]/)) strength += 25;

            strengthBar.style.width = `${strength}%`;

            if (strength <= 25) strengthBar.style.backgroundColor = '#ef4444'; // Red
            else if (strength <= 50) strengthBar.style.backgroundColor = '#f59e0b'; // Orange
            else if (strength <= 75) strengthBar.style.backgroundColor = '#eab308'; // Yellow
            else strengthBar.style.backgroundColor = '#10b981'; // Green
        });
    }

    // 3. AJAX Email Availability Check
    if (emailInput && document.title.includes("Create Account")) {
        let debounceTimer;
        const feedbackDiv = document.getElementById('emailFeedback');

        emailInput.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            emailInput.classList.remove('is-valid', 'is-invalid');
            feedbackDiv.textContent = "";

            debounceTimer = setTimeout(async () => {
                if (emailInput.value.includes('@') && emailInput.value.length > 5) {
                    feedbackDiv.style.color = '#64748b';
                    feedbackDiv.textContent = "Checking availability...";

                    const response = await api.checkEmailAvailability(emailInput.value);

                    if (response.available) {
                        emailInput.classList.add('is-valid');
                        feedbackDiv.textContent = "Email is available.";
                        feedbackDiv.className = "form-text text-success small fw-bold";
                    } else {
                        emailInput.classList.add('is-invalid');
                        feedbackDiv.textContent = "Account already exists.";
                        feedbackDiv.className = "invalid-feedback d-block";
                    }
                }
            }, 600);
        });
    }

    // 4. Form Submission
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const submitBtn = form.querySelector('button[type="submit"]');
            const alertBox = document.getElementById('formAlert');
            const alertMessage = document.getElementById('alertMessage') || alertBox;

            // Clear previous errors
            alertBox.classList.add('d-none');
            form.querySelectorAll('.shake-animation').forEach(el => el.classList.remove('shake-animation'));

            // Match Passwords Check
            if (confirmInput && passwordInput.value !== confirmInput.value) {
                confirmInput.classList.add('is-invalid', 'shake-animation');
                return;
            }

            if (form.checkValidity()) {
                // UI Loading State
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Processing...`;

                try {
                    if (form.id === 'loginForm') {
                        await api.login(emailInput.value, passwordInput.value);

                        // Success Transition
                        submitBtn.className = "btn btn-success w-100 shadow-sm mb-3";
                        submitBtn.innerHTML = `<i class="bi bi-check-circle me-2"></i>Success`;

                        setTimeout(() => {
                            window.location.href = '#dashboard'; // Simulate redirect
                            alert("Welcome back! Redirecting to Dashboard...");
                        }, 1000);

                    } else {
                        // Registration Simulation
                        await new Promise(r => setTimeout(r, 1500));
                        alert("Account Created! Please Sign In.");
                        window.location.href = 'index.html';
                    }
                } catch (error) {
                    // Error Handling
                    alertMessage.textContent = error.error;
                    alertBox.classList.remove('d-none');

                    // Add shake effect to inputs
                    emailInput.classList.add('shake-animation');
                    passwordInput.classList.add('shake-animation');

                    // Reset Button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
            } else {
                form.classList.add('was-validated');
            }
        });
    });
});