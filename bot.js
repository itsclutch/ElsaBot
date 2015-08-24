/*
    namespace variables

 */
 
var version = 3.1;

/*
    Mainline code
*/

API.sendChat("elsabot ver" + version + " is active!");

/*
    chat_command api funtionality
*/

API.on(API.CHAT_COMMAND, function(value) {
  alert(value + ' typed as chat command');
});

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
        API.moderateDeleteChat(data.cid);
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
        API.moderateDeleteChat(data.cid);
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
        API.moderateDeleteChat(data.cid);
    }
});

/*
    Move Command (INCOMPLETE!!!)
*/

API.on(API.CHAT, function(data) {
    if (data.type === "message" && data.message.substring(0,4) === "!move") {
        var staff = [];
        staff = API.getStaff();
        for (var i = 0, l = staff.length; i < l; i++) {
            if (data.un === staff[i].username) {
                if (staff[i].role > 1) {
                    var movearray = data.message.split(" ");
                    alert(movearray)
                }
            }
        }
        API.moderateDeleteChat(data.cid);
    }
});

/*
the following commands are prototypes used during development
//
API.on(API.CHAT, function(data) {
  if(data.type === "message" && data.message === "!testcmd") {
    API.moderateDeleteChat(data.cid);
    if (data.un === "zenopie") {
      //alert("t1");
      var staff = [];
      staff = API.getStaff();
      //alert("nr on staff =" + staff.length);
      alert("staff [0] " + staff[0].role + staff[0].username);
      //alert("testcmds");
    }
  }
});

API.on(API.CHAT, function(data) {
  if(data.type === "message" && data.message === "!ping") {
    API.moderateDeleteChat(data.cid);
    API.sendChat("!pong");
  }
});

*/
