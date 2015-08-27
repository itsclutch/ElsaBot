/*
    namespace variables
*/
/*
    ElsaBot Version
*/
var version = 5.6;
/*
    Welcome Message
*/
API.sendChat("Elsabot Version " + version + " is active!");
/*
    Skip Command
*/
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
                                var timer;
                                timer = setInterval(secondPassed, 1000);
                                function secondPassed() {
                                    if (wl.length < 50) {
                                        clearInterval(timer);
                                        API.moderateAddDJ(JSON.stringify(dj.id));
                                        API.moderateMoveDJ(dj.id, 3);
                                        API.moderateLockWaitList(false, false);
                                    } 
                                    else {
                                        wl = API.getWaitList();
                                    }
                                }
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
                                var timer;
                                timer = setInterval(secondPassed, 1000);
                                function secondPassed() {
                                    if (wl.length < 50) {
                                        clearInterval(timer);
                                        API.moderateAddDJ(JSON.stringify(dj.id));
                                        API.moderateMoveDJ(dj.id, 3);
                                        API.moderateLockWaitList(false, false);
                                    } 
                                    else {
                                        wl = API.getWaitList();
                                    }
                                }
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
                                var timer;
                                timer = setInterval(secondPassed, 1000);
                                function secondPassed() {
                                    if (wl.length < 50) {
                                        clearInterval(timer);
                                        API.moderateAddDJ(JSON.stringify(dj.id));
                                        API.moderateMoveDJ(dj.id, 3);
                                        API.moderateLockWaitList(false, false);
                                    } 
                                    else {
                                        wl = API.getWaitList();
                                    }
                                }
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
                                var timer;
                                timer = setInterval(secondPassed, 1000);
                                function secondPassed() {
                                    if (wl.length < 50) {
                                        clearInterval(timer);
                                        API.moderateAddDJ(JSON.stringify(dj.id));
                                        API.moderateMoveDJ(dj.id, 3);
                                        API.moderateLockWaitList(false, false);
                                    } 
                                    else {
                                        wl = API.getWaitList();
                                    }
                                }
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
                                var timer;
                                timer = setInterval(secondPassed, 1000);
                                function secondPassed() {
                                    if (wl.length < 50) {
                                        clearInterval(timer);
                                        API.moderateAddDJ(JSON.stringify(dj.id));
                                        API.moderateMoveDJ(dj.id, 3);
                                        API.moderateLockWaitList(false, false);
                                    } 
                                    else {
                                        wl = API.getWaitList();
                                    }
                                }
                            }
                        }
                        if (skiparray[1] === "ban") {
                            API.sendChat("@" + dj.username + " You played a really bad song.  You will be kicked for 1 hour.");
                            var seconds;
                            seconds = 5;
                            var timer;
                            timer = setInterval(secondPassed, 1000);
                            function secondPassed() {
                                if (seconds === 0) {
                                    clearInterval(timer);
                                    API.moderateBanUser(dj.id, 1, API.BAN.HOUR)
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
    for (var i = 0, l = wl.length; i < l; i++) {
        }
    }
});
API.on(API.USER_LEAVE, function(data) {
    for (var i = 0, l = wl.length; i < l; i++) {
        if (globalWaitList[i].username === data.username) {
            dcListId.push(data.username);
            dcListPos.push(i);
            
        }
    }
});
/*
    Test Command
*/
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message === "!test") {
        var d = new Date();
        var n = d.getTime();
        var g = (3 - 2);
        alert("hello");
        alert(JSON.stringify(g));
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
