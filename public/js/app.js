let messageInfo = (username, sms, color, B, I, U) => {
    const ctrlMessage = document.createElement('div');
    ctrlMessage.classList.add('alert');
    ctrlMessage.classList.add(color);

    const userText = document.createElement('strong');
    const smsText = document.createElement('span');
    if (B !== "") smsText.classList.add(B);
    if (I !== "") smsText.classList.add(I);
    if (U !== "") smsText.classList.add(U);
    
    userText.textContent = username + " : ";
    smsText.textContent = sms;
    ctrlMessage.appendChild(userText);
    ctrlMessage.appendChild(smsText);

    cardBody.appendChild(ctrlMessage)
}


let showMessage = (response) => {
    let comments = response.data;
    const controlSMS = document.querySelectorAll('.alert');
    for(let ctrl of controlSMS) ctrl.remove();

    for (let comment of comments) {
        messageInfo(comment.username, comment.message, comment.color, comment.b, comment.i, comment.u)
    }
}

let receiveMessage = () => {
    const userURL = rootEndPoint + "comments";
    axios
    .get(userURL)
    .then(showMessage);
}

let sendMessage = (e) => {
    const userURL = rootEndPoint + "comments";
    const message = document.querySelector('#comment').value;

    let user = localStorage.getItem('logined');
    let color = localStorage.getItem('color')
   
    if (user === null) {
        user = "Unknown";
    }
    if (color === null) {
        color = "alert-warning";
    }
    let body = {
        username: user,
        message: message,
        color: color,
        b: fonts.b,
        i: fonts.i,
        u: fonts.u
    }
    axios
    .post(userURL, body)
    .then(showMessage);

    document.querySelector('#comment').value = "";
    btnComment.setAttribute('disabled', '')
}

document.addEventListener('keyup', (e) => {
    let comment = document.querySelector('#comment').value;
    if (comment !== "") {
        btnComment.removeAttribute('disabled');
        emoji();
    }else {
        btnComment.setAttribute('disabled', '')
    }

})

let showEmoji = (res) => {
    let emoji = res.data;
    console.log(emoji);
}

let emoji =()=> {
    const URL = "https://dy-konpa.herokuapp.com/emoji";
    axios.get(URL).then(showEmoji);
}

let getTextStyle = (e) => {
    const bolder = document.querySelector('#bolder');
    const italic = document.querySelector('#italic');
    const underline = document.querySelector('#underline');
    
    if (e.target.id === "bolder") {
        bolder.classList.toggle('activer');
      
    }
    if (e.target.id === "italic") {
        italic.classList.toggle('activer');
        
    }
    if (e.target.id === "underline") {
        underline.classList.toggle('activer');
      
    }
   
    if (e.target.id === "bolder" && e.target.className === "input-group-text activer") {
        b = bolder.textContent.toLowerCase();
    }
     if (e.target.className === "input-group-text" && e.target.id === "bolder") {
        b = "";
    }
    if (e.target.id === "italic" && e.target.className === "input-group-text activer") {
        i = italic.textContent.toLowerCase();
    }
     if (e.target.className === "input-group-text" && e.target.id === "italic")  {
        i = "";
    }
    if (e.target.id === "underline" && e.target.className === "input-group-text activer") {
        u = underline.textContent.toLowerCase();
    }
     if (e.target.className === "input-group-text" && e.target.id === "underline") {
        u = "";
    }

    fonts = { b: b, i: i, u: u}
 
}

const rootEndPoint = "https://dy-konpa.herokuapp.com/";
const cardBody = document.querySelector('.card-body');
const btnComment = document.querySelector('#btn-comment');
btnComment.addEventListener('click', sendMessage);

const textStyle = document.querySelector('#text-style');
textStyle.addEventListener('click', getTextStyle);

let fonts = {}
let b = "";
let i = "";
let u = "";

// get message
setInterval(receiveMessage, 1000)