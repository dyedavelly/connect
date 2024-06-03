# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Post.destroy_all
    User.destroy_all
   
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('posts')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      email: 'demo@user.com', 
      password: 'password'
    )
    User.create!(
      email: 'dharani@gmail.com', 
      password: 'password'
    )

    10.times do 
      User.create!({
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end

    puts "Creating posts..."

    Post.create!({
      body: 'Accessibility Guidelines',
      author_id: 1,
    })
    Post.create!({
      body: 'Celebrating 5years at Google',
      author_id: 2,
    })
    Post.create!({
      body: 'I am hiring for a software Engineer',
      author_id: 3,
    })
    Post.create!({
      body: 'I am happy to share my new role at Microsoft',
      author_id: 2,
    })
    Post.create!({
      body: 'Tesla Layoff story',
      author_id: 4,
    })
    Post.create!({
      body: 'Happy to announce my new certification',
      author_id: 5,
    })
    Post.create!({
      body: 'test',
      author_id: 5,
    })

    puts "Done!"
  end