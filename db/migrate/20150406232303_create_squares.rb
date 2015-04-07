class CreateSquares < ActiveRecord::Migration
  def change
    create_table :squares do |t|
      t.boolean :tapped, default: false
      t.references :grid, index: true

      t.timestamps null: false
    end
  end
end
