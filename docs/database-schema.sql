-- PostgreSQL starter schema for Portfolio Management Panel

create table roles (
  id bigserial primary key,
  name varchar(50) unique not null,
  created_at timestamp,
  updated_at timestamp
);

create table users (
  id bigserial primary key,
  role_id bigint references roles(id),
  name varchar(255) not null,
  email varchar(255) unique not null,
  email_verified_at timestamp null,
  password varchar(255) not null,
  two_factor_secret text null,
  created_at timestamp,
  updated_at timestamp
);

create table projects (
  id bigserial primary key,
  title varchar(255) not null,
  slug varchar(255) unique not null,
  summary text,
  body text,
  tech_stack jsonb default '[]'::jsonb,
  featured_image varchar(512),
  status varchar(20) not null default 'draft',
  published_at timestamp null,
  created_by bigint references users(id),
  updated_by bigint references users(id),
  created_at timestamp,
  updated_at timestamp
);

create table categories (
  id bigserial primary key,
  name varchar(120) unique not null,
  slug varchar(140) unique not null,
  created_at timestamp,
  updated_at timestamp
);

create table tags (
  id bigserial primary key,
  name varchar(120) unique not null,
  slug varchar(140) unique not null,
  created_at timestamp,
  updated_at timestamp
);

create table blog_posts (
  id bigserial primary key,
  category_id bigint references categories(id),
  author_id bigint references users(id),
  title varchar(255) not null,
  slug varchar(255) unique not null,
  excerpt text,
  content text not null,
  seo_title varchar(255),
  seo_description text,
  featured_image varchar(512),
  read_time_minutes int,
  status varchar(20) not null default 'draft',
  published_at timestamp null,
  created_at timestamp,
  updated_at timestamp
);

create table blog_post_tag (
  blog_post_id bigint references blog_posts(id) on delete cascade,
  tag_id bigint references tags(id) on delete cascade,
  primary key (blog_post_id, tag_id)
);

create table contact_messages (
  id bigserial primary key,
  name varchar(255) not null,
  email varchar(255) not null,
  subject varchar(255),
  message text not null,
  spam_score int default 0,
  status varchar(30) default 'new',
  replied_at timestamp null,
  created_at timestamp,
  updated_at timestamp
);

create table visits (
  id bigserial primary key,
  page varchar(500) not null,
  referrer varchar(500),
  ip_address inet,
  user_agent text,
  country varchar(100),
  device_type varchar(30),
  visited_at timestamp not null default now()
);

create index idx_visits_page on visits(page);
create index idx_visits_visited_at on visits(visited_at);
