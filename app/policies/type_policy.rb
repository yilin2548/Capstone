class TypePolicy < ApplicationPolicy
  def index?
    true
  end

  def show?
    true
  end

  def create?
    true
  end

  def update?
    organizer?
  end

  def destroy?
    organizer_or_admin?
  end

  def get_linkables?
    true
  end

  def get_things?
    true
  end

  def add_thing?
    # organizer?
    true
  end

  def update_thing?
    organizer?
  end

  def remove_thing?
    # organizer?
    true
  end

  class Scope < Scope
    def user_roles members_only=true, allow_admin=true
      include_admin=allow_admin && @user && @user.is_admin?
      member_join = members_only && !include_admin ? "join" : "left join"
      joins_clause=["#{member_join} Roles r on r.mname='Type'",
                    "r.mid=Types.id",
                    "r.user_id #{user_criteria}"].join(" and ")
      scope.select("Types.*, r.role_name")
           .joins(joins_clause)
           .tap {|s|
             if members_only
               s.where("r.role_name"=>[Role::ORGANIZER, Role::MEMBER])
             end}
    end
    def resolve
      user_roles 
    end
  end
end
