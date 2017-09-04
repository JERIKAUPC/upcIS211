class CreateOffers < ActiveRecord::Migration[5.1]
  def change
    create_table :offers do |t|
      t.integer :User_id
      t.integer :height
      t.integer :width
      t.integer :length
      t.date :date_start
      t.date :date_end
      t.string :address
      t.string :location

      t.timestamps
    end
  end
end
