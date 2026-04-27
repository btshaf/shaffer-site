#!/bin/bash

echo "=== Portfolio Site Push Script ==="
echo ""
echo "Option 1: Manual GitHub Upload"
echo "1. Go to https://github.com/btshaf/shaffer-site"
echo "2. Click 'uploading an existing file'"
echo "3. Drag the entire 'bshaffer-site' folder"
echo ""
echo "Option 2: GitHub CLI (if working)"
echo "Run: gh auth login --web"
echo "Then: git push -u origin main"
echo ""
echo "Option 3: SSH Setup"
echo "1. Generate SSH key: ssh-keygen -t ed25519 -C 'brad@bshaffer.co'"
echo "2. Add to GitHub: https://github.com/settings/ssh/new"
echo "3. Copy key: cat ~/.ssh/id_ed25519.pub"
echo "4. Change remote: git remote set-url origin git@github.com:btshaf/shaffer-site.git"
echo "5. Push: git push -u origin main"
echo ""
echo "Your commit is ready locally. Files committed:"
git log --oneline -1
echo ""
git status