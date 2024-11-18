-- CreateTable
CREATE TABLE "visit" (
    "id" SERIAL NOT NULL,
    "activity" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "pending" VARCHAR(255),
    "started_at" TIMESTAMPTZ NOT NULL,
    "ended_at" TIMESTAMPTZ NOT NULL,
    "inspected" BOOLEAN NOT NULL DEFAULT false,
    "deposit" JSONB NOT NULL,
    "sample" JSONB,
    "treatment" JSONB,
    "user_id" INTEGER NOT NULL,
    "residence_id" INTEGER NOT NULL,

    CONSTRAINT "visit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "visit" ADD CONSTRAINT "visit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visit" ADD CONSTRAINT "visit_residence_id_fkey" FOREIGN KEY ("residence_id") REFERENCES "residence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
