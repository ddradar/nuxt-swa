DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id varchar(32) NOT NULL PRIMARY KEY,
  name varchar(100) NOT NULL,
  created_at datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET(),
  updated_at datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET()
);
