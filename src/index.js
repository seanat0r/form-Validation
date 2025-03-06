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
	eventListener(event) {
		event.preventDefault();
		this.#valiadtion();
	}
	#valiadtion() {
		console.log("in validation");
		console.log(this.#formElement.email.value);

		for (const [key, value] of Object.entries(this.#formElement)) {
			if (value instanceof HTMLInputElement) {
				console.log(value.value);
				if (value instanceof HTMLInputElement) {
					console.log(value.value);
				}
				if (
					value.validity.patternMismatch ||
					value.validity.valueMissing ||
					value.validity.tooShort
				) {
                    //* Validation Failed
					//* Give a custom Validity error message for each missmatch
					console.warn("Validation failed! At", key, value.value);
					console.log("patternMismatch: ", value.validity.patternMismatch);
					console.log("rangeUnderflow: ", value.validity.rangeUnderflow);
					console.log("valueMissing: ", value.validity.valueMissing);

					if (value.validity.valueMissing) {
						console.error("Error: INPUT IS REQUIRED!");
						value.setCustomValidity("This field is required to fill");
					} else if (value.validity.tooShort) {
						console.error("ERROR: INPUT IS TO SHORT!");
						value.setCustomValidity(
							"The lenght needs to be a minimum of 8 character"
						);
						value;
					} else if (value.validity.patternMismatch) {
						console.error(
							"ERROR: INPUT DOSEN'T MATCH WITH REGEX. value: ",
							value.value
						);
						value.setCustomValidity(
							"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character. Country can't have any Number."
						);
					}
					value.reportValidity();
					break;
				} else {
                    //* Validation succsefull
					console.log("%cValidation succesfull: " + key, "color: green;");
					value.setCustomValidity("");
				}
                //TODO: Passowrd überpüfen, ob es gleich ist.
			}
		}
	}
	procced() {
		this.#formElement.form.addEventListener(
			"submit",
			this.eventListener.bind(this)
		);
		this.#valiadtion();
	}
}
const formValidation = new FormValidation();
formValidation.procced();
