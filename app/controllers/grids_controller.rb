class GridsController < ApplicationController
  include GridHelper

  def index
    @grids = Grid.all
  end

  def show
    @grid = Grid.find(params[:id])
  end

  def new
    @grid = Grid.new
  end

  def data
    @grid = Grid.find(params[:id])
    squares = @grid.squares

    respond_to do |f|
      f.json { render :json => { data: squares.to_s } }
    end
  end

  def update
    @grid = Grid.find(params[:id])
    cell_id = params[:cellId].to_i
    squares = @grid.squares
    puts "*" * 50
    p squares[cell_id] = toggle_square(squares[cell_id])

    @grid.update_column(:squares, squares)

    respond_to do |f|
      f.json { render :json => { data: squares.to_s, cellId: cell_id.to_s } }
    end

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
