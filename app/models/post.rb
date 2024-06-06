# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  body       :text             not null
#  author_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Post < ApplicationRecord
    validates :body, :author_id, presence: true

    has_one_attached :image

    belongs_to :author,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :User
end
