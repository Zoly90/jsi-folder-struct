

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

var filteredList = new Array();

function buildFilteredList(data, input) {

  //console.log(input);
  //debugger;
  var filteredElement;
  if (input === "app" || input === "pp" || input === "p")
    return data;
  else {
    for (var item in data) {
      if (item != "type" && isNaN(item)) {
        break;
      }
      else {
        if (data.type === "dir") {
          if (data.name.indexOf(input) > -1) {
            /*filteredElement = new Object();
            filteredElement.type = data.type;
            filteredElement.name = data.name;
            if (data.children.constructor === Array) {
              filteredElement.children = data.children;
              filteredList.push(filteredElement);
              buildFilteredList(data.children, input);
            }*/
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
  //console.log(filteredList);

  //}
}


function takeEverythingFromFolder (data){
  //debugger;
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
  //debugger;
  var html = (isSub)?'<div>':''; // Wrap with div if true
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
            html += 'class="folder-item"';
          } else {
            html += 'class="file-item"';
          }

          html += '>';

          if (data.type === "dir" || data[item].type === "dir") { // An array will return 'object'
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
            html += data[item].name;
            html += '</li>'; // No submenu
          }
          //html += '</li>';
        }
      }
    }
  }
  html += '</ul>';
  html += (isSub)?'</div>':'';
  console.log(html);
  return html;
}

document.getElementById('folder').innerHTML = buildList(folders, false);

function search(){
  var string = readInput();
  if(string === "")
    document.getElementById('folder').innerHTML = buildList(folders, false);
  else{
    filteredList = new Array();
    document.getElementById('folder').innerHTML = buildList(buildFilteredList(folders, string), false);
  }
}