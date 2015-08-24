API.on(API.CHAT_COMMAND, callback);
function callback(value) {
  alert(value + ' typed as chat command');
}
API.on(API.CHAT, function(data){
if(data.type === "message" && data.message === "!commands"){
API.moderateDeleteChat(data.cid);
}
});
