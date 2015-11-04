@echo off

IF NOT "%1"=="" GOTO ATTR

::Read from user
set /p dest="Enter Destination Folder: " %=%
GOTO COMMAND

:ATTR
set dest=%1
GOTO COMMAND

:COMMAND
kdiff3 -config kdiff3.config -b ..\ "%dest%" -m