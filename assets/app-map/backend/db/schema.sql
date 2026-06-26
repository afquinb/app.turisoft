CREATE DATABASE IF NOT EXISTS turisoft_map
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE turisoft_map;

CREATE TABLE IF NOT EXISTS categories (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(80) NOT NULL,
  name VARCHAR(160) NOT NULL,
  color CHAR(7) NOT NULL,
  default_on BOOLEAN NOT NULL DEFAULT TRUE,
  roles_json JSON NOT NULL,
  is_zone_layer BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_categories_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS villages (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(180) NOT NULL,
  lat DECIMAL(10,7) NULL,
  lng DECIMAL(10,7) NULL,
  geometry_json JSON NULL,
  is_approximate BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_villages_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS places (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id VARCHAR(80) NULL,
  name VARCHAR(220) NOT NULL,
  category_id BIGINT UNSIGNED NOT NULL,
  village_id BIGINT UNSIGNED NULL,
  lat DECIMAL(10,7) NOT NULL,
  lng DECIMAL(10,7) NOT NULL,
  description TEXT NULL,
  tips TEXT NULL,
  address VARCHAR(260) NULL,
  phone VARCHAR(60) NULL,
  website VARCHAR(260) NULL,
  rating_avg DECIMAL(3,2) NULL,
  accessibility ENUM('none', 'partial', 'full') NULL,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  is_community BOOLEAN NOT NULL DEFAULT FALSE,
  is_approximate BOOLEAN NOT NULL DEFAULT FALSE,
  status ENUM('draft', 'review', 'published', 'archived') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_places_public_id (public_id),
  KEY ix_places_category (category_id),
  KEY ix_places_village (village_id),
  KEY ix_places_status_category (status, category_id),
  KEY ix_places_location (lat, lng),
  FULLTEXT KEY ft_places_search (name, description, address),
  CONSTRAINT fk_places_category FOREIGN KEY (category_id) REFERENCES categories (id),
  CONSTRAINT fk_places_village FOREIGN KEY (village_id) REFERENCES villages (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS activities (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  slug VARCHAR(120) NOT NULL,
  icon VARCHAR(80) NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_activities_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS place_activities (
  place_id BIGINT UNSIGNED NOT NULL,
  activity_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (place_id, activity_id),
  CONSTRAINT fk_place_activities_place FOREIGN KEY (place_id) REFERENCES places (id) ON DELETE CASCADE,
  CONSTRAINT fk_place_activities_activity FOREIGN KEY (activity_id) REFERENCES activities (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS photos (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  place_id BIGINT UNSIGNED NOT NULL,
  url VARCHAR(320) NOT NULL,
  alt VARCHAR(220) NULL,
  sort_order INT NOT NULL DEFAULT 0,
  source_credit VARCHAR(220) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY ix_photos_place (place_id, sort_order),
  CONSTRAINT fk_photos_place FOREIGN KEY (place_id) REFERENCES places (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS providers (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  place_id BIGINT UNSIGNED NULL,
  commercial_name VARCHAR(220) NOT NULL,
  rnt_number VARCHAR(60) NULL,
  rnt_status ENUM('unknown', 'active', 'inactive', 'expired') NOT NULL DEFAULT 'unknown',
  contact_name VARCHAR(160) NULL,
  contact_email VARCHAR(180) NULL,
  contact_phone VARCHAR(60) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_providers_rnt (rnt_number),
  KEY ix_providers_place (place_id),
  CONSTRAINT fk_providers_place FOREIGN KEY (place_id) REFERENCES places (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS trail_profiles (
  place_id BIGINT UNSIGNED NOT NULL,
  km DECIMAL(5,2) NULL,
  difficulty ENUM('suave', 'moderada', 'exigente') NULL,
  duration_label VARCHAR(60) NULL,
  altitude_min_m INT NULL,
  altitude_max_m INT NULL,
  elevation_gain_m INT NULL,
  profile_json JSON NULL,
  PRIMARY KEY (place_id),
  CONSTRAINT fk_trail_profiles_place FOREIGN KEY (place_id) REFERENCES places (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS trail_points (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  place_id BIGINT UNSIGNED NOT NULL,
  point_order INT NOT NULL,
  lat DECIMAL(10,7) NOT NULL,
  lng DECIMAL(10,7) NOT NULL,
  altitude_m INT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_trail_points_order (place_id, point_order),
  CONSTRAINT fk_trail_points_place FOREIGN KEY (place_id) REFERENCES places (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS capacity_rules (
  place_id BIGINT UNSIGNED NOT NULL,
  max_per_departure INT NULL,
  available_today INT NULL,
  notes TEXT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (place_id),
  CONSTRAINT fk_capacity_rules_place FOREIGN KEY (place_id) REFERENCES places (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sustainability_metrics (
  place_id BIGINT UNSIGNED NOT NULL,
  carbon_kg_per_visitor DECIMAL(6,2) NULL,
  percent_below_average DECIMAL(5,2) NULL,
  mitigations_json JSON NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (place_id),
  CONSTRAINT fk_sustainability_place FOREIGN KEY (place_id) REFERENCES places (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS reviews (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  place_id BIGINT UNSIGNED NOT NULL,
  rating TINYINT UNSIGNED NOT NULL,
  body TEXT NULL,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY ix_reviews_place (place_id, created_at),
  CONSTRAINT fk_reviews_place FOREIGN KEY (place_id) REFERENCES places (id) ON DELETE CASCADE,
  CONSTRAINT ck_reviews_rating CHECK (rating BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS analytics_events (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  place_id BIGINT UNSIGNED NULL,
  event_type ENUM('view', 'reserve_click', 'whatsapp_click', 'map_click', 'search') NOT NULL,
  profile ENUM('traveler', 'provider', 'manager') NOT NULL DEFAULT 'traveler',
  metadata_json JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY ix_analytics_place_type_date (place_id, event_type, created_at),
  CONSTRAINT fk_analytics_place FOREIGN KEY (place_id) REFERENCES places (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS public_sources (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(220) NOT NULL,
  url VARCHAR(500) NULL,
  source_type ENUM('official', 'open_data', 'manual', 'provider', 'field_work') NOT NULL DEFAULT 'manual',
  license_label VARCHAR(160) NULL,
  captured_at DATE NULL,
  notes TEXT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_public_sources_name_url (name, url)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS place_sources (
  place_id BIGINT UNSIGNED NOT NULL,
  source_id BIGINT UNSIGNED NOT NULL,
  confidence ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'medium',
  notes TEXT NULL,
  PRIMARY KEY (place_id, source_id),
  CONSTRAINT fk_place_sources_place FOREIGN KEY (place_id) REFERENCES places (id) ON DELETE CASCADE,
  CONSTRAINT fk_place_sources_source FOREIGN KEY (source_id) REFERENCES public_sources (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
