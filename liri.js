require("dotenv").config();

var keys=require("./keys.js")





var input =process.argv[2]

if (input == "my-tweets") {twitterArg();}
if(input=="spotify-this-song"){spotifyArg();}
if (input=="movie-this"){omdbArg();}





//-------------------The following is code for TWITTER----------------------------------------------------


function twitterArg(){ 
 var params = {
    screen_name: 'anania_amenu', 
    count:2}
var Twitter = require("twitter")
var client = new Twitter(keys.twitter);
 client.get('statuses/user_timeline', params, function(error, tweets, response){
      if (!error) {
          
          for(var i=0; i<params.count;i++){
            myTweets=tweets[i].text;
           
        var str = JSON.stringify(myTweets, null, 2)
          
        console.log(str); 
          }
          
      } else(console.log("can not retrieve tweet at this moment. come back again. thanks!!"))
    });
}
//-------------------------------End of TWITTER------------------------------------------------------------ fs.readFile("my-tweets")

//______________________________SPOTIFY_________________
function spotifyArg(){
var Spotify =require("node-spotify-api")
var spotify = new Spotify(keys.spotify);


    input2=process.argv[3]
    spotify.search({ type: 'track', query: input2, limit:2 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log("Artist Name - "+data.tracks.items[0].artists[0].name); 
  console.log("Track Name - "+data.tracks.items[0].name)
  console.log("Album Name - "+data.tracks.items[0].album.name)
  console.log("Preview Link - "+data.tracks.items[1].preview_url)
  });
} 

//-------------------------OMDB--------------
function omdbArg(){
var request = require("request");

movieInput=process.argv[3];
movieInput="";
console.log("type of -------"+typeof(movieInput));

request("http://www.omdbapi.com/?t="+movieInput+"&y=&plot=short&apikey=ccbd7e0e", function(error, response, body) {

  if (!error) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    
    console.log("Title --- "+JSON.log(body).title);
    // console.log("Year --- "+body[0].Year);
    // console.log("IMDB rating --- "+JSON.parse(body).imdbRating);
    // console.log("Country --- "+body.Country);
    // console.log("Language --- "+body.Language);
    // console.log("Plot --- "+body.Plot);
    // console.log("Actors --- "+body.Actors);

  }
});
if (input==null){

     request("http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=ccbd7e0e", function(error, response, body) {

     if (!error) {
  
       console.log ()
       console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
     }
    })
 }
}
