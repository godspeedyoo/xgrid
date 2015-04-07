class GridController < ApplicationController

  def show
    @grid = Grid.find(params[:size])
  end

  def create
    dimension = params[:size]

    @grid = Grid.find_or_create_by(grid_params)

    unless @grid.squares.size > 0
      (dimension * dimension).times do
        @grid.squares.create
      end
    end

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
