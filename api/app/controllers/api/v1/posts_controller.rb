class Api::V1::PostsController < SecuredController
  skip_before_action :authorize_request, only: [:index,:show]

  def index
    posts = Post.all
    render json: {
      posts: posts
    }, 
    methods: [:image_url],
    status: :ok
  end

  def show
    posts = Post.find(params[:id])
    render json: {
      posts: posts
    },
    methods: [:image_url],
    status: :ok
  end

  def create
    post = @current_user.posts.build(post_params)
    
    if post.save
      render json: post, methods: [:image_url]
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
