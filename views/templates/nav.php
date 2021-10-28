<div id="mySidenav" class="sidenav">
    <div class="m-4 my-0 user">
        <div class="d-flex justify-content-start align-item-center">
            <div class="img-logo bg-light mb-3 mt-1 d-lg-none" align="center">
                <img class="img" src="../../assets/img/man.png" alt="user">
            </div>
            <div class="user d-lg-none ms-3">
                <h6 class="mt-3 mb-0 text-white"><?= isset($_SESSION['name']) ? strtoupper($_SESSION['name']) : '' ?></h6>
                <small class="text-light">user : <?= isset($_SESSION['user']) ? $_SESSION['user'] : '' ?></small>
            </div>
        </div>
    </div>
    <button class="border-0 closebtn" onclick="closeNav()">&times;</button>
    <div class="mx-2 mt-3 menu-list-item">
        <a href="/views/pages/qr-scan.php" class="d-block pt-3"><i data-feather="grid" class="me-1 pb-1" width="20"></i> Scan QR Code</a>
        <a href="" class="d-block pt-3"><i data-feather="repeat" class="me-1 pb-1" width="20"></i> Synchronize Data</a>
        <a href="/config/scripts/logout.php" class="d-block pt-3"><i data-feather="log-out" class="me-1 pb-1" width="20"></i> Sign-Out</a>
    </div>
    <small class="float-bottom mx-3 ps-2">Developed by: Benigno E. Ambus Jr.</small>
</div>