CREATE OR ALTER TRIGGER trig_users_on_updated
ON users
AFTER UPDATE
AS
  UPDATE users
  SET
    updated_at = SYSDATETIMEOFFSET()
  WHERE
    id IN (SELECT id FROM inserted)
;
