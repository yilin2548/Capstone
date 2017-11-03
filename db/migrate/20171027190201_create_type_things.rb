class CreateTypeThings < ActiveRecord::Migration
  def change
    create_table :type_things do |t|
      t.references :thing, index: true, foreign_key: true
      t.references :type, index: true, foreign_key: true
      t.integer :creator_id, {null: false}

      t.timestamps null: false
    end
    add_index :type_things, [:type_id, :thing_id], unique:true
  end
end
