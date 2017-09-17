class Offer < ApplicationRecord
  belongs_to :user
  belongs_to :property_type
  belongs_to :access_form
  belongs_to :vehicle_type
end
