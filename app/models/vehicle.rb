class Vehicle < ApplicationRecord
    validates :user_id, :presence => true
    validates :plate_str, :presence => true, :uniqueness => true
    validates :brand_str, :presence => true
    validates :model_str, :presence => true
    validates :color_str, :presence => true
    validates :height_int, :presence => true
    validates :width_int, :presence => true
    validates :length_int, :presence => true
    validates :picture_str, :presence => true
end
