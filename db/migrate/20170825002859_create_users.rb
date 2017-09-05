class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.integer :phone
      t.string :dni, null: true
      t.string :gender, null: true
      t.date :birthday, null: true
      t.string :picture, null: true

      t.timestamps
    end
    add_index :users, :email, unique: true
  end
end
