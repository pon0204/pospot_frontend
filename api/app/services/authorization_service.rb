class AuthorizationService

  def initialize(headers = {})
    @headers = headers
  end

  def current_user
    @user
  end


  def authenticate_request!
    @auth_payload, @auth_header = verify_token
    @user = User.from_token_payload(@auth_payload)
    verify_token
  end
  
  private
  def http_token
    if @headers['Authorization'].present?
      @headers['Authorization'].split(' ').last
    end
  end

  def verify_token
    JsonWebToken.verify(http_token)
  end


end