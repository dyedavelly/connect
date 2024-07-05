@posts.each do |post|
   json.posts do 
      json.set! post.id do
         json.id post.id
         json.body post.body
         json.author_id post.author_id
         json.imageUrl post.image.attached? ? post.image.url : nil
         json.createdAt post.created_at
         json.updatedAt post.updated_at
      end
   end
   json.users do 
      user = post.author
      json.set! user.id do
         json.extract! user, :id, :email, :first_name, :last_name, :created_at, :updated_at
         json.photoUrl user.photo.attached? ? user.photo.url : nil
      end
   end
end
@comments.each do |comment|
   json.comments do
      json.set! comment.id do 
         json.id comment.id
         json.body comment.body
         json.post_id comment.post_id
         json.author_id comment.author_id
      end
   end
end
