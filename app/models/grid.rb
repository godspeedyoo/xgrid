class Grid < ActiveRecord::Base
  serialize :squares, Hash

end
