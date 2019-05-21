let express = require('express');
let router = express.Router({});

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log( req.userInfo);
    res.render('index',
    {
        "person":[req.userInfo.username]

    }

    );
});

module.exports = router;