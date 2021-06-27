class Api::V1::LikesController < SecuredController
  skip_before_action :authorize_request, only: [:create,:destroy]

  def create
    like = @current_user.likes.create(post_id: params[:post_id])
    render json: like
  end

  def destroy
    like = Like.find_by(post_id: params[:post_id], user_id: current_user.id)
    like.destroy
  end
end