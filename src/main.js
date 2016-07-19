

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


function buildList(data, isSub){
  debugger;
  var html = (isSub)?'<div>':''; // Wrap with div if true
  html += '<ul>';
  for(var item in data) {
    if (item != "type" && isNaN(item)) {
      break;
    }
    else{
      if (item === "type" || typeof(data[item]) === 'object') {
        html += '<li ';
        
        if (data.type === "dir" || data[item].type === "dir") {
          html += 'class="folder-item"';
        } else  {
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
            html += data.name;
            html += '</li>';
            if (data.children.constructor === Array)
              html += buildList(data.children, true);
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
  html += '</ul>';
  html += (isSub)?'</div>':'';
  return html;
}

document.getElementById('folder').innerHTML = buildList(folders, false);