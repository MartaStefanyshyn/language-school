class CreateMenus < ActiveRecord::Migration
  def change
    create_table :menus do |t|
      t.integer :parent_id
      t.string :name
      t.string :url

      t.timestamps null: false
    end
  end
end
