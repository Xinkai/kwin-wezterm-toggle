"use strict";

// Configuration Starts
const KEY_SEQUENCE = "Meta+Alt+`";
// Configuration Ends

const VER = "0.15";
let wezTermCaught = null;
let oldActive = null;

function log(...args) {
    console.log(`WezTermToggle ${VER}`, ...args);
}

function error(...args) {
    console.error(`WezTermToggle ${VER}`, ...args);
}

function isWezTerm(win) {
    return win.resourceClass === "org.wezfurlong.wezterm";
}

function findWezTerm() {
    const windows = workspace.windowList();
    for (const win of windows) {
        if (isWezTerm(win)) {
            return win;
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
    if (!isWezTerm(workspace.activeWindow)) {
        oldActive = workspace.activeWindow;
        log("setting oldActive", oldActive.resourceClass);
    }
    workspace.activeWindow = wezTerm;
}

function hideWezTerm(wezTerm) {
    wezTerm.keepAbove = false;
    if (oldActive) {
        log("showing oldActive", oldActive.resourceClass);
    }
    workspace.activeWindow = oldActive;
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
        workspace.windowAdded.connect((win) => {
            if (isWezTerm(win)) {
                initSetup(win);
                log("Caught!", wezTermCaught);
            }
        });

        workspace.windowRemoved.connect((win) => {
            if (isWezTerm(win)) {
                wezTermCaught = null;
                log("WezTerm removed!");
            }
        });

        const registered = registerShortcut("WezTermToggle", "WezTermToggle", KEY_SEQUENCE, toggle);
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
