# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170917145226) do

  create_table "access_forms", force: :cascade do |t|
    t.string "access_form"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "offers", force: :cascade do |t|
    t.integer "user_id"
    t.string "address"
    t.decimal "latitude", precision: 20, scale: 14
    t.decimal "longitude", precision: 20, scale: 14
    t.integer "quantity"
    t.string "days"
    t.integer "horary_id"
    t.time "check_in_time"
    t.time "check_out_time"
    t.integer "is_independent"
    t.integer "leave_keys"
    t.integer "move_car"
    t.text "indications_first_day"
    t.string "image_1"
    t.string "image_2"
    t.string "image_entrance"
    t.decimal "price", precision: 20, scale: 2
    t.integer "status"
    t.integer "access_form_id"
    t.integer "property_type_id"
    t.integer "vehicle_type_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["access_form_id"], name: "index_offers_on_access_form_id"
    t.index ["property_type_id"], name: "index_offers_on_property_type_id"
    t.index ["user_id"], name: "index_offers_on_user_id"
    t.index ["vehicle_type_id"], name: "index_offers_on_vehicle_type_id"
  end

  create_table "property_types", force: :cascade do |t|
    t.string "property"
    t.string "icon_class"
    t.string "icon_image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.integer "phone"
    t.string "dni"
    t.string "gender"
    t.date "birthday"
    t.string "picture"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  create_table "vehicle_types", force: :cascade do |t|
    t.string "vehicle"
    t.string "icon_class"
    t.string "icon_image"
    t.integer "order"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "vehicles", force: :cascade do |t|
    t.integer "user_id"
    t.string "plate_str"
    t.string "brand_str"
    t.string "model_str"
    t.string "color_str"
    t.integer "height_int"
    t.integer "width_int"
    t.integer "length_int"
    t.string "picture_str"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
