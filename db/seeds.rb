require "open-uri"
# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
#ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Comment.destroy_all
    Post.destroy_all
    User.destroy_all
   
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('posts')
    ApplicationRecord.connection.reset_pk_sequence!('comments')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    user1 = User.create!(
      email: 'demo@user.com', 
      password: 'password',
      first_name: 'Demo',
      last_name: 'User'
    )
    user2 = User.create!(
      email: 'dharani@gmail.com', 
      password: 'password',
      first_name: 'Dharani',
      last_name: 'Yedavelly'
    )
    user3 = User.create!(
      email: 'raja@gmail.com', 
      password: 'password',
      first_name: 'Raja',
      last_name: 'Ankilla'
    )
    user4 = User.create!(
      email: 'mourya@hotmail.com', 
      password: 'password',
      first_name: 'Mourya',
      last_name: 'Yadavally'
    )
    user5 = User.create!(
      email: 'pawan@gmail.com', 
      password: 'password',
      first_name: 'Pawan',
      last_name: 'Kalyan'
    )
    user6 = User.create!(
      email: 'david@gmail.com', 
      password: 'password',
      first_name: 'David',
      last_name: 'Brown'
    )
    user7 = User.create!(
      email: 'williams@gmail.com', 
      password: 'password',
      first_name: 'John',
      last_name: 'Williams'
    )
    user7 = User.create!(
      email: 'minghe@gmail.com', 
      password: 'password',
      first_name: 'Minghe',
      last_name: 'Lee'
    )
    user8 = User.create!(
      email: 'lucky@gmail.com', 
      password: 'password',
      first_name: 'Lucky',
      last_name: 'Singh'
    )
    user9 = User.create!(
      email: 'Mia@gmail.com', 
      password: 'password',
      first_name: 'Mia',
      last_name: 'Mayer'
    )
    user10 = User.create!(
      email: 'Maria@gmail.com', 
      password: 'password',
      first_name: 'Maria',
      last_name: 'Guadalupe'
    )



    user1.photo.attach(io: URI.open("https://connect-seeds.s3.amazonaws.com/demo-user.jpg"), filename: 'demo-user.jpg')
    user2.photo.attach(io: URI.open("https://connect-seeds.s3.amazonaws.com/dharani-yedavelly.jpeg"), filename: 'dharani-yedavelly.jpeg')
    user3.photo.attach(io: URI.open("https://connect-seeds.s3.amazonaws.com/raja-ankilla.jpg"), filename: 'raja-ankilla.jpg')
    user4.photo.attach(io: URI.open("https://connect-seeds.s3.amazonaws.com/mourya-yadavally.JPG"), filename: 'mourya-yadavally.jpg')
    user5.photo.attach(io: URI.open("https://connect-seeds.s3.amazonaws.com/pawan-kalyan.jpg"), filename: 'pawan-kalyan.jpg')
    

    puts "Creating posts..."

    post1 = Post.create!({
      body: 'Join Our Team! We are hiring a passionate Software Developer! If you are skilled in JavaScript, React, and Node.js, and love solving complex problems, we want you! Apply now to be a part of our innovative and dynamic team',
      author_id: 1,
    })
    post2 = Post.create!({
      body: 'Excited to announce I have joined ABC Inc. as the new Director of Operations! Thrilled to work with an incredible team and drive impactful projects. Looking forward to contributing to our shared success and growth. Thank you for the warm welcome!',
      author_id: 1,
    })
    post3 = Post.create!({
      body: 'Thrilled to join the dynamic team at XYZ Corp. Looking forward to contributing to innovative projects and making a positive impact. Ready for the new challenges ahead!',
      author_id: 2,
    })
    post4 = Post.create!({
      body: 'Great insights and takeaways from today’s webinar on digital accessibility! Thanks to all who participated and contributed to the lively discussion. Lets continue to drive change together.',
      author_id: 3,
    })
    post5 = Post.create!({
      body: 'Proud to share that our team received the Best Innovation Award at the industry gala last night. This recognition is a testament to our hard work and dedication. Thank you to everyone who supported us!',
      author_id: 2,
    })
    post6 = Post.create!({
      body: 'Just published a new article on sustainable business practices. Exploring how companies can integrate eco-friendly strategies into their operations. Check it out and share your thoughts!',
      author_id: 4,
    })
    post7 = Post.create!({
      body: 'Networking at its best at the annual tech conference! Grateful for the inspiring conversations and new connections. Looking forward to leveraging these insights in our projects.',
      author_id: 5,
    })
    post8 = Post.create!({
      body: 'Celebrating 5 years at ABC Ltd. It has been an incredible journey filled with growth, learning, and achievements. Grateful for the support of my amazing colleagues and looking forward to many more milestones!',
      author_id: 5,
    })

    post1.image.attach(io: URI.open("https://connect-seeds.s3.amazonaws.com/hiring-image.png"), filename: 'hiring-image.png')
    post2.image.attach(io: URI.open("https://connect-seeds.s3.amazonaws.com/new-role-image.png"), filename: 'new-role-image.jpg')
    post3.image.attach(io: URI.open("https://connect-seeds.s3.amazonaws.com/new-role-image.png"), filename: 'new-role-image.jpg')
    post6.image.attach(io: URI.open("https://connect-seeds.s3.amazonaws.com/sustainable-practices.png"), filename: 'sustainable-practices.png')
    post8.image.attach(io: URI.open("https://connect-seeds.s3.amazonaws.com/celebration-image.png"), filename: 'celebration-image.png')
    
    puts "Creating comments..."
    comment1 = Comment.create!({
      body: 'I am intrested',
      author_id: 2,
      post_id: 1
    })

    comment2 = Comment.create!({
      body: 'Congratulations!',
      author_id: 3,
      post_id: 2
    })

    comment3 = Comment.create!({
      body: 'Congratulations!',
      author_id: 4,
      post_id: 2
    })

    puts "Done!"
  #end