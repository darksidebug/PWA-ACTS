let url = $('#form-login').attr('data-route')

$(document).on('click', '#login', function(e){
    e.preventDefault()
    $.ajax({
        type: 'POST',
        url: url,
        data: {
            username: $('input[name="username"]').val(),
            password: $('input[name="password"]').val(),
            login_attempt: 1
        },
        success: function(response){
            var json_obj = JSON.parse(response)
            console.log(json_obj)
            if(json_obj.con == false)
            {
                $('body').html(json_obj.con_error)
            }
            else if(json_obj.success == true)
            {
                if(json_obj.exists > 0)
                {
                    window.location.href = '/views/pages/qr-scan.php';
                }
                else
                {
                    Swal.fire('Invalid Credential!', "Unknown user or user doesn't exists.", 'error')
                }
            }
            else{
                $('.err_user').text(json_obj.username)
                $('.err_pass').text(json_obj.password)
            }
        }
    })
})