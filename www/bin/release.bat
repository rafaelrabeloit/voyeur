@echo off

echo.
cd ..
set PROJECT=
for %%* in (.) do set PROJECT=%%~n*
echo -Release for: %PROJECT%

call npm install
echo.
echo.

echo --Cheking version...

set EXPECTED_RESPONSE=
for /f "tokens=*" %%a in ('fc "package.json" "package.json"') do (
    set EXPECTED_RESPONSE=%%a
)
set RESP=
for /f "tokens=*" %%a in ('fc "package.json" "%TMP%\%PROJECT%\package.json" ^| find "%EXPECTED_RESPONSE%"') do set RESP=%%a
if NOT "%RESP%"=="" goto MISSING_VERSION
echo.
echo.

echo --Building...
call grunt release
if NOT %errorlevel%==0 GOTO BUILD_ERROR
echo.
echo.

echo --Done!
GOTO DONE

:MISSING_VERSION
echo.
echo.
echo ERROR: package.json must have a new version!
GOTO DONE

:BUILD_ERROR
echo.
echo.
echo ERROR: Error building release!
GOTO DONE

:DONE
echo.
echo.
pause