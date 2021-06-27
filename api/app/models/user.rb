class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  has_one :profile, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :liked_posts, through: :likes, source: :post

  def self.from_token_payload(payload)    
    find_by(sub: payload['sub']) || create!(sub: payload['sub'])
    # Profile.create!(name: payload['name'])
  end

  def self.profile_create_payload(payload)
    user = User.find_by(sub: payload['sub']) 
    
    if(user.profile.blank?)
    profile = user.build_profile(nickname: "ユーザー#{user['id']}")
    profile.save
    end
  end

end

