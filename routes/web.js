const internal = require("stream");
const CrudRouter = require("./crudrouter");
var os = require('os');


class WebRouter {

    static getConfig()
    {
        return {};
    }

    static getIPAddress(interfaces) {
        for (var devName in interfaces) {
          var iface = interfaces[devName];
      
          for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
              return alias.address;
          }
        }
        return '0.0.0.0';
    }

    static getRouter(logic)
    {
        var express = require('express');
        var router = express.Router();
        const path = require('path');
        router.logic = logic;
        let me = this;

        router.get('', (req, res)=>{
            var dir = __dirname;
            var p = path.resolve( dir, "../public/pages/", "index");

            let ipaddress = JSON.parse(process.env.ADDRESS).address;

            res.render(p, { host_name: ipaddress  } )
        });

        return router;
    }
}

module.exports = WebRouter;