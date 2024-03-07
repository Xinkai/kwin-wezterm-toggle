KWin-WezTerm-Toggle
-------------------

This is a KWin script for toggling the visibility of WezTerm.

Works with KWin 6 + Wayland. There is also a KWin 5 branch.

Useful before it is natively provided: https://github.com/wez/wezterm/issues/1751

# Installation
```shell
# This script does not start WezTerm. It is up to you how you start WezTerm.

# 1. Clone this repo
cd $ThisRepo

# 2. Adjust `KEY_SEQUENCE` in `main.js` if you want.
head contents/code/main.js

# 3. Install kwin script
kpackagetool6 --type=KWin/Script --install .
```

# Other commands
```shell
# Uninstall
kpackagetool6 --type=KWin/Script --remove wezterm-toggle # Needs logout, because KWin wouldn't unregister old hotkey and its callback.

# Debug
plasma-interactiveconsole --kwin
qdbus org.kde.KWin /KWin showDebugConsole
journalctl --user --boot 0 --follow --identifier kwin_wayland

# List
kpackagetool6 --type=KWin/Script --list # --global
```

# License
MIT License.
