/* global API */
/*
                         /$$                     /$$                   /$$                        /$$  
                        | $$                    | $$                  | $$                      /$$$$  
                /$$$$$$ | $$  /$$$$$$$  /$$$$$$ | $$$$$$$   /$$$$$$  /$$$$$$         /$$    /$$|_  $$  
               /$$__  $$| $$ /$$_____/ |____  $$| $$__  $$ /$$__  $$|_  $$_/        |  $$  /$$/  | $$  
              | $$$$$$$$| $$|  $$$$$$   /$$$$$$$| $$  \ $$| $$  \ $$  | $$           \  $$/$$/   | $$  
              | $$_____/| $$ \____  $$ /$$__  $$| $$  | $$| $$  | $$  | $$ /$$        \  $$$/    | $$  
              |  $$$$$$$| $$ /$$$$$$$/|  $$$$$$$| $$$$$$$/|  $$$$$$/  |  $$$$/         \  $/    /$$$$$$
               \_______/|__/|_______/  \_______/|_______/  \______/    \___/            \_/    |______/
                                                                                                        
              ********************** a moderation and user engagement bot for plug.dj ******************
  
                             
  
                                                                                                                                                                                                                
*/
/*


                  _                     
        _ _  ___ | | ___  __ _  ___ ___ 
       | '_|/ -_)| |/ -_)/ _` |(_-</ -_)
       |_|  \___||_|\___|\__,_|/__/\___|
                                  


*/
/*
    elsabot version is set to 1
*/
localStorage.elsaBotVersion = 1
/*
    if elabot release is undefined
    elsabot release is set to 1
*/
if (localStorage.elsaBotRelease === undefined) {
    localStorage.elsaBotRelease = 1;
}
/*
    turn the string stored by localStorage into a number
*/
var release = JSON.parse(localStorage.elsaBotRelease);
/*
    increment release by 1
*/
release = release + 1;
/*
    save the new release
*/
localStorage.elsaBotRelease = release
/*
    send elsabot version to the plug.dj chat
*/
API.sendChat("Elsabot Version " + localStorage.elsaBotVersion + "." + localStorage.elsaBotRelease + " is active!");
/*





                                                                          __     
       __ __  ___ ___   ____      ____ ___   __ _   __ _  ___ _  ___  ___/ /  ___
      / // / (_-</ -_) / __/     / __// _ \ /  ' \ /  ' \/ _ `/ / _ \/ _  /  (_-<
      \_,_/ /___/\__/ /_/        \__/ \___//_/_/_//_/_/_/\_,_/ /_//_/\_,_/  /___/
      ___________________________________________________________________________
                                                                           





/*
    send chat data to functions
*/
API.on(API.CHAT, function(chatData) {
    if (chatData.message.startsWith("!skip")) {
        skip(chatData);
    }
    if (chatData.message.startsWith("!add")) {
        add(chatData);
    }
    if (chatData.message.startsWith("!move")) {
        move(chatData);
    }
    if (chatData.message === "!test") {
        test(chatData);
    }
    if (chatData.message.startsWith("!swap")) {
        swap();
    }
    if (chatData.message === "!rain") {
        makeItRain(chatData);
    }
});
/*


            _    _       
        ___| |__(_) _ __ 
       (_-<| / /| || '_ \
       /__/|_\_\|_|| .__/
                   |_|  
             
             
              
*/
/*
    Dispatcher
    **********
    
    skip function sends to check on staff function
*/
function skip(chatData) {
    onStaffSkip(chatData);
}
/*
    On Staff Check
    **************
    
    if chatter has permisions to skip
    sends to split chatData function
*/
function onStaffSkip(chatData) {
    if (API.hasPermission(chatData.uid, 2)) {
        splitChatDataSkip(chatData);
    }
}
/*
    Split Chat Data
    ***************
    
    splits chat message into an array
    sends to the skip reasons function
*/
function splitChatDataSkip(chatData) {
    var messageArray = chatData.message.split(" ");
    reasonSkip(chatData, messageArray);
}
/*
    Skip Reasons
    ************
    
    checks message array  for the reason the song will be skipped
    
    the reasons are as follows:
        op:         skips song and puts you into number 3 on the waitlist.
        theme:      skips song and puts you into number 3 on the waitlist.
        vibe:       skips song and puts you into number 3 on the waitlist.
        history:    skips song and puts you into number 3 on the waitlist.
        nsfw:       skips song and puts you into number 3 on the waitlist.
        noreason:   skips the song without a reason and puts you into number 3 on the waitlist:
        ban:        skips song and kickes you from the room for an hour.
        default:    **this will not add the dj into the waitlist**
        
        sends a message to chat explaining to the user why they were skipped
        sends to the appropiate function
*/
function reasonSkip(chatData, messageArray) {
    switch (messageArray[1]) {
        case "op":
            API.sendChat("@" + chatData.un + " skipped your song because it is overplayed. Please pick a fresher song.");
            getDJInfoSkip();
            break;
        case "theme":
            API.sendChat("@" + chatData.un + " skipped your song because it doesn't fit the room theme. Please pick a more room appropriate song.");
            getDJInfoSkip();
            break;
        case "vibe":
            API.sendChat("@" + chatData.un + " skipped your song because, bitch, you killed my vibe! Please pick a different song.");
            getDJInfoSkip();
            break;
        case "history":
            API.sendChat("@" + chatData.un + " skipped your song because it's in the dj history. Please pick a different song.");
            getDJInfoSkip();
            break;
        case "nsfw":
            API.sendChat("@" + chatData.un + " skipped your song because it's NSFW. Please pick a cleaner song.");
            getDJInfoSkip();
            break;
        case "noreason":
            API.sendChat("@" + chatData.un + " skipped your for god knows what reason. I guess they are giving you another chance tho.");
            getDJInfoSkip();
            break;
        case "ban":
            API.sendChat("@" + chatData.un + " skipped your song and decided to ban you for an hour. May god have mercy on you.");
            banSkip();
            break;
         default:
            API.sendChat("@" + chatData.un + " skipped your song.");
            API.moderateForceSkip();
    }
}
/*
    Get Dj Info
    ***********
          
    gets DJ info
    skips the song
    sends to check waitlist function
*/
function getDJInfoSkip() {
    var dj = API.getDJ();
    var id = dj.id;
    API.moderateForceSkip();
    wlCheckSkip(id);
}
/*
    Wait List Check
    ***************
    
    if the waitlist isn't full it adds the user to the waitlist
    sends to the move to in Waitlist Check function on a 1 second interval
    
    if it is full it locks the waitlist
    sends to the wlFullCheck function on a 1 second interval
*/
var inWaitListCheckSkipTimer;
var wlFullCheckSkipTimer;
function wlCheckSkip(id) {
    var wl = API.getWaitList();
    if (wl.length < 50) {
        API.moderateAddDJ(JSON.stringify(id));
        inWaitListCheckSkipTimer = setInterval(function() { 
        inWaitListCheckSkip(id);
        } , 1000);
    }
    else {
        API.moderateLockWaitList(true, false);
        wlFullCheckSkipTimer = setInterval(function() {
            wlFullCheckSkip(id);
        }, 1000);
    }
}
/*
    In Waitlist Check
    *****************
    
    on a 1 second interval
    this checks whether the user is in the waitlist
    when the user is in the waitlist it moves them to position 3
    clears the interval
*/
var inWaitListVarSkip;
function inWaitListCheckSkip(id) {    
    if (inWaitListVarSkip === -1 || inWaitListVarSkip === undefined) {
        inWaitListVarSkip = API.getWaitListPosition(id);
    }
    else {
        API.moderateMoveDJ(id, 3);
        clearInterval(inWaitListCheckSkipTimer);
        inWaitListVarSkip = undefined;
    }
}
/*
    WL Full Check
    *************
    
    on a 1 second interval
    checks whether the waitlist has room for a new user
    
    if there is less than 50 people in the waitlist
    
    clear the interval so the function doesnt run again
    add the user to the waitlist
    unlock the waitlist
    resets the checking variable
    send to the check in wl function on a 1 second interval
*/
var wlFullCheckVarSkip;
function wlFullCheckSkip(id) {
    if (wlFullCheckVarSkip === undefined || wlFullCheckVarSkip.length === 50) {
        wlFullCheckVarSkip = API.getWaitList();
    }
    else {
        clearInterval(wlFullCheckSkipTimer);
        API.moderateAddDJ(JSON.stringify(id));
        API.moderateLockWaitList(false, false);
        wlFullCheckVarSkip = undefined;
        inWaitListCheckSkipTimer = setInterval(function() { 
        inWaitListCheckSkip(id);
        } , 1000);     
    }
}
/*
    Skip Ban
    ********
    
    skips the song
    bans for an hour after 5 seconds (so the person can read about thier ban)
*/
function banSkip() {
    var dj = API.getDJ();
    API.moderateForceSkip();
    setTimeout( function() {
        API.moderateBanUser(dj.id, 1, API.BAN.HOUR);
    }, 5000);
}
/*



                 _     _ 
        __ _  __| | __| |
       / _` |/ _` |/ _` |
       \__,_|\__,_|\__,_|
 
 
 
 
 
*/
/*
    Dispatcher
    **********
    
    add function sends to check on staff function
*/
function add(chatData) {
    onStaffAdd(chatData);
}
/*
    On Staff Check
    **************
    
    if chatter has permisions to add
    sends to split chatData function
*/
function onStaffAdd(chatData) {
    if (API.hasPermission(chatData.uid, 2)) {
        splitChatDataAdd(chatData);
    }
}
/*
    Split Chat Data
    ***************
    
    splits chat message into an array
    sends to the send to chat function
*/
function splitChatDataAdd(chatData) {
    var messageArray = chatData.message.split(" ");
    sendToChatAdd(chatData, messageArray);
}
/*
    Send to Chat
    ************
    
    tells chat who added who
    sends to get user info function
*/
function sendToChatAdd(chatData, messageArray) {
    var userToBeAdded = messageArray[1];
    API.sendChat("@" + chatData.un + " added " + userToBeAdded + " to the waitlist.");
    getUserInfoAdd(userToBeAdded);
}
/*
    Get User Info
    *************
          
    gets user id
    sends to check waitlist function
*/
function getUserInfoAdd(userToBeAdded) {
    var id;
    var allUsers = API.getUsers();
    for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].username === userToBeAdded.substring(1)) {
            id = allUsers[i].id
        }
    }
    wlCheckAdd(id);
}
/*
    Wait List Check
    ***************
    
    if the waitlist isn't full it adds the dj to the waitlist
    
    if it is full it locks the waitlist
    sends to the wlFullCheck function on a 1 second interval
*/
var wlFullCheckTimerAdd;
function wlCheckAdd(id) {
    var wl = API.getWaitList();
    if (wl.length < 50) {
        API.moderateAddDJ(JSON.stringify(id));
    }
    else {
        API.moderateLockWaitList(true, false);
        wlFullCheckTimerAdd = setInterval(function() {
            wlFullCheckAdd(id);
        }, 1000);
    }
}
/*
    WL Full Check
    *************
    
    on a 1 second interval this checks whether the waitlist has room for a new dj
    
    if there is less than 50 people in the waitlist
    
    clear the interval so the function doesnt run again
    add the dj to the waitlist
    unlock the waitlist
    resets the checking variable
*/
var wlFullCheckVarAdd;
function wlFullCheckAdd(id) {
    if (wlFullCheckVarAdd === undefined || wlFullCheckVarAdd.length === 50) {
        wlFullCheckVarAdd = API.getWaitList();
    }
    else {
        clearInterval(wlFullCheckSkipTimer);
        API.moderateAddDJ(JSON.stringify(id));
        API.moderateLockWaitList(false, false);
        wlFullCheckVarAdd = undefined;
    }
}
/*





        _ __   ___ __ __ ___ 
       | '  \ / _ \\ V // -_)
       |_|_|_|\___/ \_/ \___|
 
 
 
 
 
 
*/
/*
    Dispatcher
    **********
    
    move function sends to check on staff function
*/
function move(chatData) {
    onStaffMove(chatData);
}
/*
    On Staff Check
    **************
    
    if chatter has permisions to move
    sends to split chatData function
*/
function onStaffMove(chatData) {
    if (API.hasPermission(chatData.uid, 2)) {
        splitChatDataMove(chatData);
    }
}
/*
    Split Chat Data
    ***************
    
    splits chat message into an array
    sends to the get send to chat function
*/
function splitChatDataMove(chatData) {
    var messageArray = chatData.message.split(" ");
    sendToChatMove(chatData, messageArray);
}
/*
    Send to Chat
    ************
    
    tells chat who added who
    sends to get user info function
*/
function sendToChatMove(chatData, messageArray) {
    var userToBeMoved = messageArray[1];
    var position = messageArray[2];
    API.sendChat("@" + chatData.un + " moved " + userToBeMoved + " to position " + position);
    getUserInfoMove(userToBeMoved, position);
}
/*
    Get User Info
    *************
          
    gets user id
    sends to check waitlist function
*/
function getUserInfoMove(userToBeMoved, position) {
    var id;
    var allUsers = API.getUsers();
    for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].username === userToBeMoved.substring(1)) {
            id = allUsers[i].id
        }
    }
    inWLCheckMove(id, position);
}
/*
    In Waitlist Check
    *****************
    
    this checks whether the user is in the waitlist
    if the user is in the waitlist it moves them
*/
function inWLCheckMove(id, position) {
    var inWaitList = API.getWaitListPosition(id);  
    if (inWaitList === -1) {
        wlCheckMove(id, position);
    }
    else {
        API.moderateMoveDJ(id, position);
    }
}
/*
    Wait List Check
    ***************
    
    if the waitlist isn't full it adds the user to the waitlist
    sends to the move to in Waitlist Check function on a 1 second interval
    
    if it is full it locks the waitlist
    sends to the wlFullCheck function on a 1 second interval
*/
var inWaitListCheckMoveTimer;
var wlFullCheckMoveTimer;
function wlCheckMove(id, position) {
    var wl = API.getWaitList();
    if (wl.length < 50) {
        API.moderateAddDJ(JSON.stringify(id));
        inWaitListCheckMoveTimer = setInterval(function() { 
        inWaitListCheckMove(id, position);
        } , 1000);
    }
    else {
        API.moderateLockWaitList(true, false);
        wlFullCheckSkipTimer = setInterval(function() {
            wlFullCheckMove(id, position);
        }, 1000);
    }
}
/*
    In Waitlist Check
    *****************
    
    on a 1 second interval
    this checks whether the user is in the waitlist
    when the user is in the waitlist it moves them
    clears the interval
*/
var inWaitListVarMove;
function inWaitListCheckMove(id, position) {    
    if (inWaitListVarMove === -1 || inWaitListVarMove === undefined) {
        inWaitListVarMove = API.getWaitListPosition(id);
    }
    else {
        API.moderateMoveDJ(id, position);
        clearInterval(inWaitListCheckMoveTimer);
        inWaitListVarMove = undefined;
    }
}
/*
    WL Full Check
    *************
    
    on a 1 second interval
    checks whether the waitlist has room for the user
    
    if there is less than 50 people in the waitlist
    
    clear the interval so the function doesnt run again
    add the user to the waitlist
    unlock the waitlist
    resets the checking variable
    send to the inwaitlist check function on a 1 second interval
*/
var wlFullCheckVarMove;
function wlFullCheckMove(id, position) {
    if (wlFullCheckVarMove === undefined || wlFullCheckVarMove.length === 50) {
        wlFullCheckVarMove = API.getWaitList();
    }
    else {
        clearInterval(wlFullCheckMoveTimer);
        API.moderateAddDJ(JSON.stringify(id));
        API.moderateLockWaitList(false, false);
        wlFullCheckVarMove = undefined;
        inWaitListCheckMoveTimer = setInterval(function() { 
        inWaitListCheckMove(id, position);
        } , 1000);  
    }
}
/*


                         
         _____ __ __ __ _  _ __ 
        (_-<\ V  V // _` || '_ \
        /__/ \_/\_/ \__,_|| .__/
                          |_|   


*/
/*
    Dispatcher
    **********
    
    skip function sends to check on staff function
*/
function swap(chatData) {
    splitChatDataSwap(chatData);
}
/*


                     _          _  _                _       
        _ __   __ _ | |__ ___  (_)| |_   _ _  __ _ (_) _ _  
       | '  \ / _` || / // -_) | ||  _| | '_|/ _` || || ' \ 
       |_|_|_|\__,_||_\_\\___| |_| \__| |_|  \__,_||_||_||_|
                                                      


*/
/*
    Dispatcher
    **********
    
    make it rain function sends to check on staff function
*/
function makeItRain(chatData) {
    onStaffMakeItRain(chatData);
}
/*
    On Staff Check
    **************
    
    if chatter has permisions to add
    sends to split chatData function
*/
function onStaffMakeItRain(chatData) {
    if (API.hasPermission(chatData.uid, 2)) {
        var username = chatData.un;
        switchMakeItRain(username);
    }
}
/*
    Switch Make It Rain
    *******************
    
    if make it rain var is false or hasn't been defined
    make it rain is ON
    
    if make it rain var is true 
    make it rain is OFF
*/
var makeItRainVar;
function switchMakeItRain(username) {
    if (makeItRainVar === undefined || makeItRainVar === false) {
        makeItRainVar = true;
    }
    else {
        makeItRainVar = false;
    }
    sendToChatMakeItRain(username);
}
/*
    Send to Chat
    ************
    
    tells chat who added who
    sends to get user info function
*/
function sendToChatMakeItRain(username) {
    if (makeItRainVar === false) {
        API.sendChat("@" + username + " stoped the rain.");
    }
    if (makeItRainVar === true) {
        API.sendChat("@" + username + " is making it rain. All monies based commands are now free.");
    }
}
/*
            
                                               __    _    __   _   __    _           
             __ __  ___ ___   ____      __ __ / /_  (_)  / /  (_) / /_  (_) ___   ___
            / // / (_-</ -_) / __/     / // // __/ / /  / /  / / / __/ / / / -_) (_-<
            \_,_/ /___/\__/ /_/        \_,_/ \__/ /_/  /_/  /_/  \__/ /_/  \__/ /___/
            _________________________________________________________________________
                                                                                    
            
            

*/
/*
    activate functions
    ******************
*/
/*
    on advance
    **********
    
    activate wl check
    kick expired dc's off dc waitlist
    update monies
*/
API.on(API.ADVANCE, function(data) {
    updateWaitListOnAdvance();
    dcListUndefinedCheck();
    autoVoteUndefinedCheck(data);
});
/*
    on user leave
    *************
    
    add to the Dc list if they were in the wait list
*/
API.on(API.USER_LEAVE, function(data) {
    wlOnAdvanceCheckDC(data);
});
/*
    on user join
    ************
    
    checks if they are on the dclist and takes appropiate action
*/
API.on(API.USER_JOIN, function(data) {
    dcListCheck(data);
});
/*

           _                     _               
        __| | __   ___ _  _  ___| |_  ___  _ __  
       / _` |/ _| (_-<| || |(_-<|  _|/ -_)| '  \ 
       \__,_|\__| /__/ \_, |/__/ \__|\___||_|_|_|
                       |__/                      

        this puts users that disconnected into thier spot on the waitlist.
        max one hour disconected 
        
        
        
*/
/*
    Get WaitList on Advance
    ***********************
    
    gets the waitlist each time a new song is played
*/
var wlOnAdvance;
function updateWaitListOnAdvance() {
    wlOnAdvance = API.getWaitList();
}
/*
    Check Wl on user leave
    **********************
    
    checks if the user was on the waitlist when they left
*/
function wlOnAdvanceCheckDC(data) {
    for (var i = 0; i < wlOnAdvance.length; i++) {
        if (data.id === wlOnAdvance[i].id) {
            var position = i + 1;
            var id = data.id
            pushToDcList(id, position);
        }
    }
}
/*
    Push to Dc List
    ***************
    
    creates an object for the user
    pushes the object to the DC list
*/
var DcList;
function pushToDcList(id, position) {
    if (DcList === undefined) {
        DcList = [];
    }
    var Dc = {};
    Dc.id = id;
    Dc.position = position;
    Dc.DcTime = Date.now();
    DcList.push(Dc);
}
/*
    Dc List Undefined Check
    ***********************
    
    if the dclist is not undefined
    sends to kick expired dc's
*/
function dcListUndefinedCheck() {
    if (DcList !== undefined) {
        kickExpiredDc();
    }     
}
/*
    Kick Expired Disconnecters
    **************************
    
    on advance checks the Dc List for expired entries
    removes the entries from the list
*/
function kickExpiredDc() {
    var timeNow = Date.now();
    for (var i = 0; i < DcList.length; i++) {
        var elapsedTime = timeNow - DcList[i].DcTime;
        if (elapsedTime > 3600000) {
            DcList.splice(i, 1);
        }
    }
}
/*
    Dc List Check
    *************
    
    on user join
    if the user is on the dc list
    sends to send to chat
*/
function dcListCheck(data) {
    for (var i = 0; i < DcList.length; i++) {
        if (data.id = DcList[i].id) {
            var id = data.id;
            var username = data.username;
            var position = DcList[i].position;
            var DcTime = DcList[i].DcTime;
            sendToChatDc(id, username, position, DcTime);
        }
    }
}
/*
    Send to Chat
    ************
    
    tells chat who Dc'ed and where they will be moved to
    sends to wlcheck
*/
function sendToChatDc(id, username, position, DcTime) {
    var timeNow = Date.now();
    var elapsedTime = timeNow - DcTime;
    var minutes = Math.floor(elapsedTime/(1000*60));
    API.sendChat("@" + username + " disconnected " + minutes + " minutes ago and will be moved to position " + position);
    wlCheckDc(id, position);
}
/*
    Wait List Check
    ***************
    
    if the waitlist isn't full it adds the user to the waitlist
    sends to the move to in Waitlist Check function on a 1 second interval
    
    if it is full it locks the waitlist
    sends to the wlFullCheck function on a 1 second interval
*/
var inWaitListCheckDcTimer;
var wlFullCheckDcTimer;
function wlCheckDc(id, position) {
    var wl = API.getWaitList();
    if (wl.length < 50) {
        API.moderateAddDJ(JSON.stringify(id));
        inWaitListCheckDcTimer = setInterval(function() { 
        inWaitListCheckDc(id, position);
        } , 1000);
    }
    else {
        API.moderateLockWaitList(true, false);
        wlFullCheckDcTimer = setInterval(function() {
            wlFullCheckDc(id, position);
        }, 1000);
    }
}
/*
    In Waitlist Check
    *****************
    
    on a 1 second interval
    this checks whether the user is in the waitlist
    when the user is in the waitlist it moves them
    clears the interval
*/
var inWaitListVarDc;
function inWaitListCheckDc(id, position) {    
    if (inWaitListVarDc === -1 || inWaitListVarDc === undefined) {
        inWaitListVarDc = API.getWaitListPosition(id);
    }
    else {
        API.moderateMoveDJ(id, position);
        clearInterval(inWaitListCheckDcTimer);
        inWaitListVarDc = undefined;
        romoveFromDcList(id);
    }
}
/*
    WL Full Check
    *************
    
    on a 1 second interval
    checks whether the waitlist has room for the user
    
    if there is less than 50 people in the waitlist
    
    clear the interval so the function doesnt run again
    add the user to the waitlist
    unlock the waitlist
    resets the checking variable
    send to the inwaitlist check function on a 1 second interval
*/
var wlFullCheckVarDc;
function wlFullCheckDc(id, position) {
    if (wlFullCheckVarDc === undefined || wlFullCheckVarDc.length === 50) {
        wlFullCheckVarDc = API.getWaitList();
    }
    else {
        clearInterval(wlFullCheckDcTimer);
        API.moderateAddDJ(JSON.stringify(id));
        API.moderateLockWaitList(false, false);
        wlFullCheckVarDc = undefined;
        inWaitListCheckDcTimer = setInterval(function() { 
        inWaitListCheckDc(id, position);
        } , 1000);  
    }
}
/*
    romove from dc list
    *******************
    
    upon succsessfull add romoves user from dclist
*/
function romoveFromDcList(id) {
    for (var i = 0; i < DcList.length; i++) {
        if (id = DcList[i].id) {
            DcList.splice(i, 1);
        }
    }
}
/*


                          _                          _               
        _ __   ___  _ _  (_) ___  ___  ___ _  _  ___| |_  ___  _ __  
       | '  \ / _ \| ' \ | |/ -_)(_-< (_-<| || |(_-<|  _|/ -_)| '  \ 
       |_|_|_|\___/|_||_||_|\___|/__/ /__/ \_, |/__/ \__|\___||_|_|_|
                                           |__/                      


*/
/*
    Load Local Storage
*/

