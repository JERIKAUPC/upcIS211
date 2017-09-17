class CreateAccessForms < ActiveRecord::Migration[5.1]
  def change
    create_table :access_forms do |t|
      t.string :name

      t.timestamps
    end
  end
end
