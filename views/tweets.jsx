var React = require('react');
var DefaultLayout = require('./layouts/default');

var Tweet = React.createClass({
  render: function() {
    return <p>
      <b>@{this.props.user.screen_name}</b>
      <br />
      {this.props.text}
    </p>;
  }
})

var TweetList = React.createClass({
  render: function() {
    var tweets = this.props.statuses.map(function(tweet){
      return <Tweet {...tweet} />;
    });
    return (
      <DefaultLayout title={this.props.title}>
        {tweets}
      </DefaultLayout>
    );
  }
});

module.exports = TweetList;
