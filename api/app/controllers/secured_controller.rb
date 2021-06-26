class SecuredController < ApplicationController
  before_action :authorize_request
  
  private

  def authorize_request
    @current_user = AuthorizationService.new(request.headers).current_user
    AuthorizationService.new(request.headers).create_profile
    AuthorizationService.new(request.headers).authenticate_request!

  rescue JWT::VerificationError, JWT::DecodeError
    render json: { errors: ['Not Authenticated'] }, status: :unauthorized
  end
end