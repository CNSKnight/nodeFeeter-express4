var express = require('express');
var router = express.Router();
var keys = {
    "consumer_key" : "80SelDBUgKTlPVHPHk0eNg",
    "consumer_secret" : "Fo5gwNKBZYlGA0Gh2xEcwhNjM3pbJpepYdN5i40",
    "access_token_key" : "410003382-Pm19h7d5nyuYqTCfqR86tqP4GYmYenErH9bfaIjp",
    "access_token_secret" : "TpFf4JcBkTl8MHmpdzWj64FRNSyy4JC9ylf0GINSWWg"
};

var tuiter = require('tuiter')(keys);

router.param('handle', function(req, res, next, handle) {
    // @todo validate handle
    req.params.handle = handle;
    
    tuiter.userTimeline({screen_name: handle || defHandle, count: 10}, function(err, feed) {
            if (! feed) {
                return;
            } else if (err) {
            }
            
            var re = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/i;
            var anchorify = function(str) {
                if (! str) return;
                var parsed = re.exec(str);
                if (! parsed) return str;
                return str.replace(parsed[0], parsed[0].link(parsed[0]));
            };
            
            // jade/pug reFUSes to !{twee.text} any way any how :|
            // for (var idx in feed) {
            //    feed[idx].text = anchorify(feed[idx].text);
            // }
            
            res.render('feeter', {title: 'Tweets from '+handle, tweeter: { handle: handle }, tweets: feed});
            next();
    })
});

router.get('/:handle?', function(req, res, next) {
        if (! req.params.handle) {
            res.render('feeter', {title: 'Tweets Search', tweeter: {handle: ""}, tweets: {}});
        }
        // implicit eor here - ie no next()
});

module.exports = router;
