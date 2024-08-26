
CREATE TABLE best_boxes (
    name text PRIMARY KEY,
    width int,
    height int,
    depth int,
    color text,
    condition text
);

CREATE TABLE name_changes (
    operation text,
    og_name text,
    new_name text,
    changed_at timestamp
);

INSERT INTO best_boxes VALUES
('Herman', 14, 12, 8, 'red', 'new'),
('Bob', 10, 4, 17, 'blue', 'new'),
('Lizzy', 8, 19, 17, 'white', 'new'),
('Joey', 3, 5, 7, 'red', 'used'),
('Sebastian', 20, 1, 17, 'orange', 'used'),
('Henrietta', 10, 10, 10, 'purple', 'new');


