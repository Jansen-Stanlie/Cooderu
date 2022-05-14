// console.log("hello Jansen");

var cars = ["BMW", "Volvo", "Mini"];
var x;

cars.forEach((item) => {
	console.log(item);
});

var person = { fname: "john", lname: "Doe", age: 25 };
console.log(person.fname);
console.log(person["fname"]);

// var x;
for (let x in person) {
	console.log(`${x} = ${person[x]}`);
}

let xs = 1;
while (xs < 10) {
	console.log(xs);
	xs++;
}

do {
	console.log(xs);
	xs++;
} while (xs < 10);
let text = "Hello world, welcome to the universe.";
let result = text.includes("world");
console.log(result);
