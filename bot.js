/*
    namespace variables

 */
 
var version = 2.9;

/*
    Mainline code
*/

API.sendChat("elsabot ver" + version + " is active!");

/*
    callback definitions 
*/

API.on(API.CHAT_COMMAND, function(value) {
  alert(value + ' typed as chat command');
});

API.on(API.CHAT, function(data) {
    alert(data.username + "," + data.un);
    if (data.type === "message" && data.message === "!skip") {
        var staff = [];
        staff = API.getStaff();
        for(i=0; i < staff.length; i++) {
            if (data.username === staff[i].username) {
                if (staff[i].role >== 2) {
                    API.moderateDeleteChat(data.cid);
                    API.moderateForceSkip();
                }
            }
        }
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
