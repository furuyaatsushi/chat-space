class UsersController < ApplicationController
  before_action :set_group, only: :index
  
  def index
  end

  def search
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").where.not(id: current_user)
    respond_to do |format|
      format.html
      format.json { render 'index', json: @users }
    end
  end

  def find
    @user = User.find(params[:user_id])
    respond_to do |format|
      format.html
      format.json { render 'index', json: @user }
    end
  end
  
  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :keyword)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
