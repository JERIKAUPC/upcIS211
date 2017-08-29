class CreateVehicles < ActiveRecord::Migration[5.1]
  def change
    create_table :vehicles do |t|
      t.integer :user_id
      t.string :plate_str
      t.string :brand_str
      t.string :model_str
      t.string :color_str
      t.integer :height_int
      t.integer :width_int
      t.integer :length_int
      t.string :picture_str

      t.timestamps
    end
  end
end
