const loadBuddies = () => {
    fetch('https://randomuser.me/api/?results=5')
        .then(res => res.json())
        .then(data => displayBuddies(data));
}
loadBuddies();

const displayBuddies = data => {
    // object is not iterable;so we cann't use for-of loop on object.
    //data's property result is an array;so if we want to iterating step by step,we need to access array then use for of loop on array.because array is a iterable object.

    const buddies = data.results;
    //now buddies is an array and we can iterating by using for-of loop
    const buddieDiv = document.getElementById('buddies');
    for (const buddy of buddies) {
        const p = document.createElement('p');
        p.innerText = `Name: ${buddy.name.title} ${buddy.name.first} ${buddy.name.last}
        email: ${buddy.email}`;
        buddieDiv.appendChild(p);
    }
}