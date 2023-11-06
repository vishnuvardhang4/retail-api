/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: images
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vid` int NOT NULL,
  `path` varchar(255) NOT NULL,
  `order` int NOT NULL,
  `alt` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_idx` (`order`, `vid`),
  KEY `fk_vid` (`vid`),
  CONSTRAINT `fk_vid` FOREIGN KEY (`vid`) REFERENCES `variants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 14 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'images for the product variants';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: products
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name_idx` (`name`)
) ENGINE = InnoDB AUTO_INCREMENT = 27 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = COMPRESSED COMMENT = 'Details of products which are available for our store.';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: users
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `session` enum('Active', 'InActive') NOT NULL DEFAULT 'InActive',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: variants
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `variants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pid` int DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL,
  `brand` varchar(45) DEFAULT NULL,
  `material` varchar(45) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_variant` (
  `pid`,
  `capacity`,
  `brand`,
  `material`,
  `color`,
  `type`,
  `price`
  ),
  KEY `fk_pid_idx` (`pid`)
  /*!80000 INVISIBLE */,
  KEY `capacity_idx` (`capacity`)
  /*!80000 INVISIBLE */,
  KEY `brand_idx` (`brand`)
  /*!80000 INVISIBLE */,
  KEY `color_idx` (`color`)
  /*!80000 INVISIBLE */,
  KEY `material_idx` (`material`),
  KEY `type_idx` (`type`)
  /*!80000 INVISIBLE */,
  CONSTRAINT `fk_pid` FOREIGN KEY (`pid`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 28 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'variant details for a respective products';

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: images
# ------------------------------------------------------------

INSERT INTO
  `images` (`id`, `vid`, `path`, `order`, `alt`)
VALUES
  (1, 17, 'vishnu', 1, '');
INSERT INTO
  `images` (`id`, `vid`, `path`, `order`, `alt`)
VALUES
  (2, 17, 'new', 2, '');
INSERT INTO
  `images` (`id`, `vid`, `path`, `order`, `alt`)
VALUES
  (3, 18, 'ksdkd', 1, '3');
INSERT INTO
  `images` (`id`, `vid`, `path`, `order`, `alt`)
VALUES
  (6, 18, 'vishnu', 2, 'vishnu');
INSERT INTO
  `images` (`id`, `vid`, `path`, `order`, `alt`)
VALUES
  (
    7,
    1,
    'D:\\projects\\retail-domain\\storage\\e1eb0c3d-e3f6-44ed-b58e-14ab2637cb5a.png',
    4,
    'alt'
  );
INSERT INTO
  `images` (`id`, `vid`, `path`, `order`, `alt`)
VALUES
  (
    9,
    1,
    'D:projects\retail-domainstorage5ae220d4-561d-4418-b50d-6c850b3c2797.png',
    5,
    'alt'
  );
INSERT INTO
  `images` (`id`, `vid`, `path`, `order`, `alt`)
VALUES
  (
    12,
    1,
    'D:projects\retail-domainstoragecbb32272-e782-4eec-8d13-5db377f7b328.png',
    6,
    'alt'
  );
INSERT INTO
  `images` (`id`, `vid`, `path`, `order`, `alt`)
VALUES
  (
    13,
    1,
    'D:projects\retail-domainstorage9c06d7aa-fcba-459a-8dc8-25ec82214836.png',
    0,
    'alt'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: products
# ------------------------------------------------------------

INSERT INTO
  `products` (`id`, `name`)
VALUES
  (7, 'computer');
INSERT INTO
  `products` (`id`, `name`)
VALUES
  (2, 'mobile');
INSERT INTO
  `products` (`id`, `name`)
VALUES
  (11, 'mobile1');
INSERT INTO
  `products` (`id`, `name`)
VALUES
  (26, 'mobile2');
INSERT INTO
  `products` (`id`, `name`)
VALUES
  (1, 'pendrive');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users
# ------------------------------------------------------------

INSERT INTO
  `users` (`id`, `username`, `password`, `session`)
VALUES
  (1, 'vishnu', '123', 'Active');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: variants
# ------------------------------------------------------------

INSERT INTO
  `variants` (
    `id`,
    `pid`,
    `capacity`,
    `unit`,
    `brand`,
    `material`,
    `color`,
    `price`,
    `description`,
    `type`
  )
VALUES
  (
    1,
    1,
    8,
    'gb',
    'Sony',
    'steel',
    'silver',
    230,
    '8GB pendrive for store/backup data',
    '2.0'
  );
INSERT INTO
  `variants` (
    `id`,
    `pid`,
    `capacity`,
    `unit`,
    `brand`,
    `material`,
    `color`,
    `price`,
    `description`,
    `type`
  )
VALUES
  (
    17,
    1,
    12,
    'gb',
    'Sony',
    'steel',
    'black',
    220,
    '8GB pendrive for store/backup data',
    '2.1'
  );
INSERT INTO
  `variants` (
    `id`,
    `pid`,
    `capacity`,
    `unit`,
    `brand`,
    `material`,
    `color`,
    `price`,
    `description`,
    `type`
  )
VALUES
  (
    18,
    1,
    16,
    'gb',
    'Sony',
    'stel',
    'blue',
    320,
    '16GB pendrive for store/backup data',
    '3.0'
  );
INSERT INTO
  `variants` (
    `id`,
    `pid`,
    `capacity`,
    `unit`,
    `brand`,
    `material`,
    `color`,
    `price`,
    `description`,
    `type`
  )
VALUES
  (
    20,
    7,
    128,
    'gb',
    'samsung',
    'glass',
    'red',
    35000,
    'sd870 mobile',
    'android'
  );
INSERT INTO
  `variants` (
    `id`,
    `pid`,
    `capacity`,
    `unit`,
    `brand`,
    `material`,
    `color`,
    `price`,
    `description`,
    `type`
  )
VALUES
  (
    21,
    11,
    128,
    'gb',
    'samsung',
    'glass',
    'red',
    35000,
    'sd870 mobile',
    'android'
  );
INSERT INTO
  `variants` (
    `id`,
    `pid`,
    `capacity`,
    `unit`,
    `brand`,
    `material`,
    `color`,
    `price`,
    `description`,
    `type`
  )
VALUES
  (
    22,
    26,
    128,
    'gb',
    'samsung',
    'glass',
    'red',
    35000,
    'sd870 mobile',
    'android'
  );
INSERT INTO
  `variants` (
    `id`,
    `pid`,
    `capacity`,
    `unit`,
    `brand`,
    `material`,
    `color`,
    `price`,
    `description`,
    `type`
  )
VALUES
  (
    24,
    26,
    128,
    'gb',
    'samsung',
    'glass',
    'red',
    35200,
    'sd870 mobile',
    'android'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
