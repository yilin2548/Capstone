class TypeThing < ActiveRecord::Base
  belongs_to :thing
  belongs_to :type
  validates :type, :thing, presence: true

  scope :with_type,    ->{ joins(:type).select("type_things.*, types.name as type_name")}
  scope :with_thing, ->{ joins(:thing).select("type_things.*, things.name as thing_name")}
end
