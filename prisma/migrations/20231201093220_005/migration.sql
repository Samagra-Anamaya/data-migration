-- CreateTable
CREATE TABLE "transaction_history_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "requestBody" JSONB[],
    "containErrors" BOOLEAN NOT NULL DEFAULT false,
    "errors" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "userId" TEXT NOT NULL,
    "transactionStartTime" TIMESTAMP(3) NOT NULL,
    "transactionEndTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaction_history_table_pkey" PRIMARY KEY ("id")
);
