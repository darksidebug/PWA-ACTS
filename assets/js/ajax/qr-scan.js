
window.addEventListener('load', () => {
    var isLoggedIn = getCookie()
    if(isLoggedIn == "")
    {
        window.location.href = startingPage
    }
});

const qrcode1 = window.qrcode;
const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrcodes = document.getElementById("qrcode");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");
const qr = document.getElementById("qr")
const c = document.getElementById("card")
const stopScan = document.getElementById("stop_Scan")
const txt = document.getElementById("txt")

let scanning = false;

qrcode1.callback = res => {
    if (res) {

        isCheckboxCheck()
        getIndex(res)

        scanning = false;
        
        video.srcObject.getTracks().forEach(track => {
            track.stop();
        });

        qr.hidden = false;
        canvasElement.hidden = true;
        btnScanQR.hidden = false;
        stopScan.hidden = true;
    }
}
  
btnScanQR.onclick = () => {

    getBusinessName('business', 1)

    navigator.mediaDevices
        .getUserMedia({
            video: {
                facingMode: "environment"
            }
        })
        .then(function (stream) {
            qr.hidden = true
            scanning = true;

            btnScanQR.hidden = true;
            canvasElement.hidden = false;
            stopScan.hidden = false;

            video.setAttribute("playsinline", true); 
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
    stopScan.hidden = true;
}

tick = () => {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

    scanning && requestAnimationFrame(tick);
}

scan = () => {
    try {
        qrcode1.decode()

    } catch (e) {
        setTimeout(scan, 300);
    }
}

callback = () => {
    qrcode1.callback = res => {
        if (res) {
            getIndex(res)

            scanning = false;
            
            video.srcObject.getTracks().forEach(track => {
                track.stop();
            });
    
            qr.hidden = false;
            canvasElement.hidden = true;
            btnScanQR.hidden = false;
            stopScan.hidden = true;
        }
    };
}

scanQR = (qrcode) => {

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

sync_in.onclick = async () => { 

    const online = await checkOnlineStatus()
    if(online)
    {
        directSyncIn("business", 1) 
    }
    else
    {
        alert("Your current connection is offline. Please connect to the internet now.")
    }
}

sign_out.onclick = async () => { 

    const online = await checkOnlineStatus()
    if(online)
    {
        syncOut(0) 
    }
    else
    {
        alert("Your current connection is offline. Please connect to the internet now.")
    }
}

