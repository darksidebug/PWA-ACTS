<?php session_start() ?>
<?php include '../../config/checker/login-checker.php' ?>
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
    <link rel="manifest" href="../../manifest.json">
</head>
<body>
<div class="container-fluid px-0 px-sm-2 wrapper" id="main">
    <?php include '../templates/nav.php' ?>
    <div class="container qr-scan" id="qr-scan">
        <div class="row">
            <div class="col-lg-2 col-md-3 d-none d-sm-none d-md-block d-lg-block pt-2">
                <a href="/views/pages/qr-scan.php" class="btn btn-default w-100 mb-2 shadow-sm"><i data-feather="grid" class="me-1 pb-1" width="20"></i> SCAN QR</a></br>
                <a href="" class="btn btn-default w-100 mb-2 shadow-sm"><i data-feather="align-left" class="me-1 pb-1" width="20"></i> SCAN LOGS</a></br>
                <a href="" class="btn btn-default w-100 mb-2 shadow-sm"><i data-feather="repeat" class="me-1 pb-1" width="20"></i> SYNC DATA</a>
                <a href="" class="btn btn-default w-100 mb-2 shadow-sm"><i data-feather="key" class="me-1 pb-1" width="20"></i> RESET PASS</a>
                <a href="/config/scripts/logout.php" class="btn btn-default w-100 mb-2 shadow-sm"><i data-feather="log-out" class="me-1 pb-1" width="20"></i> SIGN-OUT</a>
            </div>
            <div class="col-lg-6 col-md-9">
                <div class="card qr-card shadow border pt-3 px-3 pb-3 pb-sm-4 pb-md-5">
                    <h5 class="txt">ACTS</h5>
                    <div class="text-center d-none d-sm-none d-md-block d-lg-block ">
                        <h4>Automated Contact Tracing System</h4>
                    </div>
                    <button onclick="openNav()" class="btn-menu bg-white d-block d-sm-block d-md-none d-lg-none py-2"><i data-feather="align-right" class="me-1 pb-1" width="20"></i> MENU</button>
                    <div class="row">
                        <div class="col-md-8 col-sm-8 col-12 offset-md-2 offset-sm-2">
                            <div class="px-2 mt-4 mb-4 pb-2">
                                <center>
                                    <div class="switch-holder pt-2 border">
                                        <div class="switch-label">
                                            <strong><span>SCAN MODE</span></strong>
                                        </div>
                                        <div class="switch-toggle">
                                            <input type="checkbox" id="checkbox" checked>
                                            <label for="checkbox"></label>
                                        </div>
                                    </div>
                                    <h5 class="h4"><strong><span id="outputData">&nbsp;</span></strong></h5>
                                    <div class="card pt-1 px-1 pb-1 mb-1" id="card">
                                        <div class="qr mb-1" id="qr" style="background-image:url('../../assets/img/qr-code.png')"></div>
                                        <canvas hidden="" id="qr-canvas"></canvas>
                                        <!-- <div id="qrcode" style="height: 250px;"></div> -->
                                    </div>
                                    <button class="btn btn-primary btn-scan mt-4 w-sm-50 d-md-inline" id="btn-scan-qr"><i data-feather="grid" class="me-1 pb-1" width="20"></i> SCAN QR-CODE&nbsp;</button>
                                    <button class="btn btn-primary btn-stop mt-4 w-sm-50 d-md-inline" id="stop_Scan" hidden><i data-feather="x" class="me-1 pb-1" width="20"></i>STOP SCANNING</button>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 d-none d-sm-none d-md-none d-lg-block">
                <div class="logs pt-2">
                    <div class="card w-100 pt-2 ps-3 pe-1 pb-1 mb-2 shadow-sm bg-white">
                        <img class="pin" src="../../assets/img/pin.png" alt="">
                        <h6 class="ms-3">Nobegin A. Masob timed in at 09:00am</h6>
                    </div>
                    <div class="card w-100 pt-2 ps-3 pe-1 pb-1 mb-2 shadow-sm bg-white">
                        <img class="pin" src="../../assets/img/pin.png" alt="">
                        <h6 class="ms-3">Benigno E. Ambus Jr. timed in at 09:08am</h6>
                    </div>
                    <div class="card w-100 pt-2 ps-3 pe-1 pb-1 mb-2 shadow-sm bg-white">
                        <img class="pin" src="../../assets/img/pin.png" alt="">
                        <h6 class="ms-3">Nhobey Areten Masub timed in at 09:15am</h6>
                    </div>
                </div>
            </div>
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
<script type='text/javascript' src="//wurfl.io/wurfl.js"></script>

<script src="../../assets/js/bootstrap.bundle.min.js"></script>
<script src="../../assets/js/jquery-3.5.1.js"></script>
<script src="../../assets/js/moment.min.js"></script>
<script src="../../assets/js/bootstrap.min.js"></script>
<script src="../../assets/js/jquery.easing.min.js"></script>
<script src="../../assets/js/sweetalert.min.js"></script>
<script src="../../assets/js/qr_packed.js" defer></script>
<script src="../../assets/js/menu-animation.js" defer></script>
<script src="../../assets/js/ajax/qr-scan.js"></script>
<script rel='prefetch prerender' src="../../assets/js/feather.min.js"></script>
<script>
    feather.replace()
</script>
<script>
    // if ("serviceWorker" in navigator) {
    // navigator.serviceWorker
    //     .register("../../sw.js")
    //     .then(function (registration) {
    //     console.log("success load");
    //     })
    //     .catch(function (err) {
    //     console.log(err);
    //     });
    // }
</script>
</body>
</html>