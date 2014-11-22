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
	            //$('#maindump').empty();
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
});