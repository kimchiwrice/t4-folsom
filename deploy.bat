@echo off
set PATH=%PATH%;C:\Program Files\nodejs
cd /d "C:\Users\Sean T\trinh-media\t4-folsom"
npx vercel --yes --prod 2>&1
pause
