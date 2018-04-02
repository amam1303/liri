require("dotenv").config();

var keys=require("./keys.js")   //calling for keys from keys.js
var fs = require('fs');
var input =process.argv[2]      //decalre 2nd argument in a variable

//conditionals to call functions 
if (input == "my-tweets") {twitterArg();}           
if(input=="spotify-this-song"){spotifyArg();}
if (input=="movie-this"){omdbArg();}
if (input=="read-From-Text"){readFromText();}




//-------------------The following is code for TWITTER----------------------------------------------------


function twitterArg(){ 
        var params = {screen_name: 'realDonaldTrump', count:20}
        var Twitter = require("twitter")
        var client = new Twitter(keys.twitter);

            client.get('statuses/user_timeline', params, function(error, tweets, response){
                if (!error) {
                
                    for(var i=0; i<params.count;i++){
                        myTweets=tweets[i].text;
                
                        var str = JSON.stringify(myTweets, null, 2)
                
                        console.log(str); 

                        //the following is to append to log.txt
                        fs.appendFile('log.txt', str, function (err) {if (err) throw err;}); 
                          
                    }
                
                } else(console.log("can not retrieve tweet at this moment. come back again. thanks!!"))
            });
        }
//-------------------------------End of TWITTER------------------------------------------------------------ 

//______________________________SPOTIFY_____________________________________________________________________________
function spotifyArg(){
        var Spotify =require("node-spotify-api")
        var spotify = new Spotify(keys.spotify);
        input2=process.argv[3]

            spotify.search({ type: 'track', query: input2, limit:2 }, function(err, data) {
                if (err) {
                        return console.log('Error occurred: ' + err);
                }
                a=data.tracks.items[0].artists[0].name;
                b=data.tracks.items[0].name;
                c=data.tracks.items[0].album.name;
                d=data.tracks.items[1].preview_url
                stringified="Artist Name - "+a+'\n'+"Track Name - "+b+'\n'+"Album Name - "+c+'\n'+"Preview Link - "+d+'\n'
                console.log("-----"+typeof(stringified))
                console.log("Artist Name - "+a+'\n'+"Track Name - "+b+'\n'+"Album Name - "+c+'\n'+"Preview Link - "+d); 

                //the following is to append to log.txt
                fs.appendFile('log.txt',stringified, function (err) {if (err) throw err;});
            });
} 

//-------------------------OMDB- MOVIES--------------------------------------------------------------------------------------------
function omdbArg(){
    var request = require("request");

    movieInput=process.argv[3];
    
    if (movieInput==null){                      //if no movie is specified, the default is Mr.nobody
        
            request("http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=ccbd7e0e", function(error, response, body) {

                    if (!error) {
  
                                    console.log("Title --- "+JSON.parse(body).Title);
                                    console.log("Year --- "+JSON.parse(body).year);
                                    console.log("IMDB rating --- "+JSON.parse(body).imdbRating);
                                    console.log("Country --- "+JSON.parse(body).Country);
                                    console.log("Language --- "+JSON.parse(body).Language);
                                    console.log("Plot --- "+JSON.parse(body).Plot);
                                    console.log("Actors --- "+JSON.parse(body).Actors);
                                }
            })
    }else(
//if user specifies a movie
             request("http://www.omdbapi.com/?t="+movieInput+"&y=&plot=short&apikey=ccbd7e0e", function(error, response, body) {

                    if (!error) {
    
                                    console.log("Title --- "+JSON.parse(body).Title);
                                    console.log("Year --- "+JSON.parse(body).year);
                                    console.log("IMDB rating --- "+JSON.parse(body).imdbRating);
                                    console.log("Country --- "+JSON.parse(body).Country);
                                    console.log("Language --- "+JSON.parse(body).Language);
                                    console.log("Plot --- "+JSON.parse(body).Plot);
                                    console.log("Actors --- "+JSON.parse(body).Actors);

                                }
        }))

}

// ------------------------Reading from text----------------------
function readFromText(){
                var fs = require("fs");
                var Spotify =require("node-spotify-api")
                var spotify = new Spotify(keys.spotify);
                fs.readFile("random.txt", "utf8", function(error, data) {
                        if (error) {
                                return console.log(error);
                            }
                        
                        var dataArr = data.split(",");
                        
                        spotify.search({ type: 'track', query: dataArr[1], limit:2 }, function(err, data) {
                            if (err) {
                                    return console.log('Error occurred: ' + err);
                            }
                    
                            console.log("Artist Name - "+data.tracks.items[0].artists[0].name); 
                            console.log("Track Name - "+data.tracks.items[0].name)
                            console.log("Album Name - "+data.tracks.items[0].album.name)
                            console.log("Preview Link - "+data.tracks.items[1].preview_url)
                        });
                });
}




