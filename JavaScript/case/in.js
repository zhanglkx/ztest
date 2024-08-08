const person = {
    name: 'John',
    age: 30,
    city: 'New York'
};

if (30 in person) {
    console.log('The person object has a property called age.');
} else {
    console.log('The person object does not have a property called age.');

}
