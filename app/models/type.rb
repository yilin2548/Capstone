class Type < ActiveRecord::Base
  include Protectable
  validates :name, :presence=>true

  has_many :type_things, inverse_of: :type, dependent: :destroy

  scope :not_linked, ->(thing) { where.not(:id=>TypeThing.select(:type_id)
                                                          .where(:thing=>thing)) }
end
