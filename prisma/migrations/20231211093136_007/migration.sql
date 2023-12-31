-- CreateTable
CREATE TABLE "pre_matric_scholarship" (
    "id" SERIAL NOT NULL,
    "serial" INTEGER,
    "scheme_name" VARCHAR(127),
    "academic_year" VARCHAR(15),
    "category" VARCHAR(15),
    "religion" VARCHAR(31),
    "gender" VARCHAR(15),
    "aadhaar_no" VARCHAR(12),
    "student_name" VARCHAR(127),
    "father_name" VARCHAR(127),
    "mother_name" VARCHAR(127),
    "dob" VARCHAR(15),
    "mobile_no" VARCHAR(15),
    "alternate_mobile_no" VARCHAR(15),
    "email_id" VARCHAR(127),
    "domicile_district" VARCHAR(127),
    "domicile_block" VARCHAR(127),
    "full_address" VARCHAR(511),
    "institute_name" VARCHAR(255),
    "institution_type" VARCHAR(31),
    "address_of_institution" VARCHAR(511),
    "class" VARCHAR(15),

    CONSTRAINT "pre_matric_scholarship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_matric_scholarship" (
    "id" SERIAL NOT NULL,
    "serial" INTEGER,
    "scheme_name" VARCHAR(127),
    "academic_year" VARCHAR(15),
    "category" VARCHAR(15),
    "religion" VARCHAR(31),
    "gender" VARCHAR(15),
    "aadhaar_no" VARCHAR(12),
    "student_name" VARCHAR(127),
    "father_name" VARCHAR(127),
    "mother_name" VARCHAR(127),
    "dob" VARCHAR(15),
    "mobile_no" VARCHAR(15),
    "alternate_mobile_no" VARCHAR(15),
    "email_id" VARCHAR(127),
    "domicile_district" VARCHAR(127),
    "domicile_block" VARCHAR(127),
    "full_address" VARCHAR(511),
    "institute_name" VARCHAR(255),
    "institution_type" VARCHAR(31),
    "institution_district" VARCHAR(63),
    "address_of_institution" VARCHAR(511),
    "course" VARCHAR(63),
    "branch" VARCHAR(63),
    "course_year" VARCHAR(15),
    "residential_status" VARCHAR(31),
    "matric_roll_no" VARCHAR(31),
    "matric_passing_year" VARCHAR(15),
    "matric_board_name" VARCHAR(63),
    "total_sanctioned_amount" INTEGER,

    CONSTRAINT "post_matric_scholarship_pkey" PRIMARY KEY ("id")
);
