// Importing CSS
import "./styles/style.css";

class FormValidation {
	#formElement = {
		form: document.querySelector("#form"),
		email: document.querySelector("#email"),
		passwordMain: document.querySelector("#password1"),
		passwordCheck: document.querySelector("#passwordCheck"),
		country: document.querySelector("#country"),
		postalCode: document.querySelector("#postalCode"),
		submit: document.querySelector("#submit"),
	};
	#ValidationCheck = {
		email: false,
		passwordMain: false,
		passwordCheck: false,
		country: false,
		postalCode: false,
	};

	samePassword() {
		// Returns true if passwords match, false if not
		return (
			this.#formElement.passwordMain.value ===
			this.#formElement.passwordCheck.value
		);
	}

	#beforeSubmitEvent(event) {
		event.preventDefault();
		// Iterates over form elements and validates
		for (const [key, value] of Object.entries(this.#formElement)) {
			if (value instanceof HTMLInputElement) {
				this.#validation(value, key);
			}
		}
	}

	#beforeBlurEvent(event) {
		// Handles the blur event on form elements
		const value = event.target;
		const key = value.id;
		this.#validation(value, key);
	}

	#patternMismatch(value) {
		console.log(value);
		if (value.type === "email") {
			value.setCustomValidity("Email must contain @ and TLD");
			return;
		}
		if (value.type === "password") {
			value.setCustomValidity(
				"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character. Country can't have any Number."
			);
			return;
		}
		value.setCustomValidity("Input doesn't match with regex");
	}

	#validationFailed(value, key) {
		// Handles the failed validation case with custom error messages
		console.warn("Validation failed! At", key, value.value);
		console.log("patternMismatch: ", value.validity.patternMismatch);
		console.log("rangeUnderflow: ", value.validity.rangeUnderflow);
		console.log("valueMissing: ", value.validity.valueMissing);

		if (value.validity.valueMissing) {
			console.error("Error: INPUT IS REQUIRED!");
			value.setCustomValidity("This field is required to fill");
		} else if (value.validity.tooShort) {
			console.error("ERROR: INPUT IS TOO SHORT!");
			value.setCustomValidity(
				"The length needs to be a minimum of 8 characters"
			);
		} else if (value.validity.patternMismatch) {
			console.error(
				"ERROR: INPUT DOESN'T MATCH WITH REGEX. value: ",
				value.value
			);
			this.#patternMismatch(value);
		}

		value.reportValidity();
	}

	#validationSuccess(value, key) {
		// Handles the success case when validation is successful
		console.log("%cValidation successful: " + key, "color: green;");
		console.log("value: ", value, " key: ", key);
		if (this.#ValidationCheck.hasOwnProperty(key)) {
			this.#ValidationCheck[key] = true;
		}
		console.log(this.#ValidationCheck);
		value.setCustomValidity("");
	}

	#validationSecondStep() {
		// Handles the second step after all validations are passed
		console.log("All Validation Passed! Continue to second step!");
		if (!this.samePassword()) {
			console.log("Password is not same!");
			this.#formElement.passwordCheck.setCustomValidity(
				"Password is not same!"
			);
			this.#formElement.passwordCheck.reportValidity();
		} else {
			console.log("Password is same!");
		}
	}

	#validation(value, key) {
		// Main validation logic: checks for validity conditions
		console.log("in validation");

		if (
			value.validity.patternMismatch ||
			value.validity.valueMissing ||
			value.validity.tooShort
		) {
			// Validation failed
			this.#validationFailed(value, key);
		} else {
			// Validation successful
			this.#validationSuccess(value, key);
		}

		if (Object.values(this.#ValidationCheck).every((value) => value === true)) {
			// Trigger the second validation step if all fields pass
			this.#validationSecondStep();
		}
	}

	proceed() {
		// Initializes the event listener for the form submit
		this.#formElement.form.addEventListener(
			"submit",
			this.#beforeSubmitEvent.bind(this)
		);
		for (const [key, value] of Object.entries(this.#formElement)) {
			if (value instanceof HTMLInputElement) {
				value.addEventListener("blur", this.#beforeBlurEvent.bind(this));
			}
		}
	}
}

const formValidation = new FormValidation();
formValidation.proceed();
