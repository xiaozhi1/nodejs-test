
var http = require('http')
var fs = require('fs')
var url = require('url')

//console.log(Object.keys(http))
var port = process.env.PORT || 8888;

var server = http.createServer(function(request, response){

  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query = temp.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/



  if (path === '/') {
    let string = fs.readFileSync('./index.html', 'utf-8')
    var amount = fs.readFileSync('./db', 'utf-8')  //100
    string = string.replace('&&&amount&&&', amount)
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/style.css') {
    let string = fs.readFileSync('./style.css', 'utf-8')
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/main.js') {
    let string = fs.readFileSync('./main.js', 'utf-8')
    response.setHeader('Content-Type', 'application/javascript;charset=utf-8')
    response.write(string)
    response.end()
  } else if(path === '/pay' ){
    var amount = fs.readFileSync('./db', 'utf-8')
    var newAmount = amount - 1
    fs.writeFileSync('./db',newAmount)
    response.setHeader('Content-Type', 'application/javascript')
    response.statusCode = 200
    // response.write(`
    //     amount.innerText = amount.innerText - 1
    // `)
    response.write(`
      ${query.callback}.call(undefined,'success')
    `)
    response.end()
  }else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('找不到对应的路径，你需要自行修改 index,js')
    response.end()
  }


   // 代码结束，下面不要看
   console.log(method + ' ' + request.url)
  })
  
  server.listen(port)
  console.log('监听 ' + port + ' 成功，请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
  