@echo off

set arg1=%1
set dir=src/app/components/%arg1%
set ts=%dir%/%arg1%.component.ts

for /F "tokens=1,2 delims=-" %%a in ("%arg1%") do set z0=%%a& set z1=%%b

call :upperfirst z0
call :upperfirst z1

set final=%z0%%z1%

mkdir "%dir%"

echo[> %dir%/%arg1%.component.html
echo[> %dir%/%arg1%.component.scss
echo import {Component} from '@angular/core';> %ts%
echo[>> %ts%
echo @Component({>> %ts%
echo     selector: '%arg1%',>> %ts%
echo     templateUrl: '%arg1%.component.html',>> %ts%
echo     styleUrls: ['%arg1%.component.css']>> %ts%
echo })>> %ts%
echo export class %final%Component {>> %ts%
echo }>> %ts%
goto :eof

:upperfirst
call set "y0=%%%1%%"
set sub0=%y0:~0,1%
set alpha=1aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ
for /F "tokens=1,2 delims=%sub0%" %%a in ("%alpha%") do set x0=%%b
set sub0=%x0:~0,1%
set %1=%sub0%%y0:~1%
goto :eof
