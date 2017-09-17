class CreateVehicleTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :vehicle_types do |t|
      t.string :name
      t.string :icon_class, null: true
      t.string :icon_image, null: true
      t.integer :order

      t.timestamps
    end
  end
end
