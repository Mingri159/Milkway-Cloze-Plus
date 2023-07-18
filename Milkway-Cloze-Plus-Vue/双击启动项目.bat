@echo off

explorer.exe "http://127.0.0.1:8003/"

python -m http.server 8003