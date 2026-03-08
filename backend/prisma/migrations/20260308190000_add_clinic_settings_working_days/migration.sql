-- Add missing workingDays column for older deployments
ALTER TABLE "clinic_settings"
ADD COLUMN IF NOT EXISTS "workingDays" JSONB NOT NULL DEFAULT '[1,2,3,4,5,6,7]';
