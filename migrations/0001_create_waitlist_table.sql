-- Create waitlist table for storing email signups
CREATE TABLE IF NOT EXISTS waitlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  timestamp TEXT NOT NULL,
  ip TEXT,
  userAgent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster duplicate checks
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Create index on timestamp for ordering
CREATE INDEX IF NOT EXISTS idx_waitlist_timestamp ON waitlist(timestamp DESC);
