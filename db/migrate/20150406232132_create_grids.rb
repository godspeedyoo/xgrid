class CreateGrids < ActiveRecord::Migration
  def change
    create_table :grids do |t|
      t.integer :size
      t.text :squares

      t.timestamps null: false
    end
  end
end
