### Hexlet tests and linter status:
[![Actions Status](https://github.com/irenechigrinova/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/irenechigrinova/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/7936e0ee2ce704f23c68/maintainability)](https://codeclimate.com/github/irenechigrinova/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7936e0ee2ce704f23c68/test_coverage)](https://codeclimate.com/github/irenechigrinova/frontend-project-46/test_coverage)

### Description
Console utility that generates differences between two json or yml files in three formats

### Requirements
- NodeJS >= 16.13.2
- *NIX OS or WSL for Windows

### Flags
- -V or --version - shows current application version
- -h or --help - shows help information

### Parameters
- filepath1 and filepath2 are required params for the files you want to compare
- --format sets the result format. Available values: stylish (default), plain, json 

### Local setup
- After cloning enter the root application folder and run npm ci or make install
- To launch application via Nodejs run node bin/gendiff.js command with needed params
- To launch application as an executable file run gendiff with needed params

```
# setup
make install

#lint
make lint

#test
make test

# run via make
make brain-even

# run via nodejs
node bin/gendiff.js
```

### DEMOS