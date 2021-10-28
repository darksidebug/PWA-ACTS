
idb.init({
    database: "trace",
    version: 1,
    tables: [
        {
            name: "persons",
            keyPath: "ID",
            autoIncrement: true,
            index: [{ name: "qr_code", unique: false}, { name: "person_id", unique: false }]
        },
        {
            name: "entries",
            autoIncrement: true
        },
        {
            name: "business",
            keyPath: "ID",
            autoIncrement: true,
        },
    ]
})

let url = $('#form-login').attr('data-route')
let login = document.getElementById('login')
let username = document.getElementById('username')
let password = document.getElementById('password')
let card = document.getElementById('card-design')
let parentClass = document.getElementById('parentClass')
let main = document.getElementById('main')
var chkbx = document.getElementById('checkbox')
var bname = document.getElementById('bname')
var uname = document.getElementById('uname')
var sync_in = document.getElementById('sync-in')
var sign_out = document.getElementById('sign-out')
var chkInOut, business, user, isLoggedOut, data = [], bname = {}
var ok_btn, messageModal, hasBusiness, info, msg, last_id, selectedLastID
var persons = [],
entries = [],
allEntries = [],
scannedData = [],
hasRows = false,
length = 15,
maxLength = 17,
hValues = "C$7D#!m@*B9&a0%N",
characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()?/>\<|'
var objectStore, secondRequest, store, db, request, database
let startingPage = "/views/pages/v2"

pushPersonItems = (jsonData) => {
    persons.push(jsonData)
}

pushScannedItems = (jsonData) => {
    scannedData.push(jsonData)
}

pushEntriesItems = (jsonData) => {
    entries.push(jsonData)
}

pushAllEntries = (jsonData) => {
    allEntries.push(jsonData)
}

toStringify = (arrayOfData) => {
    let stringifyData = ""
    stringifyData = JSON.stringify(arrayOfData)
    return stringifyData
}

toJSON = (arrayOfData) => {
    let personData = ""
    personData = JSON.parse(arrayOfData)
    return personData
}

toString = (val) => {
    let value = ""
    if(val != null)
    {
        for(let i = 0; i < val.length; i++)
        {
            value += val[i] + "" + hValues
        }
    }
    return value
}

toText = (val) => {
    let value = "", i = 0
    if(val !== undefined || val != null)
    {
        for(let i = 0; i < val.length; i = i + maxLength)
        {
            value = value + "" + val[i]
        }
    }
    return value
}

toRandom = () => {
    let result  = '', i = 0;
    for ( i = 0; i < characters.length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        result == length ? i = characters.length : i++
    }
    return result;
}

initialize = () => {
    idb.init({
        database: "trace",
        version: 1,
        tables: [
            {
                name: "persons",
                keyPath: "ID",
                autoIncrement: true,
                index: [{ name: "qr_code", unique: false}]
            },
            {
                name: "entries",
                autoIncrement: true
            },
            {
                name: "business",
                keyPath: "ID",
                autoIncrement: true,
            },
        ]
    })
}

insertData = (table, data) => {
    let inserted
    idb.insert(table, data, function (isInserted, responseText, length) {
        if(isInserted == true)
        {
            inserted = true
        }
    });
    return inserted
}

bulkInsert = () => {

    idb.insertAll("persons", persons, function (isInserted, responseText, itemcount) {
        console.log(isInserted)
        console.log(responseText)
        if(itemcount == persons.length)
        {
            done()
            setTimeout(function(){
                window.location.href = '/views/pages/v2/qr-scan.html'
            }, 1000)
        }
    });
}

getIndex = (qr) => {

    idb.index('persons', qr , function(has_row, callback) {
        if(has_row)
        {
            hasRows = has_row
            pushScannedItems({
                qr_code: callback.qr_code,
                first_name: toText(callback.first_name),
                middle_name: toText(callback.middle_name),
                last_name: toText(callback.last_name),
                contact_number: toText(callback.contact_number),
                household_number: callback.household_number,
                address: callback.address,
                is_flagged: callback.is_flagged,
                flag_message: callback.flag_message,
                first_dose_name: callback.first_dose_name,
                second_dose_name: callback.second_dose_name,
                status: callback.status
            })

            getBusiness(1, callback)
            showMessage()
        }
        else
        {
            alert("There is no record found associated with this '" + qr + "' qr code. This might be newly registered. You can sync in" +
                  " by connecting to the internet and click 'Sync In' found in the menu drawer.")
        }
    })
}

