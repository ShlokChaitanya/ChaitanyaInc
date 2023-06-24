const firebaseConfig = {
    apiKey:  process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKE,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const analytics = firebase.analytics();
const conta = document.getElementById('email');
const phone = document.getElementById('Phone');
const mess = document.getElementById('message');
conta.onkeyup = function () { EBox() };
mess.onkeyup = function () { MBox() };
phone.onkeyup = function () { NBox() };

const EBox = () => {
    if (conta.value != "") { if (document.querySelector(".error").style.display = "unset") { document.querySelector(".error").style.display = "none" } }
    else { document.querySelector(".error").style.display = "unset" }
};

const NBox = () => {
    if (phone.value != "") { if (document.querySelector(".rr").style.display = "unset") { document.querySelector(".rr").style.display = "none" } }
    else { document.querySelector(".rr").style.display = "unset" }
};

const MBox = () => {
    if (mess.value != "") { if (document.querySelector(".er").style.display = "unset") { document.querySelector(".er").style.display = "none" } }
    else { document.querySelector(".er").style.display = "unset" }
};

document.getElementById("btn").addEventListener('click', () => {
    const date = new Date();
    const months = ["January", "Febraury", "March", "April", "May", "June", "July", "August", "Septrmber", "October", "November", "December"];

    if (conta.value != "" && phone.value != "" && mess.value != "") {
        db.collection("Payment").doc(phone.value).set({
            phone: phone.value,
            email: conta.value,
            message: mess.value,
            messageat: `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
        })
            .catch((err) => {
                console.log(err);
            })
    } else {
        EBox(); NBox(); MBox();
    }
});