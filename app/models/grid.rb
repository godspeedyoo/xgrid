class Grid < ActiveRecord::Base
  serialize :squares, Array

end