getBusiness = (key, callback) => {
    idb.select("business", key, function(has_row, result){
        if(result !== undefined)
        {
            pushEntriesItems({
                household_number: callback.household_number,
                first_name: callback.first_name,
                middle_name: callback.middle_name,
                last_name: callback.last_name,
                contact_number: callback.contact_number,
                address: callback.address,
                visited: result.business_name,
                entry_date: getDate(),
                type: chkInOut,
                entry_added: getDate()
            })
        }
        else
        {
            getBusiness((parseInt(key) + 1), callback)
        }
    })
}

update = (table, key, id, isLoggedOut) => {
    idb.update(table, key, id, isLoggedOut)
}

getBusinessName = (table, key) => {
    
    idb.select(table, key,  function(has_row, result){
        if(result !== undefined)
        {
            hasBusiness = true
            last_id = result.lastID 
            isLoggedOut = result.is_logged_in
        }
        else
        {
            hasBusiness = false
            last_id = 0
            isLoggedOut = true
        }
    })  
}

getUserName = (table, key) => {
    idb.select(table, key,  function(has_row, result){
        if(result !== undefined)
        {
            bname.innerHTML = result.business_name
            uname.innerHTML = "username: " + result.username
        }
        else
        {
            getUserName(table, (parseInt(key) + 1))
        }
    })
}

getEntries = () => {
 
    idb.select("entries", [],  function(has_row, result){
        if(result !== undefined)
        {
            for(let i = 0; i < result.length; i++)
            {
                pushAllEntries({
                    first_name: toText(result[i].first_name),
                    middle_name: toText(result[i].middle_name),
                    last_name: toText(result[i].last_name),
                    contact_number: toText(result[i].contact_number),
                    address: result[i].address,
                    type: result[i].type,
                    visited: result[i].visited,
                    entry_date: result[i].entry_date,
                    entry_addedd: result[i].entry_added,
                })
            }
        }
    })
}

getLastKey = (table) => {
    var personKey
    idb.lastKey(table, function(has_row, result){
        console.log(has_row)
        personKey = result
    })
    return personKey
}

clearAll = (table) => {
    idb.clear(table, function(result, callback){
        console.log(result)
        console.log(callback)
    })
}

getArrElement = () => {

    for(let i = 0; i < scannedData.length; i++)
    {
        console.log(scannedData[i].first_name)
    }
}

checkIsFlagged = (flag_value) => {
    var html = ''

    if(flag_value == 1)
    {
        html = '<h5><i class="fas fa-flag p-2 text-danger"></i> This person is flagged!</h5>'
    }
    else
    {
        html = '<h5><i class="fas fa-thumbs-up p-2"></i> This person is cleared!</h5>'
    }
    return html
}

checkIsFlaggedMsg = (flag_value, flag_msg) => {
    var html = ''
    if(flag_value == 1)
    {
        html =  '<div class="alert alert-danger text-center text-danger px-2 py-3">' +
                    '<i class="fas fa-times me-1"></i> '+ flag_msg +'' +
                '</div>'
    }
    else
    {
        html =  '<div class="alert alert-success text-center text-success px-2 py-4">' +
                    '<i class="fas fa-check me-1"></i> This person is allowed to enter!' +
                '</div>'
    }
    return html
}

fullname = (fn, mn, ln) => {
    var fullname = ''
    fullname = fn + (mn == '' ? ' ' : (' ' + mn + ' ')) + ln
    return fullname
}

vaccinationStatus = (status) => {
    var status = ''
    if(status == 1)
    {
        status = '<i class="fas fa-check"></i> Partially Vaccinated'
    }
    else if (status == 2)
    {
        status = '<i class="fas fa-check"></i> Fully Vaccinated'
    }
    else
    {
        status = 'Unvaccinated'
    }
    return status
}

isEmpty = (value) => {
    var val = ''
    if(value == null || value == "")
    {
        val = ''
    }
    else
    {
        val = value
    }
    return val
}

