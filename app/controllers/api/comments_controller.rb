class Api::CommentsController < ApplicationController

    def create
        @comment = Comment.new(comment_params)
        @comment.author_id = current_user.id
        @comment.post_id = params[:post_id]
        if @comment.save!
            render :show
        else 
            render json: {errors: ['Comment cannot be saved']}, status: :unauthorized
        end
    end

    def update
        @comment = Comment.find(params[:id])

        if @comment.update(comment_params)
            render :show
        else 
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def destroy
        @comment = Comment.find(params[:id])
        @comment.destroy
    end

    private
    def comment_params
        params.require(:comment).permit(:body)
    end

end