import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1794793496879 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. ADDRESSES
    await queryRunner.query(`
      CREATE TABLE public.addresses (
        id INTEGER GENERATED ALWAYS AS IDENTITY (
          INCREMENT BY 1
          MINVALUE 1
          MAXVALUE 2147483647
          START WITH 1
          CACHE 1
          NO CYCLE
        ) NOT NULL,
        street VARCHAR(100) NOT NULL,
        number VARCHAR(10) NOT NULL,
        neighborhood VARCHAR(80) NOT NULL,
        city VARCHAR(60) NOT NULL,
        CONSTRAINT addresses_pkey PRIMARY KEY (id)
      )
    `);

    // 2. CATEGORIES
    await queryRunner.query(`
      CREATE TABLE public.categories (
        id INTEGER GENERATED ALWAYS AS IDENTITY (
          INCREMENT BY 1
          MINVALUE 1
          MAXVALUE 2147483647
          START WITH 1
          CACHE 1
          NO CYCLE
        ) NOT NULL,
        name VARCHAR(50) NOT NULL,
        description VARCHAR(255),
        CONSTRAINT categories_pkey PRIMARY KEY (id),
        CONSTRAINT uq_categories_name UNIQUE (name)
      )
    `);

    // 3. ROLES
    await queryRunner.query(`
      CREATE TABLE public.roles (
        id INTEGER GENERATED ALWAYS AS IDENTITY (
          INCREMENT BY 1
          MINVALUE 1
          MAXVALUE 2147483647
          START WITH 1
          CACHE 1
          NO CYCLE
        ) NOT NULL,
        name VARCHAR(30) NOT NULL,
        CONSTRAINT roles_pkey PRIMARY KEY (id),
        CONSTRAINT uq_roles_name UNIQUE (name)
      )
    `);

    // 4. USERS
    await queryRunner.query(`
      CREATE TABLE public.users (
        id INTEGER GENERATED ALWAYS AS IDENTITY (
          INCREMENT BY 1
          MINVALUE 1
          MAXVALUE 2147483647
          START WITH 1
          CACHE 1
          NO CYCLE
        ) NOT NULL,
        role_id INTEGER NOT NULL,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        second_last_name VARCHAR(50),
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(15),
        password_hash VARCHAR(255) NOT NULL,
        CONSTRAINT users_pkey PRIMARY KEY (id),
        CONSTRAINT uq_users_email UNIQUE (email),
        CONSTRAINT fk_users_role FOREIGN KEY (role_id)
          REFERENCES public.roles(id) ON DELETE RESTRICT
      )
    `);

    // 5. CUSTOMER ADDRESSES
    await queryRunner.query(`
      CREATE TABLE public.customer_addresses (
        id INTEGER GENERATED ALWAYS AS IDENTITY (
          INCREMENT BY 1
          MINVALUE 1
          MAXVALUE 2147483647
          START WITH 1
          CACHE 1
          NO CYCLE
        ) NOT NULL,
        user_id INTEGER NOT NULL,
        address_id INTEGER NOT NULL,
        CONSTRAINT customer_addresses_pkey PRIMARY KEY (id),
        CONSTRAINT uq_customer_addresses_pair UNIQUE (user_id, address_id),
        CONSTRAINT fk_customer_addresses_user FOREIGN KEY (user_id)
          REFERENCES public.users(id) ON DELETE CASCADE,
        CONSTRAINT fk_customer_addresses_address FOREIGN KEY (address_id)
          REFERENCES public.addresses(id) ON DELETE CASCADE
      )
    `);

    // 6. PRODUCTS
    await queryRunner.query(`
      CREATE TABLE public.products (
        id INTEGER GENERATED ALWAYS AS IDENTITY (
          INCREMENT BY 1
          MINVALUE 1
          MAXVALUE 2147483647
          START WITH 1
          CACHE 1
          NO CYCLE
        ) NOT NULL,
        category_id INTEGER NOT NULL,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        image_url VARCHAR(255),
        price NUMERIC(10, 2) NOT NULL,
        stock INTEGER NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        CONSTRAINT products_pkey PRIMARY KEY (id),
        CONSTRAINT chk_products_price CHECK (price >= 0),
        CONSTRAINT chk_products_stock CHECK (stock >= 0),
        CONSTRAINT fk_products_category FOREIGN KEY (category_id)
          REFERENCES public.categories(id) ON DELETE RESTRICT
      )
    `);

    // 7. ORDERS
    await queryRunner.query(`
      CREATE TABLE public.orders (
        id INTEGER GENERATED ALWAYS AS IDENTITY (
          INCREMENT BY 1
          MINVALUE 1
          MAXVALUE 2147483647
          START WITH 1
          CACHE 1
          NO CYCLE
        ) NOT NULL,
        user_id INTEGER NOT NULL,
        customer_address_id INTEGER,
        order_date DATE NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'reserved',
        delivery_street VARCHAR(100) NOT NULL,
        delivery_number VARCHAR(10) NOT NULL,
        delivery_neighborhood VARCHAR(80) NOT NULL,
        delivery_city VARCHAR(60) NOT NULL,
        CONSTRAINT orders_pkey PRIMARY KEY (id),
        CONSTRAINT chk_orders_status
          CHECK (status IN ('reserved', 'paid', 'fulfilled')),
        CONSTRAINT fk_orders_user FOREIGN KEY (user_id)
          REFERENCES public.users(id) ON DELETE RESTRICT,
        CONSTRAINT fk_orders_customer_address FOREIGN KEY (customer_address_id)
          REFERENCES public.customer_addresses(id) ON DELETE SET NULL
      )
    `);

    // 8. ORDER ITEMS
    await queryRunner.query(`
      CREATE TABLE public.order_items (
        id INTEGER GENERATED ALWAYS AS IDENTITY (
          INCREMENT BY 1
          MINVALUE 1
          MAXVALUE 2147483647
          START WITH 1
          CACHE 1
          NO CYCLE
        ) NOT NULL,
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        unit_price NUMERIC(10, 2) NOT NULL,
        subtotal NUMERIC(10, 2)
          GENERATED ALWAYS AS (unit_price * quantity::numeric) STORED,
        CONSTRAINT order_items_pkey PRIMARY KEY (id),
        CONSTRAINT chk_order_items_quantity CHECK (quantity > 0),
        CONSTRAINT chk_order_items_unit_price CHECK (unit_price >= 0),
        CONSTRAINT uq_order_items_pair UNIQUE (order_id, product_id),
        CONSTRAINT fk_order_items_order FOREIGN KEY (order_id)
          REFERENCES public.orders(id) ON DELETE CASCADE,
        CONSTRAINT fk_order_items_product FOREIGN KEY (product_id)
          REFERENCES public.products(id) ON DELETE RESTRICT
      )
    `);

    // 9. PRODUCT FAVORITES
    await queryRunner.query(`
      CREATE TABLE public.product_favorites (
        id INTEGER GENERATED ALWAYS AS IDENTITY (
          INCREMENT BY 1
          MINVALUE 1
          MAXVALUE 2147483647
          START WITH 1
          CACHE 1
          NO CYCLE
        ) NOT NULL,
        user_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        CONSTRAINT product_favorites_pkey PRIMARY KEY (id),
        CONSTRAINT uq_product_favorites_pair UNIQUE (user_id, product_id),
        CONSTRAINT fk_product_favorites_user FOREIGN KEY (user_id)
          REFERENCES public.users(id) ON DELETE CASCADE,
        CONSTRAINT fk_product_favorites_product FOREIGN KEY (product_id)
          REFERENCES public.products(id) ON DELETE CASCADE
      )
    `);

    // 10. SECONDARY INDEXES
    await queryRunner.query(`
      CREATE INDEX idx_customer_addresses_address_id
      ON public.customer_addresses USING btree (address_id)
    `);

    await queryRunner.query(`
      CREATE INDEX idx_order_items_product_id
      ON public.order_items USING btree (product_id)
    `);

    await queryRunner.query(`
      CREATE INDEX idx_orders_customer_address_id
      ON public.orders USING btree (customer_address_id)
    `);

    await queryRunner.query(`
      CREATE INDEX idx_orders_user_id
      ON public.orders USING btree (user_id)
    `);

    await queryRunner.query(`
      CREATE INDEX idx_product_favorites_product_id
      ON public.product_favorites USING btree (product_id)
    `);

    await queryRunner.query(`
      CREATE INDEX idx_products_category_id
      ON public.products USING btree (category_id)
    `);

    await queryRunner.query(`
      CREATE INDEX idx_users_role_id
      ON public.users USING btree (role_id)
    `);

    // 11. TYPEORM METADATA
    await queryRunner.query(`
      CREATE TABLE public.typeorm_metadata (
        "type" VARCHAR(255) NOT NULL,
        "database" VARCHAR(255),
        "schema" VARCHAR(255),
        "table" VARCHAR(255),
        "name" VARCHAR(255),
        "value" TEXT
      )
    `);

    await queryRunner.query(`
      INSERT INTO public.typeorm_metadata (
        "type",
        "database",
        "schema",
        "table",
        "name",
        "value"
      )
      VALUES (
        'GENERATED_COLUMN',
        current_database(),
        'public',
        'order_items',
        'subtotal',
        'unit_price * quantity::numeric'
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE public.typeorm_metadata`);
    await queryRunner.query(`DROP TABLE public.product_favorites`);
    await queryRunner.query(`DROP TABLE public.order_items`);
    await queryRunner.query(`DROP TABLE public.orders`);
    await queryRunner.query(`DROP TABLE public.customer_addresses`);
    await queryRunner.query(`DROP TABLE public.products`);
    await queryRunner.query(`DROP TABLE public.users`);
    await queryRunner.query(`DROP TABLE public.roles`);
    await queryRunner.query(`DROP TABLE public.categories`);
    await queryRunner.query(`DROP TABLE public.addresses`);
  }
}
