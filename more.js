const channel = new BroadcastChannel("TANAW_ALERTS");

function testAlert() {
  const alert = {
    type: "Crash",
    area: "Reported Area",
    message: "User reported incident",
    lat: 13.6218 + (Math.random() - 0.5) * 0.01,
    lng: 123.1948 + (Math.random() - 0.5) * 0.01,
    time: Date.now()
  };

  const list = JSON.parse(localStorage.getItem("alerts") || "[]");
  list.unshift(alert);
  localStorage.setItem("alerts", JSON.stringify(list));

  channel.postMessage(alert);
}


function clearFeed() {
  localStorage.removeItem("alerts");
  alert("Feed cleared");
  location.reload();
}


function toggleDRRM() {
  alert("DRRM Mode toggled from Map view");
}
