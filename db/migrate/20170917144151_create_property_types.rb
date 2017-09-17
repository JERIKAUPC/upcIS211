class CreatePropertyTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :property_types do |t|
      t.string :property
      t.string :icon_class
      t.string :icon_image

      t.timestamps
    end
  end
end
