class Api::V1::profilesController < SecuredController
  skip_before_action :authorize_request, only: [:index,:show,:spot,:update]

  def index
    profile = Profile.all
    render json: {
      profiles: profiles
    }, 
    methods: [:image_url],
    status: :ok
  end

  def show
    # profileとspotと画像のurlを返す
    profile = profile.find(params[:id])
    image = profile.image_url

    render json: {
      profile: profile,
      image_url: image,
    },
    status: :ok
  end

  def create
    profile_data = profile_params    
    # 画像がnullか確認
    if profile_data['avatar'] == '' then
      profile_data.delete('avatar')
    end

    profile = @current_user.build_profile(profile_data)
    
    if profile.save
      render json: profile,
      methods: [:image_url]
    else
      render json: profile.errors, status: 422
    end
  end

  def update

    profile_data = profile_params

    # 画像がnullか確認
    if profile_data['avatar'] == '' then
      profile_data.delete('avatar')
    end

    profile = profile.find(params[:id])
    profile.update(profile_data)
  end

  def destroy
    if profile.destroy(params[:id])
      head :no_content
    else
      render json: { error: "Failed to destroy" }, status: 422
    end
  end

  private
  def profile_params
    params.permit(:nickname, :gender,:introduction,:twitter_url,:instagram_url,:avatar)
  end

end
