class CreateVehicleTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :vehicle_types do |t|
      t.string :vehicle
      t.string :icon_class
      t.string :icon_image
      t.integer :order

      t.timestamps
    end
  end
end
