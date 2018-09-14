// A common object for accessing config values
// Gets included automatically because of its name index.js

const configValues = require('./config');

module.exports = {

    getDbConnectionString: function () {
        // mongodb://<dbuser>:<dbpassword>@ds147942.mlab.com:47942/nodetodo
        return 'mongodb://' + configValues.uname + ':' + configValues.pwd + '@ds147942.mlab.com:47942/nodetodo';
    }

};
