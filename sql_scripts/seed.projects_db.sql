-- TRUNCATE all tables to ensure that there are no
-- data in them so we start with a fresh set of data
TRUNCATE department, employee, employee_project, project RESTART IDENTITY CASCADE;

-- insert 4 projects
INSERT INTO project 
  (project_name, budget, start_date)
  VALUES 
    ('Build Database', 20000, '3/4/2019'),
    ('Plan christmas party', 500, '11/20/2019'),
    ('Remove old stock', 1000, '4/6/2019'),
    ('Watch paint dry', 3000, '2/11/2019');

-- insert 4 departments
INSERT INTO department 
  (dept_name)
  VALUES 
    ('Development'),
    ('Sales'),
    ('Human Resources'),
    ('Warehouse');

-- insert some employees
INSERT INTO employee
  (emp_name, phone, title, salary, department)
  VALUES
    ('Michael Scott', '5551234', 'Regional Manager', 80000, 2),
    ('Dwight Schrute', '5554321', 'Assistant to Regional Manager', 30000, 2),
    ('Jim Halpert', '5555678', 'Salesman', 50000, 2),
    ('Pam Beasley', '5558765', 'Secretary', 35000, 2) ,
    ('Meredith Palmer', '5559876', 'Supplier Relations', 30000, 4),
    ('Toby Flenderson', '5558769', 'Head Human Resources', 60000, 3),
    ('Edgar Djikstra', '5554567', 'Lead Software Developer', 120000, 1);

-- Add managers to the departments
UPDATE department SET manager = 7 WHERE id = 1;
UPDATE department SET manager = 3 WHERE id = 2;
UPDATE department SET manager = 6 WHERE id = 3;
UPDATE department SET manager = 5 WHERE id = 4;    

-- put employees on projects
INSERT INTO employee_project
  (emp_id, project_id, start_date, end_date)
  VALUES 
    (7, 1, '3/4/2019', '6/1/2019'),
    (6, 2, '11/20/2019', '12/25/2019'),
    (5, 3, '4/6/2019', '4/12/2019'),
    (4, 4, '2/11/2019', '2/15/2019'),
    (3, 4, '2/25/2019', '3/15/2019'),
    (2, 4, '2/11/2019', '2/25/2019'),
    (1, 4, '2/15/2019', '4/12/2019');  