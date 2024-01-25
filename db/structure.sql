/*
SQLyog Ultimate v13.1.1 (32 bit)
MySQL - 10.6.12-MariaDB-0ubuntu0.22.10.1 : Database - buildgenie
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `auth_assignment` */

DROP TABLE IF EXISTS `auth_assignment`;

CREATE TABLE `auth_assignment` (
  `user_id` int(10) unsigned NOT NULL,
  `item_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`item_name`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fk-auth_assignment_item_name` FOREIGN KEY (`item_name`) REFERENCES `auth_item` (`name`) ON DELETE CASCADE,
  CONSTRAINT `fk-auth_assignment_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `auth_item` */

DROP TABLE IF EXISTS `auth_item`;

CREATE TABLE `auth_item` (
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` smallint(6) NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rule_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data` blob DEFAULT NULL,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`name`),
  KEY `rule_name` (`rule_name`),
  KEY `idx-auth_item-type` (`type`),
  CONSTRAINT `fk-auth_item_rule_name` FOREIGN KEY (`rule_name`) REFERENCES `auth_rule` (`name`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `auth_item_child` */

DROP TABLE IF EXISTS `auth_item_child`;

CREATE TABLE `auth_item_child` (
  `parent` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `child` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`parent`,`child`),
  KEY `child` (`child`),
  CONSTRAINT `fk-auth_item_child_child` FOREIGN KEY (`child`) REFERENCES `auth_item` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk-auth_item_child_parent` FOREIGN KEY (`parent`) REFERENCES `auth_item` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `auth_rule` */

DROP TABLE IF EXISTS `auth_rule`;

CREATE TABLE `auth_rule` (
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` blob DEFAULT NULL,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_acl` */

DROP TABLE IF EXISTS `core_acl`;

CREATE TABLE `core_acl` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `route` varchar(120) NOT NULL,
  `key` varchar(120) NOT NULL,
  `method` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_acl` (`role`,`route`,`key`,`method`),
  KEY `name` (`role`),
  KEY `route` (`route`),
  KEY `action` (`key`),
  KEY `method` (`method`)
) ENGINE=InnoDB AUTO_INCREMENT=217 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_analytics` */

DROP TABLE IF EXISTS `core_analytics`;

CREATE TABLE `core_analytics` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `log` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_analytics_data` */

DROP TABLE IF EXISTS `core_analytics_data`;

CREATE TABLE `core_analytics_data` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `hours` varchar(32) NOT NULL,
  `new_users` int(10) unsigned DEFAULT NULL,
  `users` int(10) unsigned NOT NULL,
  `hits` int(10) unsigned NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `hours` (`hours`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_analytics_hits` */

DROP TABLE IF EXISTS `core_analytics_hits`;

CREATE TABLE `core_analytics_hits` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `analytics_id` int(10) unsigned NOT NULL,
  `http_authorization` varchar(360) DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `analytics_id` (`analytics_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_cities` */

DROP TABLE IF EXISTS `core_cities`;

CREATE TABLE `core_cities` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) DEFAULT NULL,
  `state_code` varchar(5) DEFAULT NULL,
  `country_code` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24882 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_cms_block` */

DROP TABLE IF EXISTS `core_cms_block`;

CREATE TABLE `core_cms_block` (
  `block_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  `contents` text DEFAULT NULL,
  PRIMARY KEY (`block_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_cms_block_mapper` */

DROP TABLE IF EXISTS `core_cms_block_mapper`;

CREATE TABLE `core_cms_block_mapper` (
  `block_id` int(10) unsigned NOT NULL,
  `cms_id` int(10) unsigned NOT NULL,
  `order_by` int(10) unsigned NOT NULL,
  PRIMARY KEY (`block_id`,`cms_id`),
  KEY `cms_id` (`cms_id`),
  CONSTRAINT `fk-core_cms_block_mapper_block_id` FOREIGN KEY (`block_id`) REFERENCES `core_cms_block` (`block_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk-core_cms_block_mapper_cms_id` FOREIGN KEY (`cms_id`) REFERENCES `core_cms_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_cms_category` */

DROP TABLE IF EXISTS `core_cms_category`;

CREATE TABLE `core_cms_category` (
  `category_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(250) NOT NULL,
  `moduleId` varchar(120) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`category_id`),
  KEY `parent_id` (`parent_id`),
  KEY `moduleId` (`moduleId`),
  CONSTRAINT `fk-core_cms_category_moduleId` FOREIGN KEY (`moduleId`) REFERENCES `core_module` (`moduleId`) ON DELETE SET NULL,
  CONSTRAINT `fk-core_cms_category_parent_id` FOREIGN KEY (`parent_id`) REFERENCES `core_cms_category` (`category_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_cms_category_field_value` */

DROP TABLE IF EXISTS `core_cms_category_field_value`;

CREATE TABLE `core_cms_category_field_value` (
  `item_id` int(10) unsigned NOT NULL,
  `field_id` int(10) unsigned NOT NULL,
  `value` varchar(250) NOT NULL,
  `field_name` varchar(64) NOT NULL,
  PRIMARY KEY (`item_id`,`field_id`,`value`),
  KEY `field_id` (`field_id`),
  KEY `value` (`value`),
  CONSTRAINT `fk-core_cms_category_field_value_field_id` FOREIGN KEY (`field_id`) REFERENCES `core_field` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk-core_cms_category_field_value_item_id` FOREIGN KEY (`item_id`) REFERENCES `core_cms_category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_cms_category_path` */

DROP TABLE IF EXISTS `core_cms_category_path`;

CREATE TABLE `core_cms_category_path` (
  `category_id` int(10) unsigned NOT NULL,
  `parent_id` int(10) unsigned NOT NULL,
  `level` int(11) NOT NULL,
  PRIMARY KEY (`category_id`,`parent_id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `fk-core_cms_category_path_category_id` FOREIGN KEY (`category_id`) REFERENCES `core_cms_category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_cms_comment` */

DROP TABLE IF EXISTS `core_cms_comment`;

CREATE TABLE `core_cms_comment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `cms_id` int(10) unsigned DEFAULT NULL,
  `moduleId` varchar(128) DEFAULT NULL,
  `rating` int(10) unsigned DEFAULT NULL,
  `content` text DEFAULT NULL,
  `status` tinyint(4) DEFAULT 1,
  `is_abused` tinyint(3) unsigned DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk-comment-parent_id` (`parent_id`),
  KEY `user_id` (`user_id`),
  KEY `module` (`moduleId`),
  KEY `item_id` (`cms_id`),
  CONSTRAINT `fk-core_cms_comment_cms_id` FOREIGN KEY (`cms_id`) REFERENCES `core_cms_item` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-core_cms_comment_parent_id` FOREIGN KEY (`parent_id`) REFERENCES `core_cms_comment` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-core_cms_comment_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_cms_comment_reaction_mapping` */

DROP TABLE IF EXISTS `core_cms_comment_reaction_mapping`;

CREATE TABLE `core_cms_comment_reaction_mapping` (
  `user_id` int(10) unsigned NOT NULL,
  `reaction_id` int(10) unsigned NOT NULL,
  `cms_id` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`reaction_id`,`cms_id`),
  KEY `reaction_id` (`reaction_id`),
  KEY `item_module` (`cms_id`),
  CONSTRAINT `fk-core_cms_comment_reaction_mapping_cms_id` FOREIGN KEY (`cms_id`) REFERENCES `core_cms_item` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-core_cms_comment_reaction_mapping_reaction_id` FOREIGN KEY (`reaction_id`) REFERENCES `core_reaction` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-core_cms_comment_reaction_mapping_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_cms_followers` */

DROP TABLE IF EXISTS `core_cms_followers`;

CREATE TABLE `core_cms_followers` (
  `cms_id` int(10) unsigned NOT NULL,
  `follower_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`cms_id`,`follower_id`),
  KEY `user_id` (`follower_id`),
  CONSTRAINT `fk-core_cms_followers_cms_id` FOREIGN KEY (`cms_id`) REFERENCES `core_cms_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk-core_cms_followers_follower_id` FOREIGN KEY (`follower_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_cms_item` */

DROP TABLE IF EXISTS `core_cms_item`;

CREATE TABLE `core_cms_item` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `category_id` int(10) unsigned DEFAULT NULL,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `layout_id` int(10) unsigned DEFAULT NULL,
  `item_id` varchar(120) DEFAULT NULL,
  `moduleId` varchar(120) DEFAULT NULL,
  `slug` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `external_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `location` varchar(200) DEFAULT NULL,
  `latitude` decimal(10,3) DEFAULT NULL,
  `longitude` decimal(10,3) DEFAULT NULL,
  `restricted` tinyint(3) unsigned DEFAULT NULL,
  `status` tinyint(6) DEFAULT NULL,
  `sort_order` int(10) unsigned DEFAULT NULL,
  `viewed` int(10) unsigned DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `parent_id` (`parent_id`),
  KEY `layout` (`layout_id`),
  KEY `user_id` (`user_id`),
  KEY `module` (`moduleId`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `fk-core_cms_item_category_id` FOREIGN KEY (`category_id`) REFERENCES `core_cms_category` (`category_id`) ON DELETE SET NULL,
  CONSTRAINT `fk-core_cms_item_layout_id` FOREIGN KEY (`layout_id`) REFERENCES `core_cms_layout` (`layout_id`) ON DELETE SET NULL,
  CONSTRAINT `fk-core_cms_item_moduleId` FOREIGN KEY (`moduleId`) REFERENCES `core_module` (`moduleId`) ON DELETE SET NULL,
  CONSTRAINT `fk-core_cms_item_parent_id` FOREIGN KEY (`parent_id`) REFERENCES `core_cms_item` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-core_cms_item_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_cms_item_category_mapping` */

DROP TABLE IF EXISTS `core_cms_item_category_mapping`;

CREATE TABLE `core_cms_item_category_mapping` (
  `cms_id` int(10) unsigned NOT NULL,
  `category_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`cms_id`,`category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `fk-core_cms_item_category_mapping_category_id` FOREIGN KEY (`category_id`) REFERENCES `core_cms_category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk-core_cms_item_category_mapping_cms_id` FOREIGN KEY (`cms_id`) REFERENCES `core_cms_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_cms_item_field_value` */

DROP TABLE IF EXISTS `core_cms_item_field_value`;

CREATE TABLE `core_cms_item_field_value` (
  `item_id` int(10) unsigned NOT NULL,
  `field_id` int(10) unsigned NOT NULL,
  `value` varchar(250) NOT NULL,
  `field_name` varchar(64) NOT NULL,
  PRIMARY KEY (`item_id`,`field_id`,`value`),
  KEY `field_id` (`field_id`),
  KEY `value` (`value`),
  CONSTRAINT `fk-core_cms_item_field_value_field_id` FOREIGN KEY (`field_id`) REFERENCES `core_field` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk-core_cms_item_field_value_item_id` FOREIGN KEY (`item_id`) REFERENCES `core_cms_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_cms_item_lg` */

DROP TABLE IF EXISTS `core_cms_item_lg`;

CREATE TABLE `core_cms_item_lg` (
  `id` int(10) unsigned NOT NULL,
  `lg` varchar(3) NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_keywords` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`,`lg`),
  CONSTRAINT `fk-core_cms_item_lg-id` FOREIGN KEY (`id`) REFERENCES `core_cms_item` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_cms_item_mapper` */

DROP TABLE IF EXISTS `core_cms_item_mapper`;

CREATE TABLE `core_cms_item_mapper` (
  `cms_id` int(10) unsigned NOT NULL,
  `mapper_id` int(10) unsigned NOT NULL,
  `status` int(10) unsigned NOT NULL,
  PRIMARY KEY (`cms_id`,`mapper_id`),
  KEY `user_id` (`mapper_id`),
  KEY `status` (`status`),
  CONSTRAINT `fk-core_cms_item_mapper_cms_id` FOREIGN KEY (`cms_id`) REFERENCES `core_cms_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk-core_cms_item_mapper_mapper_id` FOREIGN KEY (`mapper_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_cms_item_path` */

DROP TABLE IF EXISTS `core_cms_item_path`;

CREATE TABLE `core_cms_item_path` (
  `cms_id` int(10) unsigned NOT NULL,
  `parent_id` int(10) unsigned NOT NULL,
  `level` int(11) DEFAULT NULL,
  PRIMARY KEY (`cms_id`,`parent_id`),
  KEY `path_id` (`parent_id`),
  CONSTRAINT `fk-core_cms_item_path_cms_id` FOREIGN KEY (`cms_id`) REFERENCES `core_cms_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk-core_cms_item_path_parent_id` FOREIGN KEY (`parent_id`) REFERENCES `core_cms_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_cms_keyword` */

DROP TABLE IF EXISTS `core_cms_keyword`;

CREATE TABLE `core_cms_keyword` (
  `keyword_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`keyword_id`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_cms_layout` */

DROP TABLE IF EXISTS `core_cms_layout`;

CREATE TABLE `core_cms_layout` (
  `layout_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `status` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`layout_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_cms_link_preview` */

DROP TABLE IF EXISTS `core_cms_link_preview`;

CREATE TABLE `core_cms_link_preview` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(250) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `original_url` varchar(255) DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `canonical_url` varchar(255) NOT NULL,
  `image` text DEFAULT NULL,
  `code` text DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `canonical_url` (`canonical_url`),
  KEY `original_url` (`original_url`),
  KEY `url` (`url`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_cms_menu` */

DROP TABLE IF EXISTS `core_cms_menu`;

CREATE TABLE `core_cms_menu` (
  `menu_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `route` varchar(255) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `data` text DEFAULT NULL,
  PRIMARY KEY (`menu_id`),
  KEY `parent` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_cms_menu_path` */

DROP TABLE IF EXISTS `core_cms_menu_path`;

CREATE TABLE `core_cms_menu_path` (
  `menu_id` int(10) unsigned NOT NULL,
  `parent_id` int(10) unsigned NOT NULL,
  `level` int(11) NOT NULL,
  PRIMARY KEY (`menu_id`,`parent_id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `fk-core_cms_menu_path_menu_id` FOREIGN KEY (`menu_id`) REFERENCES `core_cms_menu` (`menu_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk-core_cms_menu_path_parent_id` FOREIGN KEY (`parent_id`) REFERENCES `core_cms_menu` (`menu_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_cms_relation` */

DROP TABLE IF EXISTS `core_cms_relation`;

CREATE TABLE `core_cms_relation` (
  `cms_id` int(10) unsigned NOT NULL,
  `keyword_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`cms_id`,`keyword_id`),
  KEY `cms_keyword_id` (`keyword_id`),
  CONSTRAINT `fk-core_cms_relation_cms_id` FOREIGN KEY (`cms_id`) REFERENCES `core_cms_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk-core_cms_relation_keyword_id` FOREIGN KEY (`keyword_id`) REFERENCES `core_cms_keyword` (`keyword_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_cms_widget` */

DROP TABLE IF EXISTS `core_cms_widget`;

CREATE TABLE `core_cms_widget` (
  `widget_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `widget` varchar(250) NOT NULL,
  `data` text DEFAULT NULL,
  PRIMARY KEY (`widget_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_cms_widget_mapper` */

DROP TABLE IF EXISTS `core_cms_widget_mapper`;

CREATE TABLE `core_cms_widget_mapper` (
  `widget_id` int(10) unsigned NOT NULL,
  `cms_id` int(10) unsigned NOT NULL,
  `order_by` int(10) unsigned NOT NULL,
  PRIMARY KEY (`widget_id`,`cms_id`),
  KEY `cms_id` (`cms_id`),
  CONSTRAINT `fk-core_cms_widget_mapper_cms_id` FOREIGN KEY (`cms_id`) REFERENCES `core_cms_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk-core_cms_widget_mapper_widget_id` FOREIGN KEY (`widget_id`) REFERENCES `core_cms_widget` (`widget_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_config` */

DROP TABLE IF EXISTS `core_config`;

CREATE TABLE `core_config` (
  `field_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int(10) unsigned DEFAULT NULL,
  `field` enum('Input','Select','Textarea','Option') NOT NULL DEFAULT 'Input',
  `type` enum('text','radio','checkbox','password','file','tel','range','search','date','month','email','number','time','url','week','datetime','color','value') NOT NULL DEFAULT 'text',
  `name` varchar(100) NOT NULL,
  `label` varchar(200) NOT NULL,
  `value` text DEFAULT NULL,
  `selected` varchar(100) DEFAULT NULL COMMENT 'default selected',
  `class` varchar(120) DEFAULT NULL,
  `parameters` varchar(255) DEFAULT NULL COMMENT 'json format',
  `validations` varchar(255) DEFAULT NULL COMMENT 'json format',
  `item_id` int(10) unsigned DEFAULT NULL,
  `moduleId` varchar(120) DEFAULT NULL,
  `is_encrypted` tinyint(3) unsigned DEFAULT NULL,
  `order_by` int(10) unsigned DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`field_id`),
  UNIQUE KEY `name` (`name`),
  KEY `module` (`moduleId`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `fk-core_config_group_id` FOREIGN KEY (`group_id`) REFERENCES `core_config_group` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_config_group` */

DROP TABLE IF EXISTS `core_config_group`;

CREATE TABLE `core_config_group` (
  `group_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(16) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`group_id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_config_option` */

DROP TABLE IF EXISTS `core_config_option`;

CREATE TABLE `core_config_option` (
  `option_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(10) unsigned NOT NULL,
  `option_code` varchar(120) NOT NULL,
  `option_value` varchar(512) DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  PRIMARY KEY (`option_id`),
  KEY `config_id` (`field_id`),
  CONSTRAINT `fk-core_config_option_field_id` FOREIGN KEY (`field_id`) REFERENCES `core_config` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=386 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_config_value` */

DROP TABLE IF EXISTS `core_config_value`;

CREATE TABLE `core_config_value` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(10) unsigned NOT NULL,
  `value` text NOT NULL,
  `field_name` varchar(64) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`),
  KEY `value` (`value`(768)),
  CONSTRAINT `fk-core_config_value_field_id` FOREIGN KEY (`field_id`) REFERENCES `core_config` (`field_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=444 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_countries` */

DROP TABLE IF EXISTS `core_countries`;

CREATE TABLE `core_countries` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `iso3` char(3) DEFAULT NULL,
  `iso2` char(2) DEFAULT NULL,
  `phone_code` varchar(255) DEFAULT NULL,
  `capital` varchar(255) DEFAULT NULL,
  `currency_name` varchar(100) DEFAULT NULL,
  `currency_code` varchar(255) DEFAULT NULL,
  `currency_symbol` varchar(255) DEFAULT NULL,
  `tld` varchar(255) DEFAULT NULL,
  `native` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `subregion` varchar(255) DEFAULT NULL,
  `timezones` text DEFAULT NULL,
  `translations` text DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `emoji` varchar(191) DEFAULT NULL,
  `emojiU` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `flag` tinyint(1) NOT NULL DEFAULT 1,
  `wikiDataId` varchar(255) DEFAULT NULL COMMENT 'Rapid API GeoDB Cities',
  `status` tinyint(3) unsigned NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `iso3` (`iso3`),
  UNIQUE KEY `iso2` (`iso2`)
) ENGINE=InnoDB AUTO_INCREMENT=251 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_cron` */

DROP TABLE IF EXISTS `core_cron`;

CREATE TABLE `core_cron` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `schedule` varchar(100) NOT NULL,
  `command` varchar(250) DEFAULT NULL,
  `last_id` int(11) unsigned DEFAULT NULL,
  `max_execution_time` int(11) unsigned DEFAULT NULL,
  `active` tinyint(4) unsigned DEFAULT 0 COMMENT '1 - Active, 0 - DeActive',
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `last_id` (`last_id`),
  CONSTRAINT `fk-core_cron_last_id` FOREIGN KEY (`last_id`) REFERENCES `core_cron_execute` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_cron_execute` */

DROP TABLE IF EXISTS `core_cron_execute`;

CREATE TABLE `core_cron_execute` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cron_id` int(10) unsigned NOT NULL,
  `pid` varchar(100) DEFAULT NULL,
  `in_progress` tinyint(1) DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `finish` datetime DEFAULT NULL,
  `runtime` float DEFAULT NULL,
  `exit_code` tinyint(4) DEFAULT NULL,
  `output` text DEFAULT NULL,
  `error_output` text DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cron_id` (`cron_id`),
  CONSTRAINT `fk-core_cron_execute_cron_id` FOREIGN KEY (`cron_id`) REFERENCES `core_cron` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_execution` */

DROP TABLE IF EXISTS `core_execution`;

CREATE TABLE `core_execution` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `item_id` int(10) unsigned NOT NULL,
  `config` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`config`)),
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `fk-core_execution_item_id` FOREIGN KEY (`item_id`) REFERENCES `core_notification` (`message_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=355 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_field` */

DROP TABLE IF EXISTS `core_field`;

CREATE TABLE `core_field` (
  `field_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `section_id` int(10) unsigned DEFAULT NULL,
  `moduleId` varchar(120) DEFAULT NULL,
  `field` enum('Input','Select','Textarea','Option') NOT NULL DEFAULT 'Input',
  `type` enum('text','radio','checkbox','password','file','tel','range','search','date','month','email','number','time','url','week','datetime','color','value','none') NOT NULL DEFAULT 'none',
  `name` varchar(100) NOT NULL,
  `label` varchar(200) NOT NULL,
  `hint` varchar(120) DEFAULT NULL,
  `value` varchar(250) DEFAULT NULL,
  `selected` varchar(100) DEFAULT NULL COMMENT 'default selected',
  `class` varchar(120) DEFAULT NULL,
  `parameters` varchar(255) DEFAULT NULL COMMENT 'json format',
  `validations` varchar(255) DEFAULT NULL COMMENT 'json format',
  `order_by` int(10) unsigned DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`field_id`),
  UNIQUE KEY `name` (`name`,`moduleId`),
  KEY `module` (`moduleId`),
  KEY `user_id` (`user_id`),
  KEY `section_id` (`section_id`),
  CONSTRAINT `fk-core_field_moduleId` FOREIGN KEY (`moduleId`) REFERENCES `core_module` (`moduleId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk-core_field_section_id` FOREIGN KEY (`section_id`) REFERENCES `core_field_section` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-core_field_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_field_item` */

DROP TABLE IF EXISTS `core_field_item`;

CREATE TABLE `core_field_item` (
  `field_id` int(10) unsigned NOT NULL,
  `item_id` int(10) unsigned NOT NULL,
  `moduleId` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`field_id`,`item_id`),
  KEY `module` (`moduleId`),
  CONSTRAINT `fk-core_field_item_field_id` FOREIGN KEY (`field_id`) REFERENCES `core_field` (`field_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_field_option` */

DROP TABLE IF EXISTS `core_field_option`;

CREATE TABLE `core_field_option` (
  `option_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `field_id` int(10) unsigned NOT NULL,
  `option_code` varchar(120) NOT NULL,
  `option_value` varchar(512) NOT NULL,
  `sort_order` int(11) DEFAULT NULL,
  PRIMARY KEY (`option_id`),
  KEY `field_id` (`field_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fk-core_field_option_field_id` FOREIGN KEY (`field_id`) REFERENCES `core_field` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk-core_field_option_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=573 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_field_rule` */

DROP TABLE IF EXISTS `core_field_rule`;

CREATE TABLE `core_field_rule` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(10) unsigned NOT NULL,
  `rule` text NOT NULL,
  `order` int(11) DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`),
  CONSTRAINT `fk-core_field_rule_field_id` FOREIGN KEY (`field_id`) REFERENCES `core_field` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_field_section` */

DROP TABLE IF EXISTS `core_field_section`;

CREATE TABLE `core_field_section` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_field_section_mapping` */

DROP TABLE IF EXISTS `core_field_section_mapping`;

CREATE TABLE `core_field_section_mapping` (
  `field_id` int(10) unsigned NOT NULL,
  `section_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`field_id`,`section_id`),
  KEY `category_id` (`section_id`),
  CONSTRAINT `fk-core_field_section_mapping_field_id` FOREIGN KEY (`field_id`) REFERENCES `core_field` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk-core_field_section_mapping_section_id` FOREIGN KEY (`section_id`) REFERENCES `core_field_section` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_field_value` */

DROP TABLE IF EXISTS `core_field_value`;

CREATE TABLE `core_field_value` (
  `value_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(10) unsigned DEFAULT NULL,
  `value` varchar(250) NOT NULL,
  PRIMARY KEY (`value_id`),
  UNIQUE KEY `item_id` (`field_id`),
  CONSTRAINT `fk-core_field_value_field_id` FOREIGN KEY (`field_id`) REFERENCES `core_field` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_forum_categories` */

DROP TABLE IF EXISTS `core_forum_categories`;

CREATE TABLE `core_forum_categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `name` varchar(250) NOT NULL,
  `description` text DEFAULT NULL,
  `status` tinyint(3) unsigned DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `fk-core_forum_categories_parent_id` FOREIGN KEY (`parent_id`) REFERENCES `core_forum_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_forum_category` */

DROP TABLE IF EXISTS `core_forum_category`;

CREATE TABLE `core_forum_category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `name` varchar(250) NOT NULL,
  `description` text DEFAULT NULL,
  `status` tinyint(3) unsigned DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `fk-core_forum_category_parent_id` FOREIGN KEY (`parent_id`) REFERENCES `core_forum_category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_forum_category_path` */

DROP TABLE IF EXISTS `core_forum_category_path`;

CREATE TABLE `core_forum_category_path` (
  `category_id` int(10) unsigned NOT NULL,
  `parent_id` int(10) unsigned NOT NULL,
  `level` int(11) NOT NULL,
  PRIMARY KEY (`category_id`,`parent_id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `fk-core_forum_category_path_category_id` FOREIGN KEY (`category_id`) REFERENCES `core_forum_category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_forum_item` */

DROP TABLE IF EXISTS `core_forum_item`;

CREATE TABLE `core_forum_item` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(10) unsigned NOT NULL,
  `category_id` int(10) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `name` varchar(256) NOT NULL,
  `description` text DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `topic_id` (`parent_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `fk-core_forum_item_category_id` FOREIGN KEY (`category_id`) REFERENCES `core_forum_category` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-core_forum_item_parent_id` FOREIGN KEY (`parent_id`) REFERENCES `core_forum_item` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-core_forum_item_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_forum_item_path` */

DROP TABLE IF EXISTS `core_forum_item_path`;

CREATE TABLE `core_forum_item_path` (
  `forum_id` int(10) unsigned NOT NULL,
  `parent_id` int(10) unsigned NOT NULL,
  `level` int(11) NOT NULL,
  PRIMARY KEY (`forum_id`,`parent_id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `fk-core_forum_item_path_forum_id` FOREIGN KEY (`forum_id`) REFERENCES `core_forum_item` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_forum_topics` */

DROP TABLE IF EXISTS `core_forum_topics`;

CREATE TABLE `core_forum_topics` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `name` varchar(250) NOT NULL,
  `description` text DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `fk-core_forum_topics_category_id` FOREIGN KEY (`category_id`) REFERENCES `core_forum_category` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-core_forum_topics_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_hashtags` */

DROP TABLE IF EXISTS `core_hashtags`;

CREATE TABLE `core_hashtags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hash` varchar(255) NOT NULL,
  `tag` varchar(100) NOT NULL,
  `last_trend_time` int(11) NOT NULL,
  `trend_use_num` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `hash` (`hash`),
  KEY `tag` (`tag`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_language` */

DROP TABLE IF EXISTS `core_language`;

CREATE TABLE `core_language` (
  `id` varchar(64) NOT NULL,
  `value` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

/*Table structure for table `core_mail` */

DROP TABLE IF EXISTS `core_mail`;

CREATE TABLE `core_mail` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `status` tinyint(3) unsigned NOT NULL COMMENT '0 - Pending 1 - Sent',
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_mail_attachment` */

DROP TABLE IF EXISTS `core_mail_attachment`;

CREATE TABLE `core_mail_attachment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `mail_id` int(10) unsigned NOT NULL,
  `attachment` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mail_id` (`mail_id`),
  CONSTRAINT `fk-core_mail_attachment_mail_id` FOREIGN KEY (`mail_id`) REFERENCES `core_mail` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_mail_recipients` */

DROP TABLE IF EXISTS `core_mail_recipients`;

CREATE TABLE `core_mail_recipients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `mail_id` int(10) unsigned NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mail_id` (`mail_id`),
  CONSTRAINT `fk-core_mail_recipients_mail_id` FOREIGN KEY (`mail_id`) REFERENCES `core_mail` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_mail_template` */

DROP TABLE IF EXISTS `core_mail_template`;

CREATE TABLE `core_mail_template` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(250) NOT NULL,
  `name` varchar(250) NOT NULL,
  `support_name` varchar(100) DEFAULT NULL,
  `support_email` varchar(100) DEFAULT NULL,
  `type` enum('text','html','both') NOT NULL DEFAULT 'text',
  `content` text DEFAULT NULL,
  `template` varchar(100) DEFAULT NULL,
  `template_path` varchar(100) DEFAULT 'common/mail' COMMENT 'common/mail',
  `is_cc` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=228 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_media` */

DROP TABLE IF EXISTS `core_media`;

CREATE TABLE `core_media` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `guid` varchar(255) DEFAULT NULL,
  `alt` varchar(100) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `filesize` int(11) DEFAULT NULL,
  `path` text DEFAULT NULL,
  `mimetype` varchar(255) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 1,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `guid` (`guid`)
) ENGINE=InnoDB AUTO_INCREMENT=414 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_media_item` */

DROP TABLE IF EXISTS `core_media_item`;

CREATE TABLE `core_media_item` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `guid` varchar(255) DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `file_id` int(10) unsigned DEFAULT NULL,
  `item_id` int(10) unsigned NOT NULL,
  `moduleId` varchar(64) NOT NULL,
  `mimetype` varchar(32) DEFAULT NULL,
  `key` varchar(32) DEFAULT NULL COMMENT 'certifications, gallery, document, portfolio',
  `caption` text DEFAULT NULL,
  `privacy` tinyint(4) DEFAULT 1,
  `status` tinyint(4) DEFAULT 1,
  `is_deleted` int(10) unsigned DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `item_id` (`item_id`),
  KEY `file_id` (`file_id`),
  CONSTRAINT `fk-core_media_item_file_id` FOREIGN KEY (`file_id`) REFERENCES `core_media` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-core_media_item_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_module` */

DROP TABLE IF EXISTS `core_module`;

CREATE TABLE `core_module` (
  `moduleId` varchar(200) NOT NULL,
  `name` varchar(120) NOT NULL,
  `class` varchar(120) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`moduleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_newsletter` */

DROP TABLE IF EXISTS `core_newsletter`;

CREATE TABLE `core_newsletter` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `first_name` varchar(64) DEFAULT NULL,
  `last_name` varchar(64) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `phone` varchar(32) DEFAULT NULL,
  `email` varchar(64) NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_notification` */

DROP TABLE IF EXISTS `core_notification`;

CREATE TABLE `core_notification` (
  `message_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `action_id` int(10) unsigned DEFAULT NULL,
  `item_id` int(10) unsigned DEFAULT NULL,
  `module` varchar(64) NOT NULL,
  `sender_id` int(10) unsigned NOT NULL,
  `text` text DEFAULT NULL,
  `ip` varchar(30) DEFAULT NULL,
  `status` enum('Read','UnRead','Deleted','Span','Archived') NOT NULL DEFAULT 'Read',
  `created_at` int(11) NOT NULL,
  PRIMARY KEY (`message_id`),
  KEY `sender_id` (`sender_id`),
  KEY `item_id` (`item_id`),
  KEY `action_id` (`action_id`),
  CONSTRAINT `fk-core_notification_action_id` FOREIGN KEY (`action_id`) REFERENCES `core_notification_action` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-core_notification_sender_id` FOREIGN KEY (`sender_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=425 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_notification_action` */

DROP TABLE IF EXISTS `core_notification_action`;

CREATE TABLE `core_notification_action` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `action` varchar(200) NOT NULL,
  `sender_format` varchar(256) NOT NULL,
  `receiver_format` varchar(256) DEFAULT NULL,
  `sender_sms_format` varchar(256) DEFAULT NULL,
  `receiver_sms_format` varchar(256) DEFAULT NULL,
  `message_format` varchar(256) DEFAULT NULL,
  `sender_url` varchar(250) DEFAULT NULL,
  `receiver_url` varchar(250) DEFAULT NULL,
  `recipients` varchar(100) DEFAULT NULL,
  `type` enum('success','notify','warning','alert','error') NOT NULL DEFAULT 'notify',
  `is_admin` tinyint(1) DEFAULT NULL,
  `is_mail` tinyint(3) unsigned NOT NULL,
  `is_setting` tinyint(1) DEFAULT NULL COMMENT '1 - user setting enable, 0 - disable setting , 2 - Only Admin',
  `is_fcm` tinyint(1) DEFAULT NULL,
  `is_trigger` tinyint(1) DEFAULT NULL COMMENT 'Real Time Notification / Firebase',
  `is_message` tinyint(1) DEFAULT NULL COMMENT 'allow to create message',
  `is_sms` tinyint(1) DEFAULT NULL,
  `is_receiver` tinyint(1) DEFAULT NULL COMMENT '0 - all, 1 - only sender, 2 - only receiver, null - no any',
  `data` text DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL COMMENT '0 - De-Active, 1 - Active',
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_notification_recipients` */

DROP TABLE IF EXISTS `core_notification_recipients`;

CREATE TABLE `core_notification_recipients` (
  `message_id` int(10) unsigned NOT NULL,
  `recipient_id` int(10) unsigned NOT NULL,
  `status` enum('Read','UnRead','Deleted','Activities') NOT NULL DEFAULT 'UnRead',
  PRIMARY KEY (`message_id`,`recipient_id`),
  KEY `recipient_id` (`recipient_id`),
  KEY `message_id` (`message_id`),
  CONSTRAINT `fk-core_notification_recipients_message_id` FOREIGN KEY (`message_id`) REFERENCES `core_notification` (`message_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-core_notification_recipients_recipient_id` FOREIGN KEY (`recipient_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_plan` */

DROP TABLE IF EXISTS `core_plan`;

CREATE TABLE `core_plan` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `gateway` enum('none','paypal','braintree','stripe') NOT NULL COMMENT '3 - None 1 - paypal 2 - braintree',
  `source_plan` varchar(32) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `plan_type` enum('FIXED','INFINITE','None') NOT NULL DEFAULT 'FIXED',
  `payment_type` enum('TRIAL','REGULAR') NOT NULL DEFAULT 'TRIAL',
  `frequency` enum('Day','Month','Year') NOT NULL DEFAULT 'Month',
  `frequency_interval` tinyint(4) DEFAULT NULL,
  `cycles` tinyint(4) DEFAULT NULL,
  `amount` decimal(10,2) unsigned DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_plan_field_value` */

DROP TABLE IF EXISTS `core_plan_field_value`;

CREATE TABLE `core_plan_field_value` (
  `item_id` int(10) unsigned NOT NULL,
  `field_id` int(10) unsigned NOT NULL,
  `value` varchar(250) NOT NULL,
  `field_name` varchar(64) NOT NULL,
  PRIMARY KEY (`item_id`,`field_id`,`value`),
  KEY `field_id` (`field_id`),
  KEY `value` (`value`),
  CONSTRAINT `fk-core_plan_field_value_field_id` FOREIGN KEY (`field_id`) REFERENCES `core_field` (`field_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-core_plan_field_value_item_id` FOREIGN KEY (`item_id`) REFERENCES `core_plan` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_reaction` */

DROP TABLE IF EXISTS `core_reaction`;

CREATE TABLE `core_reaction` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `slug` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `status` tinyint(4) DEFAULT 1,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_seo` */

DROP TABLE IF EXISTS `core_seo`;

CREATE TABLE `core_seo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `slug` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) DEFAULT NULL COMMENT '0 - none, 1 - Active',
  `meta_title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_keywords` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_seo_option` */

DROP TABLE IF EXISTS `core_seo_option`;

CREATE TABLE `core_seo_option` (
  `option_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `seo_id` int(10) unsigned NOT NULL,
  `key` varchar(100) DEFAULT NULL,
  `value` varchar(250) DEFAULT NULL,
  `order_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`option_id`),
  KEY `seo_id` (`seo_id`),
  CONSTRAINT `fk-core_seo_option_seo_id` FOREIGN KEY (`seo_id`) REFERENCES `core_seo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_states` */

DROP TABLE IF EXISTS `core_states`;

CREATE TABLE `core_states` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `country_id` mediumint(8) unsigned NOT NULL,
  `country_iso2` char(2) NOT NULL,
  `country_iso3` char(3) DEFAULT NULL,
  `fips_code` varchar(255) DEFAULT NULL,
  `state_code` varchar(255) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `flag` tinyint(1) NOT NULL DEFAULT 1,
  `wikiDataId` varchar(255) DEFAULT NULL COMMENT 'Rapid API GeoDB Cities',
  `status` tinyint(3) unsigned NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `country_region` (`country_id`),
  CONSTRAINT `fk-core_states_country_id` FOREIGN KEY (`country_id`) REFERENCES `core_countries` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4926 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=COMPACT;

/*Table structure for table `core_support` */

DROP TABLE IF EXISTS `core_support`;

CREATE TABLE `core_support` (
  `message_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `identifier` varchar(60) NOT NULL,
  `sender_id` int(10) unsigned NOT NULL,
  `text` text DEFAULT NULL,
  `status` enum('Read','UnRead','Deleted','Span','Archived') NOT NULL DEFAULT 'Read',
  `action_id` int(10) unsigned DEFAULT NULL,
  `is_system` tinyint(3) unsigned DEFAULT NULL,
  `created_at` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`message_id`,`created_at`),
  KEY `sender_id` (`sender_id`),
  KEY `user_message_action_id` (`action_id`),
  CONSTRAINT `fk-core_support_action_id` FOREIGN KEY (`action_id`) REFERENCES `core_notification_action` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-core_support_sender_id` FOREIGN KEY (`sender_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_support_attachments` */

DROP TABLE IF EXISTS `core_support_attachments`;

CREATE TABLE `core_support_attachments` (
  `attachment_id` int(10) unsigned NOT NULL,
  `message_id` int(10) unsigned NOT NULL,
  `created_at` bigint(20) unsigned NOT NULL,
  `sender_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`attachment_id`,`message_id`,`created_at`),
  KEY `message_id` (`message_id`),
  KEY `sender_id` (`sender_id`),
  KEY `attachment_id` (`attachment_id`),
  KEY `created_At` (`created_at`),
  CONSTRAINT `fk-core_support_attachments_attachment_id` FOREIGN KEY (`attachment_id`) REFERENCES `core_media` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-core_support_attachments_message_id` FOREIGN KEY (`message_id`) REFERENCES `core_support` (`message_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_support_group` */

DROP TABLE IF EXISTS `core_support_group`;

CREATE TABLE `core_support_group` (
  `message_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `title` varchar(250) NOT NULL,
  `image_id` int(10) unsigned NOT NULL,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  KEY `message_id` (`message_id`),
  KEY `title` (`title`),
  KEY `image_id` (`image_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fk-core_support_group_message_id` FOREIGN KEY (`message_id`) REFERENCES `core_support` (`message_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-core_support_group_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_support_group_recipients` */

DROP TABLE IF EXISTS `core_support_group_recipients`;

CREATE TABLE `core_support_group_recipients` (
  `message_id` int(10) unsigned NOT NULL,
  `recipient_id` int(10) unsigned NOT NULL,
  `status` tinyint(4) NOT NULL COMMENT '1 - Active',
  PRIMARY KEY (`message_id`,`recipient_id`),
  KEY `recipient_id` (`recipient_id`),
  KEY `conversation_id` (`message_id`),
  CONSTRAINT `fk-core_support_group_recipients_message_id` FOREIGN KEY (`message_id`) REFERENCES `core_support` (`message_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-core_support_group_recipients_recipient_id` FOREIGN KEY (`recipient_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_support_info` */

DROP TABLE IF EXISTS `core_support_info`;

CREATE TABLE `core_support_info` (
  `message_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sender_id` int(10) unsigned NOT NULL,
  `subject` varchar(200) NOT NULL,
  `status` varchar(40) NOT NULL DEFAULT 'Open',
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  KEY `sender_id` (`sender_id`),
  CONSTRAINT `fk-core_support_info_message_id` FOREIGN KEY (`message_id`) REFERENCES `core_support` (`message_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-core_support_info_sender_id` FOREIGN KEY (`sender_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_support_item` */

DROP TABLE IF EXISTS `core_support_item`;

CREATE TABLE `core_support_item` (
  `message_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `item_id` int(10) unsigned NOT NULL,
  `module` varchar(100) NOT NULL COMMENT '1 - Item',
  `subject` varchar(250) DEFAULT NULL,
  `status` enum('Open','Closed') DEFAULT NULL,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  CONSTRAINT `fk-core_support_item_message_id` FOREIGN KEY (`message_id`) REFERENCES `core_support` (`message_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_support_recipients` */

DROP TABLE IF EXISTS `core_support_recipients`;

CREATE TABLE `core_support_recipients` (
  `message_id` int(10) unsigned NOT NULL,
  `created_at` bigint(20) unsigned NOT NULL,
  `recipient_id` int(10) unsigned NOT NULL,
  `status` enum('Read','UnRead','Deleted') NOT NULL DEFAULT 'UnRead',
  `time` int(11) DEFAULT NULL,
  PRIMARY KEY (`message_id`,`created_at`,`recipient_id`),
  KEY `recipient_id` (`recipient_id`),
  KEY `conversation_id` (`message_id`),
  CONSTRAINT `fk-core_support_recipients_message_id` FOREIGN KEY (`message_id`) REFERENCES `core_support` (`message_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-core_support_recipients_recipient_id` FOREIGN KEY (`recipient_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_tags` */

DROP TABLE IF EXISTS `core_tags`;

CREATE TABLE `core_tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` varchar(120) DEFAULT NULL,
  `status` tinyint(1) unsigned DEFAULT 1,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_tags_type` */

DROP TABLE IF EXISTS `core_tags_type`;

CREATE TABLE `core_tags_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(120) DEFAULT NULL,
  `name` varchar(120) NOT NULL,
  `status` tinyint(1) unsigned DEFAULT 1,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_timezone` */

DROP TABLE IF EXISTS `core_timezone`;

CREATE TABLE `core_timezone` (
  `zone_id` int(11) NOT NULL,
  `abbreviation` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `time_start` decimal(11,0) NOT NULL,
  `gmt_offset` int(11) NOT NULL,
  `dst` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  KEY `idx_zone_id` (`zone_id`),
  KEY `idx_time_start` (`time_start`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_translate` */

DROP TABLE IF EXISTS `core_translate`;

CREATE TABLE `core_translate` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(250) NOT NULL,
  `message` varchar(250) NOT NULL,
  `code` varchar(10) NOT NULL,
  `translate` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `message` (`message`,`code`) USING HASH,
  KEY `slug` (`slug`)
) ENGINE=MyISAM AUTO_INCREMENT=310 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `core_zipcode` */

DROP TABLE IF EXISTS `core_zipcode`;

CREATE TABLE `core_zipcode` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `postcode` varchar(12) DEFAULT NULL,
  `place_name` varchar(64) DEFAULT NULL,
  `state_name` varchar(32) DEFAULT NULL,
  `state_code` varchar(8) DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `accuracy` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postcode` (`postcode`),
  KEY `place_name` (`place_name`),
  KEY `state_name` (`state_name`),
  KEY `state_code` (`state_code`),
  KEY `accuracy` (`accuracy`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `document` */

DROP TABLE IF EXISTS `document`;

CREATE TABLE `document` (
  `document_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sku` varchar(64) DEFAULT NULL,
  `astm_subject` varchar(120) DEFAULT NULL,
  `display_title` varchar(256) DEFAULT NULL,
  `image_url` varchar(256) DEFAULT NULL,
  `subtitle` varchar(250) DEFAULT NULL,
  `link` varchar(250) DEFAULT NULL,
  `print_version` varchar(250) DEFAULT NULL,
  `print_version_edition` varchar(250) DEFAULT NULL,
  `print_version_month` varchar(250) DEFAULT NULL,
  `print_version_year` varchar(32) DEFAULT NULL,
  `year` varchar(32) DEFAULT NULL,
  `recently_added` varchar(100) DEFAULT NULL,
  `is_xml` tinyint(4) DEFAULT NULL,
  `is_premium_pdf` tinyint(4) DEFAULT NULL,
  `is_excluded` tinyint(4) DEFAULT NULL,
  `is_collection` tinyint(4) DEFAULT NULL,
  `is_astm` tinyint(4) DEFAULT NULL,
  `subscription_required` tinyint(4) DEFAULT NULL,
  `supports_versions` tinyint(4) DEFAULT NULL,
  `sort_order` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`document_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3193 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `document_access_level` */

DROP TABLE IF EXISTS `document_access_level`;

CREATE TABLE `document_access_level` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `access_level` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `document_associations` */

DROP TABLE IF EXISTS `document_associations`;

CREATE TABLE `document_associations` (
  `association_id` bigint(20) unsigned NOT NULL,
  `association_document_id` bigint(20) unsigned NOT NULL,
  `document_id` bigint(20) unsigned NOT NULL,
  KEY `document_id` (`document_id`),
  KEY `association_id` (`association_id`),
  KEY `association_document_id` (`association_document_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `document_category` */

DROP TABLE IF EXISTS `document_category`;

CREATE TABLE `document_category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(250) NOT NULL,
  `slug` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=203 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `document_chapter` */

DROP TABLE IF EXISTS `document_chapter`;

CREATE TABLE `document_chapter` (
  `content_id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `document_id` int(12) unsigned NOT NULL,
  `title` text DEFAULT NULL,
  `type_id` int(10) unsigned DEFAULT NULL,
  `document_slug` text DEFAULT NULL,
  `chapter_slug` text DEFAULT NULL,
  PRIMARY KEY (`content_id`),
  KEY `document_id` (`document_id`),
  KEY `type_id` (`type_id`),
  KEY `title` (`title`(250)),
  CONSTRAINT `document_chapter_ibfk_1` FOREIGN KEY (`document_id`) REFERENCES `document` (`document_id`) ON DELETE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=29450065 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `document_chapter_content` */

DROP TABLE IF EXISTS `document_chapter_content`;

CREATE TABLE `document_chapter_content` (
  `content_id` int(12) unsigned NOT NULL,
  `document_id` int(12) unsigned NOT NULL,
  `content` longtext DEFAULT NULL,
  PRIMARY KEY (`content_id`),
  KEY `document_id` (`document_id`),
  KEY `content_id` (`content_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `document_chapter_section` */

DROP TABLE IF EXISTS `document_chapter_section`;

CREATE TABLE `document_chapter_section` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `document_id` int(12) unsigned NOT NULL,
  `content_id` int(12) unsigned NOT NULL,
  `parentContentID` int(12) unsigned DEFAULT NULL,
  `levelID` int(10) unsigned DEFAULT NULL,
  `crossreferencecontentid` int(12) unsigned DEFAULT NULL,
  `link` text DEFAULT NULL,
  `identifier` varchar(250) DEFAULT NULL,
  `title` text DEFAULT NULL,
  `text` longtext DEFAULT NULL,
  `sortorder` int(11) DEFAULT NULL,
  `typeID` int(11) DEFAULT NULL,
  `url` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `document_id` (`document_id`),
  KEY `content_id` (`content_id`),
  KEY `parentContentID` (`parentContentID`),
  KEY `levelID` (`levelID`),
  KEY `crossreferencecontentid` (`crossreferencecontentid`),
  KEY `title` (`title`(250)),
  KEY `typeID` (`typeID`)
) ENGINE=MyISAM AUTO_INCREMENT=1346101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `document_chapter_section_content` */

DROP TABLE IF EXISTS `document_chapter_section_content`;

CREATE TABLE `document_chapter_section_content` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `content_id` int(12) unsigned NOT NULL,
  `document_id` int(12) unsigned NOT NULL,
  `content` longtext DEFAULT NULL,
  PRIMARY KEY (`id`,`content_id`)
) ENGINE=MyISAM AUTO_INCREMENT=1317518 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `document_chapter_section_path` */

DROP TABLE IF EXISTS `document_chapter_section_path`;

CREATE TABLE `document_chapter_section_path` (
  `content_id` int(12) unsigned NOT NULL,
  `parentContentID` int(12) unsigned NOT NULL,
  `level` int(11) NOT NULL,
  PRIMARY KEY (`content_id`,`parentContentID`),
  KEY `parent_id` (`parentContentID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `document_content_type` */

DROP TABLE IF EXISTS `document_content_type`;

CREATE TABLE `document_content_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `document_illustrations` */

DROP TABLE IF EXISTS `document_illustrations`;

CREATE TABLE `document_illustrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(256) DEFAULT NULL,
  `image_url` varchar(256) DEFAULT NULL,
  `full_image_url` varchar(256) DEFAULT NULL,
  `title` varchar(256) DEFAULT NULL,
  `pub_types` text DEFAULT NULL,
  `juris_keys` text DEFAULT NULL,
  `code_years` text DEFAULT NULL,
  `phases` text DEFAULT NULL,
  `topics` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `image_url` (`image_url`) USING HASH
) ENGINE=MyISAM AUTO_INCREMENT=1150 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `document_illustrations_jurisdiction` */

DROP TABLE IF EXISTS `document_illustrations_jurisdiction`;

CREATE TABLE `document_illustrations_jurisdiction` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(250) DEFAULT NULL,
  `value` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `document_illustrations_pub_types` */

DROP TABLE IF EXISTS `document_illustrations_pub_types`;

CREATE TABLE `document_illustrations_pub_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(250) DEFAULT NULL,
  `value` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `document_illustrations_topics` */

DROP TABLE IF EXISTS `document_illustrations_topics`;

CREATE TABLE `document_illustrations_topics` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(250) DEFAULT NULL,
  `value` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `document_info` */

DROP TABLE IF EXISTS `document_info`;

CREATE TABLE `document_info` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `document_id` int(10) unsigned NOT NULL,
  `document_slug` text DEFAULT NULL,
  `title` text DEFAULT NULL,
  `display_title` text DEFAULT NULL,
  `subtitle` text DEFAULT NULL,
  `abbreviation` text DEFAULT NULL,
  `icc_abbreviation` text DEFAULT NULL,
  `book_short_code` text DEFAULT NULL,
  `sku` text DEFAULT NULL,
  `pdf_url` text DEFAULT NULL,
  `shop_url` text DEFAULT NULL,
  `content_type` text DEFAULT NULL,
  `document_url` text DEFAULT NULL,
  `document_type` text DEFAULT NULL,
  `document_status` text DEFAULT NULL,
  `is_free_trial` tinyint(1) DEFAULT NULL,
  `is_featured` tinyint(1) DEFAULT NULL,
  `is_xml` tinyint(1) DEFAULT NULL,
  `is_astm` tinyint(1) DEFAULT NULL,
  `is_premium_pdf` tinyint(1) DEFAULT NULL,
  `is_collection` tinyint(1) DEFAULT NULL,
  `image_url` text DEFAULT NULL,
  `print_info` text DEFAULT NULL,
  `book_year` bigint(20) DEFAULT NULL,
  `access` tinyint(1) DEFAULT NULL,
  `new_iccxml` tinyint(1) DEFAULT NULL,
  `link` text DEFAULT NULL,
  `subscription_required` tinyint(1) DEFAULT NULL,
  `master_document_id` bigint(20) DEFAULT NULL,
  `sort_order` bigint(20) DEFAULT NULL,
  `print_version_month` text DEFAULT NULL,
  `document_cover_pdf` text DEFAULT NULL,
  `is_latest_version` tinyint(1) DEFAULT NULL,
  `latest_version_id` bigint(20) DEFAULT NULL,
  `serve_pdf_to_browser` tinyint(1) DEFAULT NULL,
  `year` text DEFAULT NULL,
  `print_version_year` text DEFAULT NULL,
  `print_version_edition` text DEFAULT NULL,
  `associate_sort_order` bigint(20) DEFAULT NULL,
  `custom_toc` tinyint(1) DEFAULT NULL,
  `custom_toc_content` text DEFAULT NULL,
  `document_keywords` text DEFAULT NULL,
  `book_abbr` text DEFAULT NULL,
  `is_unpurchased_access_premium` tinyint(4) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `selected_version` text DEFAULT NULL,
  `has_associations` tinyint(1) DEFAULT NULL,
  `content_access_level` text DEFAULT NULL,
  `printing_text` text DEFAULT NULL,
  `part_of_complete` tinyint(1) DEFAULT NULL,
  `is_excluded` tinyint(1) DEFAULT NULL,
  `has_landing_page` tinyint(1) DEFAULT NULL,
  `supports_versions` tinyint(1) DEFAULT NULL,
  `astm_subject` text DEFAULT NULL,
  `contentRestricted` tinyint(1) DEFAULT NULL,
  `access_outside_trial` tinyint(1) DEFAULT NULL,
  `contentBasic` bigint(20) DEFAULT NULL,
  `contentPremium` bigint(20) DEFAULT NULL,
  `contentProtection` bigint(20) DEFAULT NULL,
  `contentAccess` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `document_slug` (`document_slug`(250)),
  KEY `document_id` (`document_id`),
  KEY `title` (`title`(250)),
  KEY `sku` (`sku`(768))
) ENGINE=InnoDB AUTO_INCREMENT=3885 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `document_info_category` */

DROP TABLE IF EXISTS `document_info_category`;

CREATE TABLE `document_info_category` (
  `document_id` int(10) unsigned NOT NULL,
  `info_id` int(10) unsigned NOT NULL,
  `category_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`document_id`,`info_id`,`category_id`),
  KEY `info_id` (`info_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `document_info_category_ibfk_1` FOREIGN KEY (`document_id`) REFERENCES `document` (`document_id`) ON DELETE CASCADE,
  CONSTRAINT `document_info_category_ibfk_2` FOREIGN KEY (`info_id`) REFERENCES `document_info` (`id`) ON DELETE CASCADE,
  CONSTRAINT `document_info_category_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `document_category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `document_info_collection` */

DROP TABLE IF EXISTS `document_info_collection`;

CREATE TABLE `document_info_collection` (
  `info_id` bigint(20) unsigned NOT NULL,
  `collection_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`info_id`,`collection_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `document_latest_version` */

DROP TABLE IF EXISTS `document_latest_version`;

CREATE TABLE `document_latest_version` (
  `latest_document_id` bigint(20) unsigned NOT NULL,
  `document_id` bigint(20) unsigned NOT NULL,
  `sku` varchar(250) DEFAULT NULL,
  `display_title` text DEFAULT NULL,
  `subtitle` text DEFAULT NULL,
  `print_version` text DEFAULT NULL,
  `print_version_month` varchar(250) DEFAULT NULL,
  `print_version_year` text DEFAULT NULL,
  `print_version_edition` text DEFAULT NULL,
  `is_xml` tinyint(1) DEFAULT NULL,
  `is_astm` tinyint(1) DEFAULT NULL,
  `is_premium_pdf` tinyint(1) DEFAULT NULL,
  `is_collection` tinyint(1) DEFAULT NULL,
  `subscription_required` tinyint(1) DEFAULT NULL,
  `image_url` varchar(1024) DEFAULT NULL,
  `recently_added` bigint(20) DEFAULT NULL,
  `link` varchar(1024) DEFAULT NULL,
  `supports_versions` tinyint(1) DEFAULT NULL,
  `is_excluded` tinyint(1) DEFAULT NULL,
  `astm_subject` text DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `document_print_version_edition` */

DROP TABLE IF EXISTS `document_print_version_edition`;

CREATE TABLE `document_print_version_edition` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `version` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `document_print_version_year` */

DROP TABLE IF EXISTS `document_print_version_year`;

CREATE TABLE `document_print_version_year` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `year` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `document_status` */

DROP TABLE IF EXISTS `document_status`;

CREATE TABLE `document_status` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `document_type` */

DROP TABLE IF EXISTS `document_type`;

CREATE TABLE `document_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `menu` */

DROP TABLE IF EXISTS `menu`;

CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `parent` int(11) DEFAULT NULL,
  `route` varchar(255) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `data` blob DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parent` (`parent`),
  CONSTRAINT `fk-menu_parent` FOREIGN KEY (`parent`) REFERENCES `menu` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `migration` */

DROP TABLE IF EXISTS `migration`;

CREATE TABLE `migration` (
  `version` varchar(180) NOT NULL,
  `apply_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `session` */

DROP TABLE IF EXISTS `session`;

CREATE TABLE `session` (
  `id` varchar(64) NOT NULL,
  `data` text DEFAULT NULL,
  `expire` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `auth_key` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_reset_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT 10,
  `last_login` int(11) NOT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_authclient` */

DROP TABLE IF EXISTS `user_authclient`;

CREATE TABLE `user_authclient` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `source` varchar(250) DEFAULT NULL,
  `source_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fk-user_authclient_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_availability` */

DROP TABLE IF EXISTS `user_availability`;

CREATE TABLE `user_availability` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `item_id` int(10) unsigned DEFAULT NULL,
  `week_day` enum('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday') NOT NULL,
  `start_time` int(10) unsigned NOT NULL,
  `end_time` int(10) unsigned NOT NULL,
  `status` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '0 - off , 1 - on',
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `fk-user_availability_item_id` FOREIGN KEY (`item_id`) REFERENCES `user_catalog` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_availability_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_availability_booked` */

DROP TABLE IF EXISTS `user_availability_booked`;

CREATE TABLE `user_availability_booked` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `catalog_id` int(10) unsigned DEFAULT NULL,
  `order_id` int(10) unsigned DEFAULT NULL,
  `order_item_id` int(10) unsigned DEFAULT NULL,
  `start_time` int(10) unsigned NOT NULL,
  `end_time` int(10) unsigned NOT NULL,
  `slot` tinyint(4) DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `order_id` (`order_id`),
  KEY `item_id` (`catalog_id`),
  KEY `order_item_id` (`order_item_id`),
  CONSTRAINT `fk-user_availability_booked_catalog_id` FOREIGN KEY (`catalog_id`) REFERENCES `user_catalog` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_availability_booked_order_id` FOREIGN KEY (`order_id`) REFERENCES `user_catalog_orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_availability_booked_order_item_id` FOREIGN KEY (`order_item_id`) REFERENCES `user_catalog_orders_item` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_availability_booked_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_availability_rates` */

DROP TABLE IF EXISTS `user_availability_rates`;

CREATE TABLE `user_availability_rates` (
  `user_id` int(10) unsigned NOT NULL,
  `type` int(10) unsigned NOT NULL COMMENT '1 - weekdays, 2 - overnight, 3 - holidays, 4 - live-in',
  `is_ongoing` tinyint(3) unsigned NOT NULL COMMENT '1 - ongoing, 2 - occational',
  `rate` decimal(10,2) unsigned NOT NULL,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`type`),
  CONSTRAINT `fk-user_availability_rates_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_award` */

DROP TABLE IF EXISTS `user_award`;

CREATE TABLE `user_award` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `certification` varchar(100) NOT NULL,
  `institute` varchar(100) DEFAULT NULL,
  `title` varchar(250) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `file_id` int(10) unsigned DEFAULT NULL,
  `dated` int(10) unsigned DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `file_id` (`file_id`),
  CONSTRAINT `fk-user_award_file_id` FOREIGN KEY (`file_id`) REFERENCES `core_media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_award_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_bank` */

DROP TABLE IF EXISTS `user_bank`;

CREATE TABLE `user_bank` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `name` varchar(250) NOT NULL,
  `account_holder_name` varchar(100) DEFAULT NULL,
  `account_number` varchar(64) NOT NULL,
  `code` varchar(64) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `postal_code` varchar(32) DEFAULT NULL,
  `country_code` varchar(10) DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_bank_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

/*Table structure for table `user_catalog` */

DROP TABLE IF EXISTS `user_catalog`;

CREATE TABLE `user_catalog` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `moduleId` varchar(120) DEFAULT NULL,
  `identifier` varchar(64) DEFAULT NULL,
  `code_year` varchar(120) DEFAULT NULL,
  `project_type` varchar(120) DEFAULT NULL,
  `project_jurisdiction` varchar(120) DEFAULT NULL,
  `project_category` varchar(32) DEFAULT NULL,
  `project_location` varchar(250) DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `owner_id` int(10) unsigned DEFAULT NULL,
  `message_id` int(11) unsigned DEFAULT NULL,
  `category_id` int(10) unsigned DEFAULT NULL,
  `sub_category_id` int(10) unsigned DEFAULT NULL,
  `cover_id` int(10) unsigned DEFAULT NULL,
  `pdf_id` int(10) unsigned DEFAULT NULL,
  `epub_id` int(10) unsigned DEFAULT NULL,
  `video_id` int(10) unsigned DEFAULT NULL,
  `location_id` int(10) unsigned DEFAULT NULL,
  `order_id` int(11) unsigned DEFAULT NULL,
  `title` varchar(250) DEFAULT NULL,
  `organization` varchar(200) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `specification` text DEFAULT NULL,
  `tags` varchar(200) DEFAULT NULL,
  `price_type` enum('fixed','percentage','none') DEFAULT 'fixed' COMMENT 'Security Deposit amount type',
  `occupancy_rate` decimal(10,2) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT 0.00 COMMENT 'price per hour',
  `reserve_price` decimal(10,2) DEFAULT 0.00 COMMENT 'Security Deposit',
  `discount_price` decimal(10,2) DEFAULT 0.00,
  `m2_gross_price` decimal(10,2) DEFAULT 0.00,
  `m2_net_price` decimal(10,2) DEFAULT 0.00,
  `dated` int(11) DEFAULT NULL,
  `sales` varchar(64) DEFAULT NULL,
  `length` decimal(10,2) DEFAULT NULL,
  `height` decimal(10,2) DEFAULT NULL,
  `weight` decimal(10,2) DEFAULT NULL,
  `length_unit` varchar(5) DEFAULT 'cm',
  `weight_unit` varchar(5) DEFAULT 'g',
  `tax_id` int(11) DEFAULT NULL,
  `in_stock` tinyint(4) DEFAULT NULL COMMENT '1 - In stock, 2 - pre stock, 3 - out of stock, 4 - 2-3 Days',
  `age_of_building` tinyint(4) DEFAULT NULL,
  `is_available_loan` tinyint(1) DEFAULT NULL COMMENT '1 - Yes, 0 - No',
  `is_available` tinyint(1) DEFAULT 0 COMMENT '0 - open, 1 - closed',
  `is_featured` tinyint(3) DEFAULT NULL,
  `featured_price` decimal(10,2) DEFAULT NULL,
  `featured_end_time` int(11) DEFAULT NULL,
  `featured_start_time` int(11) DEFAULT NULL,
  `is_swap` tinyint(1) DEFAULT NULL COMMENT '1 - Yes, 0 - No',
  `is_publish` tinyint(4) DEFAULT NULL COMMENT '0 - Draft, 1 - Publish',
  `is_public` tinyint(1) DEFAULT NULL COMMENT '1 - public, 0 - private',
  `is_accepted` tinyint(4) DEFAULT NULL COMMENT '0 - No, 1 - Yes,',
  `is_closed` tinyint(4) DEFAULT NULL COMMENT '0 - Open, 1 - Closed',
  `is_verified` tinyint(3) unsigned DEFAULT NULL COMMENT '0 - No, 1 - Yes, 2 - Pending',
  `is_furnished` tinyint(3) DEFAULT NULL COMMENT '0 - No, 1 - Yes,',
  `is_furniture` tinyint(4) DEFAULT NULL COMMENT '0 - No, 1 - Yes,',
  `is_ac` tinyint(4) DEFAULT NULL COMMENT '0 - No, 1 - Yes,',
  `status_of_use` tinyint(4) DEFAULT NULL COMMENT '0 - new,  1-used',
  `verified_dated` int(11) DEFAULT NULL,
  `viewed` int(11) DEFAULT 0 COMMENT 'views count',
  `order_by` int(10) unsigned DEFAULT NULL,
  `is_deleted` tinyint(4) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL COMMENT '0 - Deactive, 1 - Active, 2 - Complete, 3 - submit for approved, 4 - approved',
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `identifier` (`identifier`),
  KEY `user_id` (`user_id`),
  KEY `category_id` (`category_id`),
  KEY `cover_id` (`cover_id`),
  KEY `location_id` (`location_id`),
  KEY `tax_id` (`tax_id`),
  KEY `sub_category_id` (`sub_category_id`),
  KEY `video_id` (`video_id`),
  KEY `moduleId` (`moduleId`),
  KEY `pdf_id` (`pdf_id`),
  KEY `epub_id` (`epub_id`),
  KEY `owner_id` (`owner_id`),
  KEY `order_id` (`order_id`),
  KEY `message_id` (`message_id`),
  CONSTRAINT `fk-user_catalog_category_id` FOREIGN KEY (`category_id`) REFERENCES `user_catalog_category` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_cover_id` FOREIGN KEY (`cover_id`) REFERENCES `core_media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_epub_id` FOREIGN KEY (`epub_id`) REFERENCES `core_media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_location_id` FOREIGN KEY (`location_id`) REFERENCES `user_location` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_moduleId` FOREIGN KEY (`moduleId`) REFERENCES `core_module` (`moduleId`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_order_id` FOREIGN KEY (`order_id`) REFERENCES `user_catalog_orders` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_owner_id` FOREIGN KEY (`owner_id`) REFERENCES `user_profile` (`user_id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_pdf_id` FOREIGN KEY (`pdf_id`) REFERENCES `core_media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_sub_category_id` FOREIGN KEY (`sub_category_id`) REFERENCES `user_catalog_category` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_tax_id` FOREIGN KEY (`tax_id`) REFERENCES `user_catalog_tax_class` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_video_id` FOREIGN KEY (`video_id`) REFERENCES `core_media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `user_catalog_ibfk_1` FOREIGN KEY (`message_id`) REFERENCES `user_message` (`message_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_ads` */

DROP TABLE IF EXISTS `user_catalog_ads`;

CREATE TABLE `user_catalog_ads` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `category_id` int(10) unsigned NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `type` int(10) unsigned DEFAULT NULL COMMENT '1 - Top & right, 2 - inner, 3 - featured',
  `is_featured` int(11) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `transaction_id` int(10) unsigned DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `transaction_id` (`transaction_id`),
  KEY `category_id` (`category_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fk-user_catalog_ads_category_id` FOREIGN KEY (`category_id`) REFERENCES `user_catalog_category` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_ads_transaction_id` FOREIGN KEY (`transaction_id`) REFERENCES `user_transaction` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_ads_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_ads_availability_booked` */

DROP TABLE IF EXISTS `user_catalog_ads_availability_booked`;

CREATE TABLE `user_catalog_ads_availability_booked` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `ads_id` int(10) unsigned DEFAULT NULL,
  `ads_type` int(11) DEFAULT NULL COMMENT '1 - top 2 - left, 3 - right, 4 - featured',
  `start_date` int(10) unsigned NOT NULL,
  `end_date` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `item_id` (`ads_id`),
  CONSTRAINT `fk-user_catalog_ads_availability_booked_ads_id` FOREIGN KEY (`ads_id`) REFERENCES `user_catalog_ads` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_ads_availability_booked_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_ads_category` */

DROP TABLE IF EXISTS `user_catalog_ads_category`;

CREATE TABLE `user_catalog_ads_category` (
  `ads_id` int(10) unsigned NOT NULL,
  `category_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ads_id`,`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_ads_item` */

DROP TABLE IF EXISTS `user_catalog_ads_item`;

CREATE TABLE `user_catalog_ads_item` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `catalog_id` int(10) unsigned DEFAULT NULL,
  `banner_id` int(10) unsigned DEFAULT NULL,
  `type` int(3) DEFAULT NULL COMMENT '1 -> Top 2 - left, 3 - right, 4 - featured',
  `description` varchar(250) DEFAULT NULL,
  `link` varchar(250) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `banner_id` (`banner_id`),
  KEY `catalog_id` (`catalog_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fk-user_catalog_ads_item_banner_id` FOREIGN KEY (`banner_id`) REFERENCES `core_media` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_ads_item_catalog_id` FOREIGN KEY (`catalog_id`) REFERENCES `user_catalog` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_ads_item_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_ads_layout` */

DROP TABLE IF EXISTS `user_catalog_ads_layout`;

CREATE TABLE `user_catalog_ads_layout` (
  `ads_id` int(10) unsigned NOT NULL,
  `type` enum('top','middle','bottom','top-right','top-left','top-centre','middle-left','middle-right','middle-center','bottom-left','bottom-right','bottom-center') NOT NULL DEFAULT 'top',
  PRIMARY KEY (`ads_id`,`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_amenities` */

DROP TABLE IF EXISTS `user_catalog_amenities`;

CREATE TABLE `user_catalog_amenities` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `catalog_id` int(10) unsigned NOT NULL,
  `tag_id` int(10) unsigned DEFAULT NULL,
  `name` varchar(32) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(100) NOT NULL,
  `status` tinyint(3) unsigned DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `catalog_id` (`catalog_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `fk-user_catalog_amenities_catalog_id` FOREIGN KEY (`catalog_id`) REFERENCES `user_catalog` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_amenities_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `user_catalog_tag` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_attributes` */

DROP TABLE IF EXISTS `user_catalog_attributes`;

CREATE TABLE `user_catalog_attributes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `catalog_id` int(10) unsigned NOT NULL,
  `field_id` int(10) unsigned NOT NULL,
  `name` varchar(120) NOT NULL,
  `value` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`catalog_id`),
  KEY `field_id` (`field_id`),
  CONSTRAINT `fk-user_catalog_attributes_catalog_id` FOREIGN KEY (`catalog_id`) REFERENCES `user_catalog` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_attributes_field_id` FOREIGN KEY (`field_id`) REFERENCES `core_field` (`field_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_brand` */

DROP TABLE IF EXISTS `user_catalog_brand`;

CREATE TABLE `user_catalog_brand` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `description` text DEFAULT NULL,
  `image_id` int(10) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fk-user_catalog_brand_image_id` FOREIGN KEY (`image_id`) REFERENCES `core_media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_brand_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_cart` */

DROP TABLE IF EXISTS `user_catalog_cart`;

CREATE TABLE `user_catalog_cart` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `session_id` varchar(32) DEFAULT NULL,
  `catalog_id` int(10) unsigned NOT NULL,
  `quantity` int(10) unsigned NOT NULL,
  `options` text DEFAULT NULL,
  `price` decimal(10,2) unsigned NOT NULL,
  `status` tinyint(4) DEFAULT NULL COMMENT '1 - request, 2 - apply, 3 - agreement',
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`user_id`,`session_id`,`catalog_id`),
  KEY `item_id` (`catalog_id`),
  CONSTRAINT `fk-user_catalog_cart_catalog_id` FOREIGN KEY (`catalog_id`) REFERENCES `user_catalog` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_cart_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_category` */

DROP TABLE IF EXISTS `user_catalog_category`;

CREATE TABLE `user_catalog_category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `media_id` int(10) unsigned DEFAULT NULL,
  `slug` varchar(250) NOT NULL,
  `description` text DEFAULT NULL,
  `moduleId` varchar(120) DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`),
  KEY `moduleId` (`moduleId`),
  KEY `user_catalog_category_media_id` (`media_id`),
  CONSTRAINT `fk-user_catalog_category_media_id` FOREIGN KEY (`media_id`) REFERENCES `core_media` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_category_moduleId` FOREIGN KEY (`moduleId`) REFERENCES `core_module` (`moduleId`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_category_parent_id` FOREIGN KEY (`parent_id`) REFERENCES `user_catalog_category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_category_field_value` */

DROP TABLE IF EXISTS `user_catalog_category_field_value`;

CREATE TABLE `user_catalog_category_field_value` (
  `item_id` int(10) unsigned NOT NULL,
  `field_id` int(10) unsigned NOT NULL,
  `value` varchar(250) NOT NULL,
  `field_name` varchar(64) NOT NULL,
  PRIMARY KEY (`item_id`,`field_id`,`value`),
  KEY `field_id` (`field_id`),
  KEY `value` (`value`),
  CONSTRAINT `fk-user_catalog_category_field_value_field_id` FOREIGN KEY (`field_id`) REFERENCES `core_field` (`field_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_category_field_value_item_id` FOREIGN KEY (`item_id`) REFERENCES `user_catalog_category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_category_path` */

DROP TABLE IF EXISTS `user_catalog_category_path`;

CREATE TABLE `user_catalog_category_path` (
  `category_id` int(10) unsigned NOT NULL,
  `parent_id` int(10) unsigned NOT NULL,
  `level` int(11) NOT NULL,
  PRIMARY KEY (`category_id`,`parent_id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `fk-user_catalog_category_path_category_id` FOREIGN KEY (`category_id`) REFERENCES `user_catalog_category` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_category_path_parent_id` FOREIGN KEY (`parent_id`) REFERENCES `user_catalog_category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_coupon` */

DROP TABLE IF EXISTS `user_catalog_coupon`;

CREATE TABLE `user_catalog_coupon` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `catalog_id` int(10) unsigned DEFAULT NULL,
  `name` varchar(128) NOT NULL,
  `code` varchar(20) NOT NULL,
  `type` enum('fixed','percentage') NOT NULL DEFAULT 'fixed',
  `discount` decimal(15,4) NOT NULL,
  `start_date` int(10) unsigned DEFAULT NULL,
  `end_date` int(10) unsigned DEFAULT NULL,
  `uses_total` int(10) unsigned NOT NULL,
  `uses_per_user` int(10) unsigned NOT NULL,
  `status` tinyint(3) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `user_id` (`user_id`),
  KEY `item_id` (`catalog_id`),
  CONSTRAINT `fk-user_catalog_coupon_catalog_id` FOREIGN KEY (`catalog_id`) REFERENCES `user_catalog` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_coupon_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_field_value` */

DROP TABLE IF EXISTS `user_catalog_field_value`;

CREATE TABLE `user_catalog_field_value` (
  `item_id` int(10) unsigned NOT NULL,
  `field_id` int(10) unsigned NOT NULL,
  `value` varchar(250) NOT NULL,
  `field_name` varchar(64) NOT NULL,
  PRIMARY KEY (`item_id`,`field_id`,`value`),
  KEY `field_id` (`field_id`),
  KEY `value` (`value`),
  CONSTRAINT `fk-user_catalog_field_value_field_id` FOREIGN KEY (`field_id`) REFERENCES `core_field` (`field_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_field_value_item_id` FOREIGN KEY (`item_id`) REFERENCES `user_catalog` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_gift_certificate` */

DROP TABLE IF EXISTS `user_catalog_gift_certificate`;

CREATE TABLE `user_catalog_gift_certificate` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `recipient_id` int(10) unsigned NOT NULL,
  `code` varchar(64) NOT NULL,
  `recipient_email` varchar(64) DEFAULT NULL,
  `credit` decimal(10,2) DEFAULT NULL,
  `balance_credit` decimal(10,2) DEFAULT NULL,
  `transaction_id` int(10) unsigned DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `sender_id` (`user_id`),
  KEY `recipient_id` (`recipient_id`),
  KEY `transaction_id` (`transaction_id`),
  CONSTRAINT `fk-user_catalog_gift_certificate_recipient_id` FOREIGN KEY (`recipient_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_gift_certificate_transaction_id` FOREIGN KEY (`transaction_id`) REFERENCES `user_transaction` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_gift_certificate_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_history` */

DROP TABLE IF EXISTS `user_catalog_history`;

CREATE TABLE `user_catalog_history` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `catalog_id` int(10) unsigned NOT NULL,
  `dated` int(10) unsigned NOT NULL,
  `type` varchar(64) DEFAULT NULL,
  `mileage` varchar(16) DEFAULT NULL,
  `note` varchar(120) DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`catalog_id`),
  CONSTRAINT `fk-user_catalog_history_catalog_id` FOREIGN KEY (`catalog_id`) REFERENCES `user_catalog` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_length` */

DROP TABLE IF EXISTS `user_catalog_length`;

CREATE TABLE `user_catalog_length` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(64) DEFAULT NULL,
  `unit` varchar(4) DEFAULT NULL,
  `value` decimal(15,8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_options` */

DROP TABLE IF EXISTS `user_catalog_options`;

CREATE TABLE `user_catalog_options` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `catalog_id` int(10) unsigned NOT NULL,
  `field_id` int(10) unsigned NOT NULL,
  `name` varchar(120) NOT NULL,
  `value` varchar(120) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int(10) unsigned DEFAULT NULL,
  `file_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`catalog_id`),
  KEY `field_id` (`field_id`),
  KEY `file_id` (`file_id`),
  CONSTRAINT `fk-user_catalog_options_catalog_id` FOREIGN KEY (`catalog_id`) REFERENCES `user_catalog` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_options_field_id` FOREIGN KEY (`field_id`) REFERENCES `core_field` (`field_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_options_file_id` FOREIGN KEY (`file_id`) REFERENCES `core_media` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_orders` */

DROP TABLE IF EXISTS `user_catalog_orders`;

CREATE TABLE `user_catalog_orders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `identifier` varchar(64) DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `provider_id` int(10) unsigned DEFAULT NULL,
  `manager_id` int(10) unsigned DEFAULT NULL,
  `tenant_id` int(10) unsigned DEFAULT NULL,
  `action_by` int(10) unsigned DEFAULT NULL,
  `moduleId` varchar(120) DEFAULT NULL,
  `contract_type` varchar(64) DEFAULT NULL,
  `coupon_id` int(10) unsigned DEFAULT NULL,
  `gift_id` int(10) unsigned DEFAULT NULL,
  `catalog_id` int(10) unsigned DEFAULT NULL,
  `doc_id` int(11) unsigned DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `slot` int(10) unsigned DEFAULT NULL,
  `title` varchar(256) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `terms` text DEFAULT NULL,
  `any_questions` text DEFAULT NULL,
  `tags` varchar(200) DEFAULT NULL,
  `commission` decimal(10,2) unsigned DEFAULT NULL,
  `additional_fees` decimal(10,2) DEFAULT NULL,
  `tax_rates` decimal(10,2) DEFAULT NULL,
  `total_amount` decimal(10,2) unsigned DEFAULT NULL,
  `payment_terms` varchar(32) DEFAULT NULL COMMENT '0 - none, 1 - monthly, 2 - quaterly, - 3. Bi-annualy, 4. annualy',
  `is_dispute` tinyint(4) DEFAULT NULL,
  `is_public` tinyint(3) unsigned DEFAULT NULL COMMENT '0 - private, 1 - public',
  `is_closed` tinyint(3) unsigned DEFAULT 0 COMMENT '1 - closed, 0 - open',
  `ip_address` varchar(25) DEFAULT NULL,
  `message_id` int(11) DEFAULT NULL,
  `transaction_id` int(10) unsigned DEFAULT NULL,
  `status` tinyint(3) unsigned NOT NULL COMMENT '0 - pending, 1 - accepted, 2 - declined, 3 - offers, 4- payment & confirm, 5 - mark AS completed 9 - counter offers, 10 - refund, 11 - bid',
  `is_deleted` tinyint(4) DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `action_by` (`action_by`),
  KEY `transcation_id` (`transaction_id`),
  KEY `coupon_id` (`coupon_id`),
  KEY `gift_id` (`gift_id`),
  KEY `moduleId` (`moduleId`),
  KEY `catalog_id` (`catalog_id`),
  KEY `provider_id` (`provider_id`),
  KEY `user_id` (`user_id`),
  KEY `manager_id` (`manager_id`),
  KEY `tenant_id` (`tenant_id`),
  KEY `doc_id` (`doc_id`),
  CONSTRAINT `fk-user_catalog_orders_action_by` FOREIGN KEY (`action_by`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_orders_catalog_id` FOREIGN KEY (`catalog_id`) REFERENCES `user_catalog` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_orders_coupon_id` FOREIGN KEY (`coupon_id`) REFERENCES `user_catalog_coupon` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_orders_doc_id` FOREIGN KEY (`doc_id`) REFERENCES `core_media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_orders_gift_id` FOREIGN KEY (`gift_id`) REFERENCES `user_catalog_gift_certificate` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_orders_manager_id` FOREIGN KEY (`manager_id`) REFERENCES `user_profile` (`user_id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_orders_moduleId` FOREIGN KEY (`moduleId`) REFERENCES `core_module` (`moduleId`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_orders_provider_id` FOREIGN KEY (`provider_id`) REFERENCES `user_profile` (`user_id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_orders_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `user_profile` (`user_id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_orders_transaction_id` FOREIGN KEY (`transaction_id`) REFERENCES `user_transaction` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_orders_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='bidding/hireing process';

/*Table structure for table `user_catalog_orders_field_value` */

DROP TABLE IF EXISTS `user_catalog_orders_field_value`;

CREATE TABLE `user_catalog_orders_field_value` (
  `item_id` int(10) unsigned NOT NULL,
  `field_id` int(10) unsigned NOT NULL,
  `value` varchar(250) NOT NULL,
  `field_name` varchar(64) NOT NULL,
  PRIMARY KEY (`item_id`,`field_id`,`value`),
  KEY `field_id` (`field_id`),
  KEY `value` (`value`),
  CONSTRAINT `fk-user_catalog_orders_field_value_field_id` FOREIGN KEY (`field_id`) REFERENCES `core_field` (`field_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_orders_field_value_item_id` FOREIGN KEY (`item_id`) REFERENCES `user_catalog_orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_orders_history` */

DROP TABLE IF EXISTS `user_catalog_orders_history`;

CREATE TABLE `user_catalog_orders_history` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(10) unsigned NOT NULL,
  `tenant_id` int(10) unsigned DEFAULT NULL,
  `action_by` int(10) unsigned NOT NULL,
  `comment` text DEFAULT NULL,
  `price` decimal(10,2) unsigned DEFAULT NULL,
  `status` tinyint(3) unsigned NOT NULL COMMENT '0 - peding, 1 - accept, 2 - Decline, 3 - Propose new price,',
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `action_by` (`action_by`),
  KEY `tenant_id` (`tenant_id`),
  CONSTRAINT `fk-user_catalog_orders_history_action_by` FOREIGN KEY (`action_by`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_orders_history_order_id` FOREIGN KEY (`order_id`) REFERENCES `user_catalog_orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_orders_history_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `user_profile` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='bidding/hireing process';

/*Table structure for table `user_catalog_orders_item` */

DROP TABLE IF EXISTS `user_catalog_orders_item`;

CREATE TABLE `user_catalog_orders_item` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(10) unsigned NOT NULL COMMENT 'job id',
  `catalog_id` int(10) unsigned NOT NULL,
  `category_id` int(10) unsigned DEFAULT NULL,
  `manager_id` int(10) unsigned DEFAULT NULL,
  `vendor_id` int(10) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `location_id` int(10) unsigned DEFAULT NULL,
  `request_type` enum('bill','issue','other') DEFAULT 'other',
  `moduleId` varchar(120) DEFAULT NULL,
  `identifier` varchar(32) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `quantity` int(10) unsigned DEFAULT NULL,
  `currency_code` varchar(3) DEFAULT NULL,
  `tax_rates` decimal(10,2) DEFAULT NULL,
  `amount` decimal(10,2) unsigned DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `slot` int(10) unsigned DEFAULT NULL,
  `extra` text DEFAULT NULL,
  `options` text DEFAULT NULL,
  `start_time` int(10) unsigned DEFAULT NULL,
  `end_time` int(10) unsigned DEFAULT NULL,
  `due_date` int(10) unsigned DEFAULT NULL,
  `comment` varchar(250) DEFAULT NULL,
  `is_opened` tinyint(3) unsigned DEFAULT 0 COMMENT '0 - No, 1 - Yes',
  `action_by` int(10) unsigned DEFAULT NULL,
  `pay_by` int(10) unsigned DEFAULT NULL,
  `action` tinyint(3) unsigned DEFAULT 0 COMMENT '0 - None, 1- Refunded/Return, 2 - Credit Issued, 3 - Replacement Sent, 3 - Finish',
  `reason` tinyint(3) unsigned DEFAULT 0 COMMENT '0 - None,1- Dead On Arrival, 2 - Received Wrong Item, 3 - Order Error, 4 -Faulty:please supply details, 5 - Other: please supply details',
  `status` tinyint(3) unsigned NOT NULL COMMENT 'Request,Apply,Accepted,Submitted,Declined,Confirm & Paid,Renewal,Cancelled',
  `message_id` int(10) unsigned DEFAULT NULL,
  `transaction_id` int(10) unsigned DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`catalog_id`),
  KEY `order_id` (`order_id`),
  KEY `slot_id` (`slot`),
  KEY `transaction_id` (`transaction_id`),
  KEY `action_by` (`action_by`),
  KEY `action` (`action`),
  KEY `reason` (`reason`),
  KEY `status` (`status`),
  KEY `moduleId` (`moduleId`),
  KEY `user_id` (`user_id`),
  KEY `vendor_id` (`vendor_id`),
  KEY `manager_id` (`manager_id`),
  KEY `category_id` (`category_id`),
  KEY `location_id` (`location_id`),
  KEY `message_key` (`message_id`),
  KEY `currency_code` (`currency_code`),
  KEY `pay_by` (`pay_by`),
  CONSTRAINT `fk-user_catalog_orders_item_action_by` FOREIGN KEY (`action_by`) REFERENCES `user_profile` (`user_id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_orders_item_catalog_id` FOREIGN KEY (`catalog_id`) REFERENCES `user_catalog` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_orders_item_category_id` FOREIGN KEY (`category_id`) REFERENCES `user_catalog_category` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_orders_item_location_id` FOREIGN KEY (`location_id`) REFERENCES `user_location` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_orders_item_manager_id` FOREIGN KEY (`manager_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_orders_item_message_id` FOREIGN KEY (`message_id`) REFERENCES `user_message` (`message_id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_orders_item_moduleId` FOREIGN KEY (`moduleId`) REFERENCES `core_module` (`moduleId`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_orders_item_order_id` FOREIGN KEY (`order_id`) REFERENCES `user_catalog_orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_orders_item_pay_by` FOREIGN KEY (`pay_by`) REFERENCES `user_profile` (`user_id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_orders_item_transaction_id` FOREIGN KEY (`transaction_id`) REFERENCES `user_transaction` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_orders_item_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_orders_item_vendor_id` FOREIGN KEY (`vendor_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='bidding/hireing process';

/*Table structure for table `user_catalog_orders_item_history` */

DROP TABLE IF EXISTS `user_catalog_orders_item_history`;

CREATE TABLE `user_catalog_orders_item_history` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(10) unsigned NOT NULL COMMENT 'job id',
  `order_item_id` int(10) unsigned NOT NULL,
  `location_id` int(10) unsigned DEFAULT NULL,
  `start_time` int(10) unsigned DEFAULT NULL,
  `end_time` int(10) unsigned DEFAULT NULL,
  `comment` varchar(250) DEFAULT NULL,
  `is_opened` tinyint(3) unsigned DEFAULT 0 COMMENT '0 - No, 1 - Yes',
  `action_by` int(10) unsigned DEFAULT NULL,
  `action` tinyint(3) unsigned DEFAULT 0 COMMENT '0 - None, 1- Refunded/Return, 2 - Credit Issued, 3 - Replacement Sent',
  `reason` tinyint(4) DEFAULT 0 COMMENT '0 - None,1- Dead On Arrival, 2 - Received Wrong Item, 3 - Order Error, 4 -Faulty:please supply details, 5 - Other: please supply details',
  `status` tinyint(3) unsigned NOT NULL COMMENT '1 - Active, 2 - Pending, 3 - Complete, 4 - Awaiting Products',
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `location_id` (`location_id`),
  KEY `action_by` (`action_by`),
  KEY `action` (`action`),
  KEY `reason` (`reason`),
  KEY `status` (`status`),
  CONSTRAINT `fk-user_catalog_orders_item_history_action_by` FOREIGN KEY (`action_by`) REFERENCES `user_profile` (`user_id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_orders_item_history_location_id` FOREIGN KEY (`location_id`) REFERENCES `user_location` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_orders_item_history_order_id` FOREIGN KEY (`order_id`) REFERENCES `user_catalog_orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_orders_item_history_order_item_id` FOREIGN KEY (`order_item_id`) REFERENCES `user_catalog_orders_item` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='bidding/hireing process';

/*Table structure for table `user_catalog_orders_item_particular` */

DROP TABLE IF EXISTS `user_catalog_orders_item_particular`;

CREATE TABLE `user_catalog_orders_item_particular` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `item_id` int(10) unsigned NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `sub_total` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `fk-user_catalog_orders_item_particular_item_id` FOREIGN KEY (`item_id`) REFERENCES `user_catalog_orders_item` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_orders_likes` */

DROP TABLE IF EXISTS `user_catalog_orders_likes`;

CREATE TABLE `user_catalog_orders_likes` (
  `user_id` int(10) unsigned NOT NULL,
  `order_id` int(10) unsigned NOT NULL,
  `is_like` tinyint(3) unsigned NOT NULL COMMENT 'like - 1, dislike - 0',
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`order_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `fk-user_catalog_orders_likes_order_id` FOREIGN KEY (`order_id`) REFERENCES `user_catalog_orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_orders_likes_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_orders_milestone` */

DROP TABLE IF EXISTS `user_catalog_orders_milestone`;

CREATE TABLE `user_catalog_orders_milestone` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(10) unsigned NOT NULL,
  `title` varchar(250) NOT NULL,
  `description` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `extra` text DEFAULT NULL,
  `duration` int(10) unsigned DEFAULT NULL COMMENT 'in days',
  `budget` decimal(10,2) unsigned DEFAULT NULL,
  `dated` int(10) unsigned DEFAULT NULL COMMENT 'due date',
  `is_paid` tinyint(3) unsigned DEFAULT NULL COMMENT '0 - unpaid, 1 - paid',
  `is_active` tinyint(1) DEFAULT 0 COMMENT '0 - not active, 1 - Active, 2 - off',
  `action_by` int(10) unsigned NOT NULL,
  `status` tinyint(3) unsigned DEFAULT NULL COMMENT 'pending = 0; submission = 1; approved = 2; not_approved = 3; payment = 4;',
  `transaction_id` int(10) unsigned DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `transcation_id` (`transaction_id`),
  KEY `action_by` (`action_by`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `fk-user_catalog_orders_milestone_action_by` FOREIGN KEY (`action_by`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_orders_milestone_order_id` FOREIGN KEY (`order_id`) REFERENCES `user_catalog_orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_orders_milestone_transaction_id` FOREIGN KEY (`transaction_id`) REFERENCES `user_transaction` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_orders_rates` */

DROP TABLE IF EXISTS `user_catalog_orders_rates`;

CREATE TABLE `user_catalog_orders_rates` (
  `order_id` int(10) unsigned NOT NULL,
  `type` int(10) unsigned NOT NULL COMMENT '1 - weekdays, 2 - overnight, 3 - holidays, 4 - live-in',
  `rate` decimal(10,2) unsigned NOT NULL,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`order_id`,`type`),
  CONSTRAINT `fk-user_catalog_orders_rates_order_id` FOREIGN KEY (`order_id`) REFERENCES `user_catalog_orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_orders_recipients` */

DROP TABLE IF EXISTS `user_catalog_orders_recipients`;

CREATE TABLE `user_catalog_orders_recipients` (
  `order_id` int(10) unsigned NOT NULL,
  `recipient_id` int(10) unsigned NOT NULL,
  `price` double(10,2) unsigned NOT NULL,
  `status` tinyint(3) unsigned NOT NULL COMMENT '0 - peding, 1 - accept, 2 - Decline, 3 - Propose new price,',
  PRIMARY KEY (`order_id`,`recipient_id`),
  KEY `recipient_id` (`recipient_id`),
  CONSTRAINT `fk-user_catalog_orders_recipients_order_id` FOREIGN KEY (`order_id`) REFERENCES `user_catalog_orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk-user_catalog_orders_recipients_recipient_id` FOREIGN KEY (`recipient_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='bidding/hireing process';

/*Table structure for table `user_catalog_orders_reference` */

DROP TABLE IF EXISTS `user_catalog_orders_reference`;

CREATE TABLE `user_catalog_orders_reference` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `order_id` int(10) unsigned DEFAULT NULL,
  `relation` enum('owner','manager','tenant','vendor') DEFAULT NULL,
  `name` varchar(128) NOT NULL,
  `email` varchar(64) NOT NULL,
  `gender` enum('Male','Female','None') DEFAULT 'None',
  `country_code` varchar(3) DEFAULT NULL,
  `telephone` varchar(32) DEFAULT NULL,
  `location` varchar(250) DEFAULT NULL,
  `doc_id` int(11) unsigned DEFAULT NULL,
  `commission` decimal(10,2) DEFAULT NULL,
  `payment_terms` varchar(32) DEFAULT NULL,
  `deposit_amount` decimal(10,2) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `terms` text DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_2` (`user_id`,`order_id`,`relation`),
  KEY `user_id` (`user_id`),
  KEY `order_id` (`order_id`),
  KEY `location_id` (`location`),
  KEY `doc_id` (`doc_id`),
  CONSTRAINT `fk-user_catalog_orders_reference_doc_id` FOREIGN KEY (`doc_id`) REFERENCES `core_media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_orders_reference_order_id` FOREIGN KEY (`order_id`) REFERENCES `user_catalog_orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_orders_reference_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_orders_services` */

DROP TABLE IF EXISTS `user_catalog_orders_services`;

CREATE TABLE `user_catalog_orders_services` (
  `order_id` int(10) unsigned NOT NULL,
  `category_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`order_id`,`category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `fk-user_catalog_orders_services_category_id` FOREIGN KEY (`category_id`) REFERENCES `user_catalog_category` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_orders_services_order_id` FOREIGN KEY (`order_id`) REFERENCES `user_catalog_orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_price` */

DROP TABLE IF EXISTS `user_catalog_price`;

CREATE TABLE `user_catalog_price` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `catalog_id` int(10) unsigned NOT NULL,
  `name` varchar(200) NOT NULL,
  `link` varchar(250) NOT NULL,
  `quantity` int(10) unsigned NOT NULL,
  `price` varchar(32) DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `item_id` (`catalog_id`,`name`),
  CONSTRAINT `fk-user_catalog_price_catalog_id` FOREIGN KEY (`catalog_id`) REFERENCES `user_catalog` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_recipients` */

DROP TABLE IF EXISTS `user_catalog_recipients`;

CREATE TABLE `user_catalog_recipients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `relation` varchar(200) DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `catalog_id` int(10) unsigned DEFAULT NULL,
  `action_by` int(10) unsigned DEFAULT NULL,
  `name` varchar(120) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `telephone` varchar(32) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `country_code` varchar(3) DEFAULT NULL,
  `subject` varchar(128) DEFAULT NULL,
  `text` varchar(256) DEFAULT NULL,
  `doc_id` int(10) unsigned DEFAULT NULL,
  `message_id` int(10) unsigned DEFAULT NULL,
  `priority` tinyint(4) DEFAULT NULL,
  `staff_id` int(10) unsigned DEFAULT NULL,
  `status` tinyint(3) unsigned NOT NULL COMMENT '1 - pending, 2 - confirmed, 3 - declined, 4 - visited',
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `catalog_id` (`catalog_id`),
  KEY `action_by` (`action_by`),
  KEY `message_id` (`message_id`),
  KEY `attachment_id` (`doc_id`),
  KEY `priority` (`priority`),
  KEY `staff_id` (`staff_id`),
  CONSTRAINT `fk-user_catalog_recipients_action_by` FOREIGN KEY (`action_by`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_recipients_catalog_id` FOREIGN KEY (`catalog_id`) REFERENCES `user_catalog` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_recipients_doc_id` FOREIGN KEY (`doc_id`) REFERENCES `core_media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_recipients_message_id` FOREIGN KEY (`message_id`) REFERENCES `user_message` (`message_id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_recipients_staff_id` FOREIGN KEY (`staff_id`) REFERENCES `user_profile` (`user_id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_catalog_recipients_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_refer` */

DROP TABLE IF EXISTS `user_catalog_refer`;

CREATE TABLE `user_catalog_refer` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `catalog_id` int(10) unsigned NOT NULL,
  `ref_id` int(10) unsigned DEFAULT NULL,
  `ref_by` varchar(16) NOT NULL,
  `ref_name` varchar(120) DEFAULT NULL,
  `ref_email` varchar(120) NOT NULL,
  `is_registered` tinyint(3) unsigned DEFAULT NULL COMMENT '1 - Yes, 0 - No',
  `comment` varchar(255) DEFAULT NULL,
  `is_credited` int(10) unsigned DEFAULT 0 COMMENT '1- yes, 0 - no',
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`ref_email`),
  KEY `ref_id` (`ref_id`),
  KEY `ref_number` (`ref_by`),
  KEY `catalog_id` (`catalog_id`),
  CONSTRAINT `fk-user_catalog_refer_catalog_id` FOREIGN KEY (`catalog_id`) REFERENCES `user_catalog` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_refer_ref_id` FOREIGN KEY (`ref_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_refer_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_related` */

DROP TABLE IF EXISTS `user_catalog_related`;

CREATE TABLE `user_catalog_related` (
  `related_id` int(10) unsigned NOT NULL,
  `catalog_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`related_id`,`catalog_id`),
  KEY `related_idx` (`catalog_id`),
  CONSTRAINT `fk-user_catalog_related_catalog_id` FOREIGN KEY (`catalog_id`) REFERENCES `user_catalog` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_related_related_id` FOREIGN KEY (`related_id`) REFERENCES `user_catalog` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_service_category` */

DROP TABLE IF EXISTS `user_catalog_service_category`;

CREATE TABLE `user_catalog_service_category` (
  `catalog_id` int(10) unsigned NOT NULL,
  `category_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`catalog_id`,`category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `fk-user_catalog_service_category_catalog_id` FOREIGN KEY (`catalog_id`) REFERENCES `user_catalog` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_service_category_category_id` FOREIGN KEY (`category_id`) REFERENCES `user_catalog_category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_services` */

DROP TABLE IF EXISTS `user_catalog_services`;

CREATE TABLE `user_catalog_services` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `catalog_id` int(10) unsigned NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `link` varchar(250) DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `catalog_id` (`catalog_id`),
  KEY `name` (`name`),
  CONSTRAINT `fk-user_catalog_services_catalog_id` FOREIGN KEY (`catalog_id`) REFERENCES `user_catalog` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_space_rules` */

DROP TABLE IF EXISTS `user_catalog_space_rules`;

CREATE TABLE `user_catalog_space_rules` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `catalog_id` int(10) unsigned NOT NULL,
  `title` varchar(32) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` tinyint(3) unsigned DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `catalog_id` (`catalog_id`),
  CONSTRAINT `fk-user_catalog_space_rules_catalog_id` FOREIGN KEY (`catalog_id`) REFERENCES `user_catalog` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_tag` */

DROP TABLE IF EXISTS `user_catalog_tag`;

CREATE TABLE `user_catalog_tag` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `type` varchar(120) DEFAULT NULL,
  `category` varchar(120) DEFAULT NULL,
  `status` tinyint(1) unsigned DEFAULT 1,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_tag_type` */

DROP TABLE IF EXISTS `user_catalog_tag_type`;

CREATE TABLE `user_catalog_tag_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(120) DEFAULT NULL,
  `name` varchar(120) NOT NULL,
  `status` tinyint(1) unsigned DEFAULT 1,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_tax_class` */

DROP TABLE IF EXISTS `user_catalog_tax_class`;

CREATE TABLE `user_catalog_tax_class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(32) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` tinyint(3) unsigned DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_tax_rate` */

DROP TABLE IF EXISTS `user_catalog_tax_rate`;

CREATE TABLE `user_catalog_tax_rate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `zone_id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(32) NOT NULL,
  `rate` decimal(15,4) NOT NULL DEFAULT 0.0000,
  `type` char(1) NOT NULL,
  `status` tinyint(3) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_tax_rate_to_user` */

DROP TABLE IF EXISTS `user_catalog_tax_rate_to_user`;

CREATE TABLE `user_catalog_tax_rate_to_user` (
  `tax_rate_id` int(10) unsigned NOT NULL,
  `role` varchar(100) NOT NULL,
  PRIMARY KEY (`tax_rate_id`,`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_tax_rule` */

DROP TABLE IF EXISTS `user_catalog_tax_rule`;

CREATE TABLE `user_catalog_tax_rule` (
  `tax_rule_id` int(11) NOT NULL AUTO_INCREMENT,
  `tax_class_id` int(11) NOT NULL,
  `tax_rate_id` int(11) NOT NULL,
  `based` varchar(10) NOT NULL,
  `priority` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`tax_rule_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_to_category` */

DROP TABLE IF EXISTS `user_catalog_to_category`;

CREATE TABLE `user_catalog_to_category` (
  `category_id` int(10) unsigned NOT NULL,
  `catalog_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`category_id`,`catalog_id`),
  KEY `item_id` (`catalog_id`),
  CONSTRAINT `fk-user_catalog_to_category_catalog_id` FOREIGN KEY (`catalog_id`) REFERENCES `user_catalog` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_to_category_category_id` FOREIGN KEY (`category_id`) REFERENCES `user_catalog_category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_topic` */

DROP TABLE IF EXISTS `user_catalog_topic`;

CREATE TABLE `user_catalog_topic` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `catalog_id` int(10) unsigned NOT NULL,
  `name` varchar(64) NOT NULL,
  `cover_id` int(10) unsigned DEFAULT NULL,
  `video_id` int(10) unsigned DEFAULT NULL,
  `video_duration` varchar(32) DEFAULT NULL,
  `pdf_id` int(10) unsigned DEFAULT NULL,
  `description` text DEFAULT NULL,
  `link` varchar(250) DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `item_idx` (`catalog_id`,`name`),
  KEY `video_idx` (`video_id`),
  KEY `cover_idx` (`cover_id`),
  KEY `file_idx` (`pdf_id`),
  CONSTRAINT `fk-user_catalog_topic_catalog_id` FOREIGN KEY (`catalog_id`) REFERENCES `user_catalog` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_topic_cover_id` FOREIGN KEY (`cover_id`) REFERENCES `core_media` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_topic_pdf_id` FOREIGN KEY (`pdf_id`) REFERENCES `core_media` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_topic_video_id` FOREIGN KEY (`video_id`) REFERENCES `core_media` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_videos` */

DROP TABLE IF EXISTS `user_catalog_videos`;

CREATE TABLE `user_catalog_videos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `catalog_id` int(10) unsigned NOT NULL,
  `link` varchar(180) NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`catalog_id`),
  CONSTRAINT `fk-user_catalog_videos_catalog_id` FOREIGN KEY (`catalog_id`) REFERENCES `user_catalog` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_weight` */

DROP TABLE IF EXISTS `user_catalog_weight`;

CREATE TABLE `user_catalog_weight` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(64) DEFAULT NULL,
  `unit` varchar(4) DEFAULT NULL,
  `value` decimal(15,8) NOT NULL DEFAULT 0.00000000,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_catalog_wishlist` */

DROP TABLE IF EXISTS `user_catalog_wishlist`;

CREATE TABLE `user_catalog_wishlist` (
  `user_id` int(10) unsigned NOT NULL,
  `catalog_id` int(10) unsigned NOT NULL,
  `tag` varchar(32) DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`catalog_id`),
  UNIQUE KEY `user_id` (`user_id`,`catalog_id`,`tag`),
  KEY `catalog_id` (`catalog_id`),
  CONSTRAINT `fk-user_catalog_wishlist_catalog_id` FOREIGN KEY (`catalog_id`) REFERENCES `user_catalog` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_catalog_wishlist_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_comment` */

DROP TABLE IF EXISTS `user_comment`;

CREATE TABLE `user_comment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `order_id` int(10) unsigned DEFAULT NULL,
  `order_item_id` int(10) unsigned DEFAULT NULL,
  `catalog_id` int(10) unsigned DEFAULT NULL COMMENT 'order item id',
  `module` varchar(120) DEFAULT NULL,
  `review_by` int(10) unsigned NOT NULL,
  `review_to` int(10) unsigned NOT NULL,
  `title` varchar(250) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `rating` decimal(5,2) DEFAULT 0.00 COMMENT 'Avg. Rating',
  `status` tinyint(3) unsigned NOT NULL COMMENT '1 => Not Approved, 2 => Approved',
  `is_abuse` tinyint(3) unsigned DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `review_by` (`review_by`),
  KEY `catalog_id` (`catalog_id`),
  KEY `review_to` (`review_to`),
  KEY `order_id` (`order_id`),
  KEY `parent_id` (`parent_id`),
  KEY `user_comment_order_item_id` (`order_item_id`),
  CONSTRAINT `fk-user_comment_catalog_id` FOREIGN KEY (`catalog_id`) REFERENCES `user_catalog` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_comment_order_id` FOREIGN KEY (`order_id`) REFERENCES `user_catalog_orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_comment_order_item_id` FOREIGN KEY (`order_item_id`) REFERENCES `user_catalog_orders_item` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_comment_parent_id` FOREIGN KEY (`parent_id`) REFERENCES `user_comment` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_comment_review_by` FOREIGN KEY (`review_by`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_comment_review_to` FOREIGN KEY (`review_to`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_comment_item` */

DROP TABLE IF EXISTS `user_comment_item`;

CREATE TABLE `user_comment_item` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `comment_id` int(10) unsigned NOT NULL,
  `characteristics` varchar(32) NOT NULL,
  `rating` decimal(5,2) DEFAULT 0.00 COMMENT 'Avg. Rating',
  `status` tinyint(3) unsigned NOT NULL COMMENT '1 => Not Approved, 2 => Approved',
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`comment_id`),
  CONSTRAINT `fk-user_comment_item_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `user_comment` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_education` */

DROP TABLE IF EXISTS `user_education`;

CREATE TABLE `user_education` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `institute` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `contact_email` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL COMMENT 'must be corporate, no gmail',
  `from` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `to` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `is_present` tinyint(1) DEFAULT NULL COMMENT '0 - no, 1 - yes',
  `title` varchar(250) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `file_id` int(10) unsigned DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `file_id` (`file_id`),
  CONSTRAINT `fk-user_education_file_id` FOREIGN KEY (`file_id`) REFERENCES `core_media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_education_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_experience` */

DROP TABLE IF EXISTS `user_experience`;

CREATE TABLE `user_experience` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `industry_name` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `contact_email` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL COMMENT 'must be corporate, no gmail',
  `from` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `to` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `is_present` tinyint(1) DEFAULT NULL COMMENT '0 - no 1 - yes',
  `title` varchar(250) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `file_id` int(10) unsigned DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `file_id` (`file_id`),
  CONSTRAINT `fk-user_experience_file_id` FOREIGN KEY (`file_id`) REFERENCES `core_media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_experience_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_favorite` */

DROP TABLE IF EXISTS `user_favorite`;

CREATE TABLE `user_favorite` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `favorite_id` int(10) unsigned NOT NULL,
  `moduleId` varchar(120) NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`favorite_id`,`moduleId`),
  CONSTRAINT `fk-user_favorite_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_fcm_token` */

DROP TABLE IF EXISTS `user_fcm_token`;

CREATE TABLE `user_fcm_token` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `app` varchar(8) DEFAULT NULL,
  `os` varchar(15) DEFAULT NULL,
  `token` text NOT NULL,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fk-user_fcm_token_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_followers` */

DROP TABLE IF EXISTS `user_followers`;

CREATE TABLE `user_followers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `following_id` int(10) unsigned NOT NULL COMMENT 'user_id',
  `follower_id` int(10) unsigned NOT NULL COMMENT 'user follower id',
  `status` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '0 - pending, 1 - confirmed, 2 - rejected, 3 - blocked, 4 - unfriend',
  `created_at` int(10) unsigned DEFAULT NULL,
  `updated_at` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_idx` (`follower_id`,`following_id`),
  KEY `follower_idx` (`follower_id`),
  KEY `following_idx` (`following_id`),
  CONSTRAINT `fk-user_followers-follower_id` FOREIGN KEY (`follower_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk-user_followers-following_id` FOREIGN KEY (`following_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43053 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

/*Table structure for table `user_holidays` */

DROP TABLE IF EXISTS `user_holidays`;

CREATE TABLE `user_holidays` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `start_time` int(10) unsigned NOT NULL,
  `end_time` int(10) unsigned NOT NULL,
  `status` tinyint(3) unsigned NOT NULL DEFAULT 1,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_location` */

DROP TABLE IF EXISTS `user_location`;

CREATE TABLE `user_location` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `name` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `email` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL COMMENT 'must be corporate, no gmail',
  `telephone` varchar(32) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `apt_number` varchar(5) DEFAULT NULL,
  `address_line_1` varchar(120) DEFAULT NULL,
  `address_line_2` varchar(120) DEFAULT NULL,
  `city` varchar(120) DEFAULT NULL,
  `location` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `map_url` varchar(250) DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `state_code` varchar(3) DEFAULT NULL,
  `zip5` varchar(10) DEFAULT NULL,
  `zip4` varchar(10) DEFAULT NULL,
  `country_code` varchar(3) DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fk-user_location_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_login_attempt` */

DROP TABLE IF EXISTS `user_login_attempt`;

CREATE TABLE `user_login_attempt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `amount` int(11) DEFAULT 1,
  `reset_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  `created_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_login_attempt_key_index` (`key`),
  KEY `user_login_attempt_amount_index` (`amount`),
  KEY `user_login_attempt_reset_at_index` (`reset_at`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_message` */

DROP TABLE IF EXISTS `user_message`;

CREATE TABLE `user_message` (
  `message_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `identifier` varchar(60) NOT NULL,
  `sender_id` int(10) unsigned NOT NULL,
  `text` text DEFAULT NULL,
  `status` enum('Read','UnRead','Deleted','Span','Archived') NOT NULL DEFAULT 'Read',
  `notification_id` int(10) unsigned DEFAULT NULL,
  `is_system` tinyint(3) unsigned DEFAULT NULL,
  `created_at` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`message_id`,`created_at`),
  KEY `sender_id` (`sender_id`),
  KEY `user_notification_idx` (`notification_id`),
  CONSTRAINT `fk-user_message_notification_id` FOREIGN KEY (`notification_id`) REFERENCES `core_notification` (`message_id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_message_sender_id` FOREIGN KEY (`sender_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_message_attachments` */

DROP TABLE IF EXISTS `user_message_attachments`;

CREATE TABLE `user_message_attachments` (
  `attachment_id` int(10) unsigned NOT NULL,
  `message_id` int(10) unsigned NOT NULL,
  `created_at` bigint(20) unsigned NOT NULL,
  `sender_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`attachment_id`,`message_id`,`created_at`),
  KEY `message_id` (`message_id`),
  KEY `sender_id` (`sender_id`),
  KEY `attachment_id` (`attachment_id`),
  KEY `seq` (`created_at`),
  CONSTRAINT `fk-user_message_attachments_attachment_id` FOREIGN KEY (`attachment_id`) REFERENCES `core_media` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_message_attachments_message_id` FOREIGN KEY (`message_id`) REFERENCES `user_message` (`message_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_message_attachments_sender_id` FOREIGN KEY (`sender_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_message_group` */

DROP TABLE IF EXISTS `user_message_group`;

CREATE TABLE `user_message_group` (
  `message_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `title` varchar(250) NOT NULL,
  `image_id` int(10) unsigned NOT NULL,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  KEY `message_id` (`message_id`),
  KEY `title` (`title`),
  KEY `image_id` (`image_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fk-user_message_group_image_id` FOREIGN KEY (`image_id`) REFERENCES `core_media` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_message_group_message_id` FOREIGN KEY (`message_id`) REFERENCES `user_message` (`message_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_message_group_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_message_group_recipients` */

DROP TABLE IF EXISTS `user_message_group_recipients`;

CREATE TABLE `user_message_group_recipients` (
  `message_id` int(10) unsigned NOT NULL,
  `recipient_id` int(10) unsigned NOT NULL,
  `status` tinyint(4) NOT NULL COMMENT '1 - Active',
  PRIMARY KEY (`message_id`,`recipient_id`),
  KEY `recipient_id` (`recipient_id`),
  KEY `conversation_id` (`message_id`),
  CONSTRAINT `fk-user_message_group_recipients_message_id` FOREIGN KEY (`message_id`) REFERENCES `user_message_group` (`message_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk-user_message_group_recipients_recipient_id` FOREIGN KEY (`recipient_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_message_info` */

DROP TABLE IF EXISTS `user_message_info`;

CREATE TABLE `user_message_info` (
  `message_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sender_id` int(10) unsigned NOT NULL,
  `subject` varchar(200) NOT NULL,
  `status` varchar(40) NOT NULL DEFAULT 'Open',
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  KEY `sender_id` (`sender_id`),
  CONSTRAINT `fk-user_message_info_message_id` FOREIGN KEY (`message_id`) REFERENCES `user_message` (`message_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_message_info_sender_id` FOREIGN KEY (`sender_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_message_item` */

DROP TABLE IF EXISTS `user_message_item`;

CREATE TABLE `user_message_item` (
  `message_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `item_id` int(10) unsigned NOT NULL,
  `module` varchar(100) NOT NULL COMMENT '1 - Item',
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  CONSTRAINT `fk-user_message_item_message_id` FOREIGN KEY (`message_id`) REFERENCES `user_message` (`message_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_message_recipients` */

DROP TABLE IF EXISTS `user_message_recipients`;

CREATE TABLE `user_message_recipients` (
  `message_id` int(10) unsigned NOT NULL,
  `created_at` bigint(20) unsigned NOT NULL,
  `recipient_id` int(10) unsigned NOT NULL,
  `status` enum('Read','UnRead','Deleted') NOT NULL DEFAULT 'UnRead',
  `time` int(11) DEFAULT NULL,
  PRIMARY KEY (`message_id`,`created_at`,`recipient_id`),
  KEY `recipient_id` (`recipient_id`),
  KEY `conversation_id` (`message_id`),
  CONSTRAINT `fk-user_message_recipients_message_id` FOREIGN KEY (`message_id`) REFERENCES `user_message` (`message_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk-user_message_recipients_recipient_id` FOREIGN KEY (`recipient_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_packages` */

DROP TABLE IF EXISTS `user_packages`;

CREATE TABLE `user_packages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `amount` decimal(10,2) unsigned DEFAULT NULL,
  `type` enum('User','Provider') DEFAULT 'Provider',
  `sub_type` enum('single','basic','bronze','bronze-plus','gold','gold-plus','platinum') DEFAULT 'basic',
  `allotted` tinyint(4) DEFAULT NULL,
  `duration` tinyint(4) DEFAULT NULL COMMENT 'in minutes',
  `per_uses` int(10) unsigned DEFAULT 1,
  `status` tinyint(3) unsigned DEFAULT NULL COMMENT '0 - not-active, 1 - active',
  `order_by` int(10) unsigned DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_packages_credit` */

DROP TABLE IF EXISTS `user_packages_credit`;

CREATE TABLE `user_packages_credit` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `package_id` int(10) unsigned NOT NULL,
  `provider_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `sessions` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `package_id` (`package_id`),
  KEY `user_id` (`user_id`),
  KEY `number_of_session` (`sessions`),
  KEY `provider_id` (`provider_id`),
  CONSTRAINT `fk-user_packages_credit_package_id` FOREIGN KEY (`package_id`) REFERENCES `user_packages` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_packages_credit_provider_id` FOREIGN KEY (`provider_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_packages_credit_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_password` */

DROP TABLE IF EXISTS `user_password`;

CREATE TABLE `user_password` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx-user_password-user_id` (`user_id`),
  CONSTRAINT `fk-fk-user_password-user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_profile` */

DROP TABLE IF EXISTS `user_profile`;

CREATE TABLE `user_profile` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `plan_id` int(10) unsigned DEFAULT NULL,
  `subscription_id` varchar(64) DEFAULT NULL,
  `avatar_id` int(10) unsigned DEFAULT NULL,
  `banner_id` int(10) unsigned DEFAULT NULL,
  `zoom_id` varchar(64) DEFAULT NULL,
  `document_id` int(10) unsigned DEFAULT NULL,
  `title` varchar(250) DEFAULT NULL COMMENT 'eg. Php developer, frontend developer etc.',
  `name` varchar(250) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `location_id` int(10) unsigned DEFAULT NULL,
  `gender` enum('None','Male','Female') NOT NULL DEFAULT 'None',
  `date_of_birth` int(10) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `telephone` varchar(32) DEFAULT NULL,
  `about` text DEFAULT NULL,
  `company_name` varchar(120) DEFAULT NULL,
  `industry` varchar(120) DEFAULT NULL,
  `organization_size` varchar(120) DEFAULT NULL,
  `specialties` text DEFAULT NULL,
  `website` varchar(250) DEFAULT NULL,
  `timezone` varchar(128) DEFAULT NULL,
  `token` varchar(120) DEFAULT NULL,
  `otp` varchar(32) DEFAULT NULL,
  `tags` varchar(200) DEFAULT NULL,
  `ref_number` varchar(32) DEFAULT NULL,
  `ref_by` varchar(32) DEFAULT NULL,
  `affiliate_code` varchar(64) DEFAULT NULL,
  `affiliate_link` varchar(256) DEFAULT NULL,
  `is_owner` tinyint(3) unsigned DEFAULT NULL,
  `is_availability` tinyint(3) unsigned DEFAULT 0,
  `is_verified` tinyint(3) unsigned DEFAULT 0 COMMENT '0 - Unverified, 1 - PENDING,  2 - VERIFIED,  3 - INSUFFICIENT, 4 - SUBMIT_FOR_VERIFIED',
  `is_featured` tinyint(3) unsigned DEFAULT 0 COMMENT '1 - Request, 2 - Approved free,  3 - Approved',
  `is_disabled` tinyint(3) unsigned DEFAULT 0,
  `ip_address` varchar(32) DEFAULT NULL,
  `is_online` tinyint(4) DEFAULT NULL COMMENT '0 - no, 1 - yes',
  `is_promotional` tinyint(4) DEFAULT NULL,
  `notifications` int(11) DEFAULT 0,
  `messages` int(10) unsigned DEFAULT 0,
  `transaction_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `avatar_id` (`avatar_id`),
  KEY `plan_id` (`plan_id`),
  KEY `first_name` (`first_name`),
  KEY `last_name` (`last_name`),
  KEY `parent_id` (`parent_id`),
  KEY `transaction_id` (`transaction_id`),
  KEY `cover_id` (`banner_id`),
  KEY `location_id` (`location_id`),
  KEY `document_id` (`document_id`),
  CONSTRAINT `fk-user_profile_avatar_id` FOREIGN KEY (`avatar_id`) REFERENCES `core_media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_profile_banner_id` FOREIGN KEY (`banner_id`) REFERENCES `core_media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_profile_document_id` FOREIGN KEY (`document_id`) REFERENCES `core_media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_profile_location_id` FOREIGN KEY (`location_id`) REFERENCES `user_location` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_profile_parent_id` FOREIGN KEY (`parent_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_profile_plan_id` FOREIGN KEY (`plan_id`) REFERENCES `core_plan` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_profile_transaction_id` FOREIGN KEY (`transaction_id`) REFERENCES `user_transaction` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_profile_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1753 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_profile_cards` */

DROP TABLE IF EXISTS `user_profile_cards`;

CREATE TABLE `user_profile_cards` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `customer_id` varchar(32) NOT NULL,
  `source` varchar(32) NOT NULL,
  `email` varchar(120) NOT NULL,
  `status` tinyint(3) unsigned NOT NULL DEFAULT 1 COMMENT '1 - active, 0 -',
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `email` (`email`),
  CONSTRAINT `fk-user_profile_cards_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_profile_category` */

DROP TABLE IF EXISTS `user_profile_category`;

CREATE TABLE `user_profile_category` (
  `user_id` int(10) unsigned NOT NULL,
  `category_id` int(10) unsigned NOT NULL,
  `name` varchar(150) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `fk-user_profile_category_category_id` FOREIGN KEY (`category_id`) REFERENCES `user_catalog_category` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_profile_category_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_profile_coupon` */

DROP TABLE IF EXISTS `user_profile_coupon`;

CREATE TABLE `user_profile_coupon` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `coupon_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `catalogs` varchar(255) DEFAULT NULL,
  `name` varchar(128) NOT NULL,
  `description` text DEFAULT NULL,
  `code` varchar(20) NOT NULL,
  `type` enum('fixed','percentage','ticket') NOT NULL DEFAULT 'fixed',
  `discount` decimal(15,4) NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `uses_points` int(10) unsigned DEFAULT NULL,
  `uses_total` int(10) unsigned NOT NULL,
  `uses_per_user` int(10) unsigned NOT NULL,
  `is_platform` tinyint(1) unsigned DEFAULT 0,
  `status` tinyint(3) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `user_id` (`user_id`),
  KEY `user_profile_coupon_coupon_id` (`coupon_id`),
  CONSTRAINT `user_profile_coupon_coupon_id` FOREIGN KEY (`coupon_id`) REFERENCES `user_catalog_coupon` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_profile_coupon_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_profile_credit` */

DROP TABLE IF EXISTS `user_profile_credit`;

CREATE TABLE `user_profile_credit` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `type` enum('credit','debit') DEFAULT 'credit',
  `points` int(10) unsigned NOT NULL,
  `amount` decimal(10,2) unsigned DEFAULT NULL,
  `note` varchar(250) DEFAULT NULL,
  `item_id` int(10) unsigned DEFAULT NULL,
  `moduleId` varchar(120) DEFAULT NULL,
  `transaction_id` int(10) unsigned DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `transaction_id` (`transaction_id`),
  CONSTRAINT `fk-user_profile_credit_transaction_id` FOREIGN KEY (`transaction_id`) REFERENCES `user_transaction` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_profile_credit_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_profile_field_value` */

DROP TABLE IF EXISTS `user_profile_field_value`;

CREATE TABLE `user_profile_field_value` (
  `item_id` int(10) unsigned NOT NULL,
  `field_id` int(10) unsigned NOT NULL,
  `value` varchar(250) NOT NULL,
  `field_name` varchar(64) NOT NULL,
  PRIMARY KEY (`item_id`,`field_id`,`value`),
  KEY `field_id` (`field_id`),
  KEY `value` (`value`),
  CONSTRAINT `fk-user_profile_field_value_field_id` FOREIGN KEY (`field_id`) REFERENCES `core_field` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk-user_profile_field_value_item_id` FOREIGN KEY (`item_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_profile_meeting` */

DROP TABLE IF EXISTS `user_profile_meeting`;

CREATE TABLE `user_profile_meeting` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `order_id` int(10) unsigned NOT NULL,
  `title` varchar(250) DEFAULT NULL,
  `slot` int(10) unsigned DEFAULT NULL,
  `extra` text DEFAULT NULL,
  `start_time` int(10) unsigned DEFAULT NULL,
  `end_time` int(10) unsigned DEFAULT NULL,
  `comment` varchar(250) DEFAULT NULL,
  `is_opened` tinyint(3) unsigned DEFAULT 0 COMMENT '0 - No, 1 - Yes',
  `action_by` int(10) unsigned DEFAULT NULL,
  `action` tinyint(3) unsigned DEFAULT 0 COMMENT '0 - None, 1- Refunded/Return, 2 - Credit Issued, 3 - Replacement Sent',
  `reason` tinyint(3) unsigned DEFAULT 0 COMMENT '0 - None,1- Dead On Arrival, 2 - Received Wrong Item, 3 - Order Error, 4 -Faulty:please supply details, 5 - Other: please supply details',
  `status` tinyint(3) unsigned NOT NULL COMMENT '1 - Active, 2 - Pending, 3 - Complete, 4 - Awaiting',
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_id` (`order_id`),
  KEY `slot_id` (`slot`),
  KEY `action_by` (`action_by`),
  KEY `action` (`action`),
  KEY `reason` (`reason`),
  KEY `status` (`status`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fk-user_profile_meeting_action_by` FOREIGN KEY (`action_by`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_profile_meeting_order_id` FOREIGN KEY (`order_id`) REFERENCES `user_catalog_orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_profile_meeting_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='bidding/hireing process';

/*Table structure for table `user_profile_packages` */

DROP TABLE IF EXISTS `user_profile_packages`;

CREATE TABLE `user_profile_packages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `package_id` int(10) unsigned NOT NULL,
  `coupon_id` int(10) unsigned DEFAULT NULL,
  `amount` decimal(10,2) unsigned NOT NULL,
  `used` int(11) DEFAULT NULL,
  `balance` int(11) DEFAULT NULL,
  `per_uses` int(10) unsigned DEFAULT 1,
  `status` tinyint(3) unsigned DEFAULT NULL COMMENT '0 - pending, 1 - confirmed',
  `transaction_id` int(10) unsigned DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`,`package_id`),
  KEY `package_id` (`package_id`),
  KEY `transaction_id` (`transaction_id`),
  KEY `coupon_id` (`coupon_id`),
  CONSTRAINT `fk-user_profile_packages_coupon_id` FOREIGN KEY (`coupon_id`) REFERENCES `user_catalog_coupon` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk-user_profile_packages_package_id` FOREIGN KEY (`package_id`) REFERENCES `user_packages` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_profile_packages_transaction_id` FOREIGN KEY (`transaction_id`) REFERENCES `user_transaction` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_profile_packages_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_profile_reaction` */

DROP TABLE IF EXISTS `user_profile_reaction`;

CREATE TABLE `user_profile_reaction` (
  `user_id` int(10) unsigned NOT NULL,
  `reaction_id` int(10) unsigned NOT NULL,
  `item_id` int(10) unsigned NOT NULL,
  `module` varchar(120) DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`reaction_id`,`item_id`),
  KEY `reaction_id` (`reaction_id`),
  KEY `item_module` (`item_id`),
  CONSTRAINT `fk-user_profile_reaction_reaction_id` FOREIGN KEY (`reaction_id`) REFERENCES `core_reaction` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_profile_reaction_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_profile_reference` */

DROP TABLE IF EXISTS `user_profile_reference`;

CREATE TABLE `user_profile_reference` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `register_id` int(10) unsigned DEFAULT NULL,
  `location_id` int(10) unsigned DEFAULT NULL,
  `relation` varchar(32) DEFAULT NULL,
  `name` varchar(128) NOT NULL,
  `email` varchar(64) NOT NULL,
  `gender` enum('Male','Female','None') DEFAULT 'None',
  `date_of_birth` int(10) unsigned DEFAULT NULL,
  `telephone` varchar(32) NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `location_id` (`location_id`),
  KEY `user_id_2` (`user_id`),
  KEY `register_id` (`register_id`),
  CONSTRAINT `fk-user_profile_reference_location_id` FOREIGN KEY (`location_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_profile_reference_register_id` FOREIGN KEY (`register_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_profile_reference_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_refer` */

DROP TABLE IF EXISTS `user_refer`;

CREATE TABLE `user_refer` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `ref_id` int(10) unsigned DEFAULT NULL,
  `ref_by` varchar(16) NOT NULL,
  `ref_name` varchar(120) DEFAULT NULL,
  `ref_email` varchar(120) NOT NULL,
  `is_registered` tinyint(3) unsigned DEFAULT NULL COMMENT '1 - Yes, 0 - No',
  `comment` varchar(255) DEFAULT NULL,
  `is_credited` int(10) unsigned DEFAULT 0 COMMENT '1- yes, 0 - no',
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`ref_email`),
  KEY `ref_id` (`ref_id`),
  KEY `ref_number` (`ref_by`),
  CONSTRAINT `fk-user_refer_location_id` FOREIGN KEY (`ref_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_refer_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_search` */

DROP TABLE IF EXISTS `user_search`;

CREATE TABLE `user_search` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `url` varchar(250) NOT NULL,
  `q_param` varchar(250) DEFAULT NULL,
  `params` varchar(250) DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fk_user_search_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_setting` */

DROP TABLE IF EXISTS `user_setting`;

CREATE TABLE `user_setting` (
  `user_id` int(10) unsigned NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` text NOT NULL,
  `description` text DEFAULT NULL,
  `status` smallint(6) NOT NULL DEFAULT 1,
  `order_by` int(10) unsigned DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`key`),
  KEY `key` (`key`),
  CONSTRAINT `fk-user_setting_register_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_subscription` */

DROP TABLE IF EXISTS `user_subscription`;

CREATE TABLE `user_subscription` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `item_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `price` decimal(10,0) unsigned NOT NULL,
  `start_time` int(10) unsigned DEFAULT NULL,
  `end_time` int(10) unsigned DEFAULT NULL,
  `transaction_id` int(10) unsigned DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `transaction_id` (`transaction_id`),
  KEY `user_id` (`user_id`),
  KEY `user_subscription_item_id` (`item_id`),
  CONSTRAINT `fk-user_subscription_item_id` FOREIGN KEY (`item_id`) REFERENCES `user_catalog` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_subscription_transaction_id` FOREIGN KEY (`transaction_id`) REFERENCES `user_transaction` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-user_subscription_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_transaction` */

DROP TABLE IF EXISTS `user_transaction`;

CREATE TABLE `user_transaction` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `plan_id` int(10) unsigned DEFAULT NULL,
  `agreement_id` varchar(64) DEFAULT NULL,
  `auth_code` varchar(25) DEFAULT NULL,
  `item_id` int(10) unsigned NOT NULL,
  `module` varchar(120) NOT NULL,
  `amount` double(10,2) unsigned NOT NULL,
  `credit` varchar(20) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `method` enum('paypal','credit_card','authorizenet') DEFAULT 'credit_card',
  `response_code` varchar(25) DEFAULT NULL,
  `request_data` text DEFAULT NULL,
  `response_data` text DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL COMMENT 'payment_status',
  `start_date` varchar(64) DEFAULT NULL,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `plan_id` (`plan_id`),
  KEY `agreement_id` (`agreement_id`),
  CONSTRAINT `fk-user_transaction_plan_id` FOREIGN KEY (`plan_id`) REFERENCES `core_plan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk-user_transaction_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_transaction_recipients` */

DROP TABLE IF EXISTS `user_transaction_recipients`;

CREATE TABLE `user_transaction_recipients` (
  `transaction_id` int(10) unsigned NOT NULL,
  `recipient_id` int(10) unsigned NOT NULL,
  `status` enum('Read','UnRead','Deleted','Activities') NOT NULL DEFAULT 'UnRead',
  PRIMARY KEY (`transaction_id`,`recipient_id`),
  KEY `recipient_id` (`recipient_id`),
  KEY `message_id` (`transaction_id`),
  CONSTRAINT `fk-user_transaction_recipients_recipient_id` FOREIGN KEY (`recipient_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk-user_transaction_recipients_transaction_id` FOREIGN KEY (`transaction_id`) REFERENCES `user_transaction` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_transaction_response` */

DROP TABLE IF EXISTS `user_transaction_response`;

CREATE TABLE `user_transaction_response` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `transaction_id` int(10) unsigned NOT NULL,
  `request_data` text DEFAULT NULL,
  `response_data` text DEFAULT NULL,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `transaction_id` (`transaction_id`),
  CONSTRAINT `fk-user_transaction_response_transaction_id` FOREIGN KEY (`transaction_id`) REFERENCES `user_transaction` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Table structure for table `user_zipcode` */

DROP TABLE IF EXISTS `user_zipcode`;

CREATE TABLE `user_zipcode` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `zipcode` varchar(20) NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`zipcode`),
  KEY `zipcode` (`zipcode`),
  CONSTRAINT `fk-user_zipcode_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
