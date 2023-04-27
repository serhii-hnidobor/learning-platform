-- Enable RLS
alter table "Topic"
  enable row level security;

-- Enable RLS
alter table "Tag"
  enable row level security;

-- Enable RLS
alter table "Course"
  enable row level security;

-- Enable RLS
alter table "Lesson"
  enable row level security;

-- Enable RLS
alter table "TagsOnCourse"
  enable row level security;

-- Enable RLS
alter table "FileAttachment"
  enable row level security;

-- Enable RLS
alter table "CourseSection"
  enable row level security;

CREATE POLICY "Anyone can see course"
ON "Course"
FOR SELECT USING (
  true
);

CREATE POLICY "Anyone can see lesson"
ON "Lesson"
FOR SELECT USING (
  true
);

CREATE POLICY "Anyone can see course tags"
ON "TagsOnCourse"
FOR SELECT USING (
  true
);

CREATE POLICY "Anyone can see course section"
ON "CourseSection"
FOR SELECT USING (
  true
);

CREATE POLICY "Anyone can see file attachment"
ON "FileAttachment"
FOR SELECT USING (
  true
);

CREATE POLICY "Anyone can see tag"
ON "Tag"
FOR SELECT USING (
  true
);

CREATE POLICY "Anyone can see Topic"
ON "Topic"
FOR SELECT USING (
  true
);