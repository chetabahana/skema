/* 
this script is a local start-commit hook script.

ref:
https://stackoverflow.com/a/39960300/4058484
https://stackoverflow.com/a/64723713/4058484
https://stackoverflow.com/a/55968763/4058484
https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks
https://github.com/mrpapercut/wscript#supported-objects
https://www.robvanderwoude.com/vbstech_data_environment.php
https://gist.github.com/BoGnY/f9b1be6393234537c3e247f33e74094a
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
https://docs.microsoft.com/en-us/previous-versions//4yyeyb0a(v=vs.85)
https://www.vbsedit.com/html/6f28899c-d653-4555-8a59-49640b0e32ea.asp
https://stackoverflow.com/questions/27539157/scripting-git-commands-in-windows
*/

var line;

var ForReading = 1;
var ForWriting = 2;

var objArgs = WScript.Arguments;
var sh = new ActiveXObject("WScript.Shell");
var fs = new ActiveXObject("Scripting.FileSystemObject");
var f = "C:/Users/Chetabahana/Searches/hook-scripts/git_message.txt";

if (objArgs.length !== 3)
{
    WScript.Echo("Usage: [CScript | WScript] StartCommit.js path/to/pathsfile path/to/messagefile path/to/CWD ");
    WScript.Quit(1);
}

function readPaths(path)
{
    var retPaths = [];
    if (fs.FileExists(path))
    {
        var a = fs.OpenTextFile(path, ForReading);
        while (!a.AtEndOfStream)
        {
            line = a.ReadLine();
            retPaths.push(line);
        }
        a.Close();
    }
    return retPaths;
}

var paths = readPaths(objArgs(0));
var subject = "Update " + line;
var message = "Files related to this commit are:\n";

for (var i = 0; i < paths.length; i++)
{
    message = message + paths[i] + "\n";
}

message = message + "\nDocumentation are available in bahasa:";
message = message + "\nhttps://github.com/chetabahana/chetabahana.github.io/wiki";
message = message + "\nhttps://github.com/chetabahana/chetabahana.github.io/wiki/Project-Online";

/* WScript %root%\.github\hook-scripts\StartCommit.js
WScript.Echo(sh.ExpandEnvironmentStrings("%path%"));*/

var w = fs.OpenTextFile(f, ForWriting);
sh.Run("git config commit.template " + f, 0);
w.WriteLine(subject); w.WriteBlankLines(1); w.WriteLine(message); w.Close();

WScript.Quit(0);
