username.onkeyup = () => {

    if(username.value.length > 0)
    {
        document.getElementById("err_user").innerHTML = ""
    }
    else
    {
        document.getElementById("err_user").innerHTML = "Username is required."
    }
}

password.onkeyup = () => {

    if(password.value.length > 0)
    {
        document.getElementById("err_pass").innerHTML = ""
    }
    else
    {
        document.getElementById("err_pass").innerHTML = "Password is required."
    }
}

login.onclick = async () => {
    
    const isEmpty = checkInputIfEmpty()
    const online = await checkOnlineStatus()

    if(!isEmpty)
    {
        if(online)
        {
            loggedMeIn()
        }
        else
        {
            alert("Your current connection is offline. Please connect to the internet now.")
        }
    }
    else
    {
        alert("Username and password are required.")
        if(password.value == "")
        {
            password.focus()
            document.getElementById("err_pass").innerHTML = "Password is required."
        }
        if(username.value == "")
        {
            username.focus()
            document.getElementById("err_user").innerHTML = "Username is required."
        }
    }
}

checkInputIfEmpty = () => {
    if(username.value == "" || password.value == "")
    {
        return true
    }
    else
    {
        return false
    }
}

loggedMeIn = () => {
    login.innerHTML = "<i class='fas fa-spinner fa-spin me-1'></i> Signing in ..."
    login.disabled = true
    $.ajax({
        type: 'POST',
        url: url + '/login.php',
        data: {
            username: $('input[name="username"]').val(),
            password: $('input[name="password"]').val(),
            login_attempt: 1
        },
        success: function(response){
            var json_obj = JSON.parse(response)
            console.log(json_obj)
            if(json_obj.con == true)
            {
                if(json_obj.success == true)
                {
                    syncIn(json_obj)
                }
                else{
                    login.innerHTML = "SIGN IN"
                    login.disabled = false

                    if(json_obj.exists == 0)
                    {
                        $('.err_all').text(json_obj.all_msg)
                        $('.err_pass').text("")
                        $('.err_user').text("")
                        alert(json_obj.all_msg)
                    }
                    else if(json_obj.exists == null)
                    {
                        $('.err_user').text(json_obj.username)
                        $('.err_pass').text(json_obj.password)
                        alert(json_obj.username + ", " + json_obj.password)
                    }
                }
            }
            else
            {
                login.innerHTML = "SIGN IN"
                login.disabled = false
                alert("Unable to connect to the server. Please check your connection now to continue.")
            }
        }
    })
}