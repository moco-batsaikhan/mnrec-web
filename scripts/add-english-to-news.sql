-- Add English language columns to news table
ALTER TABLE news 
ADD COLUMN en_title VARCHAR(500) NULL AFTER title,
ADD COLUMN en_content LONGTEXT NULL AFTER content,
ADD COLUMN en_summary TEXT NULL AFTER summary;

-- Drop old FULLTEXT index (if exists)
-- Note: DROP INDEX IF EXISTS не работает во всех версиях MySQL
DROP INDEX idx_search ON news;

-- Update FULLTEXT index to include English fields
CREATE FULLTEXT INDEX idx_search ON news (title, content, summary, en_title, en_content, en_summary);
