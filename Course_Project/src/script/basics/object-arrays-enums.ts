enum Role {
    ADMIN,
    READ_ONLY,
    AUTHOR
}

const person = {
    name: "Fredrik",
    age: 25,
    hobbies: ["Sports", "Cooking"],
    role: Role.ADMIN
};

let favoriteActivities: string[];
favoriteActivities = ["Video Games", "Gym"];

person.hobbies.forEach(hobby => {
   console.log(hobby.toUpperCase());
});


if (person.role == Role.ADMIN) {
    console.log("HE IS AN ADMIN")
}