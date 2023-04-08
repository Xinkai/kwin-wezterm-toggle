KWin-WezTerm-Toggle
-------------------

# Usage

```shell
# Install
kpackagetool5 --type=KWin/Script -i .

# Uninstall
kpackagetool5 --type=KWin/Script -r wezterm-toggle # Needs logout, because KWin wouldn't unregister old hotkey and its callback.

# Debug
plasma-interactiveconsole --kwin

# List
kpackagetool5 --type=KWin/Script --list # --global
```
