

const folders =
      {
        type: 'dir',
        name: 'app',
        children: [
          {
            type: 'file',
            name: 'index.html'
          },
          {
            type: 'dir',
            name: 'js',
            children: [
              {
                type: 'file',
                name: 'main.js'
              },
              {
                type: 'file',
                name: 'app.js'
              },
              {
                type: 'file',
                name: 'misc.js'
              },
              {
                type: 'dir',
                name: 'vendor',
                children: [
                  {
                    type: 'file',
                    name: 'jquery.js'
                  },
                  {
                    type: 'file',
                    name: 'underscore.js'
                  }
                ]
              }
            ]
          },
          {
            type: 'dir',
            name: 'css',
            children: [
              {
                type: 'file',
                name: 'reset.css'
              },
              {
                type: 'file',
                name: 'main.css'
              }
            ]
          }
        ]
      }

function readInput(){
  var inputForFilter = document.getElementById("filterInput").value;
  return inputForFilter;
}

document.getElementById('folder').innerHTML = buildList(folders, false);

function search() {
  var string = readInput();
  if (string != ""){
    document.getElementById('searchHeader').innerHTML = "Searching for: " + string;
    document.getElementById('searchHeader').style.display='block';
  }
  else
    document.getElementById('searchHeader').style.display='none';
  filteredList = new Array();
  document.getElementById('folder').innerHTML = buildList(buildFilteredList(folders, string), false);
}

var filteredList = new Array();

function buildFilteredList(data, input) {
  var filteredElement;
  for (var item in data) {
    if (item != "type" && isNaN(item)) {
      break;
    }
    else {
      if (data.type === "dir") {
        if (data.name.indexOf(input) > -1) {
          return data;
        }
        buildFilteredList(data.children, input);
      }
      else {
        if (data[item].type === "dir") {
          if (data[item].name.indexOf(input) > -1) {
            filteredElement = new Object();
            filteredElement.type = data[item].type;
            filteredElement.name = data[item].name;
            filteredElement.children = takeEverythingFromFolder(data[item].children);
            return filteredList.push(filteredElement);
          }
          buildFilteredList(data[item].children, input);
        }
        else if (data[item].name.indexOf(input) > -1) {
          filteredElement = new Object();
          filteredElement.type = data[item].type;
          filteredElement.name = data[item].name;
          filteredList.push(filteredElement);
        }
      }
    }
  }
  return filteredList;
}

function takeEverythingFromFolder (data){
  var folderSituation = new Array()
  for (var itemsInFolder in data){
    if (data[itemsInFolder].type === "dir") {
      var fileObject = new Object();
      fileObject.type = data[itemsInFolder].type;
      fileObject.name = data[itemsInFolder].name;
      fileObject.children = takeEverythingFromFolder(data[itemsInFolder].children);
      folderSituation.push(fileObject);
    }
    else{
      var fileObject = new Object();
      fileObject.type = data[itemsInFolder].type;
      fileObject.name = data[itemsInFolder].name;
      folderSituation.push(fileObject);
    }
  }
  return folderSituation;
}

function buildList(data, isSub){
  var html = (isSub)?'<div>':'';
  html += '<ul>';
  for(var item in data) {
    if (item != "type" && isNaN(item)) {
      break;
    }
    else{
      if (data[item].constructor === Array)
          html += buildList(data[item], true);
      else {
        if (item === "type" || typeof(data[item]) === 'object') {
          html += '<li ';
          if (data.type === "dir" || data[item].type === "dir") {
            html += 'class="folder-item">';
            if (isSub) {
              html += data[item].name;
              html += '</li>';
              if (data[item].children.constructor === Array)
                html += buildList(data[item].children, true);
            }
            else {
              if (item === "type") {
                html += data.name;
                html += '</li>';
                if (data.children.constructor === Array)
                  html += buildList(data.children, true);
              }
              else {
                html += data[item].name;
                html += '</li>';
                if (data[item].children.constructor === Array)
                  html += buildList(data[item].children, true);
              }
            }
          }
          else {
            html += 'class="file-item">';
            html += data[item].name;
            html += '</li>';
          }
        }
      }
    }
  }
  html += '</ul>';
  html += (isSub)?'</div>':'';
  return html;
}
