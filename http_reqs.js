const http = new Library();
function ShowResponse(responseData, isDeletion) {
    let html = "<ul style='list-style:none'>";

    if (Array.isArray(responseData)) {
        responseData.forEach(data => {
            html += processArrayData(data);
        });
    } else {
        html += processSingleData(responseData);
    }

    if (isDeletion === true) {
        html += `<li>User: ${responseData} Successfully Deleted</li>`;
    }

    document.querySelector("#response").innerHTML = html;
}

function processArrayData(data) {
    let html = "";

    if (data.title) {
        html += `<li style=' text-align:left'> |(^_^)|>> Title: <strong>${data.title}</strong> - <br> <italic>Body:</italic> ${data.body}</li>`;
    } else if (data.name && data.username) {
        html += `<li style= 'text-align: left'>User ${data.id} - ${data.name} - ${data.username}</li>`;
    } else {
        html += `<li>User ${data} - ${data.body}</li>`;
    }

    return html;
}

function processSingleData(data) {
    let html = "";

    if (data.title) {
        html += `<li style=' text-align:left'> |(^_^)|>> Title: <strong>${data.title}</strong> - <br> <italic>Body: </italic> ${data.body}</li>`;
    } else if (data.name && data.username) {
        html += `<li style= 'text-align: left'>User ${data.id} - ${data.name} - ${data.username}</li>`;
    } else {
        html += `<li>User ${data} - ${data.body}</li>`;
    }

    return html;
}

function ShowError(err) {
    // Log the error for debugging
    console.error("Error:", err);
    html = `<p>${err}</p>`;
    document.querySelector("#response").innerHTML = html;
}

async function sendRequest(reqType, targetURL, userData) {
    let data;
    switch (reqType) {
        case "get":
            console.log(userData)
            try {
                let response = await http.Get(targetURL);
                ShowResponse(await response, false);
            }
            catch (exception) {
                ShowError(exception);
            }
            break;
        case "post":
            data = {
                name: userData[0].name,
                username: userData[1].username,
                email: userData[2].email,
            };
            try {
                let response = await http.Post(targetURL, data);
                ShowResponse(await response, false);
            }
            catch (exception) {
                ShowError(exception);
            }
            break;
        case "put":
            data = {
                id: userData[3].id,
                name: userData[0].name,
            };
            try {
                let response = await http.Put(targetURL, data);
                ShowResponse(await response, false);
            }
            catch (exception) {
                ShowError(exception);
            }
            break;
        case "delete":
            data = {
                id: userData[4].id,
            }
            try {
                
                let response = await http.Delete(targetURL, data);
                ShowResponse(await response, true);
            }
            catch (exception) {
                ShowError(exception);
            }
            break;
        case "patch":
            data = {
                Newname: userData[0].name,
                Newusername: userData[1].username,
                Newemail: userData[2].email,
            }
            try{
                
            let response = await http.patch(targetURL, data);
            ShowResponse(response, false);
            }
            catch(exception){
                ShowError(exception);
            }
            break;
        }
}

document.querySelector("#SendReq").addEventListener("click", (e) => {
    const radioButtons = document.querySelectorAll('input[name="HTTPtype"'); 
    const userData = document.querySelectorAll('input[class="UserData"'); 
    const route = document.querySelector("#route").value; 
    let reqType;
    for (const radioButton of radioButtons) { 
        if (radioButton.checked) {
            reqType = radioButton.value;
            break;
        }
    }
    sendRequest(reqType,route, userData); 
    
    e.preventDefault();
});