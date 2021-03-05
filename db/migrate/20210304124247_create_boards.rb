class CreateBoards < ActiveRecord::Migration[6.1]
  def change
    create_table :boards do |t|
      t.string :title, comment: '제목'
      t.text :content, comment: '내용'

      t.timestamps
    end
  end
end
