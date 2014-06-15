function Controller(modal, play){
  this.modalView = modal
  this.playView = play
}

Controller.prototype = {
  bindEventListener: function(){
     $('#mic').on('click', this.openModal.bind(this) );
     $('.close-new-clip').on('click', this.closeModal.bind(this) );
     $('#cassette').on('click', this.triggerPlay.bind(this) )
  },

  openModal: function(){
    this.modalView.showModal();
  },

  closeModal: function(){
    this.modalView.closeModal();
  },

  triggerPlay: function(){
    this.playView.playSong();
  }
}
