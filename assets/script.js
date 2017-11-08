
var proxyurl = "https://cors-anywhere.herokuapp.com/";
var searchTitles;
var searchWords;


$("#search-bar").on("keydown",function search(e) {

    if(e.keyCode == 13) {
    	$(".result").html("");
        searchWords = $(this).val();
        searchTitles = searchWords.split(' ').join("%20");
        var url = "https://en.wikipedia.org/w/api.php";
        console.log(searchTitles);
        $(".result").html("<div class='text'>Searching Wikipedia ...</div>")
        $.ajax( {
		    url:  url,
		    data: {
		                'action': "opensearch",
		                'search': searchTitles
		            },
		    dataType: 'jsonp',
		    type: 'GET',
    		cache: true,
    		crossDomain: true,
		    headers: { 'Api-User-Agent': 'Example/1.0' },
		    success: function(data) {

		       $(".result").html("");
		       console.log('success', data);
		       var name = data[1];
		       var text = data[2];
		       var link = data[3];
		       for (var i = 0; i < link.length; i++) {
		       	if ( text[i].length < 1) {
		       		text[i] = "No short description provided . Please visit the link below to read the full Article";
		       	}
		       	$("#clear").show();
		       	$(".result").append(
		       		"<div class='text'>"+"<div id='name'><h5>"+name[i]+"</h5></div><div id='description'><p>"+text[i]+"</p></div><div id='link'><a target='_blank' href="+link[i]+"><button type='button' class='btn btn-outline-dark'>Read The Full Article Here</button></a></div></div><hr>"
		       		);
		       	
		       }
		    },
		    error: function (data, status, error) {
		      console.log('error', data, status, error);
		      $(".result").html("<div class='text'>Error : please try again </div>");
		    }
		});
    }
});

$("#clear").click(function() {
	$(".result").html("");
	$("input[type=text]#search-bar").val("");
	$("#clearMsg").css("background-color", "red");
	$(".result").html("<div id='clearMsg' class='text'>successfully clear your search </div>");
	setTimeout(function(){
		$(".result").html("");
		$("#clear").hide();
	}, 3000);
});




