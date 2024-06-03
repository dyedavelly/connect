json.post do
  json.extract! @post, :body, :author_id, :created_at, :updated_at
end
