class CreateDeals < ActiveRecord::Migration[5.1]
  def change
    create_table :deals do |t|
      t.belongs_to :offer, foreign_key: "offer_id"
      t.belongs_to :user, foreign_key: "user_id"
      t.date :ini_date
      t.date :fin_date
      t.integer :canceled

      t.timestamps
    end
  end
end