showMessage = () => {
    card.hidden = true
    var html = '<div class="card-design px-3 px-md-2 px-lg-3" id="card-design-2">' +
                    '<div class="text-center mt-4" id="flag">'+ checkIsFlagged(scannedData[0].is_flagged) +'</div>' +
                    '<div>'+ checkIsFlaggedMsg(scannedData[0].is_flagged, scannedData[0].flag_message) +'</div>'+
                    '<div class="text-center mt-4">' +
                        '<h1 id="qr_code">'+ scannedData[0].qr_code +'</h1>' +
                        '<h5 id="name">'+ fullname(scannedData[0].first_name, scannedData[0].middle_name, scannedData[0].last_name) +'</h5>' +
                        '<h6 id="contact">'+ scannedData[0].contact_number +'</h6>' +
                        '<h6 id="brgy">'+ scannedData[0].address +'</h6>' +
                    '</div>' +
                    '<h6 class="mt-4 ms-2">Vaccination Info :</h6>' +
                    '<p class="ms-4 d-block mb-0" id="1st_dose">1st dose: '+ isEmpty(scannedData[0].first_dose_name) +'</p>' +
                    '<p class="ms-4 d-block mt-0" id="2nd_dose">2nd dose: '+ isEmpty(scannedData[0].second_dose_name) +'</p>' +
                    '<h5 class="text-center mt-2"> Status : '+ vaccinationStatus(scannedData[0].status) +'</h5>' +
                    '<div align="center" class="mb-3 mt-2 pb-4">' +
                        '<button class="border-0 btnCloseMsg mt-4 w-50" id="ok" onClick="msgClose()">CONTINUE</button>' +
                    '</div>' +
                    '<div class="top"></div>'+
                    '<div class="bottom"></div>'+
                '</div>'
    
    parentClass.insertAdjacentHTML('afterend', html)
}

msgClose = () => {
    insertData('entries', entries)
    let card2 = document.getElementById('card-design-2')
    card2.hidden = true
    card.hidden = false
    entries = []
    scannedData = []
}

isCheckboxCheck = () => {
    if(chkbx.checked == true)
    {
        chkInOut = "Entry"
    }
    else
    {
        chkInOut = "Exit"
    }
}

getDate = () => {
    var cleanDate = ''
    var today = new Date()
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    
    cleanDate = date + ' '+ time
    return cleanDate
}

synchronizing = () => {
    card.hidden = true
    parentClass.innerHTML = "<div class='card-design py-5 px-3 mt-5 text-center'><section><div class='loader'>"+
                                "<span style='--i:1'></span><span style='--i:2'></span><span style='--i:3'></span>"+
                                "<span style='--i:4'></span><span style='--i:5'></span><span style='--i:6'></span>"+
                                "<span style='--i:7'></span><span style='--i:8'></span><span style='--i:9'></span>"+
                                "<span style='--i:10'></span><span style='--i:11'></span><span style='--i:12'></span>"+
                                "<span style='--i:13'></span><span style='--i:14'></span><span style='--i:15'></span>"+
                                "<span style='--i:16'></span><span style='--i:17'></span><span style='--i:18'></span>"+
                                "<span style='--i:19'></span><span style='--i:20'></span></style></div></section>"+
                                "<h4 class='text-center' id='info'><strong>Synchronizing</strong><br>"+
                                "<br></h4><h5 id='msg'>Please wait...</h5><div class='top'></div><div class='bottom'></div>"+
                            "</div>"
    info = document.getElementById('info')
    msg = document.getElementById('msg')
}

retry = () => {
    card.hidden = true
    parentClass.innerHTML = "<div class='card-design py-5 px-3 mt-5 text-center'><section><div class='loader'>"+
                                "<span style='--i:1'></span><span style='--i:2'></span><span style='--i:3'></span>"+
                                "<span style='--i:4'></span><span style='--i:5'></span><span style='--i:6'></span>"+
                                "<span style='--i:7'></span><span style='--i:8'></span><span style='--i:9'></span>"+
                                "<span style='--i:10'></span><span style='--i:11'></span><span style='--i:12'></span>"+
                                "<span style='--i:13'></span><span style='--i:14'></span><span style='--i:15'></span>"+
                                "<span style='--i:16'></span><span style='--i:17'></span><span style='--i:18'></span>"+
                                "<span style='--i:19'></span><span style='--i:20'></span></style></div></section>"+
                                "<h4 class='text-center' id='info'><strong>Retrying</strong><br>"+
                                "<br></h4><h5 id='msg'>Please wait we're trying to connect you to the server.</h5><div class='top'></div><div class='bottom'></div>"+
                            "</div>"
}

