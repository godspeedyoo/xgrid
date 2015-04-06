class GridController < ApplicationController

  def show
    @grid = Grid.find(params[:size])
  end

  def create
    @grid = Grid.find_or_create_by(grid_params)

    if @grid.save
      redirect_to @grid
    else
      render 'new'
    end
  end


  private

  def grid_params
    params.require(:grid).permit(:size)
  end

end
