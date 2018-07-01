# steem-pay-for-upvote
A simple node app that will take a list of promoters and send them SBD to promote your post.  This does not keep any history or anything it just sends the SBD for you.

### Setup
Clone the repository and cd into the folder.  Inside the folder run
```
npm install
```

Once that is complete you'll need to create a `.env` file to hold your username/password for steemit.  I also have it look for a "FROM" var which is what it uses in the actual send.

```
USERNAME=kaptainkrayola
PASSWORD=password
FROM=kaptainkrayola
```


### Usage
```
node index {URL}
```
Where {URL} is the URL of the post you want to promote.  The script will ask for confirmation before sending.