-- Insert mock data into posts table
INSERT INTO posts (title, description, authId)
VALUES
    ('Introduction to JavaScript', 'A beginner guide to JavaScript programming.', 'auth0|684bd7c5cdf3177ad36af6f7'),
    ('Database Design Basics', 'Learn the fundamentals of designing relational databases.', 'auth0|684bd7c5cdf3177ad36af6f7'),
    ('Web Development Trends 2025', 'Explore the latest trends in web development.', 'auth0|684bd7c5cdf3177ad36af6f7')
RETURNING id;

-- Insert mock data into categories table
INSERT INTO categories (name)
VALUES
    ('Programming'),
    ('Databases'),
    ('Web Development')
RETURNING id;

-- Insert mock data into post_categories junction table
-- Assuming the UUIDs generated above for posts and categories (replace with actual UUIDs if needed)
INSERT INTO post_categories (postId, categoryId)
VALUES
    ((SELECT id FROM posts WHERE title = 'Introduction to JavaScript'), (SELECT id FROM categories WHERE name = 'Programming')),
    ((SELECT id FROM posts WHERE title = 'Database Design Basics'), (SELECT id FROM categories WHERE name = 'Databases')),
    ((SELECT id FROM posts WHERE title = 'Web Development Trends 2025'), (SELECT id FROM categories WHERE name = 'Web Development')),
    ((SELECT id FROM posts WHERE title = 'Introduction to JavaScript'), (SELECT id FROM categories WHERE name = 'Web Development')),
    ((SELECT id FROM posts WHERE title = 'Web Development Trends 2025'), (SELECT id FROM categories WHERE name = 'Programming'));