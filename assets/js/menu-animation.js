function openNav() {
    getUserName('business', 1)
    document.getElementById('qr-scan').classList.add('toggle')
    document.getElementById('main').classList.add('toggle')
    document.getElementById('mySidenav').classList.add('toggle')
}

function closeNav() {
    document.getElementById('main').classList.remove('toggle')
    document.getElementById('mySidenav').classList.remove('toggle')
    document.getElementById('mySidenav').classList.remove('toggle')
}

function load(){
    initialize()
    getBusinessName('business', 1)
}