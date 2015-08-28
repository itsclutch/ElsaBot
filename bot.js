/*
    ElsaBot Version
*/
var version = 7.1;
/*
    Welcome Message
*/
API.sendChat("Elsabot Version " + version + " is active!");
/*
    Skip Command
*/
var wlFullTimer;
wlFullTimer = setInterval(wlFull, 1000);
function wlFull() {
    if (wl.length < 50) {
        clearInterval(wlFullTimer);
        API.moderateAddDJ(JSON.stringify(dj.id));
        API.moderateMoveDJ(dj.id, 3);
        API.moderateLockWaitList(false, false);
    } 
    else {
        wl = API.getWaitList();
    }
}
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message.substring(0,5) === "!skip") {
        var staff = [];
        staff = API.getStaff();
        for (var i = 0, l = staff.length; i < l; i++) {
            if (data.un === staff[i].username) {
                if (staff[i].role > 1) {
                    var dj = [];
                    dj = API.getDJ();
                    API.moderateForceSkip();
                    var skiparray = [];
                    skiparray = data.message.split(" ");
                    if(skiparray[1] !== undefined) {
                        var wl = [];
                        wl = API.getWaitList();
                        if (skiparray[1] === "bl") {
                            API.sendChat("@" + dj.username + " That song is on the room's blacklist. Please pick a different song.");
                            if (wl.length < 50) {
                                API.moderateAddDJ(JSON.stringify(dj.id));
                                API.moderateMoveDJ(dj.id, 3);
                            }
                            else {
                                API.moderateLockWaitList(true, false);
                                wlFull();
                            }
                        }
                        if (skiparray[1] === "op") {
                            API.sendChat("@" + dj.username + " That song is over played. Please pick a fresher song.");
                            if (wl.length < 50) {
                                API.moderateAddDJ(JSON.stringify(dj.id));
                                API.moderateMoveDJ(dj.id, 3);
                            }
                            else {
                                API.moderateLockWaitList(true, false);
                                wlFull();
                            }
                        }
                        if (skiparray[1] === "nsfw") {
                            API.sendChat("@" + dj.username + " That song is NSFW. Please pick a cleaner song.");
                            if (wl.length < 50) {
                                API.moderateAddDJ(JSON.stringify(dj.id));
                                API.moderateMoveDJ(dj.id, 3);
                            }
                            else {
                                API.moderateLockWaitList(true, false);
                                wlFull();
                            }
                        }
                        if (skiparray[1] === "theme") {
                            API.sendChat("@" + dj.username + " That song doesnt fit the room's theme. Please pick a different song.");
                            if (wl.length < 50) {
                                API.moderateAddDJ(JSON.stringify(dj.id));
                                API.moderateMoveDJ(dj.id, 3);
                            }
                            else {
                                API.moderateLockWaitList(true, false);
                                wlFull();
                            }
                        }
                        if (skiparray[1] === "vibe") {
                            API.sendChat("@" + dj.username + " You just killed the vibe. Please try again.");
                            if (wl.length < 50) {
                                API.moderateAddDJ(JSON.stringify(dj.id));
                                API.moderateMoveDJ(dj.id, 3);
                            }
                            else {
                                API.moderateLockWaitList(true, false);
                                wlFull();
                            }
                        }
                        if (skiparray[1] === "ban") {
                            API.sendChat("@" + dj.username + " You played a really bad song.  You will be kicked for 1 hour.");
                            var seconds;
                            seconds = 5;
                            var timer2;
                            timer2 = setInterval(banTimer, 1000);
                            function banTimer() {
                                if (seconds === 0) {
                                    clearInterval(timer2);
                                    API.moderateBanUser(dj.id, 1, API.BAN.HOUR);
                                } 
                                else {
                                    seconds--;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});
/*
    Move Command
*/
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message.substring(0,5) === "!move") {
        var staff = [];
        staff = API.getStaff();
        for (var i = 0, l = staff.length; i < l; i++) {
            if (data.un === staff[i].username) {
                if (staff[i].role > 1) {
                    var ma = [];
                    ma = data.message.split(" ");
                    var wl = [];
                    wl = API.getWaitList();
                    for (var i = 0, l = staff.length; i < l; i++) {
                        if (ma[1].substring(1) === wl[i].username) {
                            API.moderateMoveDJ(wl[i].id, ma[2]);
                        } 
                        else {
                            var allusers = [];
                            allusers = API.getUsers();
                            for (var i = 0, l = allusers.length; i < l; i++) {
                                if (ma[1].substring(1) === allusers[i].username) {
                                    if (wl.length < 50) {
                                        API.moderateAddDJ(JSON.stringify(allusers[i].id));
                                        API.moderateMoveDJ(allusers[i].id, ma[2]);
                                    }
                                    else {
                                        API.moderateLockWaitList(true, false);
                                        var timer;
                                        timer = setInterval(secondPassed, 1000);
                                        function secondPassed() {
                                            if (wl.length < 50) {
                                                clearInterval(timer);
                                                API.moderateAddDJ(JSON.stringify(allusers[i].id));
                                                API.moderateLockWaitList(false, false);
                                            } 
                                            else {
                                                wl = API.getWaitList();
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }    
                }
            }
        }
    }
});
/*
    Add Command
*/
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message.substring(0,4) === "!add") {
        var staff = [];
        staff = API.getStaff();
        for (var i = 0, l = staff.length; i < l; i++) {
            if (data.un === staff[i].username) {
                if (staff[i].role > 1) {
                    var wl = [];
                    wl = API.getWaitList();
                    var addarray = [];
                    addarray = data.message.split(" ");
                    var allusers = [];
                    allusers = API.getUsers();
                    for (var i = 0, l = allusers.length; i < l; i++) {
                        if (allusers[i].username === addarray[1].substring(1)) {
                            if (wl.length < 50) {
                                API.moderateAddDJ(JSON.stringify(allusers[i].id));
                            }
                            else {
                                API.moderateLockWaitList(true, false);
                                var timer;
                                timer = setInterval(secondPassed, 1000);
                                function secondPassed() {
                                    if (wl.length < 50) {
                                        clearInterval(timer);
                                        API.moderateAddDJ(JSON.stringify(allusers[i].id));
                                        API.moderateLockWaitList(false, false);
                                    } 
                                    else {
                                        wl = API.getWaitList();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});
/*
    Join Command
*/
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message === "!join") {
        API.moderateAddDJ(JSON.stringify(data.uid));
    }
});
/*
    Dc lookup
*/
var dcTime = [];
var dcListPos = [];
var dcListId = [];
var globalWaitList = [];
API.on(API.ADVANCE, function(data) {
    globaWaitList = API.getWaitList();
    var d = new Date();
    var n = d.getTime();
    for (var i = 0, l = dcTime.length; i < l; i++) {
        var g = (n - dcTime[i]);
        if (g > 3600000) {
            dcTime.splice(i, 1);
            dcListPos.splice(i, 1);
            dcListId.splice(i, 1);
        }
    }
});
API.on(API.USER_LEAVE, function(data) {
    for (var i = 0, l = globalWaitList.length; i < l; i++) {
        if (globalWaitList[i].username === data.username) {
            var d = new Date();
            var n = d.getTime();
            dcListId.push(data.username);
            dcListPos.push(i);
            dcTime.push(n);
        }
    }
});
API.on(API.USER_JOIN, function(data) {
    for (var i = 0, l = dcListId.length; i < l; i++) {
        if (data.id === dcListId[i]) {
            wl = [];
            wl = API.getWaitlist();
            if (wl.length < 50) {
                API.moderateAddDJ(JSON.stringify(data.id));
                API.moderateMoveDJ(data.id, dcListPos[i]);
                dcTime.splice(i, 1);
                dcListPos.splice(i, 1);
                dcListId.splice(i, 1);
            }
            else {
                API.moderateLockWaitList(true, false);
                var timer;
                timer = setInterval(secondPassed, 1000);
                function secondPassed() {
                    if (wl.length < 50) {
                        clearInterval(timer);
                        API.moderateAddDJ(JSON.stringify(data.id));
                        API.moderateMoveDJ(data.id, dcListPos[i]);
                        API.moderateLockWaitList(false, false);
                        dcTime.splice(i, 1);
                        dcListPos.splice(i, 1);
                        dcListId.splice(i, 1);
                    } 
                    else {
                        wl = API.getWaitList();
                    }
                }
            }
        }
    }
});
/*
    Swap
*/
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message.substring(0,5) === "!swap") {
        var swaparray = [];
        swaparray = data.message.split(" ");
        var wl = [];
        wl = api.getWaitList();
        for (var i = 0, l = wl.length; i < l; i++) {
            if (data.un === wl[i].username) {
                for (var j = 0, k = wl.length; j < k; j++) {
                    if (swaparray[1].substring(1) === wl[j].username) {
                        if (i < j) {
                            API.moderateMoveDJ(wl[i].id, j);
                            API.moderateMoveDJ(wl[j].id, i);
                        }
                    }
                }
            }
        }
    }
});
/*
    Chat Modes
*/
var announcement;
announcement = false;
var staffChat;
staffChat = false;
var subChat;
subChat = false;
var plebChat;
plebChat = false;
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message.substring(0,9) === "!chatmode") {
        var chatModeArray = [];
        chatModeArray = data.message.split(" ");
        var staff = [];
        staff = API.getStaff();
        for (var i = 0, l = staff.length; i < l; i++) {
            if (data.un === staff[i].username) {
                if (staff[i].role > 2) {
                    if (chatModeArray[1] === "staff") {
                        staffChat = true;
                        subChat = false;
                        plebChat = false;
                        announcement = false;
                    }
                     if (chatModeArray[1] === "sub") {
                        staffChat = false;
                        subChat = true;
                        plebChat = false;
                        announcement = false;
                    }
                      if (chatModeArray[1] === "pleb") {
                        staffChat = false;
                        subChat = false;
                        plebChat = true;
                        announcement = false;
                    }
                    if (chatModeArray[1] === "normal") {
                        staffChat = false;
                        subChat = false;
                        plebChat = false;
                        announcement = false;
                    }
                    if (staff[i].role > 3) {
                        if (chatModeArray[1] === "announcement") {
                            staffChat = false;
                            subChat = false;
                            plebChat = false;
                            announcement = true;
                        }
                    }
                }
            }
        }
    }
});
API.on(API.CHAT, function(data) {
    if (staffChat === true) {
        if (data.type === "message") {
            var allUsers = [];
            allUsers = API.getUsers();
            for (var i = 0, l = allUsers.length; i < l; i++) {
                if (data.un === allUsers[i].username) {
                    if (allUsers[i].role < 1) {
                        API.moderateDeleteChat(data.cid);
                    }
                }
            }
        }
    }
    if (subChat === true) {
        if (data.type === "message") {
            var allUsers = [];
            allUsers = API.getUsers();
            for (var i = 0, l = allUsers.length; i < l; i++) {
                if (data.un === allUsers[i].username) {
                    if (allUsers[i].role < 1) {
                        API.moderateDeleteChat(data.cid);
                    }
                }
            }
        }
    }
    if (plebChat === true) {
        if (data.type === "message") {
            var staff = [];
            staff = API.getStaff();
            for (var i = 0, l = staff.length; i < l; i++) {
                if (data.un === staff[i].username) {
                    API.moderateDeleteChat(data.cid);
                }
            }
        }
    }
    if (announcement === true) {
        if (data.type === "message") {
            var allUsers = [];
            allUsers = API.getUsers();
            for (var i = 0, l = allUsers.length; i < l; i++) {
                if (data.un === allUsers[i].username) {
                    if (allUsers[i].role < 4) {
                        API.moderateDeleteChat(data.cid);
                    }
                }
            }
        }
    }
});
/*
    Test Command
*/
var timeOfPropose;
var timeOfAnswer;
var testNewDateProp;
testNewDateProp = new Date();
var testNewDateAns;
testNewDateAns = new Date();
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message === "!propose") {
       alert("test");
       timeOfPropose = testNewDateProp.getTime();
    }
});
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message === "I do") {
       alert('accept');
       timeOfAnswer = testNewDateAns.getTime();
       var elapsedTime;
       elapsedTime = (timeOfAnswer - timeOfPropose);
       if (elapsedTime < 60000) {
           alert("congrats");
           alert(elapsedTime);
       }
    }
});
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message === "!test") {
        alert(timeOfAnswer);
    }
});
/*
    Delete commands from chat
*/
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message.substring(0,1) === "!") {
       // API.moderateDeleteChat(data.cid);
    }
});
