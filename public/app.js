let count = 0;

async function fetchData() {
    const status = document.getElementById("status");
    status.innerHTML = '<span class="dot yellow"></span> Fetching...';

    try {
        const res = await fetch("/ip");
        const data = await res.json();

        document.getElementById("ip").innerText = data.ip;
        document.getElementById("host").innerText = data.hostname;
        document.getElementById("iid").innerText = data.instanceId;
        document.getElementById("az").innerText = data.availabilityZone;

        count++;
        document.getElementById("counter").innerText = "Requests: " + count;

        status.innerHTML = '<span class="dot green"></span> Connected';

        // Animation
        const card = document.querySelector(".card");
        card.style.transform = "scale(1.05)";
        setTimeout(() => card.style.transform = "scale(1)", 200);

    } catch (err) {
        status.innerHTML = '<span class="dot red"></span> Failed';
    }
}

// Auto refresh every 3 seconds
setInterval(fetchData, 3000);

// Initial load
fetchData();