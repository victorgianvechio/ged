-- CreateTable
CREATE TABLE "Prontuario" (
    "id" SERIAL NOT NULL,
    "prontuario" INTEGER NOT NULL,
    "paciente" TEXT NOT NULL,
    "cns" INTEGER NOT NULL,
    "cpf" TEXT,

    CONSTRAINT "Prontuario_pkey" PRIMARY KEY ("id")
);
