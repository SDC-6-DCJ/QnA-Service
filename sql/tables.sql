/*
  Make sure to create `qna` database first!
  Run with psql qna -f filePath
  For Jake - psql qna -f Galvanize/seniorProjects/QnA-Service/pgres.sql
*/

CREATE TABLE questions (
  question_id SERIAL NOT NULL PRIMARY KEY,
  question_body VARCHAR(300),
  question_date DATE,
  asker_name VARCHAR(50),
  question_helpfulness INT,
  reported BOOLEAN
);
CREATE TABLE answers (
  id SERIAL NOT NULL PRIMARY KEY,
  question_id INT NOT NULL,
  body VARCHAR(300),
  date_written DATE,
  answerer_name VARCHAR(50),
  answerer_email VARCHAR(50),
  reported BOOLEAN,
  helpfulness INT
);
CREATE TABLE photos (
  id SERIAL NOT NULL PRIMARY KEY,
  answer_id INT NOT NULL,
  url VARCHAR(100)
);
