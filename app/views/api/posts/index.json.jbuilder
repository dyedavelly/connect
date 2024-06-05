@posts.each do |post|
   json.posts do 
      json.set! post.id do
         json.id post.id
         json.body post.body
         json.author_id post.author_id
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
