@echo off

:infile
set /p infile=Input File: 
set /p outfile=Output File: 
echo.
echo Converting...

"C:\Program Files (x86)\VideoLAN\VLC\vlc.exe" "%infile%" --sout=#transcode{vcodec=none,acodec=mp3,ab=128,channels=2,samplerate=44100}:duplicate{dst=std{access=file,mux=mp3,dst="%output%"}} vlc://quit

echo Convertion done.