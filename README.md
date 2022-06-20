# Run Cypress Cucumber project

## clone the repository
```
git clone https://github.com/ybhuiyan/cart-storefront-integration-api.git
```
## Goto your project directory
```
$ cd your/project/path
```
## if there is no node_modules folder, then run:
```
$ npm install
```
*It will install the necessary files*

## to start testing, run:
```
$ npx cypress open
or
$ ./node_modules/.bin/cypress open
```

you will see an application named **Cypress** on your taskbar.
Now click any file inside **Cypress** app to start testing.


## To generate HTML report of test cases, run the below command after running test cases:
```
	$ node cucumber-html-report.js
```
Then open **index.html** file in a browser.
index.html file path: (project_dir)/reports/cucumber-htmlreport.html/index.html
