/*
    namespace variables
*/
var version = 3.4;
/*
    Mainline code
*/
API.sendChat("boop")
/*
    chat_command api funtionality
*/
API.on(API.CHAT_COMMAND, function(data) {
  if data === "getwl" {
      var wl = [];
      wl = API.getWaitList();
      alert(JSON.stringify(wl));
  }
});
/*
    Move Command (INCOMPLETE!!!)
*/
/*
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

//ping

API.on(API.CHAT, function(data) {
  if(data.type === "message" && data.message === "!ping") {
    API.moderateDeleteChat(data.cid);
    API.sendChat("!pong");
  }
});

