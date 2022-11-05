# React Automate Liner (Ral)

React Automate Liner (Ral) automates the process of making directories or folders. You can use the ral command in the terminal to make a directory or folder.

RAL is a implementation of Unix shell commands portable with Multi-Platform  like Windows/MacOS/Linux

![maintained - yes](https://img.shields.io/badge/maintained-yes-blue) [![OS - Windows](https://img.shields.io/badge/OS-Windows-blue?logo=windows&logoColor=white)](https://www.microsoft.com/ "Go to Microsoft homepage") [![OS - Linux](https://img.shields.io/badge/OS-Linux-blue?logo=linux&logoColor=white)](https://www.linux.org/ "Go to Linux homepage") [![OS - macOS](https://img.shields.io/badge/OS-macOS-blue?logo=apple&logoColor=white)](https://www.apple.com/macos/ "Go to Apple homepage") [![Made with Bash](https://img.shields.io/badge/Bash->=3-blue?logo=gnu-bash&logoColor=white)](https://www.gnu.org/software/bash/ "Go to Bash homepage") [![License](https://img.shields.io/badge/License-MIT-blue)](#license)

## Installation

RAL CLI is available as an npm package. If you have Node.js installed locally, you can install it by running the below command:

```
  npm install -g ral
```

## Quick Start

After installing RAL, you can use the RAL command line interface in your terminal.

```
Node version: v18.8.0
Usage: React Component Generator [options] [command]

Create a React Component Generator

Options:
  -V, --version                      output the version number
  -h, --help                         get help for a specific command

Commands:
  component|comp [options] <string>  It generates a React component in the component file
  
  init                               Creates a project structure
                                     
  help [command]                     display help for command

```

To add `customreact.config.json` file to the folder path, your folder should follow an an default structure

### Custom config file

```
{
    "FolderStructure": {
        "MainFolder": "src",
        "ComponentFolder": "src/components",
        "AssetsFolder": "src/assets",
        "LayoutFolder": "src/layout",
        "RouteFolder": "src/routes",
        "ServicesFolder": {
            "path": "src/services",
            "default": false
        },
        "PagesFolder": {
            "path": "src/pages",
            "default": false
        },
        "ConfigFolder": {
            "path": "src/config",
            "default": false
        }
    },
    "React": {
        "extension": "jsx"
    },
    "NeedTestComponent": false
}
```

By using the above data, users can change the names of the folders.

`Note :` You must have `customreact.config.json` file in your folder to work with RAL. Otherwise you
will get an error in CLI or CLI asks for suggestions to automatically create a config file in your project folder.

## Main Folder Structure

```
├── src
│   ├── components
│   │   ├── **/*.jsx
|   |   ├── **/*.js
│   ├── assets
│   ├── layout 
│   │   ├── **/*.jsx
|   |   ├── **/*.css
│   ├── routes
│   │   ├── **/*.jsx
|   |   ├── **/*.js
```

## Component Creation Guide

React components can be created using the following commands:

#### To Create a component run

```
ral components | comp | c <string>

```  

By using these three keywords, you can create components in the React project.

Components can be placed where ever you want
in the folder in component , layout,routes

#### To Create a Component for a Speific Folder

This command provides information about which specific folder the component should be created in.

```
ral c -h
```

```
Node version: v18.8.0
Usage: React Component Generator component|comp [options] <string>

Generates a React Component in component file

Options:
  -c          Create a Component inside a component folder
  -l          Create a Component inside a LayoutFolder
  -r          Create a Component inside a RouteFolder
  -w          Create a <String> Folder Wrap with file and css
  -t          Create a test file for component
  -h, --help  display help for command

```

### Wrap a Folder Component

```
├── src
│   ├── Wrapper (Component Folder)  
│   │   ├── **/*.jsx
|   |   ├── **/*.css
```

This command will help you put components in a specific folder.

```
ral c <string> -w
```

RAL will help you create a component, and now you can customise your workflow with your own folder names in one config file.

## License

React Automate Linear is an open source package that falls under [MIT License](https://choosealicense.com/licenses/mit/)
