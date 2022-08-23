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

# run as executable
gendiff [options] [params]
```

### DEMOS
Getting help and version
https://asciinema.org/a/epIf6HJifngfWL7A58FuNkaFe

Getting diff for json files in stylish format
https://asciinema.org/a/ZmL4JDcuM5J1NItAonFQPlypE

Getting diff for json files in plain format
https://asciinema.org/a/8YpMsFlZKOllnwWwuhKtO9RQN

Getting diff for json files in json format
https://asciinema.org/a/CSIWDnEgwx8skVAos5qFJibXw

Getting diff for yaml files in stylish format
https://asciinema.org/a/AuhPS1YddW7JLDL9LhtH1cqrg

Getting diff for yaml files in plain format
https://asciinema.org/a/9zZ7at7ijjw3Xq5C7cd4bWxEF

Getting diff for yaml files in json format
https://asciinema.org/a/g3BER56d1Erqg99xOUc4Q39za