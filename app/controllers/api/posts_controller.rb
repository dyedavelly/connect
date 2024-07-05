class Api::PostsController < ApplicationController

    def index
        @posts = Post.all.includes(:author)
        @comments = Comment.all
        render :index
    end

    def create
        @post = Post.new(post_params)
        @post.author_id = current_user.id
        if @post.save!
            render :show
        else 
            render json: {errors: ['Post cannot be saved']}, status: :unauthorized
        end
    end

    def update
        @post = Post.find(params[:id])

        if @post.update(post_params)
            render :show
        else 
            render json: @post.errors.full_messages, status: 422
        end
    end

    def destroy
        @post = Post.find(params[:id])
        @post.destroy
    end

    private
    def post_params
        params.require(:post).permit(:body)
    end

end
