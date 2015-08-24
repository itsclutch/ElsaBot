API.on(API.CHAT_COMMAND, callback);
function callback(value) {
  alert(value + ' typed as chat command');
}

API.on(API.CHAT, function(data) {
if(data.type === "message" && data.message === "!skip") {
    API.moderateDeleteChat(data.cid);
    API.moderateForceSkip()
}
});
/*
the following commands are prototypes used during development
*/
API.on(API.CHAT, function(data) {
  if(data.type === "message" && data.message === "!testcmd") {
    API.moderateDeleteChat(data.cid);
    if (data.un === "zenopie") {
      alert("t1");
      var staff = [];
      staff = alert(API.getStaff());
      alert("nr on staff =" + staff.length);
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
