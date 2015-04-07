class Grid < ActiveRecord::Base
  serialize :squares, Array
  after_create :fill_squares

  private

  def fill_squares
    length = self.size * self.size
    self.update_column(:squares, Array.new(length) { 0 })
  end

end
