/*
    namespace variables
*/
var version = 3.4;
/*

    Mainline code
    
*/
/*
    Welcome Message
*/
API.sendChat("elsabot ver" + version + " is active!");
/*
    Wailist Property Test
*/
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message === "!getwlprop") {
        wl = [];
        wl = API.getWaitlist;
        alert(JSON.stringify(wl));
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
                    if(data.type === "message" && data.message.substring(5) !== null) {
                        alert(data.message.substring(5));
                        var wl = [];
                        wl = API.getWaitList();
                        if(wl.length < 50) {
                            alert("pause")
                            API.moderateAddDj(dj.id);
                            API.moderateMoveDJ(dj.id, 3);
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
                            alert("found the dj in the waitlist")
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
    Delete commands from chat
*/
API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message.substring(0,1) === "!") {
        API.moderateDeleteChat(data.cid);
    }
});
