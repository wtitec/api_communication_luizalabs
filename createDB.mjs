import mysql from 'mysql'

var connection = mysql.createConnection({
  host: '10.5.0.6',
  user: 'b7f638b6fb5397',
  password: '758ffee1',
  multipleStatements: true
});



connection.connect();

connection.query('\
        CREATE SCHEMA IF NOT EXISTS `heroku_c9dfa0776bb7e16` DEFAULT CHARACTER SET utf8 ;\
        USE `heroku_c9dfa0776bb7e16` ;\
     '
  , function (error, results, fields) {
    if (error) throw error;
    console.log(results);
  });

  connection.query('\
        CREATE TABLE IF NOT EXISTS `heroku_c9dfa0776bb7e16`.`user_type_tbl` (\
          `id_user_type` INT NOT NULL AUTO_INCREMENT,\
          `label` VARCHAR(45) NOT NULL,\
          `status` INT NOT NULL DEFAULT 0,\
          `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),\
          `modify` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),\
          PRIMARY KEY (`id_user_type`))\
        ENGINE = InnoDB;\
     '
  , function (error, results, fields) {
    if (error) throw error;
    console.log(results);
  });

  connection.query('\
        CREATE TABLE IF NOT EXISTS `heroku_c9dfa0776bb7e16`.`user_tbl` (\
          `id_user` INT NOT NULL AUTO_INCREMENT,\
          `id_type_user` INT NOT NULL,\
          `name` VARCHAR(45) NOT NULL,\
          `lastname` VARCHAR(45) NOT NULL,\
          `username` VARCHAR(45) NOT NULL,\
          `password` VARCHAR(45) NOT NULL,\
          `status` INT NOT NULL DEFAULT 0,\
          `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),\
          `modify` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),\
          PRIMARY KEY (`id_user`),\
          UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,\
          INDEX `fk_User_tbl_UserType_tbl1_idx` (`id_type_user` ASC) VISIBLE,\
          CONSTRAINT `fk_User_tbl_UserType_tbl1`\
            FOREIGN KEY (`id_type_user`)\
            REFERENCES `heroku_c9dfa0776bb7e16`.`user_type_tbl` (`id_user_type`)\
            ON DELETE NO ACTION\
            ON UPDATE NO ACTION)\
        ENGINE = InnoDB;\
        '
, function (error, results, fields) {
if (error) throw error;
console.log(results);
});

connection.query('\
        CREATE TABLE IF NOT EXISTS `heroku_c9dfa0776bb7e16`.`schedule_message_tbl` (\
          `id_schedule_message` INT NOT NULL AUTO_INCREMENT,\
          `id_user` INT NOT NULL,\
          `date_schedule` DATETIME NOT NULL,\
          `message` VARCHAR(255) NOT NULL,\
          `destined` VARCHAR(45) NOT NULL,\
          `status` INT NOT NULL DEFAULT 0,\
          `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),\
          `modify` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),\
          PRIMARY KEY (`id_schedule_message`),\
          INDEX `fk_schelude_message_tbl_User_tbl1_idx` (`id_user` ASC) VISIBLE,\
          CONSTRAINT `fk_schelude_message_tbl_User_tbl1`\
            FOREIGN KEY (`id_user`)\
            REFERENCES `heroku_c9dfa0776bb7e16`.`user_tbl` (`id_user`)\
            ON DELETE NO ACTION\
            ON UPDATE NO ACTION)\
        ENGINE = InnoDB;\
        '
, function (error, results, fields) {
if (error) throw error;
console.log(results);
});

connection.query('\
        INSERT INTO `heroku_c9dfa0776bb7e16`.`user_type_tbl` (`label`) VALUES (\'Admin\');\
        INSERT INTO `heroku_c9dfa0776bb7e16`.`user_tbl` (`id_type_user`, `name`, `lastname`, `username`, `password`) VALUES (1,\'Willian Takashi\', \'Ishida\', \'wtitec@swagger\', md5(\'123456\'));\
     '
, function (error, results, fields) {
if (error) throw error;
console.log(results);
});


connection.end();