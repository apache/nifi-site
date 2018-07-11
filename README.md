<!--
  Licensed to the Apache Software Foundation (ASF) under one or more
  contributor license agreements.  See the NOTICE file distributed with
  this work for additional information regarding copyright ownership.
  The ASF licenses this file to You under the Apache License, Version 2.0
  (the "License"); you may not use this file except in compliance with
  the License.  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
-->
# About
[Apache NiFi project] (http://nifi.apache.org).

## Setting up Build Environment

The site is built using [grunt][] task runner, [bower][] package manager for
the web, and [npm][] package manager for node. npm is used to manage the
node modules required for building this site. bower is used to manage the
front end packages that the site will depend on.

Both grunt and bower can be installed simultanously via npm once it is installed.

```bash
sudo npm install --global grunt-cli bower
```

To download the front end packages required for this site run the following
command from the nifi-site directory.

```bash
bower install
```

To install the node modules required to build this site run the following
command from the nifi-site directory.

```bash
npm install
```

The site is built using [foundation][] a responsive front end framework.
Consequently, the site is using [sass][] and [compass][] for CSS pre-processing.
This will also require ruby to be installed along with sass and compass. Please
follow the appropriate steps for installing Ruby in your environment.

Only Ruby is installed, both sass and compass can be installed via ruby gem with
the following command.

```bash
gem install compass
```

Additionally, deploying the site will require SVN 1.6+.

[grunt]: http://gruntjs.com/
[bower]: http://bower.io/
[npm]: http://www.npmjs.com/
[foundation]: http://foundation.zurb.com/
[sass]: http://sass-lang.com/
[compass]: http://compass-style.org/

### Linux Environments

Users running on Linux may need to install the ruby development package using
one of the following commands.

```bash
sudo yum install ruby-devel
```
```bash
sudo apt-get install ruby-dev
```

Additionally, it may also be necessary to install the `nodejs-legacy` package in order for
grunt to run properly:

```bash
sudo apt-get install nodejs-legacy
```

Once the necessary gems are installed, it is important that the gems' executable directory is
in the user's PATH. For example:

```bash
export PATH=$PATH:/home/username/bin
```

**NOTE:** it is important that the fully qualified directory name be used. Simply using `~/bin` will
result in errors when running Grunt, such as:

```
Running "compass:dist" (compass) task
```

```
Warning: You need to have Ruby and Compass installed and in your system PATH for this task to work.
More info: https://github.com/gruntjs/grunt-contrib-compass Use --force to continue.
```

```
Aborted due to warnings.
```

It is recommended that you update your environment's configuration so that this is always in your PATH,
as this will be required every time that grunt is run.

## Grunt Tasks

To build the site run the default grunt task. This will assemble the site and
place the resulting site in the dist folder. Part of this assembly is actually
building the various guides and Rest Api documentation bundled in the application.
Because of this, Maven must be installed and available on the PATH. Additionally Java
must be installed in order for the Maven build to succeed. Refer to the [NiFi][]
documentation for minimum requirements for Maven and Java.

[NiFi]: https://nifi.incubator.apache.org/quickstart.html

```bash
grunt
```

If developing new content/features for the site, it may be helpful to run
the dev task which will build the site and continue to watch the source
files for changes. Any changes will cause the site to be rebuilt.

```bash
grunt dev
```

To deploy new changes to the live site, run the deploy task

```bash
grunt deploy
```

This will go through each step required to deploy changes to the site. Updates
are performed by committing to a SVN repository. This means that svn must be installed
and available on the PATH. Additionally, it requires SVN 1.6+. The deployment
process will show the files being committed and provide an option to view a diff,
proceed with the commit, or abort.

## Source overview

### src/includes

Contains fragments that will be included on all pages of the site. Most notably
here is the topbar.hbs that defines the Menus on the top of the site. If a new
page is being added or removed it is done here.

### src/pages/html

Contains pages that are written in HTML. Any new HTML based content should reside here.

### src/pages/markdown

Contains pages that are written in Markdown. Any new Markdown based content should
reside here.

## Application Style Properties

### Font
- Oswald: http://www.google.com/fonts/specimen/Oswald

### Colors
- 'ni':  #7A96A4
- 'fi':  #0F3541
- Toolbox:  #7299AC
- Toolbar:  #A0BAC7
- Flow Status: #D9E4E8
- Utilities: #81A0B4

## Technologies & Resources
- HTML5
- CSS3
- Foundation
- jQuery
- Modernizr
- Google Fonts API
- Web Font Loader
- FontAwesome

## License

Except as otherwise noted this software is licensed under the
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

