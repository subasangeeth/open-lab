const express = require("express");
const os = require("os");
const http = require("http");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// Metadata function
const http = require("http");

// Get IMDSv2 token
function getToken() {
    return new Promise((resolve, reject) => {
        const req = http.request({
            host: "169.254.169.254",
            path: "/latest/api/token",
            method: "PUT",
            headers: {
                "X-aws-ec2-metadata-token-ttl-seconds": "21600"
            }
        }, (res) => {
            let data = "";
            res.on("data", chunk => data += chunk);
            res.on("end", () => resolve(data));
        });

        req.on("error", reject);
        req.end();
    });
}

// Get metadata using token
async function getMetadata(path) {
    try {
        const token = await getToken();

        return new Promise((resolve, reject) => {
            http.get({
                host: "169.254.169.254",
                path: "/latest/meta-data/" + path,
                headers: {
                    "X-aws-ec2-metadata-token": token
                }
            }, (res) => {
                let data = "";
                res.on("data", chunk => data += chunk);
                res.on("end", () => resolve(data));
            }).on("error", reject);
        });
    } catch {
        return "N/A";
    }
}

// Get IP
function getIP() {
    const interfaces = os.networkInterfaces();
    for (let name in interfaces) {
        for (let iface of interfaces[name]) {
            if (iface.family === "IPv4" && !iface.internal) {
                return iface.address;
            }
        }
    }
    return "IP not found";
}

// API
app.get("/ip", async (req, res) => {
    try {
        const instanceId = await getMetadata("instance-id");
        const az = await getMetadata("placement/availability-zone");

        res.json({
            ip: getIP(),
            hostname: os.hostname(),
            instanceId,
            availabilityZone: az
        });
    } catch {
        res.json({
            ip: getIP(),
            hostname: os.hostname(),
            instanceId: "N/A",
            availabilityZone: "N/A"
        });
    }
});

// Health check
app.get("/health", (req, res) => {
    res.status(200).send("OK");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
