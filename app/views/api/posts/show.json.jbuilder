json.post do
  json.extract! @post, :body, :id, :author_id, :created_at, :updated_at
  json.imageUrl @post.image.attached? ? @post.image.url : nil
end
