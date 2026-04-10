@echo off
cd /d "%~dp0"
git config --global user.name "kimchiwrice"
git config --global user.email "seantrinh5031@gmail.com"
git init
git add -A
git commit -m "T4 Folsom website - polished version with snacks, ice cream, interior gallery"
echo DONE
