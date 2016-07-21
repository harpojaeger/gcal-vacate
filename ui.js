function eventsController() {
	eventsTitle = $("#events_title");
	eventsOutput = $("#output");
	this.title = {
		show : function() {
			$(eventsTitle).show();
		},
		hide : function() {
			$(eventsTitle).hide();
		}
	}
	this.clear = function() {
		$(eventsOutput).empty();
	}
}

function instancesController() {
	instancesOutput = $("#instances");
	instancesTitle = $("#instances_title");
	deleteLink = $("#deleteall");
	this.clear = function() {
		$(instancesOutput).empty();
	}
	
	this.title = {
		hide : function() {
			$(instancesTitle).hide();
		},
		show : function() {
			$(instancesTitle).show();
		}
	}
	
	this.deleteAllLink = {
		hide : function() {
			$(deleteLink).hide();
		},
		show : function() {
			$(deleteLink).show();
		}
	}
	
}