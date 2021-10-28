
<?php session_start() ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Automated Contact Tracing</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet">

    <link rel="stylesheet" href="../../assets/css/custom.css?v=1.0">
    <link rel="stylesheet" href="../../assets/css/bootstrap.min.css">
    <link rel="manifest" href="manifest.json">
    
</head>
<body>
    <div class="container login">
        <div class="row">
            <div class="col-lg-4 col-md-6 offset-lg-4 offset-md-3">
                <form action="#" data-route="../../config/scripts/login.php" method="post" id="form-login" class="pb-sm-4">
                    <div class="card shadow border pt-3 px-3 pb-4 pb-md-2">
                        <h5 class="txt">ACTS</h5>
                        <div class="table-responsive mb-1">
                            <table class="table">
                                <tr>
                                    <td class="border-0" align="center">
                                        <div class="img-logo bg-light mb-3 mt-1" align="center">
                                            <img class="img" src="../../assets/img/man.png" alt="user">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="border-0">
                                        USERNAME
                                        <div class="form-control d-flex justify-content-start align-item-center rounded-sm input-holder mt-2">
                                            <i data-feather="user" class="me-3 mt-2" width="20"></i>
                                            <input type="text" class="w-100 border-0 rounded-0 py-3" placeholder="Enter username" name="username">
                                        </div>
                                        <small class="text-danger err_user"></small>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="border-0">
                                        PASSWORD
                                        <div class="form-control d-flex justify-content-start align-item-center rounded-sm input-holder mt-2">
                                            <i data-feather="key" class="me-3 mt-2" width="20"></i>
                                            <input type="password" class="w-100 border-0 rounded-0" placeholder="Enter password" name="password">
                                        </div>
                                        <small class="text-danger err_pass"></small>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="border-0 pt-3 pb-sm-5 pb-md-0" align="center">
                                        <button type="button" class="btn btn-primary rounded-sm login" name="login" id="login"><i data-feather="unlock" class="me-1 pb-1" width="20"></i> SIGN-IN</button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.1/moment.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@10"></script>
    <script src="https://rawgit.com/sitepoint-editors/jsqrcode/master/src/qr_packed.js"></script>

    <script src="assets/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/jquery-3.5.1.js"></script>
    <script src="assets/js/moment.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/jquery.easing.min.js"></script>
    <script src="assets/js/sweetalert.min.js"></script>
    <script src="assets/js/qr_packed.js" defer></script>
    <script src="assets/js/ajax/login.js"></script>
    <script rel='prefetch prerender' src="../../assets/js/feather.min.js"></script>
    <script>
        feather.replace()
    </script>
    <script>
    //   if ("serviceWorker" in navigator) {
    //     navigator.serviceWorker
    //       .register("sw.js")
    //       .then(function (registration) {
    //         console.log("success load");
    //       })
    //       .catch(function (err) {
    //         console.log(err);
    //       });
    //    }
    </script>
</body>
</html>