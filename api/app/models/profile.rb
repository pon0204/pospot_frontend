class Profile < ApplicationRecord
  belongs_to :user
  has_one_attached :avatar

  def image_url
    avatar.attached? ? url_for(avatar) : nil
  end
end
