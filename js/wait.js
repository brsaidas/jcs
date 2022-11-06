Pusher.logToConsole = true;

var pusher = new Pusher('6b8f4e7d19ac052af7a0', {
    cluster: 'us2'
});

let channelName = localStorage.getItem("channel") + "-player2";

var channel = pusher.subscribe(channelName);

channel.bind('start', function(data) {
    alert("Gooo!!!");
    location.href = "./gameMultiplayer.html";
});