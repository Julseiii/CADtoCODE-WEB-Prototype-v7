const notifCount = document.getElementById("notifCount");
const feedList = document.getElementById("feedList");
const channel = new BroadcastChannel("TANAW_ALERTS");
const notifPanel = document.getElementById("notifPanel");
const openNotif = document.getElementById("openNotif");
const notifBack = document.getElementById("notifBack");

function getAlerts() {
  return JSON.parse(localStorage.getItem("alerts") || "[]");
}

function renderFeed() {
  const alerts = getAlerts();

  if (notifCount) {
    notifCount.textContent = alerts.length;
    notifCount.style.display = alerts.length ? "block" : "none";
  }

  if (!alerts.length) {
    feedList.innerHTML = `<p class="feed-empty">No incidents yet</p>`;
    return;
  }

  feedList.innerHTML = alerts.map((a, i) => `
    <div class="feed-card" onclick="openIncident(${i})" style="--type-color:${getTypeColor(a.type)}">
      <div class="feed-icon">${getEmoji(a.type)}</div>
      <div class="feed-info">
        <h4>${a.type}</h4>
        <p>${a.area}</p>
        <small>${timeAgo(a.time)}</small>
      </div>
    </div>
  `).join("");
}

openNotif.onclick = () => {
  notifPanel.classList.remove("hidden");
};

notifBack.onclick = () => {
  notifPanel.classList.add("hidden");
};

function openIncident(i) {
  localStorage.setItem("focusIncident", i);
  location.href = "index.html";
}

function getEmoji(t) {
  return {Roadwork:"🚧",Traffic:"🚦",Flood:"🌊",Crash:"🚗",Fire:"🔥"}[t] || "⚠️";
}

function getTypeColor(t) {
  return {Roadwork:"#f9a825",Traffic:"#fbc02d",Flood:"#1976d2",Crash:"#d32f2f",Fire:"#f57c00"}[t];
}

function timeAgo(t) {
  const m = Math.floor((Date.now() - t) / 60000);
  return m < 1 ? "Just now" : `${m} min ago`;
}

channel.onmessage = renderFeed;
renderFeed();
