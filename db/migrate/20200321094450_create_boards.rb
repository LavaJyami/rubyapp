class CreateBoards < ActiveRecord::Migration[6.0]
  def change
    create_table :boards do |t|
      t.string :value
      t.string :array

      t.timestamps
    end
  end
end
