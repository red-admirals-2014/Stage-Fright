// Modal View

function Modal(){};

Modal.prototype = {
  showModal: function(){
    $('.modal').fadeIn();
  },

  closeModal: function(){
    $('.modal').fadeOut();
  }
};


// Play View
function Play(){
  this.player = $("#jquery_jplayer_1");
};

Play.prototype = {
  initPlayer: function(response){
    console.log("**** INSIDE DONE OF PLAY SONG ****")
    this.player.jPlayer({
      ready: function(response){
         console.log('hi')
        $(this).jPlayer("setMedia", {
         mp3: "https://srv23.cloudconvert.org/download/i7F82KLc",
        }).jPlayer("play");
      },
      supplied: "mp3"
    });
  },
  playNextSong: function(event){
    console.log('**** INSIDE PLAY NEXT SONG ****')
    //cast vote on song using ajax
    $.ajax({
      url: '/votes/create',
      type: 'POST',
      data: {
        url: this.player.jPlayer()[0].lastChild.src,
        vote: event.target.id
      }
    })
    //play next song
    $.ajax({
      url: '/clips/next',
      type: 'GET',
    }).done(function(response){
      this.player.jPlayer("setMedia",{
        mp3: response
      }).jPlayer("play")
    }.bind(this))
  },

  pauseSong: function(){
    this.player.jPlayer("pause")
  },

  unpauseSong: function(){
    this.player.jPlayer("play")
  }
};
