class Api::V1::SpotsController < SecuredController
  skip_before_action :authorize_request, only: [:index,:show,:spot_detail,:create]

  def create
    # 投稿IDを取得
    post_id = params.permit(:id)
    post_id = post_id['id']
    # 投稿を格納
    post = Post.find_by(id: post_id)
  
    spot = post.build_spot(spot_params)

    if spot.save
      render json: spot 
    else
      render json: spot.errors, status: 422
    end
  end

  def spot_detail
    place_id = (params[:place_id])
    key = ENV['PLACE_API_KEY']
    # 詳細検索
    response = Faraday.get("https://maps.googleapis.com/maps/api/place/details/json?place_id=#{place_id}&key=#{key}&language=ja")
    body = JSON.parse(response.body)
    body = body['result']

    body = {
      name: body['name'],
      web_url: body['website'],
      map_url: body['url'],
      place: body['formatted_address'],
      place_id: body['place_id'],
    }
    render json: {
      spot: body
    }
  end

  private 
  def spot_params
  params.require(:spot).permit(:name,:web_url,:map_url,:place,:place_id)
  end
end