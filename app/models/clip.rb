class Clip < ActiveRecord::Base
  belongs_to  :user
  has_many    :votes

  before_save :add_https

  def self.get_next_clip(user, song_url)
    if song_url == "https://srv23.cloudconvert.org/download/i7F82KLc"
      potential_next_songs = self.where(created_at: (Time.now - 1.day)..Time.now + 1.day)
      voted_on = potential_next_songs.includes(:votes).where('votes.user_id = ?', user.id).references(:votes)
      clip_link = (potential_next_songs - voted_on).sample.clip_link
      render :text => clip_link, layout: false
    else
      potential_next_songs = self.where(created_at: (Time.now - 1.day)..Time.now + 1.day)
      voted_on = potential_next_songs.includes(:votes).where('votes.user_id = ?', user.id).references(:votes)
      clip_link = (self.all - voted_on).sample.clip_link
      if clip_link
        clip_link
      else
        "end"
      end
    end
  end

  def add_https
    if self.clip_link.match("https://")
    else
      self.clip_link = "https:" + self.clip_link
    end
  end
end