finalizing = () => {
    info.innerHTML = "<strong>Finalizing!</strong><br><br>"
    msg.innerHTML = "Please wait were setting up everything for you."
}

done = () => {
    card.hidden = true
    parentClass.innerHTML = "<div class='card-design py-5 px-3 mt-5 text-center'>"+
                                "<i class='fas fa-check me-1 text-center txt-check'></i>"+
                                "<h4 class='text-center mt-3' id='info'><strong>Done!</strong></h4><br>"+
                                "<h5>Everything is up to date now. Please wait we'll redirect you any seconds now.</h5>"+
                                "<div class='top'></div><div class='bottom'></div>"+
                            "</div>"
}

setCookie = (value, expires) => {
    document.cookie = "username=" + value + ";expires=" + expires + ";path=/";
}

setCookieTime = () => {
    var today = new Date()
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    var time = (today.getHours() + 13) + ':' + today.getMinutes() + ':' + today.getSeconds()
    var expires = date + " " + time
    return expires
}

setCookieTimeExpiration = () => {
    var expire = "Thu, 01-Jan-1970 00:00:01"
    return expire
}

getCookie = () => {
    let name = "username=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

setCookieInformation = () => {
    card.hidden = true
    parentClass.innerHTML = "<div class='card-design py-5 px-3 mt-5 text-center'><section>"+
                                "<div class='wifi'><span class='fas fa-wifi wifi-logo'></span><span class='slash'></span></div></section>"+
                                "<h2 class='text-center' id='head-text'><strong>Connection Failed!</strong></h2><br><br>"+
                                "<h5 id='msg'>Please synchronize now.</h5><div class='top'></div><div class='bottom'></div>"+
                                '<div align="center" class="mb-2 mt-2 pb-2">' +
                                    '<button class="border-0 btnCloseMsg mt-4 px-4" id="ok" onClick="">SYNCHRONIZE</button>' +
                                '</div>' +
                            "</div>"
}

syncOut = (startingLoop) => {
    var attemps = 0;
    idb.select("entries", [],  function(has_row, result){
        if(result !== undefined)
        {
            for(let i = startingLoop; i < result.length; i++)
            {
                $.ajax({
                    type: 'POST',
                    url: url + '/upload.php',
                    data: {
                        household_number: result[i].household_number,
                        first_name: toText(result[i].first_name),
                        middle_name: toText(result[i].middle_name),
                        last_name: toText(result[i].last_name),
                        contact_number: toText(result[i].contact_number),
                        address: result[i].address,
                        type: result[i].type,
                        visited: result[i].visited,
                        entry_date: result[i].entry_date,
                        entry_added: result[i].entry_added,
                        count: i
                    },
                    success: function(response){
                        var json_obj = JSON.parse(response)
                        if(json_obj.con == true)
                        {
                            parentClass.hidden = true
                            card.hidden = false
                            if(parseInt(json_obj.count) == result.length)
                            {   
                                if(parseInt(json_obj.in) == result.length)
                                {
                                    sign_out("business", 1)
                                    console.log("Sync successfull")
                                }
                                else
                                {
                                    alert("There was a problem synching out to online. Please contact SLSU-CCSIT Development Team immediately.")
                                }
                            } 
                        }
                        else
                        {
                            attemps = (parseInt(attemps) + 1)
                            alert("Unable to connect to the server. Please connect to the internet now to continue.")
                            if(attemps == 3)
                            {
                                retry()
                                syncOut(parseInt(json_obj.count))
                            }
                            else if(attemps == 6)
                            {
                                parentClass.hidden = true
                                card.hidden = false
                                alert("Could not connect to the server. Please try again later.")
                            }
                        }
                    }
                })
            }
        }
    })
}

checkRecords = (lastID, has_business) => {
    synchronizing()
    console.log("Synchronizing ...")
    if(has_business == true)
    {
        idb.select("business", 1,  function(has_row, result){
            if(result !== undefined)
            {
                getRecords(1, result.lastID)
                update("business", 1, lastID, 1)
            }
        })
    }
    else
    {
        getRecords(1, 0)
    }
}

getRecords = (page, id) => {
    var attemps = 0
    $.ajax({
        type: 'POST',
        url: url + '/dataRetreiver.php',
        data: {
            page: page,
            id: id
        },
        success: function(response){
            var json_obj = JSON.parse(response)
            console.log(json_obj)
            if(json_obj.con == true)
                {
                if(json_obj.count < 1)
                {
                    finalizing()
                    console.log("Done synchronizing!")
                    console.log('Finalizing...')
                    bulkInsert()
                }
                else
                {
                    for(let i = 0; i < json_obj.data.length; i++)
                    {
                        pushPersonItems({
                            person_id: json_obj.data[i][0],
                            qr_code: json_obj.data[i].qr_code,
                            first_name: toString(json_obj.data[i].first_name),
                            middle_name: toString(json_obj.data[i].middle_name),
                            last_name: toString(json_obj.data[i].last_name),
                            contact_number: toString(json_obj.data[i].contact_number),
                            household_number: json_obj.data[i].household_number,
                            address: json_obj.data[i].address,
                            is_flagged: json_obj.data[i].is_flagged,
                            flag_message: json_obj.data[i].flag_message,
                            first_dose_name: json_obj.data[i].first_dose_name,
                            second_dose_name: json_obj.data[i].second_dose_name,
                            status: json_obj.data[i].status
                        })
                    }
                    
                    getRecords(page += 1, id)
                }   
            }
            else
            {
                attemps = (parseInt(attemps) + 1)
                alert("Unable to connect to the server. Please check your connection now to continue.")

                if(attemps == 3)
                {
                    retry()
                    getRecords(json_obj.page, json_obj.last_id)
                }
                else if(attemps == 6)
                {
                    parentClass.hidden = true
                    card.hidden = false
                    clearAll("business")
                    setCookie("", setCookieTimeExpiration())
                    alert("Could not connect to the server. Please try again later.")
                    window.location.reload()
                }
            }
        }
    })
}

syncIn = (object) => {

    var isLoggedIn = getCookie()
    if(isLoggedIn == "")
    {
        setCookie(object.username, setCookieTime())
    }

    idb.select("business", 1,  function(has_row, result){
        if(result !== undefined)
        {   
            if(result.is_logged_out == 2)
            {
                update("business", 1, result.lastID, 1)
            }
            else
            {
                syncOut()
            }

            checkRecords(result.lastID, true)
        }
        else
        {
            insertData('business', {username: object.username, business_name: object.b_name, is_logged_out: 1, lastID: object.last_id})
            checkRecords(object.last_id, false)
        }
    })
}

directSyncIn = async (table, key) => {

    const online = await checkOnlineStatus()
    if(online)
    {
        idb.select(table, key,  function(has_row, result){
            if(result !== undefined)
            {
                checkRecords(result.lastID, true)
            }
            else
            {
                directSyncIn(table, (parseInt(key) + 1))
            }
        })
    }
    else
    {
        alert("Your current connection is offline. Please connect to the internet now.")
    }
}

signOut = async (table, key) => {
    
    const online = await checkOnlineStatus()
    if(online)
    {
        idb.select(table, key,  function(has_row, result){
            if(result !== undefined)
            {
                update(table, key, result.lastID, 2)
                setCookie('', setCookieTimeExpiration())
                window.location.href = startingPage
            }
            else
            {
                signOut(table, (parseInt(key) + 1))
            }
        })
    }
    else
    {
        alert("Your current connection is offline. Please connect to the internet now.")
    }
}

const checkOnlineStatus = async () => {
    try 
    {
        const online = await fetch("https://unpkg.com/dexie@latest/dist/dexie.js");
        return online.status >= 200 && online.status < 300; // returns either true or false
    } 
    catch (err) 
    {
        return false; // definitely offline
    }
}
