/*
    namespace variables
*/
/*
    ElsaBot Version
*/
var version = 3.4;
/*
    Welcome Message
*/
API.sendChat("Elsabot Version " + version + " is active!");
/*
    Wailist Property Test
*/
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message === "!getwlprop") {
        wl = [];
        wl = API.getWaitlist;
        alert(JSON.stringify(wl));
        API.moderateAddDJ(data.uid);
    }
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
                    alert(skiparray[1]);
                    if(skiparray[1] !== undefined) {
                        var wl = [];
                        wl = API.getWaitList();
                        if (skiparray[1] === "op") {
                            if (wl.length < 50) {
                                alert(JSON.stringify(dj));
                                API.moderateAddDJ(JSON.stringify(dj.id));
                                API.moderateMoveDJ(dj.id, 3);
                                if (wl.length === 50) {
                                    do {
                                        API.moderateLockWaitList(true, false);
                                        setTimeout(function() { API.moderateAddDJ(JSON.stringify(dj.id)); } , 5000);
                                        wl = API.getWaitList();
                                    }
                                    while (wl.length === 50);
                                    API.moderateMoveDJ(dj.id, 3);
                                    API.moderateLockWaitList(false, false);
                                    API.sendChat(data.un + " skipped the song because it's overplayed.")
                                }
                            }
                        }
                        if (skiparray[1] === "theme") {
                            if (wl.length < 50) {
                                alert(JSON.stringify(dj));
                                API.moderateAddDJ(JSON.stringify(dj.id));
                                API.moderateMoveDJ(dj.id, 3);
                                if (wl.length === 50) {
                                    do {
                                        API.moderateLockWaitList(true, false);
                                        setTimeout(function() { API.moderateAddDJ(JSON.stringify(dj.id)); } , 5000);
                                        wl = API.getWaitList();
                                    }
                                    while (wl.length === 50);
                                    API.moderateMoveDJ(dj.id, 3);
                                    API.moderateLockWaitList(false, false);
                                    API.sendChat(data.un + " skipped the song because it doesn't fit the room theme.")
                                }
                            }
                        }
                        if (skiparray[1] === "nsfw") {
                            if (wl.length < 50) {
                                alert(JSON.stringify(dj));
                                API.moderateAddDJ(JSON.stringify(dj.id));
                                API.moderateMoveDJ(dj.id, 3);
                                if (wl.length === 50) {
                                    do {
                                        API.moderateLockWaitList(true, false);
                                        setTimeout(function() { API.moderateAddDJ(JSON.stringify(dj.id)); } , 5000);
                                        wl = API.getWaitList();
                                    }
                                    while (wl.length === 50);
                                    API.moderateMoveDJ(dj.id, 3);
                                    API.moderateLockWaitList(false, false);
                                    API.sendChat(data.un + " skipped the song because it's NSFW.")
                                }
                            }
                        }
                        if (skiparray[1] === "ban") {
                            API.sendChat("the song you played is so bad you will be banned for an hour in 10 seconds");
                            for( var i = 9; i > 0 ; i-- ) {
                                setTimeout(function() { API.sendchat(i); } , 1000);
                                i = (i - 1);
                            }
                            API.moderateBanUser(dj.id, 1, API.BAN.HOUR);
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
                            API.moderateLockWaitList(true, false);
                            var all = [];
                            all = API.getUsers();
                            for (var i = 0, l = all.length; i < l; i++) {
                                if (ma[1].substring(1) === all[i].username) {
                                    if(wl.length < 50) {
                                        API.moderateAddDj(all[i].id);
                                        API.moderateMoveDJ(wl[i].id, ma[2]);
                                        API.moderateLockWaitList(false, false);
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
        var addarray = [];
        addarray = data.message.split(" ");
        alert(JSON.stringify(addarray));
        if (addarray[1] === "me") {
            alert("pause");
            API.moderateAddDJ(JSON.stringify(data.uid));
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
    Test Command
*/
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message === "!test") {
        API.sendChat("the song you played is so bad you will be banned for an hour in 10 seconds");
        for( var i = 9; i > 0 ; i-- ) {
            setTimeout( function() { API.sendChat(i); }, 1000);
        }
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
