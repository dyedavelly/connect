class CreateComments < ActiveRecord::Migration[7.1]
  def change
    create_table :comments do |t|
      t.text :body, null: false
      t.bigint :author_id, null: false
      t.bigint :post_id, null: false
      t.timestamps
    end
    add_foreign_key :comments, :users, column: :author_id
    add_foreign_key :comments, :posts, column: :post_id
  end
end
