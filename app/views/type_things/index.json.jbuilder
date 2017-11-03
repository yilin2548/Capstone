json.array!(@type_things) do |tt|
  json.extract! tt, :id, :type_id, :thing_id, :created_at, :updated_at
  json.type_name tt.type_name        if tt.respond_to?(:type_name)
  json.thing_name tt.thing_name  if tt.respond_to?(:thing_name)
end
