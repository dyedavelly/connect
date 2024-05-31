class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.text :body, null: false
      t.bigint :author_id, null: false
      t.timestamps
    end
    add_index :posts, :author_id
    add_foreign_key :posts, :users, column: :author_id
  end
end
