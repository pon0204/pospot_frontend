class Api::V1::PostsController < SecuredController
  skip_before_action :authorize_request, only: [:index,:show,:spot]

  def index
    posts = Post.all
    render json: {
      posts: posts
    }, 
    methods: [:image_url],
    status: :ok
  end

  def show
    # postとspotと画像のurlを返す
    post = Post.find(params[:id])
    image = post.image_url
    spot = post.spot

    render json: {
      post: post,
      image_url: image,
      spot: spot,
    },

    status: :ok
  end

  def create

    post_data = post_params
    
    # 画像がnullか確認
    if post_data['eyecatch'] == '' then
      post_data.delete('eyecatch')
    end

    post = @current_user.posts.build(post_data)
    
    if post.save
      render json: post,
      methods: [:image_url]
    else
      render json: post.errors, status: 422
    end
  end

  def destroy
    if Post.destroy(params[:id])
      head :no_content
    else
      render json: { error: "Failed to destroy" }, status: 422
    end
  end

  private
  def post_params
    params.permit(:title, :caption,:with,:genre,:eyecatch)
  end

end
