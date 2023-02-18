/*
  Make sure to create `qna` database first!
  Run with psql qna -f filePath
  For Jake - psql qna -f Galvanize/seniorProjects/QnA-Service/pgres.sql
*/

DROP TABLE questions CASCADE;
DROP TABLE answers CASCADE;
DROP TABLE photos;

CREATE TABLE IF NOT EXISTS questions (
  question_id SERIAL NOT NULL PRIMARY KEY,
  product_id INT NOT NULL,
  question_body VARCHAR(300),
  question_date BIGINT,
  asker_name VARCHAR(50),
  asker_email VARCHAR(100),
  reported BOOLEAN,
  question_helpfulness SMALLINT
);
CREATE INDEX IF NOT EXISTS product_id_index ON questions(product_id);


CREATE TABLE IF NOT EXISTS answers (
  id SERIAL NOT NULL PRIMARY KEY,
  question_id INT NOT NULL REFERENCES questions(question_id),
  body VARCHAR(300),
  date BIGINT,
  answerer_name VARCHAR(50),
  answerer_email VARCHAR(100),
  reported BOOLEAN,
  helpfulness SMALLINT
);
CREATE INDEX IF NOT EXISTS question_id_index ON answers(question_id);


CREATE TABLE IF NOT EXISTS photos (
  id SERIAL NOT NULL PRIMARY KEY,
  answer_id INT NOT NULL REFERENCES answers(id),
  url VARCHAR(1000) NOT NULL
);
CREATE INDEX IF NOT EXISTS answer_id_index ON photos(answer_id);

