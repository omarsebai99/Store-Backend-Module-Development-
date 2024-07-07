-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: category1
-- Source Schemata: category
-- Created: Sun Jul  7 23:36:33 2024
-- Workbench Version: 8.0.38
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Schema category1
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `category1` ;
CREATE SCHEMA IF NOT EXISTS `category1` ;

-- ----------------------------------------------------------------------------
-- Table category1.categories
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `category1`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table category1.products
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `category1`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `category_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `category_id` (`category_id` ASC) VISIBLE,
  CONSTRAINT `products_ibfk_1`
    FOREIGN KEY (`category_id`)
    REFERENCES `category1`.`categories` (`id`)
    ON DELETE SET NULL)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
SET FOREIGN_KEY_CHECKS = 1;
