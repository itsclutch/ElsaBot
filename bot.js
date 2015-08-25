/*
    namespace variables
*/
var version = 3.4;
/*
    Mainline code
*/
API.sendChat("elsabot ver" + version + " is active!");

/*
    Skip Commands
*/

//regular skip

API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message === "!skip") {
        var staff = [];
        staff = API.getStaff();
        for (var i = 0, l = staff.length; i < l; i++) {
            if (data.un === staff[i].username) {
                if (staff[i].role > 1) {
                    API.moderateForceSkip();
                    API.sendChat(data.un + " skipped your song");
                }
            }
        }
    }
});

// overplayed skip

API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message === "!opskip") {
        var staff = [];
        staff = API.getStaff();
        for (var i = 0, l = staff.length; i < l; i++) {
            if (data.un === staff[i].username) {
                if (staff[i].role > 1) {
                    API.moderateForceSkip();
                    API.sendChat(data.un + " skipped your song because it is overplayed");
                } 
            }
        }
    }
});

//blacklist skip

API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message === "!blskip") {
        var staff = [];
        staff = API.getStaff();
        for (var i = 0, l = staff.length; i < l; i++) {
            if (data.un === staff[i].username) {
                if (staff[i].role > 1) {
                    API.moderateForceSkip();
                    API.sendChat(data.un + " skipped your song because it's blacklisted");
                }
            }
        }
    }
});

//move command

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
                        } else {
                            API.moderateLockWaitList(true, false);
                            var all = [];
                            all = API.getUsers();
                            for (var i = 0, l = all.length; i < l; i++) {
                                if (ma[1].substring(1) === all[i].username) {
                                    API.moderateAddDJ(all[i].id);
                                    setTimeout()
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
