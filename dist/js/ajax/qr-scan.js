const qrcode1 = window.qrcode;

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrcodes = document.getElementById("qrcode");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");
const qr = document.getElementById("qr")
const card = document.getElementById("card")
const stopScan = document.getElementById("stop_Scan")
const txt = document.getElementById("txt")

let scanning = false;

qrcode1.callback = res => {
    if (res) {

        scanQR(res)

        scanning = false;
        
        video.srcObject.getTracks().forEach(track => {
            track.stop();
        });

        qr.hidden = false;
        canvasElement.hidden = true;
        btnScanQR.hidden = false;
        stopScan.hidden = false;
    }
};

btnScanQR.onclick = () => {

    navigator.mediaDevices
        .getUserMedia({
            video: {
                facingMode: "environment"
            }
        })
        .then(function (stream) {
            qr.hidden = true
            scanning = true;

            btnScanQR.hidden = false;
            canvasElement.hidden = false;
            stopScan.hidden = false;

            video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
            video.srcObject = stream;
            video.play();
            tick();
            scan();
        });
};

stopScan.onclick = () => {
    scanning = false;

    video.srcObject.getTracks().forEach(track => {
        track.stop();
    });

    canvasElement.hidden = true;
    qr.hidden = false;
    btnScanQR.hidden = false;
    stopScan.hidden = false;
}

function tick() {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

    scanning && requestAnimationFrame(tick);
}

function scan() {
    try {
        qrcode1.decode();
    } catch (e) {
        setTimeout(scan, 300);
    }
}

function scanQR(qrcode)
{
    $.ajax({
        type: 'POST',
        url: '../../../config/scripts/scan.php',
        data: {
            qrcode: qrcode,
            checked: document.getElementById('checkbox').checked ? 1 : 0,
            scan_attempt: 1
        },
        success: function(response){
            var json_obj = JSON.parse(response)
            if(json_obj.scan == true)
            {
                if(json_obj.entry == true)
                {
                    Swal.fire(qrcode, json_obj.fullname, 'success')
                }
                else
                {
                    Swal.fire('Warning', json_obj.msg, 'warning')
                }
            }
            else
            {
                Swal.fire('Invalid QR-Code', "Unknown qr-code or qr-code doesn't exists.", 'error')
            }
        }
    })
}