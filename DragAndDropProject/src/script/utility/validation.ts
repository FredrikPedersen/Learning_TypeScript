namespace App {

    export interface IValidatable {
        value: string | number;
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        minValue?: number;
        maxValue?: number;
    } // IValidatable

    export function validate(validatables: IValidatable[]) : boolean {
        let isValid = true;

        validatables.forEach(validatable => {
            if(validatable.required) {
                isValid = isValid && validatable.value.toString().trim().length !== 0;
            }

            if (validatable.minLength != null && typeof validatable.value === "string") {
                isValid = isValid && validatable.value.trim().length >= validatable.minLength;
            }

            if (validatable.maxLength != null && typeof validatable.value === "string") {
                isValid = isValid && validatable.value.trim().length <= validatable.maxLength;
            }

            if (validatable.minValue != null && typeof validatable.value === "number") {
                isValid = isValid && validatable.value >= validatable.minValue;
            }

            if (validatable.maxValue != null && typeof validatable.value === "number") {
                isValid = isValid && validatable.value <= validatable.maxValue;
            }
        });

        return isValid;
    } // function validate
} // namespace App