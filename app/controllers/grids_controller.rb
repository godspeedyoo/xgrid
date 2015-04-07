class GridsController < ApplicationController
  def index
    @grids = Grid.all
  end

  def show
    @grid = Grid.find(params[:id])
  end

  def new
    @grid = Grid.new
  end

  def update
    p "------------------------------ UPDATE HIT"
    @grid = Grid.find(params[:id])
    cell_id = params[:cellId].to_i
    p squares = @grid.squares
    
    if squares[cell_id] == 0
      squares[cell_id] = 1
    else
      squares[cell_id] = 0
    end
    
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
