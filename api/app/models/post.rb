class Post < ApplicationRecord
  include Rails.application.routes.url_helpers

  belongs_to :user

  has_one_attached :eyecatch
  def image_url
    # 紐づいている画像のURLを取得する
    eyecatch.attached? ? url_for(eyecatch) : nil
  end
end
