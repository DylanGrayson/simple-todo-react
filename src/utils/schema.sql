
/* 
* While Groups are only their names, and technically don't
* need their own table, this makes it easier to add properties
* to the group entity in the future.
*/
CREATE TABLE TaskGroup (
  id int NOT NULL UNIQUE AUTO_INCREMENT,
  name varchar(255) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

/*
* The Task table is fairly straight-forward, although it is
* worth noting that there are no dependencies on this table.
*/
CREATE TABLE Task (
  id int NOT NULL UNIQUE AUTO_INCREMENT,
  task varchar(255) NOT NULL,
  groupID int,
  completedAt date,
  PRIMARY KEY (id),
  FOREIGN KEY (groupID) REFERENCES TaskGroup (id)
);

/*
* This table keeps track of which tasks are dependent on
* which other tasks. Both ids should be valid tasks, and
* the pair of ids should be unique.
*/
CREATE TABLE TaskDependencyMap (
  subjectID int NOT NULL,
  isDependentOn int NOT NULL,
  FOREIGN KEY (subjectID) REFERENCES Task (id),
  FOREIGN KEY (isDependentOn) REFERENCES Task (id),
  CONSTRAINT unique_ids UNIQUE(subjectID, isDependentOn)
);

/*
* This trigger adds extra constraints to the TaskDependencyMap
* table. Tasks should not be dependent on themselves, and
* there should be no direct circular dependencies, because
* otherwise the two could be unable to be unlocked. This also
* does not stop longer circular dependency chains, ie. a->b->c->a
* which will have to be controlled at the application level.
*/
DELIMITER $$
CREATE TRIGGER ensure_no_circular_deps 
  BEFORE INSERT ON TaskDependencyMap
  FOR EACH ROW
  BEGIN
    IF EXISTS(
      SELECT * FROM TaskDependencyMap tdm
      WHERE tdm.subjectID = NEW.isDependentOn
      AND tdm.isDependentOn = NEW.subjectID
    ) THEN
      SIGNAL SQLSTATE "45000";
    ELSEIF NEW.isDependentOn = NEW.subjectID THEN
      SIGNAL SQLSTATE "45000";
    END IF;
  END;
$$
DELIMITER ;