class ParkingController < ApplicationController
  layout 'only_header'
  include ApplicationHelper
  
  before_action :authenticate, except: [:show]
  
  def show
  end

  def new
  end

  def create
  end

  def edit
    @id = params[:id]
  end

  def update
  end

  def destroy
  end
end
