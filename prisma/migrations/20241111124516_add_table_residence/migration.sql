-- CreateTable
CREATE TABLE "residence" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "lat" DECIMAL(10,7) NOT NULL,
    "lng" DECIMAL(10,7) NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "number" VARCHAR(255),
    "neighborhood" VARCHAR(255) NOT NULL,
    "street_court" VARCHAR(255),
    "block" VARCHAR(255),
    "complement" VARCHAR(255),
    "apartment_number" VARCHAR(255),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "residence_pkey" PRIMARY KEY ("id")
);
