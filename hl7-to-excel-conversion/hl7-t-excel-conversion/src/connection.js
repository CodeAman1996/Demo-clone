var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    hosts: [
        'http://3.108.56.144:9200/',

    ]
});
module.exports = client;