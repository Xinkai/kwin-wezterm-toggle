"use strict";

const VER = "0.13";
let wezTermCaught = null;
let oldActive = null;

function log(...args) {
    console.log(`WezTermToggle ${VER}`, ...args);
}

function error(...args) {
    console.error(`WezTermToggle ${VER}`, ...args);
}

function isWezTerm(client) {
    return client.resourceClass === "org.wezfurlong.wezterm";
}

function findWezTerm() {
    const clients = workspace.clientList();
    for (const client of clients) {
        if (isWezTerm(client)) {
            return client;
        }
    }
    return null;
}

function dirObj(obj) {
    for (const attr in obj) {
        if (attr.endsWith("Changed")) {
            continue;
        }
        log("dirObj", attr, typeof(obj[attr]));
    }
}

function showWezTerm(wezTerm) {
    wezTerm.keepAbove = true;
    if (!isWezTerm(workspace.activeClient)) {
        oldActive = workspace.activeClient;
        log("setting oldActive", oldActive.resourceClass);
    }
    workspace.activeClient = wezTerm;
}

function hideWezTerm(wezTerm) {
    wezTerm.keepAbove = false;
    if (oldActive) {
        log("showing oldActive", oldActive.resourceClass);
    }
    workspace.activeClient = oldActive;
    wezTerm.minimized = true;
}

function initSetup(wezTerm) {
    log("Initial setup");
    // wezTerm.minimized = true;
   //  wezTerm.fullScreen = true;
    wezTerm.skipTaskbar = true;
    wezTerm.skipPager = true;
    wezTerm.skipSwitcher = true;
    wezTermCaught = wezTerm;
}

function toggle(_qAction) {
    let wezTerm = wezTermCaught;
    if (wezTerm === null) {
        wezTerm = findWezTerm();
        if (wezTerm !== null) {
            initSetup(wezTerm);
        }
    }

    if (wezTerm === null) {
        error("WezTerm not found");
        return;
    }

    if (wezTerm.minimized) {
        log("minimized!");
        showWezTerm(wezTerm);
    } else {
        log("not minimized!");
        hideWezTerm(wezTerm);
    }
}


function main() {
    try {
        workspace.clientAdded.connect((client) => {
            if (isWezTerm(client)) {
                initSetup(client);
                log("Caught!", wezTermCaught);
            }
        });

        workspace.clientRemoved.connect((client) => {
            if (isWezTerm(client)) {
                wezTermCaught = null;
                log("WezTerm removed!");
            }
        });

        const registered = registerShortcut("WezTermToggle", "WezTermToggle", "Meta+Alt+`", toggle);
        if (registered) {
            log("Registered");
        } else {
            error("Failed to register");
        }
    } catch (e) {
        error(e);
    }
}

main();
