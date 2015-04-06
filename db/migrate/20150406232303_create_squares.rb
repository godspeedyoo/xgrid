class CreateSquares < ActiveRecord::Migration
  def change
    create_table :squares do |t|
      t.boolean :tapped
      t.references :grid, index: true

      t.timestamps null: false
    end
  end
end
