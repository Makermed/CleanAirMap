SET check_function_bodies = false;
CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;
COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';
CREATE FUNCTION public.update_edited() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
    NEW.edited_timestamp = now();
    return NEW;
end;
$$;
CREATE TABLE public.location (
    id integer NOT NULL,
    name text NOT NULL,
    source json,
    address_line1 text NOT NULL,
    address_line2 text NOT NULL,
    category text NOT NULL,
    location_type text NOT NULL,
    place_id text NOT NULL,
    geography public.geography(Point,4326),
    created_timestamp timestamp without time zone DEFAULT now() NOT NULL,
    edited_timestamp timestamp without time zone,
    properties jsonb
);
CREATE VIEW public.features AS
 SELECT row_to_json(fc.*) AS feature_collection
   FROM ( SELECT 'FeatureCollection'::text AS type,
            array_to_json(array_agg(f.*)) AS features
           FROM ( SELECT 'Feature'::text AS type,
                    (public.st_asgeojson(lg.geography))::json AS geometry,
                    row_to_json(( SELECT l.*::record AS l
                           FROM ( SELECT lg.name,
                                    lg.address_line1,
                                    lg.address_line2) l)) AS address,
                    lg.properties
                   FROM public.location lg) f) fc;
CREATE SEQUENCE public.location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.location_id_seq OWNED BY public.location.id;
CREATE TABLE public.post (
    location_id integer NOT NULL,
    co2_reading integer NOT NULL,
    reading_timestamp timestamp without time zone NOT NULL,
    created_timestamp timestamp without time zone DEFAULT now() NOT NULL,
    edited_timestamp timestamp without time zone DEFAULT now(),
    user_id text NOT NULL,
    comment text
);
CREATE TABLE public.users (
    id text NOT NULL,
    email text NOT NULL,
    last_seen timestamp with time zone DEFAULT now() NOT NULL,
    username text DEFAULT 'username'::text NOT NULL
);
CREATE VIEW public.post_info AS
 SELECT read_tbl.location_id,
    read_tbl.co2_reading,
    read_tbl.reading_timestamp,
    read_tbl.created_timestamp,
    read_tbl.edited_timestamp,
    read_tbl.comment,
    user_tbl.username
   FROM (( SELECT post.user_id,
            post.location_id,
            post.co2_reading,
            post.reading_timestamp,
            post.created_timestamp,
            post.edited_timestamp,
            post.comment
           FROM public.post) read_tbl
     JOIN ( SELECT users.username,
            users.id AS user_id
           FROM public.users) user_tbl ON ((read_tbl.user_id = user_tbl.user_id)));
CREATE VIEW public.user_info AS
 SELECT users.username,
    users.id
   FROM public.users;
ALTER TABLE ONLY public.location ALTER COLUMN id SET DEFAULT nextval('public.location_id_seq'::regclass);
ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (location_id, created_timestamp, user_id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
CREATE TRIGGER trigger_update_edited_location BEFORE UPDATE ON public.location FOR EACH ROW EXECUTE FUNCTION public.update_edited();
CREATE TRIGGER trigger_update_edited_post BEFORE UPDATE ON public.post FOR EACH ROW EXECUTE FUNCTION public.update_edited();
ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.location(id);
ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
