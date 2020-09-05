const combine = (
    value1: number | string,
    value2: number | string,
    resultConversion: "as-number" | "as-text"
): number | string => {
    if (typeof value1 == "number" && typeof value2 == "number" || resultConversion === "as-number") {
        return +value1 + +value2;
    } else {
        return value1.toString() + " " + value2.toString();
    }
};

const combinedAges = combine(30, 26, "as-number");
console.log(combinedAges);

const combinedStringAges = combine("30", "26", "as-number");
console.log(combinedStringAges);

const combinedNames = combine("Fredrik", "Thomas", "as-text");
console.log(combinedNames);