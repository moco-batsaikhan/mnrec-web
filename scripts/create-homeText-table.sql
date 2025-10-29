-- homeText table migration
CREATE TABLE IF NOT EXISTS homeText (
  id INT AUTO_INCREMENT PRIMARY KEY,
  en_keyWord VARCHAR(255) NOT NULL,
  mn_keyWord VARCHAR(255) NOT NULL,
  en_keyNote TEXT NOT NULL,
  mn_keyNote TEXT NOT NULL,
  en_slogan_text TEXT NOT NULL,
  mn_slogan_text TEXT NOT NULL,
  status ENUM('active','inactive') DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);