class RemoveCreatorIdFromTypes < ActiveRecord::Migration
  def change
    remove_column :types, :creator_id, :integer
  end
end
