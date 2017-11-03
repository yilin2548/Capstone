class RemoveCreatorIdFromTypeThings < ActiveRecord::Migration
  def change
    remove_column :type_things, :creator_id, :integer
  end
end
