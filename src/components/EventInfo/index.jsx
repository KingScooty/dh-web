var React = require('react');

var EventInfo = React.createClass({

  // getFeed: function() {
  //   return (
  //     <h1>HELLO!!!</h1>
  //   )
  // },

  render: function () {
    return (
      <div className="event">
        <div className="event__header">
          <h1 className="lead-title">HALLOWEEN HEROES</h1>
          <h2 className="support-title">A STAR WARS THEMED NIGHT OUT <br /> 31ST OCTOBER 2015. NQ, MANCHESTER.</h2>
        </div>

        <hr className="section-spacer" />

        <div className="event__body">
          <p>Digital heroes does Halloween! The one in the summer was so good, we're doing it again, for Halloween!</p>

          <p>As per Digital Heroes tradition; a fancy dress night out with all my closest friends &amp; wonderful Web/digital folk of Manchester. (<em>Fancy dress is a <u>must</u> this time! :P</em>) - <em><a href="#twitter-stream">see previous years below for ideas.</a></em> </p>

          <p>The plan is as follows:</p>
          <h2>18:00, SAT 31ST @ TBD, NQ</h2>
          <p>Plan is hazy at the moment. Liverpool play Chelsea in the afternoon, so the festivities could potentially start as early as 12:45pm! All i know at the moment is we'll be off to Satan's Hollow in the evening.</p>

          <h2>REALTIME DIARY OF THE EVENT</h2>

          <p>Leave a tweet with the hashtag <strong>#digitalheroes2015</strong> or <strong>#halloweenheroes2015</strong> and your message (including images) will be pulled in below in realtime. Let's get a diary of the build up, and of the night itself! :-)</p>
        </div>

        <div className="event__footer">
          <hr />
          <h2 className="island-title">LIVE TWITTER FEED – #digitalheroes2015 / #halloweenheroes2015</h2>
          <hr />
        </div>
      </div>
    );
  }
});

module.exports = EventInfo;
