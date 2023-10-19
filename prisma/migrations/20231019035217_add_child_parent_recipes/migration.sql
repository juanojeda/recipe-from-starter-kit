-- CreateTable
CREATE TABLE "_ChildParentRecipes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChildParentRecipes_AB_unique" ON "_ChildParentRecipes"("A", "B");

-- CreateIndex
CREATE INDEX "_ChildParentRecipes_B_index" ON "_ChildParentRecipes"("B");
