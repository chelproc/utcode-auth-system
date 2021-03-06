-- MySQL Script generated by MySQL Workbench
-- Sun Sep 15 08:19:48 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

-- -----------------------------------------------------
-- Schema user
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema user
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `user` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin ;
USE `user` ;

-- -----------------------------------------------------
-- Table `user`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `nickname` VARCHAR(20) NOT NULL,
  `fullname` VARCHAR(30) NOT NULL,
  `affiliation` VARCHAR(40) NOT NULL,
  `joined_at` DATE NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `nickname_UNIQUE` (`nickname` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user`.`auth_google`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user`.`auth_google` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `profile_id` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_auth_google_user_idx` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `profile_id_UNIQUE` (`profile_id` ASC) VISIBLE,
  CONSTRAINT `fk_auth_google_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user`.`notification_email`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user`.`notification_email` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_notification_email_user_idx` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  CONSTRAINT `fk_notification_email_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user`.`auth_newcomer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user`.`auth_newcomer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `hash` VARCHAR(20) NOT NULL,
  `expire_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `fk_auth_newcomer_user_idx` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `hash_UNIQUE` (`hash` ASC) VISIBLE,
  CONSTRAINT `fk_auth_newcomer_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user`.`permission`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user`.`permission` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `type` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_permission_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_permission_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user`.`notification_line`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user`.`notification_line` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `access_token` VARCHAR(60) NOT NULL,
  `target` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `access_token_UNIQUE` (`access_token` ASC) VISIBLE,
  INDEX `fk_notification_line_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_notification_line_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
