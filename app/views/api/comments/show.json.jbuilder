json.comment do
  json.extract! @comment, :body, :id, :author_id, :post_id, :created_at, :updated_at
end
