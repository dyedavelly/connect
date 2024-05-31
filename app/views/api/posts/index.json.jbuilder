@posts.each do |post|
   json.set! post.id do
        json.id post.id
        json.body post.body
        json.author_id post.author_id
   end
end