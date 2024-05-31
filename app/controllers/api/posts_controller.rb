class Api::PostsController < ApplicationController

    def index
        @posts = Post.all
        render :index
    end

    def create
    end

    def edit
    end

    def delete
    end

    private
    def post_params
        params.require(:post).permit(:body, :author_id)
    end

end
