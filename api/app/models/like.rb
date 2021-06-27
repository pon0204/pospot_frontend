class Like < ApplicationRecord
  belongs_to :post
  belongs_to :user
  validates_uniqueness_of :post_id, scope: :user_id
  
  def already_liked?(post)
    self.likes.exists?(post_id: post.id)
  end
end
