class Api::V1::ProfilesController < SecuredController
  skip_before_action :authorize_request, only: [:index,:show,:spot]

  def index
    profiles = Profile.all
    render json: {
      profiles: profiles
    }, 
    methods: [:avatar_url],
    status: :ok
  end

  def show
    # profileとspotと画像のurlを返す
    
    # binding.pry
    
    profile = Profile.find(params[:id])

    render json: {
      profile: profile,
    },
    methods: [:avatar_url],
    status: :ok
  end

  def update

    profile_data = profile_params    
    # 画像がnullか確認
    if profile_data['avatar'] == '' || profile_data['avatar'] == 'undefined' then
      profile_data.delete('avatar')
    end
    
    profile = @current_user.profile || @current_user.build_profile
    
    profile.assign_attributes(profile_data)    
      
    if profile.save
      render json: profile,
      methods: [:avatar_url]
    else
      render json: profile.errors, status: 422
    end
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

  def prepare_profile
    profile || build_profile #もしカレントユーザーのプロフィールがあったら取得 ||はオアーの分岐
  end

end