class Post < ApplicationRecord
  include Rails.application.routes.url_helpers
  has_one :spot, dependent: :destroy
  belongs_to :user
  has_many :likes, dependent: :destroy
  has_many :liked_users, through: :likes, source: :user
  has_one_attached :eyecatch
  
  # 紐づいている画像のURLを取得する
  def image_url
    eyecatch.attached? ? url_for(eyecatch) : nil
  end
  
  def avatar_url
    avatar.attached? ? url_for(avatar) : nil
  end

end
