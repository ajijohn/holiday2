$(function () {
   
	
	  var SearchResult = Backbone.Model.extend({
	        defaults: {
	            url: '',
	            title: ''
	        }
	    });

	    var SearchResultView = Backbone.View.extend({
	        el: $('#maindump'),
	        
	        //template: _.template('<a href="#" class="btn btn-default">Go Back</a>'),
	        
	        initialize: function () {
	            var self = this;
	            $('#maindump').empty();
	            this.template = _.template($('#back').html());
	            self.render();
	        },
	        render: function () {
	        	
	        	
	            var self = this;
	            
	             self.$el.append(self.template());
	            
	            
	            /*_.each(self.navs, function (element, index) {
	                self.$el.append(self.template(element.attributes));

	                if (index != self.navs.length - 1) {
	                    self.$el.append(self.arrowTemplate());
	                }
	            })*/
	            
	            
	        }
	    });

	    new SearchResultView();
	    
	    var audio = null;
	    var SpotifyHeader = Backbone.View.extend({
	        el: $('#spot'),
	        events: {
                "click .stopp": "stop"
            },
	        initialize: function () {
	            var self = this;
	            self.spotted = {};
	            var search = document.getElementById('searched');
	            $.get('/search/spotify/'+search.value , function (data) {
	            	
	            	
	            	
	            	console.log("searched for" + search.value )
	                //matchedElement.innerHTML = '<div class="media"><img src="' +
	                //data.tracks.items[0].album.images[0].url + '" alt="Cover art of ' +
	                //data.tracks.items[0].album.name + '" width="300"><p>Playing ' +
	                //data.tracks.items[0].name + ' by ' + data.tracks.items[0].artists[0].name +'</p></div>';
	                //audio = new Audio(data.tracks.items[0].preview_url);
	                //audio.play();
	                self.spotted = data;
	            	self.data = data;
	                //self.spotted.set('weight', (data.weight) ? data.weight : '');
	                //self.spotted.set('weightcalibration', (data.weightcalibration) ? data.weightcalibration : '');
	                //self.spotted.set('dateofarrival', (data.dateofarrival) ? data.dateofarrival : '');
	                self.render(data);
	            });
	            
	        },
	        stop: function () {
                var self = this;
                if (audio) {
                    audio.pause();
                    audio = null;
                }
            },
	        template: _.template($('#spotify').html()),
	        render: function (spotted) {
	            this.$el.append(this.template(this.spotted.attributes));
	            
	            var parent = '<div class="container"><div class="row">';
	            
	            this.$el.append(parent);
	            
	            
	           // var matchedElement =  '<div class="media"><img src="' +
	           // spotted.tracks.items[0].album.images[0].url + '" alt="Cover art of ' +
	           // spotted.tracks.items[0].album.name + '" width="300"><p>Playing ' +
	           // spotted.tracks.items[0].name + ' by ' +  spotted.tracks.items[0].artists[0].name +'</p></div>';
               // audio = new Audio(spotted.tracks.items[0].preview_url);
                //audio.play();
               // this.$el.append(matchedElement);
                
                
	            for (i = 0; i < spotted.tracks.items.length; i++) { 
	               
                    //self.$el.append(self.template(element.attributes));
                    
                    var matchedElement =  '<div class="media col-md-4"><img src="' +
                    spotted.tracks.items[i].album.images[0].url + '" alt="Cover art of ' +
                    spotted.tracks.items[i].album.name + '" width="300"><p>Matched ' +
                    spotted.tracks.items[i].name + ' Track by ' +  spotted.tracks.items[i].artists[0].name +'</p></div>';
                    audio = new Audio(spotted.tracks.items[i].preview_url);
                    audio.play();
                    this.$el.append(matchedElement);
                   // if (index != self.navs.length - 1) {
                   //     self.$el.append(self.arrowTemplate());
                   // }
	            }
                
                this.$el.append('</div></div>');
	            
	            
	        }
	    });
	    new SpotifyHeader();
	    
	    
	    var NotesHeader = Backbone.View.extend({
	        el: $('#note'),
	        initialize: function () {
	            var self = this;
	         
	             this.template = _.template($('#notes').html());
	             self.render();
	     
	            
	            
	        },
	        render: function () {
	        	var self = this;
	            
	             self.$el.append(self.template());
	            
	        }
	    });
	    new NotesHeader();
	    
	    
	    var InfosHeader = Backbone.View.extend({
	        el: $('#info'),
	        initialize: function () {
	            var self = this;
	         
	             this.template = _.template($('#infos').html());
	             self.render();
	     
	            
	            
	        },
	        render: function () {
	        	var self = this;
	            
	             self.$el.append(self.template());
	            
	        }
	    });
	    new InfosHeader();
	    
	    
	    
	    var YoutubeHeader = Backbone.View.extend({
	        el: $('#youtuby'),
	        events: {
                "click .stopp": "stop"
            },
	        initialize: function () {
	            var self = this;
	            self.spotted = {};
	            $('#youtuby').empty();
	            var search = document.getElementById('searched');
	            $.get('/youtube/search/'+search.value , function (data) {
	            	
	            	
	            	
	            	console.log("searched for" + search.value )
	                self.spotted = data;
	            	self.data = data;
	                self.render(data);
	            });
	            
	        },
	        stop: function () {
                var self = this;
                if (audio) {
                    audio.pause();
                    audio = null;
                }
            },
	        template: _.template($('#youtubes').html()),
	        render: function (spotted) {
	            this.$el.append(this.template(this.spotted.attributes));
	            
	            var parent = '<div class="container"><div class="row"><div class="media col-md-4">';
	            
	            this.$el.append(parent);
	            
	            for (i = 0; i < spotted.length; i++) { 
	               
                    //self.$el.append(self.template(element.attributes));
                    
	            	
	            	
	            	
                    //var matchedElement =  '' +
                    //'<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' + spotted[i].id.videoId + '" frameborder="0" height="193" width="319"></iframe>';
                
	            	 var matchedElement =  '' +
                    '<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' + spotted[i].id.videoId + '" frameborder="0" height="289" width="478"></iframe>';
                
                    //var matchedElement =  '<img src="https://www.youtube.com/embed/' +
                    //spotted[i].id.videoId + '" alt=" ' +
                    //spotted[i].snippet.title + '" width="300"><p>Matched ' +
                    //spotted[i].snippet.description + ' Track by ' +  spotted[i].snippet.description  +'</p></div>';
                   
                    
                    this.$el.append(matchedElement);
                 }
                
                this.$el.append('</div></div></div>');
	            
	            
	        }
	    });
	    new YoutubeHeader();
	    
	    
	    
	    
});