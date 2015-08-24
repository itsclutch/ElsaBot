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

API.on(API.CHAT, function(data) {
  if(data.type === "message" && data.message === "!testcmd") {
    API.moderateDeleteChat(data.cid);
    if (data.un === "zenopie") { 
      //alert(API.getStaff());
      alert("testcmd");
    }
  }
});
