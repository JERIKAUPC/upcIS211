class CreateAccessForms < ActiveRecord::Migration[5.1]
  def change
    create_table :access_forms do |t|
      t.string :access_form

      t.timestamps
    end
  end
end
