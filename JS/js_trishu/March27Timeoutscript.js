// // function Register(){
// //     setTimeout( () => {
// //         console.log('Registering user...');
// //         sendWelcomeEmail(); //this is hard coding to show the usage of callback func.
// //     }, 2000); 
// // }
// function Register(callback){
//     setTimeout( () => {
//         console.log('Registering user...');
//         callback();
//     }, 2000); 
// }

// function sendWelcomeEmail(callback){
//     setTimeout(() => {
//         console.log('Sending welcome email...');
//         callback();
//     }, 8000);
// }

// function Login(callback){
//     setTimeout(() => {
//         console.log('Logging in...');
//         callback();
//     }, 12000);
// }

// function getUserData(callback){
//     setTimeout(() => {
//         console.log('Getting user data...');
//         callback();
//     }, 6000);
// }

// function displayUserData(){
//     setTimeout(() => {
//         console.log('Displaying user data...');
//     }, 8000);
// }

// console.log('other application work');

// //This is to show the working of asynchronous code in JavaScript. The functions will be executed in the order they are called, but the asynchronous functions will not block the execution of the other functions. The output will be:
// // other application work
// // Register end

// Register(() => {
//     sendWelcomeEmail(() => {
//         Login(() => {
//             getUserData(() => {
//                 displayUserData();
//             });
//         });
//     });
// });



function Register(){
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Registering user...');
            resolve();
        }, 2000);
    });
}

function sendWelcomeEmail(){
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Sending welcome email...');
            resolve();
        }, 8000);
    });
}

function Login(){
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Logging in...');
            resolve();
        }, 12000);
    });
}

function getUserData(){
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Getting user data...');
            resolve();
        }, 6000);
    });
}

function displayUserData(){
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Displaying user data...');
            resolve();
        }, 8000);
    });
}

console.log('other application work');

// Promise chaining 👇
Register()
    .then(() => sendWelcomeEmail())
    .then(() => Login())
    .then(() => getUserData())
    .then(() => displayUserData())
    .catch((err) => console.log(err));