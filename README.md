# 1. Add express react

Run this command:

    npm install express-react-views react --save

# 2. Create a layout

First create a directory to hold the layout by running this command:

    mkdir -p views/layouts

Then create the file `views/layouts/default.jsx`:

```jsx
var React = require('react');

var DefaultLayout = React.createClass({
  render: function() {
    return (
      <html>
        <head><title>{this.props.title}</title></head>
        <body>{this.props.children}</body>
      </html>
    );
  }
});

module.exports = DefaultLayout;
```

See https://github.com/reactjs/express-react-views#layouts for more details

# 3. Create a view

Create a file `views/tweets.jsx` with the following contents:

```jsx
var React = require('react');
var DefaultLayout = require('./layouts/default');

var HelloMessage = React.createClass({
  render: function() {
    return (
      <DefaultLayout title={this.props.title}>
        <div>{this.props.message}</div>
      </DefaultLayout>
    );
  }
});
```

module.exports = HelloMessage;

# 4. Update the tweets route

```js
app.get('/tweets', function (req, res) {
  res.render('tweets', { title: 'Tweets', message: 'These are your tweets' });
});
```

Restart the app and view http://localhost:8000/tweets

You should see the message rendered via react

# 5. Setup dotenv

It is good security practice to store sensitive information like access key, passwords, etc. in a separate environment file. `dotenv` is a library that makes it easy to do that. Install the library:

    npm install dotenv --save

Then add this code to the top of your express app to load those environment variables:

```js
require('dotenv').load();
```

Create a file called `.env` and put some environment variables in there

See https://www.npmjs.com/package/dotenv for more info

**Make sure to add `.env` to your `.gitignore` file so you don't accidentally commit sensitive information**

# 6. Configure the twitter client

You need a Twitter account that is verified by your mobile phone number to create a a Twitter app. Once you have that, go to http://apps.twitter.com to create an app. Once you have an app, generate an access token and put it into your `.env` file:

```
TWITTER_CONSUMER_KEY=...
TWITTER_CONSUMER_SECRET=...
TWITTER_ACCESS_TOKEN_KEY=...
TWITTER_ACCESS_TOKEN_SECRET=...
```

Next install the twitter library:

    npm install twitter --save

Then follow the instructions on setting it up: https://www.npmjs.com/package/twitter

By adding this to your app:

# 7. Get some data

Temporarily change the tweets route to look like this:

```js
app.get('/tweets', function (req, res) {
  var q = req.query.q || 'javascript';
  twitter.get('search/tweets', { q: q }, function(error, tweets, response){
    res.send(tweets);
    //res.render('tweets', { title: 'Tweets', tweets: tweets });
  });
});
```

This will make a search request to twitter and just return the response as JSON. You can view it in your browser at http://localhost:8000/tweets to see how the response data is structured.

# 8. Use the data

From the previous request, you can see that there is a top-level key called `statuses` which is an array of objects, each one representing a tweet. There is a lot of date in each tweet, but we are going to use these parts:

* `id`: A unique id for the tweet
* `text`: The actual contents of the tweet
* `created_at`: The time the tweet was created
* `user.name`: The user's name
* `user.screen_name`: The user's screen name
* `user.profile_image_url`: The URL to the user's profile image

First update the route to render the view:

```js
app.get('/tweets', function (req, res) {
  var q = req.query.q || 'javascript';
  twitter.get('search/tweets', { q: q }, function(error, tweets, response){
    //res.send(tweets);
    res.render('tweets', tweets);
  });
});
```

Then update the view to look like this:

```jsx
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
```

# In-Class / Homework assignments

- Include other elements on the page like user name and profile image
- Use moment js to format the time in relative time (5 minutes ago)
- Use bootstrap to style the page and make it look better
- Add a form field for the user to input what the want to search for and have it update the results
- Make the User photos and name be a link to `/user/:screen_name` and have it display the information about the user such as their background image, name, location, bio, etc. See https://dev.twitter.com/rest/reference/get/users/show
