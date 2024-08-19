function person(params) {
    if (new.target === undefined) {
        console.log('new.target is undefined');

    } else if (new.target === person) {
        console.log('new.target is person');
    }
}

person();
new person();