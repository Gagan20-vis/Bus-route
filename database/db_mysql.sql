CREATE DATABASE `bus` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE
    `auth_admin` (
        `erp_id` bigint NOT NULL,
        `email` varchar(50) DEFAULT NULL,
        `mobile` bigint DEFAULT NULL,
        PRIMARY KEY (`erp_id`),
        UNIQUE KEY `email_UNIQUE` (`email`),
        UNIQUE KEY `mobile_UNIQUE` (`mobile`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
    `admin_login` (
        `id` int NOT NULL AUTO_INCREMENT,
        `erp` bigint NOT NULL,
        `email` varchar(50) DEFAULT NULL,
        `user_pass` varchar(100) NOT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `erp_UNIQUE` (`erp`),
        UNIQUE KEY `email_UNIQUE` (`email`),
        CONSTRAINT `admin_login_ibfk_1` FOREIGN KEY (`erp`) REFERENCES `auth_admin` (`erp_id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
    `bus` (
        `number` varchar(10) NOT NULL, 
        PRIMARY KEY (`number`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
    `stop` (
        `add_name` varchar(100) NOT NULL,
        `route_no` int NOT NULL,
        PRIMARY KEY (`add_name`),
        KEY `route_no_idx` (`route_no`) /*!80000 INVISIBLE */
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
    `shift_1` (
        `id` int NOT NULL AUTO_INCREMENT,
        `route_no` int NOT NULL,
        `address` varchar(100) DEFAULT NULL,
        `bus_no` varchar(10) DEFAULT NULL,
        PRIMARY KEY (`id`),
        KEY `address_idx` (`address`),
        KEY `route_no_idx` (`route_no`),
        KEY `bus_no_idx` (`bus_no`),
        CONSTRAINT `address` FOREIGN KEY (`address`) REFERENCES `stop` (`add_name`),
        CONSTRAINT `bus_no` FOREIGN KEY (`bus_no`) REFERENCES `bus` (`number`),
        CONSTRAINT `shift_1_ibfk_1` FOREIGN KEY (`route_no`) REFERENCES `stop` (`route_no`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1166 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
    `shift_2` (
        `id` int NOT NULL AUTO_INCREMENT,
        `address` varchar(100) DEFAULT NULL,
        `route_no` int DEFAULT NULL,
        `bus_no` varchar(10) DEFAULT NULL,
        PRIMARY KEY (`id`),
        KEY `address_idx` (`address`),
        KEY `route_no_idx` (`route_no`),
        KEY `bus_no` (`bus_no`),
        CONSTRAINT `shift_2_ibfk_1` FOREIGN KEY (`address`) REFERENCES `stop` (`add_name`),
        CONSTRAINT `shift_2_ibfk_3` FOREIGN KEY (`bus_no`) REFERENCES `bus` (`number`),
        CONSTRAINT `shift_2_ibfk_4` FOREIGN KEY (`route_no`) REFERENCES `stop` (`route_no`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;