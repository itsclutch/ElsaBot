/*
    ElsaBot Version
*/
var version = 2.3;
/*
    Welcome Message
*/
API.sendChat("Elsabot Version " + version + " is active!");
/*
    Status message
*/
API.on(API.USER_JOIN, function(data) {
    //API.sendChat("hi! @" + data.username + "! I am currently testing a bot. Ping me to say hi :ravechu:")
});
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
                    for (var i = 0, l = wl.length; i < l; i++) {
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
    globalWaitList = API.getWaitList();
    var timeNow;
    timeNow = Date.now();
    for (var i = 0, l = dcTime.length; i < l; i++) {
        var g = (timeNow - dcTime[i]);
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
            var timeNow;
            timeNow = Date.now();
            dcListId.push(data.username);
            dcListPos.push(i);
            dcTime.push(timeNow);
        }
    }
});
API.on(API.USER_JOIN, function(data) {
    for (var i = 0, l = dcListId.length; i < l; i++) {
        if (data.id === dcListId[i]) {
            var wl = [];
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
var timeOfLastSwap;
var swapperId;
var swapperPos;
var swappeeId;
var swappeePos;
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message.substring(0,5) === "!swap") {
        var swapAttempt;
        swapAttempt = Date.now();
        var elapsedTime;
        elapsedTime = (swapAttempt - timeOfLastSwap);
        if (elapsedTime > 60000 || timeOfLastSwap === undefined) {
            var swapArray = [];
            swapArray = data.message.split(" ");
            var wl = [];
            wl = API.getWaitList();
            for (var i = 0, l = wl.length; i < l; i++) {
                if (data.un === wl[i].username) {
                    for (var j = 0, k = wl.length; j < k; j++) {
                        if (swapArray[1].substring(1) === wl[j].username) {
                            if (i < j) {
                                API.sendChat("Hey, " + swapArray[1] + ", " + "@" + data.un + " would like to swap with you. Type !swapaccept to swap");
                                swapperId = wl[i].id;
                                swappeeId = wl[j].id
                                swapperPos = i;
                                swappeePos = j;
                            }
                        }
                    }
                }
            }
        }
    }
});
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message === "!swapaccept") {
        if (data.uid === swappeeId) {
            API.moderateMoveDJ(data.uid, swapperPos);
            API.moderateMoveDJ(swapperId, swappeePos);
            timeOfLastSwap = Date.now();
            swappeeId = 1;
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
    Load Local Storage
*/
if (localStorage.moniesId === undefined) {
    localStorage.moniesId = "[1,2]";
}
if (localStorage.moniesValue === undefined) {
    localStorage.moniesValue = "[1,2]";
}
var moniesId = JSON.parse(localStorage.moniesId);
var moniesValue = JSON.parse(localStorage.moniesValue);
/*
    Monies Updater
*/
var woots = 0;
var mehs = 0;
var grabs = 0;
API.on(API.ADVANCE, function(data) {
    var newMonies;
    var playedBefore = false;
    newMonies = (data.lastPlay.score.positive + (data.lastPlay.score.grabs * 10) + data.lastPlay.score.negative - woots - mehs - (grabs * 10) + 10);
    for (var i = 0, l = moniesId.length; i < l; i++) {
        if (data.lastPlay.dj.id === moniesId[i]) {
            moniesValue[i] = (moniesValue[i] + newMonies);
            playedBefore = true;
        }
    }
    if (playedBefore === false) {
        moniesId.push(data.lastPlay.dj.id);
        moniesValue.push(newMonies);
    }
    setTimeout(function() {
        woots = API.getScore().positive;
        mehs = API.getScore().negative;
        grabs = API.getScore().grabs;
    },5000);
    localStorage.moniesValue = JSON.stringify(moniesValue);
    localStorage.moniesId = JSON.stringify(moniesId);
    API.sendChat("@" + data.lastPlay.dj.username + " earned " + newMonies + " monies");
});
/*
    Monies Check
*/
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message === "!monies") {
        var hasMonies;
        hasMonies = false;
        for (var i = 0, l = moniesId.length; i < l; i++) {
            if (data.uid === moniesId[i]) {
                API.sendChat("@" + data.un + " you have " + moniesValue[i] + " monies");
                hasMonies = true;
            }
        }
        if (hasMonies = false) {
            API.sendChat("@" + data.un + "you don't have any monies");
        }
    }
});
/*
    Duel
*/
var dueler;
var duelee;
var timeOfLastDuel;
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message.substring(0,5) === "!duel") {
        var timeNow;
        timeNow = Date.now();
        var elapsedTime;
        elapsedTime = (timeNow - timeOfLastDuel);
        if (elapsedTime > 1 || timeOfLastDuel === undefined) {
            var duelArray = [];
            var allUsers = [];
            allUsers = API.getUsers();
            duelArray = data.message.split(" ");
            dueler = data.un;
            duelee = duelArray[1].substring(1);
            timeOfLastDuel = Date.now();
            API.sendChat("@" + duelee + ", @" + dueler + ' has challenged you to a duel. "Type !come at me bro" to duel');
        }
    }
});
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message === "!come at me bro") {
        if (data.un === duelee) {
            var x;
            x = Math.floor((Math.random() * 2) + 1);
            if (x === 1) {
                API.sendChat("@" + duelee + " has won the duel!");
                duelee = "done";
            }
            if (x === 2) {
                API.sendChat("@" + dueler + " has won the duel!");
                duelee = "done";
            }
        }
    }
});
/*
    Flower
*/
var flowerGiver;
var flowerReciever;
var timeOfLastFlower;
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message.substring(0,7) === "!flower") {
        var timeNow;
        timeNow = Date.now();
        var elapsedTime;
        elapsedTime = (timeNow - timeOfLastFlower);
        if (elapsedTime > 1 || timeOfLastFlower === undefined) {
            var flowerArray = [];
            flowerArray = data.message.split(" ");
            flowerGiver = data.un;
            flowerReciever = flowerArray[1].substring(1);
            timeOfLastFlower = Date.now();
            API.sendChat("@" + flowerGiver + ", @" + flowerReciever + ' has offered you a flower. Type "!take the flower"to take it');
        }
    }
});
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message === "!take the flower") {
        if (data.un === flowerReciever) {
            API.sendChat("@" + flowerReciever + " smells the flower");
        }
    }
});
/*
    Marriage Commands
*/
var timeOfPropose;
var proposer;
var fiance;
var proposeChat;
proposeChat = false;
API.on(API.CHAT, function(data) {
    if (data.message.substring(0,8) === "!propose") {
        var timeNow;
        timeNow = Date.now();
        var elapsedSinceLastPropose;
        elapsedSinceLastPropose = (timeNow - timeOfPropose);
        if (elapsedSinceLastPropose < 3600000 || timeOfPropose === undefined) {
            var marryArray = [];
            marryArray = data.message.split(" ");
            var allUsers = [];
            allUsers = API.getUsers();
            alert(marryArray[1].substring(1));
            for (var i = 0, l = allUsers.length; i < l; i++) {
                if (marryArray[1].substring(1) === allUsers[i].username) {
                    alert("test2")
                    fiance = allUsers[i].username;
                    proposer = data.un;
                    timeOfPropose = Date.now();
                    proposeChat = true;
                    API.sendChat("@" + data.un + " asks " + "@" + marryArray[1].substring(1) + ' to marry them. Type "!I do" to accecpt');
                }
            }
        }
    }
});
API.on(API.CHAT, function(data) {
    if (data.un === fiance) {
        if (data.type === "message" && data.message === "!I do") {
            var timeOfAnswer;
            timeOfAnswer = Date.now();
            var elapsedTime;
            elapsedTime = (timeOfAnswer - timeOfPropose);
            if (elapsedTime < 60000) {
                API.sendChat("@" + fiance + ", @" + proposer + ", I now pronouce you to be wed.");
            }
        }
    }
});
/*
    Roulette
*/
var rouletteStatus;
rouletteStatus = false;
var rouletteEntries = [];
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message === "!roulette") {
        var staff = [];
        staff = API.getStaff();
        for (var i = 0, l = staff.length; i < l; i++) {
            if (data.un === staff[i].username) {
                if (staff[i].role > 1) {
                    var lastRoulette;
                    lastRoulette = Date.now();
                    if (rouletteStatus === false) {
                        API.sendChat("@" + data.un + " has started a roulette. Type !join to enter.");
                        rouletteStatus = true;
                        setTimeout(function() {
                            rouletteStatus = false;
                            var winner;
                            winner = Math.floor((Math.random() * rouletteEntries.length) + 1);
                            var wl = [];
                            wl = API.getWaitList();
                            var winnerPos;
                            winnerPos = Math.floor((Math.random() * wl.length) + 1);
                            var allUsers = [];
                            allUsers = API.getUsers();
                            var winnerName;
                            for (var i = 0, l = wl.length; i < l; i++) {
                                if (allUsers[i].id === rouletteEntries[winner]) {
                                    winnerName = allUsers[i].username;
                                }
                            }
                            for (var i = 0, l = wl.length; i < l; i++) {
                                if (rouletteEntries[winner] === wl[i].id) {
                                    API.sendChat("@" + winnerName + " won the roulette and will be moved to position " + winnerPos);
                                    API.moderateMoveDJ(wl[i].id, winnerPos);
                                    rouletteEntries = [];
                                } 
                                else if (wl.length < 50) {
                                    API.sendChat("@" + winnerName + " won the roulette and will be moved to position " + winnerPos);
                                    API.moderateAddDJ(JSON.stringify(rouletteEntries[winner]));
                                    API.moderateMoveDJ(rouletteEntries[winner], winnerPos);
                                    rouletteEntries = [];
                                }
                                else {
                                    API.moderateLockWaitList(true, false);
                                    API.sendChat("@" + winnerName + " won the roulette and will be moved to position " + winnerPos);
                                    var timer;
                                    timer = setInterval(secondPassed, 1000);
                                    function secondPassed() {
                                        if (wl.length < 50) {
                                            clearInterval(timer);
                                            API.moderateAddDJ(JSON.stringify(rouletteEntries[winner]));
                                            API.moderateMoveDJ(rouletteEntries[winner], winnerPos);
                                            API.moderateLockWaitList(false, false);
                                            rouletteEntries = [];
                                        } 
                                        else {
                                            wl = API.getWaitList();
                                        }
                                    }
                                }
                            }
                        }, 20000);
                    }
                }
            }
        }
    }
});
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message === "!join") {
        if (rouletteStatus === true) {
            rouletteEntries.push(data.uid);
        }
    }
});
// test
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message === "!test") {
        alert(JSON.stringify(data));
    }
});
/*
    Delete commands from chat
*/
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message.substring(0,1) === "!") {
       API.moderateDeleteChat(data.cid);
    }
});
