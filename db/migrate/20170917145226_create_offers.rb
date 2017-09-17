class CreateOffers < ActiveRecord::Migration[5.1]
  def change
    create_table :offers do |t|
      t.belongs_to :user
      t.string :address
      t.decimal :latitude, precision: 20, scale:14
      t.decimal :longitude, precision: 20, scale:14
      t.integer :quantity
      t.string :days
      t.integer :horary_id
      t.time :check_in_time
      t.time :check_out_time
      t.integer :is_independent
      t.integer :leave_keys
      t.integer :move_car
      t.text :indications_first_day
      t.string :image_1
      t.string :image_2
      t.string :image_entrance
      t.decimal :price, precision: 20, scale:2
      t.integer :status
      t.belongs_to :access_form
      t.belongs_to :property_type
      t.belongs_to :vehicle_type

      t.timestamps
    end
  end
end
