const express = require('express')
const cors = require('cors')


const port = 3001;
const app = express();
// const exampleProxy = createProxyMiddleware('**', {...})
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // For legacy browser support
}

// app.use(cors(corsOptions))

const { createProxyMiddleware } = require('http-proxy-middleware');
app.use('**', createProxyMiddleware({ 
    target: 'http://localhost', //original url
    changeOrigin: true, 
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));

// app.use('**', exampleProxy);

app.listen(3010);

// app.all('*', function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'GET');
//     // Origin, X-Requested-With, Content-Type, Accept
//     next()
//   });
  
app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
);