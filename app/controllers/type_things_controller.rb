class TypeThingsController < ApplicationController
  include ActionController::Helpers
  helper ThingsHelper
  wrap_parameters :type_thing, include: ["thing_id", "type_id"]
  before_action :get_type, only: [:index, :update, :destroy]
  before_action :get_thing, only: [:thing_types]
  before_action :get_type_thing, only: [:update, :destroy]
  before_action :authenticate_user!, only: [:create, :update, :destroy]
  after_action :verify_authorized
  #after_action :verify_policy_scoped, only: [:linkable_types]

  def index
    authorize @type, :get_things?
    @type_things = @type.type_things.with_thing
  end

  def thing_types
    authorize @thing, :get_types?
    @type_things=@thing.type_things.with_type
    render :index 
  end

  def linkable_types
    authorize Type, :get_linkables?
    thing = Thing.find(params[:thing_id])
    #@types=policy_scope(Type.not_linked(thing))
    #need to exclude admins from seeing types they cannot link
    @types=Type.not_linked(thing)
    # @types=TypePolicy::Scope.new(current_user,@types).user_roles(true,false)
    # @types=TypePolicy.merge(@types)
    render "types/index"
  end

  def create
    type_thing = TypeThing.new(type_thing_create_params.merge({
                                  :thing_id=>params[:thing_id],
                                  :type_id=>params[:type_id],
                                  }))
    type=Type.where(id:type_thing.type_id).first
    if !type
      full_message_error "cannot find type[#{params[:type_id]}]", :bad_request
      skip_authorization
    elsif !Thing.where(id:type_thing.thing_id).exists?
      full_message_error "cannot find thing[#{params[:thing_id]}]", :bad_request
      skip_authorization
    else
      authorize type, :add_thing?
      if type_thing.save
        head :no_content
      else
        render json: {errors:@type_thing.errors.messages}, status: :unprocessable_entity
      end
    end
  end

  def update
    authorize @type, :update_thing?
    if @type_thing.update(type_thing_update_params)
      head :no_content
    else
      render json: {errors:@type_thing.errors.messages}, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @type, :remove_thing?
    @type_thing.destroy
    head :no_content
  end

  private
    def get_type
      @type ||= Type.find(params[:type_id])
    end
    def get_thing
      @thing ||= Thing.find(params[:thing_id])
    end
    def get_type_thing
      @type_thing ||= TypeThing.find(params[:id])
    end

    def type_thing_create_params
      params.require(:type_thing).tap {|p|
          #_ids only required in payload when not part of URI
          p.require(:thing_id)    if !params[:thing_id]
          p.require(:type_id)    if !params[:type_id]
        }.permit(:priority, :thing_id, :type_id)
    end
    def type_thing_update_params
      params.require(:type_thing).permit(:priority)
    end
end
