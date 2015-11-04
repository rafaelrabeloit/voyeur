@echo off

cls

cd ..

set PROJECT=
for %%* in (.) do set PROJECT=%%~n*
echo -Watch for: %PROJECT%

echo Starting compass
echo.
start "compass on %PROJECT%" cmd /c "cd src && compass watch && exit"

echo Listining for changes in templates
echo CTRL+C to quit
echo.
echo.

set project=
for %%* in (.) do set project=%%~n*
set hash=%TMP%\%project%.watch.hash
set wtmp=%TMP%\%project%.watch.tmp

::dir src\app\templates\*.tpl /a:-d |find "/" > hash
call npm install
call grunt compile

dir src\app\templates\*.tpl /a:-d |find "/" > "%hash%"
dir src\app\templates\*.tpl /a:-d |find "/" > "%wtmp%"

set response=
for /f "tokens=*" %%a in ('fc "%hash%" "%wtmp%"') do (
    set response=%%a
)

:START
timeout /t 2 /nobreak > nul

dir src\app\templates\*.tpl /a:-d |find "/" > "%wtmp%"

set res=
for /f "tokens=*" %%a in ('fc "%hash%" "%wtmp%" ^| find "%response%"') do set res=%%a

if not "%res%"=="" goto START

echo.
echo --------- changes detected! -----------
echo.

call grunt compile
dir src\app\templates\*.tpl /a:-d |find "/" > "%hash%"

goto START
:END