class Api::V1::UsersController < SecuredController
  skip_before_action :authorize_request, only: [:index,:show,:spot]

  def user_id
    render json: @current_user['id']
  end

end