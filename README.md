deep-microservices-root-angularjs
=================================

[![Build Status](https://travis-ci.org/MitocGroup/deep-microservices-root-angular.svg?branch=master)](https://travis-ci.org/MitocGroup/deep-microservices-root-angular)
[![Codacy Badge](https://api.codacy.com/project/badge/coverage/ef7c8d169940408dbeb10c634c8b4259)](https://www.codacy.com/app/MitocGroup/deep-microservices-root-angular)

deep-microservices-root-angular is the fundamental building block used by cloud-native web applications
built on top of [DEEP Framework](https://github.com/MitocGroup/deep-framework) and
[Angular JS](https://angularjs.org). This microservice provides the root structure of the web application 
that is developed using Angular framework and AngularUI module.


## Getting Started

### Step 1. Pre-requisites

- [x] [Create an Amazon Web Services account](https://www.youtube.com/watch?v=WviHsoz8yHk)
- [x] [Configure AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)
- [x] [Get Started - Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [x] [JDK 8 and JRE 8 Installation Start Here](https://docs.oracle.com/javase/8/docs/technotes/guides/install/install_overview.html)
- [x] [Install nvm](https://github.com/creationix/nvm#install-script) and [use node v4.3+](https://github.com/creationix/nvm#usage)
- [ ] Install DEEP CLI, also known as `deepify`:

```bash
npm install deepify -g
```

> If you want to use `deepify` on Windows, please follow the steps from
[Windows Configuration](https://github.com/MitocGroup/deep-framework/blob/master/docs/windows.md)
before running `npm install deepify -g` and make sure all `npm` and `deepify` commands are executed
inside Git Bash.

### Step 2. Install Microservice(s) Locally

```bash
deepify install github://MitocGroup/deep-microservices-root-angularjs ~/deep-microservices-root-angularjs
```

> Path parameter in all `deepify` commands is optional and if not specified, assumes current
working directory. Therefore you can skip `~/deep-microservices-root-angularjs` by executing
`mkdir ~/deep-microservices-root-angularjs && cd ~/deep-microservices-root-angularjs` before `deepify install`.

### Step 3. Run Microservice(s) in Development

```bash
deepify server ~/deep-microservices-root-angularjs -o
```

> When this step is finished, you can open in your browser the link *http://localhost:8000*
and enjoy the deep-microservices-root-angularjs running locally.

### Step 4. Deploy Microservice(s) to Production

```bash
deepify deploy ~/deep-microservices-root-angularjs
```

> Amazon CloudFront distribution takes up to 20 minutes to provision, therefore don’t worry
if it returns an HTTP error in the first couple of minutes.

### Step 5. Remove Microservice(s) from Production

```bash
deepify undeploy ~/deep-microservices-root-angularjs
```

> Amazon CloudFront distribution takes up to 20 minutes to unprovision. That's why `deepify`
command checks every 30 seconds if it's disabled and when successful, removes it from your account.


## Developer Resources

Having questions related to deep-microservices-root-angularjs?

- Ask questions: https://stackoverflow.com/questions/tagged/deep-framework
- Chat with us: https://gitter.im/MitocGroup/deep-framework
- Send an email: feedback@deep.mg

Interested in contributing to deep-microservices-root-angularjs?

- Contributing: https://github.com/MitocGroup/deep-microservices-root-angularjs/blob/master/CONTRIBUTING.md
- Issue tracker: https://github.com/MitocGroup/deep-microservices-root-angularjs/issues
- Releases: https://github.com/MitocGroup/deep-microservices-root-angularjs/releases
- Roadmap: https://github.com/MitocGroup/deep-microservices-root-angularjs/blob/master/ROADMAP.md

Looking for web applications that use (or are similar to) deep-microservices-root-angularjs?

- Hello World: https://hello.deep.mg | https://github.com/MitocGroup/deep-microservices-helloworld
- Todo App: https://todo.deep.mg | https://github.com/MitocGroup/deep-microservices-todo-app
- Enterprise Software Marketplace: https://www.deep.mg


## Sponsors

This repository is being sponsored by:
- [Mitoc Group](https://www.mitocgroup.com)
- [DEEP Marketplace](https://www.deep.mg)

This code can be used under MIT license:
> See [LICENSE](https://github.com/MitocGroup/deep-microservices-root-angularjs/blob/master/LICENSE) for more details.
