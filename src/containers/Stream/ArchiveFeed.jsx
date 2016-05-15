var React = require('react');
var Post = require('../../components/Post');

var ArchiveFeed = React.createClass({

  getInitialState: function () {
    var json = {
      "_id":"654788497228742656",
      "created_at":"Thu Oct 15 22:38:37 +0000 2015",
      "id":654788497228742700,
      "id_str":"654788497228742656",
      "text":"It's coming... #halloweenheroes2015 http://t.co/KvH1cH9X6l",
      "source":"<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
      "truncated":false,
      "in_reply_to_status_id":null,
      "in_reply_to_status_id_str":null,
      "in_reply_to_user_id":null,
      "in_reply_to_user_id_str":null,
      "in_reply_to_screen_name":null,
      "user":{
        "id":9351682,
        "id_str":"9351682",
        "name":"Scotty Vernon",
        "screen_name":"KingScooty",
        "location":"NQ, Manchester, England",
        "url":"http://wildflame.co.uk",
        "description":"Creative Dev currently consulting at @BBCSport. Director of @wearewildflame. Obsessive perfectionist. LFC follower; Nintendo fan boy; RasPi & Arduino enthusiast",
        "protected":false,
        "verified":false,
        "followers_count":663,
        "friends_count":349,
        "listed_count":51,
        "favourites_count":782,
        "statuses_count":11051,
        "created_at":"Wed Oct 10 13:33:47 +0000 2007",
        "utc_offset":3600,
        "time_zone":"London",
        "geo_enabled":true,
        "lang":"en",
        "contributors_enabled":false,
        "is_translator":false,
        "profile_background_color":"181818",
        "profile_background_image_url":"http://pbs.twimg.com/profile_background_images/118975436/twitter_bg-kingscooty-v2.jpg",
        "profile_background_image_url_https":"https://pbs.twimg.com/profile_background_images/118975436/twitter_bg-kingscooty-v2.jpg",
        "profile_background_tile":false,
        "profile_link_color":"64BDE3",
        "profile_sidebar_border_color":"FFFFFF",
        "profile_sidebar_fill_color":"252429",
        "profile_text_color":"555555",
        "profile_use_background_image":true,
        "profile_image_url":"http://pbs.twimg.com/profile_images/484369772956491776/G7SN_jz4_normal.png",
        "profile_image_url_https":"https://pbs.twimg.com/profile_images/484369772956491776/G7SN_jz4_normal.png",
        "profile_banner_url":"https://pbs.twimg.com/profile_banners/9351682/1420746320",
        "default_profile":false,
        "default_profile_image":false,
        "following":null,
        "follow_request_sent":null,
        "notifications":null
      },
      "geo":null,
      "coordinates":null,
      "place":null,
      "contributors":null,
      "is_quote_status":false,
      "retweet_count":0,
      "favorite_count":0,
      "entities":{
        "hashtags":[
          {
            "text":"halloweenheroes2015",
            "indices":[
              15,
              35
            ]
          }
        ],
        "urls":[

        ],
        "user_mentions":[

        ],
        "symbols":[

        ],
        "media":[
          {
            "id":654788495337123800,
            "id_str":"654788495337123844",
            "indices":[
              36,
              58
            ],
            "media_url":"http://pbs.twimg.com/media/CRZGqtOU8AQYfew.png",
            "media_url_https":"https://pbs.twimg.com/media/CRZGqtOU8AQYfew.png",
            "url":"http://t.co/KvH1cH9X6l",
            "display_url":"pic.twitter.com/KvH1cH9X6l",
            "expanded_url":"http://twitter.com/KingScooty/status/654788497228742656/photo/1",
            "type":"photo",
            "sizes":{
              "thumb":{
                "w":150,
                "h":150,
                "resize":"crop"
              },
              "medium":{
                "w":400,
                "h":234,
                "resize":"fit"
              },
              "small":{
                "w":340,
                "h":198,
                "resize":"fit"
              },
              "large":{
                "w":400,
                "h":234,
                "resize":"fit"
              }
            }
          }
        ]
      },
      "extended_entities":{
        "media":[
          {
            "id":654788495337123800,
            "id_str":"654788495337123844",
            "indices":[
              36,
              58
            ],
            "media_url":"http://pbs.twimg.com/media/CRZGqtOU8AQYfew.png",
            "media_url_https":"https://pbs.twimg.com/media/CRZGqtOU8AQYfew.png",
            "url":"http://t.co/KvH1cH9X6l",
            "display_url":"pic.twitter.com/KvH1cH9X6l",
            "expanded_url":"http://twitter.com/KingScooty/status/654788497228742656/photo/1",
            "type":"photo",
            "sizes":{
              "thumb":{
                "w":150,
                "h":150,
                "resize":"crop"
              },
              "medium":{
                "w":400,
                "h":234,
                "resize":"fit"
              },
              "small":{
                "w":340,
                "h":198,
                "resize":"fit"
              },
              "large":{
                "w":400,
                "h":234,
                "resize":"fit"
              }
            }
          }
        ]
      },
      "favorited":false,
      "retweeted":false,
      "possibly_sensitive":false,
      "filter_level":"low",
      "lang":"en",
      "timestamp_ms":"1444948717778",
      "type":"tweet"
    }

    return {
      posts: [json]
    };
  },

  renderPosts: function () {
    return this.state.posts.map(function (post, index) {
      return <Post {...post} key={ index } />;
    });
  },

  render: function () {
    var posts = this.renderPosts();

    return (
      <div>
        <h1>ARCHIVE FEED!</h1>
        { posts }
      </div>
    );
  }
});

module.exports = ArchiveFeed;
