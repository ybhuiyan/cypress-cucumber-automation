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
$ ./node_modules/.bin/cypress open
```

you will see an application named **Cypress** on your taskbar.
Now click any file inside **Cypress** app to start testing.

### Need some customization to generate html report
copy the folder multiple-cucumber-html-reporter from node_modules/bin
and replace the folder multiple-cucumber-html-reporter in reports folder
then add this code to features-overview.index.tmpl after body tag
```
<div style="margin: 8px 16px; font-size: 16px; position: relative;">
	<span onmouseover="dropdown()" onmouseout="dropdownOut()" style="color: gray; padding-bottom: 12px; cursor: pointer;" id="fileName"></span>
	<div id="dropdownContainer" onmouseover="dropdown()" onmouseout="dropdownOut()" class="panel panel-default" style="position: absolute; top: 100%; z-index: 10; background-color: white; padding: 16px; display: none;">
	</div>
</div>
<script src="fileList.js"></script>
<script>
var url = window.location.href;
var filename = url.substring(url.lastIndexOf('/') + 1);
var filename = filename.replace('.html', '');

var lst = filename.split('-');
var date = lst[0] + '/' + lst[1] + '/' + lst[2];
document.getElementById("fileName").innerText = date + ' Cucumber HTML Report';

for(var i = 0; i < fileList.length; i++) {
	var file = fileList[i];
	var fileName = file.replace('.html', '');
	var lst = fileName.split('-');
	var date = lst[0] + '/' + lst[1] + '/' + lst[2];
	var fileName = date + ' Cucumber HTML Report';
	var link = document.createElement('a');
	link.href = file;
	link.innerText = fileName;
	var div = document.createElement('div');
	div.style.padding = '8px';
	div.appendChild(link);
	document.getElementById('dropdownContainer').appendChild(div);
}


function dropdown(){
	document.getElementById("dropdownContainer").style.display = "block";
}
function dropdownOut(){
	// check if mouse not in id="dropdownContainer"
	if(!document.getElementById("dropdownContainer").contains(event.relatedTarget)){
		document.getElementById("dropdownContainer").style.display = "none";
	}
}
</script>
```

## To generate HTML report of test cases, run the below command after running test cases:
```
	$ node cucumber-html-report.js
```
Then open **index.html** file in a browser.
index.html file path: (project_dir)/reports/cucumber-htmlreport.html/index.html
