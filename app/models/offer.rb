class Offer < ApplicationRecord
    validates :User_id, :presence => true
    validates :height, :presence => true 
    validates :width, :presence => true
    validates :length, :presence => true
    validates :date_start, :presence => true
    validates :date_end, :presence => true
    validates :address, :presence => true
    validates :location, :presence => true
end
