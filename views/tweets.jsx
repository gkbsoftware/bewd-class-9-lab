var React = require('react');
var moment = require('moment');
var DefaultLayout = require('./layouts/default');

var Tweet = React.createClass({
  render: function() {
    return (
      <div className="tweet container">
        <div className="row">
          <div className="col-md-2 text-center">
            <img src={this.props.user.profile_image_url} className="img-circle"/>
            <br />
            <b>{this.props.user.name}</b>
            <br />
            <a href={"https://twitter.com/"+this.props.user.screen_name}>@{this.props.user.screen_name}</a>
          </div>

          <div className="col-md-10">
            <b>@{this.props.user.screen_name + " "}</b>
            <em>{moment(this.props.created_at.substr(4)).fromNow() + " - "}</em>
            {this.props.text}
          </div>

        </div>
      </div>
    )
  }
})

var TweetList = React.createClass({
  render: function() {
    var tweets = this.props.statuses.map(function(tweet){
      return <Tweet {...tweet} />;
    });
    return (
      <DefaultLayout title={this.props.title}>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
        <h1>TweetList</h1>
        {tweets}
      </DefaultLayout>
    );
  }
});

module.exports = TweetList;
