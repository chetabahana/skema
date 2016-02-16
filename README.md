# XSLTdoc

***XSLTdoc is a Javadoc-like tool for XSLT 2.0.***

See also the [home page](http://xsltdoc.github.io/). This project has recently 
been moved, with kind permission from the original authors Iwan Birrer and 
Alessandro Pasetti, from 
[SourceForge](https://sourceforge.net/projects/xsltdoc/) to a [new home on 
GitHub](https://github.com/XSLTdoc/XSLTdoc/). The migration has preserved 
the original Subversion commit history.


## Using 

The easiest (but not the only) way to use this tool is via Node.js.
If you don't have that installed, and don't want to install it, then
see the section below, "Running manually".

To install the XSLTdoc tool:

```
npm install -g xsltdoc
```

Next, in the project where your XSLT resides, create a configuration file
to control how the tool works. See the tool's [home 
page](http://xsltdoc.github.io/) for information about the format of that file.
The tool expects the file to be named xsltdoc-config.xml, but you can override
that with a command line option.

To run the tool, and generate the documenation:

```
xsltdoc
```

Use the `--help` switch to get some more usage information.

You can run it programmatically from another Node.js script with

```javascript
var xsltdoc = require('xsltdoc');
xsltdoc(opts, function(targetDir) {
  console.log('Done. Documentation written to ' + targetDir);
});
```


## Running manually

Download the latest release, version 1.3.0 from 
[here](https://github.com/XSLTdoc/XSLTdoc/archive/1.3.0.zip).

If you need an older version, you can find them listed 
[here](https://github.com/XSLTdoc/XSLTdoc/releases).

See the [home page](http://xsltdoc.github.io/) for more
detailed instructions on running from the command line using the
`java` command.


## Building

You don't need to build this project in order to run it. If you want to build
it anyway, for whatever reason, this section gives some information about how
to do that.

First of all, note that the original project used the Java build tool Ant.
We've kept that here, and it still works, but we are moving to using Node.js
and npm to manage test and build tasks.

### Building with Ant

The Ant build.xml file has tasks that
create the home page site (using this tool itself), that test the app, and
that create a distribution tarball.

To run any of the build tasks, install and run `ant`. The default task builds 
the pages for the home page, and writes them to the doc directory.

The tool uses SaxonHE 9 to run the XSLT transformations. It is downloaded
automatically, the first time you run the build. The Ant tool puts the
SaxonHE jar into the "jars" subdirectory.

Use `ant -p` to see the list of tasks.


### Building with npm

To install all the dependencies that the main script uses:

```
npm install
```

This uses node-java-maven to fetch SaxonHE from the Maven repository, and
put it into the same place (not by coincidence) as the Ant task.

To test:

```
npm test
```

Currently, the Node.js package.json file invokes `ant` to run the tests, so
you'll have to make sure you have Ant installed even if you're using npm.

To build the documentation for the home page, run

```
npm run make-docs
```

### Publishing docs to GitHub pages

To publish these pages to [the GitHub pages 
site](http://xsltdoc.github.io), first do `npm run make-docs`, then bring the
pages up in a static server to make sure they look okay. Then run

```
npm gh-pages
```

### Releasing and publishing to npm

Here are some instructions with a bunch of manual tests to make sure everything
is working correctly.

Wipe out any temporary directories and files, bump the version number, 
update the release notes, and then:

```
npm uninstall -g .
npm uninstall -g xsltdoc
rm -rf node_modules vendor
npm install
grunt
```

Then check the docs that were just generated. Start `http-server`, and
go to http://localhost:8080/doc, and check everything.

Then make a temp directory as a sibling of this project dir, and do:

```
npm init -f
npm install ../XSLTdoc


npm run gh-pages
#=> Go to https://xsltdoc.github.io, and check it
npm publish
```




## See also 

* [Release notes](release-notes.md)

## To do

* The node-java-maven dependency right now points to a specific commit on
  GitHub, because of a very minor
  fix to remove a `console.log` message. This should be updated whenever 
  it's released again.
* It would be nice to auto-generate documentation for the JavaScript here.
  I did some experimenting with jsdoc (see [this tag]()), docco, and
  grok, but didn't find anything perfect:
    * jsdoc - a bit onerous in terms of getting your structured comments
      just right; especially for CommonJS modules -- it's a bad fit.
    * docco and grok - too *unstructured*. They produce very pretty pages,
      but nothing like API documentation.
* What would be really cool is if we could integrate that JS documentation 
  framework with this XSLTdoc output -- a generalized doc framework.


## Copyright And Licence

*This license information was copied from the [XSLTdoc home
page](http://www.pnp-software.com/XSLTdoc/#CopyrightAndLicence) on
2016-02-14.*

The software and documenation downloadable from this site is made up of the 
following items:

* Software and documentation for the XSLTdoc documentation tool. The copyright 
  for these items belongs to P&P Software. These items can be downloaded and 
  used under the terms of the GNU General Public Licence.
* The The Saxon XSLT and XQuery Processor from Saxonica Limited. This software 
  is used and distributed in accordance with the terms of the Mozilla Public 
  License Version 1.0.
* The XML to HTML Verbatim Formatter with Syntax Highlighting. This software 
  was downloaded from http://www.informatik.hu-berlin.de/~obecker/XSLT/. There 
  was no license information available on this site at the time of downloading 
  (October 2004).

THE XSLTdoc DELIVERABLES ARE PROVIDED "AS IS'' AND ANY EXPRESSED OR IMPLIED 
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF 
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO 
EVENT SHALL THE PROVIDER OF THE SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT, 
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT 
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR 
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF 
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE 
OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF 
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
