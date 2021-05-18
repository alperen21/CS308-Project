-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost
-- Üretim Zamanı: 18 May 2021, 08:33:37
-- Sunucu sürümü: 8.0.13-4
-- PHP Sürümü: 7.2.24-0ubuntu0.18.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `Ew8ozZEqfF`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `BASKET`
--

CREATE TABLE `BASKET` (
  `cost` float DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `basket_id` int(11) NOT NULL,
  `product_name` varchar(40) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `BASKET`
--

INSERT INTO `BASKET` (`cost`, `quantity`, `basket_id`, `product_name`, `product_id`, `customer_id`) VALUES
(15, 1, 288, 'Guatemala Espresso', 3, 68),
(15, 1, 388, 'Kenya Espresso', 2, 4),
(15, 1, 389, 'Guatemala Espresso', 3, 4),
(15, 1, 390, 'Double Roasted Turkish Coffee 150g', 4, 4),
(18, 1, 391, 'Double Roasted Turkish Coffee 250g', 5, 4),
(19, 2, 392, 'Vanilla Flavoured Filter Coffee', 8, 4),
(19, 2, 393, 'Caramel Flavoured Filter Coffee', 9, 4),
(149, 1, 394, 'Filter Coffee Machine', 13, 4),
(119, 1, 395, 'Turkish Coffee Machine', 15, 4),
(15, 3, 407, 'Kenya Espresso', 2, -1),
(15, 1, 408, 'Ethiopia Espresso', 1, -1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `CART`
--

CREATE TABLE `CART` (
  `cart_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `total_cost` float DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `CART`
--

INSERT INTO `CART` (`cart_id`, `customer_id`, `product_id`, `total_cost`, `quantity`) VALUES
(42, 18, 1, 15, 1),
(43, 18, 2, 30, 2),
(49, -1, 2, 150, 10),
(50, -1, 1, 30, 2),
(51, -1, 3, 30, 2),
(52, 67, 3, 15, 1),
(53, 67, 3, 15, 1),
(54, 67, 3, 15, 1),
(55, 67, 3, 15, 1),
(56, 67, 3, 15, 1),
(57, 67, 2, 15, 1),
(58, 67, 2, 15, 1),
(59, 67, 2, 15, 1),
(60, 67, 2, 45, 3),
(61, 67, 2, 15, 1),
(62, 67, 2, 15, 1),
(63, 67, 2, 15, 1),
(64, 67, 2, 90, 6),
(65, 3, 15, 357, 3),
(66, 3, 14, 458, 2),
(67, 3, 5, 36, 2),
(68, 3, 1, 15, 1),
(69, 1, 9, 38, 2),
(70, 1, 10, 25, 1),
(71, 1, 2, 15, 1),
(72, 1, 1, 15, 1),
(73, 1, 2, 15, 1),
(74, 1, 1, 15, 1),
(75, 4, 1, 15, 1),
(76, 4, 2, 15, 1),
(77, 4, 9, 19, 1),
(78, 4, 10, 25, 1),
(79, 4, 8, 19, 1),
(80, 4, 14, 229, 1),
(81, 4, 13, 149, 1),
(82, 4, 11, 30, 2),
(83, 1, 1, 15, 1),
(84, 1, 1, 15, 1),
(85, 1, 2, 15, 1),
(86, 1, 2, 15, 1),
(87, 1, 2, 15, 1),
(88, 1, 2, 15, 1),
(89, 3, 14, 229, 1),
(90, 3, 13, 149, 1),
(91, 3, 15, 119, 1),
(92, 18, 14, 229, 1),
(93, 18, 13, 149, 1),
(94, 67, 1, 2, 3),
(95, 67, 1, 2, 3),
(96, 70, 1, 2, 3),
(97, 70, 1, 2, 3),
(98, 70, 1, 2, 3),
(99, 70, 1, 2, 3);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `CART_PRODUCT`
--

CREATE TABLE `CART_PRODUCT` (
  `cart_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `CART_PRODUCT`
--

INSERT INTO `CART_PRODUCT` (`cart_id`, `product_id`) VALUES
(0, 0),
(5, 3),
(32, 10),
(32, 9),
(33, 1),
(33, 4),
(33, 9),
(0, 0),
(5, 3),
(32, 10),
(32, 9),
(33, 1),
(33, 4),
(33, 9),
(38, 1),
(39, 2),
(42, 1),
(43, 2),
(49, 2),
(50, 1),
(51, 3),
(52, 3),
(52, 3),
(52, 3),
(52, 3),
(52, 3),
(57, 2),
(57, 2),
(57, 2),
(57, 2),
(57, 2),
(57, 2),
(57, 2),
(57, 2),
(65, 15),
(66, 14),
(67, 5),
(68, 1),
(69, 9),
(70, 10),
(71, 2),
(72, 1),
(71, 2),
(72, 1),
(75, 1),
(76, 2),
(77, 9),
(78, 10),
(79, 8),
(80, 14),
(81, 13),
(82, 11),
(72, 1),
(72, 1),
(71, 2),
(71, 2),
(71, 2),
(71, 2),
(66, 14),
(90, 13),
(65, 15),
(92, 14),
(93, 13),
(57, 2),
(57, 2),
(96, 2),
(96, 2);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `CATEGORY`
--

CREATE TABLE `CATEGORY` (
  `category_id` int(11) NOT NULL,
  `pm_id` int(11) DEFAULT NULL,
  `category_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `CATEGORY`
--

INSERT INTO `CATEGORY` (`category_id`, `pm_id`, `category_name`) VALUES
(1, 8, 'Filter Coffee'),
(2, 7, 'Turkish Coffee'),
(3, 5, 'Espresso'),
(4, 5, 'Hot Chocolate'),
(5, 5, 'Coffee Machines');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `COMMENTS`
--

CREATE TABLE `COMMENTS` (
  `product_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `text` varchar(100) DEFAULT NULL,
  `time` time DEFAULT NULL,
  `approved` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `COMMENTS`
--

INSERT INTO `COMMENTS` (`product_id`, `customer_id`, `text`, `time`, `approved`) VALUES
(1, 1, 'rich and woody', '12:13:00', 0),
(1, 3, 'intensive and spicy', '23:30:00', 0),
(1, 67, 'Too bitter', NULL, 0),
(2, 2, 'great morning coffee :)', '20:35:00', 0),
(2, 4, 'extremely intensive, i like it', '21:30:00', 0),
(3, 1, 'worth the money', '20:30:00', 0),
(3, 3, 'love the flavor', '22:30:00', 0),
(4, 4, 'too intense for my taste', '23:30:00', 0),
(6, 6, 'first time trying turkish coffee - love it :)', '20:30:00', 0),
(7, 10, '10/10', '20:05:33', 0),
(9, 9, 'sweet & creamy', '13:30:00', 0),
(10, 10, 'balanced & soft', '09:30:00', 0),
(11, 11, 'joyous for cold winter nights', '11:35:00', 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `CUSTOMER`
--

CREATE TABLE `CUSTOMER` (
  `customer_id` int(11) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` varchar(300) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `CUSTOMER`
--

INSERT INTO `CUSTOMER` (`customer_id`, `phone`, `address`, `email`) VALUES
(-1, '123123123', 'jshdajksda', 'shjadfgsadhjfas'),
(1, '66772399', 'Ankara', 'Begum@gmail.Co'),
(2, '376367276', 'istanbul', 'eylul@gmail.com'),
(3, '536', 'Istanbul', 'gork@gmail.com'),
(4, '6543245', 'istanbul', 'volkanerdemli@sabanciuniv.edu'),
(6, '2332441', 'nyc', 'jd@yahoo.com'),
(9, '456786', 'ankara', 'levi@gmail.com'),
(10, '3663727', 'izmir', 'cyilmaz@gmail.com'),
(11, '5321421', 'antalya', 'ysaygin@gmail.com'),
(16, '4444555', 'ist', 'bilaldemirel00@gmail.com'),
(17, '555555555', 'atasehir', 'alperenmail21@alperen.com'),
(18, '555555555', 'atasehir', 'alperenmail21@alperen.com'),
(19, '536710', 'kadikoy', 'kemal@inan.m'),
(20, '536710', 'kadikoy', 'ege@ta.co'),
(21, '536710', 'kadikoy', 'erdemesra@sabanciuniv.edu'),
(22, '4737843', 'bahceshir', 'gizzom@/com'),
(58, '05383254856', 'tuzla ist', 'seylul@sabanciuniv.edu'),
(59, '5318347030', 'atasehir', 'alperenyildiz@sabanciuniv.edu'),
(60, '5318347030', 'atasehir', 'alperenyildiz@sabanciuniv.edu'),
(61, '5318347030', 'atasehir', 'alperenyildiz@sabanciuniv.edu'),
(62, '5318347030', 'atasehir', 'alperenyildiz@sabanciuniv.edu'),
(63, '5318347030', 'atasehir', 'alperenyildiz@sabanciuniv.edu'),
(66, '5318347030', 'atasehir', 'alperenyildiz@sabanciuniv.edu'),
(67, '0', 'I updated this address', 'updated email'),
(68, '5318347030', 'atasehir', 'alperenyildiz@sabanciuniv.edu'),
(69, '5318347030', 'atasehir', 'alperenyildiz@sabanciuniv.edu'),
(70, '5318347030', 'atasehir', 'alperenyildiz@sabanciuniv.edu');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `ORDERS`
--

CREATE TABLE `ORDERS` (
  `order_id` int(11) NOT NULL,
  `time` time DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `cart_id` int(11) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `sm_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `ORDERS`
--

INSERT INTO `ORDERS` (`order_id`, `time`, `amount`, `status`, `cart_id`, `customer_id`, `sm_id`) VALUES
(3, '12:08:23', 1, 'Shipped', 1, 1, 12),
(4, '20:55:25', 1, 'Order Proceeded', 2, 2, 12),
(7, '13:23:01', 1, 'Shipped', 3, 3, 14),
(8, '22:00:00', 1, 'Shipped', 11, 11, 14),
(9, '23:34:00', 1, 'Cancelled', 6, 6, 12),
(17, '12:23:00', 1, 'Delivered', 3, 3, 13),
(25, '17:50:00', 1, 'Shipped', 4, 4, 13),
(26, '22:00:00', 1, 'Shipped', 9, 10, 14),
(29, '09:12:00', 1, 'Shipped', 8, 9, 14),
(31, '15:09:17', 1, 'Preparing', 15, 3, 14),
(32, '15:09:17', 1, 'Preparing', 16, 3, 14),
(36, '15:09:17', 1, 'Delivered', 20, 10, 14),
(45, '15:09:17', 1, 'Preparing', 33, 3, 14),
(46, NULL, 1, 'Preparing', 38, 18, 5),
(47, NULL, 2, 'Preparing', 39, 18, 5),
(48, NULL, 1, 'Preparing', 42, 18, 5),
(49, NULL, 2, 'Delivered', 43, 18, 5),
(50, NULL, 10, 'Preparing', 49, -1, 5),
(51, NULL, 2, 'Preparing', 50, -1, 5),
(52, NULL, 2, 'Preparing', 51, -1, 5),
(53, NULL, 1, 'Preparing', 52, 67, 5),
(55, '18:30:34', 1, 'Preparing', 57, 67, 5),
(62, '15:11:36', 3, 'Preparing', 65, 3, 5),
(63, '15:11:37', 2, 'Preparing', 66, 3, 5),
(64, '15:11:38', 2, 'Preparing', 67, 3, 5),
(65, '15:11:39', 1, 'Preparing', 68, 3, 5),
(66, '15:20:54', 2, 'Preparing', 69, 1, 5),
(68, '15:24:49', 1, 'Returned', 71, 1, 5),
(69, '15:24:50', 1, 'Delivered', 72, 1, 5),
(70, '15:29:52', 1, 'Cancelled', 71, 1, 5),
(72, '15:35:37', 1, 'Preparing', 75, 4, 5),
(73, '15:35:38', 1, 'Preparing', 76, 4, 5),
(78, '15:38:48', 1, 'Preparing', 81, 4, 5),
(79, '15:39:54', 2, 'Preparing', 82, 4, 5),
(86, '17:00:55', 1, 'Preparing', 66, 3, 5),
(87, '17:00:56', 1, 'Preparing', 90, 3, 5),
(88, '17:00:57', 1, 'Preparing', 65, 3, 5),
(89, '17:33:00', 1, 'Preparing', 92, 18, 5),
(90, '17:33:01', 1, 'Preparing', 93, 18, 5),
(91, '18:09:52', 3, 'Preparing', 57, 67, 5),
(92, '19:01:59', 1, 'Preparing', 57, 67, 5),
(93, '08:06:54', 1, 'Preparing', 96, 70, 5),
(94, '08:22:34', 1, 'Preparing', 96, 70, 5);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `PRODUCT`
--

CREATE TABLE `PRODUCT` (
  `category_id` int(11) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `model` varchar(30) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `image_path` varchar(200) NOT NULL,
  `stock` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `PRODUCT`
--

INSERT INTO `PRODUCT` (`category_id`, `product_id`, `name`, `rating`, `model`, `price`, `image_path`, `stock`, `discount`) VALUES
(3, 1, 'Ethiopia Espresso', 2.7, 'PN2345', 15, 'https://www.40kafe.com/Uploads/UrunResimleri/buyuk/moliendo-ethiopia-yirgacheffe-yoresel-ka-0c1d.jpg', 18, 0),
(3, 2, 'Kenya Espresso', 4.9, 'PN2346', 15, 'https://www.40kafe.com/Uploads/UrunResimleri/buyuk/moliendo-kenya-aa-muranga-yoresel-kahve-139f.jpg', 1, 0),
(3, 3, 'Guatemala Espresso', 1.5, 'PN2347', 15, 'https://www.40kafe.com/Uploads/UrunResimleri/buyuk/moliendo-guatemala-antigua-yoresel-kahve-6585.jpg', 20, 0),
(2, 4, 'Double Roasted Turkish Coffee 150g', 4.3, 'PN9012 ', 15, 'https://cdn.shopify.com/s/files/1/0443/5211/0757/products/mehmet-efendi-turk-kahvesi-500-removebg-preview_grande.png?v=1614260323', 40, 0),
(2, 5, 'Double Roasted Turkish Coffee 250g', 1.3, 'PN9013', 18, 'https://cdn.shopify.com/s/files/1/0443/5211/0757/products/mehmet-efendi-turk-kahvesi-500-removebg-preview_grande.png?v=1614260323', 39, 0),
(2, 6, 'Roasted Turkish Coffee 250g', 4.6, 'PN9112', 15, 'https://cdn.shopify.com/s/files/1/0443/5211/0757/products/mehmet-efendi-turk-kahvesi-500-removebg-preview_grande.png?v=1614260323', 45, 0),
(2, 7, 'Roasted Turkish Coffee 150g', 1, 'PN3832', 12, 'https://cdn.shopify.com/s/files/1/0443/5211/0757/products/mehmet-efendi-turk-kahvesi-500-removebg-preview_grande.png?v=1614260323', 45, 0),
(1, 8, 'Vanilla Flavoured Filter Coffee', 4, 'PN7483', 19, 'https://nutritionix-api.s3.amazonaws.com/543691b5773e831060c1287f.jpeg', 49, 0),
(1, 9, 'Caramel Flavoured Filter Coffee', 3.2, 'PN0037', 19, 'https://images-na.ssl-images-amazon.com/images/I/81hjSy8fOnL._SL1500_.jpg', 42, 0),
(1, 10, 'Hazelnut Flavoured Filter Coffee', 5, 'PN0078', 25, 'https://www.meijer.com/content/dam/meijer/product/0076/21/1134/08/0076211134085_1_A1C1_0600.png', 42, 0),
(4, 11, 'Hot Chocolate 50gr', 4, 'PN3513', 15.5, 'https://i.pinimg.com/originals/f5/d3/cc/f5d3ccbd24860ae5be71c4e2a5af11d1.jpg', 43, 0),
(4, 12, 'Hot Chocolate 100gr', 2.2, 'PN3523', 20, 'https://i.pinimg.com/originals/f5/d3/cc/f5d3ccbd24860ae5be71c4e2a5af11d1.jpg', 50, 0),
(5, 13, 'Filter Coffee Machine', 4.3, 'PN3512', 149, 'https://m.media-amazon.com/images/I/51Iwcr9GEML.jpg', 19, 0),
(5, 14, 'Espresso Machine', 4.6, 'PN2312', 229, 'https://www.breville.com/content/dam/breville/us/assets/espresso/finished-goods/bes870/bes870xl/images/pdp0.jpg', 15, 0),
(5, 15, 'Turkish Coffee Machine', 2.1, 'PN1112', 119, 'https://www.grandturkishbazaar.com/wp-content/uploads/2017/12/arcelik-telve-turkish-coffee-machine-k3300-1.png', 91, 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `PRODUCT_MANAGER`
--

CREATE TABLE `PRODUCT_MANAGER` (
  `pm_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `PRODUCT_MANAGER`
--

INSERT INTO `PRODUCT_MANAGER` (`pm_id`) VALUES
(5),
(7),
(8);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `RATES`
--

CREATE TABLE `RATES` (
  `rate` float DEFAULT NULL,
  `customer_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `RATES`
--

INSERT INTO `RATES` (`rate`, `customer_id`, `product_id`) VALUES
(4.1, 1, 1),
(4.2, 3, 1),
(3.1, 2, 2),
(4.2, 1, 3),
(2.5, 3, 3),
(4.2, 2, 4),
(2.1, 4, 4),
(4.3, 6, 6),
(1, 10, 7),
(4.7, 9, 9),
(4.5, 10, 10),
(4.2, 11, 11);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `refund_request`
--

CREATE TABLE `refund_request` (
  `product_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `amount` int(11) DEFAULT NULL,
  `cart_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `SALES_MANAGER`
--

CREATE TABLE `SALES_MANAGER` (
  `sm_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `SALES_MANAGER`
--

INSERT INTO `SALES_MANAGER` (`sm_id`) VALUES
(12),
(13),
(14);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `USERS`
--

CREATE TABLE `USERS` (
  `user_id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `USERS`
--

INSERT INTO `USERS` (`user_id`, `username`, `password`, `first_name`, `last_name`, `email`) VALUES
(-1, 'guest', '12345', 'guest', 'guest', 'guest'),
(1, 'Begum', '1234', 'Begum', 'Altunbas', 'Begum@gmail.Co'),
(2, 'eylulsahin', '234', 'eylul', 'sahin', 'eyl@gmail.com'),
(3, 'gorkemguzeler', '123', 'gorkem', 'guzeler', 'gork@gmail.com'),
(4, 'volkanerdemli', '123', 'volkan', 'erdemli', NULL),
(5, 'barisaltop', 'bariss', 'baris', 'altop', NULL),
(6, 'johndoe', 'john123', 'john', 'doe', NULL),
(7, 'duygualtop', 'duyggu', 'duygu', 'altop', NULL),
(8, 'husnuyenigun', 'husnnu', 'husnu', 'yenigun', NULL),
(9, 'albertlevi', 'albert123', 'albert', 'levi', NULL),
(10, 'cemalyilmaz', '123**!', 'Cemal', 'yilmaz', 'cemal@gmail.com'),
(11, 'yucelsaygin', '123456', 'Yucel', 'Saygin', NULL),
(12, 'otastan', '4325', 'Oznur', 'Tastan', NULL),
(13, 'selimbalcisoy', 'selimbal', 'selim', 'balcisoy', NULL),
(14, 'berrinyanikoglu', 'berrinML', 'berrin', 'yanikloglu', NULL),
(15, 'eylemsah', '123*', 'eylem', 'sahin', NULL),
(16, 'bilaldemirel99', '123', 'bilall', 'demirell', 'bilaldemirel00@gmail.com'),
(17, 'alpereny21', 'mypassword', 'alperen', 'yildiz', 'alperenmail21@alperen.com'),
(18, 'alpereny2', 'mypassword', 'alperen', 'yildiz', 'alperenmail21@alperen.com'),
(19, 'inank', 'kinan', 'Ali', 'kemal', 'kemal@inan.m'),
(20, 'egee', 'ege12345', 'Ege', 'Alpay', 'ege@ta.co'),
(21, 'Esra', 'medrearse', 'Esra', 'Erdem', 'erdemesra@sabanciuniv.edu'),
(22, 'giizmo', '123', 'given', 'guzzler', 'gizzom@/com'),
(58, 'eylulsah', 'passowrd', 'eylul', 'sahin', 'seylul@sabanciuniv.edu'),
(59, 'alperennn7', 'mypassword', 'alperen', 'yildiz', 'alperenyildiz@sabanciuniv.edu'),
(60, 'alperennn', 'mypassword', 'alperen', 'yildiz', 'alperenyildiz@sabanciuniv.edu'),
(61, 'alperen', 'mypassword', 'alperen', 'yildiz', 'alperenyildiz@sabanciuniv.edu'),
(62, 'alperen2', 'mypassword', 'test', 'yildiz', 'alperenyildiz@sabanciuniv.edu'),
(63, 'alperen22', 'mypassword', 'new', 'yildiz', 'alperenyildiz@sabanciuniv.edu'),
(64, 'alperen3', 'mypassword', 'new', 'yildiz', 'alperenyildiz@sabanciuniv.edu'),
(65, 'alpere3', 'mypassword', 'new', 'yildiz', 'alperenyildiz@sabanciuniv.edu'),
(66, 'alper3', 'mypassword', 'new', 'yildiz', 'alperenyildiz@sabanciuniv.edu'),
(67, 'alp3', 'updated password', 'updated last name', 'updated last name', 'updated email'),
(68, 'alp4', 'mypassword', 'new', 'yildiz', 'alperenyildiz@sabanciuniv.edu'),
(69, 'alp5', 'mypassword', 'new', 'yildiz', 'alperenyildiz@sabanciuniv.edu'),
(70, 'alp6', 'mypassword', 'new', 'yildiz', 'alperenyildiz@sabanciuniv.edu');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `BASKET`
--
ALTER TABLE `BASKET`
  ADD PRIMARY KEY (`basket_id`);

--
-- Tablo için indeksler `CART`
--
ALTER TABLE `CART`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Tablo için indeksler `CATEGORY`
--
ALTER TABLE `CATEGORY`
  ADD PRIMARY KEY (`category_id`),
  ADD KEY `pm_id` (`pm_id`);

--
-- Tablo için indeksler `COMMENTS`
--
ALTER TABLE `COMMENTS`
  ADD PRIMARY KEY (`product_id`,`customer_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Tablo için indeksler `CUSTOMER`
--
ALTER TABLE `CUSTOMER`
  ADD PRIMARY KEY (`customer_id`);

--
-- Tablo için indeksler `ORDERS`
--
ALTER TABLE `ORDERS`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `sm_id` (`sm_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Tablo için indeksler `PRODUCT`
--
ALTER TABLE `PRODUCT`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Tablo için indeksler `PRODUCT_MANAGER`
--
ALTER TABLE `PRODUCT_MANAGER`
  ADD PRIMARY KEY (`pm_id`);

--
-- Tablo için indeksler `RATES`
--
ALTER TABLE `RATES`
  ADD PRIMARY KEY (`product_id`,`customer_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Tablo için indeksler `refund_request`
--
ALTER TABLE `refund_request`
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `cart_id` (`cart_id`);

--
-- Tablo için indeksler `SALES_MANAGER`
--
ALTER TABLE `SALES_MANAGER`
  ADD PRIMARY KEY (`sm_id`);

--
-- Tablo için indeksler `USERS`
--
ALTER TABLE `USERS`
  ADD PRIMARY KEY (`user_id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `BASKET`
--
ALTER TABLE `BASKET`
  MODIFY `basket_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=414;

--
-- Tablo için AUTO_INCREMENT değeri `CART`
--
ALTER TABLE `CART`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- Tablo için AUTO_INCREMENT değeri `CATEGORY`
--
ALTER TABLE `CATEGORY`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Tablo için AUTO_INCREMENT değeri `ORDERS`
--
ALTER TABLE `ORDERS`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- Tablo için AUTO_INCREMENT değeri `PRODUCT`
--
ALTER TABLE `PRODUCT`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Tablo için AUTO_INCREMENT değeri `USERS`
--
ALTER TABLE `USERS`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `CART`
--
ALTER TABLE `CART`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `CUSTOMER` (`customer_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `PRODUCT` (`product_id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `CATEGORY`
--
ALTER TABLE `CATEGORY`
  ADD CONSTRAINT `category_ibfk_1` FOREIGN KEY (`pm_id`) REFERENCES `PRODUCT_MANAGER` (`pm_id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `COMMENTS`
--
ALTER TABLE `COMMENTS`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `PRODUCT` (`product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `CUSTOMER` (`customer_id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `CUSTOMER`
--
ALTER TABLE `CUSTOMER`
  ADD CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `USERS` (`user_id`) ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `PRODUCT_MANAGER`
--
ALTER TABLE `PRODUCT_MANAGER`
  ADD CONSTRAINT `PRODUCT_MANAGER_ibfk_1` FOREIGN KEY (`pm_id`) REFERENCES `USERS` (`user_id`);

--
-- Tablo kısıtlamaları `refund_request`
--
ALTER TABLE `refund_request`
  ADD CONSTRAINT `refund_request_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `USERS` (`user_id`),
  ADD CONSTRAINT `refund_request_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `PRODUCT` (`product_id`),
  ADD CONSTRAINT `refund_request_ibfk_3` FOREIGN KEY (`cart_id`) REFERENCES `CART` (`cart_id`);

--
-- Tablo kısıtlamaları `SALES_MANAGER`
--
ALTER TABLE `SALES_MANAGER`
  ADD CONSTRAINT `SALES_MANAGER_ibfk_1` FOREIGN KEY (`sm_id`) REFERENCES `USERS` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
