function containerController() {
  containerDiv = $('#container');
  this.div = {
    show: function() {
      $(containerDiv).show();
    }
  }
}

function authController() {
  authDiv = $('#authorize_div');
  this.div = {
    show: function(){
      $(authDiv).show();
    },
    hide: function(){
      $(authDiv).hide();
    }
  }
}

function eventsController() {
  eventsTitle = $("#events_title");
  eventsUl = $("#events_ul");
  eventsDiv = $('#events-div');
  this.title = {
    show: function() {
      $(eventsTitle).show();
    },
    hide: function() {
      $(eventsTitle).hide();
    }
  }
  this.ul = {
    clear: function() {
      $(eventsUl).empty();
    }
  }
  this.div = {
    show: function() {
      $(eventsDiv).show();
    },
    hide: function() {
      $(eventsDiv).hide();
    }
  }
}

function instancesController() {
  instancesDiv = $("#instances-div");
  instancesUl = $('#instances-ul');
  instancesTitle = $("#instances_title");
  deleteLink = $("#deleteall");
  this.clear = function() {
    $(instancesUl).empty();
  }
  this.title = {
    hide: function() {
      $(instancesTitle).hide();
    },
    show: function() {
      $(instancesTitle).show();
    }
  }
  this.div = {
    show: function() {
      $(instancesDiv).show();
    },
    hide: function() {
      $(instancesDiv).hide();
    }
  }
  this.deleteAllLink = {
    hide: function() {
      $(deleteLink).hide();
    },
    show: function() {
      $(deleteLink).show();
    }
  }
}

function searchController() {
  var searchDiv = $("#search_div");
  this.div = {
    show: function() {
      $(searchDiv).show();
    },
    hide: function() {
      $(searchDiv).hide();
    }
  }
}