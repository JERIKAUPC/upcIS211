class CreatePropertyTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :property_types do |t|
      t.string :name
      t.string :icon_class, null: true
      t.string :icon_image, null: true

      t.timestamps
    end
  end
end
