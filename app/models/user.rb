# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  first_name      :string           not null
#  last_name       :string           not null
#
class User < ApplicationRecord
    has_secure_password
    before_validation :ensure_session_token
    validates :email, length: {in: 3..100 }, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: {in: 6..40}, allow_nil: true
    validates :first_name, :last_name, presence: true

    has_one_attached :photo

    has_many :posts,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :Post

    has_many :comments,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :Comment

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        if user && user.authenticate(password)
            return user
        else
            nil 
        end
    end

    def reset_session_token!
        self.session_token = generate_unique_session_token
        self.save!
        self.session_token
    end

    private
    def generate_unique_session_token
        while true
            token = SecureRandom.urlsafe_base64
            if !User.exists?(session_token: token)
                return token
            end
        end   
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end

end
