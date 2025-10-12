-- Fix role column to support all required values
-- Run this script on your DigitalOcean database

-- Check current role column type
SHOW COLUMNS FROM users WHERE Field = 'role';

-- Modify role column to accept the correct ENUM values
ALTER TABLE users 
MODIFY COLUMN role ENUM('admin', 'editor', 'superAdmin') NOT NULL DEFAULT 'editor';

-- Verify the change
SHOW COLUMNS FROM users WHERE Field = 'role';

-- Also ensure status column is correct
ALTER TABLE users 
MODIFY COLUMN status ENUM('active', 'inactive', 'suspended') NOT NULL DEFAULT 'active';

SHOW COLUMNS FROM users WHERE Field = 'status';
