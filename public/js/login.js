


let userList = (response) => {
    let users = response.data;
    let isCorrect = false;
    for (let user of users) {
       
        if (user.username === loginUser.username && user.password === loginUser.password && !isCorrect) {
           isCorrect = true;
           localStorage.setItem('logined', user.username);
           localStorage.setItem('color', user.color);
        }
        console.log(user)
    }

    if (isCorrect) {
        setTimeout( () => {
            window.location.href = "http://localhost:5000/logined";
        }, 1000)
        modalMessage("Success", 'alert-success', 'You login succesfully!')
    }else {
        modalMessage('ERROR', 'alert-danger', users[0].error)
    }
}

let modalMessage = (typeMessage, bgMessage, sms) => {
    const alerts = document.querySelector('.sms');
    if(alerts !== null) {
        alerts.remove();
    }

    const alertModel = document.createElement('div');
    alertModel.classList.add('alert');
    alertModel.classList.add(bgMessage);
    alertModel.classList.add('sms');
    const types = document.createElement('strong');
    types.textContent = typeMessage + " : ";
    const message = document.createElement('span');
    message.textContent = sms;

    alertModel.appendChild(types);
    alertModel.appendChild(message)

    document.querySelector('.col-6').appendChild(alertModel)
}

let login = () => {
    const userURL = rootEndPoint + "users";
    const username = document.querySelector('#user').value;
    const password = document.querySelector('#pwd').value;
    let user = {
        username: username,
        password: password
    }
    loginUser = user;
    axios
    .post(userURL, user)
    .then(userList);

}

let loginUser = {};
const rootEndPoint = "http://localhost:5000/";
const btnLogin = document.querySelector('#btn-login');
btnLogin.addEventListener('click', login);

