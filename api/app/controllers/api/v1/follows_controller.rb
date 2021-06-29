class Api::V1::FollowsController < SecuredController
  def create
    @current_user.follow!(params[:profile_id])
  end

  def delete
    @current_user.unfollow!(params[:account_id])
  end
end