if (localStorage.monies === undefined) {
    localStorage.monies = '[{"id":1,"value":1,"username":"me"},{"id":2,"value":2,"username":"you"}]';
}
var monies = JSON.parse(localStorage.monies);

/*
    
    **************
    
    on advance   
    if autovote is undefined
    
    sets values to zero
*/
var autoVote;
function autoVoteUndefinedCheck(data) {
    if (autoVote === undefined) {
        autoVote = {};
        autoVote.woot = 0;
        autoVote.grab = 0;
        autoVote.meh = 0;
    }
    moniesUpdater(data);
}
/*
    Monies Updater
    **************
    
    checks how much monies were earned
    sends to check monies list function
*/
function moniesUpdater(data) {
    var newMonies = {};
    newMonies.username = data.lastPlay.dj.username;
    newMonies.id = data.lastPlay.dj.id;
    newMonies.value = (data.lastPlay.score.positive + (data.lastPlay.score.grabs * 10) + data.lastPlay.score.negative - autoVote.woot - autoVote.meh - (autoVote.grab * 10) + 50);
    checkMoniesList(newMonies);
}
/*
    check monies list
    *****************
    
    checks if the user is in the monies list
    if they were it replaces the old value in the moniesValue array with the new one
*/
var playedBefore;
function checkMoniesList(newMonies) {
    for (var i = 0, l = monies.length; i < l; i++) {
        if (newMonies.id === monies[i].id) {
            monies[i].value = (monies[i].value + newMonies.value);
            playedBefore = true;
        }
    }
    addNewMoniesObject(newMonies);
}
/*
    add new monies object
    *********************
    
    if the user hasn't earned monies before
    adds the new monies object to the monies array
*/
function addNewMoniesObject(newMonies) {
    if (playedBefore === undefined) {
        monies.push(newMonies);
    }
    saveMonies(newMonies);
}
/*
    save monies
    ***********
    
    saves the monies array in local storage
    sets played before test variable to undefined
    sends to the send to chat function
*/
function saveMonies(newMonies) {
    localStorage.monies = JSON.stringify(monies);
    playedBefore = undefined
    sendToChatMonies(newMonies);
}
/*
    send to chat
    ************
    
    send who earned how much monies to chat
*/
function sendToChatMonies(newMonies) {
    API.sendChat("@" + newMonies.username + " earned " + newMonies.value + " monies");
}
/*
    get auto votes
    **************
    
    on advance
    get the votes that happen in the firs 3 seconds of the song (so you can deduct them from the score later)
*/
function getAutoVotes() {
    setTimeout(function() {
        autoVote.woot = API.getScore().positive;
        autoVote.grab = API.getScore().grabs;
        autoVote.meh = API.getScore().negative;
    },3000); 
}

   























function test(chatData) {
    var me = API.getUser(chatData.uid);
    alert(JSON.stringify(me));
}
