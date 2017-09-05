class User < ApplicationRecord
    has_secure_password
    EMAIL_REGEX = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
    validates :email, :presence => true, :uniqueness => true, :format => EMAIL_REGEX
    validates :password, :presence => true
end
